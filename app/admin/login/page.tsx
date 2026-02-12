'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@smartlock.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      // 保存token到localStorage
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // 跳转到管理后台
      router.push('/admin')
    } catch (err) {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="page-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-md)' }}>
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center" style={{ marginBottom: 'var(--space-xl)' }}>
          <Link href="/" className="inline-block">
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
              SLockHub.com
            </h1>
          </Link>
          <p style={{ color: 'var(--color-text-secondary)' }}>Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="content-card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-lg)' }}>Sign In</h2>

          {error && (
            <div className="callout callout-danger" style={{ marginBottom: 'var(--space-lg)' }}>
              <p style={{ fontSize: '0.875rem' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
                placeholder="admin@smartlock.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
              style={{ padding: 'var(--space-sm) var(--space-md)' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="callout callout-info" style={{ marginTop: 'var(--space-lg)' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Demo Credentials:</p>
            <p style={{ fontSize: '0.75rem' }}>
              <strong>Email:</strong> admin@smartlock.com<br />
              <strong>Password:</strong> admin123
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center" style={{ marginTop: 'var(--space-lg)' }}>
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
