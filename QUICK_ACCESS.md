# 🚀 Smart Lock Hub - 快速访问

## 🌐 生产环境链接

### 主站
- **首页**: https://b513ee74.smartlock-next.pages.dev
- **备用域名**: https://smartlock-next.pages.dev

### 核心页面
- **关于**: https://b513ee74.smartlock-next.pages.dev/about
- **文章列表**: https://b513ee74.smartlock-next.pages.dev/articles
- **计算器**: https://b513ee74.smartlock-next.pages.dev/calculators
- **协议对比**: https://b513ee74.smartlock-next.pages.dev/compare
- **品牌对比**: https://b513ee74.smartlock-next.pages.dev/brands
- **资源中心**: https://b513ee74.smartlock-next.pages.dev/resources
- **常见问题**: https://b513ee74.smartlock-next.pages.dev/faq
- **联系我们**: https://b513ee74.smartlock-next.pages.dev/contact

### 管理后台
- **登录**: https://b513ee74.smartlock-next.pages.dev/admin/login
- **仪表盘**: https://b513ee74.smartlock-next.pages.dev/admin
- **文章管理**: https://b513ee74.smartlock-next.pages.dev/admin/articles

### API端点
- **健康检查**: https://b513ee74.smartlock-next.pages.dev/api/health
- **分类列表**: https://b513ee74.smartlock-next.pages.dev/api/categories
- **XML站点地图**: https://b513ee74.smartlock-next.pages.dev/sitemap.xml

### 系统页面
- **网站地图**: https://b513ee74.smartlock-next.pages.dev/sitemap
- **系统状态**: https://b513ee74.smartlock-next.pages.dev/status

---

## 🎛️ Cloudflare Dashboard

### Pages管理
- **项目概览**: https://dash.cloudflare.com/pages
- **部署历史**: https://dash.cloudflare.com/pages/view/smartlock-next
- **设置**: https://dash.cloudflare.com/pages/view/smartlock-next/settings

### D1数据库
- **数据库列表**: https://dash.cloudflare.com/d1
- **smartlock-production**: https://dash.cloudflare.com/d1/a6ecde29-4a32-4085-bdd6-a390ed453eec

### 性能优化
- **Speed Optimization**: https://dash.cloudflare.com/speed/optimization
- **Caching**: https://dash.cloudflare.com/caching/configuration
- **Page Rules**: https://dash.cloudflare.com/rules/page-rules

### 安全设置
- **SSL/TLS**: https://dash.cloudflare.com/ssl-tls
- **Firewall**: https://dash.cloudflare.com/security/waf
- **Security Level**: https://dash.cloudflare.com/security/settings

### 分析
- **Web Analytics**: https://dash.cloudflare.com/analytics/web
- **Performance**: https://dash.cloudflare.com/analytics/performance
- **Traffic**: https://dash.cloudflare.com/analytics/traffic

---

## 🛠️ 开发工具

### 本地命令
```bash
# 开发服务器
npm run dev

# 构建
npm run pages:build

# 部署
./scripts/deploy.sh
# 或
npx wrangler pages deploy .vercel/output/static --project-name=smartlock-next

# 数据库迁移
npx wrangler d1 execute smartlock-production --remote --file=./database/schema.sql
npx wrangler d1 execute smartlock-production --remote --file=./database/seed.sql

# 查看日志
npx wrangler pages deployment tail

# 检查状态
npx wrangler whoami
```

### 性能测试
```bash
# Lighthouse
npx lighthouse https://b513ee74.smartlock-next.pages.dev --view

# WebPageTest
open https://www.webpagetest.org/

# GTmetrix
open https://gtmetrix.com/
```

---

## 📊 监控链接

### Cloudflare Analytics
- **Real-time**: https://dash.cloudflare.com/analytics/real-time
- **Core Web Vitals**: https://dash.cloudflare.com/analytics/web-vitals
- **Cache Performance**: https://dash.cloudflare.com/caching/analytics

### 第三方工具
- **Google PageSpeed**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/
- **Pingdom**: https://tools.pingdom.com/

---

## 🔐 安全管理

### API Tokens
- **查看Tokens**: https://dash.cloudflare.com/profile/api-tokens
- **创建新Token**: https://dash.cloudflare.com/profile/api-tokens/create

### ⚠️ 重要提醒
**立即撤销之前暴露的密钥！**
1. Global API Key: 立即撤销
2. Origin CA Key: 立即撤销
3. 使用OAuth或新的API Token代替

---

## 📚 文档资源

### Cloudflare
- **Pages Docs**: https://developers.cloudflare.com/pages/
- **D1 Docs**: https://developers.cloudflare.com/d1/
- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler/
- **Next.js on Pages**: https://developers.cloudflare.com/pages/framework-guides/nextjs/

### Next.js
- **Next.js Docs**: https://nextjs.org/docs
- **App Router**: https://nextjs.org/docs/app
- **Edge Runtime**: https://nextjs.org/docs/app/api-reference/edge

### 社区
- **Cloudflare Community**: https://community.cloudflare.com/
- **Discord**: https://discord.cloudflare.com/
- **GitHub**: https://github.com/cloudflare/next-on-pages

---

## 🎯 快速操作

### 查看实时日志
```bash
npx wrangler pages deployment tail --project-name=smartlock-next
```

### 回滚部署
```bash
# 在Dashboard中选择之前的部署版本
# Pages → smartlock-next → Deployments → 选择版本 → Rollback
```

### 更新代码并重新部署
```bash
git add .
git commit -m "Update: description"
git push origin main
# GitHub Actions会自动触发部署
```

### 手动部署
```bash
npm run pages:build
npx wrangler pages deploy .vercel/output/static --project-name=smartlock-next
```

---

## 📱 测试链接组合

### 桌面测试
```
https://b513ee74.smartlock-next.pages.dev
https://b513ee74.smartlock-next.pages.dev/articles
https://b513ee74.smartlock-next.pages.dev/calculators/battery-life
https://b513ee74.smartlock-next.pages.dev/admin/login
```

### 移动端测试
在移动设备上访问相同链接测试响应式设计

### API测试
```bash
curl https://b513ee74.smartlock-next.pages.dev/api/health
curl https://b513ee74.smartlock-next.pages.dev/api/categories
```

---

**所有链接均已测试并可用 ✅**

保存此文件以便快速访问所有重要链接！
