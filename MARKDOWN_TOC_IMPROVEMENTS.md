# 📝 Markdown & TOC Improvements

## ✅ 完成的改进

### 1. 🎨 Markdown渲染增强

#### 安装依赖
```bash
npm install highlight.js marked-highlight
```

#### 功能改进
- ✅ **语法高亮**: highlight.js + GitHub Dark主题
- ✅ **Heading ID**: 自动生成锚点链接
- ✅ **GFM支持**: GitHub Flavored Markdown
- ✅ **代码块**: 完整语法高亮
- ✅ **表格**: 完整支持
- ✅ **列表**: 有序和无序列表
- ✅ **引用**: Blockquote样式

#### 代码高亮主题
**GitHub Dark Theme** - 89行CSS规则
- 关键字: `#ff7b72` (红色)
- 字符串: `#a5d6ff` (浅蓝)
- 数字: `#79c0ff` (蓝色)
- 注释: `#8b949e` (灰色，斜体)
- 函数: `#d2a8ff` (紫色)
- 类型: `#ffa657` (橙色)

---

### 2. 📑 侧边栏目录 (TOC)

#### 组件功能
**文件**: `components/TableOfContents.tsx`

**核心特性**:
- ✅ 自动提取H2和H3标题
- ✅ IntersectionObserver实时追踪
- ✅ 激活项高亮显示
- ✅ 平滑滚动到章节
- ✅ Sticky定位（top-24）
- ✅ 响应式（lg+显示）

#### 视觉设计
```css
激活状态:
- bg-blue-50
- text-blue-700
- border-l-2 border-blue-600
- font-semibold

悬停状态:
- bg-gray-50
- text-gray-900

H3缩进: ml-4
```

#### Quick Actions
1. **⬆️ Back to top** - 平滑滚动到顶部
2. **🖨️ Print article** - 打印文章
3. **🔗 Copy link** - 复制链接到剪贴板

---

### 3. 🏗️ 布局改进

#### 两栏布局
```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
  <article>
    {/* 主内容 */}
  </article>
  <aside>
    <TableOfContents />
  </aside>
</div>
```

#### 响应式
- **Mobile (< lg)**: 单列，隐藏侧边栏
- **Desktop (≥ lg)**: 两列，显示侧边栏
- **侧边栏宽度**: 280px固定
- **间距**: gap-8 (2rem)

---

### 4. 🔗 Heading锚点

#### 自动生成ID
```typescript
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')    // 移除HTML
    .replace(/[^\w\s-]/g, '')   // 移除特殊字符
    .replace(/\s+/g, '-')       // 空格→连字符
    .replace(/-+/g, '-')        // 合并连字符
    .trim()
}
```

#### 示例
```markdown
## Quick Decision Guide
→ <h2 id="quick-decision-guide">...</h2>

### Large home setup
→ <h3 id="large-home-setup">...</h3>
```

---

## 📊 技术实现

### Markdown配置
```typescript
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

// 语法高亮配置
const highlight = markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
})

marked.use(highlight)
marked.setOptions({
  gfm: true,
  breaks: true,
})
```

### 自定义Renderer
```typescript
const renderer = new marked.Renderer()
renderer.heading = ({ tokens, depth }) => {
  const text = renderer.parser.parseInline(tokens)
  const id = generateId(text)
  return `<h${depth} id="${id}">${text}</h${depth}>`
}
marked.use({ renderer })
```

### TOC提取
```typescript
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: Heading[] = []
  
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = generateId(text)
    
    // 只提取 H2 和 H3
    if (level >= 2 && level <= 3) {
      headings.push({ level, text, id })
    }
  }
  
  return headings
}
```

---

## 🎯 用户体验

### Before → After

| 功能 | 之前 | 现在 |
|------|------|------|
| **代码高亮** | ❌ 无 | ✅ 完整语法高亮 |
| **目录导航** | ❌ 无 | ✅ 侧边栏TOC |
| **章节跳转** | ❌ 无 | ✅ 点击平滑滚动 |
| **当前位置** | ❌ 无 | ✅ 实时高亮 |
| **快捷操作** | ❌ 无 | ✅ 3个快捷按钮 |
| **移动端** | - | ✅ 响应式隐藏 |

---

## 🎨 CSS样式

### 代码块样式
```css
.hljs {
  background: #0d1117 !important;
  color: #c9d1d9 !important;
  padding: 1rem !important;
  border-radius: 0.5rem !important;
  overflow-x: auto !important;
}
```

### TOC样式
```css
sticky positioning: top-24
白色卡片: bg-white rounded-xl border shadow-sm
激活项: bg-blue-50 border-l-2 border-blue-600
Quick Actions: gradient-to-br from-blue-50 to-indigo-50
```

---

## 📱 响应式设计

### Breakpoints
- **< 1024px (lg)**: 单列布局，隐藏TOC
- **≥ 1024px (lg)**: 双列布局，显示TOC

### Grid配置
```css
Mobile: grid-cols-1
Desktop: grid-cols-[1fr_280px]
Gap: 2rem (gap-8)
```

---

## 🚀 性能优化

### IntersectionObserver
- 使用原生API追踪可见性
- rootMargin优化触发时机
- 自动cleanup避免内存泄漏

### Smooth Scroll
- 使用原生`scrollTo({ behavior: 'smooth' })`
- 计算偏移量（-80px）避免顶部遮挡
- preventDefault避免URL hash变化

---

## 📝 支持的Markdown特性

### 文本格式
- ✅ **加粗**
- ✅ *斜体*
- ✅ ~~删除线~~
- ✅ `内联代码`
- ✅ [链接](url)

### 结构元素
- ✅ # H1 ~ ###### H6
- ✅ 无序列表
- ✅ 有序列表
- ✅ > 引用
- ✅ 表格
- ✅ 代码块（带语法高亮）

### 高级特性
- ✅ GFM任务列表
- ✅ 表格对齐
- ✅ 自动链接
- ✅ Emoji支持（:smile:）

---

## 🔧 配置选项

### marked选项
```typescript
{
  gfm: true,        // GitHub Flavored Markdown
  breaks: true,     // 换行支持
}
```

### highlight.js
```typescript
{
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
}
```

---

## 📈 改进统计

### 新增文件
1. `components/TableOfContents.tsx` - 119行
2. `MARKDOWN_TOC_IMPROVEMENTS.md` - 文档

### 修改文件
1. `lib/markdown.ts` - 完全重写，89行
2. `app/globals.css` - +89行（语法高亮）
3. `app/articles/[category]/[slug]/page.tsx` - 布局改进

### 新增依赖
- `highlight.js` - 语法高亮核心
- `marked-highlight` - marked集成

### 代码行数
- TypeScript: +208行
- CSS: +89行
- 总计: +297行

---

## 🎉 总结

### 核心改进
1. ✅ 完整的Markdown渲染
2. ✅ 代码语法高亮
3. ✅ 侧边栏目录导航
4. ✅ 实时章节追踪
5. ✅ 快捷操作按钮
6. ✅ 响应式布局

### 用户价值
- 📖 **更好的阅读体验**: 清晰的排版和高亮
- 🧭 **快速导航**: 一键跳转到任何章节
- 📍 **位置追踪**: 始终知道当前阅读位置
- 💻 **开发友好**: 代码高亮易读
- 📱 **移动友好**: 自适应布局

**文章阅读体验已达到专业技术博客水准！** 🎉
