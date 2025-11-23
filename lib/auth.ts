/**
 * JWT认证工具
 * 用于管理后台用户认证
 */

import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'smartlock-2024-production-secret-key-change-this'
const secret = new TextEncoder().encode(JWT_SECRET)

export interface JWTPayload {
  userId: number
  email: string
  role: string
  exp?: number
}

/**
 * 生成JWT token
 */
export async function generateToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7天过期
    .sign(secret)
  
  return token
}

/**
 * 验证JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      role: payload.role as string,
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

/**
 * 验证用户凭据（Mock版本）
 * 生产环境会查询数据库
 */
export async function verifyCredentials(email: string, password: string): Promise<JWTPayload | null> {
  // Mock用户数据
  const mockUsers = [
    {
      id: 1,
      email: 'admin@smartlock.com',
      password: 'admin123', // 生产环境应使用bcrypt哈希
      role: 'admin',
    },
  ]

  const user = mockUsers.find(u => u.email === email && u.password === password)
  
  if (user) {
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
    }
  }

  return null
}

/**
 * 从请求中获取用户信息
 */
export async function getUserFromRequest(request: Request): Promise<JWTPayload | null> {
  const authHeader = request.headers.get('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  return verifyToken(token)
}
