import Link from 'next/link';
import { getAllArticles, getFeaturedArticles } from '@/lib/articles/registry';
import { CATEGORIES } from '@/lib/articles/types';

export const runtime = 'edge';

export default function ArticlesPage() {
  const articles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const categories = Object.values(CATEGORIES);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            📚 Knowledge Base
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive guides, tutorials, and documentation for smart lock systems
          </p>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/articles/${category.slug}`}
                className="group p-6 bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.count} articles</span>
                  <span className="text-blue-600 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <span className="text-sm text-gray-500">{articles.length} articles</span>
          </div>
          {articles.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
              <p className="text-gray-600 text-lg mb-2">📚 No articles yet</p>
              <p className="text-gray-500 text-sm">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(0, 9).map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.category}/${article.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {CATEGORIES[article.category].name}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <span>⏱️</span> {article.readingTime} min
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <span>📅</span>
                        {new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="text-blue-600 font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                        Read more <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
