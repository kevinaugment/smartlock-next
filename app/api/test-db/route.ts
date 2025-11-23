import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  try {
    const { env } = getRequestContext()
    const db = (env as any).DB
    
    if (!db) {
      return NextResponse.json({ 
        error: 'DB not available',
        env_keys: Object.keys(env),
        message: 'Database binding not configured'
      }, { status: 500 })
    }

    // Test query
    const result = await db.prepare('SELECT COUNT(*) as count FROM articles').first()
    const categories = await db.prepare('SELECT id, name FROM categories').all()
    
    return NextResponse.json({ 
      success: true,
      articles_count: result.count,
      categories_count: categories.results.length,
      categories: categories.results,
      message: 'Database connection successful'
    })
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
