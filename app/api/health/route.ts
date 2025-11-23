import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Smart Lock Hub',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production',
    uptime: process.uptime ? Math.floor(process.uptime()) : 0,
  })
}
