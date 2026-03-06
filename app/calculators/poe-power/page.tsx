'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, AlertTriangle, Lightbulb, Check } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface Inputs {
    lockCount: number
    poeStandard: string
    cableLength: number
    switchModel: string
    lockPowerW: number
    additionalDevices: string[]
    ambientTemp: string
}

const poeStandards: Record<string, { maxPerPort: number; label: string }> = {
    'af': { maxPerPort: 15.4, label: 'PoE (802.3af) — 15.4W' },
    'at': { maxPerPort: 30, label: 'PoE+ (802.3at) — 30W' },
    'bt-type3': { maxPerPort: 60, label: 'PoE++ Type 3 (802.3bt) — 60W' },
    'bt-type4': { maxPerPort: 100, label: 'PoE++ Type 4 (802.3bt) — 100W' },
}

const switchBudgets: Record<string, { totalBudget: number; ports: number; label: string }> = {
    'small-8': { totalBudget: 65, ports: 8, label: '8-Port Unmanaged (65W budget)' },
    'mid-16': { totalBudget: 150, ports: 16, label: '16-Port Managed (150W budget)' },
    'mid-24': { totalBudget: 250, ports: 24, label: '24-Port Managed (250W budget)' },
    'large-48': { totalBudget: 500, ports: 48, label: '48-Port Managed (500W budget)' },
    'enterprise-48': { totalBudget: 740, ports: 48, label: '48-Port Enterprise (740W budget)' },
}

const additionalDevicePower: Record<string, { watts: number; label: string }> = {
    'ip-camera': { watts: 15, label: 'IP Camera' },
    'intercom': { watts: 12, label: 'IP Intercom' },
    'reader': { watts: 5, label: 'Card Reader' },
    'ap': { watts: 25, label: 'Wireless AP' },
    'sensor': { watts: 3, label: 'Door Sensor' },
}

