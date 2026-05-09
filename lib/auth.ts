/**
 * JWT Authentication Utilities
 * Used for admin panel authentication
 */

import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

type RuntimeEnv = {
  JWT_SECRET?: string
  ADMIN_EMAIL?: string
  ADMIN_PASSWORD_HASH?: string
}

export interface JWTPayload {
  userId: number
  email: string
  role: string
  exp?: number
}

async function getRuntimeEnv(): Promise<RuntimeEnv> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const { env } = await getCloudflareContext({ async: true })
    return env as RuntimeEnv
  } catch {
    return process.env as RuntimeEnv
  }
}

async function getJwtSecret(): Promise<Uint8Array | null> {
  const env = await getRuntimeEnv()
  const jwtSecret = env.JWT_SECRET || process.env.JWT_SECRET

  if (!jwtSecret) {
    console.warn('[auth] JWT_SECRET environment variable is not set. Authentication will be unavailable.')
    return null
  }

  return new TextEncoder().encode(jwtSecret)
}

/**
 * Generate JWT token
 */
export async function generateToken(payload: JWTPayload): Promise<string> {
  const secret = await getJwtSecret()

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
  const secret = await getJwtSecret()

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
  const env = await getRuntimeEnv()
  const adminEmail = env.ADMIN_EMAIL || process.env.ADMIN_EMAIL
  const adminPasswordHash = env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD_HASH

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
