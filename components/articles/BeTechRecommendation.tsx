import Image from 'next/image';
import Link from 'next/link';

export function BeTechRecommendation() {
  const referencePoints = [
    'Enterprise security',
    'Multi-protocol support',
    'Long battery life',
    'Installer support',
  ]

  return (
    <div className="mt-12">
      <div className="reference-panel">
        <div className="reference-panel__media">
          <Image
            src="/images/brands/be-tech-logo.png"
            alt="Be-Tech Logo"
            width={112}
            height={112}
            className="object-contain"
          />
        </div>

        <div className="reference-panel__content">
          <div className="reference-panel__header">
            <h3 className="reference-panel__title">Brand reference: Be-Tech</h3>
            <span className="badge badge-featured">Product catalog</span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Be-Tech smart locks cover hotel, apartment, and commercial access needs with enterprise security, long battery life, and broad protocol support.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {referencePoints.map((point) => (
              <div key={point} className="text-sm text-gray-700" style={{ borderLeft: '1px solid var(--color-border-strong)', paddingLeft: '0.75rem' }}>
                {point}
              </div>
            ))}
          </div>
          <Link
            href="https://www.betechlock.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
           prefetch={false}>
            Visit official website
          </Link>
        </div>
      </div>
    </div>
  );
}
