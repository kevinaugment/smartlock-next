'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Lock } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b sticky top-0 z-50" style={{ borderColor: 'var(--color-border)' }}>
      <div className="container-main">
        <div className="flex items-center justify-between" style={{ height: 'var(--header-height)' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Lock className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
            <span className="text-lg font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              Smart Lock Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/articles" className="nav-link">Knowledge Base</Link>
            <Link href="/calculators" className="nav-link">Calculators</Link>
            <Link href="/compare" className="nav-link">Compare</Link>
            <Link href="/resources" className="nav-link">Resources</Link>
            <Link href="/about" className="nav-link">About</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <nav className="flex flex-col gap-1">
              <Link href="/articles" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Knowledge Base</Link>
              <Link href="/calculators" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Calculators</Link>
              <Link href="/compare" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Compare Protocols</Link>
              <Link href="/resources" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
              <Link href="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
