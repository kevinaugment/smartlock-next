# 旧文章硬编码还原计划

## 📋 执行摘要

**策略**: 直接硬编码还原所有旧文章，避免数据库导入的复杂性
**原因**: 
- 旧文章为静态内容，不需要频繁更新
- 节省数据库导入和维护时间
- 后期新文章通过管理后台创建和管理

## 📊 文章清单统计

### 总计: 49篇文章

#### 1. Guides 综合指南 (4篇)
- `complete-troubleshooting-guide.mdx` (44KB)
- `disaster-recovery-business-continuity.mdx` (46KB)
- `door-compatibility-guide.mdx` (30KB)
- `smart-lock-pairing-complete-guide.mdx` (30KB)

#### 2. Installation 安装类 (1篇)
- `smart-lock-battery-life-guide.mdx` (16KB)

#### 3. Integration 集成类 (1篇)
- `enterprise-system-integration.mdx`

#### 4. Protocols 协议类 (2篇)
- `smart-lock-protocols-overview.mdx`
- `zigbee-vs-zwave-comparison.mdx`

#### 5. Security 安全类 (2篇)
- `data-privacy-compliance-guide.mdx`
- `smart-lock-security-complete-analysis.mdx`

#### 6. Support 支持类 (35篇)
**A. 连接与通信**
- add-fingerprint-to-lock.mdx
- audit-trail-forensic-analysis.mdx
- calibrate-smart-lock.mdx
- change-master-code.mdx
- clean-maintain-smart-lock.mdx
- command-timeout-errors.mdx
- connect-lock-to-homekit.mdx

**B. 用户管理**
- create-temporary-guest-code.mdx
- delete-smart-lock-user.mdx
- door-sensor-not-working.mdx
- doorbell-smart-lock-integration.mdx

**C. 应急处理**
- emergency-battery-died-locked-out.mdx
- fingerprint-not-recognized.mdx
- forgot-master-code-reset.mdx

**D. 操作指南**
- how-to-add-user-code.mdx
- how-to-change-smart-lock-battery.mdx
- improve-auto-lock-reliability.mdx
- improve-connection-stability.mdx
- install-smart-lock-step-by-step.mdx

**E. 架构与配置**
- local-vs-cloud-architecture.mdx
- lock-auto-relocks-immediately.mdx
- lock-motor-noise-troubleshooting.mdx
- lock-unresponsive-after-firmware-update.mdx

**F. 故障排查**
- multiple-failed-code-attempts.mdx
- secure-smart-lock-best-practices.mdx
- set-up-lock-automations.mdx
- share-access-securely.mdx
- smart-lock-code-not-working.mdx
- smart-lock-disconnects-after-power-outage.mdx
- smart-lock-keeps-going-offline.mdx
- smart-lock-setup-checklist.mdx
- smart-lock-shows-wrong-status.mdx
- smart-lock-wont-lock-unlock-completely.mdx
- test-smart-lock-after-install.mdx
- update-smart-lock-firmware.mdx

#### 7. Use Cases 应用场景 (4篇)
- enterprise-commercial-deployment.mdx (31KB)
- long-term-rental-property-strategy.mdx (39KB)
- long-term-rental-strategy.mdx (28KB)
- smart-locks-airbnb-complete-guide.mdx (35KB)

## 🏗️ 实施架构

### 方案: Next.js 静态页面 + MDX 内容

```
app/
├── articles/
│   ├── [category]/
│   │   └── [slug]/
│   │       └── page.tsx          # 动态路由
│   └── layout.tsx                 # 文章布局
├── _articles/                     # 硬编码文章内容目录
│   ├── guides/
│   │   ├── complete-troubleshooting-guide.mdx
│   │   ├── door-compatibility-guide.mdx
│   │   └── ...
│   ├── support/
│   │   ├── how-to-add-user-code.mdx
│   │   └── ...
│   ├── use-cases/
│   │   ├── smart-locks-airbnb-complete-guide.mdx
│   │   └── ...
│   └── index.ts                   # 文章元数据索引
└── components/
    └── articles/
        ├── ArticleContent.tsx     # MDX 渲染组件
        ├── ArticleHeader.tsx      # 文章头部
        ├── ArticleNav.tsx         # 文章导航
        └── TableOfContents.tsx    # 目录组件
```

### 文章元数据结构

