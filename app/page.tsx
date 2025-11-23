import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">
              Smart Lock Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete guides for protocols, security, installation, and troubleshooting
            </p>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            System Online - Next.js + D1
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {categories.map((category) => (
              <div 
                key={category.slug}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Access</h2>
            <div className="flex flex-col gap-4">
              <Link
                href="/articles"
                className="block px-6 py-4 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all text-center"
              >
                <span className="font-semibold">📚 Browse Knowledge Base</span>
              </Link>
              <Link
                href="/api/categories"
                className="block px-6 py-4 bg-white rounded-lg shadow-sm border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all text-center"
              >
                <span className="text-blue-600 font-semibold">View API: Categories</span>
              </Link>
              <Link
                href="/admin/login"
                className="block px-6 py-4 bg-white rounded-lg shadow-sm border-2 border-gray-200 hover:border-gray-400 hover:shadow-md transition-all text-center"
              >
                <span className="text-gray-700 font-semibold">Admin Login</span>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-sm text-gray-500">
            <p>Powered by Next.js 14 + Cloudflare D1</p>
            <p className="mt-2">
              🗄️ Database: <span className="font-mono">smartlock-production</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

const categories = [
  { name: 'Protocols', slug: 'protocols', icon: '📡', description: 'Z-Wave, Zigbee, Matter protocols' },
  { name: 'Security', slug: 'security', icon: '🔒', description: 'Security analysis & best practices' },
  { name: 'Installation', slug: 'installation', icon: '🔋', description: 'Battery & installation guides' },
  { name: 'Guides', slug: 'guides', icon: '🔧', description: 'Troubleshooting & problem solving' },
  { name: 'Use Cases', slug: 'use-cases', icon: '🏢', description: 'Real-world applications' },
  { name: 'Support', slug: 'support', icon: '💡', description: 'Quick support & how-to' },
  { name: 'Integration', slug: 'integration', icon: '🔗', description: 'System integration & APIs' },
]
