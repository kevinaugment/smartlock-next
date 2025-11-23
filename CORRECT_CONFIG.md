# ✅ Cloudflare Pages 正确配置

## 🔧 需要修改的配置

### 1. Build Configuration（必须修改）

在 Settings → Builds & deployments → Build configuration

| 配置项 | 当前值 ❌ | 正确值 ✅ |
|--------|----------|----------|
| **Build command** | `npm run build` | `npx @cloudflare/next-on-pages` |
| **Build output directory** | (未显示) | `.vercel/output/static` |
| **Root directory** | `/` | `/` ✅ 保持不变 |

**Deploy command** 和 **Version command** 是Workers相关的，Pages不需要，忽略即可。

---

### 2. Environment Variables（必须添加）

在 Settings → Environment variables → Production

点击 **"Add variable"** 添加：

```
JWT_SECRET = smartlock-2024-production-secret-key-change-this
NODE_VERSION = 18
```

如果还需要：
```
ENVIRONMENT = production
```

---

### 3. D1 Database Binding（必须配置）

在 Settings → Functions → D1 database bindings

点击 **"Add binding"**：

| 配置项 | 值 |
|--------|-----|
| **Variable name** | `DB` |
| **D1 database** | 选择 `smartlock-production` |

---

## 📋 完整修改步骤

### Step 1: 修改构建命令

1. 进入项目设置页面
2. 点击 **Settings** → **Builds & deployments**
3. 在 **Build configuration** 部分点击 **Edit configuration**
4. 修改：
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
5. 点击 **Save**

### Step 2: 添加环境变量

1. 点击 **Settings** → **Environment variables**
2. 选择 **Production** 标签
3. 点击 **Add variable**
4. 添加：
   ```
   Variable name: JWT_SECRET
   Value: smartlock-2024-production-secret-key
   ```
5. 再次点击 **Add variable**，添加：
   ```
   Variable name: NODE_VERSION
   Value: 18
   ```
6. 点击 **Save**

### Step 3: 绑定D1数据库

1. 点击 **Settings** → **Functions**
2. 滚动到 **D1 database bindings** 部分
3. 点击 **Add binding**
4. 填写：
   - **Variable name**: `DB`
   - **D1 database**: 选择 `smartlock-production`
5. 点击 **Save**

### Step 4: 触发重新部署

修改完所有配置后：

1. 进入 **Deployments** 标签
2. 点击最新部署右侧的 **...** 菜单
3. 选择 **Retry deployment**

或者直接推送新代码到GitHub触发自动部署。

---

## ⚠️ 重要说明

### Build Command 为什么要改？

**错误的** `npm run build`:
- ✗ 只运行标准的Next.js构建
- ✗ 无法在Cloudflare Workers/Pages上运行
- ✗ 不支持Edge Runtime

**正确的** `npx @cloudflare/next-on-pages`:
- ✓ 专门为Cloudflare优化
- ✓ 转换Next.js为Workers兼容格式
- ✓ 支持Edge Runtime和D1

### 为什么需要D1绑定？

API路由 `/api/categories/route.ts` 中使用了：
```typescript
const env = process.env as unknown as CloudflareEnv
const db = env.DB // 这个DB来自绑定
```

没有绑定，API会返回错误：`D1 database not available`

---

## ✅ 验证配置

修改后重新部署，检查：

1. **构建日志**应显示：
   ```
   ⚡ @cloudflare/next-on-pages CLI v.x.x.x
   ⚡ Detected Package Manager: npm (x.x.x)
   ⚡ Preparing project...
   ⚡ Project is ready
   ```

2. **API测试**应返回数据：
   ```bash
   curl https://smartlock-hub.pages.dev/api/categories
   ```
   
   应该返回：
   ```json
   {
     "success": true,
     "count": 7,
     "categories": [...]
   }
   ```

---

## 🚀 快速检查清单

修改前检查：
- [ ] Build command 已改为 `npx @cloudflare/next-on-pages`
- [ ] Build output 已设为 `.vercel/output/static`
- [ ] JWT_SECRET 环境变量已添加
- [ ] NODE_VERSION=18 已添加
- [ ] D1绑定已配置（DB → smartlock-production）
- [ ] 已触发重新部署

全部完成后，部署应该成功！ 🎉
