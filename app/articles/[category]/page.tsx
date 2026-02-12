import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticlesByCategory, getAllArticles } from '@/lib/articles/registry';
import { CATEGORIES } from '@/lib/articles/types';

export const runtime = 'edge';

// 静态生成所有分类页面
export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
}

// 动态生成分类页 SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const categoryInfo = CATEGORIES[params.category];
  if (!categoryInfo) {
    return { title: 'Category Not Found' };
  }
  return {
    title: `${categoryInfo.name} - SLockHub.com`,
    description: categoryInfo.description,
    alternates: { canonical: `/articles/${params.category}` },
    openGraph: {
      title: `${categoryInfo.name} - SLockHub.com`,
      description: categoryInfo.description,
      siteName: 'SLockHub.com',
      type: 'website',
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = CATEGORIES[params.category];

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(params.category);

  // 按发布日期排序（最新的在前）
  const sortedArticles = [...articles].sort((a, b) =>
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} - SLockHub.com`,
    description: category.description,
    url: `https://www.slockhub.com/articles/${params.category}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: sortedArticles.length,
      itemListElement: sortedArticles.map((article, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: article.title,
        url: `https://www.slockhub.com/articles/${params.category}/${article.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="page-bg">
        <div className="container-main section">
          <div className="max-w-4xl mx-auto">
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <Link href="/articles" className="back-link">
                ← Back to All Articles
              </Link>
            </div>

            <div className="page-header">
              <h1 className="page-header__title">{category.name}</h1>
              <p className="page-header__subtitle">{category.description}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{sortedArticles.length} articles</p>
            </div>

            {sortedArticles.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>No articles in this category yet.</p>
              </div>
            ) : (
              <div className="form-group">
                {sortedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${params.category}/${article.slug}`}
                    className="link-card group"
                  >
                    <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-sm)' }}>
                      {article.isPillar && (
                        <span className="badge badge-featured">Pillar</span>
                      )}
                      {article.featured && (
                        <span className="badge badge-accent">Featured</span>
                      )}
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }} className="group-hover:text-[var(--color-accent)] transition-colors">
                      {article.title}
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }} className="line-clamp-2">{article.description}</p>
                    <div className="flex items-center gap-4" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      <span>{new Date(article.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>• {article.readingTime} min read</span>
                      <span>• {article.wordCount.toLocaleString()} words</span>
                      <span className="ml-auto group-hover:translate-x-1 transition-transform" style={{ color: 'var(--color-accent)' }}>
                        Read more →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
