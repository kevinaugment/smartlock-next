import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Installation Time Estimator - Smart Lock Hub',
    description: 'Estimate smart lock installation time and labor costs. Factor in door type, wiring requirements, technician count, and labor rates for accurate project planning.',
    alternates: { canonical: '/calculators/installation-time' },
    openGraph: {
        title: 'Installation Time Estimator - Smart Lock Hub',
        description: 'Estimate smart lock installation time and labor costs. Factor in door type, wiring requirements, technician count, and labor rates for accurate project planning.',
        siteName: 'Smart Lock Hub',
        type: 'website',
    },
}

export default function InstallationTimeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Installation Time Estimator',
                url: 'https://smartlockhub.com/calculators/installation-time',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Estimate smart lock installation time and labor costs. Factor in door type, wiring requirements, technician count, and labor rates for accurate project planning.',
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
                    { '@type': 'ListItem', position: 3, name: 'Installation Time', item: 'https://smartlockhub.com/calculators/installation-time' },
                ],
            }} />
            {children}
        </>
    )
}
