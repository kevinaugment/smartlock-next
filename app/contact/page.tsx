import Link from 'next/link'
import type { Metadata } from 'next'
import { Mail, MessageCircle, BookOpen, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact - SLockHub.com',
  description: 'Get in touch with SLockHub.com. We are here to help with your smart lock questions.',
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return (
    <div className="page-bg">
      <div className="container-main section">
        <div className="max-w-3xl mx-auto">
          <div className="page-header">
            <div className="page-header__icon"><Mail className="w-14 h-14" /></div>
            <h1 className="page-header__title">Contact Us</h1>
            <p className="page-header__subtitle">
              Have questions? We're here to help
            </p>
          </div>

          <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
            <h2 className="section-title">Get in Touch</h2>

            <div className="form-group" style={{ marginBottom: 'var(--space-xl)' }}>
              <div className="feature-item">
                <div className="feature-item__icon" style={{ width: '2rem', height: '2rem', color: 'var(--color-accent)' }}><Mail className="w-8 h-8" /></div>
                <div>
                  <h3 style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>Email</h3>
                  <a href="mailto:support@slockhub.com" style={{ color: 'var(--color-accent)' }}>
                    support@slockhub.com
                  </a>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-item__icon" style={{ width: '2rem', height: '2rem', color: 'var(--color-accent)' }}><MessageCircle className="w-8 h-8" /></div>
                <div>
                  <h3 style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>Community</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Join our Discord community for discussions and support</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-item__icon" style={{ width: '2rem', height: '2rem', color: 'var(--color-accent)' }}><BookOpen className="w-8 h-8" /></div>
                <div>
                  <h3 style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>Documentation</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Browse our comprehensive knowledge base for instant answers</p>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-lg)' }}>
              <h3 style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>Response Time</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                We typically respond to all inquiries within 24-48 hours during business days.
                For urgent technical issues, please include &quot;URGENT&quot; in your subject line.
              </p>
            </div>
          </div>

          <div className="info-box">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>Before You Contact Us</h3>
            <ul className="space-y-3">
              <li className="check-item">
                <Check className="check-item__icon" style={{ color: 'var(--color-accent)' }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>Check our <a href="/articles" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Knowledge Base</a> for common questions</span>
              </li>
              <li className="check-item">
                <Check className="check-item__icon" style={{ color: 'var(--color-accent)' }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>Try our <a href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Calculators</a> for planning and cost estimation</span>
              </li>
              <li className="check-item">
                <Check className="check-item__icon" style={{ color: 'var(--color-accent)' }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>Review our <a href="/articles/support" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>Troubleshooting Guides</a> for technical issues</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
