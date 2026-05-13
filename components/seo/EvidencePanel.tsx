import type { CalculatorEvidenceProfile, EvidenceSourceType } from '@/lib/seo/evidence'

const sourceTypeLabels: Record<EvidenceSourceType, string> = {
  'datasheet-derived': 'Datasheet-derived',
  'standards-based': 'Standards-based',
  'market-benchmark': 'Market benchmark',
  'field-observed': 'Field-observed',
}

interface EvidencePanelProps {
  profile: CalculatorEvidenceProfile
}

export function EvidencePanel({ profile }: EvidencePanelProps) {
  return (
    <section className="content-card" style={{ marginTop: 'var(--space-2xl)' }} data-evidence-profile={profile.slug}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4" style={{ marginBottom: 'var(--space-lg)' }}>
        <div>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-xs)' }}>{profile.title}</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '58rem' }}>
            {profile.modelLimit}
          </p>
        </div>
        <div className="badge badge-accent" style={{ whiteSpace: 'nowrap' }}>
          Verified {profile.lastVerified}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {profile.sourceNotes.map((source) => (
          <div key={`${source.type}-${source.label}`} className="card">
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-xs)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {sourceTypeLabels[source.type]}
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-xs)' }}>
              {source.label}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              {source.note}
            </p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 'var(--space-lg)', fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
        <strong>Review cadence:</strong> {profile.reviewCadence}
      </p>
    </section>
  )
}
