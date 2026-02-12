import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'Smart Lock TCO Calculator - Smart Lock Hub',
    description: 'Calculate total cost of ownership for smart lock deployments. Compare hardware, battery, subscription, and installation costs across protocols over time.',
    alternates: { canonical: '/calculators/lock-tco' },
    openGraph: {
        title: 'Smart Lock TCO Calculator - Smart Lock Hub',
        description: 'Calculate total cost of ownership for smart lock deployments. Compare hardware, battery, subscription, and installation costs across protocols over time.',
        siteName: 'Smart Lock Hub',
        type: 'website',
    },
}

export default function LockTCOLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Smart Lock TCO Calculator',
                url: 'https://smartlockhub.com/calculators/lock-tco',
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Web',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Calculate total cost of ownership for smart lock deployments. Compare hardware, battery, subscription, and installation costs across protocols over time.',
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
                    { '@type': 'ListItem', position: 3, name: 'TCO Calculator', item: 'https://smartlockhub.com/calculators/lock-tco' },
                ],
            }} />
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                name: 'How to Calculate Smart Lock Total Cost of Ownership',
                description: 'Use our TCO calculator to compare long-term costs of smart lock deployments including hardware, batteries, subscriptions, and maintenance.',
                totalTime: 'PT5M',
                step: [
                    { '@type': 'HowToStep', position: 1, name: 'Select Lock Type', text: 'Choose between Wi-Fi, Z-Wave, Zigbee, or Bluetooth smart lock models.' },
                    { '@type': 'HowToStep', position: 2, name: 'Set Deployment Size', text: 'Enter the number of doors and buildings in your deployment.' },
                    { '@type': 'HowToStep', position: 3, name: 'Configure Costs', text: 'Adjust hardware price, battery replacement frequency, and subscription fees.' },
                    { '@type': 'HowToStep', position: 4, name: 'Set Time Horizon', text: 'Choose a 3, 5, or 10-year projection period for TCO analysis.' },
                    { '@type': 'HowToStep', position: 5, name: 'Compare Results', text: 'Review the cost breakdown chart showing hardware, recurring, and hidden costs over time.' },
                ],
            }} />
            {children}
        </>
    )
}
