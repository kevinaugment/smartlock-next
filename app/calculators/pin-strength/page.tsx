'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ShieldCheck, AlertTriangle, Eye, EyeOff, Info } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

/** Common weak PINs (top 30 most used) */
const COMMON_PINS = new Set([
    '0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999',
    '1234', '4321', '1122', '1212', '2580', '0852', '1357', '2468',
    '1230', '1010', '6969', '1004', '1313', '2001', '2000', '1998', '1999',
    '123456', '654321', '111111', '000000', '123123',
])

/** Check if PIN is a date pattern (MMDD, DDMM, MMDDYY, etc.) */
function isDatePattern(pin: string): boolean {
    if (pin.length === 4) {
        const mm = parseInt(pin.slice(0, 2))
        const dd = parseInt(pin.slice(2, 4))
        if ((mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31) ||
            (dd >= 1 && dd <= 12 && mm >= 1 && mm <= 31)) return true
    }
    if (pin.length === 6) {
        const mm = parseInt(pin.slice(0, 2))
        const dd = parseInt(pin.slice(2, 4))
        const yy = parseInt(pin.slice(4, 6))
        if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31 && yy >= 0 && yy <= 99) return true
    }
    if (pin.length === 8) {
        const yyyy = parseInt(pin.slice(0, 4))
        const mm = parseInt(pin.slice(4, 6))
        const dd = parseInt(pin.slice(6, 8))
        if (yyyy >= 1900 && yyyy <= 2030 && mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31) return true
    }
    return false
}

/** Check for sequential digits (ascending or descending) */
function hasSequentialDigits(pin: string): boolean {
    let ascending = 0
    let descending = 0
    for (let i = 1; i < pin.length; i++) {
        const diff = parseInt(pin[i]) - parseInt(pin[i - 1])
        if (diff === 1) ascending++
        else ascending = 0
        if (diff === -1) descending++
        else descending = 0
        if (ascending >= 2 || descending >= 2) return true
    }
    return false
}

/** Check for repeated digits */
function hasRepeatedDigits(pin: string): boolean {
    let count = 0
    for (let i = 1; i < pin.length; i++) {
        if (pin[i] === pin[i - 1]) count++
        else count = 0
        if (count >= 2) return true // 3+ same digits in a row
    }
    return false
}

/** Check for keyboard patterns */
function isKeyboardPattern(pin: string): boolean {
    const patterns = ['147', '258', '369', '741', '852', '963', '159', '753', '951', '357']
    return patterns.some(p => pin.includes(p))
}

interface AnalysisResult {
    entropy: number
    crackTimeSeconds: number
    crackTimeFormatted: string
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
    gradeLabel: string
    score: number
    warnings: string[]
    tips: string[]
}

