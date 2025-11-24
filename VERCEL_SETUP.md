# 🚀 Vercel部署检查清单

## ✅ 代码已推送到GitHub

最新提交:
- `8b2f7fb` - fix: complete Turso migration
- `88f9e4c` - feat: migrate from Cloudflare D1 to Vercel + Turso

## 📋 Vercel配置步骤

### 1. 登录Vercel Dashboard
访问: https://vercel.com/dashboard

### 2. 导入项目（如果还没导入）
1. 点击 "Add New..." → "Project"
2. 选择 GitHub 仓库: `smartlock-next`
3. 点击 "Import"

### 3. 配置环境变量 ⚠️ **关键步骤**

进入: https://vercel.com/你的用户名/smartlock-next/settings/environment-variables

添加以下2个变量:

**TURSO_DATABASE_URL**
```
libsql://smartlock-next-vercel-icfg-40pfgxlifl73qpqv15kr7dxp.aws-us-east-1.turso.io
```

**TURSO_AUTH_TOKEN**
```
eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjM5MTM2NjUsImlkIjoiNjdlOGFjYWMtMTcyNi00ZGI1LTg1NzYtNjU2MmZjNzI5OTE3IiwicmlkIjoiMDM4OTFmZDktZjYyYy00MzZmLWI5MjYtYWU0ZTQ4MDU0ZmMyIn0.l-QGT0gbsxisDr_DUJ-DNM64xSPmJzosQese_nI8Wf_dVRyXqyiPoKE4MaCP-M7cyiYzA-Pcj4Mdf61u8CMRCA
```

**重要**: 确保这两个变量都勾选:
- ✅ Production
- ✅ Preview
- ✅ Development

### 4. 触发重新部署

如果环境变量是新添加的，需要重新部署:

1. 进入: https://vercel.com/你的用户名/smartlock-next
2. 点击 "Deployments" 标签
3. 找到最新的部署
4. 点击右侧 "..." → "Redeploy"

### 5. 等待部署完成

大约需要 1-2 分钟。完成后会看到绿色的 "Ready" 状态。

### 6. 测试验证

访问你的Vercel域名测试:

```bash
# 测试API - 应该返回7个分类
curl https://你的域名.vercel.app/api/categories

# 测试页面
open https://你的域名.vercel.app/articles
```

预期结果:
- ✅ 显示 7 个分类卡片
- ✅ 没有 Cloudflare 错误
- ✅ 页面底部显示 "No articles yet"（因为还没导入文章数据）

---

## 🔍 故障排查

### 问题1: 仍然显示 "Failed to retrieve Cloudflare request context"

**原因**: Vercel缓存了旧版本

**解决**:
1. 在Vercel Dashboard点击 "Redeploy"
2. 勾选 "Use existing Build Cache" 为 **OFF**
3. 点击 "Redeploy"

### 问题2: API返回500错误

**原因**: 环境变量未配置

**解决**:
1. 检查环境变量是否正确设置
2. 确保 Production 环境已勾选
3. 重新部署

### 问题3: 数据库连接失败

**原因**: Turso token错误

**解决**:
1. 复制完整的token（不要漏掉任何字符）
2. 重新部署

---

## 📊 本地验证（已通过）

本地环境测试结果:
- ✅ `/api/categories` - 返回7个分类
- ✅ `/articles` - 正常显示分类卡片
- ✅ 无 Cloudflare 错误
- ✅ Turso数据库连接正常

---

## 🎯 下一步

1. **必须**: 配置Vercel环境变量
2. **必须**: 触发重新部署
3. **可选**: 导入文章数据到Turso

**配置好环境变量后，网站就能正常运行了！**
