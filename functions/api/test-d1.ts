// Cloudflare Pages Function (不是Next.js)
// 这个会在/api/test-d1路径上运行

interface Env {
  DB: any // D1Database类型在Cloudflare运行时可用
}

export async function onRequest(context: { env: Env }) {
  try {
    const { DB } = context.env
    
    if (!DB) {
      return new Response(JSON.stringify({
        success: false,
        error: 'D1 binding not found',
        env: Object.keys(context.env)
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      })
    }
    
    // 测试查询
    const result = await DB.prepare('SELECT COUNT(*) as count FROM articles').first()
    
    return new Response(JSON.stringify({
      success: true,
      message: 'D1 connection works!',
      articleCount: result?.count || 0,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
}
