export const runtime = 'edge'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">
              Smart Lock Hub v2.0
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete guides for protocols, security, installation, and troubleshooting
            </p>
            <p className="text-sm text-red-600 font-bold">
              BUILD ID: {new Date().toISOString()}
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
          <div className="mt-16 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Quick Access</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/api/categories" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View API: Categories
              </a>
              <a href="/admin/login" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                Admin Login
              </a>
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
