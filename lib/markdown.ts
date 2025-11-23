/**
 * Markdown渲染工具
 * 服务器端转换Markdown为HTML
 */

import { marked } from 'marked'

// 配置marked
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // 换行支持
})

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
export function extractHeadings(content: string) {
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  const headings: Array<{ level: number; text: string; id: string }> = []
  
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].indexOf(' ')
    const text = match[1]
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    
    headings.push({ level, text, id })
  }
  
  return headings
}
