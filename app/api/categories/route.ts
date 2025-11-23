import { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    // 尝试多种方式获取D1绑定
    let db = null
    
    // 方法1: 通过getRequestContext (推荐)
    try {
      const context = getRequestContext()
      db = (context?.env as any)?.DB
    } catch (e) {
      console.error('getRequestContext failed:', e)
    }
    
    // 方法2: 通过request对象 (备用)
    if (!db) {
      db = (request as any)?.env?.DB || (request as any)?.DB
    }
    
    if (!db) {
      return NextResponse.json(
        { 
          error: 'D1 database not configured',
          message: 'DB binding not found. Please configure D1 binding in Cloudflare Pages Dashboard.',
          hint: 'Check Settings → Functions → D1 database bindings'
        },
        { status: 500 }
      )
    }

    // 查询所有分类
    const result = await db.prepare(
      'SELECT * FROM categories ORDER BY display_order ASC'
    ).all()

    return NextResponse.json({
      success: true,
      count: result.results?.length || 0,
      categories: result.results || [],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch categories',
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
