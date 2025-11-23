import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Smart Lock Hub',
  description: 'Learn about Smart Lock Hub - your comprehensive resource for smart lock knowledge, tools, and expert guidance.',
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Smart Lock Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive resource for smart lock knowledge, tools, and expert guidance
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Smart Lock Hub was created to provide property owners, managers, and installers with 
              the knowledge and tools they need to make informed decisions about smart lock systems.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that access control technology should be accessible to everyone, not just 
              large enterprises. Our goal is to demystify smart locks through comprehensive guides, 
              practical calculators, and real-world insights.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-200">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Knowledge Base</h3>
              <p className="text-gray-700 mb-4">
                49+ in-depth articles covering protocols, security, installation, troubleshooting, 
                and use cases. Written by experts with real-world experience.
              </p>
              <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-semibold">
                Browse Articles →
              </Link>
            </div>

            <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
              <div className="text-4xl mb-4">🧮</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Calculators</h3>
              <p className="text-gray-700 mb-4">
                15 specialized tools for cost analysis, protocol selection, capacity planning, 
                and deployment optimization. All free to use.
              </p>
              <Link href="/calculators" className="text-green-600 hover:text-green-700 font-semibold">
                Try Calculators →
              </Link>
            </div>

            <div className="bg-purple-50 rounded-xl p-8 border-2 border-purple-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Practical Guidance</h3>
              <p className="text-gray-700 mb-4">
                Real-world examples, best practices, and actionable recommendations based on 
                thousands of successful deployments.
              </p>
              <Link href="/articles/guides" className="text-purple-600 hover:text-purple-700 font-semibold">
                View Guides →
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">49+</div>
                <div className="text-blue-100">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">15</div>
                <div className="text-blue-100">Calculators</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">7</div>
                <div className="text-blue-100">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-blue-100">Free</div>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Topics We Cover</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>📡</span>
                <span>Protocols & Technology</span>
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Z-Wave, Zigbee, Wi-Fi, Thread, Matter</li>
                <li>• Protocol comparison and selection</li>
                <li>• Mesh networking and range optimization</li>
                <li>• Future-proof technology planning</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🔒</span>
                <span>Security & Privacy</span>
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Encryption and authentication</li>
                <li>• Vulnerability analysis</li>
                <li>• Data privacy and compliance</li>
                <li>• Best security practices</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🔋</span>
                <span>Installation & Setup</span>
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Door compatibility checking</li>
                <li>• Installation procedures</li>
                <li>• Battery optimization</li>
                <li>• Troubleshooting guides</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>🏢</span>
                <span>Use Cases & Planning</span>
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Short-term rentals (Airbnb, VRBO)</li>
                <li>• Multi-family properties</li>
                <li>• Commercial buildings</li>
                <li>• Enterprise deployments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
            <p className="text-gray-700 mb-4">
              Smart Lock Hub is built on Next.js 14 and deployed on Cloudflare's global network 
              for maximum performance and reliability.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium">Next.js 14</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium">React 18</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium">TypeScript</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium">Tailwind CSS</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium">Cloudflare D1</span>
              <span className="px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium">Edge Runtime</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our knowledge base or try our interactive calculators
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Articles
            </Link>
            <Link
              href="/calculators"
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Try Calculators
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
