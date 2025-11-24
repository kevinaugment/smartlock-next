import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { getArticleBySlug, getArticlesByCategory, getAllArticles } from '@/lib/articles/registry';
import { CATEGORIES } from '@/lib/articles/types';
import { ArticleHeader } from '@/components/articles/ArticleHeader';
import { ArticleContent } from '@/components/articles/ArticleContent';
import { BeTechRecommendation } from '@/components/articles/BeTechRecommendation';

// 静态生成所有文章页面
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

// 动态生成SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  
  if (!article || article.category !== params.category) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  const categoryInfo = CATEGORIES[article.category];
  const baseUrl = 'https://smartlockhub.com';
  const articleUrl = `${baseUrl}/articles/${article.category}/${article.slug}`;

  return {
    title: `${article.title} | Smart Lock Hub`,
    description: article.description,
    keywords: article.keywords.join(', '),
    authors: [{ name: article.author || 'Smart Lock Hub' }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl,
      siteName: 'Smart Lock Hub',
      type: 'article',
      publishedTime: article.pubDate,
      modifiedTime: article.updatedAt || article.pubDate,
      authors: [article.author || 'Smart Lock Hub'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  // 从注册表获取文章元数据
  const article = getArticleBySlug(params.slug);
  
  // 验证文章存在且分类匹配
  if (!article || article.category !== params.category) {
    notFound();
  }

  // 读取MDX文件内容
  let content = '';
  try {
    const filePath = path.join(
      process.cwd(),
      'app/_articles',
      article.category,
      `${article.slug}.mdx`
    );
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { content: mdxContent } = matter(fileContent);
    content = mdxContent;
  } catch (error) {
    console.error(`Error reading article file: ${article.slug}`, error);
    content = 'Error loading article content.';
  }

  // 获取相关文章
  const relatedArticles = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const categoryInfo = CATEGORIES[article.category];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* 面包屑导航 */}
        <nav className="mb-6 text-sm bg-white px-4 py-3 rounded-lg border border-gray-200 inline-flex items-center gap-2">
          <Link href="/articles" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
            📚 Articles
          </Link>
          <span className="text-gray-400">›</span>
          <Link href={`/articles/${article.category}`} className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
            {categoryInfo.name}
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-700 font-medium truncate max-w-xs">{article.title}</span>
        </nav>

        {/* 文章头部 */}
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-200 mb-8">
          <ArticleHeader article={article} />
        </div>

        {/* 文章内容 */}
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100 mb-8">
          <ArticleContent content={content} />
        </div>

        {/* Be-Tech 品牌推荐 */}
        <BeTechRecommendation />

        {/* 相关文章 */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.category}/${related.slug}`}
                  className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all hover:border-blue-300"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {related.description}
                  </p>
                  <div className="mt-4 text-blue-600 text-sm font-medium">
                    Read more →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 返回链接 */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href={`/articles/${article.category}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to {categoryInfo.name}
          </Link>
        </div>
      </article>
    </div>
  );
}
