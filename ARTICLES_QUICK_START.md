# 文章系统快速上手指南

## 🎯 核心要点

✅ **49篇文章已还原**，分为6个主分类  
✅ **无support目录**，文章按主题自然分类  
✅ **URL结构**: `/articles/{category}/{slug}`  
✅ **硬编码MDX**，无需数据库，静态生成  
✅ **Be-Tech品牌**已集成到每篇文章  

## 📁 目录结构

```
app/
├── _articles/              # 文章MDX文件（硬编码）
│   ├── guides/            # 19篇 - 综合指南
│   ├── installation/      # 10篇 - 安装维护
│   ├── protocols/         # 7篇 - 协议网络
│   ├── security/          # 5篇 - 安全实践
│   ├── integration/       # 4篇 - 集成自动化
│   └── use-cases/         # 4篇 - 应用场景
└── articles/
    ├── page.tsx                    # 文章列表
    ├── [category]/page.tsx         # 分类页面
    └── [category]/[slug]/page.tsx  # 文章详情

lib/articles/
├── types.ts           # 类型定义
└── registry.ts        # 文章注册表（自动生成）

components/articles/
├── ArticleContent.tsx           # MDX渲染
├── ArticleHeader.tsx            # 文章头部
└── BeTechRecommendation.tsx     # Be-Tech推荐
```

## 🚀 添加新文章

### 方式1: 手动添加（推荐用于少量文章）

1. 在 `app/_articles/{category}/` 创建 `new-article.mdx`
2. 添加frontmatter:

```mdx
---
title: "文章标题"
description: "文章描述"
category: guides
pubDate: 2024-11-24
wordCount: 2000
readingTime: 8
keywords:
  - "关键词1"
  - "关键词2"
tags:
  - "标签1"
  - "标签2"
isPillar: false
isSupport: false
featured: false
---

## 文章内容

这里是文章内容...
```

3. 在 `lib/articles/registry.ts` 添加元数据:

```typescript
'new-article': {
  slug: 'new-article',
  title: "文章标题",
  description: "文章描述",
  category: 'guides',
  pubDate: '2024-11-24',
  wordCount: 2000,
  readingTime: 8,
  keywords: ["关键词1", "关键词2"],
  tags: ["标签1", "标签2"],
  isPillar: false,
  isSupport: false,
  featured: false,
},
```

### 方式2: 使用脚本（推荐用于批量导入）

如果有新的MDX文件在smartlockold目录：

```bash
npx tsx scripts/hardcode-articles.ts
```

这会：
- 扫描smartlockold/src/content/articles/
- 自动重新分类
- 复制到app/_articles/
- 重新生成registry.ts

## 📝 文章分类规则

| 内容类型 | 归入分类 | 示例 |
|---------|---------|------|
| 操作指南、故障排查 | guides | how-to-add-user-code |
| 安装步骤、维护保养 | installation | install-smart-lock-step-by-step |
| 连接问题、网络协议 | protocols | smart-lock-keeps-going-offline |
| 安全实践、风险防范 | security | secure-smart-lock-best-practices |
| 系统集成、自动化 | integration | set-up-lock-automations |
| 应用场景、策略 | use-cases | smart-locks-airbnb-complete-guide |

## 🔧 本地开发

```bash
# 开发模式
npm run dev

# 访问文章
http://localhost:3000/articles
http://localhost:3000/articles/guides
http://localhost:3000/articles/guides/how-to-add-user-code
```

## 🏗️ 构建部署

```bash
# 构建（静态生成所有文章页面）
npm run build

# 启动生产服务器
npm start

# 部署到Cloudflare Pages
npm run pages:deploy
```

##⚙️ 配置文件

### `lib/articles/types.ts`
定义分类和类型：

```typescript
export const CATEGORIES: Record<string, CategoryInfo> = {
  guides: {
    name: 'Guides',
    slug: 'guides',
    description: 'Comprehensive guides and tutorials',
    count: 19,
  },
  // ... 其他分类
};
```

### `lib/articles/registry.ts`
文章元数据注册表（自动生成）

### `next.config.mjs`
Next.js配置，已排除smartlockold目录

### `tsconfig.json`
TypeScript配置，已排除smartlockold目录

## 🎨 自定义样式

### 修改文章渲染样式
编辑 `components/articles/ArticleContent.tsx`

### 修改文章头部
编辑 `components/articles/ArticleHeader.tsx`

### 修改Be-Tech推荐卡片
编辑 `components/articles/BeTechRecommendation.tsx`

## 🔍 SEO优化

每篇文章自动包含：
- ✅ 标题、描述meta标签
- ✅ 关键词优化
- ✅ 结构化HTML
- ✅ 面包屑导航
- ✅ 响应式设计

待添加（可选）：
- [ ] sitemap.xml生成
- [ ] JSON-LD结构化数据
- [ ] Open Graph标签
- [ ] Twitter Card标签

## 📊 统计数据

```typescript
import { 
  getAllArticles, 
  getFeaturedArticles,
  getPillarArticles,
  getCategoryStats 
} from '@/lib/articles/registry';

const allArticles = getAllArticles();        // 49篇
const featured = getFeaturedArticles();      // 特色文章
const pillars = getPillarArticles();         // 支柱文章
const stats = getCategoryStats();            // 分类统计
```

## 🐛 常见问题

### Q: 文章404找不到
**A**: 检查以下几点：
1. MDX文件是否在正确的分类目录
2. registry.ts是否包含该文章
3. slug是否与文件名一致
4. 分类名称是否匹配

### Q: 如何删除文章
**A**:
1. 删除 `app/_articles/{category}/{slug}.mdx`
2. 从 `lib/articles/registry.ts` 移除对应项
3. 重新构建

### Q: 如何更新文章内容
**A**:
1. 直接编辑 `app/_articles/{category}/{slug}.mdx`
2. 无需修改registry.ts（除非元数据变更）
3. 重新构建和部署

### Q: 如何重新导入所有文章
**A**:
```bash
# 删除现有文章
rm -rf app/_articles

# 重新运行迁移脚本
npx tsx scripts/hardcode-articles.ts
```

## 📚 相关文档

- [完整实施报告](./ARTICLE_RESTORATION_COMPLETE.md)
- [迁移计划](./ARTICLE_RESTORATION_PLAN.md)
- [Next.js文档](https://nextjs.org/docs)
- [MDX文档](https://mdxjs.com/)

## 🎯 下一步

1. **测试构建**: `npm run build`
2. **本地预览**: `npm start`
3. **部署上线**: `npm run pages:deploy`
4. **验证访问**: 检查所有文章链接
5. **SEO优化**: 添加sitemap和结构化数据

---

**维护者**: 开发团队  
**最后更新**: 2024-11-24
