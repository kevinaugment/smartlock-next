import Link from 'next/link'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { mockDb, isDevelopment } from '@/lib/mock-db'

export const runtime = 'edge'

interface Article {
  id: number
  title: string
  slug: string
  description: string
  content: string
  category_id: number
  category_name: string
  category_slug: string
  reading_time: number
  word_count: number
  published_at: string
  updated_at: string
  author_name: string
}

interface RelatedArticle {
  title: string
  slug: string
  category_slug: string
  description: string
}

export default async function ArticlePage({
  params,
}: {
  params: { category: string; slug: string }
}) {
  let article: Article | null = null
  let relatedArticles: RelatedArticle[] = []
  let error = null

  try {
    // 本地开发使用Mock数据
    if (isDevelopment || process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
      article = await mockDb.getArticle(params.slug, params.category)
      if (article) {
        const relatedResult = await mockDb.getRelatedArticles(article.category_id, article.id, 3)
        relatedArticles = relatedResult.results as RelatedArticle[]
      }
    } else {
      // 生产环境使用真实D1数据库
      const context = getRequestContext()
      const db = (context.env as any).DB

      if (db) {
        const articleResult = await db
          .prepare(`
            SELECT 
              a.id, a.title, a.slug, a.description, a.content,
              a.category_id, a.reading_time, a.word_count,
              a.published_at, a.updated_at,
              c.name as category_name, c.slug as category_slug,
              u.name as author_name
            FROM articles a
            JOIN categories c ON a.category_id = c.id
            LEFT JOIN users u ON a.author_id = u.id
            WHERE a.slug = ? AND c.slug = ? AND a.status = 'published'
            LIMIT 1
          `)
          .bind(params.slug, params.category)
          .first()

        article = articleResult as Article | null

        if (article) {
          const relatedResult = await db
            .prepare(`
              SELECT a.title, a.slug, a.description, c.slug as category_slug
              FROM articles a
              JOIN categories c ON a.category_id = c.id
              WHERE a.category_id = ? AND a.id != ? AND a.status = 'published'
              ORDER BY a.published_at DESC
              LIMIT 3
            `)
            .bind(article.category_id, article.id)
            .all()

          relatedArticles = relatedResult.results as RelatedArticle[]
        }
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load article'
    console.error('Error loading article:', e)
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

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">
            The article you're looking for doesn't exist or hasn't been published yet.
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
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>›</span>
            <Link href="/articles" className="hover:text-blue-600">
              Articles
            </Link>
            <span>›</span>
            <Link
              href={`/articles/${article.category_slug}`}
              className="hover:text-blue-600"
            >
              {article.category_name}
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{article.title}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-6">
            <Link
              href={`/articles/${article.category_slug}`}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full hover:bg-blue-200"
            >
              {article.category_name}
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">{article.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>{new Date(article.published_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>{article.reading_time} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📝</span>
              <span>{article.word_count.toLocaleString()} words</span>
            </div>
            {article.author_name && (
              <div className="flex items-center gap-2">
                <span>✍️</span>
                <span>{article.author_name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {article.content}
                </div>
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  📝 <strong>Note:</strong> Full markdown rendering coming soon. Currently displaying raw content.
                </p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((related, index) => (
                    <Link
                      key={index}
                      href={`/articles/${related.category_slug}/${related.slug}`}
                      className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {related.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <Link
              href={`/articles/${article.category_slug}`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← More in {article.category_name}
            </Link>
            <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium">
              Browse All Articles →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
