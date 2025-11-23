import { getRequestContext } from '@cloudflare/next-on-pages'

interface Article {
  id: number
  title: string
  slug: string
  description: string
  category_id: number
  reading_time: number
  word_count: number
  published_at: string
}

interface Category {
  id: number
  name: string
  slug: string
}

export const runtime = 'edge'

export default async function TestArticles() {
  try {
    const { env } = getRequestContext()
    
    // 获取所有分类
    const categoriesResult = await env.DB.prepare(`
      SELECT id, name, slug FROM categories ORDER BY id
    `).all()
    
    const categories = categoriesResult.results as Category[]
    
    // 获取每个分类的文章
    const categoryArticles: { [key: string]: Article[] } = {}
    
    for (const category of categories) {
      const articlesResult = await env.DB.prepare(`
        SELECT id, title, slug, description, category_id, reading_time, word_count, published_at
        FROM articles 
        WHERE category_id = ?
        ORDER BY published_at DESC
        LIMIT 10
      `).bind(category.id).all()
      
      categoryArticles[category.slug] = articlesResult.results as Article[]
    }
    
    // 获取总统计
    const statsResult = await env.DB.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(word_count) as total_words,
        AVG(reading_time) as avg_reading_time
      FROM articles
    `).first()
    
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">📊 Article Database Test</h1>
          
          {/* Statistics */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-gray-600">Total Articles</div>
                <div className="text-3xl font-bold text-blue-600">{statsResult?.total as number}</div>
              </div>
              <div>
                <div className="text-gray-600">Total Words</div>
                <div className="text-3xl font-bold text-green-600">
                  {(statsResult?.total_words as number)?.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Avg Reading Time</div>
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(statsResult?.avg_reading_time as number)} min
                </div>
              </div>
            </div>
          </div>
          
          {/* Categories and Articles */}
          {categories.map(category => (
            <div key={category.id} className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">
                {category.name} ({categoryArticles[category.slug]?.length || 0} articles)
              </h2>
              
              {categoryArticles[category.slug]?.length > 0 ? (
                <div className="space-y-3">
                  {categoryArticles[category.slug].map(article => (
                    <div key={article.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="font-semibold text-lg">{article.title}</div>
                      <div className="text-sm text-gray-600 mb-2">{article.description}</div>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>📝 {article.word_count} words</span>
                        <span>⏱️ {article.reading_time} min read</span>
                        <span>🔗 /articles/{category.slug}/{article.slug}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic">No articles in this category</div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen bg-red-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Error</h1>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    )
  }
}
