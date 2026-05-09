'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GitFork, ArrowLeft, RotateCcw } from 'lucide-react'

/* ──────────────────────────── types ──────────────────────────── */
interface FlowNode {
    id: string
    type: 'question' | 'answer' | 'start'
    text: string
    subtext?: string
    options?: { label: string; target: string }[]
    link?: string
}

/* ──────────────────────────── Protocol Flowchart Data ──────────── */
const protocolFlow: FlowNode[] = [
    {
        id: 'start',
        type: 'start',
        text: 'Which smart lock protocol is right for you?',
        subtext: 'Answer a few questions to find your ideal wireless protocol',
        options: [{ label: 'Start →', target: 'q1' }],
    },
    {
        id: 'q1',
        type: 'question',
        text: 'Do you already have a smart home hub?',
        subtext: '(SmartThings, Hubitat, HomePod, etc.)',
        options: [
            { label: 'Yes — Z-Wave/Zigbee hub', target: 'q2-hub' },
            { label: 'Yes — Apple Home / Google Home', target: 'q2-matter' },
            { label: 'No hub — want simple setup', target: 'q2-nohub' },
        ],
    },
    {
        id: 'q2-hub',
        type: 'question',
        text: 'What matters most to you?',
        options: [
            { label: 'Longest range & reliability', target: 'ans-zwave' },
            { label: 'Largest device network (65K+)', target: 'ans-zigbee' },
            { label: 'Future-proof (Matter ready)', target: 'ans-thread' },
        ],
    },
    {
        id: 'q2-matter',
        type: 'question',
        text: 'Do you have a Thread Border Router?',
        subtext: '(HomePod Mini, Google Nest Hub, etc.)',
        options: [
            { label: 'Yes — I have one', target: 'ans-thread' },
            { label: 'No — but I want future-proof', target: 'ans-thread' },
            { label: 'I just want it to work now', target: 'ans-wifi' },
        ],
    },
    {
        id: 'q2-nohub',
        type: 'question',
        text: 'How important is battery life?',
        options: [
            { label: 'Very important (12+ months)', target: 'q3-battery' },
            { label: 'Less important — prefer features', target: 'ans-wifi' },
            { label: 'Phone-only access is fine', target: 'ans-ble' },
        ],
    },
    {
        id: 'q3-battery',
        type: 'question',
        text: 'Will you have many smart devices?',
        options: [
            { label: 'Yes — building smart home', target: 'ans-thread' },
            { label: 'No — just the lock', target: 'ans-ble' },
        ],
    },
    // ── Answers ──
    {
        id: 'ans-zwave',
        type: 'answer',
        text: '🏆 Z-Wave',
        subtext: 'Best for: Reliable home automation with dedicated frequency (908 MHz). Up to 232 devices, excellent range of 30-40m indoor. Requires Z-Wave hub.',
        link: '/compare',
    },
    {
        id: 'ans-zigbee',
        type: 'answer',
        text: '🏆 Zigbee 3.0',
        subtext: 'Best for: Large deployments with 65,000+ device capacity. Very low power consumption. Great for enterprise and multi-room setups. Requires Zigbee hub.',
        link: '/compare',
    },
    {
        id: 'ans-thread',
        type: 'answer',
        text: '🏆 Thread / Matter',
        subtext: 'Best for: Future-proof setups. IPv6-based mesh network, Matter interoperability across Apple/Google/Amazon. Requires Thread Border Router.',
        link: '/compare',
    },
    {
        id: 'ans-wifi',
        type: 'answer',
        text: '🏆 Wi-Fi',
        subtext: 'Best for: Simplest setup — connects directly to your router. Remote access without a hub. Trade-off: shorter battery life (3-6 months).',
        link: '/compare',
    },
    {
        id: 'ans-ble',
        type: 'answer',
        text: '🏆 Bluetooth (BLE)',
        subtext: 'Best for: Basic phone-to-lock access. Longest battery life (12-24 months). No hub needed. Limited to phone proximity only (no remote access without bridge).',
        link: '/compare',
    },
]

