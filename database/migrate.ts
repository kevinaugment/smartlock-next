/**
 * 数据库迁移脚本 — 使用 @libsql/client 直连 Turso
 * Usage: npx tsx database/migrate.ts
 */
import { createClient } from '@libsql/client'
import { readFileSync } from 'fs'
import { join } from 'path'
import { config } from 'dotenv'

// 加载 .env.local
config({ path: '.env.local' })

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url || !authToken) {
    console.error('❌ Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env.local')
    process.exit(1)
}

const client = createClient({ url, authToken })

/**
 * 解析 SQL 文件为可执行语句列表
 * 先剥离注释行，再按分号分割
 */
function parseSQLStatements(sql: string): string[] {
    // Remove full-line comments and blank lines first
    const lines = sql.split('\n')
    const cleanedLines = lines.filter(line => {
        const trimmed = line.trim()
        return trimmed.length > 0 && !trimmed.startsWith('--')
    })

    // Rejoin and split by semicolons
    const joined = cleanedLines.join('\n')
    const statements = joined
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0)

    return statements
}

async function runSQLFile(filePath: string, label: string) {
    console.log(`\n📄 Running: ${label}`)
    console.log(`   File: ${filePath}`)

    const sql = readFileSync(filePath, 'utf-8')
    const statements = parseSQLStatements(sql)

    console.log(`   Statements: ${statements.length}`)

    let success = 0
    let failed = 0

    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i]
        try {
            await client.execute(stmt)
            success++
            // Show progress for large files
            if (statements.length > 5) {
                process.stdout.write(`   [${i + 1}/${statements.length}] ✅\r`)
            }
        } catch (err: any) {
            if (err.message?.includes('already exists')) {
                console.log(`   ⚠ Skipped (already exists): ${stmt.substring(0, 50)}...`)
                success++
            } else {
                console.error(`\n   ❌ Statement ${i + 1} failed:`)
                console.error(`      SQL: ${stmt.substring(0, 120)}...`)
                console.error(`      Error: ${err.message}`)
                failed++
            }
        }
    }

    console.log(`\n   Result: ✅ ${success} succeeded, ${failed} failed`)
    return failed
}

async function verify() {
    console.log('\n🔍 Verifying migration...')

    const tables = ['brands', 'product_series', 'products', 'product_tags', 'top_n_pages', 'product_articles']

    for (const table of tables) {
        try {
            const result = await client.execute(`SELECT COUNT(*) as cnt FROM ${table}`)
            const count = result.rows[0]?.cnt ?? 0
            console.log(`   ✅ ${table}: ${count} rows`)
        } catch (err: any) {
            console.error(`   ❌ ${table}: ${err.message}`)
        }
    }
}

async function main() {
    console.log('🚀 Brand/Model Database Migration')
    console.log(`   Database: ${url}`)
    console.log('─'.repeat(50))

    const baseDir = join(process.cwd(), 'database')

    let totalFailures = 0

    // Step 1: Migration (schema)
    totalFailures += await runSQLFile(
        join(baseDir, 'migrations', 'brand-model-system.sql'),
        'Schema Migration (6 tables + indexes)'
    )

    // Step 2: Seed brands
    totalFailures += await runSQLFile(
        join(baseDir, 'seeds', 'brands-seed.sql'),
        'Brand Seed Data (6 brands)'
    )

    // Step 3: Seed products (includes product_series and product_tags)
    totalFailures += await runSQLFile(
        join(baseDir, 'seeds', 'products-seed.sql'),
        'Product Seed Data (series + SKUs + tags)'
    )

    // Step 3.5: Seed expansion brands + products
    totalFailures += await runSQLFile(
        join(baseDir, 'seeds', 'brands-expansion-seed.sql'),
        'Brand Expansion Data (8 new brands + products)'
    )

    // Step 3.6: Seed expansion #2 brands + products
    totalFailures += await runSQLFile(
        join(baseDir, 'seeds', 'brands-expansion-2-seed.sql'),
        'Brand Expansion #2 Data (6 more brands + products)'
    )

    // Step 3.7: Seed expansion #3 brands + products
    totalFailures += await runSQLFile(
        join(baseDir, 'seeds', 'brands-expansion-3-seed.sql'),
        'Brand Expansion #3 Data (7 brands + existing brand products)'
    )

    // Step 4: Seed top_n_pages
    totalFailures += await runSQLFile(
        join(baseDir, 'seeds', 'top-n-pages-seed.sql'),
        'Top N Pages Seed Data (20 SEO pages)'
    )

    // Step 5: Verify
    await verify()

    console.log('\n' + '─'.repeat(50))
    if (totalFailures === 0) {
        console.log('✅ Migration complete — all statements succeeded!')
    } else {
        console.log(`⚠ Migration finished with ${totalFailures} failures`)
    }

    process.exit(totalFailures > 0 ? 1 : 0)
}

main()
