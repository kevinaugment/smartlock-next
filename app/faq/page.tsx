'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ChevronDown, HelpCircle, Rocket, Lock, Battery,
  Wifi, Wrench, Shield
} from 'lucide-react'
import type { ReactNode } from 'react'

interface FAQItem {
  q: string
  a: string
  link?: { text: string; href: string }
}

interface FAQCategory {
  name: string
  icon: ReactNode
  questions: FAQItem[]
}

const categories: FAQCategory[] = [
  {
    name: 'Getting Started',
    icon: <Rocket className="w-6 h-6" />,
    questions: [
      {
        q: 'What is a smart lock?',
        a: 'A smart lock is an electronic lock that can be controlled remotely and offers features like keyless entry, activity logging, and integration with smart home systems.',
        link: { text: 'Read our getting started guide', href: '/articles/guides' },
      },
      {
        q: 'How do I choose the right smart lock?',
        a: 'Consider factors like your door type, desired protocol (Z-Wave, Zigbee, Wi-Fi, Thread), budget, and smart home ecosystem compatibility.',
        link: { text: 'Try our Protocol Wizard', href: '/calculators/protocol-wizard' },
      },
    ],
  },
  {
    name: 'Protocols & Connectivity',
    icon: <Wifi className="w-6 h-6" />,
    questions: [
      {
        q: 'What is the difference between Z-Wave, Zigbee, and Wi-Fi locks?',
        a: 'Each protocol has different strengths: Z-Wave offers dedicated frequency with minimal interference, Zigbee provides low power consumption with massive node support, and Wi-Fi requires no hub but uses more battery.',
        link: { text: 'See detailed comparison', href: '/compare' },
      },
      {
        q: 'Do I need a smart home hub?',
        a: 'It depends on the protocol. Wi-Fi locks connect directly to your router. Z-Wave and Zigbee locks require a compatible hub. Thread locks need a border router.',
      },
      {
        q: 'What is Matter and how does it affect smart locks?',
        a: 'Matter is a unified connectivity standard backed by major tech companies. It aims to ensure interoperability across brands and ecosystems. Thread-based locks are the most Matter-ready.',
        link: { text: 'Read about Matter', href: '/articles/protocols' },
      },
    ],
  },
  {
    name: 'Battery & Power',
    icon: <Battery className="w-6 h-6" />,
    questions: [
      {
        q: 'How long do smart lock batteries last?',
        a: 'Battery life varies by protocol and usage: Zigbee locks can last up to 18 months, Z-Wave and Thread about 12 months, and Wi-Fi locks typically 6 months.',
        link: { text: 'Calculate your battery life', href: '/calculators/battery-life' },
      },
      {
        q: 'What happens when the battery dies?',
        a: 'Most smart locks have a physical key backup. Some models also support external emergency power via a 9V battery terminal on the exterior.',
      },
    ],
  },
  {
    name: 'Security',
    icon: <Shield className="w-6 h-6" />,
    questions: [
      {
        q: 'Are smart locks safe?',
        a: 'Modern smart locks use strong encryption (AES-128 or higher) and secure communication protocols. They are generally as secure or more secure than traditional locks when properly configured.',
        link: { text: 'Read security analysis', href: '/articles/security' },
      },
      {
        q: 'Can smart locks be hacked?',
        a: 'While no system is 100% immune, reputable smart locks are very difficult to hack. Look for locks with S2 (Z-Wave), AES-128 encryption, and regular firmware updates.',
      },
    ],
  },
  {
    name: 'Installation',
    icon: <Wrench className="w-6 h-6" />,
    questions: [
      {
        q: 'Can I install a smart lock myself?',
        a: 'Most residential smart locks are designed for DIY installation and can replace existing deadbolts in 15-30 minutes using basic tools.',
        link: { text: 'Check door compatibility', href: '/calculators/compatibility' },
      },
      {
        q: 'How much does professional installation cost?',
        a: 'Professional installation typically costs $50-150 per lock for residential, and $150-300 per door for commercial installations.',
        link: { text: 'Estimate installation cost', href: '/calculators/installation-cost' },
      },
    ],
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="page-wrapper-alt">
      <div className="container-main section">
        {/* Header */}
        <div className="page-header">
          <div className="page-header__icon">
            <HelpCircle className="w-10 h-10" />
          </div>
          <h1 className="page-header__title">Frequently Asked Questions</h1>
          <p className="page-header__subtitle">
            Find answers to common questions about smart lock systems
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {categories.map((category) => (
            <div key={category.name} className="card" style={{ padding: 'var(--space-xl)' }}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4" style={{ paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-accent)' }}>{category.icon}</span>
                <h2 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{category.name}</h2>
              </div>

              {/* Questions */}
              <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {category.questions.map((item) => {
                  const key = `${category.name}-${item.q}`
                  const isOpen = openItems[key]

                  return (
                    <div key={item.q}>
                      <button
                        className="accordion-header"
                        onClick={() => toggleItem(key)}
                      >
                        <span className="accordion-header__title">{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          style={{ color: 'var(--color-text-muted)' }}
                        />
                      </button>
                      {isOpen && (
                        <div className="accordion-body">
                          <p className="mb-3">{item.a}</p>
                          {item.link && (
                            <Link
                              href={item.link.href}
                              className="inline-flex items-center gap-1 text-sm font-medium"
                              style={{ color: 'var(--color-accent)' }}
                            >
                              {item.link.text} →
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="cta-section">
            <h2 className="cta-section__title">FAQ, Guides, Calculators</h2>
            <p className="cta-section__subtitle">
              Move from quick answers to setup guides, protocol comparisons, and planning tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/articles" className="btn btn-primary btn-lg">Browse Articles</Link>
              <Link href="/calculators" className="btn btn-secondary btn-lg">Try Calculators</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