/* ──────────────────────────── Lock Type Flowchart Data ──────────── */
const lockTypeFlow: FlowNode[] = [
    {
        id: 'start',
        type: 'start',
        text: 'What type of smart lock do you need?',
        subtext: 'Find the right lock form factor for your door and use case',
        options: [{ label: 'Start →', target: 'q1' }],
    },
    {
        id: 'q1',
        type: 'question',
        text: 'What kind of door is it?',
        options: [
            { label: 'Standard entry door (exterior)', target: 'q2-entry' },
            { label: 'Interior room door', target: 'q2-interior' },
            { label: 'Commercial / office door', target: 'q2-commercial' },
            { label: 'Gate, shed, or storage', target: 'ans-padlock' },
        ],
    },
    {
        id: 'q2-entry',
        type: 'question',
        text: 'Do you want to keep your existing deadbolt?',
        options: [
            { label: 'Yes — keep my mechanical lock', target: 'ans-retrofit' },
            { label: 'No — replace everything', target: 'q3-replace' },
        ],
    },
    {
        id: 'q3-replace',
        type: 'question',
        text: 'What security level do you need?',
        options: [
            { label: 'Maximum (ANSI Grade 1)', target: 'ans-deadbolt-g1' },
            { label: 'Standard residential', target: 'ans-deadbolt' },
        ],
    },
    {
        id: 'q2-interior',
        type: 'question',
        text: 'Is ADA compliance required?',
        subtext: '(Lever handle required for accessibility)',
        options: [
            { label: 'Yes — needs ADA lever', target: 'ans-lever' },
            { label: 'No — any handle style', target: 'ans-knob' },
        ],
    },
    {
        id: 'q2-commercial',
        type: 'question',
        text: 'Is it a fire-rated door?',
        options: [
            { label: 'Yes — fire-rated required', target: 'ans-mortise' },
            { label: 'No — standard commercial', target: 'q3-commercial' },
        ],
    },
    {
        id: 'q3-commercial',
        type: 'question',
        text: 'Preferred installation method?',
        options: [
            { label: 'Battery-powered (wireless)', target: 'ans-deadbolt-g1' },
            { label: 'Hardwired (PoE / 12V)', target: 'ans-mortise' },
        ],
    },
    // ── Answers ──
    {
        id: 'ans-retrofit',
        type: 'answer',
        text: '🏆 Retrofit Smart Module',
        subtext: 'Installs over your existing deadbolt. Easiest DIY — under 10 minutes. Examples: August, Yale Approach. Keeps your physical keys as backup.',
        link: '/calculators/installation-time',
    },
    {
        id: 'ans-deadbolt',
        type: 'answer',
        text: '🏆 Smart Deadbolt',
        subtext: 'Complete deadbolt replacement with keypad, touchscreen, or fingerprint reader. ANSI Grade 2. Best value for residential security. 15-30 min install.',
        link: '/calculators/compatibility',
    },
    {
        id: 'ans-deadbolt-g1',
        type: 'answer',
        text: '🏆 Grade 1 Smart Deadbolt',
        subtext: 'Commercial-grade security. 800,000 cycle endurance. Examples: Schlage Encode Plus, Yale Assure Lock 2 Plus. Higher price point but maximum durability.',
        link: '/calculators/lock-tco',
    },
    {
        id: 'ans-lever',
        type: 'answer',
        text: '🏆 Smart Lever Handle',
        subtext: 'ADA-compliant lever operation. Ideal for interior doors, offices, and accessible buildings. Can be combined with separate deadbolt for exterior doors.',
        link: '/calculators/installation-cost',
    },
    {
        id: 'ans-knob',
        type: 'answer',
        text: '🏆 Smart Knob Lock',
        subtext: 'Electronic knob for interior room access control. Basic security tier. Good for bedrooms, home offices, or storage rooms where privacy is needed.',
        link: '/calculators/installation-cost',
    },
    {
        id: 'ans-mortise',
        type: 'answer',
        text: '🏆 Smart Mortise Lock',
        subtext: 'Heavy-duty commercial-grade. Installed in mortise pocket within door edge. Fire-rated options available. Requires locksmith or installer setup. $300-800+.',
        link: '/calculators/installation-cost',
    },
    {
        id: 'ans-padlock',
        type: 'answer',
        text: '🏆 Smart Padlock',
        subtext: 'Bluetooth or Wi-Fi enabled padlock for gates, sheds, storage units, and toolboxes. No door preparation needed. Examples: Master Lock Bluetooth, Igloo Smart.',
        link: '/calculators/battery-life',
    },
]

