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
            <h3 className="footer__heading">Smart Lock Guides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/articles/protocols" prefetch={false}>Protocols</Link></li>
              <li><Link href="/articles/security" prefetch={false}>Security</Link></li>
              <li><Link href="/articles/installation" prefetch={false}>Installation</Link></li>
              <li><Link href="/articles/guides" prefetch={false}>Guides</Link></li>
              <li><Link href="/articles/use-cases" prefetch={false}>Use Cases</Link></li>
              <li><Link href="/articles/integration" prefetch={false}>Integration</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/calculators/battery-life" prefetch={false}>Battery Life Calculator</Link></li>
              <li><Link href="/calculators/signal-strength" prefetch={false}>Signal Strength Analyzer</Link></li>
              <li><Link href="/calculators/installation-cost" prefetch={false}>Installation Cost Estimator</Link></li>
              <li><Link href="/calculators/compatibility" prefetch={false}>Door Compatibility Checker</Link></li>
              <li>
                <Link href="/calculators" style={{ color: 'var(--color-accent)' }} prefetch={false}>
                  View All Calculators →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Decision Data</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/compare" prefetch={false}>Protocol Comparison</Link></li>
              <li><Link href="/brands" prefetch={false}>Brands</Link></li>
              <li><Link href="/resources" prefetch={false}>Resources</Link></li>
              <li><Link href="/resources/glossary" prefetch={false}>Glossary</Link></li>
              <li><Link href="/resources/reference-tables" prefetch={false}>Reference Tables</Link></li>
              <li><Link href="/resources/buying-guide" prefetch={false}>Buying Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="footer__heading">Site</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" prefetch={false}>About</Link></li>
              <li><Link href="/faq" prefetch={false}>FAQ</Link></li>
              <li><Link href="/contact" prefetch={false}>Contact</Link></li>
              <li><Link href="/sitemap" prefetch={false}>Sitemap</Link></li>
              <li><Link href="/privacy" prefetch={false}>Privacy Policy</Link></li>
              <li><Link href="/terms" prefetch={false}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            © {currentYear} SLockHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/sitemap" prefetch={false}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
