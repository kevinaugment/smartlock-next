// 重置Turso数据库
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

async function reset() {
  console.log('🗑️  Dropping all tables...')
  
  const tables = ['audit_logs', 'analytics', 'settings', 'navigation', 'pages', 'article_tags', 
                  'tags', 'calculators', 'articles', 'categories', 'users']
  
  for (const table of tables) {
    try {
      await client.execute(`DROP TABLE IF EXISTS ${table}`)
      console.log(`   Dropped ${table}`)
    } catch (e) {
      console.log(`   ${table} doesn't exist`)
    }
  }
  
  console.log('\n📋 Creating tables...')
  
  // 创建categories表（匹配seed.sql的列）
  await client.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      icon TEXT,
      color TEXT,
      description TEXT,
      display_order INTEGER DEFAULT 0,
      meta_title TEXT,
      meta_description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  console.log('✅ categories table created')
  
  // 插入7个分类
  console.log('\n📦 Inserting categories...')
  const categories = [
    ['Protocols', 'protocols', '📡', '#0ea5e9', 'Smart lock protocols and connectivity guides', 1],
    ['Security', 'security', '🔒', '#ef4444', 'Security analysis and best practices', 2],
    ['Installation', 'installation', '🔋', '#10b981', 'Battery management and installation guides', 3],
    ['Guides', 'guides', '🔧', '#f59e0b', 'Troubleshooting and problem-solving guides', 4],
    ['Use Cases', 'use-cases', '🏢', '#8b5cf6', 'Real-world smart lock applications', 5],
    ['Support', 'support', '💡', '#06b6d4', 'Quick support and how-to articles', 6],
    ['Integration', 'integration', '🔗', '#ec4899', 'System integration and API guides', 7],
  ]
  
  for (const cat of categories) {
    await client.execute({
      sql: `INSERT INTO categories (name, slug, icon, color, description, display_order) 
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: cat
    })
  }
  
  console.log(`✅ Inserted ${categories.length} categories`)
  
  // 创建articles表
  await client.execute(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      content TEXT,
      category_id INTEGER,
      reading_time INTEGER DEFAULT 5,
      word_count INTEGER DEFAULT 0,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      author_name TEXT DEFAULT 'Smart Lock Hub',
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `)
  console.log('✅ articles table created')
  
  // 验证
  const result = await client.execute('SELECT name, slug, icon FROM categories ORDER BY display_order')
  console.log('\n🔍 Verifying categories:')
  for (const row of result.rows) {
    console.log(`   ${row.icon} ${row.name} (${row.slug})`)
  }
  
  console.log('\n🎉 Reset completed!')
}

reset()
