import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    // 方法1: 尝试从request中获取
    const env = (request as any).env || (request as any).nextUrl?.env
    
    // 方法2: 尝试使用process.env
    const processEnv = typeof process !== 'undefined' ? process.env : {}
    
    // 方法3: 尝试getRequestContext
    let contextInfo = null
    try {
      const { getRequestContext } = await import('@cloudflare/next-on-pages')
      const context = getRequestContext()
      contextInfo = {
        hasContext: !!context,
        hasEnv: !!context?.env,
        envKeys: context?.env ? Object.keys(context.env) : [],
        hasDB: !!(context?.env as any)?.DB
      }
    } catch (e) {
      contextInfo = { error: e instanceof Error ? e.message : String(e) }
    }
    
    return NextResponse.json({
      success: true,
      debug: {
        requestEnv: {
          exists: !!env,
          keys: env ? Object.keys(env) : [],
          hasDB: env?.DB ? 'yes' : 'no'
        },
        processEnv: {
          keys: Object.keys(processEnv).filter(k => !k.includes('SECRET')),
          hasCloudflare: 'CF' in processEnv || 'CLOUDFLARE' in processEnv
        },
        context: contextInfo,
        runtime: 'edge',
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
