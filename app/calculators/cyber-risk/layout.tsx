import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Cyber Risk Scorecard - SLockHub.com',
    description: 'Evaluate the digital attack surface of your smart lock deployment across authentication, encryption, firmware, network, and physical security categories.',
    alternates: { canonical: '/calculators/cyber-risk' },
    openGraph: {
        title: 'Cyber Risk Scorecard - SLockHub.com',
        description: 'Evaluate the digital attack surface of your smart lock deployment across authentication, encryption, firmware, network, and physical security categories.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

export default function CyberRiskLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Cyber Risk Scorecard',
                url: 'https://www.slockhub.com/calculators/cyber-risk',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Evaluate the digital attack surface of your smart lock deployment across authentication, encryption, firmware, network, and physical security categories.',
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
                    { '@type': 'ListItem', position: 3, name: 'Cyber Risk Scorecard', item: 'https://www.slockhub.com/calculators/cyber-risk' },
                ],
            }} />
            {children}
        </>
    )
}
