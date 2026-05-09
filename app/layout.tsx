import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import AnalyticsScripts from '@/components/AnalyticsScripts'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.slockhub.com'),
  title: 'Smart Lock Guides, Calculators & Comparisons | SLockHub',
  description: 'Choose smart locks by door fit, protocol, battery life, security, installation cost, and ownership risk with guides and calculators.',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'ufD-o1efiS1g65sNe5he54krbkOMVTmA3iOZtUlcFOw',
  },
  openGraph: {
    title: 'Smart Lock Guides, Calculators & Comparisons | SLockHub',
    description: 'Choose smart locks by door fit, protocol, battery life, security, installation cost, and ownership risk.',
    siteName: 'SLockHub.com',
    type: 'website',
    url: 'https://www.slockhub.com',
    images: [
      {
        url: 'https://www.slockhub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SLockHub.com - Smart Lock Engineering Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Lock Guides, Calculators & Comparisons | SLockHub',
    description: 'Compare smart lock fit, protocols, battery life, security, installation cost, and ownership risk.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <AnalyticsScripts />
      </body>
    </html>
  )
}
