#!/bin/bash
# Deploy Lock TCO Calculator Optimization
# This script applies database migrations and verifies the deployment

set -e

echo "🚀 Deploying Lock TCO Calculator Optimization"
echo "=============================================="
echo ""

# Step 1: Apply database migrations
echo "📦 Step 1: Applying database schema extensions..."
wrangler d1 execute smartlock-production --remote --file=./database/migrations/calculator-content-system.sql
echo "✅ Schema migrations applied"
echo ""

# Step 2: Seed calculator content
echo "📝 Step 2: Seeding lock-tco calculator content..."
wrangler d1 execute smartlock-production --remote --file=./database/seeds/lock-tco-content.sql
echo "✅ Content seeded"
echo ""

# Step 3: Verify database
echo "🔍 Step 3: Verifying database tables..."
wrangler d1 execute smartlock-production --remote --command="SELECT COUNT(*) as sections FROM calculator_content_sections WHERE calculator_id = 1"
wrangler d1 execute smartlock-production --remote --command="SELECT COUNT(*) as faqs FROM calculator_faqs WHERE calculator_id = 1"
wrangler d1 execute smartlock-production --remote --command="SELECT COUNT(*) as protocols FROM calculator_protocol_data WHERE calculator_id = 1"
echo "✅ Database verified"
echo ""

# Step 4: Test API endpoint
echo "🌐 Step 4: Testing API endpoint..."
echo "Note: Run this manually after deployment:"
echo "curl https://YOUR_DOMAIN/api/calculators/lock-tco | jq"
echo ""

# Step 5: Build and deploy
echo "🏗️  Step 5: Building Next.js application..."
npm run build
echo "✅ Build complete"
echo ""

echo "📋 Deployment Checklist:"
echo "  ✅ Database migrations applied"
echo "  ✅ Content seeded"
echo "  ✅ Database verified"
echo "  ⚠️  Test API endpoint manually"
echo "  ⚠️  Deploy with: npm run pages:deploy"
echo "  ⚠️  Verify page: /calculators/lock-tco"
echo "  ⚠️  Validate Schema: https://search.google.com/test/rich-results"
echo ""

echo "🎉 Optimization deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Deploy: npm run pages:deploy"
echo "2. Test calculator page"
echo "3. Submit to Google Search Console"
echo "4. Monitor GSC for 7 days"
echo ""
