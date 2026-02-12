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
  title: 'Admin - Smart Lock Hub',
  description: 'Admin portal for Smart Lock Hub',
}
