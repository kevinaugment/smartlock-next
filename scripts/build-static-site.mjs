import { spawn } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createClient } from '@libsql/client'

const root = fileURLToPath(new URL('..', import.meta.url))
const seedPath = join(root, 'database/d1-import-ordered.sql')

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      env: process.env,
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })

    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
    })
  })
}

async function prepareLocalBuildDatabase() {
  const tempDir = await mkdtemp(join(tmpdir(), 'smartlock-next-static-build-'))
  const databasePath = join(tempDir, 'seed.db')
  const databaseUrl = pathToFileURL(databasePath).href
  const client = createClient({ url: databaseUrl })

  try {
    const seedSql = await readFile(seedPath, 'utf8')
    await client.executeMultiple(seedSql)
    process.env.LIBSQL_DATABASE_URL = databaseUrl
    process.env.LIBSQL_AUTH_TOKEN = ''
    process.env.TURSO_DATABASE_URL = ''
    process.env.TURSO_AUTH_TOKEN = ''
    console.log(`Using checked-in SQL seed for static generation: ${seedPath}`)
    return tempDir
  } catch (error) {
    await rm(tempDir, { recursive: true, force: true })
    throw error
  } finally {
    client.close()
  }
}

const tempDir = await prepareLocalBuildDatabase()

try {
  await run('npm', ['run', 'articles:generate'])
  await run('npm', ['run', 'redirects:generate'])
  await run('npx', ['next', 'build'])
} finally {
  if (tempDir) {
    await rm(tempDir, { recursive: true, force: true })
  }
}
