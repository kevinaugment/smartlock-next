'use client'

import { useState } from 'react'
import Link from 'next/link'

const categories = [
  {
    name: 'Getting Started',
    icon: '🚀',
    questions: [
      {
        q: 'What is a smart lock?',
        a: 'A smart lock is an electronic lock that can be controlled remotely via smartphone, keypad, fingerprint, or other methods. It replaces or augments traditional mechanical locks with digital access control.',
      },
      {
        q: 'Do I need a hub for my smart lock?',
        a: 'It depends on the protocol. Wi-Fi locks connect directly to your router (no hub needed). Zigbee and Z-Wave locks require a compatible hub. Thread locks need a Thread border router.',
      },
      {
        q: 'How much does a smart lock system cost?',
        a: 'Basic systems start around $150-200 for the lock plus $0-150 for a hub. Premium systems can cost $300-600. Use our TCO Calculator to estimate total ownership costs over time.',
        link: '/calculators/lock-tco',
      },
      {
        q: 'Can I install a smart lock myself?',
        a: 'Most smart locks are designed for DIY installation and can be installed in 15-30 minutes with basic tools. However, if your door requires modification or wiring, professional installation is recommended.',
        link: '/articles/installation',
      },
    ],
  },
  {
    name: 'Technical',
    icon: '⚙️',
    questions: [
      {
        q: 'Which protocol should I choose?',
        a: 'Z-Wave for maximum range and reliability, Zigbee for cost-effectiveness, Wi-Fi for no-hub convenience, Thread for future-proof installations. Use our Protocol Selection Wizard for personalized recommendations.',
        link: '/calculators/protocol-wizard',
      },
      {
        q: 'How long do smart lock batteries last?',
        a: 'Wi-Fi locks: 3-6 months, Zigbee/Z-Wave: 12+ months, Thread: 10+ months. Battery life varies based on usage frequency and features enabled.',
        link: '/calculators/battery-life',
      },
      {
        q: 'What happens if my internet goes down?',
        a: 'Zigbee and Z-Wave locks continue working locally via hub. Wi-Fi locks may lose remote access but keypad/fingerprint still work. Always have a physical key backup.',
        link: '/calculators/offline-resilience',
      },
      {
        q: 'Can smart locks be hacked?',
        a: 'Like any connected device, smart locks have security risks. Choose locks with strong encryption (AES-128+), keep firmware updated, use unique codes, and avoid cheap off-brand devices.',
        link: '/articles/security',
      },
    ],
  },
  {
    name: 'Compatibility',
    icon: '🔧',
    questions: [
      {
        q: 'Will a smart lock fit my door?',
        a: 'Most smart locks fit standard doors (35-45mm thick, 60-70mm backset). Use our Door Compatibility Checker to verify your door specifications.',
        link: '/calculators/compatibility',
      },
      {
        q: 'Can I use my existing keys?',
        a: 'Most smart locks come with new cylinders and keys. Some models allow you to rekey to your existing keys, but this varies by manufacturer.',
      },
      {
        q: 'Do smart locks work with HomeKit/Alexa/Google?',
        a: 'Compatibility varies by lock and protocol. Thread locks work best with HomeKit. Zigbee locks integrate well with SmartThings and Alexa. Check manufacturer specifications.',
        link: '/compare',
      },
    ],
  },
  {
    name: 'Use Cases',
    icon: '🏠',
    questions: [
      {
        q: 'Are smart locks good for Airbnb/VRBO?',
        a: 'Yes! Smart locks are ideal for short-term rentals. Generate unique codes per guest, automate check-in/out, and eliminate key handoffs. Calculate your ROI with our STR Calculator.',
        link: '/calculators/str-roi',
      },
      {
        q: 'Can I manage multiple properties?',
        a: 'Yes. Choose a system with centralized management. Use consistent protocols across properties to simplify maintenance and reduce training costs.',
        link: '/calculators/fleet-planner',
      },
      {
        q: 'Do smart locks work for commercial buildings?',
        a: 'Yes. Commercial-grade smart locks support hundreds of users, audit logs, scheduled access, and integration with enterprise systems.',
        link: '/articles/integration',
      },
    ],
  },
  {
    name: 'Maintenance',
    icon: '🔋',
    questions: [
      {
        q: 'How often do I need to change batteries?',
        a: 'Wi-Fi locks every 3-6 months, mesh protocol locks every 12+ months. Most locks warn you weeks before batteries die. Always keep spare batteries.',
      },
      {
        q: 'What happens when batteries die?',
        a: 'Most smart locks have 9V emergency terminals for external power. Always keep a physical key as ultimate backup.',
        link: '/calculators/emergency-backup',
      },
      {
        q: 'Do smart locks need firmware updates?',
        a: 'Yes. Updates fix bugs, patch security vulnerabilities, and add features. Most locks update via the hub/app. Enable automatic updates when possible.',
      },
      {
        q: 'How do I clean and maintain my smart lock?',
        a: 'Wipe with soft cloth, avoid moisture in electronic components, lubricate mechanical parts annually, check battery contacts for corrosion, test lock operation monthly.',
      },
    ],
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">❓</div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Quick answers to common smart lock questions
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-8">
            {categories.map((category, catIndex) => (
              <div key={category.name} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {category.questions.map((item, qIndex) => {
                      const key = `${catIndex}-${qIndex}`
                      const isOpen = openItems[key]

                      return (
                        <div key={qIndex} className="border-b border-gray-200 pb-4 last:border-0">
                          <button
                            onClick={() => toggleItem(catIndex, qIndex)}
                            className="w-full text-left flex items-start justify-between gap-4 py-2 group"
                          >
                            <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.q}
                            </span>
                            <svg
                              className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {isOpen && (
                            <div className="mt-3 text-gray-700 leading-relaxed">
                              <p>{item.a}</p>
                              {item.link && (
                                <Link
                                  href={item.link}
                                  className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-semibold"
                                >
                                  Learn more →
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg opacity-90 mb-6">
              Explore our comprehensive knowledge base or use our interactive calculators
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Articles
              </Link>
              <Link
                href="/calculators"
                className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
              >
                Try Calculators
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
