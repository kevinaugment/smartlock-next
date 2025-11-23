import { NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export async function GET() {
  try {
    // 获取Cloudflare环境（不使用泛型避免TypeScript问题）
    const context = getRequestContext()
    const db = (context.env as any).DB
    
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
