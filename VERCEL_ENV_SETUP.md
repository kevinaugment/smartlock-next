# ⚠️ Vercel环境变量配置（必须操作）

## 🚨 重要提示

Vercel **不会自动读取** `.env.local` 或 `.env.example` 文件！

环境变量必须在 **Vercel Dashboard 手动配置**。

---

## 📋 配置步骤

### 1. 登录Vercel Dashboard

访问: https://vercel.com/dashboard

### 2. 进入项目设置

找到你的项目 `smartlock-next` → 点击 **Settings** → 左侧选择 **Environment Variables**

或直接访问: https://vercel.com/你的用户名/smartlock-next/settings/environment-variables

### 3. 添加第一个环境变量

点击 **Add New** 按钮

**Variable Name:**
```
TURSO_DATABASE_URL
```

**Value:**
```
libsql://smartlock-next-vercel-icfg-40pfgxlifl73qpqv15kr7dxp.aws-us-east-1.turso.io
```

**Environment:** 
- ✅ Production
- ✅ Preview
- ✅ Development

点击 **Save**

### 4. 添加第二个环境变量

再次点击 **Add New** 按钮

**Variable Name:**
```
TURSO_AUTH_TOKEN
```

**Value:**
```
eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjM5MTM2NjUsImlkIjoiNjdlOGFjYWMtMTcyNi00ZGI1LTg1NzYtNjU2MmZjNzI5OTE3IiwicmlkIjoiMDM4OTFmZDktZjYyYy00MzZmLWI5MjYtYWU0ZTQ4MDU0ZmMyIn0.l-QGT0gbsxisDr_DUJ-DNM64xSPmJzosQese_nI8Wf_dVRyXqyiPoKE4MaCP-M7cyiYzA-Pcj4Mdf61u8CMRCA
```

**Environment:** 
- ✅ Production
- ✅ Preview
- ✅ Development

点击 **Save**

### 5. 触发重新部署

配置完环境变量后，必须重新部署：

1. 点击顶部导航栏的 **Deployments**
2. 找到最新的部署
3. 点击右侧的 **...** 菜单
4. 选择 **Redeploy**
5. ⚠️ **取消勾选** "Use existing Build Cache"
6. 点击 **Redeploy** 按钮

---

## ✅ 验证配置

部署完成后（约1-2分钟），访问：

```
https://你的域名.vercel.app/api/test-vercel
```

**正确的返回**：
```json
{
  "status": "ok",
  "runtime": "edge",
  "env": {
    "hasTursoUrl": true,    ← 必须是 true
    "hasTursoToken": true,  ← 必须是 true
    "tursoUrlPrefix": "libsql://smartlock-next-ver..."
  }
}
```

如果是 `false`，说明环境变量没有配置成功，重新检查步骤3和4。

---

## 🎯 最终测试

环境变量配置成功后，测试：

### 测试API
```bash
curl https://你的域名.vercel.app/api/categories
```

应该返回7个分类的JSON数据。

### 测试页面
访问: https://你的域名.vercel.app/articles

应该看到：
- ✅ 7个分类卡片（Protocols, Security, Installation...）
- ✅ 无 "Failed to retrieve Cloudflare" 错误
- ✅ 底部显示 "No articles yet"

---

## 📸 配置截图参考

Vercel环境变量配置界面应该是这样的：

```
Environment Variables
┌─────────────────────────────────────────────────┐
│ TURSO_DATABASE_URL                             │
│ libsql://smartlock-next-vercel-icfg...         │
│ Production ✓  Preview ✓  Development ✓         │
├─────────────────────────────────────────────────┤
│ TURSO_AUTH_TOKEN                               │
│ eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...        │
│ Production ✓  Preview ✓  Development ✓         │
└─────────────────────────────────────────────────┘
```

---

## 🔍 故障排查

### 问题：部署后仍然报错 "缺失环境变量"

**解决**：
1. 确认两个环境变量都已添加
2. 确认 **Production** 环境已勾选
3. 点击 **Redeploy** 重新部署
4. 清除浏览器缓存

### 问题：`/api/test-vercel` 返回 `hasTursoUrl: false`

**解决**：
1. 检查变量名是否拼写正确（区分大小写）
2. 检查是否选择了 Production 环境
3. 重新部署

---

**配置好后，立即推送新代码触发部署！**