export default function PoEPowerBudgetCalculator() {
    const [inputs, setInputs] = useState<Inputs>({
        lockCount: 10,
        poeStandard: 'af',
        cableLength: 50,
        switchModel: 'mid-16',
        lockPowerW: 8,
        additionalDevices: [],
        ambientTemp: 'normal',
    })

    const calculate = () => {
        const poe = poeStandards[inputs.poeStandard] || poeStandards.af
        const sw = switchBudgets[inputs.switchModel] || switchBudgets['mid-16']
        const issues: string[] = []
        const recommendations: string[] = []

        // Cable loss (approximately 0.4W per 10m at full load)
        const cableLoss = (inputs.cableLength / 10) * 0.4

        // Temperature derating
        const tempFactor: Record<string, number> = { cool: 1.0, normal: 1.0, warm: 0.9, hot: 0.8 }
        const derating = tempFactor[inputs.ambientTemp] || 1.0

        const effectivePerPort = (poe.maxPerPort * derating) - cableLoss
        const lockPowerWithLoss = inputs.lockPowerW + cableLoss

        // Per-lock check
        if (lockPowerWithLoss > effectivePerPort) {
            issues.push(`Lock power (${lockPowerWithLoss.toFixed(1)}W with cable loss) exceeds ${poe.label} capacity (${effectivePerPort.toFixed(1)}W effective)`)
            recommendations.push('Upgrade to PoE+ (802.3at) for higher per-port power')
        }

        // Additional device power
        let additionalPower = 0
        let additionalPorts = 0
        for (const dev of inputs.additionalDevices) {
            const d = additionalDevicePower[dev]
            if (d) {
                additionalPower += d.watts * inputs.lockCount
                additionalPorts += inputs.lockCount
            }
        }

        const totalLockPower = inputs.lockCount * lockPowerWithLoss
        const totalPower = totalLockPower + additionalPower
        const totalPorts = inputs.lockCount + additionalPorts

        const budgetUtilization = (totalPower / sw.totalBudget) * 100
        const portUtilization = (totalPorts / sw.ports) * 100

        if (budgetUtilization > 100) {
            issues.push(`Total power (${totalPower.toFixed(0)}W) exceeds switch budget (${sw.totalBudget}W)`)
            recommendations.push('Upgrade to a higher-capacity PoE switch or add a second switch')
        } else if (budgetUtilization > 80) {
            issues.push(`Power budget at ${budgetUtilization.toFixed(0)}% — limited headroom for expansion`)
            recommendations.push('Plan for 20% headroom for future expansion')
        }

        if (portUtilization > 100) {
            issues.push(`Need ${totalPorts} ports but switch only has ${sw.ports}`)
            recommendations.push('Use a larger switch or cascade additional switches')
        }

        if (inputs.cableLength > 80) {
            issues.push('Cable runs exceed 80m — significant power loss and approaching 100m Ethernet limit')
            recommendations.push('Install midspan injectors or additional switches for long runs')
        }

        if (issues.length === 0) {
            recommendations.push('Power budget is within safe operating limits')
        }

        const headroomW = sw.totalBudget - totalPower
        const additionalLocksCapacity = headroomW > 0 ? Math.floor(headroomW / lockPowerWithLoss) : 0

        return {
            totalLockPower: Math.round(totalLockPower * 10) / 10,
            additionalPower: Math.round(additionalPower * 10) / 10,
            totalPower: Math.round(totalPower * 10) / 10,
            budgetUtilization: Math.round(budgetUtilization),
            portUtilization: Math.round(portUtilization),
            effectivePerPort: Math.round(effectivePerPort * 10) / 10,
            cableLoss: Math.round(cableLoss * 10) / 10,
            headroomW: Math.round(headroomW * 10) / 10,
            additionalLocksCapacity,
            totalPorts,
            issues,
            recommendations,
        }
    }

    const result = calculate()

    const toggleDevice = (dev: string) => {
        setInputs(prev => ({
            ...prev,
            additionalDevices: prev.additionalDevices.includes(dev)
                ? prev.additionalDevices.filter(d => d !== dev)
                : [...prev.additionalDevices, dev],
        }))
    }

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back</Link>

                <div className="text-center mb-12">
                    <div className="page-header__icon"><Zap className="w-14 h-14 mx-auto" /></div>
                    <h1 className="page-header__title">PoE Power Budget Calculator</h1>
                    <p className="page-header__subtitle">
                        Plan Power over Ethernet budgets for hardwired commercial smart lock installations
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="content-card">
                        <h2 className="section-title">Installation Parameters</h2>
                        <div className="space-y-6">
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Lock Count: {inputs.lockCount}
                                </label>
                                <input type="range" min="1" max="200" value={inputs.lockCount}
                                    onChange={e => setInputs({ ...inputs, lockCount: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Lock Power Consumption: {inputs.lockPowerW}W
                                </label>
                                <input type="range" min="3" max="30" step="0.5" value={inputs.lockPowerW}
                                    onChange={e => setInputs({ ...inputs, lockPowerW: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                                <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}><span>3W</span><span>30W</span></div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>PoE Standard</label>
                                <select value={inputs.poeStandard} onChange={e => setInputs({ ...inputs, poeStandard: e.target.value })} className="form-input">
                                    {Object.entries(poeStandards).map(([k, v]) => (
                                        <option key={k} value={k}>{v.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Switch Model</label>
                                <select value={inputs.switchModel} onChange={e => setInputs({ ...inputs, switchModel: e.target.value })} className="form-input">
                                    {Object.entries(switchBudgets).map(([k, v]) => (
                                        <option key={k} value={k}>{v.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Average Cable Length: {inputs.cableLength}m
                                </label>
                                <input type="range" min="5" max="100" step="5" value={inputs.cableLength}
                                    onChange={e => setInputs({ ...inputs, cableLength: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Ambient Temperature</label>
                                <select value={inputs.ambientTemp} onChange={e => setInputs({ ...inputs, ambientTemp: e.target.value })} className="form-input">
                                    <option value="cool">Cool (&lt;20°C)</option>
                                    <option value="normal">Normal (20-30°C)</option>
                                    <option value="warm">Warm (30-40°C) — 10% derating</option>
                                    <option value="hot">Hot (&gt;40°C) — 20% derating</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Additional Devices per Door</label>
                                <div className="space-y-2">
                                    {Object.entries(additionalDevicePower).map(([key, dev]) => (
                                        <label key={key} className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                                            <input type="checkbox" checked={inputs.additionalDevices.includes(key)} onChange={() => toggleDevice(key)} className="w-4 h-4" />
                                            <span>{dev.label} ({dev.watts}W)</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${result.budgetUtilization <= 80 ? 'result-panel--grade-a' :
                                result.budgetUtilization <= 100 ? 'result-panel--grade-c' :
                                    'result-panel--grade-f'
                            }`}>
                            <h2 className="text-xl font-bold mb-6">Power Budget</h2>
                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold mb-2">{result.totalPower}W</div>
                                <div className="text-lg opacity-90">Total Power Draw</div>
                                <div className="mt-2 text-sm opacity-80">{result.budgetUtilization}% Budget Used</div>
                            </div>

                            <div className="mb-6">
                                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white transition-all" style={{ width: `${Math.min(100, result.budgetUtilization)}%` }} />
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Lock Power</span>
                                    <span className="font-semibold">{result.totalLockPower}W</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Additional Devices</span>
                                    <span className="font-semibold">{result.additionalPower}W</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Cable Loss per Port</span>
                                    <span className="font-semibold">{result.cableLoss}W</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Ports Required</span>
                                    <span className="font-semibold">{result.totalPorts}</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Headroom</span>
                                    <span className="font-semibold">{result.headroomW}W</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-90">Expansion Capacity</span>
                                    <span className="font-semibold">+{result.additionalLocksCapacity} locks</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {(result.issues.length > 0 || result.recommendations.length > 0) && (
                    <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
                        {result.issues.length > 0 && (
                            <div className="callout callout-danger">
                                <h3 className="text-lg font-bold mb-3 inline-flex items-center gap-2" style={{ color: 'var(--color-danger)' }}>
                                    <AlertTriangle className="w-5 h-5" /> Power Issues
                                </h3>
                                <ul className="space-y-2">
                                    {result.issues.map((issue, i) => (
                                        <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                                            <span className="mt-1">•</span><span>{issue}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="callout callout-info">
                            <h3 className="text-lg font-bold mb-3 inline-flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                                <Lightbulb className="w-5 h-5" /> Recommendations
                            </h3>
                            <ul className="space-y-2">
                                {result.recommendations.map((rec, i) => (
                                    <li key={i} className="text-sm flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} /><span>{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <ToolRating toolSlug="poe-power" />
                <RelatedResources calculatorSlug="poe-power" />
                <BeTechCalculatorRecommendation
                    description="Be-Tech hardwired smart locks draw only 5-8W, maximizing PoE switch capacity. Compatible with standard 802.3af PoE — no expensive PoE+ required."
                    badge="Low Power"
                />

                <div className="max-w-6xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
