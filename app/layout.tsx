import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RY8C070WKJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RY8C070WKJ');
          `}
        </Script>
      </body>
    </html>
  )
}
