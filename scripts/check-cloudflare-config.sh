#!/bin/bash

# Cloudflare Pages 配置检查脚本
# 用于诊断和修复 smartlock-next 项目的部署问题

set -e

echo "🔍 Cloudflare Pages 配置检查与诊断"
echo "====================================="
echo ""

# Cloudflare 凭证
CLOUDFLARE_EMAIL="kevinaugment@gmail.com"
CLOUDFLARE_API_KEY="4aea922f8677e6edebbe1891fecbac634071d"

# 项目信息
PROJECT_NAME="smartlock-next"
ACCOUNT_ID=""  # 需要从API获取

echo "📧 Email: $CLOUDFLARE_EMAIL"
echo "🔑 API Key: ${CLOUDFLARE_API_KEY:0:10}..."
echo ""

# 1. 获取 Account ID
echo "Step 1: 获取 Account ID..."
ACCOUNT_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/accounts" \
  -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
  -H "Content-Type: application/json")

# 检查是否成功
if echo "$ACCOUNT_RESPONSE" | grep -q '"success":true'; then
  ACCOUNT_ID=$(echo "$ACCOUNT_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "✅ Account ID: $ACCOUNT_ID"
else
  echo "❌ 无法获取 Account ID"
  echo "Response: $ACCOUNT_RESPONSE"
  exit 1
fi
echo ""

# 2. 获取 Pages 项目信息
echo "Step 2: 获取 Pages 项目信息..."
PROJECT_RESPONSE=$(curl -s -X GET \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME" \
  -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
  -H "Content-Type: application/json")

if echo "$PROJECT_RESPONSE" | grep -q '"success":true'; then
  echo "✅ 项目存在: $PROJECT_NAME"
  
  # 提取当前构建配置
  BUILD_COMMAND=$(echo "$PROJECT_RESPONSE" | grep -o '"build_command":"[^"]*"' | cut -d'"' -f4)
  OUTPUT_DIR=$(echo "$PROJECT_RESPONSE" | grep -o '"destination_dir":"[^"]*"' | cut -d'"' -f4)
  
  echo "   当前构建命令: $BUILD_COMMAND"
  echo "   当前输出目录: $OUTPUT_DIR"
else
  echo "❌ 无法获取项目信息"
  echo "Response: $PROJECT_RESPONSE"
  exit 1
fi
echo ""

# 3. 检查 D1 bindings
echo "Step 3: 检查 D1 数据库绑定..."
BINDINGS=$(echo "$PROJECT_RESPONSE" | grep -o '"d1_databases":\[.*\]' || echo "")

if [ -z "$BINDINGS" ]; then
  echo "❌ 未找到 D1 bindings"
else
  echo "✅ D1 bindings 已配置"
  echo "   $BINDINGS"
fi
echo ""

# 4. 检查构建配置
echo "Step 4: 检查构建配置..."
CORRECT_BUILD_CMD="npx @cloudflare/next-on-pages"
CORRECT_OUTPUT_DIR=".vercel/output/static"

if [ "$BUILD_COMMAND" = "$CORRECT_BUILD_CMD" ]; then
  echo "✅ 构建命令正确: $BUILD_COMMAND"
else
  echo "❌ 构建命令错误!"
  echo "   当前: $BUILD_COMMAND"
  echo "   应该: $CORRECT_BUILD_CMD"
  NEEDS_FIX=true
fi

if [ "$OUTPUT_DIR" = "$CORRECT_OUTPUT_DIR" ]; then
  echo "✅ 输出目录正确: $OUTPUT_DIR"
else
  echo "❌ 输出目录错误!"
  echo "   当前: $OUTPUT_DIR"
  echo "   应该: $CORRECT_OUTPUT_DIR"
  NEEDS_FIX=true
fi
echo ""

# 5. 获取最新部署状态
echo "Step 5: 检查最新部署状态..."
DEPLOYMENTS_RESPONSE=$(curl -s -X GET \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments" \
  -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
  -H "Content-Type: application/json")

if echo "$DEPLOYMENTS_RESPONSE" | grep -q '"success":true'; then
  LATEST_STATUS=$(echo "$DEPLOYMENTS_RESPONSE" | grep -o '"latest_stage":{"status":"[^"]*"' | cut -d'"' -f6 | head -1)
  LATEST_ENV=$(echo "$DEPLOYMENTS_RESPONSE" | grep -o '"environment":"[^"]*"' | cut -d'"' -f4 | head -1)
  
  echo "✅ 最新部署状态: $LATEST_STATUS"
  echo "   环境: $LATEST_ENV"
else
  echo "⚠️  无法获取部署状态"
fi
echo ""

# 6. 修复建议
echo "======================================"
echo "📋 诊断结果总结"
echo "======================================"
echo ""

if [ "$NEEDS_FIX" = true ]; then
  echo "❌ 发现配置问题，需要修复！"
  echo ""
  echo "🔧 修复方案:"
  echo ""
  echo "方案 1: 使用 Cloudflare Dashboard (推荐)"
  echo "  1. 访问: https://dash.cloudflare.com"
  echo "  2. 进入: Account → Pages → $PROJECT_NAME"
  echo "  3. 点击: Settings → Builds & deployments"
  echo "  4. 修改构建命令为: $CORRECT_BUILD_CMD"
  echo "  5. 修改输出目录为: $CORRECT_OUTPUT_DIR"
  echo "  6. 保存并触发新部署"
  echo ""
  echo "方案 2: 使用 API 修复 (自动)"
  echo "  运行: bash scripts/fix-cloudflare-config.sh"
  echo ""
else
  echo "✅ 配置正确，但网站仍有问题？"
  echo ""
  echo "可能的原因:"
  echo "  1. 最新构建使用了旧的配置（在修改前）"
  echo "  2. 构建缓存问题"
  echo ""
  echo "🔧 解决方案:"
  echo "  1. 在 Cloudflare Dashboard 中重新部署"
  echo "  2. 选择 'Retry deployment' 并清空缓存"
  echo ""
fi

echo "======================================"
echo "📊 配置检查完成"
echo "======================================"
