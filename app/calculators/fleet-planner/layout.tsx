import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Multi-Property Fleet Planner - SLockHub.com',
    description: 'Analyze protocol fragmentation across your property portfolio. Calculate unification costs, maintenance savings, and payback period for fleet standardization.',
    canonical: '/calculators/fleet-planner',
})

export default function FleetPlannerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Multi-Property Fleet Planner',
                url: 'https://www.slockhub.com/calculators/fleet-planner',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Analyze protocol fragmentation across your property portfolio. Calculate unification costs, maintenance savings, and payback period for fleet standardization.',
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
                    { '@type': 'ListItem', position: 3, name: 'Fleet Planner', item: 'https://www.slockhub.com/calculators/fleet-planner' },
                ],
            }} />
            {children}
        </>
    )
}
