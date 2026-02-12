import Link from 'next/link'
import { Home, BookOpen, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="page-wrapper-alt">
      <div className="container-main section">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <span className="mono-value" style={{ fontSize: '6rem', color: 'var(--color-accent)' }}>404</span>
          </div>
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            Page Not Found
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/" className="btn btn-primary btn-lg">
              <Home className="w-5 h-5" /> Go Home
            </Link>
            <Link href="/articles" className="btn btn-secondary btn-lg">
              <BookOpen className="w-5 h-5" /> Browse Articles
            </Link>
          </div>

          {/* Popular Destinations */}
          <div className="card" style={{ padding: 'var(--space-xl)', textAlign: 'left' }}>
            <h2 className="font-bold text-base mb-4" style={{ color: 'var(--color-text-primary)' }}>Popular Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/calculators', label: 'Calculators' },
                { href: '/compare', label: 'Protocol Comparison' },
                { href: '/faq', label: 'FAQ' },
                { href: '/about', label: 'About Us' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: 'var(--color-text-secondary)', padding: 'var(--space-sm) 0' }}
                >
                  <span style={{ color: 'var(--color-accent)' }}>→</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
