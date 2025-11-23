import { NextRequest, NextResponse } from 'next/server'
import { verifyCredentials, generateToken } from '@/lib/auth'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // 验证凭据
    const user = await verifyCredentials(email, password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // 生成token
    const token = await generateToken(user)

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.userId,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
