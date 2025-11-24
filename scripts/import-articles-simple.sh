#!/bin/bash

# 简单的文章导入脚本
set -e

echo "📚 Importing articles to Turso..."
echo ""

# 使用@libsql/client直接导入
npx tsx << 'EOF'
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

async function main() {
  const sql = fs.readFileSync('database/migrate-articles.sql', 'utf-8')
  
  // 提取所有INSERT INTO articles语句
  const articleInserts = sql.match(/INSERT INTO articles[\s\S]*?\);/g) || []
  
  console.log(`Found ${articleInserts.length} article INSERT statements\n`)
  
  let success = 0
  let failed = 0
  
  for (let i = 0; i < articleInserts.length; i++) {
    try {
      await client.execute(articleInserts[i])
      success++
      if ((i + 1) % 5 === 0) {
        console.log(`✅ Imported ${i + 1}/${articleInserts.length} articles`)
      }
    } catch (e: any) {
      if (!e.message.includes('UNIQUE')) {
        console.log(`⚠️  Failed: ${e.message.substring(0, 80)}`)
        failed++
      }
    }
  }
  
  console.log(`\n✅ Import complete: ${success} success, ${failed} failed`)
  
  // 验证
  const result = await client.execute('SELECT COUNT(*) as count FROM articles')
  console.log(`📊 Total articles in DB: ${result.rows[0].count}`)
}

main().catch(console.error)
EOF
