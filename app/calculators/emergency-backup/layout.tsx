import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Emergency Backup Evaluator - Smart Lock Hub',
    description: 'Evaluate your smart lock emergency backup plan. Score your backup readiness across physical keys, PIN codes, mobile app, remote access, and Bluetooth fallback.',
    alternates: { canonical: '/calculators/emergency-backup' },
    openGraph: {
        title: 'Emergency Backup Evaluator - Smart Lock Hub',
        description: 'Evaluate your smart lock emergency backup plan. Score your backup readiness across physical keys, PIN codes, mobile app, remote access, and Bluetooth fallback.',
        siteName: 'Smart Lock Hub',
        type: 'website',
    },
}

export default function EmergencyBackupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Emergency Backup Evaluator',
                url: 'https://smartlockhub.com/calculators/emergency-backup',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Evaluate your smart lock emergency backup plan. Score your backup readiness across physical keys, PIN codes, mobile app, remote access, and Bluetooth fallback.',
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
                    { '@type': 'ListItem', position: 3, name: 'Emergency Backup', item: 'https://smartlockhub.com/calculators/emergency-backup' },
                ],
            }} />
            {children}
        </>
    )
}
