import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Emergency Backup Evaluator - SLockHub.com',
    description: 'Evaluate your smart lock emergency backup plan. Score your backup readiness across physical keys, PIN codes, mobile app, remote access, and Bluetooth fallback.',
    alternates: { canonical: '/calculators/emergency-backup' },
    openGraph: {
        title: 'Emergency Backup Evaluator - SLockHub.com',
        description: 'Evaluate your smart lock emergency backup plan. Score your backup readiness across physical keys, PIN codes, mobile app, remote access, and Bluetooth fallback.',
        siteName: 'SLockHub.com',
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
                url: 'https://www.slockhub.com/calculators/emergency-backup',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Evaluate your smart lock emergency backup plan. Score your backup readiness across physical keys, PIN codes, mobile app, remote access, and Bluetooth fallback.',
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
                    { '@type': 'ListItem', position: 3, name: 'Emergency Backup', item: 'https://www.slockhub.com/calculators/emergency-backup' },
                ],
            }} />
            {children}
        </>
    )
}
