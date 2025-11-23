# Cloudflare Pages 部署与优化指南

## ⚠️ 安全警告

**您的API密钥已在对话中暴露！请立即执行以下操作：**

1. 登录 Cloudflare Dashboard: https://dash.cloudflare.com/
2. 进入 My Profile → API Tokens
3. 撤销现有的 Global API Key
4. 重新生成新的 API Token（仅用于Pages和D1的权限）

---

## 🚀 部署步骤

### 方法1: 使用Wrangler CLI（推荐）

#### 步骤1: 登录Cloudflare

```bash
# 使用交互式OAuth登录（最安全）
npx wrangler login

# 或者设置环境变量（使用新生成的API Token）
export CLOUDFLARE_API_TOKEN="your_new_token_here"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
```

#### 步骤2: 构建项目

```bash
# 安装依赖（如果还没安装）
npm install

# 构建为Cloudflare Pages格式
npm run pages:build
```

#### 步骤3: 部署到Cloudflare Pages

```bash
# 方式A: 直接部署（会自动构建）
npm run pages:deploy

# 方式B: 使用wrangler命令
npx wrangler pages deploy .vercel/output/static --project-name=smartlock-next
```

---

### 方法2: 通过GitHub自动部署（推荐用于生产环境）

#### 步骤1: 连接GitHub仓库

1. 登录 Cloudflare Dashboard
2. 进入 Workers & Pages → Create application → Pages → Connect to Git
3. 选择您的 `smartlock-next` 仓库
4. 授权访问

#### 步骤2: 配置构建设置

```yaml
Framework preset: Next.js
Build command: npm run pages:build
Build output directory: .vercel/output/static
Root directory: (leave empty)
```

#### 步骤3: 配置环境变量

在 Pages 项目设置中添加：
- `NODE_VERSION`: 18
- `ENVIRONMENT`: production

#### 步骤4: 配置D1数据库绑定

1. Pages项目 → Settings → Functions → D1 database bindings
2. 添加绑定：
   - Variable name: `DB`
   - D1 database: `smartlock-production`

---

## ⚡ Cloudflare 免费版性能优化配置

### 1. Caching Strategy（缓存策略）

在Cloudflare Dashboard中配置：

#### Pages Rules（免费版3条规则）

**规则1: 静态资源缓存**
```
URL: smartlock-next.pages.dev/_next/static/*
Cache Level: Cache Everything
Edge Cache TTL: 1 month
Browser Cache TTL: 1 month
```

**规则2: API路由缓存**
```
URL: smartlock-next.pages.dev/api/categories
Cache Level: Cache Everything
Edge Cache TTL: 1 hour
Browser Cache TTL: 5 minutes
```

**规则3: HTML页面缓存**
```
URL: smartlock-next.pages.dev/*
Cache Level: Standard
Edge Cache TTL: 2 hours
```

### 2. Performance Settings

进入 Speed → Optimization：

#### Auto Minify（自动压缩）
- ✅ JavaScript
- ✅ CSS
- ✅ HTML

#### Brotli（启用Brotli压缩）
- ✅ Enable Brotli

#### Early Hints（早期提示）
- ✅ Enable Early Hints

#### Rocket Loader（异步加载JS）
- ⚠️ 谨慎启用（可能与React冲突）
- 建议：关闭（Next.js已优化）

### 3. Security Settings

#### SSL/TLS
- SSL/TLS encryption mode: **Full (strict)**
- Always Use HTTPS: ✅ On
- Automatic HTTPS Rewrites: ✅ On
- Minimum TLS Version: TLS 1.2

#### Security Level
- 设置为 **Medium** 或 **High**

### 4. Network Settings

#### HTTP/2
- ✅ Enable HTTP/2

#### HTTP/3 (with QUIC)
- ✅ Enable HTTP/3

#### 0-RTT Connection Resumption
- ✅ Enable

#### WebSockets
- ✅ Enable

### 5. Speed → Optimization

#### Railgun（企业功能，免费版不可用）
- ❌ Not available

#### Polish（图片优化 - 需要付费）
- 替代方案：使用 Next.js Image优化
- 项目已配置 `images: { unoptimized: true }`

#### Mirage（移动端优化 - 需要付费）
- 替代方案：使用响应式设计（已实现）

### 6. Firewall Rules（防火墙规则）

免费版可用5条规则：

**规则1: 阻止恶意Bot**
```
(cf.client.bot) and not (cf.verified_bot_category in {"Search Engine Crawler"})
Action: Block
```

