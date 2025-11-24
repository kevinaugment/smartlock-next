import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticlesByCategory, getAllArticles } from '@/lib/articles/registry';
import { CATEGORIES } from '@/lib/articles/types';

export const runtime = 'edge';

// 静态生成所有分类页面
export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to All Articles
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{category.description}</p>
            <p className="text-sm text-gray-500">{sortedArticles.length} articles</p>
          </div>

          {sortedArticles.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No articles in this category yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${params.category}/${article.slug}`}
                  className="block group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {article.isPillar && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        ⭐ Pillar
                      </span>
                    )}
                    {article.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ✨ Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{new Date(article.pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>• {article.readingTime} min read</span>
                    <span>• {article.wordCount.toLocaleString()} words</span>
                    <span className="ml-auto text-blue-600 group-hover:translate-x-1 transition-transform">
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
  )
}
