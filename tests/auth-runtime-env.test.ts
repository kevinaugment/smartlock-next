import assert from 'node:assert/strict'

async function main() {
  const originalSecret = process.env.JWT_SECRET
  const originalAdminEmail = process.env.ADMIN_EMAIL
  const originalAdminPasswordHash = process.env.ADMIN_PASSWORD_HASH

  delete process.env.JWT_SECRET
  delete process.env.ADMIN_EMAIL
  delete process.env.ADMIN_PASSWORD_HASH

  const warnings: unknown[][] = []
  const originalWarn = console.warn
  console.warn = (...args: unknown[]) => {
    warnings.push(args)
  }

  try {
    const auth = await import('../lib/auth')

    assert.equal(warnings.length, 0, 'auth module import should not warn during build-time evaluation')

    process.env.JWT_SECRET = 'runtime-test-secret'
    const token = await auth.generateToken({
      userId: 1,
      email: 'admin@example.com',
      role: 'admin',
    })

    const payload = await auth.verifyToken(token)
    assert.deepEqual(payload, {
      userId: 1,
      email: 'admin@example.com',
      role: 'admin',
    })
  } finally {
    console.warn = originalWarn

    if (originalSecret === undefined) delete process.env.JWT_SECRET
    else process.env.JWT_SECRET = originalSecret

    if (originalAdminEmail === undefined) delete process.env.ADMIN_EMAIL
    else process.env.ADMIN_EMAIL = originalAdminEmail

    if (originalAdminPasswordHash === undefined) delete process.env.ADMIN_PASSWORD_HASH
    else process.env.ADMIN_PASSWORD_HASH = originalAdminPasswordHash
  }

  console.log('Auth reads runtime environment without build-time JWT_SECRET warnings')
}

main()
