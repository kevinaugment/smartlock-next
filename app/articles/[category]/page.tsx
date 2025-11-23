import Link from 'next/link'
import { query, queryOne } from '@/lib/db'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
    category = await queryOne<Category>(
      'SELECT id, name, slug, icon, description FROM categories WHERE slug = ?',
      [params.category]
    )

    if (category) {
      articles = await query<Article>(
        `SELECT id, title, slug, description, reading_time, published_at
         FROM articles
         WHERE category_id = ?
         ORDER BY published_at DESC`,
        [category.id]
      )
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load data'
    console.error('Category page error:', e)
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link href="/articles" className="text-blue-600 hover:text-blue-700">
            ← Back to Articles
          </Link>
        </div>
      </div>
    )
  }

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
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-xl text-gray-600">{category.description}</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-600">⚠️ {error}</p>
            </div>
          )}

          {articles.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No articles in this category yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${params.category}/${article.slug}`}
                  className="block group bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{new Date(article.published_at).toLocaleDateString()}</span>
                    <span>• {article.reading_time} min read</span>
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
