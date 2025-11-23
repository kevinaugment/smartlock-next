#!/bin/bash

# Cloudflare Pages 自动修复脚本
# 自动更新构建配置以使用正确的 @cloudflare/next-on-pages 构建命令

set -e

echo "🔧 Cloudflare Pages 自动修复"
echo "====================================="
echo ""

# Cloudflare 凭证
CLOUDFLARE_EMAIL="kevinaugment@gmail.com"
CLOUDFLARE_API_KEY="4aea922f8677e6edebbe1891fecbac634071d"

# 项目信息
PROJECT_NAME="smartlock-next"
ACCOUNT_ID=""

# 正确的配置
CORRECT_BUILD_CMD="npx @cloudflare/next-on-pages"
CORRECT_OUTPUT_DIR=".vercel/output/static"

echo "Step 1: 获取 Account ID..."
ACCOUNT_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/accounts" \
  -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
  -H "Content-Type: application/json")

if echo "$ACCOUNT_RESPONSE" | grep -q '"success":true'; then
  ACCOUNT_ID=$(echo "$ACCOUNT_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "✅ Account ID: $ACCOUNT_ID"
else
  echo "❌ 无法获取 Account ID"
  exit 1
fi
echo ""

echo "Step 2: 更新 Pages 项目构建配置..."

# 更新项目配置
UPDATE_RESPONSE=$(curl -s -X PATCH \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME" \
  -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
  -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
  -H "Content-Type: application/json" \
  --data '{
    "deployment_configs": {
      "production": {
        "build_command": "'"$CORRECT_BUILD_CMD"'",
        "destination_dir": "'"$CORRECT_OUTPUT_DIR"'",
        "compatibility_date": "2024-01-01",
        "compatibility_flags": ["nodejs_compat"],
        "d1_databases": {
          "DB": {
            "id": "a6ecde29-4a32-4085-bdd6-a390ed453eec"
          }
        }
      },
      "preview": {
        "build_command": "'"$CORRECT_BUILD_CMD"'",
        "destination_dir": "'"$CORRECT_OUTPUT_DIR"'",
        "compatibility_date": "2024-01-01",
        "compatibility_flags": ["nodejs_compat"],
        "d1_databases": {
          "DB": {
            "id": "a6ecde29-4a32-4085-bdd6-a390ed453eec"
          }
        }
      }
    }
  }')

if echo "$UPDATE_RESPONSE" | grep -q '"success":true'; then
  echo "✅ 构建配置已更新!"
  echo "   构建命令: $CORRECT_BUILD_CMD"
  echo "   输出目录: $CORRECT_OUTPUT_DIR"
else
  echo "❌ 更新配置失败"
  echo "Response: $UPDATE_RESPONSE"
  exit 1
fi
echo ""

echo "Step 3: 触发新的部署..."

# 获取最新 commit hash (从 git)
if git rev-parse --git-dir > /dev/null 2>&1; then
  COMMIT_HASH=$(git rev-parse HEAD)
  BRANCH=$(git branch --show-current)
  
  echo "   Commit: $COMMIT_HASH"
  echo "   Branch: $BRANCH"
  
  # 触发重新部署
  DEPLOY_RESPONSE=$(curl -s -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_NAME/deployments" \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -H "Content-Type: application/json" \
    --data '{
      "branch": "'"$BRANCH"'"
    }')
  
  if echo "$DEPLOY_RESPONSE" | grep -q '"success":true'; then
    DEPLOY_ID=$(echo "$DEPLOY_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "✅ 新部署已触发!"
    echo "   Deployment ID: $DEPLOY_ID"
    echo ""
    echo "📊 查看部署状态:"
    echo "   https://dash.cloudflare.com/$ACCOUNT_ID/pages/view/$PROJECT_NAME/$DEPLOY_ID"
  else
    echo "⚠️  无法触发自动部署"
    echo "   请手动在 Cloudflare Dashboard 中重新部署"
  fi
else
  echo "⚠️  不在 git 仓库中，无法自动触发部署"
  echo "   请手动在 Cloudflare Dashboard 中重新部署"
fi
echo ""

echo "======================================"
echo "✅ 修复完成!"
echo "======================================"
echo ""
echo "📋 下一步:"
echo "  1. 等待构建完成 (约2-3分钟)"
echo "  2. 测试网站:"
echo "     https://smartlockhub.pages.dev/articles"
echo "     https://smartlockhub.pages.dev/api/categories"
echo "  3. 如果仍有问题，请查看构建日志"
echo ""
echo "🔍 查看部署:"
echo "  https://dash.cloudflare.com"
echo "  → Pages → $PROJECT_NAME → Deployments"
echo ""