```typescript
// app/_articles/index.ts
export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number; // 分钟
  author: string;
  featured: boolean;
}

export const articles: Record<string, ArticleMetadata> = {
  'complete-troubleshooting-guide': {
    slug: 'complete-troubleshooting-guide',
    title: 'Complete Smart Lock Troubleshooting Guide',
    description: '...',
    category: 'guides',
    keywords: ['troubleshooting', 'smart lock', 'problems'],
    publishedAt: '2024-01-01',
    updatedAt: '2024-11-20',
    readingTime: 25,
    author: 'Be-Tech',
    featured: true
  },
  // ... 其他文章
};
```

## 🔄 迁移步骤

### Phase 1: 基础架构 (1-2小时)
- [ ] 创建 `app/_articles/` 目录结构
- [ ] 设置 MDX 支持和配置
- [ ] 创建文章布局组件
- [ ] 实现动态路由 `[category]/[slug]`

### Phase 2: 文章迁移 (3-4小时)
- [ ] 复制所有 .mdx 文件到新目录
- [ ] 提取每篇文章的元数据
- [ ] 创建文章索引 `index.ts`
- [ ] 清理和规范化 frontmatter

### Phase 3: 功能增强 (2-3小时)
- [ ] 实现目录（TOC）自动生成
- [ ] 添加代码高亮支持
- [ ] 实现文章搜索功能
- [ ] 添加相关文章推荐
- [ ] 集成 Be-Tech 品牌推荐

### Phase 4: SEO 优化 (1-2小时)
- [ ] 生成 sitemap.xml
- [ ] 添加结构化数据（JSON-LD）
- [ ] 优化 meta 标签
- [ ] 实现面包屑导航

### Phase 5: 验证测试 (1小时)
- [ ] 验证所有文章路由
- [ ] 检查图片资源链接
- [ ] 测试移动端响应式
- [ ] 性能优化检查

## 📝 实施细节

### MDX 配置

```javascript
// next.config.mjs
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypePrism
    ],
  },
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
```

### 文章页面组件

```typescript
// app/articles/[category]/[slug]/page.tsx
import { articles } from '@/app/_articles'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

export async function generateStaticParams() {
  return Object.values(articles).map((article) => ({
    category: article.category,
    slug: article.slug,
  }))
}

export default async function ArticlePage({ 
  params 
}: { 
  params: { category: string; slug: string } 
}) {
  const article = articles[params.slug]
  
  if (!article || article.category !== params.category) {
    notFound()
  }

  // 动态导入对应的 MDX 文件
  const MDXContent = dynamic(() => 
    import(`@/app/_articles/${params.category}/${params.slug}.mdx`)
  )

  return (
    <article>
      <ArticleHeader article={article} />
      <TableOfContents />
      <MDXContent />
      <BeTechRecommendation />
    </article>
  )
}
```

## 🎯 优势分析

### ✅ 优势
1. **开发速度快**: 直接复制文件，无需数据库操作
2. **维护简单**: Git 版本控制，易于追踪变更
3. **性能优秀**: 静态生成，CDN 缓存
4. **SEO 友好**: 完整的 HTML，无客户端渲染
5. **类型安全**: TypeScript 检查元数据
6. **灵活性高**: 可随时迁移到 CMS

### ⚠️ 注意事项
1. 文章内容需要手动更新代码
2. 大量文章时构建时间较长
3. 需要重新部署才能看到更新

### 🔮 未来迁移路径
当需要频繁更新时，可以逐步迁移到 CMS：
1. 保持文件结构不变
2. 创建 API 从文件系统读取
3. 逐步替换为数据库查询
4. 实现管理后台界面

## 📦 所需依赖

```json
{
  "dependencies": {
    "@next/mdx": "^14.0.0",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "remark-gfm": "^4.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.0.0",
    "rehype-prism-plus": "^1.6.0",
    "gray-matter": "^4.0.3"
  }
}
```

## ⏱️ 时间估算

- **基础架构**: 2小时
- **文章迁移**: 4小时
- **功能增强**: 3小时
- **SEO优化**: 2小时
- **测试验证**: 1小时
- **总计**: 12小时 (1.5天)

## 🚀 立即开始

建议从最重要的文章类别开始：
1. **Phase 1**: Guides (4篇) - 最核心的综合指南
2. **Phase 2**: Use Cases (4篇) - 高流量应用场景
3. **Phase 3**: Support (35篇) - 长尾SEO流量
4. **Phase 4**: 其他类别

每个 Phase 可以独立部署，逐步上线。
