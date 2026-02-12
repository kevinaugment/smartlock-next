import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Multi-Property Fleet Planner - Smart Lock Hub',
    description: 'Analyze protocol fragmentation across your property portfolio. Calculate unification costs, maintenance savings, and payback period for fleet standardization.',
    alternates: { canonical: '/calculators/fleet-planner' },
    openGraph: {
        title: 'Multi-Property Fleet Planner - Smart Lock Hub',
        description: 'Analyze protocol fragmentation across your property portfolio. Calculate unification costs, maintenance savings, and payback period for fleet standardization.',
        siteName: 'Smart Lock Hub',
        type: 'website',
    },
}

export default function FleetPlannerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Multi-Property Fleet Planner',
                url: 'https://smartlockhub.com/calculators/fleet-planner',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Analyze protocol fragmentation across your property portfolio. Calculate unification costs, maintenance savings, and payback period for fleet standardization.',
                softwareVersion: '1.0',
                datePublished: '2025-11-24',
                creator: { '@type': 'Organization', name: 'Smart Lock Hub', url: 'https://smartlockhub.com' },
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartlockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://smartlockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Fleet Planner', item: 'https://smartlockhub.com/calculators/fleet-planner' },
                ],
            }} />
            {children}
        </>
    )
}
