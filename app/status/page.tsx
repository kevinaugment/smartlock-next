import Link from 'next/link'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

interface StatusCheck {
  name: string
  status: 'success' | 'error' | 'unknown'
  message: string
  details?: any
}

export default async function StatusPage() {
  const checks: StatusCheck[] = []
  let dbAvailable = false
  
  try {
    const { env } = getRequestContext()
    const db = (env as any).DB
    
    if (!db) {
      checks.push({
        name: 'D1 Database Binding',
        status: 'error',
        message: 'DB binding not configured',
        details: { env_keys: Object.keys(env) }
      })
    } else {
      dbAvailable = true
      checks.push({
        name: 'D1 Database Binding',
        status: 'success',
        message: 'DB binding available'
      })
      
      // Test articles count
      try {
        const articlesResult = await db.prepare('SELECT COUNT(*) as count FROM articles').first()
        checks.push({
          name: 'Articles Table',
          status: 'success',
          message: `${articlesResult.count} articles found`,
          details: articlesResult
        })
      } catch (e) {
        checks.push({
          name: 'Articles Table',
          status: 'error',
          message: e instanceof Error ? e.message : 'Query failed'
        })
      }
      
      // Test categories
      try {
        const categoriesResult = await db.prepare('SELECT id, name, slug FROM categories ORDER BY id').all()
        checks.push({
          name: 'Categories Table',
          status: 'success',
          message: `${categoriesResult.results.length} categories found`,
          details: categoriesResult.results
        })
      } catch (e) {
        checks.push({
          name: 'Categories Table',
          status: 'error',
          message: e instanceof Error ? e.message : 'Query failed'
        })
      }
    }
  } catch (e) {
    checks.push({
      name: 'System',
      status: 'error',
      message: e instanceof Error ? e.message : 'Unknown error',
      details: e instanceof Error ? e.stack : undefined
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h1 className="text-3xl font-bold">🏥 System Status</h1>
            <p className="text-blue-100 mt-2">Smart Lock Hub - Deployment Health Check</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {checks.map((check, i) => (
                <div key={i} className={`p-4 rounded-lg border-2 ${
                  check.status === 'success' ? 'border-green-200 bg-green-50' :
                  check.status === 'error' ? 'border-red-200 bg-red-50' :
                  'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {check.status === 'success' ? '✅' : check.status === 'error' ? '❌' : '❓'}
                        </span>
                        <h3 className="text-lg font-bold">{check.name}</h3>
                      </div>
                      <p className="mt-2 text-gray-700">{check.message}</p>
                      {check.details && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-700">
                            Show details
                          </summary>
                          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                            {JSON.stringify(check.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Links */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 Test Links</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/api/health" className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
              <div className="font-semibold">API Health</div>
              <div className="text-sm text-gray-600">/api/health</div>
            </Link>
            <Link href="/api/categories" className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
              <div className="font-semibold">Categories API</div>
              <div className="text-sm text-gray-600">/api/categories</div>
            </Link>
            <Link href="/articles" className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
              <div className="font-semibold">Articles List</div>
              <div className="text-sm text-gray-600">/articles</div>
            </Link>
            <Link href="/articles/protocols" className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
              <div className="font-semibold">Protocols Category</div>
              <div className="text-sm text-gray-600">/articles/protocols</div>
            </Link>
            <Link href="/calculators" className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
              <div className="font-semibold">Calculators</div>
              <div className="text-sm text-gray-600">/calculators</div>
            </Link>
            <Link href="/" className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
              <div className="font-semibold">Home Page</div>
              <div className="text-sm text-gray-600">/</div>
            </Link>
          </div>
        </div>

        {/* Environment Info */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ℹ️ Environment</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Runtime:</span>
              <span className="text-gray-700">Edge</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">DB Available:</span>
              <span className={dbAvailable ? 'text-green-600' : 'text-red-600'}>
                {dbAvailable ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Checks Passed:</span>
              <span className="text-gray-700">
                {checks.filter(c => c.status === 'success').length} / {checks.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
