import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface CloudflareEnv {
  DB: D1Database
}

export async function GET(request: NextRequest) {
  try {
    // 获取D1数据库实例
    const env = process.env as unknown as CloudflareEnv
    
    if (!env.DB) {
      return NextResponse.json(
        { error: 'D1 database not available' },
        { status: 500 }
      )
    }

    // 查询所有分类
    const { results } = await env.DB.prepare(
      'SELECT * FROM categories ORDER BY display_order ASC'
    ).all()

    return NextResponse.json({
      success: true,
      count: results?.length || 0,
      categories: results || [],
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch categories',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
