import Link from 'next/link'
import { query } from '@/lib/db'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Category {
  id: number
  name: string
  slug: string
  icon: string
  description: string
}

interface Article {
  id: number
  title: string
  slug: string
  description: string
  category_slug: string
  category_name: string
  reading_time: number
  published_at: string
}

export default async function ArticlesPage() {
  let categories: Category[] = []
  let articles: Article[] = []
  let error = null

  try {
    // Get categories
    categories = await query<Category>(
      'SELECT id, name, slug, icon, description FROM categories ORDER BY display_order'
    )

    // Get articles with category info
    articles = await query<Article>(`
      SELECT 
        a.id, a.title, a.slug, a.description, 
        c.slug as category_slug, c.name as category_name,
        a.reading_time, a.published_at
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      ORDER BY a.published_at DESC
    `)
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load data'
    console.error('Error loading articles:', e)
  }

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

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">⚠️ {error}</p>
          </div>
        )}

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/articles/${category.slug}`}
                className="group p-6 bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                <div className="mt-4 text-blue-600 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <span>→</span>
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
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.category_slug}/${article.slug}`}
                  className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {article.category_name}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <span>⏱️</span> {article.reading_time} min
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
                        {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