function analyzePin(pin: string, keypadType: 'numeric' | 'alphanumeric', lockoutThreshold: number, lockoutDuration: number): AnalysisResult {
    const warnings: string[] = []
    const tips: string[] = []

    if (!pin) {
        return {
            entropy: 0, crackTimeSeconds: 0, crackTimeFormatted: 'Instant',
            grade: 'F', gradeLabel: 'No PIN', score: 0, warnings: ['Enter a PIN to analyze'], tips: [],
        }
    }

    // Calculate raw entropy
    const charsetSize = keypadType === 'numeric' ? 10 : 62 // 10 digits or 26+26+10
    const rawEntropy = Math.log2(Math.pow(charsetSize, pin.length))

    // Penalty-based scoring
    let effectiveEntropy = rawEntropy

    // Check common PINs
    if (COMMON_PINS.has(pin)) {
        warnings.push('This PIN is in the top 30 most commonly used PINs worldwide')
        effectiveEntropy = Math.min(effectiveEntropy, 5)
    }

    // Check date patterns
    if (isDatePattern(pin)) {
        warnings.push('Looks like a date (birthday/anniversary) — easily guessable')
        effectiveEntropy *= 0.5
    }

    // Check sequential digits
    if (hasSequentialDigits(pin)) {
        warnings.push('Contains sequential digits (e.g., 123, 987)')
        effectiveEntropy *= 0.6
    }

    // Check repeated digits
    if (hasRepeatedDigits(pin)) {
        warnings.push('Contains 3+ repeated digits in a row')
        effectiveEntropy *= 0.6
    }

    // Check all same digit
    if (new Set(pin.split('')).size === 1) {
        warnings.push('All digits are the same — extremely weak')
        effectiveEntropy = Math.min(effectiveEntropy, 3)
    }

    // Check keyboard pattern
    if (isKeyboardPattern(pin)) {
        warnings.push('Contains a keypad layout pattern (e.g., 147, 258)')
        effectiveEntropy *= 0.7
    }

    // Length warnings and tips
    if (pin.length < 4) {
        warnings.push('PIN is shorter than 4 digits — too short for any lock')
    } else if (pin.length === 4) {
        tips.push('Consider using 6+ digits if your lock supports it')
    }

    if (pin.length >= 8) {
        tips.push('Great length! Longer PINs are exponentially harder to crack')
    }

    if (keypadType === 'numeric' && warnings.length === 0) {
        tips.push('Consider alphanumeric if your lock supports letters')
    }

    // Calculate brute-force crack time with lockout
    const totalCombinations = Math.pow(charsetSize, pin.length)
    const avgAttempts = totalCombinations / 2

    // With lockout: after `lockoutThreshold` attempts, wait `lockoutDuration` seconds
    const lockoutCycles = Math.floor(avgAttempts / lockoutThreshold)
    const remainingAttempts = avgAttempts % lockoutThreshold
    const crackTimeSeconds = (lockoutCycles * lockoutDuration) + (remainingAttempts * 0.5) // 0.5s per attempt

    // Format crack time
    let crackTimeFormatted: string
    if (crackTimeSeconds < 1) crackTimeFormatted = 'Instant'
    else if (crackTimeSeconds < 60) crackTimeFormatted = `${Math.round(crackTimeSeconds)} seconds`
    else if (crackTimeSeconds < 3600) crackTimeFormatted = `${Math.round(crackTimeSeconds / 60)} minutes`
    else if (crackTimeSeconds < 86400) crackTimeFormatted = `${Math.round(crackTimeSeconds / 3600)} hours`
    else if (crackTimeSeconds < 31536000) crackTimeFormatted = `${Math.round(crackTimeSeconds / 86400)} days`
    else if (crackTimeSeconds < 31536000 * 100) crackTimeFormatted = `${Math.round(crackTimeSeconds / 31536000)} years`
    else crackTimeFormatted = `${(crackTimeSeconds / 31536000).toExponential(1)} years`

    // Grade based on effective entropy
    let grade: 'A' | 'B' | 'C' | 'D' | 'F'
    let gradeLabel: string
    let score: number

    if (effectiveEntropy >= 30) { grade = 'A'; gradeLabel = 'Excellent'; score = 95 }
    else if (effectiveEntropy >= 20) { grade = 'B'; gradeLabel = 'Good'; score = 75 }
    else if (effectiveEntropy >= 15) { grade = 'C'; gradeLabel = 'Fair'; score = 55 }
    else if (effectiveEntropy >= 10) { grade = 'D'; gradeLabel = 'Weak'; score = 35 }
    else { grade = 'F'; gradeLabel = 'Critical'; score = 15 }

    return { entropy: effectiveEntropy, crackTimeSeconds, crackTimeFormatted, grade, gradeLabel, score, warnings, tips }
}

