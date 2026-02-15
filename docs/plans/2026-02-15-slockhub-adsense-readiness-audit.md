# SLockHub.com 全站深度扫描与 AdSense 优化审计报告

> 审计日期：2026-02-15 | 技术栈：Next.js 14 + Vercel + Turso/LibSQL + TailwindCSS  
> 当前状态：**尚未申请 AdSense 审核**

---

## 📊 站点现状快照

| 指标 | 实际值 | 页面显示值 | 状态 |
|------|--------|-----------|------|
| 技术文章数 | 72 篇 (7个分类) | 49+ | ❌ 过期 |
| 计算器工具数 | 24 个 | 15 | ❌ 过期 |
| 内容分类数 | 7 个 | 6-7 | ⚠️ 不一致 |
| 协议数 | 6+ | 4 | ❌ 过期 |
| 部署平台 | Vercel | Cloudflare (部分文件) | ❌ 不一致 |

---

## 🔴 P0 — 阻塞 AdSense 审核的关键问题

### 1. 缺少 ads.txt 文件
- **问题所在**：`public/` 目录下没有 `ads.txt` 文件
- **影响范围**：Google AdSense 审核的**硬性要求**，没有 ads.txt 会直接导致审核失败或广告收入损失
- **优化建议**：在 `public/ads.txt` 中添加 Google AdSense 的发布商 ID（申请通过后获取）

### 2. 隐私政策内容不准确
- **问题所在**：`app/privacy/page.tsx` 第72行提到 "hosted on Cloudflare's secure infrastructure"，实际已迁移至 Vercel
- **影响范围**：AdSense 审核要求隐私政策**真实准确**，虚假信息会导致拒绝
- **优化建议**：
  - 更新托管平台描述为 Vercel
  - 第三方服务列表添加 Google Analytics 和 Google AdSense 的披露
  - 添加 Cookie 同意机制说明（GDPR/CCPA 合规）

### 3. 16个计算器页面缺少 SEO Metadata
- **问题所在**：24个计算器中有16个使用 `'use client'` 且**没有导出 metadata**，也没有通过 layout.tsx 提供
- **影响范围**：这些页面在搜索结果中没有独立的 title 和 description，严重影响 SEO 和 CTR
- **受影响页面**：

| 无 Metadata 的计算器 | 有 Metadata 的计算器 |
|---|---|
| lock-tco, lock-compare, ble-range | ✅ battery-life, signal-strength |
| guest-code, poe-power, fire-compliance | ✅ installation-cost, compatibility |
| network-bandwidth, warranty-lifecycle | ✅ protocol-wizard, str-roi |
| access-capacity, security-compliance | ✅ mesh-planner, credential-planner |
| installation-time *, fleet-planner * | ✅ calculators/page (列表页) |
| emergency-backup *, subscription-compare * | |
| offline-resilience *, rf-coverage * | |

> 标注 `*` 的页面有 layout.tsx 提供了 canonical URL，但仍需确认是否包含完整 metadata

- **优化建议**：为每个计算器创建 `layout.tsx` 或将其重构为 server/client 分离模式，在 server 部分导出 metadata

### 4. 全站数据统计严重过期
- **问题所在**：
  - `app/page.tsx` 首页：49+ Articles、15 Tools、7 Categories
  - `app/about/page.tsx` About页：49+ Articles、15 Calculators、6 Categories、4 Protocols
  - 实际：72 篇文章、24 个计算器、7个分类
- **影响范围**：显示过期数据降低内容的可信度，AdSense 审核时人工审查可能认为站点维护不足
- **优化建议**：
  - 首页和 About 页的统计数据应动态计算而非硬编码
  - 或至少更新为当前准确值

---

## 🟠 P1 — 严重影响 SEO / AdSense 收益

### 5. Google Analytics 脚本实现不规范
- **问题所在**：`app/layout.tsx` 第66-76行，GA4 脚本直接用 `<script>` 标签放在 `<body>` 末尾
- **影响范围**：
  - 缺少 `next/script` 的 `strategy="afterInteractive"` 优化
  - 没有使用 `<Script>` 组件会影响 Core Web Vitals (特别是 LCP/INP)
  - 脚本加载阻塞可能影响 CLS 评分
- **优化建议**：改用 `next/script` 组件并设置 `strategy="afterInteractive"`

### 6. 图片优化完全关闭
- **问题所在**：`next.config.mjs` 第8行 `images: { unoptimized: true }`
- **影响范围**：
  - 所有图片不经过 Next.js 自动优化（WebP/AVIF 转换、尺寸优化）
  - 直接影响 LCP 和页面加载速度
  - Vercel 支持图片优化，无需关闭
- **优化建议**：移除 `unoptimized: true`，启用 Vercel 内置图片优化

### 7. Cloudflare 遗留配置文件
- **问题所在**：`public/_headers` 和 `public/_redirects` 是 Cloudflare Pages 专用配置
- **影响范围**：在 Vercel 上完全不生效，可能造成混淆
- **优化建议**：
  - 迁移安全头配置到 `next.config.mjs` 的 `headers()` 函数
  - 迁移重定向规则到 `next.config.mjs` 的 `redirects()` 函数
  - 删除无用的 `_headers` 和 `_redirects` 文件

### 8. FAQ 页面缺少 FAQPage Schema 的完整覆盖
- **问题所在**：`app/faq/layout.tsx` 中有 FAQPage JSON-LD schema，但只包含11个问题，而 `page.tsx` 中有5个分类共12+个问题
- **影响范围**：Schema 和实际内容不完全匹配，Google 可能标记为不一致
- **优化建议**：确保 FAQ Schema 与页面实际渲染内容完全同步

---

## 🟡 P2 — 影响流量增长和用户体验

