// 完全静态页面 - 不使用edge runtime
export default function StaticPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#0ea5e9' }}>✅ Static Page Works!</h1>
      <p>This is a completely static page without edge runtime.</p>
      <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
        <h2>Test Results:</h2>
        <ul>
          <li>✅ Next.js App Router</li>
          <li>✅ React Rendering</li>
          <li>✅ Cloudflare Pages</li>
          <li>❓ Edge Runtime (not used here)</li>
        </ul>
      </div>
      <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#6b7280' }}>
        If you see this page, the issue is with edge runtime configuration.
      </p>
    </div>
  )
}
