# D1 数据库绑定配置

## ⚠️ 当前问题

访问 https://smartlock-next.pages.dev/articles 返回 **500 Internal Server Error**

### 错误原因
D1 数据库绑定 (`DB`) 未在 Cloudflare Pages 中配置。

代码中使用：
```typescript
const db = (context.env as any).DB  // ← DB 未定义，导致错误
```

---

## ✅ 解决方案：配置 D1 Binding

### 步骤 1: 进入 Cloudflare Dashboard

1. 访问: https://dash.cloudflare.com/
2. 选择账号
3. 进入 **Workers & Pages**
4. 点击 **smartlock-next** 项目

### 步骤 2: 配置 D1 Binding

1. 点击 **Settings** 标签页
2. 找到 **Functions** 部分
3. 滚动到 **D1 database bindings**
4. 点击 **Add binding**

### 步骤 3: 填写绑定信息

```
Variable name: DB
D1 database: smartlock-production
Database ID: a6ecde29-4a32-4085-bdd6-a390ed453eec
```

**重要**：Variable name 必须是 `DB`（大写），与代码中的匹配。

### 步骤 4: 保存并重新部署

1. 点击 **Save** 保存配置
2. 回到 **Deployments** 标签页
3. 点击最新部署的 **...** 菜单
4. 选择 **Retry deployment** 重新部署

或者推送一个新的 commit 触发自动部署：
```bash
git commit --allow-empty -m "trigger: Redeploy after D1 binding"
git push origin main
```

---

## 📋 完整配置清单

### Environment Variables（已配置✅）
```
JWT_SECRET = smartlock-2024-production-secret-key-change-this
NODE_VERSION = 18
ENVIRONMENT = production
```

### D1 Database Bindings（需要配置⚠️）
```
Variable name: DB
D1 database: smartlock-production (a6ecde29-4a32-4085-bdd6-a390ed453eec)
```

### Compatibility Flags（已配置✅）
```
Compatibility date: 2024-01-01
Compatibility flags: nodejs_compat
```

---

## 🧪 验证步骤

配置完成后，测试以下页面：

### 1. 文章列表页
```
https://smartlock-next.pages.dev/articles
```
**应该显示**：
- 7个分类卡片
- 49篇文章列表

### 2. 分类页面
```
https://smartlock-next.pages.dev/articles/support
```
**应该显示**：
- Support 分类信息
- 38篇 Support 文章

### 3. 文章详情页
```
https://smartlock-next.pages.dev/articles/support/smart-lock-troubleshooting-guide
```
**应该显示**：
- 文章标题和元信息
- 原始 Markdown 内容
- 相关文章推荐

### 4. API 路由
```
https://smartlock-next.pages.dev/api/categories
```
**应该返回** JSON 格式的分类数据

---

## 🔧 故障排查

### 如果还是 500 错误

1. **检查 Variable name**
   - 必须是 `DB`（大写）
   - 不是 `db` 或 `database`

2. **检查数据库 ID**
   - 确认使用正确的 database ID
   - 运行: `wrangler d1 list` 查看数据库列表

3. **检查部署日志**
   - Cloudflare Pages → Deployments
   - 点击最新部署查看构建日志
   - 查找错误信息

4. **检查 D1 数据**
   ```bash
   wrangler d1 execute smartlock-production --remote \
     --command="SELECT COUNT(*) FROM articles"
   ```
   应该返回 49

### 如果数据库为空

重新运行数据迁移：
```bash
cd /Users/luokun/Documents/GitHub/smartlock-next
npm run migrate:articles:run
```

---

## 📸 配置界面截图参考

### D1 Binding 配置位置
```
Cloudflare Dashboard
  └── Workers & Pages
      └── smartlock-next
          └── Settings
              └── Functions
                  └── D1 database bindings  ← 这里
                      └── Add binding
```

### 配置表单
```
┌─────────────────────────────────────┐
│ Add D1 Database Binding             │
├─────────────────────────────────────┤
│ Variable name: DB                   │
│                                     │
│ D1 database: smartlock-production   │
│ (a6ecde29-4a32-4085-bdd6-a390ed...) │
│                                     │
│ [Cancel]  [Save]                    │
└─────────────────────────────────────┘
```

---

## 🎯 配置后的预期结果

### 成功标志
- ✅ `/articles` 显示文章列表
- ✅ `/articles/support` 显示分类文章
- ✅ `/articles/support/[slug]` 显示文章详情
- ✅ `/api/categories` 返回 JSON 数据

### 数据展示
- 49篇文章
- 7个分类
- 标签系统
- 相关文章推荐

---

## 📝 wrangler.toml 配置

项目中的 `wrangler.toml` 已配置：
```toml
[[d1_databases]]
binding = "DB"
database_name = "smartlock-production"
database_id = "a6ecde29-4a32-4085-bdd6-a390ed453eec"
```

但这个配置主要用于本地开发。**生产环境需要在 Cloudflare Dashboard 中手动配置 D1 binding。**

---

## 🚀 快速操作

### 方式一：Dashboard 配置（推荐）
1. 访问 Cloudflare Dashboard
2. Workers & Pages → smartlock-next → Settings → Functions
3. 添加 D1 database binding
4. 保存并重新部署

### 方式二：使用 Wrangler CLI
```bash
# 这个命令可能不适用于 Pages，主要用于 Workers
wrangler pages deployment create smartlock-next \
  --binding "DB=a6ecde29-4a32-4085-bdd6-a390ed453eec"
```

---

**配置完成后，所有文章功能将正常工作！** 🎉

**最后更新**: 2025-11-23 20:02
