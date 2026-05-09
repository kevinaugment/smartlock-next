import type React from 'react'

interface CalculatorAnswerBlockProps {
  title: string
  answer: string
  children?: React.ReactNode
}

export function CalculatorAnswerBlock({ title, answer, children }: CalculatorAnswerBlockProps) {
  return (
    <section className="content-card" style={{ marginBottom: 'var(--space-3xl)' }}>
      <h2 className="section-title">{title}</h2>
      <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
        {answer}
      </p>
      {children && (
        <div style={{ marginTop: 'var(--space-lg)' }}>
          {children}
        </div>
      )}
    </section>
  )
}
