# Schema.org 结构化数据扩展 — 设计方案

## 目标

全站 Schema.org JSON-LD 结构化数据的统一、增强与扩展，包含评分系统。

---

## 第一部分：统一与增强现有 Schema

### 1a. 统一计算器 Schema 类型

**问题**：7 个 layout 计算器使用 `WebApplication`，8 个 SC 计算器使用 `SoftwareApplication`，不一致。

**方案**：全部统一为 `SoftwareApplication`（Google 更推荐此类型用于工具类应用）。

**影响文件**（7 个 layout）：
- `app/calculators/lock-tco/layout.tsx`
- `app/calculators/fleet-planner/layout.tsx`
- `app/calculators/subscription-compare/layout.tsx`
- `app/calculators/installation-time/layout.tsx`
- `app/calculators/rf-coverage/layout.tsx`
- `app/calculators/offline-resilience/layout.tsx`
- `app/calculators/emergency-backup/layout.tsx`

每个 layout 中 `@type: 'WebApplication'` → `@type: 'SoftwareApplication'`，并补充字段：

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Smart Lock TCO Calculator",
  "url": "https://smartlockhub.com/calculators/lock-tco",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Calculate total cost of ownership for smart lock deployments.",
  "softwareVersion": "1.0",
  "datePublished": "2025-11-24",
  "creator": { "@type": "Organization", "name": "Smart Lock Hub" }
}
```

### 1b. 补齐 BreadcrumbList

**问题**：7 个 layout 计算器缺少 `BreadcrumbList` Schema。

**方案**：在 7 个 layout.tsx 中添加 `BreadcrumbList`，与 8 个 SC 计算器一致。

---

## 第二部分：评分系统

### 2a. 数据库 — `tool_ratings` 表

新建 D1 表：

```sql
CREATE TABLE IF NOT EXISTS tool_ratings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_slug TEXT NOT NULL,
  is_helpful INTEGER NOT NULL DEFAULT 1,   -- 1 = 👍, 0 = 👎
  ip_hash TEXT NOT NULL,                    -- SHA-256(IP) 防重复
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_tool_ratings_slug ON tool_ratings(tool_slug);
CREATE UNIQUE INDEX idx_tool_ratings_unique ON tool_ratings(tool_slug, ip_hash);
```

### 2b. 数据模型 — `lib/db/models.ts`

新增 `ToolRatingModel`：

```typescript
export interface ToolRating {
  id: number
  tool_slug: string
  is_helpful: number  // 1 or 0
  ip_hash: string
  created_at: string
}

export interface RatingAggregate {
  total: number
  helpful: number
  rating_value: number  // 计算: helpful/total * 4 + 1 (映射到 1-5)
}

export const ToolRatingModel = {
  async submit(slug: string, isHelpful: boolean, ipHash: string),
  async getAggregate(slug: string): Promise<RatingAggregate>,
  async hasVoted(slug: string, ipHash: string): Promise<boolean>,
}
```

### 2c. API Route — `app/api/ratings/route.ts`

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/ratings` | 提交评分 `{ tool_slug, is_helpful }` |
| GET | `/api/ratings?slug=xxx` | 获取聚合评分 |

Service 层处理业务逻辑（IP hash、防重复、聚合计算）。

### 2d. 评分组件 — `components/ToolRating.tsx`

Client Component，放置在计算器页面底部。

**UI 设计**：
```
─────────────────────────────────
  Was this tool helpful?
  [ 👍 Yes ]    [ 👎 No ]
─────────────────────────────────
```

**交互流程**：
1. 用户首次访问 → 显示两个按钮
2. 点击 → POST `/api/ratings`
3. 成功 → 按钮变为「Thanks for your feedback! 👍 85% found this helpful」
4. 已投票（localStorage 标记 + 后端 UNIQUE 约束）→ 直接显示统计

**样式**：遵循 Industrial Minimalist 设计系统，使用 CSS 变量。

### 2e. Schema 注入 `aggregateRating`

在 Server Component / layout 服务端获取聚合数据后注入：

```json
{
  "@type": "SoftwareApplication",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.3",
    "ratingCount": "128",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

> [!IMPORTANT]
> 只有当 `ratingCount >= 5` 时才注入 `aggregateRating`，避免样本太少导致数据不可靠。

---

## 第三部分：新增 Schema 类型

### 3a. HowTo Schema（4-5 个计算器）

为教程性较强的计算器添加 `HowTo` Schema：

| 计算器 | HowTo 标题 |
|--------|------------|
| battery-life | ✅ 已有 |
| installation-cost | How to Estimate Smart Lock Installation Cost |
| lock-tco | How to Calculate Smart Lock Total Cost of Ownership |
| protocol-wizard | How to Choose the Right Smart Lock Protocol |
| signal-strength | How to Test Smart Lock Signal Strength |

每个 HowTo 包含 3-4 步。

### 3b. CollectionPage Schema（3 个列表页）

| 页面 | Schema |
|------|--------|
| `/calculators` | `CollectionPage` + `ItemList` |
| `/articles` | `CollectionPage` + `ItemList` |
| `/articles/[category]` | `CollectionPage` + `ItemList` |

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Smart Lock Calculators",
  "url": "https://smartlockhub.com/calculators",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 15,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "url": "https://..." }
    ]
  }
}
```

---

## 修改文件清单

| # | 文件 | 操作 |
|---|------|------|
| 1-7 | 7 个计算器 `layout.tsx` | `WebApplication` → `SoftwareApplication` + 字段增强 + `BreadcrumbList` |
| 8 | `lib/db/models.ts` | 新增 `ToolRatingModel` |
| 9 | `app/api/ratings/route.ts` | **新建** — 评分 API |
| 10 | `lib/services/rating-service.ts` | **新建** — 评分业务逻辑 |
| 11 | `components/ToolRating.tsx` | **新建** — 评分组件 (Client) |
| 12 | `app/calculators/installation-cost/page.tsx` | 添加 HowTo Schema |
| 13 | `app/calculators/lock-tco/layout.tsx` | 添加 HowTo Schema |
| 14 | `app/calculators/protocol-wizard/page.tsx` | 添加 HowTo Schema |
| 15 | `app/calculators/signal-strength/page.tsx` | 添加 HowTo Schema |
| 16 | `app/calculators/page.tsx` | 添加 CollectionPage Schema |
| 17 | `app/articles/page.tsx` | 添加 CollectionPage Schema |
| 18 | `app/articles/[category]/page.tsx` | 添加 CollectionPage Schema |
| 19 | 15 个计算器页面 | 集成 `<ToolRating>` 组件 |

---

## 验证方案

### 自动验证
```bash
npm run build
```
构建零错误。

### 手动验证
1. `curl -s http://localhost:3000/calculators/lock-tco | grep 'SoftwareApplication'` → 应出现
2. `curl -s http://localhost:3000/calculators/lock-tco | grep 'BreadcrumbList'` → 应出现
3. `curl -s http://localhost:3000/calculators | grep 'CollectionPage'` → 应出现
4. 浏览器打开计算器页面 → 底部应显示评分组件
5. 点击 👍 → 应显示感谢信息和统计
6. 用 [Google Rich Results Test](https://search.google.com/test/rich-results) 验证结构化数据
