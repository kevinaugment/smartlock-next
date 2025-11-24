#!/usr/bin/env tsx
/**
 * 硬编码文章迁移脚本
 * 从smartlockold复制所有MDX文章到新项目的app/_articles目录
 * 并自动生成完整的注册表
 */

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

// 配置
const OLD_ARTICLES_PATH = path.join(process.cwd(), 'smartlockold/src/content/articles')
const NEW_ARTICLES_PATH = path.join(process.cwd(), 'app/_articles')
const REGISTRY_PATH = path.join(process.cwd(), 'lib/articles/registry.ts')

interface ArticleFrontmatter {
  title: string
  description: string
  category: string
  pubDate: string | Date
  updatedDate?: string | Date
  author?: string
  wordCount: number
  readingTime: number
  keywords: string[]
  tags: string[]
  isPillar?: boolean
  isSupport?: boolean
  featured?: boolean
  relatedArticles?: string[]
  relatedTools?: string[]
}

interface ArticleFile {
  slug: string
  category: string
  frontmatter: ArticleFrontmatter
  content: string
  originalPath: string
}

// 文章重新分类映射
const RECLASSIFY_MAP: Record<string, string> = {
  // 电池相关 -> installation
  'how-to-change-smart-lock-battery': 'installation',
  'emergency-battery-died-locked-out': 'installation',
  
  // 安装配置相关 -> installation  
  'install-smart-lock-step-by-step': 'installation',
  'smart-lock-setup-checklist': 'installation',
  'test-smart-lock-after-install': 'installation',
  'calibrate-smart-lock': 'installation',
  'door-sensor-not-working': 'installation',
  'clean-maintain-smart-lock': 'installation',
  'update-smart-lock-firmware': 'installation',
  
  // 连接和网络相关 -> protocols
  'smart-lock-keeps-going-offline': 'protocols',
  'improve-connection-stability': 'protocols',
  'smart-lock-disconnects-after-power-outage': 'protocols',
  'command-timeout-errors': 'protocols',
  'connect-lock-to-homekit': 'protocols',
  
  // 用户和访问管理 -> guides
  'how-to-add-user-code': 'guides',
  'create-temporary-guest-code': 'guides',
  'delete-smart-lock-user': 'guides',
  'share-access-securely': 'guides',
  'add-fingerprint-to-lock': 'guides',
  'change-master-code': 'guides',
  'forgot-master-code-reset': 'guides',
  
  // 故障排查 -> guides
  'smart-lock-code-not-working': 'guides',
  'fingerprint-not-recognized': 'guides',
  'smart-lock-shows-wrong-status': 'guides',
  'smart-lock-wont-lock-unlock-completely': 'guides',
  'lock-auto-relocks-immediately': 'guides',
  'lock-motor-noise-troubleshooting': 'guides',
  'lock-unresponsive-after-firmware-update': 'guides',
  'improve-auto-lock-reliability': 'guides',
  
  // 安全相关 -> security
  'secure-smart-lock-best-practices': 'security',
  'multiple-failed-code-attempts': 'security',
  'audit-trail-forensic-analysis': 'security',
  
  // 集成相关 -> integration
  'set-up-lock-automations': 'integration',
  'doorbell-smart-lock-integration': 'integration',
  'local-vs-cloud-architecture': 'integration',
}

/**
 * 递归读取所有MDX文件
 */
async function getAllMDXFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        const subFiles = await getAllMDXFiles(fullPath)
        files.push(...subFiles)
      } else if (entry.name.endsWith('.mdx')) {
        files.push(fullPath)
      }
    }
  } catch (error: any) {
    console.error(`Error reading directory ${dir}:`, error.message)
  }
  
  return files
}

/**
 * 解析MDX文件
 */
async function parseMDXFile(filePath: string): Promise<ArticleFile | null> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    // 从路径提取分类和slug
    const relativePath = path.relative(OLD_ARTICLES_PATH, filePath)
    const parts = relativePath.split(path.sep)
    let category = parts[0]
    const filename = path.basename(filePath, '.mdx')
    
    // 重新分类：如果在映射表中，使用新分类
    if (RECLASSIFY_MAP[filename]) {
      category = RECLASSIFY_MAP[filename]
      console.log(`   🔄 重新分类: ${filename} -> ${category}`)
    }
    
    const frontmatter = data as ArticleFrontmatter
    
    return {
      slug: filename,
      category,
      frontmatter,
      content,
      originalPath: filePath,
    }
  } catch (error: any) {
    console.error(`Error parsing ${filePath}:`, error.message)
    return null
  }
}

