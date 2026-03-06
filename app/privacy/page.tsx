import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - SLockHub.com',
  description: 'SLockHub.com privacy policy — how we collect, use, and protect your information.',
  alternates: { canonical: '/privacy' },
}

export default function Privacy() {
  return (
    <div className="page-bg">
      <div className="container-main section">
        <div className="max-w-4xl mx-auto">
          <h1 className="page-header__title" style={{ marginBottom: 'var(--space-xl)' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3xl)' }}>Last updated: February 2026</p>

          <div className="prose max-w-none">
            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Overview</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                SLockHub.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and safeguard your information
                when you visit our website.
              </p>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Information We Collect</h2>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 'var(--space-lg) 0 var(--space-sm)' }}>Automatically Collected Information</h3>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>• Browser type and version</li>
                <li>• Operating system</li>
                <li>• Pages visited and time spent</li>
                <li>• Referring website</li>
                <li>• IP address (anonymized)</li>
              </ul>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 'var(--space-lg) 0 var(--space-sm)' }}>Calculator Data</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                All calculator inputs and results are processed locally in your browser.
                We do not store, transmit, or collect any data you enter into our calculators.
              </p>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">How We Use Information</h2>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>• Improve website performance and user experience</li>
                <li>• Analyze usage patterns and trends</li>
                <li>• Ensure website security</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Cookies</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                We use minimal cookies for essential website functionality:
              </p>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>• Session cookies for page navigation</li>
                <li>• Preference cookies for user settings</li>
                <li>• Analytics cookies (Google Analytics — anonymized)</li>
              </ul>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Data Security</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                We implement appropriate technical and organizational measures to protect your
                information. Our website is hosted on Vercel&apos;s secure infrastructure with
                HTTPS encryption for all data transmission.
              </p>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Third-Party Services</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                We may use the following third-party services:
              </p>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>• Vercel (hosting and edge deployment)</li>
                <li>• Google Analytics (anonymized usage analytics)</li>
              </ul>
            </div>

            <div className="content-card" style={{ marginBottom: 'var(--space-xl)' }}>
              <h2 className="section-title">Your Rights</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                You have the right to:
              </p>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>• Access your personal information</li>
                <li>• Correct inaccurate data</li>
                <li>• Request deletion of your data</li>
                <li>• Opt-out of analytics tracking</li>
                <li>• Object to data processing</li>
              </ul>
            </div>

            <div className="info-box">
              <h2 className="section-title">Contact Us</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                If you have questions about this Privacy Policy or wish to exercise your rights,
                please contact us at <a href="mailto:privacy@slockhub.com" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>privacy@slockhub.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
