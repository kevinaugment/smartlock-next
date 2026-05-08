export type ReportType = 'door-compatibility-audit' | 'smart-lock-tco-report' | 'product-comparison-report'

export interface ReportLeadPayload {
  reportType: ReportType
  reportTitle: string
  email: string
  useCase: string
  doorCount: number
  sourcePath: string
  utm?: Record<string, string>
  context?: Record<string, string | number | boolean | null | undefined>
}

const reportConfig: Record<ReportType, { title: string; sections: string[] }> = {
  'door-compatibility-audit': {
    title: 'Door Compatibility Audit',
    sections: [
      'Measure door thickness, backset, bore diameter, latch bore, and material before buying a smart lock.',
      'Flag fire-rated, glass, narrow-stile, and metal doors for manufacturer-specific verification.',
      'Use the installation-cost calculator when any measurement requires drilling, adapters, or locksmith work.',
    ],
  },
  'smart-lock-tco-report': {
    title: 'Smart Lock TCO Report',
    sections: [
      'Model total cost with hardware, labor, wiring, subscriptions, batteries, and lifecycle replacement.',
      'Separate one-time installation costs from recurring operating costs so quotes can be compared fairly.',
      'For multi-door projects, verify whether shared hubs, access software, or installer travel charges change the unit economics.',
    ],
  },
  'product-comparison-report': {
    title: 'Product Comparison Report',
    sections: [
      'Compare shortlisted locks by protocol, Matter support, battery life, door fit, access methods, rating, and price.',
      'Avoid decisions based only on brand reputation when model-level door prep or protocol support differs.',
      'Use the comparison page as a shortlist, then confirm installation manuals and current retailer pricing before purchase.',
    ],
  },
}

function sanitizePdfText(value: string): string {
  return value
    .replace(/[^\x20-\x7E\n]/g, '-')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
}

function wrapText(text: string, maxLength = 86): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxLength && current) {
      lines.push(current)
      current = word
    } else {
      current = next
    }
  }

  if (current) lines.push(current)
  return lines
}

function line(text: string, x: number, y: number, size = 11): string {
  return `BT /F1 ${size} Tf ${x} ${y} Td (${sanitizePdfText(text)}) Tj ET`
}

export function buildReportPdf(payload: ReportLeadPayload): ArrayBuffer {
  const config = reportConfig[payload.reportType] || reportConfig['door-compatibility-audit']
  const title = payload.reportTitle || config.title
  const date = new Date().toISOString().slice(0, 10)
  const contextEntries = Object.entries(payload.context || {})
    .filter(([, value]) => value !== undefined && value !== null && `${value}`.trim() !== '')
    .slice(0, 8)

  const content: string[] = [
    '0.08 0.11 0.20 rg',
    '0 742 612 100 re f',
    line('SLockHub.com', 54, 798, 12),
    line(title, 54, 770, 24),
    line(`Prepared for ${payload.email} on ${date}`, 54, 744, 10),
    '0 0 0 rg',
    line('Report Summary', 54, 704, 16),
  ]

  let y = 680
  const summary = [
    `Use case: ${payload.useCase}`,
    `Door count: ${payload.doorCount}`,
    `Source page: ${payload.sourcePath}`,
  ]

  for (const item of summary) {
    content.push(line(item, 72, y, 11))
    y -= 18
  }

  y -= 12
  content.push(line('Recommended Review Steps', 54, y, 16))
  y -= 24

  config.sections.forEach((section, index) => {
    const wrapped = wrapText(`${index + 1}. ${section}`, 82)
    for (const row of wrapped) {
      content.push(line(row, 72, y, 10))
      y -= 15
    }
    y -= 5
  })

  if (contextEntries.length > 0) {
    y -= 10
    content.push(line('Page Context', 54, y, 16))
    y -= 24

    for (const [key, value] of contextEntries) {
      for (const row of wrapText(`${key}: ${value}`, 82)) {
        content.push(line(row, 72, y, 10))
        y -= 15
      }
    }
  }

  y = Math.max(y - 20, 118)
  content.push(line('Next Actions', 54, y, 16))
  y -= 24
  const nextActions = [
    'Save manufacturer installation PDFs for every shortlisted model.',
    'Verify dimensions against the actual door before ordering hardware.',
    'Use SLockHub calculators to pressure-test fit, signal, battery, and total cost assumptions.',
  ]
  for (const action of nextActions) {
    for (const row of wrapText(`- ${action}`, 82)) {
      content.push(line(row, 72, y, 10))
      y -= 15
    }
  }

  content.push(line('This report is an educational planning aid, not a building-code or fire-door certification.', 54, 42, 8))

  const stream = content.join('\n')
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ]

  let pdf = '%PDF-1.4\n'
  const offsets = [0]

  objects.forEach((object, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })

  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

  const bytes = new TextEncoder().encode(pdf)
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
}
