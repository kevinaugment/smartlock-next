/**
 * JWT Authentication Utilities
 * Used for admin panel authentication
 */

import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

// SECURITY: JWT_SECRET must be set via environment variable — never fallback
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  console.warn('[auth] JWT_SECRET environment variable is not set. Authentication will be unavailable.')
}
const secret = JWT_SECRET ? new TextEncoder().encode(JWT_SECRET) : null

export interface JWTPayload {
  userId: number
  email: string
  role: string
  exp?: number
}

/**
 * Generate JWT token
 */
export async function generateToken(payload: JWTPayload): Promise<string> {
  if (!secret) {
    throw new Error('JWT_SECRET is not configured. Cannot generate tokens.')
  }

  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)

  return token
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  if (!secret) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token, secret)
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      role: payload.role as string,
    }
  } catch {
    return null
  }
}

/**
 * Verify user credentials against environment-based admin account.
 * Credentials must be set via ADMIN_EMAIL and ADMIN_PASSWORD_HASH (bcrypt) env vars.
 */
export async function verifyCredentials(email: string, password: string): Promise<JWTPayload | null> {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

  if (!adminEmail || !adminPasswordHash) {
    console.warn('[auth] ADMIN_EMAIL or ADMIN_PASSWORD_HASH not configured.')
    return null
  }

  if (email !== adminEmail) {
    return null
  }

  const isValid = await bcrypt.compare(password, adminPasswordHash)

  if (isValid) {
    return {
      userId: 1,
      email: adminEmail,
      role: 'admin',
    }
  }

  return null
}

/**
 * Extract user info from request Authorization header
 */
export async function getUserFromRequest(request: Request): Promise<JWTPayload | null> {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  return verifyToken(token)
}
