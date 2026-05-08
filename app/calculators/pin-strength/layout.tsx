import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'PIN Security Strength Checker - SLockHub.com',
    description: 'Analyze smart lock PIN code strength and security. Check for common patterns, brute-force resistance, and get recommendations for stronger access codes.',
    canonical: '/calculators/pin-strength',
})

export default function PinStrengthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'PIN Security Strength Checker',
                url: 'https://www.slockhub.com/calculators/pin-strength',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Analyze smart lock PIN code strength and security. Check for common patterns, brute-force resistance, and get recommendations for stronger access codes.',
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
                    { '@type': 'ListItem', position: 3, name: 'PIN Strength Checker', item: 'https://www.slockhub.com/calculators/pin-strength' },
                ],
            }} />
            {children}
        </>
    )
}
