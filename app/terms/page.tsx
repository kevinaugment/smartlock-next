import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Smart Lock Guides and Calculators | SLockHub',
  description: 'Read SLockHub terms for using smart lock articles, calculators, reference content, external links, warranties, and liability limits.',
  alternates: { canonical: '/terms' },
}

export default function Terms() {
  return (
    <div className="page-bg">
      <div className="container-main section">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-header__title" style={{ marginBottom: 'var(--space-xl)' }}>Terms of Service</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3xl)' }}>Last updated: February 2026</p>

          <div className="prose max-w-none">
            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Acceptance of Terms</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                By accessing and using SLockHub.com, you accept and agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Use of Service</h2>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 'var(--space-lg) 0 var(--space-sm)' }}>Permitted Use</h3>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>• Access and read articles for personal or commercial use</li>
                <li>• Use calculators for planning and analysis</li>
                <li>• Share links to our content</li>
                <li>• Print content for offline reference</li>
              </ul>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 'var(--space-lg) 0 var(--space-sm)' }}>Prohibited Use</h3>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>• Scraping or automated data collection</li>
                <li>• Reproducing content without attribution</li>
                <li>• Commercial redistribution of our content</li>
                <li>• Reverse engineering our calculators</li>
                <li>• Interfering with website operation</li>
              </ul>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Content and Intellectual Property</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                All content on SLockHub.com, including articles, calculators, designs, and code,
                is owned by us or our licensors and protected by copyright law.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                You may reference our content with proper attribution. For commercial use or
                republication, please contact us for permission.
              </p>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Disclaimer of Warranties</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                SLockHub.com is provided &quot;as is&quot; without warranties of any kind, either express or implied.
              </p>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>• We do not guarantee accuracy of all information</li>
                <li>• Calculator results are estimates only</li>
                <li>• Content may contain errors or omissions</li>
                <li>• Website availability is not guaranteed</li>
              </ul>
            </div>

            <div className="callout callout-warning" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="callout-title" style={{ fontSize: '1.5rem' }}>Important Notice</h2>
              <p style={{ marginBottom: 'var(--space-md)' }}>
                <strong>Professional Advice:</strong> Our content is for informational purposes only
                and does not constitute professional advice. Always consult qualified professionals
                for installation, security, and compliance matters.
              </p>
              <p>
                <strong>Liability:</strong> We are not responsible for any decisions made based on
                our content or calculator results. Users assume all risks and liability.
              </p>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Limitation of Liability</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                To the maximum extent permitted by law, SLockHub.com shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, or any loss of
                profits or revenues, whether incurred directly or indirectly, or any loss of data,
                use, goodwill, or other intangible losses.
              </p>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Third-Party Links</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Our website may contain links to third-party websites. We are not responsible for
                the content, privacy policies, or practices of third-party sites.
              </p>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Changes to Terms</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                We reserve the right to modify these Terms of Service at any time. Changes will be
                effective immediately upon posting. Your continued use of the website constitutes
                acceptance of modified terms.
              </p>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Governing Law</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                These Terms shall be governed by and construed in accordance with applicable laws,
                without regard to conflict of law principles.
              </p>
            </div>

            <div className="info-box">
              <h2 className="section-title">Contact</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Questions about these Terms? Contact us at{' '}
                <a href="mailto:legal@slockhub.com" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                  legal@slockhub.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
