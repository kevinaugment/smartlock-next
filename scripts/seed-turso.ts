// 导入完整seed数据到Turso
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const TURSO_URL = process.env.TURSO_DATABASE_URL!
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN!

async function seed() {
  console.log('🚀 Starting seed...')
  
  const client = createClient({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  })

  try {
    // 读取并执行完整schema
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, '../database/schema.sql'),
      'utf-8'
    )
    
    console.log('📋 Creating tables from schema...')
    const schemaLines = schemaSQL.split('\n')
    let currentStatement = ''
    
    for (const line of schemaLines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('--')) continue
      
      currentStatement += line + '\n'
      
      if (trimmed.endsWith(';')) {
        try {
          await client.execute(currentStatement)
        } catch (e: any) {
          // Ignore "already exists" errors
          if (!e.message.includes('already exists')) {
            console.log(`⚠️ `, e.message)
          }
        }
        currentStatement = ''
      }
    }
    
    console.log('✅ Schema loaded')

    // 读取并执行seed数据
    const seedSQL = fs.readFileSync(
      path.join(__dirname, '../database/seed.sql'),
      'utf-8'
    )
    
    console.log('📦 Importing seed data...')
    const seedLines = seedSQL.split('\n')
    currentStatement = ''
    let count = 0
    
    for (const line of seedLines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('--')) continue
      
      currentStatement += line + '\n'
      
      if (trimmed.endsWith(';')) {
        try {
          await client.execute(currentStatement)
          count++
        } catch (e: any) {
          if (!e.message.includes('UNIQUE constraint')) {
            console.log(`⚠️  ${e.message.substring(0, 80)}`)
          }
        }
        currentStatement = ''
      }
    }
    
    console.log(`✅ Executed ${count} seed statements`)

    // 验证数据
    console.log('\n🔍 Verifying data...')
    const categories = await client.execute('SELECT COUNT(*) as count FROM categories')
    console.log(`   Categories: ${categories.rows[0].count}`)
    
    const articles = await client.execute('SELECT COUNT(*) as count FROM articles')
    console.log(`   Articles: ${articles.rows[0].count}`)
    
    const calculators = await client.execute('SELECT COUNT(*) as count FROM calculators')
    console.log(`   Calculators: ${calculators.rows[0].count}`)
    
    console.log('\n🎉 Seed completed successfully!')
    
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seed()
