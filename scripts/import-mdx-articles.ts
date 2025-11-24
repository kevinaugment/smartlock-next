// 从旧站MDX文件批量导入文章到Turso
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { glob } from 'glob'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

// Category mapping: slug -> id
const CATEGORY_MAP: Record<string, number> = {
  'protocols': 1,
  'security': 2,
  'installation': 3,
  'guides': 4,
  'use-cases': 5,
  'support': 6,
  'integration': 7,
  'technical': 1, // 映射到protocols
}

interface Frontmatter {
  title: string
  description: string
  category: string
  pubDate?: string
  wordCount?: number
  readingTime?: number
  keywords?: string[]
  tags?: string[]
  isPillar?: boolean
  featured?: boolean
}

function parseMDX(filePath: string): { frontmatter: Frontmatter; content: string } {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  
  // 提取frontmatter
  const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) {
    throw new Error(`No frontmatter found in ${filePath}`)
  }
  
  const frontmatterText = frontmatterMatch[1]
  const content = fileContent.slice(frontmatterMatch[0].length).trim()
  
  // 解析YAML frontmatter (简单版本)
  const frontmatter: any = {}
  const lines = frontmatterText.split('\n')
  let currentKey = ''
  let isArray = false
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    
    if (trimmed.startsWith('- ')) {
      // Array item
      if (isArray && currentKey) {
        if (!frontmatter[currentKey]) frontmatter[currentKey] = []
        frontmatter[currentKey].push(trimmed.slice(2).replace(/['"]/g, ''))
      }
    } else if (trimmed.includes(':')) {
      // Key-value pair
      const colonIndex = trimmed.indexOf(':')
      const key = trimmed.slice(0, colonIndex).trim()
      let value = trimmed.slice(colonIndex + 1).trim()
      
      if (!value) {
        // Next lines might be array
        currentKey = key
        isArray = true
        frontmatter[key] = []
      } else {
        isArray = false
        currentKey = ''
        // Remove quotes
        value = value.replace(/^["']|["']$/g, '')
        // Parse booleans and numbers
        if (value === 'true') value = true as any
        else if (value === 'false') value = false as any
        else if (!isNaN(Number(value))) value = Number(value) as any
        frontmatter[key] = value
      }
    }
  }
  
  return { frontmatter: frontmatter as Frontmatter, content }
}

async function importArticles() {
  console.log('📚 Scanning MDX files from old site...\n')
  
  // 查找所有MDX文件
  const mdxFiles = await glob('smartlockold/src/content/articles/**/*.mdx', {
    cwd: path.join(__dirname, '..'),
    absolute: true,
  })
  
  console.log(`Found ${mdxFiles.length} MDX files\n`)
  
  let imported = 0
  let skipped = 0
  let failed = 0
  
  for (const filePath of mdxFiles) {
    try {
      const { frontmatter, content } = parseMDX(filePath)
      
      // 获取category_id
      const categoryId = CATEGORY_MAP[frontmatter.category] || 6 // default to support
      
      // 生成slug from filename
      const fileName = path.basename(filePath, '.mdx')
      const slug = fileName
      
      // 插入到数据库
      await client.execute({
        sql: `INSERT OR IGNORE INTO articles 
              (title, slug, description, content, category_id, author_id, status, 
               reading_time, word_count, published_at, is_pillar, featured) 
              VALUES (?, ?, ?, ?, ?, 1, 'published', ?, ?, ?, ?, ?)`,
        args: [
          frontmatter.title,
          slug,
          frontmatter.description,
          content,
          categoryId,
          frontmatter.readingTime || 5,
          frontmatter.wordCount || 1000,
          frontmatter.pubDate || new Date().toISOString(),
          frontmatter.isPillar ? 1 : 0,
          frontmatter.featured ? 1 : 0,
        ]
      })
      
      imported++
      if (imported % 10 === 0) {
        console.log(`✅ Imported ${imported}/${mdxFiles.length} articles...`)
      }
    } catch (e: any) {
      if (e.message.includes('UNIQUE')) {
        skipped++
      } else {
        console.error(`⚠️  Failed ${path.basename(filePath)}: ${e.message}`)
        failed++
      }
    }
  }
  
  console.log(`\n✅ Import complete!`)
  console.log(`   Imported: ${imported}`)
  console.log(`   Skipped (duplicates): ${skipped}`)
  console.log(`   Failed: ${failed}\n`)
  
  // 统计
  const result = await client.execute(`
    SELECT c.name, c.icon, COUNT(a.id) as count 
    FROM categories c 
    LEFT JOIN articles a ON c.id = a.category_id AND a.status = 'published'
    GROUP BY c.id 
    ORDER BY c.display_order
  `)
  
  console.log('📊 Articles by category:')
  let total = 0
  for (const row of result.rows) {
    console.log(`   ${row.icon} ${row.name}: ${row.count} articles`)
    total += Number(row.count)
  }
  console.log(`\n   📚 Total: ${total} published articles`)
  
  console.log('\n🎉 Done! Refresh your site to see all articles!')
}

importArticles().catch(console.error)
