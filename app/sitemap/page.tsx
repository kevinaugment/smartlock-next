import Link from 'next/link'

const categories = [
  { name: 'Protocols', slug: 'protocols', icon: '📡' },
  { name: 'Security', slug: 'security', icon: '🔒' },
  { name: 'Installation', slug: 'installation', icon: '🔋' },
  { name: 'Guides', slug: 'guides', icon: '🔧' },
  { name: 'Use Cases', slug: 'use-cases', icon: '🏢' },
  { name: 'Support', slug: 'support', icon: '💡' },
  { name: 'Integration', slug: 'integration', icon: '🔗' },
]

const calculators = [
  'TCO Calculator',
  'Battery Life Calculator',
  'Protocol Selection Wizard',
  'Signal Strength Analyzer',
  'STR ROI Calculator',
  'Installation Cost Estimator',
  'Door Compatibility Checker',
  'Mesh Node Planner',
  'RF Coverage Estimator',
  'Multi-Property Fleet Planner',
  'Credential Capacity Planner',
  'Installation Time Estimator',
  'Subscription vs Purchase',
  'Offline Resilience Scorecard',
  'Emergency Backup Evaluator',
]

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Sitemap</h1>
          <p className="text-xl text-gray-600 mb-12">
            Complete overview of all pages on Smart Lock Hub
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Pages */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Main Pages</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-blue-600 hover:text-blue-700 font-medium">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Articles */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Knowledge Base</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium">
                    All Articles (49+)
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.slug}>
                    <Link href={`/articles/${cat.slug}`} className="text-blue-600 hover:text-blue-700 font-medium">
                      {cat.icon} {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calculators */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Calculators (15)</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {calculators.map((calc, i) => (
                  <div key={i} className="text-blue-600 hover:text-blue-700 font-medium">
                    • {calc}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/calculators" className="text-blue-600 hover:text-blue-700 font-semibold">
                  View All Calculators →
                </Link>
              </div>
            </div>

            {/* Admin */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Portal</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/admin/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Admin Login
                  </Link>
                </li>
                <li className="text-gray-500 text-sm">
                  (Dashboard and management pages require authentication)
                </li>
              </ul>
            </div>

            {/* API */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>
              <ul className="space-y-3">
                <li>
                  <Link href="/api/categories" className="text-blue-600 hover:text-blue-700 font-medium">
                    /api/categories
                  </Link>
                </li>
                <li>
                  <span className="text-gray-500 font-medium">/api/auth/login</span>
                  <span className="text-xs text-gray-400 ml-2">(POST only)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 rounded-xl border-2 border-blue-200 p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Can't Find What You're Looking For?</h3>
            <p className="text-gray-700 mb-4">
              Use our search or browse by category
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Articles
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
