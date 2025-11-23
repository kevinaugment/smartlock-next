import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Complete Smart Lock Resource
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10">
              Expert guides, powerful calculators, and comprehensive documentation for smart lock systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                📚 Browse Knowledge Base
              </Link>
              <Link
                href="/calculators"
                className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors shadow-lg"
              >
                🧮 Try Calculators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">49+</div>
              <div className="text-gray-600">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">7</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
              <div className="text-gray-600">Calculators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need with our organized knowledge base
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/articles/${category.slug}`}
                className="group p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-400"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Interactive Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant answers with our specialized tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {calculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-400"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{calc.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-sm text-gray-600">{calc.description}</p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Calculators
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Smart Lock Hub?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Guides</h3>
              <p className="text-gray-600">In-depth articles covering every aspect of smart lock systems</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Practical Tools</h3>
              <p className="text-gray-600">Interactive calculators for real-world decisions</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Powered by Next.js 14 and Cloudflare's global network</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our knowledge base or try our calculators now
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="px-8 py-4 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Browse Articles
            </Link>
            <Link
              href="/calculators"
              className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-white/20"
            >
              Try Calculators
            </Link>
          </div>
        </div>
      </section>
    </div>
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

const calculators = [
  { name: 'TCO Calculator', slug: 'lock-tco', icon: '💰', description: 'Calculate total cost of ownership over multiple years' },
  { name: 'Battery Life Calculator', slug: 'battery-life', icon: '🔋', description: 'Estimate how long your smart lock batteries will last' },
  { name: 'Protocol Selection Wizard', slug: 'protocol-wizard', icon: '🧙‍♂️', description: 'Get personalized protocol recommendations' },
  { name: 'Signal Strength Analyzer', slug: 'signal-strength', icon: '📶', description: 'Analyze and optimize your lock\'s wireless signal' },
  { name: 'STR ROI Calculator', slug: 'str-roi', icon: '🏠', description: 'Calculate ROI for short-term rental properties' },
  { name: 'Installation Cost Estimator', slug: 'installation-cost', icon: '💰', description: 'Calculate the total cost of your installation' },
  { name: 'Door Compatibility Checker', slug: 'compatibility', icon: '🚪', description: 'Check if your door is compatible with smart locks' },
  { name: 'Mesh Node Planner', slug: 'mesh-planner', icon: '🔗', description: 'Estimate required mesh repeaters for your deployment' },
]
