#!/bin/bash

# Smart Lock Hub - 安全部署脚本
# 使用OAuth登录，避免暴露API密钥

set -e

echo "🚀 Smart Lock Hub - Cloudflare Pages 部署"
echo "=========================================="
echo ""

# 检查是否已经登录
echo "📝 检查Cloudflare认证状态..."
if ! npx wrangler whoami > /dev/null 2>&1; then
    echo "⚠️  未检测到Cloudflare登录状态"
    echo "🔐 启动OAuth登录流程..."
    echo ""
    npx wrangler login
    echo ""
fi

# 确认登录成功
if npx wrangler whoami > /dev/null 2>&1; then
    echo "✅ Cloudflare认证成功"
    echo ""
else
    echo "❌ 登录失败，请重试"
    exit 1
fi

# 构建项目
echo "🔨 构建项目..."
npm run pages:build
echo "✅ 构建完成"
echo ""

# 部署到Cloudflare Pages
echo "🚀 开始部署到Cloudflare Pages..."
npx wrangler pages deploy .vercel/output/static \
    --project-name=smartlock-next \
    --branch=main
echo ""

# 运行数据库迁移（可选）
read -p "是否运行数据库迁移? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "📊 运行数据库迁移..."
    npx wrangler d1 execute smartlock-production --remote --file=./database/schema.sql
    npx wrangler d1 execute smartlock-production --remote --file=./database/seed.sql
    echo "✅ 数据库迁移完成"
fi

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问您的网站："
echo "   生产环境: https://smartlock-next.pages.dev"
echo ""
echo "📊 查看部署详情："
echo "   Dashboard: https://dash.cloudflare.com/pages"
echo ""
