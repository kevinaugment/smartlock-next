/**
 * Markdown渲染工具
 * 服务器端转换Markdown为HTML，支持语法高亮和目录生成
 */

import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

export interface Heading {
  level: number
  text: string
  id: string
}

// 配置语法高亮
const highlight = markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
})

// 配置marked
marked.use(highlight)
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // 换行支持
})

// 自定义renderer添加heading ID
const renderer = new marked.Renderer()
renderer.heading = ({ tokens, depth }) => {
  const text = renderer.parser.parseInline(tokens)
  const id = generateId(text)
  return `<h${depth} id="${id}">${text}</h${depth}>`
}
marked.use({ renderer })

/**
 * 生成URL安全的ID
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '') // 移除HTML标签
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/-+/g, '-') // 多个连字符合并为一个
    .trim()
}

/**
 * 转换Markdown为HTML
 */
export function renderMarkdown(content: string): string {
  try {
    return marked.parse(content) as string
  } catch (error) {
    console.error('Markdown render error:', error)
    return `<p class="text-red-600">Failed to render markdown content</p>`
  }
}

/**
 * 提取标题作为目录
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Heading[] = []
  
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length // 计算#的数量
    const text = match[2].trim()
    const id = generateId(text)
    
    // 只提取 H2 和 H3（H1 通常是标题）
    if (level >= 2 && level <= 3) {
      headings.push({ level, text, id })
    }
  }
  
  return headings
}
