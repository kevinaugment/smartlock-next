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
  title: 'Admin - SLockHub.com',
  description: 'Admin portal for SLockHub.com',
}
