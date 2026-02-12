import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer mt-auto">
      <div className="container-main" style={{ padding: 'var(--space-3xl) var(--space-lg)' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
              <span className="text-lg font-bold" style={{ color: 'var(--color-text-inverse)' }}>SLockHub.com</span>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Your comprehensive resource for smart lock knowledge, tools, and expert guidance.
            </p>
          </div>

          {/* Knowledge Base */}
          <div>
            <h3 className="footer__heading">Knowledge Base</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/articles/protocols">Protocols</Link></li>
              <li><Link href="/articles/security">Security</Link></li>
              <li><Link href="/articles/installation">Installation</Link></li>
              <li><Link href="/articles/guides">Guides</Link></li>
              <li><Link href="/articles/use-cases">Use Cases</Link></li>
              <li><Link href="/articles/integration">Integration</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="footer__heading">Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/battery-life">Battery Life Calculator</Link></li>
              <li><Link href="/calculators/signal-strength">Signal Strength Analyzer</Link></li>
              <li><Link href="/calculators/installation-cost">Installation Cost Estimator</Link></li>
              <li><Link href="/calculators/compatibility">Door Compatibility Checker</Link></li>
              <li>
                <Link href="/calculators" style={{ color: 'var(--color-accent)' }}>
                  View All Calculators →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="footer__heading">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/compare">Protocol Comparison</Link></li>
              <li><Link href="/brands">Brands</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--color-bg-dark-secondary)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              © {currentYear} SLockHub.com. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/sitemap">Sitemap</Link>
              <Link href="/status">System Status</Link>
              <Link href="/api/health">API Health</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
