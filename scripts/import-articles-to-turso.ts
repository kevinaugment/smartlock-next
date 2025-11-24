// 导入文章数据到Turso
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

async function importArticles() {
  console.log('📚 Starting articles import to Turso...\n')
  
  try {
    // 读取文章迁移SQL
    const articlesSQL = fs.readFileSync(
      path.join(__dirname, '../database/migrate-articles.sql'),
      'utf-8'
    )
    
    console.log('📄 File loaded, parsing SQL statements...')
    
    // 逐行处理，因为文件很大
    const lines = articlesSQL.split('\n')
    let currentStatement = ''
    let articleCount = 0
    let insertCount = 0
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // 跳过注释和空行
      if (!line || line.startsWith('--')) {
        if (line.includes('总文章数:')) {
          const match = line.match(/总文章数:\s*(\d+)/)
          if (match) {
            articleCount = parseInt(match[1])
            console.log(`✅ Found ${articleCount} articles to import\n`)
          }
        }
        continue
      }
      
      currentStatement += line + '\n'
      
      // 检测INSERT语句结束
      if (line.endsWith(');')) {
        try {
          await client.execute(currentStatement)
          insertCount++
          
          if (insertCount % 10 === 0) {
            console.log(`   Imported ${insertCount}/${articleCount} articles...`)
          }
        } catch (e: any) {
          // 忽略重复插入错误
          if (!e.message.includes('UNIQUE constraint')) {
            console.error(`⚠️  Failed to import article: ${e.message.substring(0, 100)}`)
          }
        }
        currentStatement = ''
      }
    }
    
    console.log(`\n✅ Import completed!`)
    console.log(`   Total inserted: ${insertCount} articles\n`)
    
    // 验证导入
    console.log('🔍 Verifying import...')
    const result = await client.execute('SELECT COUNT(*) as count FROM articles')
    console.log(`   Articles in database: ${result.rows[0].count}`)
    
    // 按分类统计
    const byCategory = await client.execute(`
      SELECT c.name, c.slug, COUNT(a.id) as count 
      FROM categories c 
      LEFT JOIN articles a ON c.id = a.category_id 
      GROUP BY c.id 
      ORDER BY c.display_order
    `)
    
    console.log('\n📊 Articles by category:')
    for (const row of byCategory.rows) {
      console.log(`   ${row.name} (${row.slug}): ${row.count} articles`)
    }
    
    console.log('\n🎉 Migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Import failed:', error)
    process.exit(1)
  }
}

importArticles()
