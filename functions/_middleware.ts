// Cloudflare Pages Functions 中间件
// 这是标准的Cloudflare Workers API，不依赖Next.js

import { Hono } from 'hono'
import type { Env, PagesFunction } from './types'

const app = new Hono<{ Bindings: Env }>()

// 健康检查API
app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Smart Lock Hub',
    version: '1.0.0',
  })
})

// 分类API
app.get('/api/categories', async (c) => {
  try {
    const db = c.env.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }

    const result = await db
      .prepare('SELECT id, name, slug, icon, description FROM categories ORDER BY display_order')
      .all()

    return c.json({
      success: true,
      categories: result.results || [],
      count: result.results?.length || 0,
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message,
    }, 500)
  }
})

// 数据库测试API
app.get('/api/test-db', async (c) => {
  try {
    const db = c.env.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }

    const articlesResult = await db.prepare('SELECT COUNT(*) as count FROM articles').first()
    const categoriesResult = await db.prepare('SELECT COUNT(*) as count FROM categories').first()

    return c.json({
      success: true,
      articles: articlesResult?.count || 0,
      categories: categoriesResult?.count || 0,
      message: 'Database connection successful',
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message,
    }, 500)
  }
})

// 导出标准Cloudflare Workers处理函数
export const onRequest: PagesFunction<Env> = async (context) => {
  return app.fetch(context.request, context.env)
}
