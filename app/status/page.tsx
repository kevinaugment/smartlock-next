import Link from 'next/link'
import { queryOne, query } from '@/lib/db'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface StatusCheck {
  name: string
  status: 'success' | 'error' | 'unknown'
  message: string
  details?: any
}

export default async function StatusPage() {
  const checks: StatusCheck[] = []
  
  // Test database connection
  try {
    const articlesResult = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM articles')
    checks.push({
      name: 'Turso Database Connection',
      status: 'success',
      message: 'Database connected'
    })
    
    checks.push({
      name: 'Articles Table',
      status: 'success',
      message: `${articlesResult?.count || 0} articles found`,
      details: articlesResult
    })
  } catch (e) {
    checks.push({
      name: 'Turso Database Connection',
      status: 'error',
      message: e instanceof Error ? e.message : 'Connection failed'
    })
  }
  
  // Test categories
  try {
    const categories = await query('SELECT id, name, slug FROM categories ORDER BY id')
    checks.push({
      name: 'Categories Table',
      status: 'success',
      message: `${categories.length} categories found`,
      details: { count: categories.length }
    })
  } catch (e) {
    checks.push({
      name: 'Categories Table',
      status: 'error',
      message: e instanceof Error ? e.message : 'Query failed'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🔍 System Status
            </h1>
            <p className="text-lg text-gray-600">
              Real-time status of Smart Lock Hub services
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              {checks.map((check, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg border border-gray-200"
                >
                  <div className="text-2xl">
                    {check.status === 'success' && '✅'}
                    {check.status === 'error' && '❌'}
                    {check.status === 'unknown' && '❓'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{check.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{check.message}</p>
                    {check.details && (
                      <pre className="mt-2 text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                        {JSON.stringify(check.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Platform:</span> Vercel Edge
                </div>
                <div>
                  <span className="font-semibold">Database:</span> Turso (LibSQL)
                </div>
                <div>
                  <span className="font-semibold">Runtime:</span> Edge Runtime
                </div>
                <div>
                  <span className="font-semibold">Timestamp:</span> {new Date().toISOString()}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
