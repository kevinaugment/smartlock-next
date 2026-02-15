import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Smart Lock Comparison Tool - SLockHub.com',
    description: 'Compare smart lock models side by side. Evaluate price, protocol, battery life, security grade, and features to find the best smart lock for your needs.',
    alternates: { canonical: '/calculators/lock-compare' },
    openGraph: {
        title: 'Smart Lock Comparison Tool - SLockHub.com',
        description: 'Compare smart lock models side by side. Evaluate price, protocol, battery life, security grade, and features.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

export default function LockCompareLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Smart Lock Comparison Tool',
                url: 'https://www.slockhub.com/calculators/lock-compare',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Compare smart lock models side by side. Evaluate price, protocol, battery life, security grade, and features.',
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
                    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
                    { '@type': 'ListItem', position: 3, name: 'Lock Comparison', item: 'https://www.slockhub.com/calculators/lock-compare' },
                ],
            }} />
            {children}
        </>
    )
}