/* ──────────────────────────── Interactive Flowchart Component ──── */
function InteractiveFlowchart({
    data,
    title,
}: {
    data: FlowNode[]
    title: string
}) {
    const [history, setHistory] = useState<string[]>(['start'])

    const currentId = history[history.length - 1]
    const currentNode = data.find(n => n.id === currentId)

    const handleOption = (targetId: string) => {
        setHistory(prev => [...prev, targetId])
    }

    const handleBack = () => {
        if (history.length > 1) {
            setHistory(prev => prev.slice(0, -1))
        }
    }

    const handleReset = () => {
        setHistory(['start'])
    }

    if (!currentNode) return null

    const isAnswer = currentNode.type === 'answer'
    const isStart = currentNode.type === 'start'

    return (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Progress bar */}
            <div style={{ height: '4px', background: 'var(--color-border)' }}>
                <div
                    style={{
                        height: '100%',
                        width: isAnswer ? '100%' : `${(history.length / 5) * 100}%`,
                        background: isAnswer ? 'var(--color-success)' : 'var(--color-accent)',
                        transition: 'width 0.3s ease',
                        maxWidth: '100%',
                    }}
                />
            </div>

            {/* Breadcrumb trail */}
            {history.length > 1 && (
                <div className="px-6 pt-4 flex items-center gap-2 flex-wrap">
                    {history.map((id, i) => {
                        const node = data.find(n => n.id === id)
                        if (!node) return null
                        return (
                            <span key={i} className="flex items-center gap-2">
                                {i > 0 && <span style={{ color: 'var(--color-text-muted)' }}>→</span>}
                                <span
                                    className="text-xs px-2 py-0.5 rounded"
                                    style={{
                                        background: i === history.length - 1 ? 'var(--color-accent-subtle)' : 'var(--color-bg-alt)',
                                        color: i === history.length - 1 ? 'var(--color-accent-text)' : 'var(--color-text-muted)',
                                        fontWeight: i === history.length - 1 ? 600 : 400,
                                    }}
                                >
                                    {node.type === 'start' ? 'Start' : node.type === 'answer' ? node.text.replace('🏆 ', '') : `Q${i}`}
                                </span>
                            </span>
                        )
                    })}
                </div>
            )}

            {/* Node Content */}
            <div className="p-6 md:p-8" style={{ minHeight: '220px' }}>
                {/* Question/Answer icon */}
                <div className="flex items-start gap-4 mb-6">
                    <div
                        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl"
                        style={{
                            background: isAnswer ? 'var(--color-success-subtle)' : isStart ? 'var(--color-accent-subtle)' : 'var(--color-bg-alt)',
                            border: `2px solid ${isAnswer ? 'var(--color-success)' : isStart ? 'var(--color-accent)' : 'var(--color-border)'}`,
                        }}
                    >
                        {isAnswer ? '✓' : isStart ? '🔒' : '?'}
                    </div>
                    <div className="flex-1">
                        <h3
                            className="text-xl font-bold mb-2"
                            style={{ color: 'var(--color-text-primary)' }}
                        >
                            {currentNode.text}
                        </h3>
                        {currentNode.subtext && (
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                {currentNode.subtext}
                            </p>
                        )}
                    </div>
                </div>

                {/* Options */}
                {currentNode.options && (
                    <div className="space-y-3 ml-16">
                        {currentNode.options.map(opt => (
                            <button
                                key={opt.target}
                                onClick={() => handleOption(opt.target)}
                                className="w-full text-left px-5 py-3.5 rounded-lg text-sm font-medium transition-all"
                                style={{
                                    background: 'var(--color-surface)',
                                    border: '1.5px solid var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={e => {
                                    (e.target as HTMLElement).style.borderColor = 'var(--color-accent)'
                                        ; (e.target as HTMLElement).style.background = 'var(--color-accent-subtle)'
                                }}
                                onMouseLeave={e => {
                                    (e.target as HTMLElement).style.borderColor = 'var(--color-border)'
                                        ; (e.target as HTMLElement).style.background = 'var(--color-surface)'
                                }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Answer: link to tool */}
                {isAnswer && currentNode.link && (
                    <div className="ml-16 mt-6 flex flex-wrap gap-3">
                        <Link href={currentNode.link} className="btn btn-primary" prefetch={false}>
                            Explore This Option →
                        </Link>
                        <button
                            onClick={handleReset}
                            className="btn btn-secondary"
                            style={{ cursor: 'pointer' }}
                        >
                            <RotateCcw className="w-4 h-4" />
                            Start Over
                        </button>
                    </div>
                )}
            </div>

            {/* Navigation footer */}
            {!isStart && !isAnswer && (
                <div className="px-6 pb-4 flex justify-between items-center">
                    <button
                        onClick={handleBack}
                        className="text-sm font-medium flex items-center gap-1 transition-colors"
                        style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        ← Back
                    </button>
                    <button
                        onClick={handleReset}
                        className="text-sm font-medium flex items-center gap-1 transition-colors"
                        style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset
                    </button>
                </div>
            )}
        </div>
    )
}

/* ──────────────────────────── Visual Static Flowchart SVG ──────── */
function ProtocolOverviewSVG() {
    return (
        <svg viewBox="0 0 700 280" className="w-full h-auto" role="img" aria-label="Protocol decision overview flowchart">
            {/* Center question */}
            <rect x="250" y="10" width="200" height="50" rx="25" fill="var(--color-accent)" stroke="var(--color-accent-hover)" strokeWidth="2" />
            <text x="350" y="38" fill="white" fontSize="12" fontWeight="700" textAnchor="middle">Choose Your Protocol</text>

            {/* Branches */}
            {[
                { x: 40, label: 'Z-Wave', sub: '908 MHz | Hub', color: '#2563eb', y: 140 },
                { x: 195, label: 'Zigbee', sub: '2.4 GHz | Hub', color: '#059669', y: 140 },
                { x: 350, label: 'Thread', sub: '2.4 GHz | BR', color: '#ea580c', y: 140 },
                { x: 505, label: 'Wi-Fi', sub: '2.4/5G | Direct', color: '#7c3aed', y: 140 },
                { x: 630, label: 'BLE', sub: '2.4 GHz | Direct', color: '#0891b2', y: 140 },
            ].map((item, i) => (
                <g key={item.label}>
                    {/* Connector line */}
                    <line x1="350" y1="60" x2={item.x + 35} y2={item.y - 10} stroke="var(--color-border-strong)" strokeWidth="1.5" />
                    {/* Node */}
                    <rect x={item.x} y={item.y} width="70" height="40" rx="6" fill="var(--color-surface)" stroke={item.color} strokeWidth="2" />
                    <text x={item.x + 35} y={item.y + 20} fill={item.color} fontSize="11" fontWeight="700" textAnchor="middle">{item.label}</text>
                    <text x={item.x + 35} y={item.y + 34} fill="var(--color-text-muted)" fontSize="8" textAnchor="middle">{item.sub}</text>

                    {/* Feature tags */}
                    {[
                        ['Range', 'Battery', 'Mesh'],
                        ['Mesh', 'Nodes', 'Low Power'],
                        ['IPv6', 'Matter', 'Mesh'],
                        ['Simple', 'Remote', 'No Hub'],
                        ['Phone', 'Low Power', 'Setup'],
                    ][i].map((tag, j) => (
                        <g key={tag} transform={`translate(${item.x - 5}, ${item.y + 55 + j * 22})`}>
                            <rect x="0" y="0" width="80" height="18" rx="9" fill="var(--color-bg-alt)" stroke="var(--color-border)" strokeWidth="0.5" />
                            <text x="40" y="13" fill="var(--color-text-secondary)" fontSize="8" fontWeight="500" textAnchor="middle">{tag}</text>
                        </g>
                    ))}
                </g>
            ))}
        </svg>
    )
}

/* ──────────────────────────── page component ──────────────────── */
export default function BuyingGuidePage() {
    return (
        <div className="page-wrapper-alt">
            <div className="container-main section">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link href="/resources" prefetch={false}>Resources</Link>
                    <span className="breadcrumb__separator">/</span>
                    <span className="breadcrumb__current">Buying Guide</span>
                </nav>

                {/* Header */}
                <div className="page-header">
                    <div className="page-header__icon">
                        <GitFork className="w-10 h-10" />
                    </div>
                    <h1 className="page-header__title">Smart Lock Buying Guide</h1>
                    <p className="page-header__subtitle">
                        Interactive decision flowcharts to help you choose the right protocol and lock type for your needs
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-16">

                    {/* Protocol Overview Diagram */}
                    <section>
                        <h2 className="section-title">Protocol Range, Battery, Hubs</h2>
                        <div className="card" style={{ padding: 'var(--space-lg)', overflow: 'auto' }}>
                            <ProtocolOverviewSVG />
                        </div>
                    </section>

                    {/* Interactive: Protocol Selection */}
                    <section>
                        <h2 className="section-title">Protocol Selection Wizard</h2>
                        <p className="mb-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Answer 2-3 questions to find the ideal wireless protocol for your smart lock setup.
                        </p>
                        <InteractiveFlowchart data={protocolFlow} title="Protocol Selection" />
                    </section>

                    {/* Interactive: Lock Type Selection */}
                    <section>
                        <h2 className="section-title">Lock Type Selection Wizard</h2>
                        <p className="mb-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            Find the right lock form factor based on your door type, security needs, and installation preferences.
                        </p>
                        <InteractiveFlowchart data={lockTypeFlow} title="Lock Type Selection" />
                    </section>
                </div>

                {/* CTA Section */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="cta-section">
                        <h2 className="cta-section__title">Brands, Models, Comparisons</h2>
                        <p className="cta-section__subtitle">
                            Compare brands, model specs, protocols, door fit, and price before shortlisting a lock.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/brands" className="btn btn-primary btn-lg" prefetch={false}>Browse Brands</Link>
                            <Link href="/resources" className="btn btn-secondary btn-lg" prefetch={false}>
                                <ArrowLeft className="w-4 h-4" /> All Resources
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
