import { NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'

export const runtime = 'edge'

export async function GET() {
  try {
    // 测试查询
    const articlesResult = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM articles')
    const categoriesResult = await queryOne<{ count: number }>('SELECT COUNT(*) as count FROM categories')

    return NextResponse.json({
      success: true,
      articles: articlesResult?.count || 0,
      categories: categoriesResult?.count || 0,
      message: 'Turso database connection successful',
      database: 'Turso (LibSQL)',
    })
  } catch (error: any) {
    console.error('Test DB error:', error)
    return NextResponse.json(
      { error: error.message, database: 'Turso (LibSQL)' },
      { status: 500 }
    )
  }
}
