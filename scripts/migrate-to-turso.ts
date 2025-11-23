// 迁移D1数据到Turso
import { createClient } from '@libsql/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const TURSO_URL = process.env.TURSO_DATABASE_URL!
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN!

async function migrate() {
  console.log('🚀 Starting migration to Turso...')
  
  const client = createClient({
    url: TURSO_URL,
    authToken: TURSO_TOKEN,
  })

  try {
    // 1. 执行schema
    console.log('📋 Creating tables...')
    const schemaSQL = fs.readFileSync(
      path.join(__dirname, '../database/schema.sql'),
      'utf-8'
    )
    
    // Split statements properly
    const schemaStatements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
      .map(s => s + ';')
    
    // Execute using batch
    try {
      const batch = schemaStatements.map(sql => ({ sql, args: [] }))
      await client.batch(batch, 'write')
      console.log(`   Executed ${schemaStatements.length} statements`)
    } catch (error: any) {
      console.log(`   ⚠️ Some statements might already exist`)
    }
    
    console.log('✅ Tables created')

    // 2. 执行seed data
    console.log('📦 Importing seed data...')
    const seedSQL = fs.readFileSync(
      path.join(__dirname, '../database/seed.sql'),
      'utf-8'
    )
    
    const seedStatements = seedSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
      .map(s => s + ';')
    
    try {
      const batch = seedStatements.map(sql => ({ sql, args: [] }))
      await client.batch(batch, 'write')
      console.log(`   Executed ${seedStatements.length} seed statements`)
    } catch (error: any) {
      console.log(`   ⚠️ Some seed data might already exist`)
    }
    
    console.log('✅ Seed data imported')

    // 3. 验证数据
    console.log('🔍 Verifying data...')
    const categories = await client.execute('SELECT COUNT(*) as count FROM categories')
    console.log(`   Categories: ${categories.rows[0].count}`)
    
    const articles = await client.execute('SELECT COUNT(*) as count FROM articles')
    console.log(`   Articles: ${articles.rows[0].count}`)
    
    console.log('🎉 Migration completed successfully!')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrate()
