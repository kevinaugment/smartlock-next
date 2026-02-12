import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
  },
  openGraph: {
    title: 'SLockHub.com - Expert Guides & Tools',
    description: 'Comprehensive smart lock guides covering protocols, security, installation, troubleshooting, and real-world applications.',
    siteName: 'SLockHub.com',
    type: 'website',
    url: '/',
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
      <body className="flex flex-col min-h-screen" style={{ fontFamily: 'var(--font-body)' }}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
