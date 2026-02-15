# 品牌/型号数据库 — 设计规范

> **日期**: 2026-02-15  
> **目标**: 建立品牌/型号数据库，驱动 SEO 页面矩阵 + 计算器联动  
> **变现模式**: Google AdSense（最大化页面覆盖 × 长尾关键词）

---

## 一、决策记录

| 维度 | 决策 |
|:--|:--|
| 方向 | 内容增强 + 功能联动（A+B） |
| 数据粒度 | 品牌 → 系列 → SKU（三层完整建模） |
| 计算器联动 | 入口下拉预填 + 出口结果推荐（双向） |
| 初始范围 | 先 6 核心品牌，后扩展至 15+ |
| SEO 维度 | 协议 / 场景 / 特性 / 价格 全覆盖 |

---

## 二、数据库 Schema

### 2.1 `brands` 表（扩展现有）

现有 `brands-system.sql` 的表结构过于简单，需要重写。

```sql
CREATE TABLE IF NOT EXISTS brands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,            -- 品牌简介
    long_description TEXT,       -- 品牌详情页的完整介绍
    logo_url TEXT,
    website_url TEXT,
    country TEXT,                -- 'US', 'CN', 'SE'
    founded_year INTEGER,
    
    -- 协议支持
    supports_wifi BOOLEAN DEFAULT 0,
    supports_zigbee BOOLEAN DEFAULT 0,
    supports_zwave BOOLEAN DEFAULT 0,
    supports_thread BOOLEAN DEFAULT 0,
    supports_matter BOOLEAN DEFAULT 0,
    supports_bluetooth BOOLEAN DEFAULT 0,
    
    -- 市场定位
    target_market TEXT,          -- residential, commercial, enterprise, all
    price_tier TEXT,             -- budget, mid, premium
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    og_image_url TEXT,
    
    -- 评分 & 显示
    rating REAL DEFAULT 0,
    featured BOOLEAN DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published',
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 `product_series` 表（新建）

```sql
CREATE TABLE IF NOT EXISTS product_series (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand_id INTEGER NOT NULL,
    name TEXT NOT NULL,           -- 'Assure Lock 2'
    slug TEXT UNIQUE NOT NULL,    -- 'assure-lock-2'
    description TEXT,
    image_url TEXT,
    release_year INTEGER,
    price_range_min INTEGER,     -- 美分 15000 = $150
    price_range_max INTEGER,
    is_active BOOLEAN DEFAULT 1, -- 是否在售
    display_order INTEGER DEFAULT 0,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);
```

### 2.3 `products` 表（新建 — 核心）

```sql
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    series_id INTEGER NOT NULL,
    brand_id INTEGER NOT NULL,   -- 冗余字段，方便查询
    
    -- 基本信息
    name TEXT NOT NULL,          -- 'Yale Assure Lock 2 (Wi-Fi)'
    slug TEXT UNIQUE NOT NULL,   -- 'yale-assure-lock-2-wifi'
    model_number TEXT,           -- 'YRD450-ZW2'
    description TEXT,
    image_url TEXT,
    price_usd INTEGER,           -- 美分 24999 = $249.99
    buy_url TEXT,                 -- 官方购买链接
    
    -- 连接协议
    protocol TEXT NOT NULL,      -- 'wifi', 'zigbee', 'zwave', 'thread', 'bluetooth'
    secondary_protocol TEXT,     -- 某些支持双协议
    supports_matter BOOLEAN DEFAULT 0,
    
    -- 电池规格（计算器联动核心）
    battery_type TEXT,           -- 'AA', 'CR123A', 'CR2', 'lithium-ion'
    battery_count INTEGER,       -- 4
    battery_life_months INTEGER, -- 12
    
    -- 物理规格
    weight_grams INTEGER,
    dimensions_json TEXT,        -- '{"height": 280, "width": 70, "depth": 35}'
    
    -- 安全等级
    ansi_grade TEXT,             -- '1', '2', '3'
    ul_listed BOOLEAN DEFAULT 0,
    encryption_type TEXT,        -- 'AES-128', 'AES-256'
    
    -- 功能特性（布尔标记）
    has_fingerprint BOOLEAN DEFAULT 0,
    has_keypad BOOLEAN DEFAULT 0,
    has_auto_lock BOOLEAN DEFAULT 0,
    has_auto_unlock BOOLEAN DEFAULT 0,
    has_voice_control BOOLEAN DEFAULT 0,
    has_remote_access BOOLEAN DEFAULT 0,
    has_guest_codes BOOLEAN DEFAULT 0,
    has_activity_log BOOLEAN DEFAULT 0,
    has_physical_key BOOLEAN DEFAULT 0,
    
    -- 安装参数（Door Compatibility 联动）
    door_thickness_min_mm INTEGER,
    door_thickness_max_mm INTEGER,
    bore_diameter_mm INTEGER,    -- 标准 54mm
    backset_mm TEXT,             -- '60,70' 支持多个
    
    -- 功耗参数（Power Consumption 联动）
    standby_power_mw REAL,
    active_power_mw REAL,
    operations_per_day INTEGER DEFAULT 10,
    
    -- 凭证容量（Credential Planner 联动）
    max_pin_codes INTEGER,
    max_fingerprints INTEGER,
    max_cards INTEGER,
    max_app_users INTEGER,
    
    -- 信号参数（Signal Strength 联动）
    rf_frequency TEXT,           -- '908MHz', '2.4GHz'
    rf_range_meters INTEGER,
    antenna_type TEXT,           -- 'internal', 'external'
    
    -- 兼容生态系统
    ecosystems_json TEXT,        -- '["Apple HomeKit", "Google Home", "Alexa"]'
    
    -- 评分 & SEO
    rating REAL DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    
    -- 状态
    is_active BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (series_id) REFERENCES product_series(id) ON DELETE CASCADE,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);
