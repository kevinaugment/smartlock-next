// 完全自定义的Cloudflare Workers - 替换next-on-pages
// 这个文件直接处理所有API请求

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // API健康检查
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Smart Lock Hub',
        version: '1.0.0',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    // 分类API
    if (url.pathname === '/api/categories') {
      try {
        if (!env.DB) {
          return new Response(JSON.stringify({
            error: 'Database not available',
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }
        
        const result = await env.DB
          .prepare('SELECT id, name, slug, icon, description FROM categories ORDER BY display_order')
          .all()
        
        return new Response(JSON.stringify({
          success: true,
          categories: result.results || [],
          count: result.results?.length || 0,
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: error.message,
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }
    
    // 数据库测试API
    if (url.pathname === '/api/test-db') {
      try {
        if (!env.DB) {
          return new Response(JSON.stringify({
            error: 'Database not available',
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }
        
        const articlesResult = await env.DB.prepare('SELECT COUNT(*) as count FROM articles').first()
        const categoriesResult = await env.DB.prepare('SELECT COUNT(*) as count FROM categories').first()
        
        return new Response(JSON.stringify({
          success: true,
          articles: articlesResult?.count || 0,
          categories: categoriesResult?.count || 0,
          message: 'Database connection successful',
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: error.message,
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }
    
    // sitemap.xml
    if (url.pathname === '/sitemap.xml') {
      const baseUrl = `${url.protocol}//${url.host}`
      const currentDate = new Date().toISOString()
      
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/articles</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/calculators</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.9</priority>
  </url>
</urlset>`
      
      return new Response(xml, {
        status: 200,
        headers: { 
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600',
        },
      })
    }
    
    // 对于所有其他请求，返回静态文件
    // 这里应该返回Next.js构建的静态文件
    return env.ASSETS.fetch(request)
  },
}
