import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Noise Level Estimator - SLockHub.com',
    description: 'Estimate smart lock motor noise levels in decibels. Compare lock mechanisms, assess nighttime disturbance risk, and find quieter alternatives for bedrooms and offices.',
    alternates: { canonical: '/calculators/noise-level' },
    openGraph: {
        title: 'Noise Level Estimator - SLockHub.com',
        description: 'Estimate smart lock motor noise levels in decibels. Compare lock mechanisms, assess nighttime disturbance risk, and find quieter alternatives for bedrooms and offices.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

export default function NoiseLevelLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Noise Level Estimator',
                url: 'https://www.slockhub.com/calculators/noise-level',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Estimate smart lock motor noise levels in decibels. Compare lock mechanisms, assess nighttime disturbance risk, and find quieter alternatives.',
                softwareVersion: '1.0',
                datePublished: '2026-02-15',
                creator: { '@type': 'Organization', name: 'SLockHub.com', url: 'https://www.slockhub.com' },
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Noise Level Estimator', item: 'https://www.slockhub.com/calculators/noise-level' },
                ],
            }} />
            {children}
        </>
    )
}
