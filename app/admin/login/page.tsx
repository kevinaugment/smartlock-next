import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="page-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-md)' }}>
      <section className="content-card max-w-md w-full">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
          Admin Unavailable
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
          This static build does not include a runtime admin login service.
        </p>
        <Link href="/" className="btn btn-primary" prefetch={false}>
          Back to SLockHub.com
        </Link>
      </section>
    </main>
  )
}
