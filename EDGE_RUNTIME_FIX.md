# Edge Runtime 修复说明

## 🐛 问题

构建失败，错误信息：
```
Failed to compile.
./node_modules/react-markdown/lib/index.js
Attempted import error: 'useState' is not exported from 'react' (imported as 'useState').
```

## 🔍 根本原因

`react-markdown` 是一个客户端组件，使用了 `useState` 和 `useEffect` 等 React hooks。

**Edge Runtime 限制**：
- 不支持客户端组件
- 不支持 `useState`, `useEffect` 等 hooks
- 只支持服务器端渲染

**冲突**：
```typescript
export const runtime = 'edge'  // ← Edge Runtime
import ReactMarkdown from 'react-markdown'  // ← 客户端组件 ❌
```

## ✅ 临时解决方案

### 方案1：移除 react-markdown（已采用）
```typescript
// 使用简单的文本显示
<div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
  {article.content}
</div>
```

**优点**：
- ✅ 立即解决构建问题
- ✅ 保持 Edge Runtime 的性能优势
- ✅ 内容依然可读

**缺点**：
- ⚠️ 无格式化（无标题、加粗、链接等）
- ⚠️ 用户体验不够好

## 🎯 未来优化方案

### 方案A：服务器端 Markdown 解析（推荐）

使用纯 JavaScript 的 markdown 解析器，在服务器端转换为 HTML：

```typescript
import { marked } from 'marked'  // 或 markdown-it

// 服务器端转换
const html = marked(article.content)

// 渲染 HTML
<div dangerouslySetInnerHTML={{ __html: html }} />
```

**优点**：
- ✅ 保持 Edge Runtime
- ✅ 完整的 markdown 支持
- ✅ 更好的性能（服务器端处理）

**依赖**：
```bash
npm install marked
# 或
npm install markdown-it
```

### 方案B：移除 Edge Runtime

移除文章详情页的 `export const runtime = 'edge'`

**优点**：
- ✅ 可以使用 react-markdown
- ✅ 更丰富的功能（语法高亮等）

**缺点**：
- ⚠️ 失去 Edge Runtime 的性能优势
- ⚠️ 可能增加冷启动时间

### 方案C：混合方案

```typescript
// 文章列表和分类页面：Edge Runtime（快速）
export const runtime = 'edge'

// 文章详情页：标准 Runtime（功能完整）
// 不设置 runtime，使用默认值
```

## 📊 方案对比

| 方案 | 性能 | 功能 | 复杂度 | 推荐 |
|------|------|------|--------|------|
| A - 服务器端解析 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ✅ 推荐 |
| B - 移除 Edge | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | 🟡 可行 |
| C - 混合方案 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ✅ 推荐 |

## 🛠️ 实施计划

### 短期（当前）
- [x] 移除 react-markdown
- [x] 使用 pre-wrap 显示原始内容
- [x] 添加提示信息
- [x] 修复构建错误

### 中期（下一步）
- [ ] 安装 `marked` 或 `markdown-it`
- [ ] 实现服务器端 markdown 转 HTML
- [ ] 添加样式美化
- [ ] 保持 Edge Runtime

### 长期（优化）
- [ ] 添加语法高亮（highlight.js）
- [ ] 支持代码复制按钮
- [ ] 目录导航（TOC）
- [ ] 图片优化

## 📝 代码示例

### 推荐实现：marked + Edge Runtime

```typescript
import Link from 'next/link'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { marked } from 'marked'

export const runtime = 'edge'

export default async function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  // ... 获取文章数据
  
  // 服务器端转换 markdown
  const htmlContent = marked(article.content)
  
  return (
    <article>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
}
```

### 配置 marked

```typescript
import { marked } from 'marked'

// 配置选项
marked.setOptions({
  gfm: true,  // GitHub Flavored Markdown
  breaks: true,  // 换行支持
  headerIds: true,  // 标题ID
})
```

## 🔒 安全注意事项

使用 `dangerouslySetInnerHTML` 时：

1. **只渲染可信内容**
   - ✅ 数据库中的文章内容
   - ❌ 用户输入的内容

2. **XSS 防护**
   ```typescript
   import DOMPurify from 'isomorphic-dompurify'
   
   const clean = DOMPurify.sanitize(htmlContent)
   ```

3. **CSP 配置**
   在 `next.config.js` 中配置内容安全策略

## 📚 参考资料

- [Next.js Edge Runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)
- [marked 文档](https://marked.js.org/)
- [markdown-it 文档](https://github.com/markdown-it/markdown-it)
- [DOMPurify](https://github.com/cure53/DOMPurify)

---

## 🎯 当前状态

**构建状态**: 🔄 等待重新构建

**部署URL**: https://smartlock-next.pages.dev/

**测试页面**:
- `/articles` - 文章列表 ✅
- `/articles/support` - 分类页面 ✅  
- `/articles/support/smart-lock-troubleshooting-guide` - 文章详情 ⚠️ 原始文本

---

**最后更新**: 2025-11-23 19:51
**状态**: 已修复构建错误，等待部署验证