**规则2: 地理位置限制（可选）**
```
(ip.geoip.country in {"CN" "US" "GB"})
Action: Allow
```

**规则3: 速率限制保护**
```
(http.request.uri.path contains "/api/")
Action: Rate Limit (10 req/min per IP)
```

### 7. Page Rules 最佳实践

由于免费版只有3条规则，优先配置：

1. **/_next/static/*** - 静态资源最大化缓存
2. **/api/categories** - API响应缓存
3. **/articles/*** - 文章页面缓存

### 8. Workers Analytics（免费可用）

启用以下分析：
- ✅ Web Analytics
- ✅ Performance metrics
- ✅ Core Web Vitals

### 9. Custom Domain（自定义域名）

如果有自定义域名：

1. Pages → Custom domains → Add domain
2. 添加CNAME记录指向: `smartlock-next.pages.dev`
3. 启用 Cloudflare 的 DNS 代理（橙色云图标）

### 10. DNS 优化

如果使用Cloudflare DNS：
- ✅ DNSSEC: Enable
- ✅ CNAME Flattening: Enable
- DNS Record TTL: Auto

---

## 📊 性能监控配置

### 1. Web Analytics（免费）

在 Analytics → Web Analytics 中启用：
- JavaScript beacon
- 隐私友好（无Cookie）
- 符合GDPR

### 2. Performance Reports

定期检查：
- Core Web Vitals
- Page load time
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

### 3. Cache Analytics

监控：
- Cache hit ratio（目标 >85%）
- Bandwidth savings
- Requests by cache status

---

## 🔧 项目代码优化

### 1. 已实现的优化

✅ **Next.js 14** - 最新版本
✅ **Edge Runtime** - 所有API路由
✅ **Static Generation** - 静态页面预渲染
✅ **Code Splitting** - 自动代码分割
✅ **Tree Shaking** - 移除未使用代码
✅ **Minification** - 代码压缩

### 2. 建议添加的优化

#### 添加 Cache-Control Headers

创建 `public/_headers` 文件：

```
# 静态资源
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

# 图片
/images/*
  Cache-Control: public, max-age=86400

# API响应
/api/categories
  Cache-Control: public, max-age=3600, s-maxage=3600
```

#### 添加 _redirects 文件

创建 `public/_redirects` 文件：

```
# 旧链接重定向（如有需要）
/old-path/* /new-path/:splat 301

# SPA回退
/* /index.html 200
```

---

## 📋 部署检查清单

### 部署前
- [ ] 代码已提交到Git
- [ ] 构建测试通过 (`npm run build`)
- [ ] 环境变量已配置
- [ ] D1数据库已创建并迁移
- [ ] API Token已生成（新的，安全的）

### 部署后
- [ ] 访问生产URL验证部署成功
- [ ] 测试所有主要页面
- [ ] 验证API端点工作正常
- [ ] 检查D1数据库连接
- [ ] 测试管理后台登录
- [ ] 验证文章系统
- [ ] 测试所有15个计算器

### 性能验证
- [ ] 运行 Lighthouse 测试
- [ ] 检查 Core Web Vitals
- [ ] 验证缓存命中率 >80%
- [ ] TTFB < 200ms
- [ ] LCP < 2.5s

### 安全验证
- [ ] HTTPS工作正常
- [ ] 安全头部配置正确
- [ ] API路由需要认证的已保护
- [ ] 敏感信息未暴露

---

## 🚨 故障排查

### 问题1: 构建失败

```bash
# 清理缓存重新构建
rm -rf .next .vercel node_modules
npm install
npm run pages:build
```

### 问题2: D1数据库连接失败

检查：
1. D1 binding 名称是否为 `DB`
2. Database ID 是否正确
3. 是否在正确的环境（production/preview）

### 问题3: 404错误

确保：
- `pages_build_output_dir` 设置正确
- 构建输出目录存在
- Next.js配置正确

### 问题4: 性能不佳

1. 检查 Cache Analytics
2. 启用所有性能优化选项
3. 减少API调用频率
4. 使用Edge Caching

---

## 📞 支持资源

- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Next.js on Pages: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- D1 Database: https://developers.cloudflare.com/d1/
- Community Forum: https://community.cloudflare.com/

---

## 🎯 下一步

1. **立即撤销暴露的API密钥**
2. 生成新的API Token（仅Pages权限）
3. 使用安全的方式部署（OAuth或环境变量）
4. 配置上述所有性能优化
5. 运行部署后验证

**预计部署时间**: 5-10分钟（首次）  
**预计性能提升**: 30-50%（启用所有优化后）
