# Smart Lock Hub - Next.js + D1 完整架构设计

## 🎯 项目目标

**完全动态化的智能锁知识库系统**
- 所有内容（文章、分类、工具链接）从D1数据库动态加载
- 计算器页面本身是静态的React组件，但其配置、关联文章等动态化
- 管理后台可以完全控制所有内容
- SEO友好，支持动态生成sitemap和meta标签

---

## 📊 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **样式**: TailwindCSS
- **组件**: 自定义React组件（无shadcn/ui依赖）
- **Markdown渲染**: react-markdown + remark-gfm
- **表单**: React Hook Form + Zod
- **图标**: Lucide React

### 后端
- **数据库**: Cloudflare D1 (SQLite)
- **API**: Next.js API Routes
- **认证**: JWT (jose库)
- **密码加密**: bcryptjs

### 部署
- **平台**: Cloudflare Pages
- **构建**: @cloudflare/next-on-pages
- **数据库**: D1 (全球分布)

---

## 🗄️ 完整数据库设计

### 核心表结构

#### 1. **users** - 用户表（管理员）
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor', -- admin, editor, viewer
  avatar_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login_at DATETIME,
  is_active BOOLEAN DEFAULT 1
);
```

#### 2. **categories** - 分类表
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT, -- emoji
  color TEXT, -- hex颜色
  parent_id INTEGER,
  display_order INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);
```

**初始分类**:
- Protocols (📡)
- Security (🔒)
- Installation (🔋)
- Guides (🔧)
- Use Cases (🏢)
- Support (💡)
- Integration (🔗)

#### 3. **articles** - 文章表
```sql
CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL, -- Markdown格式
  category_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  
  -- 特性
  is_pillar BOOLEAN DEFAULT 0,
  featured BOOLEAN DEFAULT 0,
  reading_time INTEGER, -- 分钟
  word_count INTEGER,
  view_count INTEGER DEFAULT 0,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image_url TEXT,
  
  -- 发布
  status TEXT DEFAULT 'draft', -- draft, published, archived
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);
```

