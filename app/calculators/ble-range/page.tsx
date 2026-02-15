'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bluetooth, AlertTriangle, Lightbulb, Check } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface Inputs {
    bleVersion: string
    txPower: number
    obstacles: string[]
    distance: number
    deviceType: string
    environment: string
    interferenceLevel: string
}

const bleVersions: Record<string, { maxRange: number; sensitivity: number; label: string }> = {
    '4.0': { maxRange: 30, sensitivity: -93, label: 'BLE 4.0 (30m)' },
    '4.2': { maxRange: 50, sensitivity: -96, label: 'BLE 4.2 (50m)' },
    '5.0': { maxRange: 200, sensitivity: -98, label: 'BLE 5.0 (200m)' },
    '5.2': { maxRange: 200, sensitivity: -98, label: 'BLE 5.2 (200m, Direction Finding)' },
    '5.3': { maxRange: 200, sensitivity: -98, label: 'BLE 5.3 (200m, Enhanced)' },
}

const obstacleLoss: Record<string, { loss: number; label: string }> = {
    'glass': { loss: 2, label: 'Glass door/window' },
    'drywall': { loss: 4, label: 'Drywall partition' },
    'wood-door': { loss: 5, label: 'Wooden door' },
    'brick': { loss: 10, label: 'Brick wall' },
    'concrete': { loss: 15, label: 'Concrete wall' },
    'metal-door': { loss: 20, label: 'Metal door/frame' },
    'elevator': { loss: 30, label: 'Elevator shaft' },
}

