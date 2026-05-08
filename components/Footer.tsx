import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer mt-auto">
      <div className="container-main footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__brand-mark">
              <Lock className="w-5 h-5" />
              <span>SLockHub</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Smart lock calculators, protocol references, and product data for practical access-control decisions.
            </p>
          </div>
        </div>

        <div className="footer__grid">
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

          <div>
            <h3 className="footer__heading">Decision Data</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/compare">Protocol Comparison</Link></li>
              <li><Link href="/brands">Brands</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/resources/glossary">Glossary</Link></li>
              <li><Link href="/resources/reference-tables">Reference Tables</Link></li>
              <li><Link href="/resources/buying-guide">Buying Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Site</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/sitemap">Sitemap</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            © {currentYear} SLockHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
