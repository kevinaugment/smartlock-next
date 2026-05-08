import type { Metadata } from 'next'
import Link from 'next/link'
import { queryOne, query } from '@/lib/db'
import { Search, CheckCircle, XCircle, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'System Status - SLockHub.com',
  description: 'Real-time status of SLockHub.com services and database connectivity.',
  robots: 'noindex',
}

export const runtime = 'nodejs'
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
    <div className="page-bg">
      <div className="container-main section">
        <div className="max-w-4xl mx-auto">
          <div className="page-header">
            <div className="page-header__icon"><Search className="w-8 h-8" /></div>
            <h1 className="page-header__title">System Status</h1>
            <p className="page-header__subtitle">
              Real-time status of SLockHub.com services
            </p>
          </div>

          <div className="content-card">
            <div className="form-group">
              {checks.map((check, index) => (
                <div key={index} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                  <div>
                    {check.status === 'success' && <CheckCircle className="w-6 h-6" style={{ color: 'var(--color-success)' }} />}
                    {check.status === 'error' && <XCircle className="w-6 h-6" style={{ color: 'var(--color-danger)' }} />}
                    {check.status === 'unknown' && <HelpCircle className="w-6 h-6" style={{ color: 'var(--color-text-muted)' }} />}
                  </div>
                  <div className="flex-1">
                    <h3 style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{check.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-xs)' }}>{check.message}</p>
                    {check.details && (
                      <pre style={{ marginTop: 'var(--space-sm)', fontSize: '0.75rem', background: 'var(--color-bg-alt)', padding: 'var(--space-sm)', borderRadius: 'var(--radius-md)', overflow: 'auto' }}>
                        {JSON.stringify(check.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border)' }}>
              <div className="grid grid-cols-2 gap-4" style={{ fontSize: '0.875rem' }}>
                <div>
                  <span style={{ fontWeight: 600 }}>Platform:</span> Vercel Edge
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>Database:</span> Turso (LibSQL)
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>Runtime:</span> Edge Runtime
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>Timestamp:</span> {new Date().toISOString()}
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <Link href="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
