import Link from 'next/link'
import { query, queryOne } from '@/lib/db'
import { renderMarkdown } from '@/lib/markdown'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
    article = await queryOne<Article>(
      `SELECT 
        a.id, a.title, a.slug, a.description, a.content,
        a.category_id, c.name as category_name, c.slug as category_slug,
        a.reading_time, a.word_count, a.published_at, a.updated_at,
        a.author_name
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       WHERE c.slug = ? AND a.slug = ?`,
      [params.category, params.slug]
    )

    if (article) {
      relatedArticles = await query<RelatedArticle>(
        `SELECT a.title, a.slug, c.slug as category_slug, a.description
         FROM articles a
         JOIN categories c ON a.category_id = c.id
         WHERE a.category_id = ? AND a.id != ?
         LIMIT 3`,
        [article.category_id, article.id]
      )
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load article'
    console.error('Article page error:', e)
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link href="/articles" className="text-blue-600 hover:text-blue-700">
            ← Back to Articles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/articles" className="text-blue-600 hover:text-blue-700">
            Articles
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href={`/articles/${article.category_slug}`} className="text-blue-600 hover:text-blue-700">
            {article.category_name}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{article.title}</span>
        </nav>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">⚠️ {error}</p>
          </div>
        )}

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-4">
            <Link
              href={`/articles/${article.category_slug}`}
              className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {article.category_name}
            </Link>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {article.description}
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>By {article.author_name}</span>
            <span>•</span>
            <span>{new Date(article.published_at).toLocaleDateString()}</span>
            <span>•</span>
            <span>{article.reading_time} min read</span>
            <span>•</span>
            <span>{article.word_count} words</span>
          </div>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
        />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/articles/${related.category_slug}/${related.slug}`}
                  className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href={`/articles/${article.category_slug}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to {article.category_name}
          </Link>
        </div>
      </article>
    </div>
  )
}
