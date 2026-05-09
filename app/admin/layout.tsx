export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="page-bg" style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}

export const metadata = {
  title: 'SLockHub Admin',
  description: 'SLockHub content and database management portal.',
  robots: 'noindex, nofollow',
}