### 9. Sitemap 计算器列表不完整
- **问题所在**：`app/sitemap.ts` 中 `calculatorSlugs` 只列出了24个，但应逐一核对确保与 `app/calculators/` 目录完全对应
- **影响范围**：遗漏的页面不会被搜索引擎发现
- **优化建议**：使计算器页面列表从文件系统动态生成，避免手动维护

### 10. robots.txt 细节问题
- **问题所在**：
  - `Crawl-delay: 1` 对 Google 无效（Googlebot 不遵守 Crawl-delay）
  - 缺少对 `/status`、`/api/health` 等工具性页面的 Disallow 规则
- **影响范围**：低价值页面被抓取浪费 Crawl Budget
- **优化建议**：
  - 移除或保留 `Crawl-delay`（对 Bing 有效）
  - 添加 `Disallow: /status` 和 `Disallow: /api/`

### 11. Contact 页面缺少联系表单
- **问题所在**：`app/contact/page.tsx` 只有 mailto 链接，没有联系表单
- **影响范围**：AdSense 政策要求网站提供**有效的联系方式**，纯 mailto 可能不够
- **优化建议**：
  - 添加一个简单的联系表单（姓名/邮件/消息）
  - 或确保 mailto 链接配置了真实可接收邮件的地址

### 12. 缺少 Cookie 同意横幅
- **问题所在**：站点使用 Google Analytics 但没有 Cookie 同意机制
- **影响范围**：
  - GDPR 合规风险（如果有欧洲流量）
  - AdSense 审核关注用户隐私合规
- **优化建议**：实现一个简单的 Cookie 同意横幅组件

### 13. About 页面 "Technology Stack" 信息过期
- **问题所在**：`app/about/page.tsx` 第125-128行显示 "Cloudflare - Global CDN"
- **影响范围**：与实际 Vercel 部署不一致
- **优化建议**：更新为 "Vercel - Edge Deployment"

---

## 🔵 P3 — 提升 AdSense RPM 的优化建议

### 14. 文章页面缺少 TOC（目录）功能
- **问题所在**：虽然有 `TableOfContents.tsx` 组件，但需核实是否在所有文章中启用
- **影响范围**：TOC 可增加用户停留时间和页面深度，直接影响 AdSense 会话 RPM
- **优化建议**：确保所有文章页面默认展示 TOC

### 15. 缺少内部链接策略
- **问题所在**：计算器结果页大多只链接到 2-3 个相关页面
- **影响范围**：内部链接不足导致用户路径短，降低页面浏览量和广告曝光
- **优化建议**：
  - 每个计算器结果区域添加 "推荐阅读" 模块
  - 文章末尾自动展示同分类的相关文章

### 16. 缺少 Breadcrumb 结构化数据
- **问题所在**：文章页和计算器页缺少面包屑导航的 Schema.org 标记
- **影响范围**：面包屑可增加搜索结果的富媒体展示，提升 CTR
- **优化建议**：在文章和计算器的 layout 中添加 BreadcrumbList JSON-LD

### 17. next.config.mjs 性能配置缺失
- **问题所在**：缺少以下几项关键配置：
  - `compress: true`（启用 gzip）
  - `poweredByHeader: false`（移除 X-Powered-By 头）
  - `images.formats`（指定 WebP/AVIF 格式优先级）
- **影响范围**：影响 Core Web Vitals 分数
- **优化建议**：补充上述配置项

### 18. Homepage CTA 文案优化空间
- **问题所在**："Browse Knowledge Base" 和 "Try Calculators" 按钮文案较为通用
- **影响范围**：降低首页用户转化和参与度
- **优化建议**：使用更有吸引力的文案，如 "Find Your Perfect Lock" 或 "Calculate Costs Now"

---

## ✅ 做得好的地方

| 项目 | 状态 | 说明 |
|------|------|------|
| metadataBase | ✅ | 正确设置 `https://www.slockhub.com` |
| Google Site Verification | ✅ | 已配置 |
| Open Graph 标记 | ✅ | 首页完整配置 |
| Twitter Card | ✅ | 已配置 |
| Schema.org Organization | ✅ | 首页有 Organization + WebSite schema |
| CollectionPage Schema | ✅ | 文章列表页有 CollectionPage schema |
| FAQPage Schema | ✅ | FAQ 页面有结构化数据 |
| Canonical URLs | ✅ | 静态页面均已配置 |
| robots.txt | ✅ | 存在且基本配置正确 |
| Sitemap | ✅ | 动态生成，覆盖文章和计算器 |
| 404 页面 | ✅ | 提供导航建议 |
| 字体优化 | ✅ | 使用 `display: 'swap'` |
| 层级分明的内容结构 | ✅ | 7 个清晰分类 |

---

## 📋 建议执行顺序

```
第一批（AdSense 审核必需）：
  ├─ #1 添加 ads.txt（审核通过后）
  ├─ #2 修正隐私政策内容
  ├─ #4 更新全站统计数据
  ├─ #12 添加 Cookie 同意横幅
  └─ #13 修正 About 页技术栈信息

第二批（SEO 基础优化）：
  ├─ #3 为16个计算器添加 metadata
  ├─ #5 迁移 GA4 到 next/script
  ├─ #6 启用图片优化
  ├─ #7 清理 Cloudflare 遗留文件，迁移到 next.config
  └─ #10 优化 robots.txt

第三批（流量&收益优化）：
  ├─ #9 动态生成 Sitemap 计算器列表
  ├─ #11 添加联系表单
  ├─ #14-16 TOC/内链/Breadcrumb 优化
  ├─ #17 next.config 性能配置
  └─ #18 CTA 文案优化
```

---

> ⚠️ **本报告仅分析现有问题，未修改任何代码。** 确认优先级后可逐项制定实施计划。
