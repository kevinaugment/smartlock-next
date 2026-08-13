import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Smart Lock Buying Guide | Door Fit, Protocol & Ownership Cost',
    description: 'Choose a smart lock by door compatibility, protocol, battery life, access method, security, installation, and long-term ownership cost.',
    alternates: { canonical: '/resources/buying-guide' },
}

export default function BuyingGuideLayout({ children }: { children: React.ReactNode }) {
    return children
}
