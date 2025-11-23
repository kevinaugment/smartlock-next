#!/bin/bash
# Smart Lock Hub - 一键安装脚本

echo "🚀 Smart Lock Hub - 快速启动"
echo "================================"
echo ""

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js未安装，请先安装Node.js"
    exit 1
fi

echo "✅ Node.js版本: $(node -v)"
echo ""

# 安装依赖
echo "📦 安装npm依赖..."
npm install

echo ""
echo "✅ 依赖安装完成"
echo ""

# 创建环境变量文件
if [ ! -f ".dev.vars" ]; then
    echo "📝 创建环境变量文件..."
    cat > .dev.vars << EOF
# JWT密钥（请修改为随机字符串，至少32位）
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-long-change-this

# 环境
ENVIRONMENT=development
EOF
    echo "✅ .dev.vars 文件已创建"
    echo "⚠️  请编辑 .dev.vars 修改JWT_SECRET"
else
    echo "✅ .dev.vars 已存在"
fi

echo ""
echo "================================"
echo "✅ 设置完成！"
echo ""
echo "📋 下一步操作："
echo ""
echo "1. 初始化数据库（首次运行）："
echo "   npm run db:migrate"
echo "   npm run db:seed"
echo ""
echo "2. 迁移旧数据（可选）："
echo "   npm install -D gray-matter tsx"
echo "   npx tsx database/migrate-from-astro.ts"
echo ""
echo "3. 启动开发服务器："
echo "   npm run dev"
echo ""
echo "4. 访问："
echo "   http://localhost:3000"
echo ""
echo "5. 管理后台："
echo "   http://localhost:3000/admin/login"
echo "   账号: admin@smartlock.com"
echo "   密码: admin123"
echo ""
echo "================================"