#### 4. **article_tags** - 文章标签（多对多）
```sql
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE article_tags (
  article_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

#### 5. **article_relations** - 文章关联（相关文章）
```sql
CREATE TABLE article_relations (
  article_id INTEGER NOT NULL,
  related_article_id INTEGER NOT NULL,
  display_order INTEGER DEFAULT 0,
  PRIMARY KEY (article_id, related_article_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (related_article_id) REFERENCES articles(id) ON DELETE CASCADE
);
```

#### 6. **calculators** - 计算器配置表
```sql
CREATE TABLE calculators (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  component_name TEXT NOT NULL, -- React组件名
  icon TEXT,
  category_id INTEGER,
  featured BOOLEAN DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  
  -- 教育内容配置
  education_title TEXT, -- "Deep Dive"标题
  education_intro TEXT, -- 简介文本
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

**计算器列表** (基于之前的tools):
- protocol-selection-wizard
- battery-life-comparison
- lock-tco-calculator
- rf-coverage-estimator
- mesh-node-planner
- short-term-rental-roi-calculator
- multi-property-fleet-planner
- credential-capacity-planner
- ...等14个计算器

#### 7. **calculator_articles** - 计算器关联文章
```sql
CREATE TABLE calculator_articles (
  calculator_id INTEGER NOT NULL,
  article_id INTEGER NOT NULL,
  custom_title TEXT, -- 自定义显示标题
  custom_description TEXT, -- 自定义描述
  display_order INTEGER DEFAULT 0,
  PRIMARY KEY (calculator_id, article_id),
  FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);
```

#### 8. **calculator_tools** - 计算器相关工具链接
```sql
CREATE TABLE calculator_tools (
  calculator_id INTEGER NOT NULL,
  related_calculator_id INTEGER NOT NULL,
  custom_name TEXT,
  custom_description TEXT,
  display_order INTEGER DEFAULT 0,
  PRIMARY KEY (calculator_id, related_calculator_id),
  FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE,
  FOREIGN KEY (related_calculator_id) REFERENCES calculators(id) ON DELETE CASCADE
);
```

#### 9. **pages** - 页面表（首页、关于等）
```sql
CREATE TABLE pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  page_type TEXT NOT NULL, -- home, about, contact, custom
  content TEXT, -- JSON格式的页面配置
  
  -- Hero区域
  hero_enabled BOOLEAN DEFAULT 0,
  hero_headline TEXT,
  hero_subheadline TEXT,
  hero_cta_text TEXT,
  hero_cta_link TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  no_index BOOLEAN DEFAULT 0,
  
  status TEXT DEFAULT 'draft',
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### 10. **navigation** - 导航菜单
```sql
CREATE TABLE navigation (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  location TEXT NOT NULL, -- header, footer, sidebar
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  parent_id INTEGER,
  display_order INTEGER DEFAULT 0,
  icon TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES navigation(id)
);
```

#### 11. **settings** - 全局设置
```sql
CREATE TABLE settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT, -- JSON或纯文本
  type TEXT DEFAULT 'text', -- text, json, boolean, number
  category TEXT DEFAULT 'general',
  description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**设置项**:
- site_title
- site_description
- title_template
- google_analytics_id
- maintenance_mode

#### 12. **analytics** - 访问统计
```sql
CREATE TABLE analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  page_path TEXT NOT NULL,
  page_type TEXT, -- article, calculator, page
  entity_id INTEGER, -- article_id或calculator_id
  view_count INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  avg_time_on_page INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, page_path)
);
```

---

## 📁 Next.js项目结构

```
smartlock-next/
├── app/
│   ├── (public)/                    # 公开网站
│   │   ├── layout.tsx              # 公开布局
│   │   ├── page.tsx                # 首页
│   │   ├── [category]/             # 分类页
│   │   │   ├── page.tsx
│   │   │   └── [slug]/             # 文章详情页
│   │   │       └── page.tsx
│   │   ├── tools/                  # 计算器目录
│   │   │   ├── page.tsx            # 工具列表
│   │   │   └── [slug]/             # 计算器详情
│   │   │       └── page.tsx
│   │   └── about/                  # 其他页面
│   │       └── page.tsx
│   │
│   ├── admin/                       # 管理后台
│   │   ├── layout.tsx              # 后台布局
│   │   ├── page.tsx                # Dashboard
│   │   ├── login/                  # 登录
│   │   ├── articles/               # 文章管理
│   │   ├── calculators/            # 计算器管理
│   │   ├── categories/             # 分类管理
│   │   └── settings/               # 设置
│   │
│   ├── api/                         # API路由
│   │   ├── auth/                   # 认证API
│   │   │   ├── login/
│   │   │   └── logout/
│   │   ├── articles/               # 文章API
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   ├── calculators/            # 计算器API
│   │   └── categories/             # 分类API
│   │
│   ├── globals.css
│   └── layout.tsx                  # 根布局
│
├── components/
│   ├── ui/                          # 基础UI组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── layout/                      # 布局组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── article/                     # 文章相关
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleContent.tsx
│   │   └── RelatedArticles.tsx
│   ├── calculator/                  # 计算器相关
│   │   ├── CalculatorCard.tsx
│   │   └── EducationalContent.tsx
│   └── calculators/                 # 实际计算器组件
│       ├── ProtocolSelectionWizard.tsx
│       ├── BatteryLifeComparison.tsx
│       └── ...
│
├── lib/
│   ├── db/
│   │   ├── client.ts               # D1客户端
│   │   ├── models.ts               # 数据库模型
│   │   └── queries.ts              # 复杂查询
│   ├── auth/
│   │   ├── jwt.ts                  # JWT工具
│   │   └── password.ts             # 密码加密
│   ├── utils.ts                    # 工具函数
│   └── types.ts                    # TypeScript类型
│
├── database/
│   ├── schema.sql                  # 数据库schema
│   ├── seed.sql                    # 初始数据
│   └── migrations/                 # 迁移脚本
│
├── public/
│   └── images/
│
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── wrangler.toml                   # Cloudflare配置
└── package.json
```

---

## 🔄 数据流设计

### 公开网站

1. **首页** (`/`)
   - 从`pages`表获取首页配置
   - 显示featured文章和计算器
   - 显示分类导航

2. **分类页** (`/protocols`)
   - 从`categories`表获取分类信息
   - 从`articles`表获取该分类下的所有文章
   - 按发布时间排序

3. **文章详情页** (`/protocols/smart-lock-protocols-overview`)
   - 根据slug从`articles`表获取文章
   - 渲染Markdown内容
   - 显示相关文章（从`article_relations`）
   - 增加浏览量

4. **计算器列表页** (`/tools`)
   - 从`calculators`表获取所有计算器
   - 按分类和使用次数排序

5. **计算器详情页** (`/tools/protocol-selection-wizard`)
   - 根据slug从`calculators`表获取配置
   - 根据`component_name`加载React组件
   - 显示关联文章（从`calculator_articles`）
   - 显示相关工具（从`calculator_tools`）
   - 增加使用次数

### 管理后台

1. **文章管理**
   - CRUD操作
   - Markdown编辑器
   - 分类选择
   - 相关文章管理
   - 预览功能

2. **计算器管理**
   - 配置编辑
   - 关联文章管理
   - 相关工具管理

3. **分类管理**
   - CRUD操作
   - 排序调整

---

## 🚀 实施步骤

### Phase 1: 数据迁移
1. 从旧项目提取所有MDX文章内容
2. 解析frontmatter和内容
3. 插入到D1数据库

### Phase 2: 核心功能
1. 数据库连接和模型
2. API路由实现
3. 基础UI组件

### Phase 3: 公开网站
1. 首页
2. 分类和文章页
3. 计算器页

### Phase 4: 管理后台
1. 认证系统
2. 文章CRUD
3. 计算器配置

### Phase 5: 优化和部署
1. SEO优化
2. 性能优化
3. Cloudflare Pages部署

---

## 💾 数据迁移策略

从旧Astro项目迁移到D1数据库：

```typescript
// 伪代码
const articles = getAllMDXFiles('./src/content/articles')

for (const article of articles) {
  const { frontmatter, content } = parseMDX(article)
  
  await db.execute(`
    INSERT INTO articles (
      title, slug, description, content,
      category_id, author_id, is_pillar,
      featured, reading_time, word_count,
      meta_title, meta_description,
      status, published_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    frontmatter.title,
    article.slug,
    frontmatter.description,
    content,
    getCategoryId(article.category),
    1, // 默认作者
    frontmatter.isPillar,
    frontmatter.featured,
    frontmatter.readingTime,
    frontmatter.wordCount,
    frontmatter.meta_title,
    frontmatter.meta_description,
    'published',
    frontmatter.pubDate
  ])
}
```

---

这个架构确保：
✅ 所有内容动态化（除了计算器组件本身）
✅ 易于管理和扩展
✅ SEO友好
✅ 性能优秀（D1边缘数据库）
✅ 模块化、组件化，代码复用性高
