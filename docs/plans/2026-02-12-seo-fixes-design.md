# SEO 核心修复 — 完整设计方案

## 问题总结

基于 Next.js SEO 陷阱清单的全站审计，发现 4 个核心问题：

1. **根 layout.tsx canonical `'/'` 继承** — 5 个页面缺少 canonical 覆盖，会被 Google 视为首页重复
2. **零 JSON-LD 结构化数据** — 全站无 `application/ld+json`，影响搜索结果展示
3. **sitemap.ts lastModified 硬编码** — 全部写死 `2025-11-24`，Google 无法判断内容新鲜度
4. **缺少 canonical 的页面** — `compare`, `articles`, `sitemap`, `status` 四个页面

---

## Fix 1: 移除根 layout.tsx 的 canonical

**文件**: `app/layout.tsx`

**变更**: 删除 `alternates.canonical` 配置，只保留 `metadataBase`。

```diff
 export const metadata: Metadata = {
   metadataBase: new URL('https://smartlockhub.com'),
   title: 'Smart Lock Hub - Expert Guides & Tools',
   description: '...',
   icons: { icon: '/favicon.svg' },
-  alternates: {
-    canonical: '/',
-  },
   openGraph: { ... },
   twitter: { ... },
 }
```

**原因**: 根布局的 `canonical: '/'` 会被所有子页面继承。每个页面应自行声明自己的 canonical 而不是继承根布局的。首页 `app/page.tsx` 已有 `alternates: { canonical: '/' }`，删除根布局的不影响首页。

---

## Fix 2: 补全缺少 canonical 的 4 个页面

| 页面 | 文件 | 添加的 canonical |
|------|------|-----------------|
| Compare | `app/compare/page.tsx` | `/compare` |
| Articles | `app/articles/page.tsx` | `/articles` |
| Sitemap | `app/sitemap/page.tsx` | `/sitemap` |
| Status | `app/status/page.tsx` | `/status` |

每个页面添加 `export const metadata` 并包含 `alternates.canonical`、`title`、`description`。

> [!NOTE]
> `admin/*` 页面不需要 canonical，因为已被 `robots.txt` 的 `Disallow: /admin/` 排除。

---

## Fix 3: 添加 JSON-LD 结构化数据

### 3a. 创建通用 JSON-LD 组件

**新文件**: `components/JsonLd.tsx`

```tsx
// Server Component，仅输出 <script type="application/ld+json">
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

### 3b. 首页添加 Organization schema

**文件**: `app/page.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Smart Lock Hub",
  "url": "https://smartlockhub.com",
  "description": "Comprehensive smart lock guides covering protocols, security, installation, troubleshooting, and real-world applications."
}
```

### 3c. 文章页添加 Article schema

**文件**: `app/articles/[category]/[slug]/page.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "...",
  "description": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Organization", "name": "Smart Lock Hub" },
  "publisher": { "@type": "Organization", "name": "Smart Lock Hub" }
}
```

### 3d. FAQ 页添加 FAQPage schema

**文件**: `app/faq/page.tsx` (client component) → 通过 `app/faq/layout.tsx` 注入

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "...",
      "acceptedAnswer": { "@type": "Answer", "text": "..." }
    }
  ]
}
```

### 3e. 计算器页添加 WebApplication schema

通过各计算器的 `layout.tsx` 注入（因为 page.tsx 是 client component）。

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Smart Lock TCO Calculator",
  "url": "https://smartlockhub.com/calculators/lock-tco",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

适用于所有 7 个有 layout.tsx 的计算器 + 8 个 Server Component 计算器（直接在 page.tsx 中添加）。

---

## Fix 4: 更新 sitemap.ts lastModified

**文件**: `app/sitemap.ts`

- 静态页面：更新日期为当前构建日期 `2026-02-12`
- 文章页面：已使用 `article.updatedAt || article.pubDate`（✅ 正确）
- 计算器页面：更新为 `2026-02-12`

---

## 修改文件清单

| # | 文件 | 操作 |
|---|------|------|
| 1 | `app/layout.tsx` | 删除 `alternates.canonical` |
| 2 | `app/compare/page.tsx` | 添加 metadata + canonical |
| 3 | `app/articles/page.tsx` | 添加 metadata + canonical |
| 4 | `app/sitemap/page.tsx` | 添加 metadata + canonical |
| 5 | `app/status/page.tsx` | 添加 metadata + canonical |
| 6 | `components/JsonLd.tsx` | **新建** — 通用 JSON-LD 组件 |
| 7 | `app/page.tsx` | 添加 Organization JSON-LD |
| 8 | `app/articles/[category]/[slug]/page.tsx` | 添加 TechArticle JSON-LD |
| 9 | `app/faq/layout.tsx` | 添加 FAQPage JSON-LD |
| 10-16 | 7 个计算器 `layout.tsx` | 添加 WebApplication JSON-LD |
| 17-24 | 8 个 SC 计算器 `page.tsx` | 添加 WebApplication JSON-LD |
| 25 | `app/sitemap.ts` | 更新 lastModified 日期 |

---

## 验证方案

### 自动验证
```bash
npm run build
```
构建必须零错误。

### 手动验证（curl 模拟爬虫）
```bash
# 检查首页 canonical 不再被子页面继承
curl -s http://localhost:3000/compare | grep 'canonical'
# 预期: <link rel="canonical" href="https://smartlockhub.com/compare"/>

# 检查 JSON-LD
curl -s http://localhost:3000 | grep 'application/ld+json'
# 预期: 包含 Organization schema

curl -s http://localhost:3000/faq | grep 'FAQPage'
# 预期: 包含 FAQPage schema
```

### 浏览器验证
- 用 Google Rich Results Test 或 Schema Markup Validator 验证结构化数据
