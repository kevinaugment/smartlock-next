// 健康检查页面 - 最简配置
export default function HealthCheck() {
  const data = {
    status: 'OK',
    service: 'Smart Lock Hub',
    timestamp: Date.now(),
    version: '1.0.0',
  }
  
  return (
    <div style={{
      fontFamily: 'monospace',
      padding: '20px',
      backgroundColor: '#000',
      color: '#0f0',
      minHeight: '100vh'
    }}>
      <h1>🟢 SYSTEM HEALTH CHECK</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <hr style={{ margin: '20px 0' }} />
      <ul>
        <li>✅ Next.js: Rendering</li>
        <li>✅ React: Working</li>
        <li>✅ Cloudflare Pages: Deployed</li>
      </ul>
    </div>
  )
}
