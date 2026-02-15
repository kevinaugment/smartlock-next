'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { DoorOpen, Ruler, Check, X, AlertTriangle, Info } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface LockProfile {
    name: string
    brand: string
    type: 'deadbolt' | 'lever' | 'retrofit' | 'mortise'
    minThickness: number // mm
    maxThickness: number // mm
    backsets: number[] // mm
    boreDiameter: number // mm
    materials: string[]
    difficulty: 'Easy' | 'Moderate' | 'Advanced'
}

const LOCK_DATABASE: LockProfile[] = [
    { name: 'Encode Plus', brand: 'Schlage', type: 'deadbolt', minThickness: 35, maxThickness: 57, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass', 'metal'], difficulty: 'Easy' },
    { name: 'Assure Lock 2', brand: 'Yale', type: 'deadbolt', minThickness: 35, maxThickness: 57, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass'], difficulty: 'Easy' },
    { name: 'Smart Lock Pro', brand: 'August', type: 'retrofit', minThickness: 33, maxThickness: 57, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass', 'metal'], difficulty: 'Easy' },
    { name: 'Level Bolt', brand: 'Level', type: 'retrofit', minThickness: 35, maxThickness: 51, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass'], difficulty: 'Easy' },
    { name: 'Connect', brand: 'Schlage', type: 'deadbolt', minThickness: 35, maxThickness: 57, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass', 'metal'], difficulty: 'Moderate' },
    { name: 'Ultraloq U-Bolt Pro', brand: 'U-tec', type: 'deadbolt', minThickness: 35, maxThickness: 90, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass', 'metal'], difficulty: 'Moderate' },
    { name: 'Secure Pro', brand: 'Lockly', type: 'deadbolt', minThickness: 35, maxThickness: 70, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass', 'metal'], difficulty: 'Moderate' },
    { name: 'Smart Deadbolt', brand: 'Kwikset', type: 'deadbolt', minThickness: 35, maxThickness: 51, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass'], difficulty: 'Easy' },
    { name: 'Mortise Smart Lock', brand: 'Samsung', type: 'mortise', minThickness: 40, maxThickness: 80, backsets: [60], boreDiameter: 0, materials: ['wood', 'metal'], difficulty: 'Advanced' },
    { name: 'Smart Lever', brand: 'Yale', type: 'lever', minThickness: 35, maxThickness: 57, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass', 'metal'], difficulty: 'Moderate' },
    { name: 'C100 Electronic Lock', brand: 'Be-Tech', type: 'deadbolt', minThickness: 35, maxThickness: 70, backsets: [60, 70], boreDiameter: 54, materials: ['wood', 'fiberglass', 'metal'], difficulty: 'Moderate' },
    { name: 'K7S Hotel Lock', brand: 'Be-Tech', type: 'mortise', minThickness: 38, maxThickness: 55, backsets: [60], boreDiameter: 0, materials: ['wood', 'metal'], difficulty: 'Advanced' },
]

const MATERIALS = [
    { value: 'wood', label: 'Solid Wood' },
    { value: 'fiberglass', label: 'Fiberglass' },
    { value: 'metal', label: 'Steel / Metal' },
    { value: 'composite', label: 'Composite / MDF' },
    { value: 'glass', label: 'Glass (not supported)' },
]

export default function DoorFitChecker() {
    const [thickness, setThickness] = useState(44) // mm, default 1-3/4"
    const [backset, setBackset] = useState(70) // mm, default 2-3/4"
    const [boreDiameter, setBoreDiameter] = useState(54) // mm, default 2-1/8"
    const [material, setMaterial] = useState('wood')
    const [installType, setInstallType] = useState<'new' | 'retrofit'>('new')
    const [existingDeadbolt, setExistingDeadbolt] = useState(true)

    const results = useMemo(() => {
        const compatible: (LockProfile & { reasons: string[] })[] = []
        const incompatible: (LockProfile & { reasons: string[] })[] = []

        LOCK_DATABASE.forEach(lock => {
            const reasons: string[] = []

            // Thickness check
            if (thickness < lock.minThickness) reasons.push(`Door too thin (min ${lock.minThickness}mm)`)
            if (thickness > lock.maxThickness) reasons.push(`Door too thick (max ${lock.maxThickness}mm)`)

            // Backset check
            if (!lock.backsets.includes(backset) && lock.backsets.length > 0) {
                reasons.push(`Backset ${backset}mm not supported (needs ${lock.backsets.join(' or ')}mm)`)
            }

            // Bore diameter check (skip for mortise locks)
            if (lock.boreDiameter > 0 && boreDiameter < lock.boreDiameter) {
                reasons.push(`Bore hole too small (needs ${lock.boreDiameter}mm)`)
            }

            // Material check
            if (!lock.materials.includes(material)) {
                reasons.push(`Not tested for ${MATERIALS.find(m => m.value === material)?.label || material}`)
            }

            // Install type filter
            if (installType === 'retrofit' && lock.type !== 'retrofit') {
                // Not a strict incompatibility, but note it
            }

            if (reasons.length === 0) {
                compatible.push({ ...lock, reasons: [] })
            } else {
                incompatible.push({ ...lock, reasons })
            }
        })

        // Sort by difficulty
        const difficultyOrder = { Easy: 0, Moderate: 1, Advanced: 2 }
        compatible.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])

        // Warnings
        const warnings: string[] = []
        if (material === 'glass') warnings.push('Glass doors cannot support standard smart locks. Consider access control panels instead.')
        if (material === 'composite') warnings.push('Composite/MDF doors may lack structural integrity. Verify the door can support the lock weight.')
        if (thickness < 35) warnings.push('Your door is thinner than industry standard. Very few smart locks will fit.')
        if (thickness > 60) warnings.push('Extra-thick door — you may need extended bolts or adapter kits.')
        if (!existingDeadbolt && installType === 'new') warnings.push('No existing bore hole — drilling required. Professional installation recommended.')

        return { compatible, incompatible, warnings, totalChecked: LOCK_DATABASE.length }
    }, [thickness, backset, boreDiameter, material, installType, existingDeadbolt])

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back to Calculators</Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="page-header__icon"><DoorOpen className="w-14 h-14 mx-auto" /></div>
                    <h1 className="text-4xl font-bold mb-4">Door Measurement Fit Checker</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                        Enter your door dimensions to find compatible smart lock models
                    </p>
                </div>

                {/* Key Insight */}
                <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="callout callout-info">
                        <div className="flex items-start gap-3">
                            <Ruler className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                            <div>
                                <h2 className="font-bold mb-1" style={{ fontSize: '1rem' }}>How to Measure</h2>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    <strong>Thickness:</strong> Measure from the interior surface to the exterior surface (edge-on). &nbsp;
                                    <strong>Backset:</strong> Distance from the door&apos;s edge to the center of the existing deadbolt hole. &nbsp;
                                    <strong>Bore:</strong> Diameter of the large hole where the lock body sits.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calculator */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Inputs */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                            <h2 className="text-2xl font-bold mb-6">Door Measurements</h2>
                            <div className="space-y-6">
                                {/* Thickness */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Door Thickness: {thickness}mm ({(thickness / 25.4).toFixed(2)}&quot;)
                                    </label>
                                    <input
                                        type="range" min={25} max={100} value={thickness}
                                        onChange={(e) => setThickness(Number(e.target.value))}
                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                        style={{ background: 'var(--color-border)' }}
                                    />
                                    <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <span>25mm (1&quot;)</span>
                                        <span className="font-medium" style={{ color: 'var(--color-accent)' }}>Standard: 35-44mm</span>
                                        <span>100mm (4&quot;)</span>
                                    </div>
                                </div>

                                {/* Backset */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Backset Distance
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[{ value: 60, label: '60mm (2-3/8")' }, { value: 70, label: '70mm (2-3/4")' }].map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setBackset(opt.value)}
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all"
                                                style={{
                                                    borderColor: backset === opt.value ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: backset === opt.value ? 'var(--color-accent-subtle)' : 'white',
                                                    color: backset === opt.value ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}
                                                type="button"
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Bore diameter */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Bore Hole Diameter: {boreDiameter}mm ({(boreDiameter / 25.4).toFixed(2)}&quot;)
                                    </label>
                                    <input
                                        type="range" min={40} max={70} value={boreDiameter}
                                        onChange={(e) => setBoreDiameter(Number(e.target.value))}
                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                        style={{ background: 'var(--color-border)' }}
                                    />
                                    <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <span>40mm</span>
                                        <span className="font-medium" style={{ color: 'var(--color-accent)' }}>Standard: 54mm (2-1/8&quot;)</span>
                                        <span>70mm</span>
                                    </div>
                                </div>

                                {/* Material */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Door Material
                                    </label>
                                    <select
                                        value={material} onChange={(e) => setMaterial(e.target.value)}
                                        className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}
                                    >
                                        {MATERIALS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                                    </select>
                                </div>

                                {/* Install Type */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Installation Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {([{ value: 'new', label: 'Full Replacement' }, { value: 'retrofit', label: 'Retrofit Existing' }] as const).map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setInstallType(opt.value)}
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all"
                                                style={{
                                                    borderColor: installType === opt.value ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: installType === opt.value ? 'var(--color-accent-subtle)' : 'white',
                                                    color: installType === opt.value ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}
                                                type="button"
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Existing Deadbolt */}
                                <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer" style={{ border: '2px solid var(--color-border)' }}>
                                    <input type="checkbox" checked={existingDeadbolt} onChange={(e) => setExistingDeadbolt(e.target.checked)} className="w-5 h-5" />
                                    <span className="font-medium">Existing deadbolt / bore hole present</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="lg:col-span-1">
                        <div className="p-8 rounded-lg shadow-lg text-white sticky top-4" style={{ background: 'linear-gradient(to bottom right, var(--color-accent), var(--color-accent-dark, #4338ca))' }}>
                            <h2 className="text-xl font-bold mb-4">Compatibility Results</h2>
                            <div className="text-center mb-6">
                                <div className="text-6xl font-bold mb-2">{results.compatible.length}</div>
                                <div className="text-lg opacity-90">of {results.totalChecked} locks compatible</div>
                            </div>
                            <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-white transition-all" style={{ width: `${(results.compatible.length / results.totalChecked) * 100}%` }} />
                            </div>
                            <div className="space-y-2 text-sm bg-white/10 rounded-lg p-4">
                                <div className="flex justify-between"><span>Door Thickness:</span><span className="font-semibold">{thickness}mm</span></div>
                                <div className="flex justify-between"><span>Backset:</span><span className="font-semibold">{backset}mm</span></div>
                                <div className="flex justify-between"><span>Bore Diameter:</span><span className="font-semibold">{boreDiameter}mm</span></div>
                                <div className="flex justify-between"><span>Material:</span><span className="font-semibold capitalize">{material}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Warnings */}
                {results.warnings.length > 0 && (
                    <div className="max-w-7xl mx-auto mt-8">
                        <div className="callout callout-warning">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-warning)' }}>
                                <AlertTriangle className="w-5 h-5" /> Warnings
                            </h3>
                            <ul className="space-y-2">
                                {results.warnings.map((w, i) => <li key={i} className="text-sm">• {w}</li>)}
                            </ul>
                        </div>
                    </div>
                )}

                {/* Compatible Locks Table */}
                <div className="max-w-7xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Check className="w-6 h-6" style={{ color: 'var(--color-success)' }} />
                        Compatible Locks ({results.compatible.length})
                    </h2>
                    {results.compatible.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Brand</th>
                                        <th>Type</th>
                                        <th>Thickness Range</th>
                                        <th>Backsets</th>
                                        <th>Difficulty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.compatible.map((lock, i) => (
                                        <tr key={i}>
                                            <td className="font-medium">{lock.name}</td>
                                            <td>{lock.brand}</td>
                                            <td className="capitalize">{lock.type}</td>
                                            <td>{lock.minThickness}-{lock.maxThickness}mm</td>
                                            <td>{lock.backsets.join(', ')}mm</td>
                                            <td>
                                                <span className={`badge ${lock.difficulty === 'Easy' ? 'badge-success' : lock.difficulty === 'Moderate' ? 'badge-warning' : 'badge-danger'}`}>
                                                    {lock.difficulty}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg text-center">
                            <p className="text-red-800 font-medium">No standard smart locks match your door measurements. Consider consulting a locksmith for custom solutions.</p>
                        </div>
                    )}
                </div>

                {/* Incompatible Locks */}
                {results.incompatible.length > 0 && (
                    <div className="max-w-7xl mx-auto mt-12">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <X className="w-6 h-6" style={{ color: 'var(--color-danger)' }} />
                            Incompatible ({results.incompatible.length})
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Brand</th>
                                        <th>Why Incompatible</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.incompatible.map((lock, i) => (
                                        <tr key={i}>
                                            <td className="font-medium">{lock.name}</td>
                                            <td>{lock.brand}</td>
                                            <td className="text-sm" style={{ color: 'var(--color-danger)' }}>
                                                {lock.reasons.join(' · ')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Standard Measurements Reference */}
                <div className="max-w-7xl mx-auto mt-16">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Info className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                        Standard Door Measurements
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-lg shadow border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                            <h3 className="font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>Residential Standard</h3>
                            <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                <div>Thickness: <strong>35-44mm (1-3/8&quot; to 1-3/4&quot;)</strong></div>
                                <div>Backset: <strong>60 or 70mm</strong></div>
                                <div>Bore: <strong>54mm (2-1/8&quot;)</strong></div>
                                <div>Material: <strong>Wood or Fiberglass</strong></div>
                            </div>
                        </div>
                        <div className="p-6 rounded-lg shadow border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                            <h3 className="font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>Commercial Standard</h3>
                            <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                <div>Thickness: <strong>44-57mm (1-3/4&quot; to 2-1/4&quot;)</strong></div>
                                <div>Backset: <strong>70mm (2-3/4&quot;)</strong></div>
                                <div>Bore: <strong>54mm (2-1/8&quot;)</strong></div>
                                <div>Material: <strong>Metal or Wood</strong></div>
                            </div>
                        </div>
                        <div className="p-6 rounded-lg shadow border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                            <h3 className="font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>Extra-Thick / Custom</h3>
                            <div className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                <div>Thickness: <strong>57-90mm (2-1/4&quot; to 3-1/2&quot;)</strong></div>
                                <div>Backset: <strong>Varies (measure carefully)</strong></div>
                                <div>Bore: <strong>May need enlargement</strong></div>
                                <div>Adapter kit often required</div>
                            </div>
                        </div>
                    </div>
                </div>

                <ToolRating toolSlug="door-fit" />

                <BeTechCalculatorRecommendation
                    description="Be-Tech locks support a wide range of door thicknesses from 35mm to 70mm with adjustable backsets, making them compatible with both residential and commercial installations."
                    badge="Universal Fit"
                />

                <RelatedResources calculatorSlug="door-measurement-fit-checker" />

                {/* Related Tools */}
                <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/calculators/compatibility" className="link-card">
                            <h3 className="link-card__title">Door Compatibility</h3>
                            <p className="link-card__desc">Check ANSI/BHMA standard compliance</p>
                        </Link>
                        <Link href="/calculators/installation-cost" className="link-card">
                            <h3 className="link-card__title">Installation Cost</h3>
                            <p className="link-card__desc">Estimate total installation expenses</p>
                        </Link>
                        <Link href="/calculators/lock-compare" className="link-card">
                            <h3 className="link-card__title">Lock Comparison</h3>
                            <p className="link-card__desc">Side-by-side model comparison</p>
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