```

### 2.4 `product_tags` 表（驱动 Top N 页面）

```sql
CREATE TABLE IF NOT EXISTS product_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    tag_type TEXT NOT NULL,      -- 'scenario', 'feature', 'protocol', 'price_tier'
    tag_value TEXT NOT NULL,     -- 'apartment', 'fingerprint', 'z-wave', 'budget'
    
    UNIQUE(product_id, tag_type, tag_value),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### 2.5 `top_n_pages` 表（SEO 落地页配置）

```sql
CREATE TABLE IF NOT EXISTS top_n_pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,          -- 'z-wave-smart-locks'
    title TEXT NOT NULL,                -- 'Best Z-Wave Smart Locks 2026'
    h1_title TEXT,                      -- 页面 H1
    intro_text TEXT,                    -- 介绍段落
    
    -- 查询条件
    filter_type TEXT NOT NULL,          -- 'protocol', 'scenario', 'feature', 'price_tier'
    filter_value TEXT NOT NULL,         -- 'zwave', 'apartment', 'fingerprint', 'budget'
    sort_by TEXT DEFAULT 'rating',      -- 'rating', 'price_usd', 'battery_life_months'
    max_items INTEGER DEFAULT 10,
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    faq_json TEXT,                      -- FAQ Schema 数据
    
    -- 状态
    status TEXT DEFAULT 'published',
    display_order INTEGER DEFAULT 0,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2.6 `product_articles` 表（产品-文章关联）

```sql
CREATE TABLE IF NOT EXISTS product_articles (
    product_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    relation_type TEXT DEFAULT 'mentioned', -- 'review', 'mentioned', 'guide'
    display_order INTEGER DEFAULT 0,
    
    PRIMARY KEY (product_id, article_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);
```

---

## 三、页面架构

### 3.1 路由结构

| 路由 | 数据源 | 页面类型 |
|:--|:--|:--|
| `/brands` | `brands` 表 | 品牌总览 |
| `/brands/[slug]` | `brands` + `product_series` + `products` | 品牌详情 |
| `/brands/[slug]/[product]` | `products` + `product_tags` | 产品详情 |
| `/best/[slug]` | `top_n_pages` + `products` + `product_tags` | Top N 落地页 |

### 3.2 初期 Top N 页面清单

**按协议（4 页）**
- `/best/z-wave-smart-locks`
- `/best/zigbee-smart-locks`
- `/best/wifi-smart-locks`
- `/best/thread-smart-locks`

**按场景（6 页）**
- `/best/smart-locks-for-apartments`
- `/best/smart-locks-for-airbnb`
- `/best/smart-locks-for-rental-properties`
- `/best/smart-locks-for-commercial`
- `/best/smart-locks-for-families`
- `/best/smart-locks-for-home-security`

**按特性（5 页）**
- `/best/fingerprint-smart-locks`
- `/best/keypad-smart-locks`
- `/best/auto-unlock-smart-locks`
- `/best/homekit-smart-locks`
- `/best/matter-smart-locks`

**按价格（3 页）**
- `/best/budget-smart-locks`
- `/best/mid-range-smart-locks`
- `/best/premium-smart-locks`

**综合（2 页）**
- `/best/smart-locks-2026`
- `/best/smart-locks-with-longest-battery-life`

**共计: ~20 个 Top N 落地页**

---

## 四、计算器联动

### 4.1 入口联动（下拉预填）

在以下计算器中添加「Select Lock Model」下拉框：

| 计算器 | 预填字段 |
|:--|:--|
| Battery Life | battery_type, battery_count, protocol, standby_power_mw |
| Signal Strength | protocol, rf_frequency, rf_range_meters, antenna_type |
| Installation Cost | ansi_grade, door_thickness, bore_diameter |
| Lock TCO | price_usd, battery_type, battery_life_months |
| Compatibility | door_thickness_min/max, bore_diameter, backset |
| Credential Planner | max_pin_codes, max_fingerprints, max_app_users |
| Power Consumption | standby_power_mw, active_power_mw, operations_per_day |

### 4.2 出口推荐（结果匹配）

计算完成后，根据计算结果在 `products` 表中筛选匹配产品，展示在结果区下方。

---

## 五、文件清单

### 数据库层
- `database/migrations/brand-model-system.sql` — 完整建表 + 索引
- `database/seeds/brands-seed.sql` — 6 品牌初始数据
- `database/seeds/products-seed.sql` — ~35 个 SKU 数据
- `database/seeds/top-n-pages-seed.sql` — 20 个 Top N 页面配置

### Model 层
- `lib/db/brand-models.ts` — Brand, ProductSeries, Product, TopNPage Model

### Service 层
- `lib/services/brand-service.ts` — 品牌/产品查询逻辑
- `lib/services/product-recommendation-service.ts` — 计算器结果推荐逻辑

### API 层
- `app/api/brands/route.ts` — 品牌列表 API
- `app/api/products/route.ts` — 产品查询 API（支持筛选）

### 页面层
- `app/brands/page.tsx` — 重构（从硬编码改为数据库驱动）
- `app/brands/[slug]/page.tsx` — 品牌详情页（新建）
- `app/brands/[slug]/[product]/page.tsx` — 产品详情页（新建）
- `app/best/[slug]/page.tsx` — Top N 落地页（新建）

### 组件层
- `components/brands/BrandCard.tsx` — 品牌卡片
- `components/brands/ProductCard.tsx` — 产品卡片
- `components/brands/ProductSpecTable.tsx` — 规格对比表
- `components/brands/LockModelSelector.tsx` — 计算器锁型号选择器
- `components/brands/ProductRecommendation.tsx` — 计算结果推荐组件

### Sitemap
- 更新 `app/sitemap.ts` — 动态生成品牌/产品/Top N 页面 URL

---

## 六、实施路径

### Phase 1 — 数据库 + 数据层（基础）
1. 创建 migration SQL
2. 编写 seed 数据（6 品牌 + ~35 SKU）
3. 创建 Model + Service
4. API 路由

### Phase 2 — 品牌页面体系
5. 重构 `/brands` 总览页
6. 新建 `/brands/[slug]` 品牌详情页
7. 新建 `/brands/[slug]/[product]` 产品详情页

### Phase 3 — Top N SEO 页面
8. 新建 `/best/[slug]` Top N 落地页
9. 植入 FAQ Schema + 结构化数据
10. 更新 Sitemap

### Phase 4 — 计算器联动
11. LockModelSelector 组件
12. ProductRecommendation 组件
13. 集成到各计算器

---

## 七、验证计划

### 自动验证
- `next build` 编译无错误
- 所有新页面在 sitemap 中正确输出

### 手动验证
- 浏览器访问 `/brands`、`/brands/yale`、`/brands/yale/assure-lock-2`
- 浏览器访问 `/best/z-wave-smart-locks`
- 在 Battery Life 计算器中选择锁型号，验证参数预填
- 在计算器结果页验证产品推荐区块
