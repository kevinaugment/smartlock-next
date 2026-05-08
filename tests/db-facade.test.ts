import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'

async function main() {
  const source = await readFile(new URL('../lib/db.ts', import.meta.url), 'utf8')
  const reportDownloadRoute = await readFile(new URL('../app/api/reports/download/route.ts', import.meta.url), 'utf8')
  const moduleExports = await import('../lib/db')

  assert.equal(
    /from\s+['"]@libsql\/client['"]/.test(source),
    false,
    'lib/db.ts must not statically import @libsql/client so OpenNext can defer DB bundling until runtime routes need it'
  )
  assert.equal(
    source.includes("@libsql/client/node"),
    false,
    'lib/db.ts must not force @libsql/client/node because it pulls native libsql bindings into workerd'
  )
  assert.equal(
    source.includes("import('@libsql/client')"),
    true,
    'lib/db.ts should dynamically import @libsql/client and let runtime export conditions choose node or workerd'
  )
  assert.equal(
    source.includes('process.env.DB'),
    false,
    'canonical DB facade must not use process.env.DB for Cloudflare bindings'
  )
  assert.equal(
    reportDownloadRoute.includes('TURSO_DATABASE_URL') || reportDownloadRoute.includes('TURSO_AUTH_TOKEN'),
    false,
    'report lead persistence must not gate writes on Turso-specific environment variables'
  )

  await assert.rejects(
    () => access(new URL('../lib/db/client.ts', import.meta.url), constants.F_OK),
    /ENOENT/,
    'stale lib/db/client.ts adapter must stay removed so there is only one DB facade'
  )

  for (const exportName of ['getTursoClient', 'query', 'queryOne', 'execute', 'batch']) {
    assert.equal(typeof moduleExports[exportName], 'function', `${exportName} must remain exported`)
  }
  assert.equal(
    Object.hasOwn(moduleExports, '__setD1DatabaseForTesting'),
    false,
    'test-only D1 hooks must not be exported from the production facade'
  )

  assert.equal(typeof moduleExports.default, 'object', 'default db facade must remain exported')
  assert.equal(typeof moduleExports.default.query, 'function', 'default db facade must expose query')
  assert.equal(typeof moduleExports.default.queryOne, 'function', 'default db facade must expose queryOne')
  assert.equal(typeof moduleExports.default.execute, 'function', 'default db facade must expose execute')
  assert.equal(typeof moduleExports.default.batch, 'function', 'default db facade must expose batch')

  const calls: Array<{ sql: string; params: any[]; method: string }> = []
  const fakeD1 = {
    prepare(sql: string) {
      return {
        bind(...params: any[]) {
          return {
            async all() {
              calls.push({ sql, params, method: 'all' })
              return { success: true, results: [{ id: 1, name: 'D1 row' }] }
            },
            async first() {
              calls.push({ sql, params, method: 'first' })
              return { id: 1, name: 'D1 row' }
            },
            async run() {
              calls.push({ sql, params, method: 'run' })
              return { success: true, meta: { changes: 2 } }
            },
          }
        },
      }
    },
    async batch(statements: unknown[]) {
      return statements.map(() => ({ success: true, meta: { changes: 1 } }))
    },
  }

  const d1OverrideKey = Symbol.for('smartlock-next.db.d1Override')
  ;(globalThis as typeof globalThis & { [d1OverrideKey]?: unknown })[d1OverrideKey] = fakeD1

  const rows = await moduleExports.query('select * from categories where id = ?', [1])
  assert.deepEqual(rows, [{ id: 1, name: 'D1 row' }], 'query must return D1 result rows')

  const row = await moduleExports.queryOne('select * from categories where id = ?', [1])
  assert.deepEqual(row, { id: 1, name: 'D1 row' }, 'queryOne must return first D1 row')

  const changed = await moduleExports.execute('update categories set name = ? where id = ?', ['Locks', 1])
  assert.equal(changed, 2, 'execute must return D1 change count')

  const batchResults = await moduleExports.batch([
    { sql: 'insert into categories(name) values (?)', params: ['A'] },
    { sql: 'insert into categories(name) values (?)', params: ['B'] },
  ])
  assert.equal(batchResults.length, 2, 'batch must return one D1 result per statement')

  assert.deepEqual(
    calls.map((call) => call.method),
    ['all', 'all', 'run'],
    'D1 facade must route query/queryOne/execute through D1 statement methods'
  )

  delete (globalThis as typeof globalThis & { [d1OverrideKey]?: unknown })[d1OverrideKey]
}

main()
