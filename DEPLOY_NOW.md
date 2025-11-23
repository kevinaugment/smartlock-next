# 🚀 立即部署到Cloudflare Pages

## ✅ 准备就绪

- ✅ GitHub仓库: https://github.com/kevinaugment/smartlock-next
- ✅ D1数据库: smartlock-production (a6ecde29-4a32-4085-bdd6-a390ed453eec)
- ✅ 代码已推送: 包含基础页面和API
- ✅ 数据库已初始化: 7个分类，14个计算器配置

---

## 📋 部署步骤（5分钟）

### 1. 登录Cloudflare Dashboard

访问: https://dash.cloudflare.com  
邮箱: `kevinaugment@gmail.com`

### 2. 创建Pages项目

1. 点击左侧菜单 **Workers & Pages**
2. 点击 **Create application**
3. 选择 **Pages** 标签
4. 点击 **Connect to Git**

### 3. 连接GitHub仓库

1. 选择 **GitHub** 作为Git提供商
2. 授权Cloudflare访问GitHub（如果需要）
3. 选择仓库: `kevinaugment/smartlock-next`
4. 点击 **Begin setup**

### 4. 配置构建设置

填写以下信息：

**Project name**: `smartlock-hub`  
**Production branch**: `main`  
**Framework preset**: `Next.js`（如果没有自动检测，手动选择）

**Build settings**:
```
Build command: npx @cloudflare/next-on-pages
Build output directory: .vercel/output/static
Root directory: /
Node version: 18
```

### 5. 设置环境变量

点击 **Add variable** 添加环境变量：

| Variable name | Value |
|--------------|-------|
| `JWT_SECRET` | `smartlock-2024-production-secret-key-change-in-prod` |
| `ENVIRONMENT` | `production` |

### 6. 绑定D1数据库

在 **Functions** 部分：

1. 展开 **Bindings** 部分
2. 点击 **Add binding**
3. 选择 **D1 database**
4. 填写:
   - **Variable name**: `DB`
   - **D1 database**: 选择 `smartlock-production`

### 7. 保存并部署

1. 点击 **Save and Deploy**
2. 等待构建完成（约2-3分钟）
3. 构建成功后会显示部署URL

---

## ✅ 验证部署

### 访问网站

部署成功后，访问以下URL测试：

1. **首页**: `https://smartlock-hub.pages.dev/`
   - 应该看到 "Smart Lock Hub" 标题
   - 显示7个分类卡片
   - 状态显示 "System Online - Next.js + D1"

2. **API测试**: `https://smartlock-hub.pages.dev/api/categories`
   - 应该返回JSON格式的7个分类
   - 包含 Protocols, Security, Installation 等

### 预期输出

**首页** 应显示：
- ✅ Smart Lock Hub 大标题
- ✅ 7个分类卡片（📡 Protocols, 🔒 Security 等）
- ✅ "System Online" 绿色徽章
- ✅ Quick Access按钮

**API `/api/categories`** 应返回：
```json
{
  "success": true,
  "count": 7,
  "categories": [
    {
      "id": 1,
      "name": "Protocols",
      "slug": "protocols",
      "icon": "📡",
      "color": "#0ea5e9",
      ...
    },
    ...
  ]
}
```

---

## 🔧 如果构建失败

### 常见问题

#### 问题1: "Module not found"

**解决**: 在 **Settings → Environment variables** 中添加：
```
NODE_VERSION = 18
```

#### 问题2: "D1 database not available"

**解决**: 确保在 **Functions → Bindings** 中绑定了D1：
- Variable name 必须是 `DB`（大写）
- Database 选择 `smartlock-production`

#### 问题3: "Build command not found"

**解决**: 修改构建命令为：
```
npm install && npx @cloudflare/next-on-pages
```

---

## 🎯 部署后操作

### 1. 绑定自定义域名（可选）

在Pages项目中：
1. **Custom domains** → **Add domain**
2. 输入域名
3. 按照说明配置DNS

### 2. 检查部署日志

在Pages项目中：
1. **Deployments** 查看部署历史
2. 点击最新部署查看构建日志
3. 确认没有错误或警告

### 3. 设置自动部署

默认已启用：
- ✅ 每次push到`main`分支自动部署
- ✅ Preview部署：PR会创建预览环境

---

## 📊 部署信息

| 项目 | 信息 |
|------|------|
| **GitHub仓库** | https://github.com/kevinaugment/smartlock-next |
| **项目名称** | smartlock-hub |
| **生产URL** | https://smartlock-hub.pages.dev |
| **D1数据库** | smartlock-production |
| **数据库ID** | a6ecde29-4a32-4085-bdd6-a390ed453eec |
| **Framework** | Next.js 14 + D1 |

---

## 🎉 完成！

部署成功后：
- ✅ 网站可通过 `https://smartlock-hub.pages.dev` 访问
- ✅ API可通过 `/api/*` 访问
- ✅ D1数据库已连接
- ✅ 每次Git push自动重新部署

**下一步**:
- 开始开发剩余功能（管理后台、文章页等）
- 迁移旧数据到D1
- 添加自定义域名

---

**预计部署时间**: 5-10分钟  
**状态**: 随时可以部署 🚀
