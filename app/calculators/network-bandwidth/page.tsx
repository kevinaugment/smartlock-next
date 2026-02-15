'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Wifi, AlertTriangle, Lightbulb, Check } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

interface Inputs {
    lockCount: number
    protocol: string
    features: string[]
    cloudPlatform: string
    syncFrequency: string
    videoEnabled: boolean
    firmwareUpdateFreq: string
}

const protocolBandwidth: Record<string, { perLockKbps: number; overhead: number }> = {
    wifi: { perLockKbps: 15, overhead: 1.3 },
    zigbee: { perLockKbps: 2, overhead: 1.1 },
    zwave: { perLockKbps: 1.5, overhead: 1.1 },
    thread: { perLockKbps: 3, overhead: 1.15 },
    ble: { perLockKbps: 1, overhead: 1.05 },
}

const featureBandwidth: Record<string, number> = {
    audit_logs: 2,
    realtime_notifications: 5,
    remote_unlock: 3,
    user_sync: 4,
    camera_snapshot: 50,
    video_stream: 500,
    ota_updates: 0,
    voice_integration: 8,
}

export default function NetworkBandwidthCalculator() {
    const [inputs, setInputs] = useState<Inputs>({
        lockCount: 10,
        protocol: 'wifi',
        features: ['audit_logs', 'realtime_notifications'],
        cloudPlatform: 'standard',
        syncFrequency: 'realtime',
        videoEnabled: false,
        firmwareUpdateFreq: 'monthly',
    })

    const calculate = () => {
        const proto = protocolBandwidth[inputs.protocol] || protocolBandwidth.wifi
        const issues: string[] = []
        const recommendations: string[] = []

        // Base bandwidth
        let baseBandwidth = proto.perLockKbps * inputs.lockCount * proto.overhead

        // Feature bandwidth
        let featureBw = 0
        for (const feat of inputs.features) {
            featureBw += (featureBandwidth[feat] || 0) * inputs.lockCount
        }

        // Video
        if (inputs.videoEnabled) {
            featureBw += featureBandwidth.video_stream * Math.min(inputs.lockCount, 4)
            featureBw += featureBandwidth.camera_snapshot * inputs.lockCount
        }

        // Sync frequency multiplier
        const syncMultiplier: Record<string, number> = { realtime: 1.0, '5min': 0.5, '15min': 0.3, hourly: 0.1 }
        const syncMult = syncMultiplier[inputs.syncFrequency] || 1.0

        // Cloud platform overhead
        const platformOverhead: Record<string, number> = { standard: 1.0, heavy: 1.5, enterprise: 2.0 }
        const platMult = platformOverhead[inputs.cloudPlatform] || 1.0

        const totalKbps = (baseBandwidth + featureBw) * syncMult * platMult
        const totalMbps = totalKbps / 1000

        // Monthly data usage (GB)
        const monthlyGB = (totalKbps / 8) * 3600 * 24 * 30 / 1_000_000

        // OTA updates (burst)
        const otaSizePerLockMB: Record<string, number> = { monthly: 50, quarterly: 50, biannual: 50 }
        const otaBurst = (otaSizePerLockMB[inputs.firmwareUpdateFreq] || 50) * inputs.lockCount

        // Issues
        if (totalMbps > 100) {
            issues.push('Total bandwidth exceeds 100 Mbps — dedicated network recommended')
        }
        if (totalMbps > 10 && inputs.protocol === 'wifi') {
            issues.push('Wi-Fi bandwidth significant — consider QoS rules for lock traffic')
        }
        if (inputs.videoEnabled && inputs.lockCount > 10) {
            issues.push('Video on 10+ locks requires dedicated bandwidth allocation')
            recommendations.push('Use snapshot-only mode instead of continuous video')
        }
        if (monthlyGB > 50) {
            issues.push(`Monthly data usage (~${monthlyGB.toFixed(0)} GB) may be costly on metered connections`)
        }
        if (inputs.protocol === 'wifi' && inputs.lockCount > 30) {
            recommendations.push('Consider mesh protocols (Zigbee/Thread) for 30+ lock deployments to reduce Wi-Fi congestion')
        }

        if (issues.length === 0) {
            recommendations.push('Bandwidth requirements are within standard network capacity')
        }

        return {
            baseBandwidthKbps: Math.round(baseBandwidth),
            featureBandwidthKbps: Math.round(featureBw),
            totalKbps: Math.round(totalKbps),
            totalMbps: Math.round(totalMbps * 100) / 100,
            monthlyGB: Math.round(monthlyGB * 10) / 10,
            otaBurstMB: otaBurst,
            issues,
            recommendations,
        }
    }

    const result = calculate()

    const toggleFeature = (feat: string) => {
        setInputs(prev => ({
            ...prev,
            features: prev.features.includes(feat) ? prev.features.filter(f => f !== feat) : [...prev.features, feat],
        }))
    }

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link">← Back</Link>

                <div className="text-center mb-12">
                    <div className="page-header__icon"><Wifi className="w-14 h-14 mx-auto" /></div>
                    <h1 className="page-header__title">Network Bandwidth Calculator</h1>
                    <p className="page-header__subtitle">
                        Estimate bandwidth requirements for cloud-connected smart lock deployments
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="content-card">
                        <h2 className="section-title">Deployment Parameters</h2>
                        <div className="space-y-6">
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                    Lock Count: {inputs.lockCount}
                                </label>
                                <input type="range" min="1" max="500" value={inputs.lockCount}
                                    onChange={e => setInputs({ ...inputs, lockCount: Number(e.target.value) })}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
                                />
                                <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}><span>1</span><span>500</span></div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Protocol</label>
                                <select value={inputs.protocol} onChange={e => setInputs({ ...inputs, protocol: e.target.value })} className="form-input">
                                    <option value="wifi">Wi-Fi (Highest bandwidth)</option>
                                    <option value="thread">Thread / Matter</option>
                                    <option value="zigbee">Zigbee</option>
                                    <option value="zwave">Z-Wave</option>
                                    <option value="ble">BLE</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Cloud Sync Frequency</label>
                                <select value={inputs.syncFrequency} onChange={e => setInputs({ ...inputs, syncFrequency: e.target.value })} className="form-input">
                                    <option value="realtime">Real-time</option>
                                    <option value="5min">Every 5 minutes</option>
                                    <option value="15min">Every 15 minutes</option>
                                    <option value="hourly">Hourly</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Cloud Platform</label>
                                <select value={inputs.cloudPlatform} onChange={e => setInputs({ ...inputs, cloudPlatform: e.target.value })} className="form-input">
                                    <option value="standard">Standard (basic telemetry)</option>
                                    <option value="heavy">Heavy (analytics + alerts)</option>
                                    <option value="enterprise">Enterprise (full API integration)</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>OTA Update Frequency</label>
                                <select value={inputs.firmwareUpdateFreq} onChange={e => setInputs({ ...inputs, firmwareUpdateFreq: e.target.value })} className="form-input">
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="biannual">Biannual</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Features</label>
                                <div className="space-y-2">
                                    {[
                                        { key: 'audit_logs', label: 'Audit Logs' },
                                        { key: 'realtime_notifications', label: 'Real-time Notifications' },
                                        { key: 'remote_unlock', label: 'Remote Unlock' },
                                        { key: 'user_sync', label: 'User Database Sync' },
                                        { key: 'camera_snapshot', label: 'Camera Snapshots' },
                                        { key: 'voice_integration', label: 'Voice Assistant Integration' },
                                    ].map(f => (
                                        <label key={f.key} className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                                            <input type="checkbox" checked={inputs.features.includes(f.key)} onChange={() => toggleFeature(f.key)} className="w-4 h-4" />
                                            <span>{f.label}</span>
                                        </label>
                                    ))}
                                    <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                                        <input type="checkbox" checked={inputs.videoEnabled} onChange={e => setInputs({ ...inputs, videoEnabled: e.target.checked })} className="w-4 h-4" />
                                        <span>Video Doorbell / Camera Stream</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="p-8 rounded-lg shadow-lg text-white sticky top-4" style={{ background: 'linear-gradient(to bottom right, var(--color-accent), var(--color-accent-dark, #4338ca))' }}>
                            <h2 className="text-xl font-bold mb-6">Bandwidth Estimate</h2>
                            <div className="text-center mb-8">
                                <div className="text-5xl font-bold mb-2">{result.totalMbps < 1 ? `${result.totalKbps} Kbps` : `${result.totalMbps} Mbps`}</div>
                                <div className="text-lg opacity-90">Continuous Bandwidth</div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center pb-2 border-b border-white/20 text-sm">
                                    <span className="opacity-90">Base Protocol Traffic</span>
                                    <span className="font-semibold">{result.baseBandwidthKbps} Kbps</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-white/20 text-sm">
                                    <span className="opacity-90">Feature Traffic</span>
                                    <span className="font-semibold">{result.featureBandwidthKbps} Kbps</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-white/20 text-sm">
                                    <span className="opacity-90">Monthly Data Usage</span>
                                    <span className="font-semibold">{result.monthlyGB} GB</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-white/20 text-sm">
                                    <span className="opacity-90">OTA Update Burst</span>
                                    <span className="font-semibold">{result.otaBurstMB} MB</span>
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-lg p-4 text-sm">
                                <div className="font-semibold mb-2">Recommended Internet Plan:</div>
                                <div className="text-lg font-bold">
                                    {result.totalMbps < 5 ? '25 Mbps' : result.totalMbps < 25 ? '50 Mbps' : result.totalMbps < 100 ? '200 Mbps' : '500+ Mbps'}
                                </div>
                                <div className="text-xs opacity-80 mt-1">(4:1 headroom for peak traffic)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {(result.issues.length > 0 || result.recommendations.length > 0) && (
                    <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
                        {result.issues.length > 0 && (
                            <div className="callout callout-danger">
                                <h3 className="text-lg font-bold mb-3 inline-flex items-center gap-2" style={{ color: 'var(--color-danger)' }}>
                                    <AlertTriangle className="w-5 h-5" /> Network Concerns
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

                <ToolRating toolSlug="network-bandwidth" />
                <RelatedResources calculatorSlug="network-bandwidth" />
                <BeTechCalculatorRecommendation
                    description="Be-Tech locks support efficient Zigbee and Z-Wave protocols that minimize network bandwidth consumption while maintaining reliable cloud connectivity."
                    badge="Low Bandwidth"
                />

                <div className="max-w-6xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