/**
 * 格式化日期
 */
function formatDate(date: string | Date | undefined): string {
  if (!date) return new Date().toISOString().split('T')[0]
  if (typeof date === 'string') return date
  return date.toISOString().split('T')[0]
}

/**
 * 生成TypeScript注册表代码
 */
function generateRegistryCode(articles: ArticleFile[]): string {
  let code = `/**
 * 文章注册表 - 所有文章的元数据索引
 * 从旧站点迁移的硬编码文章
 * 自动生成于: ${new Date().toISOString()}
 * 总文章数: ${articles.length}
 */

import { ArticleMetadata } from './types';

export const articleRegistry: Record<string, ArticleMetadata> = {\n`

  // 按分类分组
  const byCategory: Record<string, ArticleFile[]> = {}
  articles.forEach(article => {
    if (!byCategory[article.category]) {
      byCategory[article.category] = []
    }
    byCategory[article.category].push(article)
  })

  // 生成每个分类的文章
  const categoryOrder = ['guides', 'use-cases', 'protocols', 'security', 'installation', 'integration', 'support']
  
  for (const category of categoryOrder) {
    if (!byCategory[category]) continue
    
    const categoryName = category.toUpperCase().replace(/-/g, ' ')
    code += `\n  // ==================== ${categoryName} ====================\n`
    
    const categoryArticles = byCategory[category]
    
    for (let i = 0; i < categoryArticles.length; i++) {
      const article = categoryArticles[i]
      const fm = article.frontmatter
      
      code += `  '${article.slug}': {\n`
      code += `    slug: '${article.slug}',\n`
      code += `    title: ${JSON.stringify(fm.title)},\n`
      code += `    description: ${JSON.stringify(fm.description)},\n`
      code += `    category: '${category}',\n`
      code += `    pubDate: '${formatDate(fm.pubDate)}',\n`
      code += `    wordCount: ${fm.wordCount || 0},\n`
      code += `    readingTime: ${fm.readingTime || 5},\n`
      code += `    keywords: ${JSON.stringify(fm.keywords || [])},\n`
      code += `    tags: ${JSON.stringify(fm.tags || [])},\n`
      code += `    isPillar: ${fm.isPillar || false},\n`
      code += `    isSupport: ${fm.isSupport || false},\n`
      code += `    featured: ${fm.featured || false},\n`
      
      if (fm.relatedArticles && fm.relatedArticles.length > 0) {
        code += `    relatedArticles: ${JSON.stringify(fm.relatedArticles)},\n`
      }
      
      if (fm.relatedTools && fm.relatedTools.length > 0) {
        code += `    relatedTools: ${JSON.stringify(fm.relatedTools)},\n`
      }
      
      code += `  },\n`
    }
  }

  code += `};

/**
 * 按类别获取文章列表
 */
export function getArticlesByCategory(category: string): ArticleMetadata[] {
  return Object.values(articleRegistry).filter(
    (article) => article.category === category
  );
}

/**
 * 获取特色文章
 */
export function getFeaturedArticles(): ArticleMetadata[] {
  return Object.values(articleRegistry).filter((article) => article.featured);
}

/**
 * 获取核心支柱文章
 */
export function getPillarArticles(): ArticleMetadata[] {
  return Object.values(articleRegistry).filter((article) => article.isPillar);
}

/**
 * 根据slug获取文章
 */
export function getArticleBySlug(slug: string): ArticleMetadata | undefined {
  return articleRegistry[slug];
}

/**
 * 获取所有文章
 */
export function getAllArticles(): ArticleMetadata[] {
  return Object.values(articleRegistry);
}

/**
 * 搜索文章
 */
export function searchArticles(query: string): ArticleMetadata[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(articleRegistry).filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery)) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * 获取分类统计
 */
export function getCategoryStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  Object.values(articleRegistry).forEach((article) => {
    stats[article.category] = (stats[article.category] || 0) + 1;
  });
  return stats;
}
`

  return code
}

