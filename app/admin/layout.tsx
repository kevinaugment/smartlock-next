export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}

export const metadata = {
  title: 'Admin - Smart Lock Hub',
  description: 'Admin portal for Smart Lock Hub',
}
