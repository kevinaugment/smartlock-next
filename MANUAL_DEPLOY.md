# 🚀 手动部署指南 - Smart Lock Hub

## 📊 当前状态

✅ **Cloudflare Pages项目已创建**
- 项目名: `smartlock-hub`
- 项目URL: https://smartlock-hub.pages.dev/
- 模式: Direct Upload（Wrangler CLI部署）
- 账号: kevinaugment@gmail.com

✅ **D1数据库已就绪**
- 数据库: `smartlock-production`
- Database ID: `a6ecde29-4a32-4085-bdd6-a390ed453eec`
- 7个分类已插入
- 14个计算器已配置

✅ **代码已推送GitHub**
- 仓库: https://github.com/kevinaugment/smartlock-next
- 包含基础页面和API

---

## 🎯 两种部署方式

### 方式一：重新创建为Git集成模式（推荐）

由于当前项目是Direct Upload模式，建议删除重建为Git集成模式，这样可以：
- ✅ 自动从GitHub部署
- ✅ 每次push自动重新部署
- ✅ 支持PR预览

#### 步骤：

1. **删除现有项目**
   ```bash
   npx wrangler pages project delete smartlock-hub
   ```

2. **通过Dashboard创建**
   - 访问: https://dash.cloudflare.com/180e1388386cdf962db357ee4c4e1d84/pages
   - 点击 **"Create application"**
   - 选择 **"Pages"** 标签
   - 点击 **"Connect to Git"**
   - 选择 **GitHub** → 选择仓库 `kevinaugment/smartlock-next`
   - 配置构建：
     ```
     Project name: smartlock-hub
     Framework: Next.js
     Build command: npx @cloudflare/next-on-pages
     Build output: .vercel/output/static
     ```
   - 环境变量：
     ```
     JWT_SECRET = smartlock-2024-secret
     NODE_VERSION = 18
     ```
   - D1绑定：
     ```
     Variable: DB
     Database: smartlock-production
     ```
   - 点击 **"Save and Deploy"**

---

### 方式二：保持Direct Upload，本地构建上传

如果想保持当前项目，需要本地构建后上传：

#### 步骤：

1. **安装依赖**（切换网络或使用淘宝镜像）
   ```bash
   cd /Users/luokun/Documents/GitHub/smartlock-next
   
   # 使用淘宝镜像
   npm install --registry=https://registry.npmmirror.com --legacy-peer-deps
   
   # 或者使用yarn
   yarn install
   ```

2. **本地构建**
   ```bash
   # 使用cloudflare/next-on-pages构建
   npx @cloudflare/next-on-pages
   ```

3. **配置D1绑定**
   
   编辑 `wrangler.toml`（已存在），确保包含：
   ```toml
   name = "smartlock-hub"
   pages_build_output_dir = ".vercel/output/static"
   
   [[d1_databases]]
   binding = "DB"
   database_name = "smartlock-production"
   database_id = "a6ecde29-4a32-4085-bdd6-a390ed453eec"
   ```

4. **部署**
   ```bash
   npx wrangler pages deploy .vercel/output/static --project-name=smartlock-hub
   ```

5. **通过Dashboard配置环境变量**
   
   访问: https://dash.cloudflare.com/180e1388386cdf962db357ee4c4e1d84/pages/view/smartlock-hub/settings/environment-variables
   
   添加：
   ```
   JWT_SECRET = smartlock-2024-secret
   ```

---

## 🎯 我的推荐

**推荐方式一（Git集成）**，因为：
- ✅ 自动化部署
- ✅ 无需本地构建
- ✅ 支持团队协作
- ✅ PR预览环境

只需要：
1. 删除现有项目：1分钟
2. 通过Dashboard重建：3分钟
3. 总计：5分钟完成

---

## 📋 快速命令参考

### 删除现有项目
```bash
npx wrangler pages project delete smartlock-hub
```

### 查看所有项目
```bash
npx wrangler pages project list
```

### 查看D1数据库
```bash
npx wrangler d1 list
```

### 测试D1连接
```bash
npx wrangler d1 execute smartlock-production --remote --command="SELECT COUNT(*) FROM categories"
```

---

## 🔗 重要链接

- **Cloudflare Dashboard**: https://dash.cloudflare.com/180e1388386cdf962db357ee4c4e1d84
- **Pages项目**: https://dash.cloudflare.com/180e1388386cdf962db357ee4c4e1d84/pages/view/smartlock-hub
- **GitHub仓库**: https://github.com/kevinaugment/smartlock-next
- **部署URL**: https://smartlock-hub.pages.dev/（部署后）

---

## ✅ 验证清单

部署成功后，验证以下功能：

- [ ] 首页可访问: `https://smartlock-hub.pages.dev/`
- [ ] 显示7个分类卡片
- [ ] API正常: `https://smartlock-hub.pages.dev/api/categories`
- [ ] 返回JSON数据
- [ ] D1连接正常

---

**需要帮助？**
- 查看构建日志
- 检查D1绑定
- 验证环境变量

祝部署顺利！ 🚀