/**
 * 复制MDX文件到新位置
 */
async function copyArticleFile(article: ArticleFile): Promise<void> {
  const destDir = path.join(NEW_ARTICLES_PATH, article.category)
  const destFile = path.join(destDir, `${article.slug}.mdx`)
  
  // 确保目录存在
  await fs.mkdir(destDir, { recursive: true })
  
  // 重新生成frontmatter + content
  const fullContent = `---
title: "${article.frontmatter.title.replace(/"/g, '\\"')}"
description: "${article.frontmatter.description.replace(/"/g, '\\"')}"
category: ${article.category}
pubDate: ${formatDate(article.frontmatter.pubDate)}
wordCount: ${article.frontmatter.wordCount || 0}
readingTime: ${article.frontmatter.readingTime || 5}
keywords:
${article.frontmatter.keywords.map(kw => `  - "${kw}"`).join('\n')}
tags:
${article.frontmatter.tags.map(tag => `  - "${tag}"`).join('\n')}
isPillar: ${article.frontmatter.isPillar || false}
isSupport: ${article.frontmatter.isSupport || false}
featured: ${article.frontmatter.featured || false}
${article.frontmatter.relatedArticles ? `relatedArticles:\n${article.frontmatter.relatedArticles.map(ra => `  - "${ra}"`).join('\n')}` : ''}
${article.frontmatter.relatedTools ? `relatedTools:\n${article.frontmatter.relatedTools.map(rt => `  - "${rt}"`).join('\n')}` : ''}
---

${article.content}
`
  
  await fs.writeFile(destFile, fullContent, 'utf-8')
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始硬编码文章迁移...\n')
  
  // 1. 读取所有MDX文件
  console.log('📖 读取旧文章...')
  const mdxFiles = await getAllMDXFiles(OLD_ARTICLES_PATH)
  console.log(`   找到 ${mdxFiles.length} 个MDX文件\n`)
  
  // 2. 解析所有文章
  console.log('🔍 解析文章内容...')
  const articles: ArticleFile[] = []
  for (const filePath of mdxFiles) {
    const article = await parseMDXFile(filePath)
    if (article) {
      articles.push(article)
      console.log(`   ✅ ${article.category}/${article.slug}`)
    }
  }
  console.log(`\n   成功解析 ${articles.length} 篇文章\n`)
  
  // 3. 创建目标目录
  console.log('📁 创建目标目录...')
  await fs.mkdir(NEW_ARTICLES_PATH, { recursive: true })
  console.log(`   ✅ ${NEW_ARTICLES_PATH}\n`)
  
  // 4. 复制文章文件
  console.log('📝 复制文章文件...')
  for (const article of articles) {
    await copyArticleFile(article)
    console.log(`   ✅ ${article.category}/${article.slug}.mdx`)
  }
  console.log(`\n   成功复制 ${articles.length} 个文件\n`)
  
  // 5. 生成注册表
  console.log('🗂️  生成文章注册表...')
  const registryCode = generateRegistryCode(articles)
  await fs.writeFile(REGISTRY_PATH, registryCode, 'utf-8')
  console.log(`   ✅ ${REGISTRY_PATH}\n`)
  
  // 6. 统计信息
  console.log('📊 迁移统计:')
  const stats: Record<string, number> = {}
  articles.forEach(a => {
    stats[a.category] = (stats[a.category] || 0) + 1
  })
  
  Object.entries(stats).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`   ${cat.padEnd(15)} : ${count} 篇`)
  })
  
  console.log(`\n✅ 迁移完成！共 ${articles.length} 篇文章`)
  console.log('\n📝 下一步:')
  console.log('   1. 检查 app/_articles/ 目录中的文章')
  console.log('   2. 检查 lib/articles/registry.ts 注册表')
  console.log('   3. 实现文章页面路由')
  console.log('   4. 测试文章访问\n')
}

// 运行
main().catch(error => {
  console.error('❌ 迁移失败:', error)
  process.exit(1)
})
