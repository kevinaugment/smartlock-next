export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'SLockHub.com',
      version: '1.0.0',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
