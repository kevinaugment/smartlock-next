import Image from 'next/image'

interface BeTechRecommendationProps {
  description?: string;
  badge?: string;
}

export function BeTechCalculatorRecommendation({ 
  description = "Be-Tech locks feature industry-leading reliability and performance across all smart lock protocols.",
  badge = "Catalog reference"
}: BeTechRecommendationProps) {
  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="reference-panel">
        <div className="reference-panel__media">
          <Image
            src="/images/brands/be-tech-logo.png"
            alt="Be-Tech Logo"
            width={72}
            height={72}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="reference-panel__content">
          <div className="reference-panel__header">
            <h3 className="reference-panel__title">Brand reference: Be-Tech</h3>
            <span className="badge badge-featured">{badge}</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {description}
          </p>
          <a
            href="https://www.betechlock.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Visit official website
          </a>
        </div>
      </div>
    </div>
  );
}
