'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                🔐 Smart Lock Hub
              </Link>
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email.split('@')[0]}!
          </h1>
          <p className="text-gray-600">
            Manage your Smart Lock Hub content and settings
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Articles</span>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">49</p>
            <p className="text-sm text-green-600 mt-1">+3 this week</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Categories</span>
              <span className="text-2xl">📁</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">7</p>
            <p className="text-sm text-gray-500 mt-1">Active</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Views Today</span>
              <span className="text-2xl">👁️</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">1,234</p>
            <p className="text-sm text-green-600 mt-1">+12% vs yesterday</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Calculators</span>
              <span className="text-2xl">🧮</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-500 mt-1">Interactive tools</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/articles"
            className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">📝</span>
              <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Articles
            </h3>
            <p className="text-sm text-gray-600">
              Create, edit, and publish articles
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">📁</span>
              <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Categories
            </h3>
            <p className="text-sm text-gray-600">
              Organize content categories
            </p>
          </Link>

          <Link
            href="/admin/calculators"
            className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">🧮</span>
              <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Calculators
            </h3>
            <p className="text-sm text-gray-600">
              Interactive tools management
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">⚙️</span>
              <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Settings
            </h3>
            <p className="text-sm text-gray-600">
              Site configuration & preferences
            </p>
          </Link>

          <Link
            href="/articles"
            className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200 hover:border-green-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">🌐</span>
              <span className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              View Site
            </h3>
            <p className="text-sm text-gray-600">
              Browse the public website
            </p>
          </Link>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
            <div className="mb-4">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Quick Tip
            </h3>
            <p className="text-sm text-gray-700">
              Use Markdown format for rich content formatting in articles.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
