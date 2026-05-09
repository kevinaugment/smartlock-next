'use client'

import Link from 'next/link'
import { useState, useCallback, useEffect, useRef } from 'react'
import {
  Lock, ChevronDown,
  Radio, Shield, Wrench, BookOpen, Building2, Plug,
  Zap, Battery, Signal, DollarSign, Clock, Home,
  ShieldCheck, Bluetooth, Wifi, Flame, Key, Scale,
  Wand2
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const knowledgeBaseItems = [
  { name: 'Protocols', href: '/articles/protocols', icon: Radio, desc: 'Z-Wave, Zigbee, BLE, Wi-Fi comparisons' },
  { name: 'Security', href: '/articles/security', icon: Shield, desc: 'Encryption, audits & best practices' },
  { name: 'Installation', href: '/articles/installation', icon: Wrench, desc: 'Step-by-step setup guides' },
  { name: 'Guides', href: '/articles/guides', icon: BookOpen, desc: 'How-to walkthroughs & tips' },
  { name: 'Use Cases', href: '/articles/use-cases', icon: Building2, desc: 'Commercial, rental & residential' },
  { name: 'Integration', href: '/articles/integration', icon: Plug, desc: 'Smart-home ecosystem setup' },
]

const calculatorGroups = [
  {
    title: 'Power & Energy',
    items: [
      { name: 'Battery Life', href: '/calculators/battery-life', icon: Battery },
      { name: 'PoE Power Budget', href: '/calculators/poe-power', icon: Zap },
      { name: 'Energy Cost', href: '/calculators/energy-cost', icon: Zap },
    ],
  },
  {
    title: 'Connectivity',
    items: [
      { name: 'Signal Strength', href: '/calculators/signal-strength', icon: Signal },
      { name: 'BLE Range', href: '/calculators/ble-range', icon: Bluetooth },
      { name: 'RF Coverage', href: '/calculators/rf-coverage', icon: Wifi },
    ],
  },
  {
    title: 'Planning & Budget',
    items: [
      { name: 'TCO Calculator', href: '/calculators/lock-tco', icon: DollarSign },
      { name: 'Installation Cost', href: '/calculators/installation-cost', icon: DollarSign },
      { name: 'Installation Time', href: '/calculators/installation-time', icon: Clock },
      { name: 'STR ROI', href: '/calculators/str-roi', icon: Home },
    ],
  },
  {
    title: 'Hardware',
    items: [
      { name: 'Door Compatibility', href: '/calculators/compatibility', icon: Wrench },
      { name: 'Fire Compliance', href: '/calculators/fire-compliance', icon: Flame },
    ],
  },
  {
    title: 'Security & Compliance',
    items: [
      { name: 'Security Compliance', href: '/calculators/security-compliance', icon: ShieldCheck },
      { name: 'Credential Planner', href: '/calculators/credential-planner', icon: Key },
      { name: 'Subscription vs Purchase', href: '/calculators/subscription-compare', icon: Scale },
    ],
  },
  {
    title: 'Comparison',
    items: [
      { name: 'Protocol Wizard', href: '/calculators/protocol-wizard', icon: Wand2 },
      { name: 'Lock Compare', href: '/calculators/lock-compare', icon: Scale },
    ],
  },
]

const resourceItems = [
  { name: 'Glossary', href: '/resources/glossary', desc: 'Smart lock terminology A–Z' },
  { name: 'Reference Tables', href: '/resources/reference-tables', desc: 'Specs, standards & data sheets' },
  { name: 'Buying Guide', href: '/resources/buying-guide', desc: 'How to choose the right lock' },
  { name: 'Installation Guides', href: '/resources/installation-guides', desc: 'Diagrams & wiring references' },
]

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null)
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Close menus on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setMobileAccordion(null)
        setActiveDesktopMenu(null)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', mobileMenuOpen)
    return () => document.body.classList.remove('mobile-nav-open')
  }, [mobileMenuOpen])

  const toggleAccordion = useCallback((key: string) => {
    setMobileAccordion(prev => (prev === key ? null : key))
  }, [])

  const closeMobile = useCallback(() => {
    setMobileMenuOpen(false)
    setMobileAccordion(null)
  }, [])

  const desktopMenuHandlers = useCallback((key: string) => ({
    onMouseEnter: () => setActiveDesktopMenu(key),
    onMouseLeave: () => setActiveDesktopMenu(null),
    onFocus: () => setActiveDesktopMenu(key),
    onBlur: (e: React.FocusEvent) => {
      // Only close if focus moves outside this menu item
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setActiveDesktopMenu(null)
      }
    },
  }), [])

  return (
    <header ref={headerRef} className="site-header sticky top-0 z-50">
      <div className="container-main">
        <div className="flex items-center justify-between" style={{ height: 'var(--header-height)' }}>
          {/* Logo */}
          <Link href="/" className="site-brand group">
            <Lock className="site-brand__icon" />
            <span className="site-brand__name">SLockHub</span>
          </Link>


          {/* ============ Desktop Mega Navigation ============ */}
          <nav className="hidden md:flex mega-nav" aria-label="Main navigation" onPointerLeave={() => setActiveDesktopMenu(null)}>

            {/* ----- Smart Lock Guides ----- */}
            <div className="mega-nav__item" data-menu-open={activeDesktopMenu === 'kb'} {...desktopMenuHandlers('kb')}>
              <button className="mega-nav__trigger" aria-expanded={activeDesktopMenu === 'kb'} aria-haspopup="true">
                Smart Lock Guides
                <ChevronDown className="mega-nav__chevron" />
              </button>
              <div className="mega-menu">
                <div className="mega-menu__grid mega-menu__grid--3">
                  {knowledgeBaseItems.map(item => (
                    <Link key={item.href} href={item.href} className="mega-menu__link">
                      <item.icon className="mega-menu__link-icon" />
                      <div>
                        <div>{item.name}</div>
                        <div className="mega-menu__link-desc">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mega-menu__cta">
                  <Link href="/articles" className="mega-menu__cta-link">Browse All Articles →</Link>
                </div>
              </div>
            </div>

            {/* ----- Calculators ----- */}
            <div className="mega-nav__item" data-menu-open={activeDesktopMenu === 'calc'} {...desktopMenuHandlers('calc')}>
              <button className="mega-nav__trigger" aria-expanded={activeDesktopMenu === 'calc'} aria-haspopup="true">
                Calculators
                <ChevronDown className="mega-nav__chevron" />
              </button>
              <div className="mega-menu">
                <div className="mega-menu__grid mega-menu__grid--3">
                  {calculatorGroups.map(group => (
                    <div key={group.title} className="mega-menu__group">
                      <div className="mega-menu__group-title">{group.title}</div>
                      {group.items.map(item => (
                        <Link key={item.href} href={item.href} className="mega-menu__link">
                          <item.icon className="mega-menu__link-icon" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mega-menu__cta">
                  <Link href="/calculators" className="mega-menu__cta-link">View All 32 Calculators →</Link>
                </div>
              </div>
            </div>

            {/* ----- Compare (direct link) ----- */}
            <Link href="/compare" className="nav-link">Compare</Link>

            {/* ----- Resources ----- */}
            <div className="mega-nav__item" data-menu-open={activeDesktopMenu === 'res'} {...desktopMenuHandlers('res')}>
              <button className="mega-nav__trigger" aria-expanded={activeDesktopMenu === 'res'} aria-haspopup="true">
                Resources
                <ChevronDown className="mega-nav__chevron" />
              </button>
              <div className="mega-menu mega-menu--sm">
                <div className="mega-menu__grid mega-menu__grid--1">
                  {resourceItems.map(item => (
                    <Link key={item.href} href={item.href} className="mega-menu__link">
                      <div>
                        <div>{item.name}</div>
                        <div className="mega-menu__link-desc">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mega-menu__cta">
                  <Link href="/resources" className="mega-menu__cta-link">Browse All Resources →</Link>
                </div>
              </div>
            </div>

            {/* ----- Brands (direct link) ----- */}
            <Link href="/brands" className="nav-link">Brands</Link>
          </nav>

          <Link href="/calculators" className="hidden md:inline-flex header-action header-action--button">
            Tools index
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden mobile-menu-toggle"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
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

        {/* ============ Mobile Navigation ============ */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden mobile-nav-panel" style={{ borderTop: '1px solid var(--color-border)' }}>
            <nav className="flex flex-col" aria-label="Mobile navigation">

              {/* Smart Lock Guides accordion */}
              <div className="mobile-nav__section">
                <button
                  className="mobile-nav__trigger"
                  aria-expanded={mobileAccordion === 'kb'}
                  onClick={() => toggleAccordion('kb')}
                >
                  Smart Lock Guides
                  <ChevronDown className="mobile-nav__chevron" />
                </button>
                {mobileAccordion === 'kb' && (
                  <div className="mobile-nav__panel">
                    {knowledgeBaseItems.map(item => (
                      <Link key={item.href} href={item.href} className="mobile-nav__link" onClick={closeMobile}>
                        {item.name}
                      </Link>
                    ))}
                    <Link href="/articles" className="mobile-nav__view-all" onClick={closeMobile}>
                      Browse All Articles →
                    </Link>
                  </div>
                )}
              </div>

              {/* Calculators accordion */}
              <div className="mobile-nav__section">
                <button
                  className="mobile-nav__trigger"
                  aria-expanded={mobileAccordion === 'calc'}
                  onClick={() => toggleAccordion('calc')}
                >
                  Calculators
                  <ChevronDown className="mobile-nav__chevron" />
                </button>
                {mobileAccordion === 'calc' && (
                  <div className="mobile-nav__panel">
                    {calculatorGroups.map(group => (
                      <div key={group.title}>
                        <div className="mobile-nav__group-title">{group.title}</div>
                        {group.items.map(item => (
                          <Link key={item.href} href={item.href} className="mobile-nav__link" onClick={closeMobile}>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                    <Link href="/calculators" className="mobile-nav__view-all" onClick={closeMobile}>
                      View All 32 Calculators →
                    </Link>
                  </div>
                )}
              </div>

              {/* Compare direct link */}
              <Link href="/compare" className="mobile-nav__trigger" style={{ fontWeight: 600 }} onClick={closeMobile}>
                Compare
              </Link>

              {/* Resources accordion */}
              <div className="mobile-nav__section">
                <button
                  className="mobile-nav__trigger"
                  aria-expanded={mobileAccordion === 'res'}
                  onClick={() => toggleAccordion('res')}
                >
                  Resources
                  <ChevronDown className="mobile-nav__chevron" />
                </button>
                {mobileAccordion === 'res' && (
                  <div className="mobile-nav__panel">
                    {resourceItems.map(item => (
                      <Link key={item.href} href={item.href} className="mobile-nav__link" onClick={closeMobile}>
                        {item.name}
                      </Link>
                    ))}
                    <Link href="/resources" className="mobile-nav__view-all" onClick={closeMobile}>
                      Browse All Resources →
                    </Link>
                  </div>
                )}
              </div>

              {/* Brands direct link */}
              <Link href="/brands" className="mobile-nav__trigger" style={{ fontWeight: 600 }} onClick={closeMobile}>
                Brands
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
