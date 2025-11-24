import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-9xl mb-8">🔍</div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/articles"
            className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Browse Articles
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium">
              📚 Knowledge Base
            </Link>
            <Link href="/calculators" className="text-blue-600 hover:text-blue-700 font-medium">
              🧮 Calculators
            </Link>
            <Link href="/articles/protocols" className="text-blue-600 hover:text-blue-700 font-medium">
              📡 Protocols
            </Link>
            <Link href="/articles/security" className="text-blue-600 hover:text-blue-700 font-medium">
              🔒 Security
            </Link>
            <Link href="/articles/installation" className="text-blue-600 hover:text-blue-700 font-medium">
              🔋 Installation
            </Link>
            <Link href="/articles/use-cases" className="text-blue-600 hover:text-blue-700 font-medium">
              🏢 Use Cases
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
