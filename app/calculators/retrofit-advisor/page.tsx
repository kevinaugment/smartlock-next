'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { GitCompare, DollarSign, Clock, Check, ArrowRight, Info } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface ComparisonResult {
    retrofitCost: number
    replaceCost: number
    retrofitTime: number // minutes
    replaceTime: number // minutes
    recommended: 'retrofit' | 'replace'
    savingsAmount: number
    savingsPercent: number
    retrofitPros: string[]
    retrofitCons: string[]
    replacePros: string[]
    replaceCons: string[]
    reasoning: string
}

export default function RetrofitAdvisor() {
    const [existingLock, setExistingLock] = useState<'deadbolt' | 'knob' | 'mortise' | 'lever'>('deadbolt')
    const [lockCondition, setLockCondition] = useState<'good' | 'fair' | 'poor'>('good')
    const [desiredFeatures, setDesiredFeatures] = useState({
        keypad: true,
        fingerprint: false,
        wifi: true,
        bluetooth: true,
        autoLock: true,
        camera: false,
    })
    const [propertyType, setPropertyType] = useState<'own' | 'rent'>('own')
    const [installSkill, setInstallSkill] = useState<'diy' | 'handyman' | 'locksmith'>('diy')
    const [doorCount, setDoorCount] = useState(1)
    const [budget, setBudget] = useState<'low' | 'mid' | 'high'>('mid')

    const result = useMemo((): ComparisonResult => {
        // Cost calculations
        const laborRates = { diy: 0, handyman: 65, locksmith: 120 }
        const laborRate = laborRates[installSkill]

        // Retrofit costs
        let retrofitDeviceCost = budget === 'low' ? 150 : budget === 'mid' ? 250 : 350
        const retrofitLaborMinutes = existingLock === 'deadbolt' ? 15 : existingLock === 'lever' ? 20 : 30
        const retrofitLaborCost = (retrofitLaborMinutes / 60) * laborRate
        const retrofitTotal = (retrofitDeviceCost + retrofitLaborCost) * doorCount

        // Replace costs
        let replaceDeviceCost = budget === 'low' ? 180 : budget === 'mid' ? 300 : 500
        // Add feature costs
        if (desiredFeatures.fingerprint) replaceDeviceCost += 80
        if (desiredFeatures.camera) replaceDeviceCost += 120
        if (desiredFeatures.wifi && desiredFeatures.bluetooth) replaceDeviceCost += 30

        const replaceLaborMinutes = existingLock === 'deadbolt' ? 30 : existingLock === 'lever' ? 40 : existingLock === 'mortise' ? 60 : 35
        const poorConditionExtra = lockCondition === 'poor' ? 20 : lockCondition === 'fair' ? 10 : 0
        const totalReplaceLaborMinutes = replaceLaborMinutes + poorConditionExtra
        const replaceLaborCost = (totalReplaceLaborMinutes / 60) * laborRate
        const replaceTotal = (replaceDeviceCost + replaceLaborCost) * doorCount

        // Feature availability for retrofit
        const retrofitSupportsAll = !desiredFeatures.fingerprint && !desiredFeatures.camera
        const featureCount = Object.values(desiredFeatures).filter(Boolean).length

        // Decision logic
        const retrofitPros: string[] = []
        const retrofitCons: string[] = []
        const replacePros: string[] = []
        const replaceCons: string[] = []

        // Retrofit pros/cons
        retrofitPros.push('Lower cost — keeps existing deadbolt')
        retrofitPros.push('Faster installation (15-30 min)')
        if (propertyType === 'rent') retrofitPros.push('No permanent modifications — ideal for renters')
        retrofitPros.push('Maintains current key as backup')

        if (desiredFeatures.fingerprint) retrofitCons.push('Fingerprint scanner not available on retrofits')
        if (desiredFeatures.camera) retrofitCons.push('Camera integration requires full replacement')
        if (lockCondition === 'poor') retrofitCons.push('Existing lock in poor condition — retrofit may not fix mechanical issues')
        if (existingLock === 'mortise') retrofitCons.push('Mortise locks have limited retrofit options')
        if (existingLock === 'knob') retrofitCons.push('Knob locks rarely support retrofit adapters')

        // Replace pros/cons
        replacePros.push('Full feature set — any feature combination available')
        replacePros.push('New hardware with fresh warranty')
        if (lockCondition !== 'good') replacePros.push('Addresses mechanical issues with new hardware')
        if (featureCount >= 4) replacePros.push('Better value for feature-rich configurations')

        replaceCons.push('Higher upfront cost')
        replaceCons.push('Longer installation time')
        if (propertyType === 'rent') replaceCons.push('Permanent modification — may need landlord approval')
        if (installSkill === 'diy') replaceCons.push('DIY replacement of mortise/lever locks is challenging')

        // Recommendation
        let recommended: 'retrofit' | 'replace' = 'retrofit'
        let reasoning = ''

        if (!retrofitSupportsAll) {
            recommended = 'replace'
            reasoning = 'Your desired features (fingerprint/camera) require a full replacement.'
        } else if (lockCondition === 'poor') {
            recommended = 'replace'
            reasoning = 'Your existing lock is in poor condition — a full replacement provides new, reliable hardware.'
        } else if (existingLock === 'mortise' || existingLock === 'knob') {
            recommended = 'replace'
            reasoning = `${existingLock === 'mortise' ? 'Mortise' : 'Knob'} locks have very limited retrofit options. Full replacement recommended.`
        } else if (propertyType === 'rent') {
            recommended = 'retrofit'
            reasoning = 'As a renter, a retrofit preserves the original hardware and avoids landlord issues.'
        } else if (retrofitTotal < replaceTotal * 0.65) {
            recommended = 'retrofit'
            reasoning = `Retrofit saves you $${Math.round(replaceTotal - retrofitTotal)} (${Math.round(((replaceTotal - retrofitTotal) / replaceTotal) * 100)}%) with the features you need.`
        } else if (featureCount >= 5) {
            recommended = 'replace'
            reasoning = 'With 5+ features desired, a full replacement offers better value and integration.'
        } else {
            recommended = 'retrofit'
            reasoning = 'Your existing deadbolt is in good condition and supports the features you need at lower cost.'
        }

        const savingsAmount = Math.abs(replaceTotal - retrofitTotal)
        const savingsPercent = Math.round((savingsAmount / Math.max(replaceTotal, retrofitTotal)) * 100)

        return {
            retrofitCost: Math.round(retrofitTotal),
            replaceCost: Math.round(replaceTotal),
            retrofitTime: retrofitLaborMinutes * doorCount,
            replaceTime: totalReplaceLaborMinutes * doorCount,
            recommended,
            savingsAmount: Math.round(savingsAmount),
            savingsPercent,
            retrofitPros, retrofitCons, replacePros, replaceCons, reasoning,
        }
    }, [existingLock, lockCondition, desiredFeatures, propertyType, installSkill, doorCount, budget])

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back to Calculators</Link>

                <div className="text-center mb-12">
                    <div className="page-header__icon"><GitCompare className="w-14 h-14 mx-auto" /></div>
                    <h1 className="text-4xl font-bold mb-4">Retrofit vs Replace Advisor</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                        Should you retrofit your existing lock or buy a full smart lock replacement?
                    </p>
                </div>

                {/* Key Insight */}
                <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="callout callout-info">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                            <div>
                                <h2 className="font-bold mb-1" style={{ fontSize: '1rem' }}>Retrofit vs Full Replacement</h2>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    A <strong>retrofit</strong> adds smart capabilities to your existing deadbolt (e.g., August, Level) — saving $30-$100 per door.
                                    A <strong>full replacement</strong> swaps the entire lock (e.g., Schlage Encode, Yale Assure) — offering more features but higher cost.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calculator */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                            <h2 className="text-2xl font-bold mb-6">Your Situation</h2>
                            <div className="space-y-6">
                                {/* Existing Lock Type */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Current Lock Type
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {([
                                            { value: 'deadbolt', label: 'Deadbolt' },
                                            { value: 'lever', label: 'Lever Handle' },
                                            { value: 'knob', label: 'Knob Lock' },
                                            { value: 'mortise', label: 'Mortise' },
                                        ] as const).map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setExistingLock(opt.value)}
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all text-center"
                                                style={{
                                                    borderColor: existingLock === opt.value ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: existingLock === opt.value ? 'var(--color-accent-subtle)' : 'white',
                                                    color: existingLock === opt.value ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}
                                                type="button"
                                            >{opt.label}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Lock Condition */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Lock Condition
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {([
                                            { value: 'good', label: 'Good', desc: 'Smooth operation' },
                                            { value: 'fair', label: 'Fair', desc: 'Minor stiffness' },
                                            { value: 'poor', label: 'Poor', desc: 'Sticky / damaged' },
                                        ] as const).map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setLockCondition(opt.value)}
                                                className="p-3 rounded-lg border-2 text-sm transition-all text-center"
                                                style={{
                                                    borderColor: lockCondition === opt.value ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: lockCondition === opt.value ? 'var(--color-accent-subtle)' : 'white',
                                                    color: lockCondition === opt.value ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}
                                                type="button"
                                            >
                                                <div className="font-medium">{opt.label}</div>
                                                <div className="text-xs mt-1 opacity-70">{opt.desc}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Desired Features */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Desired Features
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {[
                                            { key: 'keypad', label: 'Keypad / PIN' },
                                            { key: 'fingerprint', label: 'Fingerprint' },
                                            { key: 'wifi', label: 'Wi-Fi' },
                                            { key: 'bluetooth', label: 'Bluetooth' },
                                            { key: 'autoLock', label: 'Auto-Lock' },
                                            { key: 'camera', label: 'Built-in Camera' },
                                        ].map(f => (
                                            <label key={f.key} className="flex items-center gap-2 p-3 rounded-lg cursor-pointer border-2 transition-all" style={{
                                                borderColor: desiredFeatures[f.key as keyof typeof desiredFeatures] ? 'var(--color-accent)' : 'var(--color-border)',
                                                background: desiredFeatures[f.key as keyof typeof desiredFeatures] ? 'var(--color-accent-subtle)' : 'white',
                                            }}>
                                                <input
                                                    type="checkbox"
                                                    checked={desiredFeatures[f.key as keyof typeof desiredFeatures]}
                                                    onChange={(e) => setDesiredFeatures(prev => ({ ...prev, [f.key]: e.target.checked }))}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm font-medium">{f.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Property Type + Install Skill */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Property
                                        </label>
                                        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value as 'own' | 'rent')}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="own">Own / Homeowner</option>
                                            <option value="rent">Renting / Tenant</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Installation
                                        </label>
                                        <select value={installSkill} onChange={(e) => setInstallSkill(e.target.value as 'diy' | 'handyman' | 'locksmith')}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="diy">DIY (Self-Install)</option>
                                            <option value="handyman">Handyman ($65/hr)</option>
                                            <option value="locksmith">Locksmith ($120/hr)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Door Count + Budget */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Number of Doors: {doorCount}
                                        </label>
                                        <input type="range" min={1} max={20} value={doorCount}
                                            onChange={(e) => setDoorCount(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                            style={{ background: 'var(--color-border)' }} />
                                        <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                            <span>1</span><span>20</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Budget Level
                                        </label>
                                        <select value={budget} onChange={(e) => setBudget(e.target.value as 'low' | 'mid' | 'high')}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="low">Budget ($100-180)</option>
                                            <option value="mid">Mid-Range ($200-350)</option>
                                            <option value="high">Premium ($400-600+)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="lg:col-span-1">
                        <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${result.recommended === 'retrofit' ? 'result-panel--grade-a' : 'result-panel--grade-b'}`}>

                            <h2 className="text-xl font-bold mb-4">Recommendation</h2>
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold mb-2">
                                    {result.recommended === 'retrofit' ? '🔧 Retrofit' : '🔄 Replace'}
                                </div>
                                <div className="text-sm opacity-90">{result.reasoning}</div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="font-semibold mb-2">Cost Comparison</div>
                                    <div className="flex justify-between mb-1">
                                        <span>Retrofit:</span>
                                        <span className="font-bold">${result.retrofitCost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Replace:</span>
                                        <span className="font-bold">${result.replaceCost.toLocaleString()}</span>
                                    </div>
                                    <div className="pt-2 border-t border-white/20 flex justify-between">
                                        <span>Savings:</span>
                                        <span className="font-bold">${result.savingsAmount.toLocaleString()} ({result.savingsPercent}%)</span>
                                    </div>
                                </div>

                                <div className="bg-white/10 rounded-lg p-4">
                                    <div className="font-semibold mb-2">Time Comparison</div>
                                    <div className="flex justify-between mb-1">
                                        <span>Retrofit:</span>
                                        <span className="font-bold">{result.retrofitTime} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Replace:</span>
                                        <span className="font-bold">{result.replaceTime} min</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pros / Cons Grid */}
                <div className="max-w-7xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
                    {/* Retrofit */}
                    <div className="rounded-lg shadow-lg overflow-hidden" style={{ background: 'var(--color-surface)' }}>
                        <div className="p-4 bg-green-600 text-white font-bold text-lg">🔧 Retrofit</div>
                        <div className="p-6">
                            <h4 className="font-bold mb-3" style={{ color: 'var(--color-success)' }}>Pros</h4>
                            <ul className="space-y-2 mb-6">
                                {result.retrofitPros.map((p, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
                                        <span>{p}</span>
                                    </li>
                                ))}
                            </ul>
                            {result.retrofitCons.length > 0 && (
                                <>
                                    <h4 className="font-bold mb-3" style={{ color: 'var(--color-danger)' }}>Cons</h4>
                                    <ul className="space-y-2">
                                        {result.retrofitCons.map((c, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-danger)' }} />
                                                <span>{c}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Replace */}
                    <div className="rounded-lg shadow-lg overflow-hidden" style={{ background: 'var(--color-surface)' }}>
                        <div className="p-4 bg-blue-600 text-white font-bold text-lg">🔄 Full Replace</div>
                        <div className="p-6">
                            <h4 className="font-bold mb-3" style={{ color: 'var(--color-success)' }}>Pros</h4>
                            <ul className="space-y-2 mb-6">
                                {result.replacePros.map((p, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
                                        <span>{p}</span>
                                    </li>
                                ))}
                            </ul>
                            <h4 className="font-bold mb-3" style={{ color: 'var(--color-danger)' }}>Cons</h4>
                            <ul className="space-y-2">
                                {result.replaceCons.map((c, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-danger)' }} />
                                        <span>{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Cost Breakdown Table */}
                <div className="max-w-7xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <DollarSign className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                        Detailed Cost Breakdown
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Cost Component</th>
                                    <th>Retrofit</th>
                                    <th>Full Replace</th>
                                    <th>Difference</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium">Device (per door)</td>
                                    <td>${budget === 'low' ? 150 : budget === 'mid' ? 250 : 350}</td>
                                    <td>${Math.round(result.replaceCost / doorCount - (result.replaceTime / doorCount / 60) * (installSkill === 'diy' ? 0 : installSkill === 'handyman' ? 65 : 120))}</td>
                                    <td style={{ color: 'var(--color-success)' }}>Retrofit cheaper</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Labor ({installSkill})</td>
                                    <td>{installSkill === 'diy' ? 'Free' : `$${Math.round((result.retrofitTime / doorCount / 60) * (installSkill === 'handyman' ? 65 : 120))}/door`}</td>
                                    <td>{installSkill === 'diy' ? 'Free' : `$${Math.round((result.replaceTime / doorCount / 60) * (installSkill === 'handyman' ? 65 : 120))}/door`}</td>
                                    <td style={{ color: 'var(--color-success)' }}>Retrofit faster</td>
                                </tr>
                                <tr className="font-bold">
                                    <td>Total ({doorCount} door{doorCount > 1 ? 's' : ''})</td>
                                    <td>${result.retrofitCost.toLocaleString()}</td>
                                    <td>${result.replaceCost.toLocaleString()}</td>
                                    <td style={{ color: 'var(--color-accent)' }}>
                                        Save ${result.savingsAmount.toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <ToolRating toolSlug="retrofit-advisor" />

                <BeTechCalculatorRecommendation
                    description="Be-Tech offers both retrofit-compatible and full replacement smart locks, with adjustable backsets and wide door thickness support for maximum installation flexibility."
                    badge="Versatile Options"
                />

                <RelatedResources calculatorSlug="retrofit-vs-replace-advisor" />

                <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/calculators/installation-cost" className="link-card">
                            <h3 className="link-card__title">Installation Cost</h3>
                            <p className="link-card__desc">Full installation cost breakdown</p>
                        </Link>
                        <Link href="/calculators/lock-tco" className="link-card">
                            <h3 className="link-card__title">TCO Calculator</h3>
                            <p className="link-card__desc">Long-term total cost of ownership</p>
                        </Link>
                        <Link href="/calculators/door-fit" className="link-card">
                            <h3 className="link-card__title">Door Fit Checker</h3>
                            <p className="link-card__desc">Check if your door fits specific models</p>
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>
                        ← Back to All Calculators
                    </Link>
                </div>
            </div>
        </div>
    )
}
