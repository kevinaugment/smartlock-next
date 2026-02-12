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
      <div className="page-bg flex-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 mx-auto border-b-2 border-accent mb-4"></div>
          <p className="text-color-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Total Articles', value: '49', change: '+3 this week', changeColor: 'text-success-700', icon: FileText },
    { label: 'Categories', value: '7', change: 'Active', changeColor: 'text-color-muted', icon: FolderOpen },
    { label: 'Views Today', value: '1,234', change: '+12% vs yesterday', changeColor: 'text-success-700', icon: Eye },
    { label: 'Calculators', value: '4', change: 'Interactive tools', changeColor: 'text-color-muted', icon: Calculator },
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
      <header className="bg-surface border-b border-border sticky top-0 z-10 w-full shadow-sm">
        <div className="container-main py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-color-primary flex items-center gap-2">
                <Lock className="w-6 h-6 inline" /> SLockHub.com
              </Link>
              <span className="badge badge-accent">Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-color-secondary">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="badge badge-danger cursor-pointer hover:bg-danger-100 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-main py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-color-primary mb-2">
            Welcome back, {user?.email.split('@')[0]}!
          </h1>
          <p className="text-color-secondary">
            Manage your SLockHub.com content and settings
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-color-secondary">{stat.label}</span>
                <span className="text-color-accent"><stat.icon className="w-6 h-6" /></span>
              </div>
              <p className="text-3xl font-bold text-color-primary">{stat.value}</p>
              <p className={`text-sm mt-1 ${stat.changeColor}`}>{stat.change}</p>
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
              <div className="flex items-center justify-between mb-4">
                <span className="text-color-accent"><action.icon className="w-10 h-10" /></span>
                <span className="text-color-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </div>
              <h3 className="link-card__title">{action.title}</h3>
              <p className="link-card__desc">{action.desc}</p>
            </Link>
          ))}

          <Link
            href="/articles"
            className="link-card group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-color-success"><Globe className="w-10 h-10" /></span>
              <span className="text-color-success opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h3 className="link-card__title">View Site</h3>
            <p className="link-card__desc">Browse the public website</p>
          </Link>

          <div className="callout callout-info mt-0 mb-0">
            <div className="mb-4">
              <span className="text-color-accent"><Lightbulb className="w-10 h-10" /></span>
            </div>
            <h3 className="callout-title">
              Quick Tip
            </h3>
            <p>
              Use Markdown format for rich content formatting in articles.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
