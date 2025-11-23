# 🚨 Critical Issue: Edge Runtime 500 Errors

## 问题描述

部署到Cloudflare Pages后，所有Edge Runtime路由都返回500错误：
- `/api/health` - 500 Internal Server Error
- `/api/ping` - 500 Internal Server Error  
- `/articles` - 500 Internal Server Error
- 静态页面（如 `/calculators/battery-life`）也超时

## 部署历史

已尝试的部署：
1. https://b513ee74.smartlock-next.pages.dev - 失败
2. https://e474334c.smartlock-next.pages.dev - 失败
3. https://703394da.smartlock-next.pages.dev - 失败
4. https://918b330f.smartlock-next.pages.dev - 失败
5. https://fa339dd2.smartlock-next.pages.dev - 失败（当前）

## 可能的原因

### 1. D1数据库绑定未配置
**最有可能的原因**

在Cloudflare Dashboard中需要手动配置D1绑定：
- Pages → smartlock-next → Settings → Functions → D1 database bindings
- Variable name: `DB`
- D1 database: `smartlock-production`

### 2. Edge Runtime 不兼容
可能是 `@cloudflare/next-on-pages` 的兼容性问题

### 3. 构建配置问题
`next-on-pages` 可能没有正确编译Edge Functions

## 立即需要的操作

### 优先级1: 配置D1数据库绑定（Dashboard）

1. 访问: https://dash.cloudflare.com/pages
2. 选择 smartlock-next 项目
3. 进入 Settings → Functions
4. 找到 "D1 database bindings"
5. 点击 "Add binding"
6. 配置：
   ```
   Variable name: DB
   D1 database: smartlock-production
   Database ID: a6ecde29-4a32-4085-bdd6-a390ed453eec
   ```
7. 保存并重新部署

### 优先级2: 查看实时日志

```bash
npx wrangler pages deployment tail --project-name=smartlock-next
```

然后访问页面以查看实际错误信息。

### 优先级3: 简化测试

创建最简单的API端点测试：

```typescript
// app/api/test/route.ts
export const runtime = 'edge'

export async function GET() {
  return new Response('OK', { status: 200 })
}
```

## 替代方案

### 方案A: 使用Wrangler绑定配置

在 `wrangler.toml` 中已配置，但可能需要使用不同的部署方式：

```bash
npx wrangler pages publish .vercel/output/static \
  --project-name=smartlock-next \
  --branch=main \
  --config=wrangler.toml
```

### 方案B: 临时禁用D1依赖

修改所有使用D1的页面，添加更好的fallback：

```typescript
try {
  const { env } = getRequestContext()
  const db = (env as any).DB
  
  if (!db) {
    console.error('DB not available')
    // 返回空数据而不是抛出错误
    return <EmptyState />
  }
} catch (error) {
  console.error('Error:', error)
  // 优雅降级
}
```

### 方案C: 使用GitHub Actions自动部署

这样可以更好地处理环境变量和绑定：

```yaml
# .github/workflows/deploy.yml
- name: Deploy to Cloudflare Pages
  uses: cloudflare/pages-action@v1
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    projectName: smartlock-next
    directory: .vercel/output/static
    wranglerVersion: '3'
```

## 调试步骤

### 1. 检查构建输出

```bash
ls -la .vercel/output/static/
ls -la .vercel/output/static/_worker.js/
```

### 2. 本地测试Edge Functions

```bash
npx wrangler pages dev .vercel/output/static
```

### 3. 检查Cloudflare Dashboard

- 查看部署日志
- 查看实时日志
- 检查D1绑定配置
- 验证环境变量

### 4. 测试数据库连接

```bash
# 直接测试D1
npx wrangler d1 execute smartlock-production --remote --command="SELECT COUNT(*) FROM articles"
```

## 当前状态

- ✅ 构建成功（本地）
- ✅ 部署成功（上传完成）
- ❌ 运行时失败（所有Edge路由500错误）
- ❓ 静态页面状态（超时，可能也受影响）

## 下一步

**立即执行:**
1. 在Cloudflare Dashboard中配置D1绑定
2. 查看实时部署日志找出具体错误
3. 尝试访问纯静态页面（如 `/about`）验证是否只是Edge函数的问题

**如果D1绑定不能解决问题:**
1. 尝试使用wrangler发布而不是deploy
2. 检查@cloudflare/next-on-pages版本兼容性
3. 考虑降级Next.js版本
4. 联系Cloudflare支持

## 相关链接

- Cloudflare Pages: https://dash.cloudflare.com/pages
- D1 Dashboard: https://dash.cloudflare.com/d1
- Next-on-Pages文档: https://github.com/cloudflare/next-on-pages
- Cloudflare Community: https://community.cloudflare.com/

---

**更新时间**: 2025-11-23 23:25
**状态**: 🔴 Critical - 需要立即修复
