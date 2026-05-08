import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = buildSeoMetadata({
    title: 'Installation Time Estimator - SLockHub.com',
    description: 'Estimate smart lock installation time and labor costs. Factor in door type, wiring requirements, technician count, and labor rates for accurate project planning.',
    canonical: '/calculators/installation-time',
})

export default function InstallationTimeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Installation Time Estimator',
                url: 'https://www.slockhub.com/calculators/installation-time',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Estimate smart lock installation time and labor costs. Factor in door type, wiring requirements, technician count, and labor rates for accurate project planning.',
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
                    { '@type': 'ListItem', position: 3, name: 'Installation Time', item: 'https://www.slockhub.com/calculators/installation-time' },
                ],
            }} />
            {children}
        </>
    )
}
