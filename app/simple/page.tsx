export const runtime = 'edge'

export default function SimplePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Simple Test Page</h1>
      <p>If you see this, Next.js is working!</p>
      <ul>
        <li>✅ Next.js Edge Runtime</li>
        <li>✅ React Rendering</li>
        <li>✅ Cloudflare Pages</li>
      </ul>
    </div>
  )
}
