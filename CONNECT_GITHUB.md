# 🔗 连接GitHub到Cloudflare Pages

## ✅ Pages项目已创建！

- **项目名称**: smartlock-hub
- **项目URL**: https://smartlock-hub.pages.dev/
- **状态**: 等待首次部署

---

## 📋 下一步：连接GitHub（2分钟）

### 1. 访问Cloudflare Dashboard

打开浏览器，访问：
https://dash.cloudflare.com/180e1388386cdf962db357ee4c4e1d84/pages/view/smartlock-hub

### 2. 连接Git仓库

在页面中找到 **"Set up a build"** 或 **"Connect Git"** 按钮，点击它。

### 3. 选择GitHub

1. 选择 **GitHub** 作为Git提供商
2. 如果需要授权，点击 **Authorize Cloudflare**
3. 选择仓库: **kevinaugment/smartlock-next**

### 4. 配置构建设置

| 设置项 | 值 |
|--------|-----|
| **Framework preset** | Next.js |
| **Build command** | `npx @cloudflare/next-on-pages` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | `/` |

### 5. 环境变量

点击 **"Add variable"** 添加：

```
JWT_SECRET = smartlock-2024-production-secret-key-change-later
NODE_VERSION = 18
```

### 6. D1数据库绑定

在 **Bindings** 部分：

1. 点击 **"Add binding"**
2. 选择 **D1 database**
3. 配置：
   - **Variable name**: `DB`
   - **D1 database**: `smartlock-production`

### 7. 保存并部署

点击 **"Save and Deploy"**

等待2-3分钟构建完成。

---

## ✅ 验证部署

部署完成后访问：

1. **首页**: https://smartlock-hub.pages.dev/
2. **API**: https://smartlock-hub.pages.dev/api/categories

---

## 🎉 完成！

配置完成后，每次push到GitHub的`main`分支都会自动重新部署。
