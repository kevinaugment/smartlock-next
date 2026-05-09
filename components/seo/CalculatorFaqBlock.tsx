import { JsonLd } from '@/components/JsonLd'

export interface CalculatorFaqItem {
  question: string
  answer: string
}

interface CalculatorFaqBlockProps {
  title?: string
  faqs: CalculatorFaqItem[]
}

export function CalculatorFaqBlock({ title = 'Frequently Asked Questions', faqs }: CalculatorFaqBlockProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="content-card" style={{ marginTop: 'var(--space-3xl)' }}>
      <JsonLd data={faqSchema} />
      <h2 className="section-title">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
              {faq.question}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '0.925rem' }}>
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
