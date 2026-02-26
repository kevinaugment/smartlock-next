import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Privacy & Data Compliance Evaluator - SLockHub.com',
    description: 'Assess smart lock privacy compliance with GDPR, CCPA, and biometric data laws. Evaluate data collection practices, storage policies, and user consent mechanisms.',
    alternates: { canonical: '/calculators/privacy-compliance' },
    openGraph: {
        title: 'Privacy & Data Compliance Evaluator - SLockHub.com',
        description: 'Assess smart lock privacy compliance with GDPR, CCPA, and biometric data laws. Evaluate data collection practices, storage policies, and user consent mechanisms.',
        siteName: 'SLockHub.com',
        type: 'website',
    },
}

export default function PrivacyComplianceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Privacy & Data Compliance Evaluator',
                url: 'https://www.slockhub.com/calculators/privacy-compliance',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Assess smart lock privacy compliance with GDPR, CCPA, and biometric data laws. Evaluate data collection practices, storage policies, and user consent mechanisms.',
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
                    { '@type': 'ListItem', position: 3, name: 'Privacy Compliance', item: 'https://www.slockhub.com/calculators/privacy-compliance' },
                ],
            }} />
            {children}
        </>
    )
}