export default function PinStrengthChecker() {
    const [pin, setPin] = useState('')
    const [showPin, setShowPin] = useState(false)
    const [keypadType, setKeypadType] = useState<'numeric' | 'alphanumeric'>('numeric')
    const [lockoutThreshold, setLockoutThreshold] = useState(5)
    const [lockoutDuration, setLockoutDuration] = useState(60)

    const result = useMemo(() =>
        analyzePin(pin, keypadType, lockoutThreshold, lockoutDuration),
        [pin, keypadType, lockoutThreshold, lockoutDuration]
    )

    const gradeClasses: Record<string, string> = {
        A: 'result-panel--grade-a',
        B: 'result-panel--grade-b',
        C: 'result-panel--grade-c',
        D: 'result-panel--grade-d',
        F: 'result-panel--grade-f',
    }

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back to Calculators</Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="page-header__icon"><ShieldCheck className="w-14 h-14 mx-auto" /></div>
                    <h1 className="text-4xl font-bold mb-4">PIN Security Strength Checker</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                        Evaluate the security of your smart lock PIN code against common attack patterns
                    </p>
                </div>

                {/* Key Insight */}
                <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="callout callout-info">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                            <div>
                                <h2 className="font-bold mb-1" style={{ fontSize: '1rem' }}>Did You Know?</h2>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    Research shows that &quot;1234&quot; accounts for nearly <strong>11%</strong> of all 4-digit PINs.
                                    The top 20 most common PINs cover over <strong>27%</strong> of all usage.
                                    A strong, unique PIN is your first line of defense against unauthorized access.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calculator */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Input Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                            <h2 className="text-2xl font-bold mb-6">Enter Your PIN</h2>
                            <div className="space-y-6">
                                {/* PIN Input */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        PIN Code
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPin ? 'text' : 'password'}
                                            value={pin}
                                            onChange={(e) => setPin(e.target.value.replace(keypadType === 'numeric' ? /[^0-9]/g : /[^a-zA-Z0-9]/g, ''))}
                                            placeholder={keypadType === 'numeric' ? 'Enter numeric PIN...' : 'Enter alphanumeric code...'}
                                            maxLength={16}
                                            className="w-full p-4 text-2xl tracking-[0.5em] font-mono border-2 rounded-lg focus:outline-none focus:ring-2"
                                            style={{ borderColor: 'var(--color-border)', fontFamily: 'monospace' }}
                                        />
                                        <button
                                            onClick={() => setShowPin(!showPin)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded"
                                            style={{ color: 'var(--color-text-muted)' }}
                                            type="button"
                                        >
                                            {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                        {pin.length}/16 characters · Analysis runs locally — PIN never leaves your browser
                                    </p>
                                </div>

                                {/* Keypad Type */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Keypad Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(['numeric', 'alphanumeric'] as const).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => { setKeypadType(type); if (type === 'numeric') setPin(pin.replace(/[^0-9]/g, '')) }}
                                                className="p-3 rounded-lg border-2 text-sm font-medium transition-all"
                                                style={{
                                                    borderColor: keypadType === type ? 'var(--color-accent)' : 'var(--color-border)',
                                                    background: keypadType === type ? 'var(--color-accent-subtle)' : 'white',
                                                    color: keypadType === type ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                }}
                                                type="button"
                                            >
                                                {type === 'numeric' ? '0-9 Numeric Only' : 'A-Z + 0-9 Alphanumeric'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Lockout Settings */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Lockout After Failed Attempts: {lockoutThreshold}
                                    </label>
                                    <input
                                        type="range" min={3} max={20} value={lockoutThreshold}
                                        onChange={(e) => setLockoutThreshold(Number(e.target.value))}
                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                        style={{ background: 'var(--color-border)' }}
                                    />
                                    <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <span>3 attempts</span><span>20 attempts</span>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Lockout Duration: {lockoutDuration}s
                                    </label>
                                    <input
                                        type="range" min={10} max={600} step={10} value={lockoutDuration}
                                        onChange={(e) => setLockoutDuration(Number(e.target.value))}
                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                                        style={{ background: 'var(--color-border)' }}
                                    />
                                    <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                                        <span>10 sec</span><span>10 min</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Warnings */}
                        {result.warnings.length > 0 && (
                            <div className="callout callout-danger">
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-danger)' }}>
                                    <AlertTriangle className="w-5 h-5" />
                                    <span>Security Warnings</span>
                                </h3>
                                <ul className="space-y-2">
                                    {result.warnings.map((w, i) => <li key={i} className="text-sm">• {w}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Tips */}
                        {result.tips.length > 0 && (
                            <div className="callout callout-info">
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
                                    <Info className="w-5 h-5" />
                                    <span>Tips to Improve</span>
                                </h3>
                                <ul className="space-y-2">
                                    {result.tips.map((t, i) => <li key={i} className="text-sm">• {t}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Results Panel */}
                    <div className="lg:col-span-1">
                        <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${gradeClasses[result.grade]}`}>
                            <h2 className="text-xl font-bold mb-6">Security Assessment</h2>
                            <div className="text-center mb-8">
                                <div className="text-7xl font-bold mb-2">{pin ? result.grade : '—'}</div>
                                <div className="text-2xl mb-2">{pin ? `${Math.round(result.score)}/100` : '—/100'}</div>
                                <div className="text-lg opacity-90">{pin ? result.gradeLabel : 'Enter PIN'}</div>
                            </div>

                            <div className="mb-6">
                                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white transition-all duration-500" style={{ width: `${result.score}%` }} />
                                </div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between bg-white/10 rounded-lg p-3">
                                    <span>Entropy</span>
                                    <span className="font-semibold">{pin ? `${result.entropy.toFixed(1)} bits` : '—'}</span>
                                </div>
                                <div className="flex justify-between bg-white/10 rounded-lg p-3">
                                    <span>Brute-Force Time</span>
                                    <span className="font-semibold">{pin ? result.crackTimeFormatted : '—'}</span>
                                </div>
                                <div className="flex justify-between bg-white/10 rounded-lg p-3">
                                    <span>PIN Length</span>
                                    <span className="font-semibold">{pin.length} chars</span>
                                </div>
                                <div className="flex justify-between bg-white/10 rounded-lg p-3">
                                    <span>Unique Digits</span>
                                    <span className="font-semibold">{new Set(pin.split('')).size}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Methodology */}
                <div className="max-w-7xl mx-auto mt-16">
                    <h2 className="text-2xl font-bold mb-6">How PIN Strength Is Calculated</h2>
                    <div className="overflow-x-auto">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Factor</th>
                                    <th>Impact</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-medium">PIN Length</td>
                                    <td>Exponential</td>
                                    <td>Each additional digit multiplies combinations by 10× (numeric) or 62× (alphanumeric)</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Common PINs</td>
                                    <td>Severe penalty</td>
                                    <td>Top 30 most-used PINs (1234, 0000, etc.) reduce entropy to near-zero</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Date Patterns</td>
                                    <td>50% entropy cut</td>
                                    <td>Birthdays and anniversaries are easily guessable via social engineering</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Sequential Digits</td>
                                    <td>40% entropy cut</td>
                                    <td>Ascending (123) or descending (987) sequences are among the first tried</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Repeated Digits</td>
                                    <td>40% entropy cut</td>
                                    <td>Three or more identical consecutive digits (e.g., 1117) reduce randomness</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Keypad Patterns</td>
                                    <td>30% entropy cut</td>
                                    <td>Vertical keypad columns (147, 258) or diagonals (159, 357)</td>
                                </tr>
                                <tr>
                                    <td className="font-medium">Lockout Policy</td>
                                    <td>Multiplier</td>
                                    <td>Forced delays after N failures drastically increase real-world crack time</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Entropy Reference */}
                <div className="max-w-7xl mx-auto mt-12">
                    <h2 className="text-2xl font-bold mb-6">Entropy Reference Guide</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { length: '4-digit numeric', entropy: '13.3 bits', combos: '10,000', time: '~83 min (5-try lockout)' },
                            { length: '6-digit numeric', entropy: '19.9 bits', combos: '1,000,000', time: '~139 days' },
                            { length: '8-digit numeric', entropy: '26.6 bits', combos: '100,000,000', time: '~38 years' },
                            { length: '4-char alphanumeric', entropy: '23.8 bits', combos: '14,776,336', time: '~24 years' },
                            { length: '6-char alphanumeric', entropy: '35.7 bits', combos: '56.8 billion', time: '~1,806 years' },
                            { length: '8-char alphanumeric', entropy: '47.6 bits', combos: '218 trillion', time: '~6.9M years' },
                        ].map((ref, i) => (
                            <div key={i} className="p-5 rounded-lg shadow border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                                <h3 className="font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{ref.length}</h3>
                                <div className="space-y-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                    <div className="flex justify-between"><span>Entropy:</span><span className="font-medium">{ref.entropy}</span></div>
                                    <div className="flex justify-between"><span>Combinations:</span><span className="font-medium">{ref.combos}</span></div>
                                    <div className="flex justify-between"><span>Crack time:</span><span className="font-medium">{ref.time}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ToolRating */}
                <ToolRating toolSlug="pin-strength" />

                {/* Be-Tech recommendation */}
                <BeTechCalculatorRecommendation
                    description="Be-Tech smart locks feature anti-tamper lockout, AES-128 encrypted keypads, and support for 6-12 digit PINs with max attempt limiting for superior keypad security."
                    badge="Secure Keypad"
                />

                {/* RelatedResources */}
                <RelatedResources calculatorSlug="pin-security-strength-checker" />

                {/* Related Tools */}
                <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/calculators/guest-code" className="link-card">
                            <h3 className="link-card__title">Guest Code Planner</h3>
                            <p className="link-card__desc">Plan guest code capacity and collision risk</p>
                        </Link>
                        <Link href="/calculators/security-compliance" className="link-card">
                            <h3 className="link-card__title">Security Compliance</h3>
                            <p className="link-card__desc">Check ANSI/BHMA/UL standard compliance</p>
                        </Link>
                        <Link href="/calculators/emergency-backup" className="link-card">
                            <h3 className="link-card__title">Emergency Backup</h3>
                            <p className="link-card__desc">Evaluate your emergency unlock plan</p>
                        </Link>
                    </div>
                </div>

                {/* Back Link */}
                <div className="max-w-7xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>
                        ← Back to All Calculators
                    </Link>
                </div>
            </div>
        </div>
    )
}
