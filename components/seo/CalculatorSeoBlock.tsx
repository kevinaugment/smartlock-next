import Link from 'next/link'

interface CalculatorSeoBlockProps {
  title: string
  answers: string[]
  formula: {
    label: string
    equation: string
    notes: string
  }
  assumptions: string[]
  example: {
    title: string
    inputs: string
    result: string
    decision: string
  }
  sources: string[]
  links: Array<{
    href: string
    title: string
    description: string
  }>
}

export function CalculatorSeoBlock({
  title,
  answers,
  formula,
  assumptions,
  example,
  sources,
  links,
}: CalculatorSeoBlockProps) {
  return (
    <section className="content-card" style={{ marginTop: 'var(--space-3xl)' }}>
      <h2 className="section-title">{title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>
            What this calculator answers
          </h3>
          <ul className="space-y-3">
            {answers.map((answer) => (
              <li key={answer} className="check-item">
                <span className="check-item__icon check-item__icon--success" aria-hidden="true">+</span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{answer}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>
            Formula and assumptions
          </h3>
          <div className="card" style={{ marginBottom: 'var(--space-md)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)' }}>{formula.label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)', overflowWrap: 'anywhere' }}>
              {formula.equation}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{formula.notes}</p>
          </div>
          <ul className="space-y-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            {assumptions.map((assumption) => (
              <li key={assumption}>- {assumption}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ marginTop: 'var(--space-2xl)' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
            Example scenario
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{example.title}</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}><strong>Inputs:</strong> {example.inputs}</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}><strong>Result:</strong> {example.result}</p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}><strong>Decision:</strong> {example.decision}</p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
            Data sources
          </h3>
          <ul className="space-y-2" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            {sources.map((source) => (
              <li key={source}>- {source}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-sm)' }}>
            Report-ready inputs
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Save the measurements, assumptions, and result range from this tool before requesting installer quotes or comparing lock models.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-md)' }}>
          Next checks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="link-card" prefetch={false}>
              <h4 className="link-card__title">{link.title}</h4>
              <p className="link-card__desc">{link.description}</p>
              <span style={{ display: 'inline-block', marginTop: 'var(--space-sm)', color: 'var(--color-accent)', fontSize: '0.875rem', fontWeight: 600 }}>
                Open {'->'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
