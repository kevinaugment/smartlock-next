'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, FolderOpen, Eye, Calculator, Settings, Globe, Lightbulb, Lock } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查认证
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

  if (loading) {
    return (
      <div className="page-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 mx-auto" style={{ borderBottom: '2px solid var(--color-accent)', marginBottom: 'var(--space-md)' }}></div>
          <p style={{ color: 'var(--color-text-secondary)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Total Articles', value: '49', change: '+3 this week', changeColor: 'var(--color-success)', icon: FileText },
    { label: 'Categories', value: '7', change: 'Active', changeColor: 'var(--color-text-muted)', icon: FolderOpen },
    { label: 'Views Today', value: '1,234', change: '+12% vs yesterday', changeColor: 'var(--color-success)', icon: Eye },
    { label: 'Calculators', value: '4', change: 'Interactive tools', changeColor: 'var(--color-text-muted)', icon: Calculator },
  ]

  const quickActions = [
    { href: '/admin/articles', icon: FileText, title: 'Manage Articles', desc: 'Create, edit, and publish articles' },
    { href: '/admin/categories', icon: FolderOpen, title: 'Categories', desc: 'Organize content categories' },
    { href: '/admin/calculators', icon: Calculator, title: 'Calculators', desc: 'Interactive tools management' },
    { href: '/admin/settings', icon: Settings, title: 'Settings', desc: 'Site configuration & preferences' },
  ]

  return (
    <div>
      {/* Header */}
      <header className="content-card" style={{ borderRadius: 0, position: 'sticky', top: 0, zIndex: 10 }}>
        <div className="container mx-auto" style={{ padding: 'var(--space-md)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                <Lock className="w-6 h-6 inline" /> Smart Lock Hub
              </Link>
              <span className="badge badge-accent">Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {user?.email}
              </span>
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

      {/* Main Content */}
      <div className="container mx-auto" style={{ padding: 'var(--space-xl) var(--space-md)' }}>
        {/* Welcome */}
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
            Welcome back, {user?.email.split('@')[0]}!
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Manage your Smart Lock Hub content and settings
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" style={{ marginBottom: 'var(--space-xl)' }}>
          {stats.map(stat => (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-xs)' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{stat.label}</span>
                <span style={{ color: 'var(--color-accent)' }}><stat.icon className="w-6 h-6" /></span>
              </div>
              <p style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{stat.value}</p>
              <p style={{ fontSize: '0.875rem', color: stat.changeColor, marginTop: '2px' }}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map(action => (
            <Link
              key={action.href}
              href={action.href}
              className="link-card group"
            >
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-md)' }}>
                <span style={{ color: 'var(--color-accent)' }}><action.icon className="w-10 h-10" /></span>
                <span style={{ color: 'var(--color-accent)', opacity: 0 }} className="group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <h3 className="link-card__title">{action.title}</h3>
              <p className="link-card__desc">{action.desc}</p>
            </Link>
          ))}

          <Link
            href="/articles"
            className="link-card group"
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-md)' }}>
              <span style={{ color: 'var(--color-success)' }}><Globe className="w-10 h-10" /></span>
              <span style={{ color: 'var(--color-success)', opacity: 0 }} className="group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h3 className="link-card__title">View Site</h3>
            <p className="link-card__desc">Browse the public website</p>
          </Link>

          <div className="callout callout-info">
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <span style={{ color: 'var(--color-accent)' }}><Lightbulb className="w-10 h-10" /></span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
              Quick Tip
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Use Markdown format for rich content formatting in articles.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
