import Link from 'next/link'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { mockDb, isDevelopment } from '@/lib/mock-db'

export const runtime = 'edge'

interface Article {
  id: number
  title: string
  slug: string
  description: string
  reading_time: number
  published_at: string
}

interface Category {
  id: number
  name: string
  slug: string
  icon: string
  description: string
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  let category: Category | null = null
  let articles: Article[] = []
  let error = null

  try {
    // 本地开发使用Mock数据
    if (isDevelopment || process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
      category = await mockDb.getCategory(params.category)
      if (category) {
        const articlesResult = await mockDb.getArticlesByCategory(category.id)
        articles = articlesResult.results || []
      }
    } else {
      // 生产环境使用真实D1数据库
      const context = getRequestContext()
      const db = (context.env as any).DB

      if (db) {
        const categoryResult = await db
          .prepare('SELECT id, name, slug, icon, description FROM categories WHERE slug = ?')
          .bind(params.category)
          .first()
        category = categoryResult as Category | null

        if (category) {
          const articlesResult = await db
            .prepare(`
              SELECT id, title, slug, description, reading_time, published_at
              FROM articles
              WHERE category_id = ? AND status = 'published'
              ORDER BY published_at DESC
            `)
            .bind(category.id)
            .all()
          articles = articlesResult.results || []
        }
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load data'
    console.error('Error loading category:', e)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700">{error}</p>
          <Link
            href="/articles"
            className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Link
            href="/articles"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ← Browse All Articles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>›</span>
            <Link href="/articles" className="hover:text-blue-600">
              Articles
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
        </div>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
          <div className="mt-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
              {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No articles in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${params.category}/${article.slug}`}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500">
                      {article.reading_time} min read
                    </span>
                    <span className="text-xs text-gray-400">
                      • {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {article.description}
                  </p>

                  <div className="flex items-center text-blue-600 group-hover:translate-x-1 transition-transform text-sm font-medium">
                    Read more →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Browse All Categories
          </Link>
        </div>
      </div>
    </div>
  )
}
