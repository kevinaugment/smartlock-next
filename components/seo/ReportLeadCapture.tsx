'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Download, FileText, Loader2, X } from 'lucide-react'

type ReportType = 'door-compatibility-audit' | 'smart-lock-tco-report' | 'product-comparison-report'

interface ReportLeadCaptureProps {
  reportType: ReportType
  title: string
  description: string
  sourcePath: string
  context?: Record<string, string | number | boolean | null | undefined>
  bullets?: string[]
}

const useCases = [
  'Personal home',
  'Rental property',
  'Short-term rental',
  'Commercial site',
  'Installer / consultant',
]

function collectUtmParams() {
  if (typeof window === 'undefined') return {}
  const searchParams = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const value = searchParams.get(key)
    if (value) utm[key] = value
  }
  return utm
}

export function ReportLeadCapture({
  reportType,
  title,
  description,
  sourcePath,
  context,
  bullets = [],
}: ReportLeadCaptureProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [useCase, setUseCase] = useState(useCases[0])
  const [doorCount, setDoorCount] = useState('1')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const emailInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.body.classList.add('mobile-nav-open')
    document.addEventListener('keydown', onKeyDown)
    emailInputRef.current?.focus()

    return () => {
      document.body.classList.remove('mobile-nav-open')
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const visibleBullets = useMemo(() => {
    if (bullets.length > 0) return bullets.slice(0, 3)
    return [
      'Printable audit summary for stakeholders or installers.',
      'Source page and decision context included in the report.',
      'Use the report as a buying checklist before requesting quotes.',
    ]
  }, [bullets])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      const payload = {
        reportType,
        reportTitle: title,
        email,
        useCase,
        doorCount: Number(doorCount),
        sourcePath,
        utm: collectUtmParams(),
        context,
      }
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${reportType}.json`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to generate the report.')
      setStatus('error')
    }
  }

  return (
    <section className="content-card" style={{ marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-3xl)' }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
        <div>
          <div className="badge badge-accent" style={{ marginBottom: 'var(--space-md)' }}>
            <FileText className="w-4 h-4" /> Downloadable PDF
          </div>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>{title}</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: 'var(--space-lg)' }}>
            {description}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {visibleBullets.map((bullet) => (
              <li key={bullet} className="card" style={{ padding: 'var(--space-md)', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div className="card" style={{ background: 'var(--color-bg-alt)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
            Get the report
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-lg)' }}>
            Opens a short form so the report can include use-case and door-count context.
          </p>
          <button type="button" className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setIsOpen(true)}>
            <Download className="w-5 h-5" /> Download PDF
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`report-modal-${reportType}`}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          style={{ background: 'rgba(15, 23, 42, 0.64)' }}
          onMouseDown={() => setIsOpen(false)}
        >
          <div className="content-card report-modal" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4" style={{ marginBottom: 'var(--space-lg)' }}>
              <div>
                <h2 id={`report-modal-${reportType}`} style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
                  Download {title}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  We will use this only to package the report context and qualify the download source.
                </p>
              </div>
              <button type="button" className="btn btn-secondary report-modal__close" style={{ padding: '0.65rem' }} onClick={() => setIsOpen(false)} aria-label="Close report form">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor={`${reportType}-email`} className="form-label">Email</label>
                <input
                  id={`${reportType}-email`}
                  ref={emailInputRef}
                  type="email"
                  required
                  className="input-field"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor={`${reportType}-use-case`} className="form-label">Use case</label>
                <select
                  id={`${reportType}-use-case`}
                  className="input-field"
                  value={useCase}
                  onChange={(event) => setUseCase(event.target.value)}
                >
                  {useCases.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${reportType}-door-count`} className="form-label">Door count</label>
                <input
                  id={`${reportType}-door-count`}
                  type="number"
                  min="1"
                  max="500"
                  required
                  inputMode="numeric"
                  className="input-field"
                  value={doorCount}
                  onChange={(event) => setDoorCount(event.target.value)}
                />
              </div>

              {status === 'error' && (
                <p className="callout callout-danger" style={{ margin: 0, fontSize: '0.9rem' }}>{error}</p>
              )}
              {status === 'success' && (
                <p className="callout callout-success" style={{ margin: 0, fontSize: '0.9rem' }}>
                  The PDF has been generated. You can update the form and download another copy if needed.
                </p>
              )}

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={status === 'submitting'}>
                {status === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                {status === 'submitting' ? 'Generating...' : 'Generate PDF'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
