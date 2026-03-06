'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Volume2, VolumeX, Info, Moon, Building, Home } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface NoiseProfile {
    label: string
    motorDb: number
    mechanismDb: number
}

const MOTOR_TYPES: Record<string, NoiseProfile> = {
    'dc-brush': { label: 'DC Brushed Motor', motorDb: 45, mechanismDb: 0 },
    'dc-brushless': { label: 'DC Brushless Motor', motorDb: 38, mechanismDb: 0 },
    'stepper': { label: 'Stepper Motor', motorDb: 50, mechanismDb: 0 },
    'solenoid': { label: 'Solenoid Actuator', motorDb: 55, mechanismDb: 0 },
}

const MECHANISM_TYPES: Record<string, { label: string; addDb: number }> = {
    'deadbolt': { label: 'Deadbolt (sliding bolt)', addDb: 8 },
    'mortise': { label: 'Mortise Lock', addDb: 12 },
    'latch': { label: 'Spring Latch', addDb: 5 },
    'magnetic': { label: 'Magnetic Lock (silent release)', addDb: 2 },
}

const SPEED_MODES: Record<string, { label: string; modifier: number }> = {
    'fast': { label: 'Fast / Standard', modifier: 1.0 },
    'quiet': { label: 'Quiet / Night Mode', modifier: 0.7 },
    'turbo': { label: 'Turbo / Quick Access', modifier: 1.15 },
}

const ENVIRONMENTS: { key: string; label: string; icon: typeof Home; ambientDb: number; threshold: string }[] = [
    { key: 'bedroom', label: 'Bedroom (Night)', icon: Moon, ambientDb: 30, threshold: 'Below 40 dB recommended' },
    { key: 'home', label: 'Living Room', icon: Home, ambientDb: 40, threshold: 'Below 50 dB recommended' },
    { key: 'office', label: 'Office', icon: Building, ambientDb: 45, threshold: 'Below 55 dB recommended' },
    { key: 'corridor', label: 'Hotel Corridor', icon: Building, ambientDb: 45, threshold: 'Below 50 dB recommended' },
    { key: 'commercial', label: 'Commercial / Retail', icon: Building, ambientDb: 55, threshold: 'Below 65 dB recommended' },
    { key: 'industrial', label: 'Industrial / Warehouse', icon: Building, ambientDb: 65, threshold: 'Below 75 dB recommended' },
]

const NOISE_COMPARISONS = [
    { label: 'Breathing', db: 10 },
    { label: 'Whisper', db: 20 },
    { label: 'Quiet library', db: 30 },
    { label: 'Quiet office', db: 40 },
    { label: 'Normal conversation', db: 50 },
    { label: 'Dishwasher', db: 60 },
    { label: 'Vacuum cleaner', db: 70 },
    { label: 'City traffic', db: 80 },
]

