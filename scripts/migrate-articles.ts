/**
 * 文章迁移脚本
 * 从旧Astro项目导入MDX文章到D1数据库
 * 
 * 使用方法:
 * npm run migrate:articles
 */

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

// 配置
const OLD_PROJECT_PATH = '/Users/luokun/Documents/GitHub/smartlock'
const ARTICLES_PATH = path.join(OLD_PROJECT_PATH, 'src/content/articles')

// 分类映射
const CATEGORY_MAPPING: Record<string, number> = {
  'protocols': 1,
  'security': 2,
  'installation': 3,
  'guides': 4,
  'use-cases': 5,
  'support': 6,
  'integration': 7,
  'technical': 1, // 映射到protocols
}

interface ArticleFrontmatter {
  title: string
  description: string
  category: string
  pubDate: Date
  updatedDate?: Date
  author?: string
  wordCount: number
  readingTime: number
  keywords: string[]
  tags: string[]
  isPillar?: boolean
  isSupport?: boolean
  featured?: boolean
  featuredImage?: string
  relatedArticles?: string[]
}

interface ArticleInsert {
  title: string
  slug: string
  description: string
  content: string
  category_id: number
  author_id: number
  is_pillar: boolean
  featured: boolean
  reading_time: number
  word_count: number
  meta_keywords: string
  status: string
  published_at: string
  created_at: string
  updated_at: string
}

/**
 * 读取所有MDX文件
 */
async function getAllArticles(): Promise<{ path: string; data: any; content: string }[]> {
  const articles: { path: string; data: any; content: string }[] = []
  
  async function readDir(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        await readDir(fullPath)
      } else if (entry.name.endsWith('.mdx')) {
        try {
          const fileContent = await fs.readFile(fullPath, 'utf-8')
          const { data, content } = matter(fileContent)
          articles.push({ path: fullPath, data, content })
        } catch (error) {
          console.error(`Error reading ${fullPath}:`, error)
        }
      }
    }
  }
  
  await readDir(ARTICLES_PATH)
  return articles
}

/**
 * 生成slug
 */
function generateSlug(filePath: string): string {
  const filename = path.basename(filePath, '.mdx')
  return filename
}

/**
 * 转换文章数据为SQL INSERT语句
 */
function articleToSQL(article: any, slug: string): ArticleInsert {
  const frontmatter = article.data as ArticleFrontmatter
  const categoryId = CATEGORY_MAPPING[frontmatter.category] || 6 // 默认support
  
  return {
    title: frontmatter.title,
    slug: slug,
    description: frontmatter.description,
    content: article.content,
    category_id: categoryId,
    author_id: 1, // 默认管理员ID
    is_pillar: frontmatter.isPillar || false,
    featured: frontmatter.featured || false,
    reading_time: frontmatter.readingTime || Math.ceil(frontmatter.wordCount / 200),
    word_count: frontmatter.wordCount || 0,
    meta_keywords: frontmatter.keywords?.join(', ') || '',
    status: 'published',
    published_at: frontmatter.pubDate?.toISOString() || new Date().toISOString(),
    created_at: frontmatter.pubDate?.toISOString() || new Date().toISOString(),
    updated_at: frontmatter.updatedDate?.toISOString() || new Date().toISOString(),
  }
}

/**
 * 生成SQL脚本
 */
async function generateMigrationSQL() {
  console.log('📚 开始读取文章...')
  const articles = await getAllArticles()
  console.log(`✅ 找到 ${articles.length} 篇文章`)
  
  let sql = `-- =====================================================
-- 文章数据迁移
-- 生成时间: ${new Date().toISOString()}
-- 总文章数: ${articles.length}
-- =====================================================

`
  
  let successCount = 0
  let errorCount = 0
  
  for (const article of articles) {
    try {
      const slug = generateSlug(article.path)
      const data = articleToSQL(article, slug)
      
      // 转义单引号
      const escape = (str: string) => str.replace(/'/g, "''")
      
      sql += `-- ${data.title}\n`
      sql += `INSERT INTO articles (
  title, slug, description, content,
  category_id, author_id, is_pillar, featured,
  reading_time, word_count, meta_keywords,
  status, published_at, created_at, updated_at
) VALUES (
  '${escape(data.title)}',
  '${escape(data.slug)}',
  '${escape(data.description)}',
  '${escape(data.content)}',
  ${data.category_id},
  ${data.author_id},
  ${data.is_pillar ? 1 : 0},
  ${data.featured ? 1 : 0},
  ${data.reading_time},
  ${data.word_count},
  '${escape(data.meta_keywords)}',
  '${data.status}',
  '${data.published_at}',
  '${data.created_at}',
  '${data.updated_at}'
);\n\n`
      
      successCount++
      
      // 处理标签（如果有）
      if (article.data.tags && Array.isArray(article.data.tags)) {
        for (const tag of article.data.tags) {
          const tagSlug = tag.toLowerCase().replace(/\s+/g, '-')
          sql += `INSERT OR IGNORE INTO tags (name, slug) VALUES ('${escape(tag)}', '${tagSlug}');\n`
          sql += `INSERT OR IGNORE INTO article_tags (article_id, tag_id) 
SELECT (SELECT id FROM articles WHERE slug = '${escape(data.slug)}'), id 
FROM tags WHERE slug = '${tagSlug}';\n`
        }
        sql += '\n'
      }
      
    } catch (error) {
      console.error(`❌ 处理失败: ${article.path}`, error)
      errorCount++
    }
  }
  
  sql += `-- =====================================================
-- 迁移统计
-- 成功: ${successCount}
-- 失败: ${errorCount}
-- =====================================================
`
  
  // 保存SQL文件
  const outputPath = path.join(process.cwd(), 'database/migrate-articles.sql')
  await fs.writeFile(outputPath, sql, 'utf-8')
  
  console.log(`\n✅ 迁移SQL已生成: ${outputPath}`)
  console.log(`📊 成功: ${successCount} 篇`)
  console.log(`❌ 失败: ${errorCount} 篇`)
  console.log(`\n📝 下一步:\n   wrangler d1 execute smartlock-production --remote --file=./database/migrate-articles.sql`)
}

// 运行迁移
generateMigrationSQL().catch(console.error)
