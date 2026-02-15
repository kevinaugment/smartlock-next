'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GitCompare, Check, X } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface LockModel {
    id: string
    brand: string
    model: string
    price: number
    protocols: string[]
    batteryLife: number
    maxUsers: number
    grade: string
    features: string[]
    weatherproof: string
    unlockMethods: string[]
}

const lockDatabase: LockModel[] = [
    {
        id: 'yale-assure-2', brand: 'Yale', model: 'Assure Lock 2', price: 230,
        protocols: ['Wi-Fi', 'Bluetooth', 'Matter/Thread'], batteryLife: 9,
        maxUsers: 250, grade: 'ANSI Grade 2',
        features: ['Auto-Lock', 'DoorSense', 'One-Touch Lock', 'Tamper Alert'],
        weatherproof: 'IP44', unlockMethods: ['PIN', 'Key', 'App', 'Card'],
    },
    {
        id: 'schlage-encode-plus', brand: 'Schlage', model: 'Encode Plus', price: 300,
        protocols: ['Wi-Fi', 'Bluetooth', 'HomeKey'], batteryLife: 12,
        maxUsers: 100, grade: 'ANSI Grade 1',
        features: ['Built-in Alarm', 'Auto-Lock', 'Tamper Alert', 'Snap-n-Stay'],
        weatherproof: 'IP55', unlockMethods: ['PIN', 'Key', 'App', 'Apple HomeKey'],
    },
    {
        id: 'august-wifi', brand: 'August', model: 'WiFi Smart Lock', price: 230,
        protocols: ['Wi-Fi', 'Bluetooth'], batteryLife: 6,
        maxUsers: 200, grade: 'ANSI Grade 3',
        features: ['Auto-Lock', 'Auto-Unlock', 'DoorSense', 'Activity Log'],
        weatherproof: 'Indoor', unlockMethods: ['App', 'Voice', 'Key'],
    },
    {
        id: 'kwikset-halo', brand: 'Kwikset', model: 'Halo Touch', price: 200,
        protocols: ['Wi-Fi', 'Bluetooth'], batteryLife: 12,
        maxUsers: 250, grade: 'ANSI Grade 2',
        features: ['SmartKey Security', 'Auto-Lock', 'Fingerprint'],
        weatherproof: 'IP52', unlockMethods: ['Fingerprint', 'PIN', 'Key', 'App'],
    },
    {
        id: 'ultraloq-u-bolt-pro', brand: 'Ultraloq', model: 'U-Bolt Pro WiFi', price: 170,
        protocols: ['Wi-Fi', 'Bluetooth', 'Z-Wave'], batteryLife: 12,
        maxUsers: 200, grade: 'ANSI Grade 2',
        features: ['6-in-1 Unlock', 'Auto-Lock', 'Anti-Peep PIN', 'Magic Shake'],
        weatherproof: 'IP65', unlockMethods: ['Fingerprint', 'PIN', 'Key', 'App', 'NFC', 'Mechanical'],
    },
    {
        id: 'level-bolt', brand: 'Level', model: 'Bolt', price: 200,
        protocols: ['Bluetooth', 'HomeKit/Thread'], batteryLife: 12,
        maxUsers: 50, grade: 'ANSI Grade 2',
        features: ['Invisible Design', 'Auto-Lock', 'Touch to Open'],
        weatherproof: 'Indoor', unlockMethods: ['App', 'Touch', 'Key', 'NFC Card'],
    },
    {
        id: 'aqara-u200', brand: 'Aqara', model: 'U200', price: 190,
        protocols: ['Zigbee', 'Bluetooth', 'Matter/Thread'], batteryLife: 18,
        maxUsers: 100, grade: 'ANSI Grade 2',
        features: ['Auto-Lock', 'Apple HomeKey', 'One-Click Lock', 'Dual Sensors'],
        weatherproof: 'IP65', unlockMethods: ['Fingerprint', 'PIN', 'Key', 'App', 'NFC', 'HomeKey'],
    },
    {
        id: 'betech-k3s', brand: 'Be-Tech', model: 'K3S Smart Lock', price: 150,
        protocols: ['Wi-Fi', 'Bluetooth', 'Zigbee', 'Z-Wave'], batteryLife: 14,
        maxUsers: 300, grade: 'ANSI Grade 1',
        features: ['Multi-Protocol', 'Auto-Lock', 'Audit Trail', 'Anti-Tamper', 'OTA Updates'],
        weatherproof: 'IP65', unlockMethods: ['PIN', 'Card', 'Fingerprint', 'App', 'Key'],
    },
]

