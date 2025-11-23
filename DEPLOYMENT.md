# 🚀 部署指南 - Smart Lock Hub

完整的从零到部署的指南

---

## 📋 前置条件

- [x] D1数据库已创建: `smartlock-production` 
- [x] GitHub仓库: https://github.com/kevinaugment/smartlock-next
- [ ] Cloudflare账号: kevinaugment@gmail.com

---

## 第一步：初始化D1数据库

### 1.1 执行数据库schema

```bash
cd /Users/luokun/Documents/GitHub/smartlock-next

# 创建表结构
npx wrangler d1 execute smartlock-production --remote --file=./database/schema.sql

# 插入初始数据
npx wrangler d1 execute smartlock-production --remote --file=./database/seed.sql
```

### 1.2 验证数据库

```bash
# 检查表
npx wrangler d1 execute smartlock-production --remote --command="SELECT name FROM sqlite_master WHERE type='table'"

# 检查分类
npx wrangler d1 execute smartlock-production --remote --command="SELECT * FROM categories"

# 检查管理员
npx wrangler d1 execute smartlock-production --remote --command="SELECT email, role FROM users"
```

**预期结果:**
- 14个表已创建
- 7个分类已插入
- 14个计算器已配置
- 1个管理员账号 (admin@smartlock.com)

---

## 第二步：迁移现有文章（可选）

### 2.1 安装迁移工具

```bash
npm install -D gray-matter tsx @types/node
```

### 2.2 运行迁移脚本

```bash
# 生成迁移SQL
npx tsx database/migrate-from-astro.ts

# 这会生成 database/migrate-articles.sql 文件
```

### 2.3 执行迁移

```bash
npx wrangler d1 execute smartlock-production --remote --file=./database/migrate-articles.sql
```

### 2.4 验证文章

```bash
# 统计文章数量
npx wrangler d1 execute smartlock-production --remote --command="SELECT COUNT(*) as total, category_id FROM articles GROUP BY category_id"

# 查看前5篇文章
npx wrangler d1 execute smartlock-production --remote --command="SELECT id, title, slug, category_id FROM articles LIMIT 5"
```

---

## 第三步：部署到Cloudflare Pages

### 方式A: 通过Dashboard（推荐）

1. **访问Cloudflare Dashboard**
   - 登录: https://dash.cloudflare.com
   - 邮箱: kevinaugment@gmail.com

2. **创建Pages项目**
   - Workers & Pages → Create application → Pages
   - Connect to Git → 选择GitHub账号
   - 选择仓库: `kevinaugment/smartlock-next`

3. **配置构建设置**
   ```
   Project name: smartlock-hub
   Production branch: main
   Framework preset: Next.js
   Build command: npm run build
   Build output directory: .next
   Root directory: /
   ```

4. **配置环境变量**
   
   在 Settings → Environment variables 添加:
   
   **Production环境:**
   ```
   JWT_SECRET = your-super-secret-jwt-key-min-32-chars-long
   ENVIRONMENT = production
   ```
   
5. **绑定D1数据库**
   
   在 Settings → Functions → D1 database bindings:
   ```
   Variable name: DB
   D1 database: smartlock-production
   ```

6. **点击Save and Deploy**

7. **等待构建完成**（约2-3分钟）

8. **访问网站**
   - Production URL: `https://smartlock-hub.pages.dev`
   - 或绑定自定义域名

### 方式B: 使用Wrangler CLI

```bash
# 安装依赖
npm install

# 本地构建
npm run build

# 部署
npx wrangler pages deploy .next --project-name=smartlock-hub
```

---

## 第四步：验证部署

### 4.1 测试公开网站

访问以下页面确认正常:

- [ ] 首页: `https://your-domain.pages.dev/`
- [ ] 分类页: `https://your-domain.pages.dev/protocols`
- [ ] 文章页: `https://your-domain.pages.dev/protocols/zigbee-vs-zwave-comparison`
- [ ] 工具列表: `https://your-domain.pages.dev/tools`
- [ ] 计算器: `https://your-domain.pages.dev/tools/protocol-selection-wizard`

### 4.2 测试管理后台

