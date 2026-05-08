import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { execute } from '@/lib/db'
import { isValidEmail } from '@/lib/utils'
import { buildReportPdf, type ReportType } from '@/lib/reports/pdf'

const reportLeadSchema = z.object({
  reportType: z.enum([
    'door-compatibility-audit',
    'smart-lock-tco-report',
    'product-comparison-report',
  ]),
  reportTitle: z.string().min(3).max(120),
  email: z.string().min(5).max(160),
  useCase: z.string().min(2).max(120),
  doorCount: z.coerce.number().int().min(1).max(500),
  sourcePath: z.string().min(1).max(200),
  utm: z.record(z.string(), z.string()).optional(),
  context: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
})

export const dynamic = 'force-dynamic'

function toFilename(reportType: ReportType) {
  return `${reportType}.pdf`
}

async function persistLead(payload: z.infer<typeof reportLeadSchema>, request: NextRequest) {
  try {
    await execute(`
      CREATE TABLE IF NOT EXISTS report_leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        report_type TEXT NOT NULL,
        report_title TEXT NOT NULL,
        email TEXT NOT NULL,
        use_case TEXT NOT NULL,
        door_count INTEGER NOT NULL,
        source_path TEXT NOT NULL,
        utm_json TEXT,
        context_json TEXT,
        user_agent TEXT,
        referrer TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await execute(
      `INSERT INTO report_leads
        (report_type, report_title, email, use_case, door_count, source_path, utm_json, context_json, user_agent, referrer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.reportType,
        payload.reportTitle,
        payload.email,
        payload.useCase,
        payload.doorCount,
        payload.sourcePath,
        JSON.stringify(payload.utm || {}),
        JSON.stringify(payload.context || {}),
        request.headers.get('user-agent') || '',
        request.headers.get('referer') || '',
      ]
    )

    return { stored: true as const }
  } catch (error) {
    console.error('[API] report lead persistence failed:', error)
    return { stored: false, reason: 'database-write-failed' as const }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const payload = reportLeadSchema.parse(body)

    if (!isValidEmail(payload.email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 })
    }

    const persistence = await persistLead(payload, request)
    const pdfBytes = buildReportPdf(payload)

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${toFilename(payload.reportType)}"`,
        'X-Lead-Stored': persistence.stored ? '1' : '0',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid report request', details: error.flatten() },
        { status: 400 }
      )
    }

    console.error('[API] report download error:', error)
    return NextResponse.json({ success: false, error: 'Failed to generate report' }, { status: 500 })
  }
}
