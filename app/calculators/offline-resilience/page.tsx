'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { WifiOff, AlertTriangle, Lightbulb, Check } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

export default function OfflineResilience() {
  const faqs = [
    {
      question: 'Will a smart lock work without internet?',
      answer: 'Many smart locks can still unlock without internet using cached PINs, Bluetooth, local hubs, or a physical key. Remote unlock, cloud logs, notifications, and new credential sync may stop until connectivity returns.',
    },
    {
      question: 'Which features fail during outages?',
      answer: 'Cloud-dependent features such as remote commands, live alerts, app sync, integrations, and centralized user changes may fail during an outage. Local keypad, physical key, Bluetooth, or cached credentials may continue depending on the lock.',
    },
    {
      question: 'Are local hubs safer than cloud locks?',
      answer: 'Local hubs can improve outage resilience because they keep core control inside the building, but they still need power, backups, secure configuration, and maintenance. Cloud systems can work well when they cache credentials and provide physical fallback.',
    },
    {
      question: 'What backup access should rentals have?',
      answer: 'Rentals should have at least one non-cloud backup such as a physical key, backup PIN, trusted local contact, or lockbox. Hosts should document the process and test it before relying on remote support during a guest lockout.',
    },
    {
      question: 'How do I score outage risk?',
      answer: 'Score outage risk by checking internet reliability, power backup, cloud dependency, local credential caching, physical override, failover internet, and how long the lock can operate without cloud or utility power.',
    },
  ]

  const [protocol, setProtocol] = useState('zigbee')
  const [hasLocalHub, setHasLocalHub] = useState(true)
  const [hasBackupPower, setHasBackupPower] = useState(false)
  const [hasPhysicalKey, setHasPhysicalKey] = useState(true)
  const [hasBackupCodes, setHasBackupCodes] = useState(true)
  const [cloudRequired, setCloudRequired] = useState(false)

  // New professional fields
  const [internetReliability, setInternetReliability] = useState('cable')
  const [powerGridReliability, setPowerGridReliability] = useState('stable')
  const [cacheCredentials, setCacheCredentials] = useState(false)
  const [offlineAccessDuration, setOfflineAccessDuration] = useState(24)
  const [hasFailoverISP, setHasFailoverISP] = useState(false)

  const calculate = () => {
    let score = 0
    const issues: string[] = []
    const recommendations: string[] = []

    // Protocol base score
    const protocolScores: any = { zigbee: 25, zwave: 25, thread: 20, wifi: 10 }
    score += protocolScores[protocol] || 15

    // Local hub
    if (hasLocalHub) {
      score += 20
    } else {
      issues.push('No local hub - requires internet')
      recommendations.push('Add local hub for offline operation')
    }

    // Backup power
    if (hasBackupPower) {
      score += 15
    } else {
      issues.push('No backup power for outages')
      recommendations.push('Install UPS for hub/gateway')
    }

    // Physical backup
    if (hasPhysicalKey) {
      score += 20
    } else {
      issues.push('No physical key backup')
      recommendations.push('Keep physical keys as ultimate backup')
    }

    // Backup codes
    if (hasBackupCodes) {
      score += 15
    } else {
      issues.push('No backup PIN codes configured')
      recommendations.push('Program backup codes in lock memory')
    }

    // Cloud dependency
    if (!cloudRequired) {
      score += 5
    } else {
      issues.push('System requires cloud connection')
      recommendations.push('Consider protocol with local control')
    }

    // Internet reliability impact
    const reliabilityPenalty: Record<string, number> = { fiber: 0, cable: -3, dsl: -8, cellular: -5, unreliable: -15 }
    score += reliabilityPenalty[internetReliability] || 0
    if (internetReliability === 'unreliable') {
      issues.push('Unreliable internet — offline capability is critical')
      recommendations.push('Prioritize locks with full offline operation')
    }

    // Power grid reliability
    if (powerGridReliability === 'frequent') {
      score -= 10
      issues.push('Frequent power outages increase lockout risk')
      if (!hasBackupPower) recommendations.push('UPS is essential with frequent outages')
    } else if (powerGridReliability === 'occasional') {
      score -= 5
      if (!hasBackupPower) recommendations.push('Consider UPS for hub during outages')
    }

    // Credential caching
    if (cacheCredentials) {
      score += 15
    } else {
      recommendations.push('Enable local credential caching for offline access')
    }

    // Failover ISP
    if (hasFailoverISP) {
      score += 10
    }

    // Offline duration factor
    if (offlineAccessDuration >= 72) {
      score += 5
    } else if (offlineAccessDuration < 8) {
      score -= 5
      issues.push('Lock offline duration too short for extended outages')
    }

    const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D'
    const status = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor'

    return { score: Math.max(0, Math.min(100, score)), grade, status, issues, recommendations }
  }

  const result = calculate()

  return (
    <div className="page-bg">
      <div className="container-main section">
        <Link href="/calculators" className="back-link">← Back</Link>

        <div className="page-header">
          <div className="page-header__icon"><WifiOff className="w-14 h-14" /></div>
          <h1 className="text-4xl font-bold mb-4">Offline Resilience Scorecard</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--color-text-secondary)" }}>Evaluate how well your system works during outages</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <CalculatorAnswerBlock
            title="Will a smart lock work without internet?"
            answer="A smart lock may still work without internet if it has local PIN storage, Bluetooth access, a local hub, backup power, or a physical key. The features most likely to fail are remote unlock, cloud notifications, live audit sync, and new credential updates. Resilient deployments separate basic entry from cloud-only management."
          >
            <div className="overflow-x-auto">
              <table className="data-table">
                <tbody>
                  <tr><td style={{ fontWeight: 600 }}>Usually works offline</td><td>Physical key, cached PINs, local Bluetooth, some local hub commands</td></tr>
                  <tr><td style={{ fontWeight: 600 }}>Often fails offline</td><td>Remote unlock, live alerts, cloud audit sync, new cloud credentials</td></tr>
                  <tr><td style={{ fontWeight: 600 }}>Needs separate backup</td><td>Hub power, internet failover, emergency guest support, admin recovery</td></tr>
                </tbody>
              </table>
            </div>
          </CalculatorAnswerBlock>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
            <h2 className="text-2xl font-bold mb-6">System Configuration</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Protocol</label>
                <select value={protocol} onChange={(e) => setProtocol(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="zigbee">Zigbee (Best offline)</option>
                  <option value="zwave">Z-Wave (Best offline)</option>
                  <option value="thread">Thread (Good offline)</option>
                  <option value="wifi">Wi-Fi (Poor offline)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "1px solid var(--color-border)" }}>
                  <input type="checkbox" checked={hasLocalHub} onChange={(e) => setHasLocalHub(e.target.checked)} className="w-4 h-4" />
                  <span>Has Local Hub/Controller</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "1px solid var(--color-border)" }}>
                  <input type="checkbox" checked={hasBackupPower} onChange={(e) => setHasBackupPower(e.target.checked)} className="w-4 h-4" />
                  <span>Has Backup Power (UPS)</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "1px solid var(--color-border)" }}>
                  <input type="checkbox" checked={hasPhysicalKey} onChange={(e) => setHasPhysicalKey(e.target.checked)} className="w-4 h-4" />
                  <span>Has Physical Key Backup</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "1px solid var(--color-border)" }}>
                  <input type="checkbox" checked={hasBackupCodes} onChange={(e) => setHasBackupCodes(e.target.checked)} className="w-4 h-4" />
                  <span>Has Offline PIN Codes</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "1px solid var(--color-border)" }}>
                  <input type="checkbox" checked={cloudRequired} onChange={(e) => setCloudRequired(e.target.checked)} className="w-4 h-4" />
                  <span>Cloud Connection Required</span>
                </label>
              </div>

              <div className="pt-4">
                <label className="block mb-2 font-medium">Internet Reliability</label>
                <select value={internetReliability} onChange={(e) => setInternetReliability(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="fiber">Fiber (99.9% uptime)</option>
                  <option value="cable">Cable (99% uptime)</option>
                  <option value="dsl">DSL (98% uptime)</option>
                  <option value="cellular">Cellular/LTE (97% uptime)</option>
                  <option value="unreliable">Unreliable / Rural (&lt; 95%)</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Power Grid Reliability</label>
                <select value={powerGridReliability} onChange={(e) => setPowerGridReliability(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="stable">Stable (&lt; 2 outages/year)</option>
                  <option value="occasional">Occasional Outages (2-6/year)</option>
                  <option value="frequent">Frequent Outages (&gt; 6/year)</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Offline Access Duration: {offlineAccessDuration}h</label>
                <input type="range" min="1" max="168" value={offlineAccessDuration} onChange={(e) => setOfflineAccessDuration(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span>1 hour</span>
                  <span>168h (7 days)</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>How long lock can operate without cloud connection</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                  <input type="checkbox" checked={cacheCredentials} onChange={(e) => setCacheCredentials(e.target.checked)} className="w-4 h-4" />
                  <span>Lock Caches Credentials Locally (+15 score)</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                  <input type="checkbox" checked={hasFailoverISP} onChange={(e) => setHasFailoverISP(e.target.checked)} className="w-4 h-4" />
                  <span>Failover ISP / LTE Backup (+10 score)</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className={`result-panel result-panel--grade-${result.grade.toLowerCase()}`}>
              <h2 className="text-xl font-bold mb-6">Resilience Score</h2>
              <div className="text-center mb-8">
                <div className="text-7xl font-bold mb-2">{result.grade}</div>
                <div className="text-2xl mb-2">{result.score}/100</div>
                <div className="text-lg opacity-90">{result.status}</div>
              </div>
              <div className="mb-6">
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all" style={{ width: `${result.score}%` }} />
                </div>
              </div>
              <div className="space-y-2 text-sm bg-white/10 rounded-lg p-4">
                <div className="flex justify-between">
                  <span>Protocol:</span>
                  <span className="font-semibold capitalize">{protocol}</span>
                </div>
                <div className="flex justify-between">
                  <span>Backup Systems:</span>
                  <span className="font-semibold">{[hasLocalHub, hasBackupPower, hasPhysicalKey, hasBackupCodes].filter(Boolean).length}/4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {result.issues.length > 0 && (
          <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
            <div className="callout callout-danger">
              <h3 className="text-lg font-bold text-red-900 mb-3 inline-flex items-center gap-2"><AlertTriangle className="w-5 h-5" style={{ color: "var(--color-danger)" }} /> Issues Found</h3>
              <ul className="space-y-2">
                {result.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="callout callout-info">
              <h3 className="text-lg font-bold text-blue-900 mb-3 inline-flex items-center gap-2"><Lightbulb className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                    <Check className="check-item__icon" style={{ color: "var(--color-accent)" }} />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto mt-12 p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
          <h2 className="text-2xl font-bold mb-6">Resilience Best Practices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-blue-700">Power Resilience</h3>
              <ul className="space-y-1" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                <li>• UPS for hub (4-8 hours)</li>
                <li>• Lock batteries (6-12 months)</li>
                <li>• Generator backup option</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-700">Network Resilience</h3>
              <ul className="space-y-1" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                <li>• Local mesh network</li>
                <li>• No cloud dependency</li>
                <li>• Failover internet (LTE)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-700">Access Resilience</h3>
              <ul className="space-y-1" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                <li>• Physical key backup</li>
                <li>• Offline PIN codes</li>
                <li>• Multiple unlock methods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ToolRating toolSlug="offline-resilience" />

      <RelatedResources calculatorSlug="offline-resilience-scorecard" />
      <div className="max-w-6xl mx-auto">
        <CalculatorFaqBlock faqs={faqs} />
      </div>

      {/* Be-Tech Brand Recommendation */}
      <BeTechCalculatorRecommendation
        description="Be-Tech smart locks are designed for maximum offline resilience with local processing, Bluetooth backup, and mechanical override options. Operate reliably even during internet or power outages."
        badge="Offline Capable"
      />

      {/* Back Link */}
      <div className="max-w-6xl mx-auto mt-8 mb-12">
        <Link href="/calculators" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
          ← Back to All Calculators
        </Link>
      </div>
    </div>
  )
}