- [ ] 登录页: `https://your-domain.pages.dev/admin/login`
- [ ] 使用账号: `admin@smartlock.com` / `admin123`
- [ ] Dashboard: `https://your-domain.pages.dev/admin`
- [ ] 文章管理: `https://your-domain.pages.dev/admin/articles`

### 4.3 测试API

```bash
# 获取分类列表
curl https://your-domain.pages.dev/api/categories

# 获取文章列表
curl https://your-domain.pages.dev/api/articles

# 获取计算器列表
curl https://your-domain.pages.dev/api/calculators
```

---

## 第五步：后续配置

### 5.1 修改管理员密码

登录后台后立即修改密码！

### 5.2 配置自定义域名（可选）

在Cloudflare Dashboard:
1. 进入Pages项目
2. Custom domains → Add domain
3. 输入域名并验证
4. DNS会自动配置

### 5.3 设置Google Analytics（可选）

```bash
npx wrangler d1 execute smartlock-production --remote --command="UPDATE settings SET value = 'G-XXXXXXXXXX' WHERE key = 'google_analytics_id'"
```

### 5.4 配置SEO设置

在管理后台 Settings 中配置:
- Site title
- Site description  
- Default OG image
- Social media links

---

## 🔧 故障排除

### 问题1: 构建失败

**错误**: `Module not found: Can't resolve 'xxx'`

**解决**:
```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

### 问题2: 数据库连接失败

**错误**: `D1 database not available`

**解决**:
1. 检查wrangler.toml中的database_id是否正确
2. 确保在Pages设置中绑定了D1数据库
3. 变量名必须是 `DB`

### 问题3: JWT验证失败

**错误**: `Invalid token`

**解决**:
1. 确保设置了 `JWT_SECRET` 环境变量
2. JWT_SECRET至少32个字符
3. Production和Preview环境都要设置

### 问题4: 文章不显示

**原因**: 文章状态为draft或未迁移

**解决**:
```bash
# 检查文章状态
npx wrangler d1 execute smartlock-production --remote --command="SELECT status, COUNT(*) FROM articles GROUP BY status"

# 如果有draft文章，可以批量发布
npx wrangler d1 execute smartlock-production --remote --command="UPDATE articles SET status='published', published_at=datetime('now') WHERE status='draft'"
```

---

## 📊 监控和维护

### 查看访问统计

```bash
# 最近30天访问量
npx wrangler d1 execute smartlock-production --remote --command="
SELECT 
  date, 
  SUM(view_count) as views,
  SUM(unique_visitors) as visitors
FROM analytics 
WHERE date >= date('now', '-30 days')
GROUP BY date
ORDER BY date DESC
"
```

### 备份数据库

```bash
# 导出所有文章
npx wrangler d1 execute smartlock-production --remote --command="SELECT * FROM articles" > articles-backup.json

# 导出完整数据库（需要其他工具）
```

### 定期任务

- [ ] 每周检查404链接
- [ ] 每月Review访问统计
- [ ] 定期更新文章内容
- [ ] 监控数据库大小

---

## ✅ 部署清单

部署前检查:

- [ ] D1数据库已创建并初始化
- [ ] Schema和seed已执行
- [ ] 文章已迁移（如需要）
- [ ] GitHub仓库已推送
- [ ] Cloudflare Pages已配置
- [ ] D1数据库已绑定
- [ ] 环境变量已设置
- [ ] 构建成功
- [ ] 所有页面可访问
- [ ] 管理后台可登录
- [ ] API响应正常
- [ ] 管理员密码已修改

---

## 🎉 完成！

您的Smart Lock Hub已成功部署！

**接下来:**
1. 开始添加/编辑文章
2. 配置SEO设置
3. 绑定自定义域名
4. 分享给用户

**需要帮助?**
- 查看 [README.md](./README.md)
- 查看 [ARCHITECTURE.md](./ARCHITECTURE.md)
- GitHub Issues: https://github.com/kevinaugment/smartlock-next/issues

---

**部署成功日期**: _____________  
**部署URL**: _____________  
**管理员**: admin@smartlock.com
