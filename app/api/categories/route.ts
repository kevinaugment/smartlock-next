import { NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

interface CloudflareEnv {
  DB: any  // D1Database
}

export async function GET() {
  try {
    // 使用@cloudflare/next-on-pages的正确方式获取D1绑定
    const { env } = getRequestContext<CloudflareEnv>()
    const db = env.DB
    
    if (!db) {
      return NextResponse.json(
        { 
          error: 'D1 database not configured',
          message: 'DB binding not found. Please configure D1 binding in Cloudflare Pages.'
        },
        { status: 500 }
      )
    }

    // 查询所有分类
    const { results } = await db.prepare(
      'SELECT * FROM categories ORDER BY display_order ASC'
    ).all()

    return NextResponse.json({
      success: true,
      count: results?.length || 0,
      categories: results || [],
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