export default function NoiseLevelEstimator() {
    const [motorType, setMotorType] = useState('dc-brushless')
    const [mechanismType, setMechanismType] = useState('deadbolt')
    const [speedMode, setSpeedMode] = useState('fast')
    const [environment, setEnvironment] = useState('home')
    const [doorThickness, setDoorThickness] = useState(44) // mm
    const [distanceM, setDistanceM] = useState(1) // meters from lock

    const result = useMemo(() => {
        const motor = MOTOR_TYPES[motorType]
        const mechanism = MECHANISM_TYPES[mechanismType]
        const speed = SPEED_MODES[speedMode]
        const env = ENVIRONMENTS.find(e => e.key === environment)!

        // Base noise = motor + mechanism
        const baseDb = motor.motorDb + mechanism.addDb

        // Speed modifier
        const speedAdjustedDb = baseDb * speed.modifier

        // Door attenuation (thicker door = more sound blocked on opposite side)
        const doorAttenuation = (doorThickness - 35) * 0.15 // ~0.15 dB per mm above 35mm

        // Distance attenuation (inverse square law: -6dB per doubling of distance)
        const distanceAttenuation = distanceM > 0.5 ? 20 * Math.log10(distanceM / 0.5) : 0

        // Final noise at listener position
        const estimatedDb = Math.round(speedAdjustedDb - doorAttenuation - distanceAttenuation)
        const estimatedDbBehindDoor = Math.round(speedAdjustedDb - doorAttenuation - distanceAttenuation - (doorThickness * 0.3))

        // Rating
        const ambient = env.ambientDb
        let suitability: string
        let suitabilityClass: string

        if (estimatedDb <= ambient - 5) {
            suitability = 'Excellent'
            suitabilityClass = 'result-panel--grade-a'
        } else if (estimatedDb <= ambient + 5) {
            suitability = 'Acceptable'
            suitabilityClass = 'result-panel--grade-b'
        } else if (estimatedDb <= ambient + 15) {
            suitability = 'Noticeable'
            suitabilityClass = 'result-panel--grade-c'
        } else {
            suitability = 'Too Loud'
            suitabilityClass = 'result-panel--grade-f'
        }

        // Find closest comparison
        const closest = NOISE_COMPARISONS.reduce((prev, curr) =>
            Math.abs(curr.db - estimatedDb) < Math.abs(prev.db - estimatedDb) ? curr : prev
        )

        // Tips
        const tips: string[] = []
        if (estimatedDb > ambient + 5 && speedMode !== 'quiet') tips.push('Enable "Quiet / Night Mode" to reduce noise by ~30%')
        if (estimatedDb > ambient + 5 && motorType !== 'dc-brushless') tips.push('DC Brushless motors are the quietest option available')
        if (estimatedDb > ambient + 5 && mechanismType === 'mortise') tips.push('Consider a magnetic lock for near-silent operation')
        if (estimatedDb > ambient + 5 && doorThickness < 44) tips.push('A thicker door provides more sound insulation')

        return {
            estimatedDb,
            estimatedDbBehindDoor,
            suitability,
            suitabilityClass,
            ambientDb: ambient,
            closestComparison: closest,
            tips,
            environmentLabel: env.label,
        }
    }, [motorType, mechanismType, speedMode, environment, doorThickness, distanceM])

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back to Calculators</Link>

                <div className="text-center mb-12">
                    <div className="page-header__icon"><Volume2 className="w-14 h-14 mx-auto" /></div>
                    <h1 className="text-4xl font-bold mb-4">Noise Level Estimator</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                        Estimate smart lock operating noise and check environmental suitability
                    </p>
                </div>

                <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="callout callout-info">
                        <div className="flex items-start gap-3">
                            <VolumeX className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                            <div>
                                <h2 className="font-bold mb-1" style={{ fontSize: '1rem' }}>Why Noise Matters</h2>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    A smart lock that&apos;s too loud can disturb sleeping guests in hotels, wake family members at night,
                                    or create uncomfortable noise in quiet office environments. This is the <strong>only tool on the web</strong> that
                                    helps you estimate smart lock noise before purchasing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                            <h2 className="text-2xl font-bold mb-6">Lock Configuration</h2>
                            <div className="space-y-6">
                                {/* Motor Type */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Motor Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(MOTOR_TYPES).map(([key, val]) => (
                                            <button key={key} onClick={() => setMotorType(key)} type="button"
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all text-center"
                                                style={{
                                                    borderColor: motorType === key ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: motorType === key ? 'var(--color-accent-subtle)' : 'white',
                                                    color: motorType === key ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}>
                                                <div>{val.label}</div>
                                                <div className="text-xs mt-1 opacity-70">~{val.motorDb} dB base</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mechanism Type */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Lock Mechanism
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(MECHANISM_TYPES).map(([key, val]) => (
                                            <button key={key} onClick={() => setMechanismType(key)} type="button"
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all text-center"
                                                style={{
                                                    borderColor: mechanismType === key ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: mechanismType === key ? 'var(--color-accent-subtle)' : 'white',
                                                    color: mechanismType === key ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}>
                                                <div>{val.label}</div>
                                                <div className="text-xs mt-1 opacity-70">+{val.addDb} dB</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Speed Mode */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Speed Mode
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {Object.entries(SPEED_MODES).map(([key, val]) => (
                                            <button key={key} onClick={() => setSpeedMode(key)} type="button"
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all text-center"
                                                style={{
                                                    borderColor: speedMode === key ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: speedMode === key ? 'var(--color-accent-subtle)' : 'white',
                                                    color: speedMode === key ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}>
                                                {val.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Environment */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Use Environment
                                    </label>
                                    <select value={environment} onChange={(e) => setEnvironment(e.target.value)}
                                        className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                        {ENVIRONMENTS.map(env => (
                                            <option key={env.key} value={env.key}>{env.label} — ambient ~{env.ambientDb} dB</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Door Thickness + Distance */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Door Thickness: {doorThickness}mm
                                        </label>
                                        <input type="range" min={25} max={80} value={doorThickness}
                                            onChange={(e) => setDoorThickness(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Listener Distance: {distanceM}m
                                        </label>
                                        <input type="range" min={0.5} max={10} step={0.5} value={distanceM}
                                            onChange={(e) => setDistanceM(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-1">
                        <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${result.suitabilityClass}`}>
                            <h2 className="text-xl font-bold mb-4">Noise Assessment</h2>
                            <div className="text-center mb-6">
                                <div className="text-6xl font-bold mb-1">{result.estimatedDb}</div>
                                <div className="text-lg opacity-90">dB estimated</div>
                                <div className="text-xl font-semibold mt-2">{result.suitability}</div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span>Similar to</span><span className="font-bold">{result.closestComparison.label}</span>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span>Ambient Level</span><span className="font-bold">{result.ambientDb} dB</span>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span>Behind Door</span><span className="font-bold">~{Math.max(0, result.estimatedDbBehindDoor)} dB</span>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3 flex justify-between">
                                    <span>Environment</span><span className="font-bold">{result.environmentLabel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                {result.tips.length > 0 && (
                    <div className="max-w-7xl mx-auto mt-8">
                        <div className="callout callout-warning">
                            <h3 className="text-lg font-bold mb-3">Noise Reduction Tips</h3>
                            <ul className="space-y-2">
                                {result.tips.map((t, i) => <li key={i} className="text-sm">• {t}</li>)}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Noise Scale */}
                <div className="max-w-7xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Info className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                        Noise Level Reference Scale
                    </h2>
                    <div className="rounded-lg shadow-lg p-6" style={{ background: 'var(--color-surface)' }}>
                        <div className="space-y-3">
                            {NOISE_COMPARISONS.map((comp) => {
                                const width = (comp.db / 80) * 100
                                const isLockLevel = Math.abs(comp.db - result.estimatedDb) <= 5
                                return (
                                    <div key={comp.label} className="flex items-center gap-4">
                                        <div className="w-32 text-sm font-medium text-right" style={{ color: 'var(--color-text-secondary)' }}>
                                            {comp.label}
                                        </div>
                                        <div className="flex-1 relative">
                                            <div className="h-6 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                                                <div
                                                    className="h-full rounded-full transition-all"
                                                    style={{
                                                        width: `${width}%`,
                                                        background: isLockLevel
                                                            ? 'var(--color-accent)'
                                                            : comp.db <= 40 ? 'var(--color-success)' : comp.db <= 60 ? 'var(--color-warning)' : 'var(--color-danger)',
                                                    }}
                                                />
                                            </div>
                                            {isLockLevel && (
                                                <span className="absolute right-0 top-0 text-xs font-bold px-2 py-1 rounded" style={{ color: 'var(--color-accent)' }}>
                                                    ← Your lock
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-12 text-sm font-bold text-right">{comp.db} dB</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <ToolRating toolSlug="noise-level" />

                <BeTechCalculatorRecommendation
                    description="Be-Tech's premium smart locks use DC brushless motors with quiet operation modes, achieving noise levels below 45 dB — suitable for hotel and residential environments."
                    badge="Quiet Operation"
                />

                <RelatedResources calculatorSlug="noise-level-estimator" />

                <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/calculators/lock-compare" className="link-card">
                            <h3 className="link-card__title">Lock Comparison</h3>
                            <p className="link-card__desc">Compare lock specs side-by-side</p>
                        </Link>
                        <Link href="/calculators/hotel-roi" className="link-card">
                            <h3 className="link-card__title">Hotel ROI</h3>
                            <p className="link-card__desc">Calculate hospitality ROI</p>
                        </Link>
                        <Link href="/calculators/compatibility" className="link-card">
                            <h3 className="link-card__title">Compatibility Check</h3>
                            <p className="link-card__desc">Verify lock & door compatibility</p>
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
