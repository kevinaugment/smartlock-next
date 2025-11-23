export const runtime = 'edge'

export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Test Page - Next.js Works!</h1>
      <p>If you see this styled page, Next.js is working correctly.</p>
      <p>Current time: {new Date().toISOString()}</p>
    </div>
  )
}
