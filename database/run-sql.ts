import { createClient } from '@libsql/client'
import { readFileSync } from 'fs'
import { config } from 'dotenv'

config({ path: '.env.local' })

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
})

async function main() {
    const filePath = process.argv[2]
    if (!filePath) {
        console.error('Usage: npx tsx database/run-sql.ts <file.sql>')
        process.exit(1)
    }

    const sql = readFileSync(filePath, 'utf-8')
    const lines = sql.split('\n').filter(l => {
        const t = l.trim()
        return t.length > 0 && !t.startsWith('--')
    })
    const statements = lines.join('\n').split(';').map(s => s.trim()).filter(s => s.length > 0)

    console.log(`Running ${statements.length} statements from ${filePath}`)

    for (const stmt of statements) {
        try {
            await client.execute(stmt)
            console.log(`  ✅ ${stmt.substring(0, 60)}...`)
        } catch (err: any) {
            if (err.message?.includes('already exists')) {
                console.log(`  ⚠ Already exists: ${stmt.substring(0, 60)}...`)
            } else {
                console.error(`  ❌ ${err.message}`)
                console.error(`     SQL: ${stmt.substring(0, 100)}`)
            }
        }
    }
    console.log('Done!')
}

main()
