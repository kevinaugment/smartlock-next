'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Zap, DollarSign, Leaf, Info, Sun } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

const PROTOCOL_POWER: Record<string, { active: number; standby: number; label: string }> = {
    'ble': { active: 0.1, standby: 0.01, label: 'Bluetooth Low Energy' },
    'zigbee': { active: 0.15, standby: 0.02, label: 'Zigbee' },
    'zwave': { active: 0.2, standby: 0.03, label: 'Z-Wave' },
    'wifi': { active: 1.5, standby: 0.3, label: 'Wi-Fi' },
    'thread': { active: 0.12, standby: 0.015, label: 'Thread / Matter' },
}

export default function EnergyCostCalculator() {
    const faqs = [
        {
            question: 'How much electricity does an electric lock use?',
            answer: 'Electric lock energy use depends on standby draw, active motor or strike time, access frequency, hubs, and whether the lock is battery, PoE, or hardwired. Small per-lock usage can still matter across large fleets.',
        },
        {
            question: 'Are maglocks expensive to run?',
            answer: 'Maglocks can cost more to operate because many are energized continuously while locked. Their true cost depends on wattage, duty cycle, electricity rate, power supply efficiency, and whether fail-safe operation is required.',
        },
        {
            question: 'What affects access control energy cost?',
            answer: 'The main factors are protocol standby draw, lock motor time, electric strike or maglock duty cycle, hub power, PoE switch losses, battery replacement cost, local electricity rate, and total door count.',
        },
        {
            question: 'Do fail-safe locks use more power?',
            answer: 'Often yes. Some fail-safe devices consume power to remain locked and release when power is lost. Fail-secure devices may draw power only during unlock, but egress and fire code requirements decide what is allowed.',
        },
        {
            question: 'How do I reduce lock power cost?',
            answer: 'Use low-power protocols, reduce unnecessary Wi-Fi activity, tune auto-lock behavior, maintain door alignment, choose efficient hubs, schedule firmware updates, and compare battery replacement cost against PoE or hardwired operation.',
        },
    ]

    const [lockCount, setLockCount] = useState(10)
    const [powerSource, setPowerSource] = useState<'battery' | 'poe' | 'hardwired'>('battery')
    const [protocol, setProtocol] = useState('wifi')
    const [dailyOps, setDailyOps] = useState(20)
    const [opDurationSec, setOpDurationSec] = useState(5)
    const [electricityRate, setElectricityRate] = useState(0.15) // $/kWh
    const [hubCount, setHubCount] = useState(1)
    const [hubPower, setHubPower] = useState(5) // watts

    const result = useMemo(() => {
        const proto = PROTOCOL_POWER[protocol]

        // Per lock daily energy (Wh)
        const activeHoursPerDay = (dailyOps * opDurationSec) / 3600
        const standbyHoursPerDay = 24 - activeHoursPerDay
        const lockDailyWh = (proto.active * activeHoursPerDay + proto.standby * standbyHoursPerDay)

        // Add motorized lock power (deadbolt motor: ~2W for ~1s per op)
        const motorWh = (dailyOps * 2 * 1) / 3600

        // Total per lock per day
        const totalLockDailyWh = lockDailyWh + motorWh

        // Hub energy
        const hubDailyWh = hubCount * hubPower * 24

        // Fleet totals
        const fleetDailyWh = (totalLockDailyWh * lockCount) + hubDailyWh
        const fleetAnnualKwh = (fleetDailyWh * 365) / 1000

        // Battery-specific: calculate cost from battery replacements instead
        let annualCost: number
        let batteryReplacements = 0
        if (powerSource === 'battery') {
            // AA batteries: ~3000mAh × 1.5V = 4.5Wh per battery, 4 batteries per lock
            const batteryCapacityWh = 4 * 4.5 // 18 Wh
            const daysPerSet = batteryCapacityWh / totalLockDailyWh
            batteryReplacements = Math.ceil(365 / daysPerSet)
            const batteryCostPerSet = 4 * 0.75 // $0.75 per AA
            annualCost = batteryReplacements * batteryCostPerSet * lockCount
            // Add hub electricity
            annualCost += (hubDailyWh * 365 / 1000) * electricityRate
        } else {
            annualCost = fleetAnnualKwh * electricityRate
        }

        const fiveYearCost = annualCost * 5

        // Solar panel sizing (for off-grid context)
        const dailyKwh = fleetDailyWh / 1000
        const solarWatts = Math.ceil((dailyKwh / 4) * 1000) // 4 peak sun hours

        // Traditional lock comparison (zero energy)
        const traditionalAnnualCost = 0

        // CO2 estimation (US grid: 0.42 kg CO2/kWh)
        const annualCO2kg = fleetAnnualKwh * 0.42

        return {
            perLockDailyWh: totalLockDailyWh,
            fleetDailyWh,
            fleetAnnualKwh: Math.round(fleetAnnualKwh * 100) / 100,
            annualCost: Math.round(annualCost * 100) / 100,
            fiveYearCost: Math.round(fiveYearCost * 100) / 100,
            monthlyCost: Math.round((annualCost / 12) * 100) / 100,
            perLockAnnualCost: Math.round((annualCost / lockCount) * 100) / 100,
            solarWatts,
            batteryReplacements,
            traditionalAnnualCost,
            annualCO2kg: Math.round(annualCO2kg * 10) / 10,
            protocolLabel: proto.label,
        }
    }, [lockCount, powerSource, protocol, dailyOps, opDurationSec, electricityRate, hubCount, hubPower])

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back to Calculators</Link>

                <div className="page-header">
                    <div className="page-header__icon"><Zap className="w-14 h-14" /></div>
                    <h1 className="text-4xl font-bold mb-4">Energy Cost Calculator</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                        Calculate the ongoing energy cost of your smart lock deployment
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <CalculatorAnswerBlock
                        title="How do you estimate smart lock energy cost?"
                        answer="Smart lock energy cost is the annual cost of lock standby power, active motor time, hubs, PoE or hardwired power, and battery replacements. Battery locks often cost more in replacement labor and cells than in electricity, while hardwired strikes and maglocks should be checked for continuous draw and duty cycle."
                    />
                </div>

                <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="callout callout-info">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                            <div>
                                <h2 className="font-bold mb-1" style={{ fontSize: '1rem' }}>Beyond Battery Life</h2>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    This tool calculates the <strong>actual running cost</strong> of your smart lock fleet — including electricity for PoE/hardwired locks,
                                    battery replacement costs, hub energy, and even solar panel sizing for off-grid installations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                            <h2 className="text-2xl font-bold mb-6">System Configuration</h2>
                            <div className="space-y-6">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Number of Locks: {lockCount}
                                    </label>
                                    <input type="range" min={1} max={200} value={lockCount}
                                        onChange={(e) => setLockCount(Number(e.target.value))}
                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}><span>1</span><span>200</span></div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Power Source
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {([
                                            { value: 'battery', label: 'Battery (AA/CR)' },
                                            { value: 'poe', label: 'Power over Ethernet' },
                                            { value: 'hardwired', label: 'Hardwired (AC)' },
                                        ] as const).map(opt => (
                                            <button key={opt.value} onClick={() => setPowerSource(opt.value)} type="button"
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all text-center"
                                                style={{
                                                    borderColor: powerSource === opt.value ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: powerSource === opt.value ? 'var(--color-accent-subtle)' : 'white',
                                                    color: powerSource === opt.value ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}>
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Wireless Protocol
                                    </label>
                                    <select value={protocol} onChange={(e) => setProtocol(e.target.value)}
                                        className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                        {Object.entries(PROTOCOL_POWER).map(([k, v]) => (
                                            <option key={k} value={k}>{v.label} — Active: {v.active}W / Standby: {v.standby}W</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Daily Lock/Unlock Operations: {dailyOps}
                                        </label>
                                        <input type="range" min={1} max={200} value={dailyOps}
                                            onChange={(e) => setDailyOps(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                        <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}><span>1/day</span><span>200/day</span></div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Operation Duration: {opDurationSec}s
                                        </label>
                                        <input type="range" min={1} max={30} value={opDurationSec}
                                            onChange={(e) => setOpDurationSec(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                        <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}><span>1s</span><span>30s</span></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Electricity Rate: ${electricityRate}/kWh
                                        </label>
                                        <input type="range" min={0.05} max={0.50} step={0.01} value={electricityRate}
                                            onChange={(e) => setElectricityRate(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Hubs/Bridges: {hubCount}
                                        </label>
                                        <input type="range" min={0} max={10} value={hubCount}
                                            onChange={(e) => setHubCount(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Hub Power: {hubPower}W each
                                        </label>
                                        <input type="range" min={1} max={15} value={hubPower}
                                            onChange={(e) => setHubPower(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-1">
                        <div className="result-panel result-panel--grade-c">
                            <h2 className="text-xl font-bold mb-6">Energy Cost</h2>
                            <div className="text-center mb-6">
                                <div className="text-5xl font-bold mb-1">${result.annualCost}</div>
                                <div className="text-lg opacity-90">per year</div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span>Monthly Cost</span><span className="font-bold">${result.monthlyCost}</span>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span>Per Lock/Year</span><span className="font-bold">${result.perLockAnnualCost}</span>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span>5-Year Total</span><span className="font-bold">${result.fiveYearCost}</span>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span>Annual kWh</span><span className="font-bold">{result.fleetAnnualKwh} kWh</span>
                                </div>
                                {powerSource === 'battery' && (
                                    <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                        <span>Battery Sets/Year</span><span className="font-bold">{result.batteryReplacements}×</span>
                                    </div>
                                )}
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span className="flex items-center gap-1"><Leaf className="w-3 h-3" /> CO₂</span>
                                    <span className="font-bold">{result.annualCO2kg} kg/yr</span>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> Solar Panel</span>
                                    <span className="font-bold">{result.solarWatts}W needed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Protocol Comparison */}
                <div className="max-w-7xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold mb-6">Protocol Power Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Protocol</th>
                                    <th>Active Power</th>
                                    <th>Standby Power</th>
                                    <th>Annual kWh (10 locks)</th>
                                    <th>Annual Cost (10 locks)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(PROTOCOL_POWER).map(([key, proto]) => {
                                    const activeH = (20 * 5) / 3600
                                    const standbyH = 24 - activeH
                                    const dailyWh = (proto.active * activeH + proto.standby * standbyH + (20 * 2 * 1) / 3600) * 10
                                    const annualKwh = (dailyWh * 365) / 1000
                                    return (
                                        <tr key={key} style={{ background: key === protocol ? 'var(--color-accent-subtle)' : undefined }}>
                                            <td className="font-medium">{proto.label} {key === protocol && '← Selected'}</td>
                                            <td>{proto.active}W</td>
                                            <td>{proto.standby}W</td>
                                            <td>{annualKwh.toFixed(2)} kWh</td>
                                            <td>${(annualKwh * electricityRate).toFixed(2)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ToolRating toolSlug="energy-cost" />

                <BeTechCalculatorRecommendation
                    description="Be-Tech smart locks feature ultra-low standby power consumption and support for BLE, ensuring minimal energy costs while maintaining reliable connectivity."
                    badge="Energy Efficient"
                />

                <RelatedResources calculatorSlug="energy-cost-calculator" />
                <div className="max-w-7xl mx-auto">
                    <CalculatorFaqBlock faqs={faqs} />
                </div>

                <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/calculators/battery-life" className="link-card">
                            <h3 className="link-card__title">Battery Life Calculator</h3>
                            <p className="link-card__desc">Estimate how long batteries will last</p>
                        </Link>
                        <Link href="/calculators/poe-power" className="link-card">
                            <h3 className="link-card__title">PoE Power Budget</h3>
                            <p className="link-card__desc">Plan PoE switch capacity</p>
                        </Link>
                        <Link href="/calculators/lock-tco" className="link-card">
                            <h3 className="link-card__title">TCO Calculator</h3>
                            <p className="link-card__desc">Total cost of ownership analysis</p>
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
