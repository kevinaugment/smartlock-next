/**
 * 数据迁移脚本：从Astro MDX文件迁移到D1数据库
 * 
 * 使用方法:
 * npx tsx database/migrate-from-astro.ts
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 配置
const ASTRO_PROJECT_PATH = '../smartlock/src/content/articles'
const OUTPUT_SQL_FILE = './database/migrate-articles.sql'

interface FrontMatter {
  title: string
  description?: string
  category: string
  pubDate?: string
  wordCount?: number
  readingTime?: number
  keywords?: string[]
  tags?: string[]
  isPillar?: boolean
  isSupport?: boolean
  featured?: boolean
  relatedArticles?: string[]
  relatedTools?: string[]
  [key: string]: any
}

// 分类映射
const CATEGORY_MAP: Record<string, number> = {
  'protocols': 1,
  'security': 2,
  'installation': 3,
  'guides': 4,
  'use-cases': 5,
  'support': 6,
  'integration': 7,
}

/**
 * 递归获取所有MDX文件
 */
function getAllMDXFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir)
  
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      getAllMDXFiles(filePath, fileList)
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath)
    }
  })
  
  return fileList
}

/**
 * 解析MDX文件
 */
function parseMDXFile(filePath: string): {
  frontmatter: FrontMatter
  content: string
  slug: string
  category: string
} {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  // 从文件路径提取分类和slug
  const relativePath = filePath.replace(ASTRO_PROJECT_PATH, '')
  const parts = relativePath.split(path.sep).filter(p => p)
  const category = parts[0] // protocols, security等
  const filename = parts[parts.length - 1].replace('.mdx', '')
  
  return {
    frontmatter: data as FrontMatter,
    content: content.trim(),
    slug: filename,
    category,
  }
}

/**
 * 转义SQL字符串
 */
function escapeSQLString(str: string): string {
  if (!str) return 'NULL'
  return "'" + str.replace(/'/g, "''").replace(/\n/g, '\\n') + "'"
}

/**
 * 生成INSERT语句
 */
function generateInsertSQL(article: ReturnType<typeof parseMDXFile>): string {
  const { frontmatter, content, slug, category } = article
  
  const categoryId = CATEGORY_MAP[category] || 6 // 默认support
  const title = escapeSQLString(frontmatter.title)
  const description = escapeSQLString(frontmatter.description || '')
  const contentEscaped = escapeSQLString(content)
  const isPillar = frontmatter.isPillar ? 1 : 0
  const featured = frontmatter.featured ? 1 : 0
  const wordCount = frontmatter.wordCount || 0
  const readingTime = frontmatter.readingTime || Math.ceil(wordCount / 200)
  const metaTitle = escapeSQLString(frontmatter.title)
  const metaDescription = escapeSQLString(frontmatter.description || '')
  const metaKeywords = frontmatter.keywords ? escapeSQLString(frontmatter.keywords.join(', ')) : 'NULL'
  const publishedAt = frontmatter.pubDate ? `'${frontmatter.pubDate}'` : 'datetime("now")'
  
  return `
INSERT INTO articles (
  title, slug, description, content, 
  category_id, author_id, 
  is_pillar, featured, reading_time, word_count,
  meta_title, meta_description, meta_keywords,
  status, published_at, created_at, updated_at
) VALUES (
  ${title}, '${slug}', ${description}, ${contentEscaped},
  ${categoryId}, 1,
  ${isPillar}, ${featured}, ${readingTime}, ${wordCount},
  ${metaTitle}, ${metaDescription}, ${metaKeywords},
  'published', ${publishedAt}, datetime('now'), datetime('now')
);`
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始迁移数据...\n')
  
  // 检查源目录
  const astroPath = path.resolve(__dirname, ASTRO_PROJECT_PATH)
  if (!fs.existsSync(astroPath)) {
    console.error(`❌ 找不到Astro项目目录: ${astroPath}`)
    process.exit(1)
  }
  
  // 获取所有MDX文件
  console.log('📁 扫描MDX文件...')
  const mdxFiles = getAllMDXFiles(astroPath)
  console.log(`✅ 找到 ${mdxFiles.length} 个MDX文件\n`)
  
  // 生成SQL
  const sqlStatements: string[] = []
  const tags = new Set<string>()
  const articleSlugs = new Map<string, number>() // slug -> article_id
  let articleId = 1
  
  console.log('🔄 解析文章并生成SQL...')
  
  mdxFiles.forEach((file, index) => {
    try {
      const article = parseMDXFile(file)
      const sql = generateInsertSQL(article)
      sqlStatements.push(sql)
      articleSlugs.set(article.slug, articleId++)
      
      // 收集标签
      if (article.frontmatter.tags) {
        article.frontmatter.tags.forEach(tag => tags.add(tag))
      }
      
      console.log(`  ✓ [${index + 1}/${mdxFiles.length}] ${article.frontmatter.title}`)
    } catch (error) {
      console.error(`  ✗ 处理失败: ${file}`, error)
    }
  })
  
  // 生成标签INSERT
  console.log('\n🏷️  生成标签数据...')
  const tagSql: string[] = []
  tags.forEach(tag => {
    const slug = tag.toLowerCase().replace(/[^a-z0-9-]/g, '-')
    tagSql.push(`INSERT INTO tags (name, slug) VALUES ('${tag}', '${slug}');`)
  })
  
  // 写入SQL文件
  const outputPath = path.resolve(__dirname, OUTPUT_SQL_FILE)
  const finalSQL = `
-- =====================================================
-- 文章数据迁移 - 从Astro到D1
-- 生成时间: ${new Date().toISOString()}
-- 文章数量: ${mdxFiles.length}
-- 标签数量: ${tags.size}
-- =====================================================

-- 清空现有文章数据（如果需要）
-- DELETE FROM article_tags;
-- DELETE FROM article_relations;
-- DELETE FROM articles;
-- DELETE FROM tags;

-- 插入标签
${tagSql.join('\n')}

-- 插入文章
${sqlStatements.join('\n')}

-- =====================================================
-- 迁移完成
-- =====================================================
`
  
  fs.writeFileSync(outputPath, finalSQL, 'utf-8')
  
  console.log('\n✅ SQL文件生成成功!')
  console.log(`📄 文件路径: ${outputPath}`)
  console.log(`📊 统计:`)
  console.log(`   - 文章数量: ${mdxFiles.length}`)
  console.log(`   - 标签数量: ${tags.size}`)
  console.log(`   - SQL大小: ${(finalSQL.length / 1024 / 1024).toFixed(2)} MB`)
  console.log('\n💡 下一步:')
  console.log('   npx wrangler d1 execute smartlock-production --remote --file=./database/migrate-articles.sql')
}

// 运行
main().catch(console.error)
