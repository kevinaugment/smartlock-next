'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ShieldAlert, Lock, Wifi, RefreshCw, Check, X, AlertTriangle, Info } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

interface CyberRiskResult {
    score: number
    grade: string
    gradeClass: string
    categoryScores: {
        authentication: number
        encryption: number
        firmware: number
        network: number
        physical: number
    }
    risks: { severity: 'critical' | 'high' | 'medium' | 'low'; text: string }[]
    mitigations: string[]
}

export default function CyberRiskScorecard() {
    const faqs = [
        {
            question: 'Can smart locks be hacked?',
            answer: 'Smart locks can be attacked through weak PINs, default credentials, insecure Bluetooth, cloud account compromise, exposed APIs, outdated firmware, or physical tampering. Risk depends on configuration and vendor controls.',
        },
        {
            question: 'What increases cyber risk?',
            answer: 'Cyber risk increases when locks lack lockout controls, use unknown encryption, skip firmware updates, depend fully on cloud access, expose APIs, or store credentials without encryption.',
        },
        {
            question: 'Are firmware updates required?',
            answer: 'Firmware updates are important because smart locks can inherit vulnerabilities from radio chips, mobile apps, cloud APIs, and vendor services. A lock with no update path is harder to defend over time.',
        },
        {
            question: 'Is cloud access risky?',
            answer: 'Cloud access adds convenience and remote administration, but it also adds account, API, vendor, and outage risk. Use MFA, least-privilege admin accounts, audit logs, and offline fallback access.',
        },
        {
            question: 'How do I reduce smart lock attack surface?',
            answer: 'Reduce attack surface by changing default credentials, enabling lockout, using strong PIN policy, keeping firmware updated, closing unnecessary ports, limiting cloud admins, and preserving physical backup access.',
        },
    ]

    // Authentication
    const [authMethods, setAuthMethods] = useState({ pin: true, rfid: true, fingerprint: false, mobile: true, physical_key: true })
    const [mfaEnabled, setMfaEnabled] = useState(false)
    const [failedAttemptLockout, setFailedAttemptLockout] = useState(true)
    const [lockoutThreshold, setLockoutThreshold] = useState(5)
    const [defaultCredChanged, setDefaultCredChanged] = useState(true)

    // Encryption
    const [commEncryption, setCommEncryption] = useState<'aes128' | 'aes256' | 'tls12' | 'tls13' | 'none' | 'unknown'>('aes128')
    const [bleSecure, setBleSecure] = useState(true)
    const [credentialEncrypted, setCredentialEncrypted] = useState(true)

    // Firmware
    const [firmwareUpdates, setFirmwareUpdates] = useState<'auto-ota' | 'manual-ota' | 'usb' | 'none'>('manual-ota')
    const [lastUpdate, setLastUpdate] = useState<'recent' | '6mo' | '1y' | 'never' | 'unknown'>('6mo')
    const [signedFirmware, setSignedFirmware] = useState(true)

    // Network
    const [cloudConnected, setCloudConnected] = useState(true)
    const [offlineCapable, setOfflineCapable] = useState(true)
    const [openPorts, setOpenPorts] = useState(false)
    const [apiKeyRotation, setApiKeyRotation] = useState(false)

    // Physical
    const [tamperAlarm, setTamperAlarm] = useState(true)
    const [antiPickRating, setAntiPickRating] = useState<'ansi1' | 'ansi2' | 'ansi3' | 'unknown'>('ansi2')

    const result = useMemo((): CyberRiskResult => {
        const risks: CyberRiskResult['risks'] = []
        const mitigations: string[] = []

        // Authentication score (0-20)
        let authScore = 20
        const methodCount = Object.values(authMethods).filter(Boolean).length
        if (methodCount === 1) { authScore -= 3; risks.push({ severity: 'medium', text: 'Single authentication method increases unauthorized access risk' }) }
        if (!mfaEnabled) { authScore -= 4; risks.push({ severity: 'high', text: 'No multi-factor authentication — single credential compromise grants full access' }); mitigations.push('Enable two-factor authentication (e.g., PIN + fingerprint)') }
        if (!failedAttemptLockout) { authScore -= 5; risks.push({ severity: 'critical', text: 'No failed attempt lockout — vulnerable to brute-force attacks' }); mitigations.push('Enable account lockout after 5 failed attempts') }
        if (failedAttemptLockout && lockoutThreshold > 10) { authScore -= 2; risks.push({ severity: 'medium', text: `Lockout after ${lockoutThreshold} attempts is too lenient — 5-10 recommended` }) }
        if (!defaultCredChanged) { authScore -= 5; risks.push({ severity: 'critical', text: 'Default credentials not changed — most common attack vector for IoT devices' }); mitigations.push('Immediately change all default admin passwords and PINs') }

        // Encryption score (0-20)
        let encScore = 20
        if (commEncryption === 'none') { encScore -= 10; risks.push({ severity: 'critical', text: 'No communication encryption — data visible to any network listener' }); mitigations.push('Require AES-128 minimum for all wireless communication') }
        else if (commEncryption === 'unknown') { encScore -= 5; risks.push({ severity: 'high', text: 'Encryption status unknown — verify with vendor documentation' }) }
        else if (commEncryption === 'aes128') { encScore -= 1 } // Acceptable
        if (!bleSecure && authMethods.mobile) { encScore -= 4; risks.push({ severity: 'high', text: 'BLE communication not secured — vulnerable to replay attacks' }); mitigations.push('Enable BLE Secure Connections with LESC pairing') }
        if (!credentialEncrypted) { encScore -= 5; risks.push({ severity: 'critical', text: 'Credentials stored unencrypted — breach exposes all access codes' }); mitigations.push('Enable credential encryption on the lock and management system') }

        // Firmware score (0-20)
        let fwScore = 20
        if (firmwareUpdates === 'none') { fwScore -= 8; risks.push({ severity: 'critical', text: 'No firmware update capability — vulnerabilities can never be patched' }); mitigations.push('Choose locks that support OTA firmware updates') }
        else if (firmwareUpdates === 'usb') { fwScore -= 3; risks.push({ severity: 'medium', text: 'USB-only updates are cumbersome — OTA updates reduce time-to-patch' }) }
        if (lastUpdate === 'never') { fwScore -= 6; risks.push({ severity: 'high', text: 'Firmware never updated — likely vulnerable to known exploits' }); mitigations.push('Apply the latest firmware update immediately') }
        else if (lastUpdate === '1y') { fwScore -= 4; risks.push({ severity: 'high', text: 'Firmware not updated in 12+ months — may be missing critical patches' }) }
        else if (lastUpdate === '6mo') { fwScore -= 1 }
        if (!signedFirmware) { fwScore -= 4; risks.push({ severity: 'high', text: 'Unsigned firmware — no protection against malicious firmware injection' }); mitigations.push('Ensure firmware is cryptographically signed by the manufacturer') }

        // Network score (0-20)
        let netScore = 20
        if (cloudConnected && !offlineCapable) { netScore -= 4; risks.push({ severity: 'medium', text: 'Cloud-only operation — lock becomes unusable during internet outages' }); mitigations.push('Ensure offline access capability for business continuity') }
        if (openPorts) { netScore -= 5; risks.push({ severity: 'high', text: 'Open network ports detected — increases attack surface' }); mitigations.push('Close unnecessary network ports and use firewall rules') }
        if (cloudConnected && !apiKeyRotation) { netScore -= 3; risks.push({ severity: 'medium', text: 'API keys are not rotated — long-lived keys increase compromise risk' }); mitigations.push('Implement automatic API key rotation every 90 days') }

        // Physical score (0-20)
        let physScore = 20
        if (!tamperAlarm) { physScore -= 4; risks.push({ severity: 'medium', text: 'No tamper alarm — physical attacks go undetected' }); mitigations.push('Enable tamper detection alerts') }
        if (antiPickRating === 'ansi1') { physScore -= 4; risks.push({ severity: 'medium', text: 'ANSI Grade 1 is residential — commercial applications need Grade 2+' }) }
        if (antiPickRating === 'unknown') { physScore -= 3; risks.push({ severity: 'low', text: 'ANSI/BHMA grade unknown — verify physical security rating' }) }

        // Normalize
        authScore = Math.max(0, authScore)
        encScore = Math.max(0, encScore)
        fwScore = Math.max(0, fwScore)
        netScore = Math.max(0, netScore)
        physScore = Math.max(0, physScore)

        const totalScore = authScore + encScore + fwScore + netScore + physScore
        const grade = totalScore >= 85 ? 'A' : totalScore >= 70 ? 'B' : totalScore >= 55 ? 'C' : totalScore >= 40 ? 'D' : 'F'
        const gradeClass = totalScore >= 85 ? 'result-panel--grade-a' : totalScore >= 70 ? 'result-panel--grade-b' : totalScore >= 55 ? 'result-panel--grade-c' : totalScore >= 40 ? 'result-panel--grade-d' : 'result-panel--grade-f'

        if (risks.length === 0) mitigations.push('Your security posture looks strong — maintain regular firmware updates and credential rotation')

        return {
            score: totalScore, grade, gradeClass,
            categoryScores: { authentication: authScore, encryption: encScore, firmware: fwScore, network: netScore, physical: physScore },
            risks, mitigations,
        }
    }, [authMethods, mfaEnabled, failedAttemptLockout, lockoutThreshold, defaultCredChanged, commEncryption, bleSecure, credentialEncrypted, firmwareUpdates, lastUpdate, signedFirmware, cloudConnected, offlineCapable, openPorts, apiKeyRotation, tamperAlarm, antiPickRating])

    const categoryLabels = [
        { key: 'authentication' as const, label: 'Authentication', icon: Lock, max: 20 },
        { key: 'encryption' as const, label: 'Encryption', icon: Lock, max: 20 },
        { key: 'firmware' as const, label: 'Firmware', icon: RefreshCw, max: 20 },
        { key: 'network' as const, label: 'Network', icon: Wifi, max: 20 },
        { key: 'physical' as const, label: 'Physical', icon: ShieldAlert, max: 20 },
    ]

    return (
        <div className="page-bg">
            <div className="container-main section">
                <Link href="/calculators" className="back-link" prefetch={false}>← Back to Calculators</Link>

                <div className="page-header">
                    <div className="page-header__icon"><ShieldAlert className="w-14 h-14" /></div>
                    <h1 className="text-4xl font-bold mb-4">Cyber Risk Scorecard</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>
                        Evaluate the digital attack surface of your smart lock deployment
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <CalculatorAnswerBlock
                        title="Can smart locks be hacked?"
                        answer="Smart locks can be hacked or misused when authentication, encryption, firmware, cloud access, network exposure, or physical tamper controls are weak. The practical risk is lower when the deployment uses unique credentials, failed-attempt lockout, encrypted communication, signed firmware updates, limited admin access, and offline fallback access."
                    >
                        <div className="data-table-wrap">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Risk area</th>
                                        <th>Common weak point</th>
                                        <th>Minimum control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Authentication</td><td>Shared or short PINs</td><td>Unique codes and lockout</td></tr>
                                    <tr><td>Firmware</td><td>No update process</td><td>Signed OTA updates</td></tr>
                                    <tr><td>Cloud</td><td>Overbroad admin access</td><td>MFA and audit logs</td></tr>
                                    <tr><td>Network</td><td>Open ports or exposed APIs</td><td>Firewall and key rotation</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </CalculatorAnswerBlock>
                </div>

                <div className="max-w-4xl mx-auto" style={{ marginBottom: 'var(--space-3xl)' }}>
                    <div className="callout callout-info">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                            <div>
                                <h2 className="font-bold mb-1" style={{ fontSize: '1rem' }}>5-Category Assessment</h2>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    This scorecard rates your smart lock&apos;s cybersecurity across <strong>Authentication</strong>,
                                    <strong> Encryption</strong>, <strong>Firmware</strong>, <strong>Network</strong>, and <strong>Physical</strong> security —
                                    each worth 20 points for a total of 100.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Authentication */}
                        <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Lock className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> Authentication</h2>
                            <div className="space-y-4">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Active Authentication Methods
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {[
                                            { key: 'pin', label: 'PIN / Keypad' },
                                            { key: 'rfid', label: 'RFID / Card' },
                                            { key: 'fingerprint', label: 'Fingerprint' },
                                            { key: 'mobile', label: 'Mobile App' },
                                            { key: 'physical_key', label: 'Physical Key' },
                                        ].map(m => (
                                            <label key={m.key} className="flex items-center gap-2 p-2 rounded border cursor-pointer text-sm" style={{ borderColor: 'var(--color-border)' }}>
                                                <input type="checkbox" checked={authMethods[m.key as keyof typeof authMethods]} onChange={(e) => setAuthMethods(prev => ({ ...prev, [m.key]: e.target.checked }))} className="w-4 h-4" />
                                                {m.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="flex items-center gap-2 p-2 rounded border cursor-pointer text-sm" style={{ borderColor: 'var(--color-border)' }}>
                                        <input type="checkbox" checked={mfaEnabled} onChange={(e) => setMfaEnabled(e.target.checked)} className="w-4 h-4" /> MFA Enabled
                                    </label>
                                    <label className="flex items-center gap-2 p-2 rounded border cursor-pointer text-sm" style={{ borderColor: 'var(--color-border)' }}>
                                        <input type="checkbox" checked={failedAttemptLockout} onChange={(e) => setFailedAttemptLockout(e.target.checked)} className="w-4 h-4" /> Lockout Enabled
                                    </label>
                                    <label className="flex items-center gap-2 p-2 rounded border cursor-pointer text-sm" style={{ borderColor: 'var(--color-border)' }}>
                                        <input type="checkbox" checked={defaultCredChanged} onChange={(e) => setDefaultCredChanged(e.target.checked)} className="w-4 h-4" /> Defaults Changed
                                    </label>
                                </div>
                                {failedAttemptLockout && (
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                            Lockout After: {lockoutThreshold} attempts
                                        </label>
                                        <input type="range" min={3} max={20} value={lockoutThreshold}
                                            onChange={(e) => setLockoutThreshold(Number(e.target.value))}
                                            className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Encryption */}
                        <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Lock className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> Encryption</h2>
                            <div className="space-y-4">
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Communication Encryption</label>
                                    <select value={commEncryption} onChange={(e) => setCommEncryption(e.target.value as typeof commEncryption)}
                                        className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                        <option value="aes256">AES-256</option>
                                        <option value="aes128">AES-128</option>
                                        <option value="tls13">TLS 1.3</option>
                                        <option value="tls12">TLS 1.2</option>
                                        <option value="none">None / Cleartext</option>
                                        <option value="unknown">Unknown</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="flex items-center gap-2 p-2 rounded border cursor-pointer text-sm" style={{ borderColor: 'var(--color-border)' }}>
                                        <input type="checkbox" checked={bleSecure} onChange={(e) => setBleSecure(e.target.checked)} className="w-4 h-4" /> BLE Secure Connections
                                    </label>
                                    <label className="flex items-center gap-2 p-2 rounded border cursor-pointer text-sm" style={{ borderColor: 'var(--color-border)' }}>
                                        <input type="checkbox" checked={credentialEncrypted} onChange={(e) => setCredentialEncrypted(e.target.checked)} className="w-4 h-4" /> Credentials Encrypted
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Firmware */}
                        <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><RefreshCw className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> Firmware</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Update Method</label>
                                        <select value={firmwareUpdates} onChange={(e) => setFirmwareUpdates(e.target.value as typeof firmwareUpdates)}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="auto-ota">Automatic OTA</option>
                                            <option value="manual-ota">Manual OTA</option>
                                            <option value="usb">USB Only</option>
                                            <option value="none">No Updates</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>Last Update</label>
                                        <select value={lastUpdate} onChange={(e) => setLastUpdate(e.target.value as typeof lastUpdate)}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="recent">Within 3 months</option>
                                            <option value="6mo">3-6 months ago</option>
                                            <option value="1y">6-12 months ago</option>
                                            <option value="never">Never updated</option>
                                            <option value="unknown">Unknown</option>
                                        </select>
                                    </div>
                                </div>
                                <label className="flex items-center gap-2 p-2 rounded border cursor-pointer text-sm" style={{ borderColor: 'var(--color-border)' }}>
                                    <input type="checkbox" checked={signedFirmware} onChange={(e) => setSignedFirmware(e.target.checked)} className="w-4 h-4" /> Cryptographically Signed Firmware
                                </label>
                            </div>
                        </div>

                        {/* Network + Physical */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Wifi className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> Network</h2>
                                <div className="space-y-3">
                                    {[
                                        { state: cloudConnected, setter: setCloudConnected, label: 'Cloud Connected' },
                                        { state: offlineCapable, setter: setOfflineCapable, label: 'Offline Capable' },
                                        { state: openPorts, setter: setOpenPorts, label: 'Open Network Ports' },
                                        { state: apiKeyRotation, setter: setApiKeyRotation, label: 'API Key Rotation' },
                                    ].map(({ state, setter, label }) => (
                                        <label key={label} className="flex items-center gap-2 p-2 rounded border cursor-pointer text-sm" style={{ borderColor: 'var(--color-border)' }}>
                                            <input type="checkbox" checked={state} onChange={(e) => setter(e.target.checked)} className="w-4 h-4" /> {label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><ShieldAlert className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> Physical</h2>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 p-2 rounded border cursor-pointer text-sm" style={{ borderColor: 'var(--color-border)' }}>
                                        <input type="checkbox" checked={tamperAlarm} onChange={(e) => setTamperAlarm(e.target.checked)} className="w-4 h-4" /> Tamper Alarm
                                    </label>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>ANSI/BHMA Rating</label>
                                        <select value={antiPickRating} onChange={(e) => setAntiPickRating(e.target.value as typeof antiPickRating)}
                                            className="w-full p-3 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                                            <option value="ansi3">ANSI Grade 3 (Commercial)</option>
                                            <option value="ansi2">ANSI Grade 2 (Heavy Duty)</option>
                                            <option value="ansi1">ANSI Grade 1 (Residential)</option>
                                            <option value="unknown">Unknown</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-1">
                        <div className={`result-panel ${result.gradeClass}`}>
                            <h2 className="text-xl font-bold mb-4">Cyber Risk Score</h2>
                            <div className="text-center mb-6">
                                <div className="text-7xl font-bold mb-1">{result.grade}</div>
                                <div className="text-2xl">{result.score}/100</div>
                            </div>
                            <div className="h-4 bg-white/20 rounded-full overflow-hidden mb-6">
                                <div className="h-full bg-white transition-all" style={{ width: `${result.score}%` }} />
                            </div>

                            <div className="space-y-2 text-sm">
                                {categoryLabels.map(cat => (
                                    <div key={cat.key} className="bg-white/10 rounded-lg p-3">
                                        <div className="flex justify-between mb-1">
                                            <span className="flex items-center gap-1"><cat.icon className="w-3 h-3" /> {cat.label}</span>
                                            <span className="font-bold">{result.categoryScores[cat.key]}/{cat.max}</span>
                                        </div>
                                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-white transition-all" style={{ width: `${(result.categoryScores[cat.key] / cat.max) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risks */}
                {result.risks.length > 0 && (
                    <div className="max-w-7xl mx-auto mt-8">
                        <h2 className="text-2xl font-bold mb-6">Identified Vulnerabilities</h2>
                        <div className="space-y-3">
                            {result.risks.map((risk, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-lg shadow" style={{ background: 'var(--color-surface)' }}>
                                    {risk.severity === 'critical' ? <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" /> :
                                        risk.severity === 'high' ? <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" /> :
                                            risk.severity === 'medium' ? <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" /> :
                                                <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />}
                                    <div>
                                        <span className={`text-xs font-bold uppercase ${risk.severity === 'critical' ? 'text-red-600' :
                                            risk.severity === 'high' ? 'text-orange-600' :
                                                risk.severity === 'medium' ? 'text-amber-600' : 'text-blue-600'
                                            }`}>{risk.severity}</span>
                                        <p className="text-sm mt-1">{risk.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mitigations */}
                {result.mitigations.length > 0 && (
                    <div className="max-w-7xl mx-auto mt-8">
                        <h2 className="text-2xl font-bold mb-6">Recommended Mitigations</h2>
                        <div className="rounded-lg shadow-lg p-6" style={{ background: 'var(--color-surface)' }}>
                            <ul className="space-y-3">
                                {result.mitigations.map((m, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                                        <span className="text-sm">{m}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <ToolRating toolSlug="cyber-risk" />

                <BeTechCalculatorRecommendation
                    description="Be-Tech smart locks feature AES-256 encrypted communication, signed OTA firmware updates, tamper detection alarms, and optional MFA — meeting enterprise cybersecurity requirements."
                    badge="Cyber Secure"
                />

                <RelatedResources calculatorSlug="cyber-risk-scorecard" />

                <div className="max-w-7xl mx-auto">
                    <CalculatorFaqBlock faqs={faqs} />
                </div>

                <div className="max-w-7xl mx-auto" style={{ marginTop: 'var(--space-3xl)' }}>
                    <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/calculators/privacy-compliance" className="link-card" prefetch={false}>
                            <h3 className="link-card__title">Privacy Compliance</h3>
                            <p className="link-card__desc">GDPR, CCPA, biometric law assessment</p>
                        </Link>
                        <Link href="/calculators/security-compliance" className="link-card" prefetch={false}>
                            <h3 className="link-card__title">Security Compliance</h3>
                            <p className="link-card__desc">ANSI/BHMA physical standards</p>
                        </Link>
                        <Link href="/calculators/pin-strength" className="link-card" prefetch={false}>
                            <h3 className="link-card__title">PIN Strength Checker</h3>
                            <p className="link-card__desc">Evaluate PIN security</p>
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-8 mb-12">
                    <Link href="/calculators" style={{ color: 'var(--color-accent)', fontWeight: 500 }} prefetch={false}>← Back to All Calculators</Link>
                </div>
            </div>
        </div>
    )
}
