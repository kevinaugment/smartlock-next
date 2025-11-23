// 简化版本 - 不使用 getRequestContext
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    // 尝试从全局环境获取
    const env = (globalThis as any).process?.env || {}
    
    // 尝试多种方式
    let db = null
    const attempts = []
    
    // 方法1: globalThis
    try {
      db = (globalThis as any).DB
      attempts.push({ method: 'globalThis.DB', success: !!db })
    } catch (e) {
      attempts.push({ method: 'globalThis.DB', error: String(e) })
    }
    
    // 方法2: process.env
    if (!db) {
      try {
        db = (process as any).env?.DB
        attempts.push({ method: 'process.env.DB', success: !!db })
      } catch (e) {
        attempts.push({ method: 'process.env.DB', error: String(e) })
      }
    }
    
    // 方法3: request对象
    if (!db) {
      try {
        db = (request as any).env?.DB || (request as any).DB
        attempts.push({ method: 'request.DB', success: !!db })
      } catch (e) {
        attempts.push({ method: 'request.DB', error: String(e) })
      }
    }
    
    // 方法4: 直接从Cloudflare runtime
    if (!db && typeof caches !== 'undefined') {
      try {
        // @ts-ignore
        const cf = (request as any).cf || (globalThis as any).CF_NAMESPACE
        db = cf?.DB
        attempts.push({ method: 'CF runtime', success: !!db })
      } catch (e) {
        attempts.push({ method: 'CF runtime', error: String(e) })
      }
    }
    
    if (!db) {
      return Response.json({
        success: false,
        error: 'D1 not accessible',
        attempts,
        available: {
          globalThis: Object.keys(globalThis).filter(k => k.includes('D') || k.includes('CF')),
          process: typeof process !== 'undefined',
          caches: typeof caches !== 'undefined'
        }
      }, { status: 500 })
    }
    
    // 尝试查询
    const result = await db.prepare('SELECT COUNT(*) as count FROM articles').first()
    
    return Response.json({
      success: true,
      count: result?.count,
      attempts
    })
  } catch (error) {
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
