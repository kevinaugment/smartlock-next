'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const mockCategories = [
  { id: 1, name: 'Protocols', slug: 'protocols' },
  { id: 2, name: 'Security', slug: 'security' },
  { id: 3, name: 'Installation', slug: 'installation' },
  { id: 4, name: 'Guides', slug: 'guides' },
  { id: 5, name: 'Use Cases', slug: 'use-cases' },
  { id: 6, name: 'Support', slug: 'support' },
  { id: 7, name: 'Integration', slug: 'integration' },
]

export default function ArticlesManagement() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [articles, setArticles] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/admin/login')
      return
    }

    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    router.push('/admin/login')
  }

  // 筛选文章
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || article.category_id === filterCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="page-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-spin rounded-full h-12 w-12" style={{ borderBottom: '2px solid var(--color-accent)' }}></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <header className="content-card" style={{ borderRadius: 0, position: 'sticky', top: 0, zIndex: 10 }}>
        <div className="container mx-auto" style={{ padding: 'var(--space-md)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                SLockHub.com
              </Link>
              <span className="badge badge-accent">Articles</span>
            </div>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{user?.email}</span>
              <button
                onClick={handleLogout}
                className="badge badge-danger"
                style={{ cursor: 'pointer', padding: 'var(--space-xs) var(--space-md)', fontSize: '0.875rem', fontWeight: 500 }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <Link href="/admin" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-xl)' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>Articles Management</h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>{filteredArticles.length} articles found</p>
          </div>
          <Link
            href="/admin/articles/new"
            className="btn btn-primary"
          >
            + New Article
          </Link>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Search Articles
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="form-input"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Filter by Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="form-input"
              >
                <option value="all">All Categories</option>
                {mockCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Articles Table */}
        <div className="content-card overflow-hidden" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Reading Time</th>
                <th>Published</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((article) => {
                const category = mockCategories.find(c => c.id === article.category_id)
                return (
                  <tr key={article.id}>
                    <td>
                      <div className="flex items-start gap-3">
                        {article.featured && (
                          <span style={{ color: 'var(--color-warning)', fontSize: '1.125rem' }}>★</span>
                        )}
                        <div>
                          <p style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{article.title}</p>
                          <p className="line-clamp-1" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                            {article.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-default">{category?.name}</span>
                    </td>
                    <td>
                      <span className="badge badge-success">{article.status}</span>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      {article.reading_time} min
                    </td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      {new Date(article.published_at).toLocaleDateString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/articles/${category?.slug}/${article.slug}`}
                          target="_blank"
                          style={{ padding: 'var(--space-xs) var(--space-sm)', fontSize: '0.875rem', color: 'var(--color-accent)', fontWeight: 500 }}
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="badge badge-accent"
                          style={{ cursor: 'pointer' }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => alert('Delete功能开发中')}
                          className="badge badge-danger"
                          style={{ cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filteredArticles.length === 0 && (
            <div className="text-center" style={{ padding: 'var(--space-3xl)' }}>
              <p style={{ color: 'var(--color-text-muted)' }}>No articles found</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ marginTop: 'var(--space-lg)' }}>
          <div className="card">
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Total</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{articles.length}</p>
          </div>
          <div className="card">
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Published</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>
              {articles.filter(a => a.status === 'published').length}
            </p>
          </div>
          <div className="card">
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Featured</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-warning)' }}>
              {articles.filter(a => a.featured).length}
            </p>
          </div>
          <div className="card">
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>Total Words</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {articles.reduce((sum, a) => sum + a.word_count, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
