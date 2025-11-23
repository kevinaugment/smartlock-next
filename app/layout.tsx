import type { Metadata } from 'next'
// import './globals.css'  // 暂时禁用以诊断问题

export const metadata: Metadata = {
  title: 'Smart Lock Hub - Expert Guides & Tools',
  description: 'Comprehensive smart lock guides covering protocols, security, installation, troubleshooting, and real-world applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
