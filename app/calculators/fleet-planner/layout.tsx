import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Smart Lock Fleet Planner | Multi-Property Protocol & Cost Tool',
    description: 'Plan multi-property smart lock fleets by protocol fragmentation, standardization cost, maintenance savings, user capacity, and payback period.',
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
                description: 'Plan multi-property smart lock fleets by protocol fragmentation, cost, maintenance savings, and payback period.',
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
