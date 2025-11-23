# 🚀 Smart Lock Hub - 开发路线图

## ✅ 已完成

### 阶段1: 基础设施 (完成)
- [x] Next.js 14 + Cloudflare Pages 部署
- [x] D1 数据库配置
- [x] 基础UI布局（首页）
- [x] Tailwind CSS样式系统
- [x] API路由结构（categories）
- [x] TypeScript配置
- [x] 完整数据库Schema设计

---

## 🔄 进行中

### 阶段2: 数据迁移
- [ ] 从Astro项目导入文章（40+篇）
- [ ] 标签数据迁移
- [ ] 分类数据填充
- [ ] 文章关系建立

### 阶段3: 核心功能开发
- [ ] 文章页面系统
- [ ] 管理后台
- [ ] 计算器组件

---

## 📋 详细任务

### 🔄 当前任务：数据迁移

#### 步骤 1: 安装依赖
```bash
cd /Users/luokun/Documents/GitHub/smartlock-next
npm install tsx gray-matter --save-dev
```

#### 步骤 2: 运行迁移脚本
```bash
# 生成SQL迁移文件
npm run migrate:articles

# 查看生成的SQL文件
cat database/migrate-articles.sql

# 执行迁移到D1
npm run migrate:articles:run
```

#### 步骤 3: 验证数据
```bash
# 查询文章数量
wrangler d1 execute smartlock-production --remote --command="SELECT COUNT(*) FROM articles"

# 查看最新文章
wrangler d1 execute smartlock-production --remote --command="SELECT id, title, category_id FROM articles LIMIT 5"
```

---

### 📝 下一任务：文章页面系统

#### 功能需求
1. **文章列表页** (`/articles` 和 `/articles/[category]`)
   - 按分类筛选
   - 搜索功能
   - 分页
   - 卡片式展示

2. **文章详情页** (`/articles/[category]/[slug]`)
   - Markdown渲染（react-markdown）
   - 目录导航（TOC）
   - 相关文章推荐
   - 阅读进度
   - SEO优化

3. **组件**
   - ArticleCard
   - ArticleContent
   - TableOfContents
   - RelatedArticles
   - Breadcrumb

#### 文件结构
```
app/
├── articles/
│   ├── page.tsx                    # 文章列表
│   ├── [category]/
│   │   ├── page.tsx                # 分类文章列表
│   │   └── [slug]/
│   │       └── page.tsx            # 文章详情
│   └── components/
│       ├── ArticleCard.tsx
│       ├── ArticleContent.tsx
│       ├── TableOfContents.tsx
│       └── RelatedArticles.tsx
```

---

### 🎨 管理后台

#### 功能模块
1. **认证系统**
   - 登录页面 (`/admin/login`)
   - JWT认证
   - 权限控制

2. **仪表盘** (`/admin`)
   - 统计概览
   - 最近文章
   - 快速操作

3. **文章管理** (`/admin/articles`)
   - 列表视图（表格）
   - 创建/编辑文章
   - Markdown编辑器
   - 实时预览
   - 批量操作

4. **分类管理** (`/admin/categories`)
   - CRUD操作
   - 拖拽排序

5. **标签管理** (`/admin/tags`)
   - 标签列表
   - 使用统计

6. **设置** (`/admin/settings`)
   - 站点信息
   - SEO设置
   - 导航菜单

#### 技术栈
- **UI框架**: shadcn/ui
- **表单**: react-hook-form + zod
- **编辑器**: monaco-editor 或 CodeMirror
- **表格**: @tanstack/react-table
- **图表**: recharts

---

### 🧮 计算器组件

#### 已有计算器（从旧项目）
1. Battery Life Calculator
2. Signal Strength Analyzer
3. Code Generation Tool
4. Installation Cost Estimator
5. Door Compatibility Checker

#### 实现方案
```typescript
// app/calculators/[slug]/page.tsx
import dynamic from 'next/dynamic'

const calculators = {
  'battery-life': dynamic(() => import('@/components/calculators/BatteryLife')),
  'signal-strength': dynamic(() => import('@/components/calculators/SignalStrength')),
  // ...
}

export default function CalculatorPage({ params }) {
  const Calculator = calculators[params.slug]
  return <Calculator />
}
```

#### 组件结构
```
components/
└── calculators/
    ├── BatteryLife/
    │   ├── index.tsx           # 计算逻辑
    │   ├── Form.tsx            # 输入表单
    │   ├── Results.tsx         # 结果展示
    │   └── Educational.tsx     # 教育内容
    └── shared/
        ├── CalculatorLayout.tsx
        ├── ResultCard.tsx
        └── RelatedContent.tsx
```

---

## 🎯 优先级

### P0（最高优先级）
1. ✅ 部署成功
2. 🔄 数据迁移（当前）
3. 📝 文章详情页
4. 🔍 文章列表页

### P1（高优先级）
5. 🎨 管理后台基础框架
6. ✏️ 文章CRUD
7. 🔐 认证系统

### P2（中优先级）
8. 🧮 计算器迁移
9. 📊 统计分析
10. 🔍 搜索功能

### P3（低优先级）
11. 📧 邮件通知
12. 🌐 多语言支持
13. 📱 PWA功能

---

## 📦 依赖安装计划

### 当前需要安装
```bash
npm install tsx gray-matter --save-dev
```

### 文章页面需要
```bash
npm install react-markdown remark-gfm rehype-highlight rehype-slug rehype-autolink-headings
```

### 管理后台需要
```bash
npm install @radix-ui/react-* cmdk date-fns
npm install @tanstack/react-table @tanstack/react-query
npm install recharts
```

---

## 🛠️ 开发工具

### VS Code扩展
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Wrangler

### 调试命令
```bash
# 本地开发
npm run dev

# 查看D1数据库
wrangler d1 execute smartlock-production --remote --command="SELECT * FROM articles LIMIT 10"

# 本地构建测试
npm run pages:build

# 部署到Cloudflare
git add . && git commit -m "..." && git push
```

---

## 📊 进度跟踪

### 本周目标
- [x] 部署成功
- [ ] 完成数据迁移
- [ ] 实现文章详情页
- [ ] 开始管理后台

### 下周目标
- [ ] 完成管理后台核心功能
- [ ] 迁移计算器组件
- [ ] 添加搜索功能

---

## 📝 注意事项

1. **Edge Runtime限制**
   - 只在API路由使用
   - 页面组件使用标准runtime

2. **D1数据库**
   - 使用`getRequestContext()`访问
   - 类型断言: `(context.env as any).DB`

3. **图片优化**
   - 在`next.config.mjs`中设置`unoptimized: true`

4. **构建命令**
   - 使用`npx @cloudflare/next-on-pages`
   - 输出目录：`.vercel/output/static`

---

**最后更新**: 2025-11-23 19:26
