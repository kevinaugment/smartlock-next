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
import { ReadingProgress } from '@/components/articles/ReadingProgress';

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
  const baseUrl = 'https://www.slockhub.com';
  const articleUrl = `${baseUrl}/articles/${article.category}/${article.slug}`;

  return {
    title: `${article.title} | SLockHub.com`,
    description: article.description,
    keywords: article.keywords.join(', '),
    authors: [{ name: article.author || 'SLockHub.com' }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl,
      siteName: 'SLockHub.com',
      type: 'article',
      publishedTime: article.pubDate,
      modifiedTime: article.updatedAt || article.pubDate,
      authors: [article.author || 'SLockHub.com'],
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
    <div className="page-bg">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: article.title,
              description: article.description,
              datePublished: article.pubDate,
              dateModified: article.updatedAt || article.pubDate,
              author: {
                '@type': 'Organization',
                name: 'SLockHub.com',
                url: 'https://www.slockhub.com',
              },
              publisher: {
                '@type': 'Organization',
                name: 'SLockHub.com',
                url: 'https://www.slockhub.com',
              },
              mainEntityOfPage: `https://www.slockhub.com/articles/${article.category}/${article.slug}`,
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Articles', item: 'https://www.slockhub.com/articles' },
                { '@type': 'ListItem', position: 2, name: categoryInfo.name, item: `https://www.slockhub.com/articles/${article.category}` },
                { '@type': 'ListItem', position: 3, name: article.title },
              ],
            },
          ]),
        }}
      />
      <article className="container-main" style={{ padding: 'var(--space-xl) var(--space-md)', maxWidth: '56rem', margin: '0 auto' }}>
        {/* 面包屑导航 */}
        <nav className="breadcrumb" style={{ marginBottom: 'var(--space-lg)' }}>
          <Link href="/articles" className="">
            Articles
          </Link>
          <span className="breadcrumb__separator">›</span>
          <Link href={`/articles/${article.category}`} className="">
            {categoryInfo.name}
          </Link>
          <span className="breadcrumb__separator">›</span>
          <span className="breadcrumb__current">{article.title}</span>
        </nav>

        {/* 文章头部 */}
        <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
          <ArticleHeader article={article} />
        </div>

        {/* 文章内容 */}
        <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
          <ArticleContent content={content} />
        </div>

        {/* Be-Tech 品牌推荐 */}
        <BeTechRecommendation />

        {/* 相关文章 */}
        {relatedArticles.length > 0 && (
          <section style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-3xl)', borderTop: '1px solid var(--color-border)' }}>
            <h2 className="section-title">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.category}/${related.slug}`}
                  className="link-card"
                >
                  <h3 className="link-card__title line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="link-card__desc line-clamp-3">
                    {related.description}
                  </p>
                  <div style={{ marginTop: 'var(--space-md)', color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 500 }}>
                    Read more →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 返回链接 */}
        <div style={{ marginTop: 'var(--space-3xl)', paddingTop: 'var(--space-xl)', borderTop: '1px solid var(--color-border)' }}>
          <Link href={`/articles/${article.category}`} className="back-link">
            ← Back to {categoryInfo.name}
          </Link>
        </div>
      </article>
    </div>
  );
}