export default function LockComparisonTool() {
    const [selected, setSelected] = useState<string[]>(['yale-assure-2', 'schlage-encode-plus'])

    const toggleLock = (id: string) => {
        setSelected(prev => {
            if (prev.includes(id)) return prev.filter(s => s !== id)
            if (prev.length >= 4) return prev
            return [...prev, id]
        })
    }

    const selectedLocks = lockDatabase.filter(l => selected.includes(l.id))
    const allFeatures = [...new Set(selectedLocks.flatMap(l => l.features))]
    const allMethods = [...new Set(selectedLocks.flatMap(l => l.unlockMethods))]

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back</Link>

                <div className="text-center mb-12">
                    <div className="page-header__icon"><GitCompare className="w-14 h-14 mx-auto" /></div>
                    <h1 className="page-header__title">Smart Lock Comparison Tool</h1>
                    <p className="page-header__subtitle">
                        Select 2-4 smart lock models for side-by-side comparison
                    </p>
                </div>

                {/* Lock Selection */}
                <div className="max-w-6xl mx-auto mb-12">
                    <div className="content-card">
                        <h2 className="section-title">Select Models ({selected.length}/4)</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {lockDatabase.map(lock => (
                                <label key={lock.id}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-all ${selected.includes(lock.id)
                                            ? 'ring-2 ring-offset-2'
                                            : ''
                                        }`}
                                    style={{
                                        border: selected.includes(lock.id) ? '2px solid var(--color-accent)' : '2px solid var(--color-border)',
                                        background: selected.includes(lock.id) ? 'var(--color-surface-alt)' : 'transparent',
                                    }}
                                >
                                    <input type="checkbox" checked={selected.includes(lock.id)}
                                        onChange={() => toggleLock(lock.id)} className="sr-only"
                                    />
                                    <span className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{lock.brand}</span>
                                    <span className="text-xs text-center" style={{ color: 'var(--color-text-secondary)' }}>{lock.model}</span>
                                    <span className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>${lock.price}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comparison Table */}
                {selectedLocks.length >= 2 && (
                    <div className="max-w-6xl mx-auto mb-12">
                        <div className="content-card">
                            <h2 className="section-title">Comparison</h2>
                            <div className="overflow-x-auto">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Specification</th>
                                            {selectedLocks.map(l => (
                                                <th key={l.id}>{l.brand} {l.model}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ fontWeight: 600 }}>Price</td>
                                            {selectedLocks.map(l => {
                                                const lowest = Math.min(...selectedLocks.map(s => s.price))
                                                return <td key={l.id} style={{ fontWeight: 600, color: l.price === lowest ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
                                                    ${l.price} {l.price === lowest && '✓'}
                                                </td>
                                            })}
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 600 }}>Security Grade</td>
                                            {selectedLocks.map(l => (
                                                <td key={l.id}><span className="badge badge-accent">{l.grade}</span></td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 600 }}>Protocols</td>
                                            {selectedLocks.map(l => (
                                                <td key={l.id} style={{ fontSize: '0.875rem' }}>{l.protocols.join(', ')}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 600 }}>Battery Life</td>
                                            {selectedLocks.map(l => {
                                                const longest = Math.max(...selectedLocks.map(s => s.batteryLife))
                                                return <td key={l.id} style={{ fontWeight: 600, color: l.batteryLife === longest ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
                                                    {l.batteryLife} months {l.batteryLife === longest && '✓'}
                                                </td>
                                            })}
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 600 }}>Max Users</td>
                                            {selectedLocks.map(l => {
                                                const most = Math.max(...selectedLocks.map(s => s.maxUsers))
                                                return <td key={l.id} style={{ fontWeight: 600, color: l.maxUsers === most ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
                                                    {l.maxUsers} {l.maxUsers === most && '✓'}
                                                </td>
                                            })}
                                        </tr>
                                        <tr>
                                            <td style={{ fontWeight: 600 }}>Weatherproof</td>
                                            {selectedLocks.map(l => (
                                                <td key={l.id}>{l.weatherproof}</td>
                                            ))}
                                        </tr>

                                        {/* Unlock Methods */}
                                        <tr><td colSpan={selectedLocks.length + 1} style={{ fontWeight: 700, background: 'var(--color-surface-alt)' }}>Unlock Methods</td></tr>
                                        {allMethods.map(method => (
                                            <tr key={method}>
                                                <td style={{ fontSize: '0.875rem' }}>{method}</td>
                                                {selectedLocks.map(l => (
                                                    <td key={l.id} className="text-center">
                                                        {l.unlockMethods.includes(method)
                                                            ? <Check className="w-5 h-5 inline-block" style={{ color: 'var(--color-success)' }} />
                                                            : <X className="w-5 h-5 inline-block" style={{ color: 'var(--color-text-muted)' }} />}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}

                                        {/* Features */}
                                        <tr><td colSpan={selectedLocks.length + 1} style={{ fontWeight: 700, background: 'var(--color-surface-alt)' }}>Features</td></tr>
                                        {allFeatures.map(feature => (
                                            <tr key={feature}>
                                                <td style={{ fontSize: '0.875rem' }}>{feature}</td>
                                                {selectedLocks.map(l => (
                                                    <td key={l.id} className="text-center">
                                                        {l.features.includes(feature)
                                                            ? <Check className="w-5 h-5 inline-block" style={{ color: 'var(--color-success)' }} />
                                                            : <X className="w-5 h-5 inline-block" style={{ color: 'var(--color-text-muted)' }} />}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {selectedLocks.length < 2 && (
                    <div className="max-w-4xl mx-auto text-center" style={{ padding: 'var(--space-3xl)', color: 'var(--color-text-muted)' }}>
                        <p className="text-lg">Select at least 2 models to compare</p>
                    </div>
                )}

                <ToolRating toolSlug="lock-compare" />
                <RelatedResources calculatorSlug="lock-compare" />
                <BeTechCalculatorRecommendation
                    description="Be-Tech K3S offers the widest protocol support (Wi-Fi, Bluetooth, Zigbee, Z-Wave) with ANSI Grade 1 certification at a competitive price point — ideal for both residential and commercial deployments."
                    badge="Best Value"
                />

                <div className="max-w-6xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
