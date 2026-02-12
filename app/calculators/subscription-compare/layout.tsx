import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Subscription vs Purchase Comparison - Smart Lock Hub',
    description: 'Compare long-term costs of cloud subscription vs local smart lock solutions. Calculate break-even point, annual costs, and total cost of ownership over time.',
    alternates: { canonical: '/calculators/subscription-compare' },
    openGraph: {
        title: 'Subscription vs Purchase Comparison - Smart Lock Hub',
        description: 'Compare long-term costs of cloud subscription vs local smart lock solutions. Calculate break-even point, annual costs, and total cost of ownership over time.',
        siteName: 'Smart Lock Hub',
        type: 'website',
    },
}

export default function SubscriptionCompareLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Subscription vs Purchase Comparison',
                url: 'https://smartlockhub.com/calculators/subscription-compare',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Compare long-term costs of cloud subscription vs local smart lock solutions. Calculate break-even point, annual costs, and total cost of ownership over time.',
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
                    { '@type': 'ListItem', position: 3, name: 'Subscription Compare', item: 'https://smartlockhub.com/calculators/subscription-compare' },
                ],
            }} />
            {children}
        </>
    )
}
