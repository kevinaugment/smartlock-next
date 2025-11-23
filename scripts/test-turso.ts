// 测试Turso连接
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const TURSO_URL = process.env.TURSO_DATABASE_URL!
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN!

console.log('URL:', TURSO_URL?.substring(0, 50) + '...')
console.log('Token:', TURSO_TOKEN?.substring(0, 20) + '...')

async function test() {
  const client = createClient({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  })

  try {
    // 测试创建一个简单的表
    console.log('\n1. Creating categories table...')
    await client.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        icon TEXT,
        description TEXT
      )
    `)
    console.log('✅ Table created')

    // 插入测试数据
    console.log('\n2. Inserting test data...')
    await client.execute({
      sql: "INSERT INTO categories (name, slug, icon, description) VALUES (?, ?, ?, ?)",
      args: ['Test', 'test', '🧪', 'Test category']
    })
    console.log('✅ Data inserted')

    // 查询数据
    console.log('\n3. Querying data...')
    const result = await client.execute('SELECT * FROM categories')
    console.log(`✅ Found ${result.rows.length} rows:`)
    console.log(result.rows)

  } catch (error) {
    console.error('❌ Error:', error)
  }
}

test()
