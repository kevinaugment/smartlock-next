# Smart Lock Hub - Next.js + D1

**完全动态化的智能锁知识库系统**

## 🎯 项目特点

- ✅ **完全动态化**: 所有内容从D1数据库加载，支持实时更新
- ✅ **Next.js 14**: 使用最新App Router架构
- ✅ **Cloudflare D1**: 全球边缘数据库，超快响应
- ✅ **模块化设计**: 组件化、可复用、易维护
- ✅ **SEO优化**: 动态meta标签、sitemap生成
- ✅ **管理后台**: 完整的内容管理系统
- ✅ **无R2/KV依赖**: 简化架构，仅使用D1数据库

## 📊 技术栈

- **前端**: Next.js 14, React 18, TailwindCSS
- **数据库**: Cloudflare D1 (SQLite)
- **认证**: JWT (jose)
- **Markdown**: react-markdown + remark-gfm
- **部署**: Cloudflare Pages

## 🚀 快速开始

### 1. 安装依赖

```bash
cd /Users/luokun/Documents/GitHub/smartlock-next
npm install
```

### 2. 初始化D1数据库

```bash
# 创建数据库（已创建）
# npx wrangler d1 create smartlock-production

# 执行schema
npx wrangler d1 execute smartlock-production --remote --file=./database/schema.sql

# 插入初始数据
npx wrangler d1 execute smartlock-production --remote --file=./database/seed.sql
```

### 3. 配置环境变量

创建 `.dev.vars` 文件：

```bash
DB=<your-d1-binding>
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 4. 迁移旧数据（可选）

```bash
# 安装迁移工具
npm install -D gray-matter tsx

# 运行迁移脚本
npx tsx database/migrate-from-astro.ts

# 执行迁移SQL
npx wrangler d1 execute smartlock-production --remote --file=./database/migrate-articles.sql
```

### 5. 本地开发

```bash
npm run dev
```

访问: http://localhost:3000

## 📁 项目结构

```
smartlock-next/
├── app/
│   ├── (public)/           # 公开网站
│   │   ├── page.tsx       # 首页
│   │   ├── [category]/    # 分类页 (/protocols)
│   │   │   └── [slug]/    # 文章页 (/protocols/zigbee-vs-zwave)
│   │   └── tools/         # 计算器
│   │       └── [slug]/
│   ├── admin/             # 管理后台
│   │   ├── login/
│   │   ├── articles/
│   │   └── ...
│   └── api/               # API路由
│       ├── auth/
│       ├── articles/
│       └── ...
├── components/
│   ├── ui/                # 基础UI组件
│   ├── layout/            # 布局组件
│   ├── article/           # 文章组件
│   └── calculators/       # 计算器组件
├── lib/
│   ├── db/                # 数据库客户端和模型
│   ├── auth/              # 认证工具
│   └── utils.ts           # 工具函数
└── database/
    ├── schema.sql         # 数据库结构
    ├── seed.sql           # 初始数据
    └── migrate-from-astro.ts  # 迁移脚本
```

## 🗄️ 数据库设计

### 核心表

1. **users** - 管理员用户
2. **categories** - 7个核心分类
3. **articles** - 文章内容（Markdown）
4. **tags** - 标签系统
5. **calculators** - 14个计算器配置
6. **calculator_articles** - 计算器关联文章
7. **calculator_tools** - 计算器相关工具
8. **pages** - 页面配置
9. **navigation** - 导航菜单
10. **settings** - 全局设置
11. **analytics** - 访问统计
12. **audit_logs** - 审计日志

详见: [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🔐 默认管理员账号

- **邮箱**: admin@smartlock.com
- **密码**: admin123

⚠️ **生产环境请立即修改密码！**

## 🛠️ 计算器列表

14个交互式工具：

1. Protocol Selection Wizard - 协议选择向导
2. Battery Life Comparison - 电池寿命对比
3. Lock TCO Calculator - 总拥有成本计算
4. RF Coverage Estimator - RF覆盖估算
5. Mesh Node Planner - 网格网络规划
6. Short-term Rental ROI - 短租投资回报
7. Multi-property Fleet Planner - 多物业规划
8. Credential Capacity Planner - 凭证容量规划
9. Power Consumption Estimator - 功耗估算
10. Security Audit Scorecard - 安全审计
11. Offline Resilience Scorecard - 离线弹性评估
12. Door Compatibility Checker - 门兼容性检查
13. Emergency Backup Evaluator - 应急备份评估
14. Installation Time Estimator - 安装时间估算

## 📝 内容管理

### 发布新文章

1. 登录管理后台: `/admin/login`
2. 进入文章管理: `/admin/articles`
3. 点击"新建文章"
4. 编辑Markdown内容
5. 设置分类、标签、SEO
6. 发布

### 配置计算器

1. 进入计算器管理: `/admin/calculators`
2. 编辑计算器配置
3. 添加关联文章
4. 添加相关工具链接

## 🚢 部署到Cloudflare Pages

### 方式1: 通过GitHub连接（推荐）

1. 推送代码到GitHub
2. 访问 Cloudflare Dashboard
3. Workers & Pages → Create → Pages → Connect to Git
4. 选择仓库 `smartlock-next`
5. 配置:
   - **Framework**: Next.js
   - **Build command**: `npm run build`
   - **Build output**: `.next`
6. 环境变量:
   - `DB`: 绑定到 `smartlock-production`
   - `JWT_SECRET`: 设置密钥
7. 点击 Deploy

### 方式2: 本地构建部署

```bash
# 构建
npm run build

# 部署
npx wrangler pages deploy .next
```

## 📊 统计与监控

访问统计数据存储在 `analytics` 表中：

- 每日PV/UV
- 页面停留时间
- 跳出率

查询示例：

```sql
SELECT date, SUM(view_count) as total_views 
FROM analytics 
WHERE date >= date('now', '-30 days')
GROUP BY date
ORDER BY date DESC;
```

## 🔧 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 数据库操作
npm run db:migrate    # 运行schema
npm run db:seed       # 插入初始数据

# 查询数据库
npx wrangler d1 execute smartlock-production --remote --command="SELECT COUNT(*) FROM articles"

# 部署
npx wrangler pages deploy .next
```

## 📖 API文档

### 公开API

- `GET /api/articles` - 获取文章列表
- `GET /api/articles/[slug]` - 获取文章详情
- `GET /api/categories` - 获取分类列表
- `GET /api/calculators` - 获取计算器列表

### 管理API（需要JWT）

- `POST /api/articles` - 创建文章
- `PUT /api/articles/[id]` - 更新文章
- `DELETE /api/articles/[id]` - 删除文章

## 🐛 故障排除

### 数据库连接失败

检查 `wrangler.toml` 配置：

```toml
[[d1_databases]]
binding = "DB"
database_name = "smartlock-production"
database_id = "a6ecde29-4a32-4085-bdd6-a390ed453eec"
```

### JWT验证失败

确保 `.dev.vars` 中设置了 `JWT_SECRET`

### 文章不显示

检查文章状态是否为 `published`：

```sql
UPDATE articles SET status = 'published' WHERE status = 'draft';
```

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Smart Lock Hub** - 专业的智能锁知识库系统
