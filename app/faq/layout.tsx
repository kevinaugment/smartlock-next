import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
    title: 'FAQ - SLockHub.com',
    description: 'Frequently asked questions about smart lock systems — protocols, battery life, security, installation, and more.',
    alternates: { canonical: '/faq' },
}

const faqItems = [
    { q: 'What is a smart lock?', a: 'A smart lock is an electronic lock that can be controlled remotely and offers features like keyless entry, activity logging, and integration with smart home systems.' },
    { q: 'How do I choose the right smart lock?', a: 'Consider factors like your door type, desired protocol (Z-Wave, Zigbee, Wi-Fi, Thread), budget, and smart home ecosystem compatibility.' },
    { q: 'What is the difference between Z-Wave, Zigbee, and Wi-Fi locks?', a: 'Each protocol has different strengths: Z-Wave offers dedicated frequency with minimal interference, Zigbee provides low power consumption with massive node support, and Wi-Fi requires no hub but uses more battery.' },
    { q: 'Do I need a smart home hub?', a: 'It depends on the protocol. Wi-Fi locks connect directly to your router. Z-Wave and Zigbee locks require a compatible hub. Thread locks need a border router.' },
    { q: 'What is Matter and how does it affect smart locks?', a: 'Matter is a unified connectivity standard backed by major tech companies. It aims to ensure interoperability across brands and ecosystems. Thread-based locks are the most Matter-ready.' },
    { q: 'How long do smart lock batteries last?', a: 'Battery life varies by protocol and usage: Zigbee locks can last up to 18 months, Z-Wave and Thread about 12 months, and Wi-Fi locks typically 6 months.' },
    { q: 'What happens when the battery dies?', a: 'Most smart locks have a physical key backup. Some models also support external emergency power via a 9V battery terminal on the exterior.' },
    { q: 'Are smart locks safe?', a: 'Modern smart locks use strong encryption (AES-128 or higher) and secure communication protocols. They are generally as secure or more secure than traditional locks when properly configured.' },
    { q: 'Can smart locks be hacked?', a: 'While no system is 100% immune, reputable smart locks are very difficult to hack. Look for locks with S2 (Z-Wave), AES-128 encryption, and regular firmware updates.' },
    { q: 'Can I install a smart lock myself?', a: 'Most residential smart locks are designed for DIY installation and can replace existing deadbolts in 15-30 minutes using basic tools.' },
    { q: 'How much does professional installation cost?', a: 'Professional installation typically costs $50-150 per lock for residential, and $150-300 per door for commercial installations.' },
]

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={{
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqItems.map((item) => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.a,
                    },
                })),
            }} />
            {children}
        </>
    )
}
