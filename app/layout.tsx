import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import AnalyticsScripts from '@/components/AnalyticsScripts'

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.slockhub.com'),
  title: 'SLockHub.com - Expert Guides & Tools',
  description: 'Comprehensive smart lock guides covering protocols, security, installation, troubleshooting, and real-world applications.',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'ufD-o1efiS1g65sNe5he54krbkOMVTmA3iOZtUlcFOw',
  },
  openGraph: {
    title: 'SLockHub.com - Expert Guides & Tools',
    description: 'Comprehensive smart lock guides covering protocols, security, installation, troubleshooting, and real-world applications.',
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
    title: 'SLockHub.com - Expert Guides & Tools',
    description: 'Comprehensive smart lock guides covering protocols, security, installation, troubleshooting, and real-world applications.',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${bodyFont.variable} ${spaceMono.variable}`}>
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
