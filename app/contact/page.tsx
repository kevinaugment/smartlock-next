import Link from 'next/link'
import type { Metadata } from 'next'
import { Mail, MessageCircle, BookOpen, Check } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact SLockHub | Smart Lock Questions, Tools & Research',
  description: 'Contact SLockHub about smart lock guides, calculators, product research, protocol comparisons, installation fit, and security topics.',
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return (
    <div className="page-bg">
      <div className="container-main section">
        <div className="max-w-4xl mx-auto">
          <div className="page-header">
            <div className="page-header__icon"><Mail className="w-14 h-14" /></div>
            <h1 className="page-header__title">Contact Us</h1>
            <p className="page-header__subtitle">
              Have questions? We&apos;re here to help
            </p>
          </div>

          <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 className="section-title">Email, Community, Docs</h2>

            <div className="form-group" style={{ marginBottom: 'var(--space-xl)' }}>
              <div className="feature-item">
                <div className="feature-item__icon feature-item__icon--lg feature-item__icon--accent"><Mail className="w-8 h-8" /></div>
                <div>
                  <h3 className="feature-item__title">Email</h3>
                  <a href="mailto:support@slockhub.com" style={{ color: 'var(--color-accent)' }}>
                    support@slockhub.com
                  </a>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-item__icon feature-item__icon--lg feature-item__icon--accent"><MessageCircle className="w-8 h-8" /></div>
                <div>
                  <h3 className="feature-item__title">Community</h3>
                  <p className="feature-item__desc">Join our Discord community for discussions and support</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-item__icon feature-item__icon--lg feature-item__icon--accent"><BookOpen className="w-8 h-8" /></div>
                <div>
                  <h3 className="feature-item__title">Documentation</h3>
                  <p className="feature-item__desc">Browse smart lock guides for quick answers</p>
                </div>
              </div>
            </div>

            <div className="divider-section">
              <h3 className="feature-item__title">Response Time</h3>
              <p className="feature-item__desc">
                We typically respond to all inquiries within 24-48 hours during business days.
                For urgent technical issues, please include &quot;URGENT&quot; in your subject line.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <ContactForm />
          </div>

          <div className="info-box">
            <h3 className="info-box__title">Before You Contact Us</h3>
            <ul className="space-y-3">
              <li className="check-item">
                <Check className="check-item__icon check-item__icon--accent" />
                <span className="feature-item__desc">Check our <a href="/articles" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Smart Lock Guides</a> for common questions</span>
              </li>
              <li className="check-item">
                <Check className="check-item__icon check-item__icon--accent" />
                <span className="feature-item__desc">Try our <a href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Calculators</a> for planning and cost estimation</span>
              </li>
              <li className="check-item">
                <Check className="check-item__icon check-item__icon--accent" />
                <span className="feature-item__desc">Review our <a href="/articles/guides" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Troubleshooting Guides</a> for technical issues</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