export default function BLERangeCalculator() {
    const [inputs, setInputs] = useState<Inputs>({
        bleVersion: '5.0',
        txPower: 0,
        obstacles: [],
        distance: 3,
        deviceType: 'phone',
        environment: 'indoor',
        interferenceLevel: 'moderate',
    })

    const calculate = () => {
        const ble = bleVersions[inputs.bleVersion] || bleVersions['5.0']
        const issues: string[] = []
        const recommendations: string[] = []

        // Free-space path loss (FSPL) at 2.4 GHz
        const fspl = 20 * Math.log10(inputs.distance) + 20 * Math.log10(2400) + 20 * Math.log10(4 * Math.PI / 300)

        // Obstacle attenuation
        let totalObstacleLoss = 0
        for (const obs of inputs.obstacles) {
            totalObstacleLoss += obstacleLoss[obs]?.loss || 0
        }

        // Environment loss
        const envLoss: Record<string, number> = { outdoor: 0, indoor: 5, dense_indoor: 10, industrial: 15 }
        const environmentLoss = envLoss[inputs.environment] || 5

        // Interference
        const interferenceLoss: Record<string, number> = { low: 0, moderate: 3, high: 8, severe: 15 }
        const intLoss = interferenceLoss[inputs.interferenceLevel] || 3

        // Device receiver sensitivity
        const deviceSensitivity: Record<string, number> = { phone: -90, tablet: -88, dedicated: -95 }
        const rxSensitivity = deviceSensitivity[inputs.deviceType] || -90

        const totalLoss = fspl + totalObstacleLoss + environmentLoss + intLoss
        const receivedPower = inputs.txPower - totalLoss
        const linkMargin = receivedPower - rxSensitivity

        // Estimated RSSI range for proximity
        const rssiAtDistance = receivedPower
        const proximityZone = rssiAtDistance >= -50 ? 'Immediate (<1m)' :
            rssiAtDistance >= -65 ? 'Near (1-3m)' :
                rssiAtDistance >= -80 ? 'Far (3-10m)' :
                    rssiAtDistance >= -90 ? 'Weak (10-30m)' : 'Out of Range'

        // Maximum effective range (where link margin = 0)
        const maxEffectiveRange = Math.pow(10, ((inputs.txPower - rxSensitivity - totalObstacleLoss - environmentLoss - intLoss - 20 * Math.log10(2400) - 20 * Math.log10(4 * Math.PI / 300)) / 20))

        // Unlock reliability
        const reliabilityScore = linkMargin >= 20 ? 99 : linkMargin >= 10 ? 95 : linkMargin >= 5 ? 85 : linkMargin >= 0 ? 60 : 0

        if (linkMargin < 0) {
            issues.push('Signal does not reach device at this distance — connection impossible')
            recommendations.push('Move closer, remove obstacles, or increase TX power')
        } else if (linkMargin < 5) {
            issues.push('Marginal signal — frequent disconnections expected')
            recommendations.push('Reduce distance or remove obstacles')
        }

        if (inputs.obstacles.includes('metal-door')) {
            issues.push('Metal doors/frames severely attenuate BLE signals')
            recommendations.push('Install BLE repeater on far side of metal door')
        }

        if (inputs.interferenceLevel === 'severe') {
            issues.push('Severe 2.4 GHz interference — consider dedicated IoT channel')
            recommendations.push('Reduce Wi-Fi channel overlap and move 2.4 GHz devices')
        }

        if (inputs.txPower > 4) {
            recommendations.push('High TX power reduces battery life — lower if proximity unlock is sufficient')
        }

        if (issues.length === 0) {
            recommendations.push('Signal conditions are adequate for reliable BLE operation')
        }

        return {
            totalLoss: Math.round(totalLoss * 10) / 10,
            receivedPower: Math.round(receivedPower * 10) / 10,
            linkMargin: Math.round(linkMargin * 10) / 10,
            rssiAtDistance: Math.round(rssiAtDistance),
            proximityZone,
            maxEffectiveRange: Math.round(Math.max(0, maxEffectiveRange) * 10) / 10,
            reliabilityScore,
            issues,
            recommendations,
        }
    }

    const result = calculate()

    const toggleObstacle = (obs: string) => {
        setInputs(prev => ({
            ...prev,
            obstacles: prev.obstacles.includes(obs) ? prev.obstacles.filter(o => o !== obs) : [...prev.obstacles, obs],
        }))
    }

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back</Link>

                <div className="text-center mb-12">
                    <div className="page-header__icon"><Bluetooth className="w-14 h-14 mx-auto" /></div>
                    <h1 className="page-header__title">BLE Range & Proximity Calculator</h1>
                    <p className="page-header__subtitle">
                        Estimate Bluetooth Low Energy signal coverage for proximity-based smart lock unlocking
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="content-card">
                        <h2 className="section-title">Signal Parameters</h2>
                        <div className="space-y-6">
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>BLE Version</label>
                                <select value={inputs.bleVersion} onChange={e => setInputs({ ...inputs, bleVersion: e.target.value })} className="form-input">
                                    {Object.entries(bleVersions).map(([k, v]) => (
                                        <option key={k} value={k}>{v.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    TX Power: {inputs.txPower} dBm
                                </label>
                                <input type="range" min="-20" max="20" step="1" value={inputs.txPower}
                                    onChange={e => setInputs({ ...inputs, txPower: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                                <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}><span>-20 dBm</span><span>+20 dBm</span></div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Distance: {inputs.distance}m
                                </label>
                                <input type="range" min="0.5" max="50" step="0.5" value={inputs.distance}
                                    onChange={e => setInputs({ ...inputs, distance: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                                <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}><span>0.5m</span><span>50m</span></div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Mobile Device</label>
                                <select value={inputs.deviceType} onChange={e => setInputs({ ...inputs, deviceType: e.target.value })} className="form-input">
                                    <option value="phone">Smartphone (-90 dBm)</option>
                                    <option value="tablet">Tablet (-88 dBm)</option>
                                    <option value="dedicated">Dedicated BLE Fob (-95 dBm)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Environment</label>
                                <select value={inputs.environment} onChange={e => setInputs({ ...inputs, environment: e.target.value })} className="form-input">
                                    <option value="outdoor">Outdoor (Open Air)</option>
                                    <option value="indoor">Indoor (Typical)</option>
                                    <option value="dense_indoor">Dense Indoor (Furniture/Clutter)</option>
                                    <option value="industrial">Industrial / Warehouse</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>RF Interference Level</label>
                                <select value={inputs.interferenceLevel} onChange={e => setInputs({ ...inputs, interferenceLevel: e.target.value })} className="form-input">
                                    <option value="low">Low (Rural / Few devices)</option>
                                    <option value="moderate">Moderate (Typical home/office)</option>
                                    <option value="high">High (Dense WiFi / Many BLE devices)</option>
                                    <option value="severe">Severe (Industrial / Healthcare)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Obstacles Between Lock & Device</label>
                                <div className="space-y-2">
                                    {Object.entries(obstacleLoss).map(([key, obs]) => (
                                        <label key={key} className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                                            <input type="checkbox" checked={inputs.obstacles.includes(key)} onChange={() => toggleObstacle(key)} className="w-4 h-4" />
                                            <span>{obs.label} (−{obs.loss} dB)</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${result.reliabilityScore >= 95 ? 'bg-gradient-to-br from-green-600 to-green-700' :
                                result.reliabilityScore >= 80 ? 'bg-gradient-to-br from-blue-600 to-blue-700' :
                                    result.reliabilityScore >= 50 ? 'bg-gradient-to-br from-yellow-600 to-yellow-700' :
                                        'bg-gradient-to-br from-red-600 to-red-700'
                            }`}>
                            <h2 className="text-xl font-bold mb-6">Signal Analysis</h2>
                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold mb-2">{result.reliabilityScore}%</div>
                                <div className="text-lg opacity-90">Unlock Reliability</div>
                                <div className="mt-2 text-sm opacity-80">{result.proximityZone}</div>
                            </div>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">RSSI at Distance</span>
                                    <span className="font-semibold">{result.rssiAtDistance} dBm</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Total Path Loss</span>
                                    <span className="font-semibold">{result.totalLoss} dB</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-white/20">
                                    <span className="opacity-90">Link Margin</span>
                                    <span className="font-semibold">{result.linkMargin} dB</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-90">Max Effective Range</span>
                                    <span className="font-semibold">{result.maxEffectiveRange}m</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-white/10 rounded-lg text-sm">
                                <div className="font-semibold mb-2">RSSI Scale</div>
                                <div className="space-y-1 text-xs">
                                    <div className="flex justify-between"><span>-50 or higher</span><span>Excellent</span></div>
                                    <div className="flex justify-between"><span>-50 to -65</span><span>Near / Good</span></div>
                                    <div className="flex justify-between"><span>-65 to -80</span><span>Far / Usable</span></div>
                                    <div className="flex justify-between"><span>-80 to -90</span><span>Weak / Unreliable</span></div>
                                    <div className="flex justify-between"><span>Below -90</span><span>Out of Range</span></div>
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
                                    <AlertTriangle className="w-5 h-5" /> Signal Issues
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

                <ToolRating toolSlug="ble-range" />
                <RelatedResources calculatorSlug="ble-range" />
                <BeTechCalculatorRecommendation
                    description="Be-Tech locks feature BLE 5.0 with configurable TX power and proximity-based auto-unlock. Reliable detection at up to 10m through standard walls."
                    badge="BLE 5.0"
                />

                <div className="max-w-6xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
