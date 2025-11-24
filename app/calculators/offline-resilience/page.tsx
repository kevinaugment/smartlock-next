'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'

export default function OfflineResilience() {
  const [protocol, setProtocol] = useState('zigbee')
  const [hasLocalHub, setHasLocalHub] = useState(true)
  const [hasBackupPower, setHasBackupPower] = useState(false)
  const [hasPhysicalKey, setHasPhysicalKey] = useState(true)
  const [hasBackupCodes, setHasBackupCodes] = useState(true)
  const [cloudRequired, setCloudRequired] = useState(false)

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

    const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D'
    const status = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor'

    return { score, grade, status, issues, recommendations }
  }

  const result = calculate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/calculators" className="text-blue-600 text-sm mb-8 inline-block">← Back</Link>
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔋</div>
          <h1 className="text-4xl font-bold mb-4">Offline Resilience Scorecard</h1>
          <p className="text-xl text-gray-600">Evaluate how well your system works during outages</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
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
                <label className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={hasLocalHub} onChange={(e) => setHasLocalHub(e.target.checked)} className="w-4 h-4"/>
                  <span>Has Local Hub/Controller</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={hasBackupPower} onChange={(e) => setHasBackupPower(e.target.checked)} className="w-4 h-4"/>
                  <span>Has Backup Power (UPS)</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={hasPhysicalKey} onChange={(e) => setHasPhysicalKey(e.target.checked)} className="w-4 h-4"/>
                  <span>Has Physical Key Backup</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={hasBackupCodes} onChange={(e) => setHasBackupCodes(e.target.checked)} className="w-4 h-4"/>
                  <span>Has Offline PIN Codes</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={cloudRequired} onChange={(e) => setCloudRequired(e.target.checked)} className="w-4 h-4"/>
                  <span>Cloud Connection Required</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${
              result.grade === 'A' ? 'bg-gradient-to-br from-green-600 to-green-700' :
              result.grade === 'B' ? 'bg-gradient-to-br from-blue-600 to-blue-700' :
              result.grade === 'C' ? 'bg-gradient-to-br from-yellow-600 to-yellow-700' :
              'bg-gradient-to-br from-red-600 to-red-700'
            }`}>
              <h2 className="text-xl font-bold mb-6">Resilience Score</h2>
              <div className="text-center mb-8">
                <div className="text-7xl font-bold mb-2">{result.grade}</div>
                <div className="text-2xl mb-2">{result.score}/100</div>
                <div className="text-lg opacity-90">{result.status}</div>
              </div>
              <div className="mb-6">
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white transition-all" style={{width: `${result.score}%`}}/>
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
            <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-red-900 mb-3">⚠️ Issues Found</h3>
              <ul className="space-y-2">
                {result.issues.map((issue, i) => (
                  <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-900 mb-3">💡 Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                    <span className="mt-1">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Resilience Best Practices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-blue-700">Power Resilience</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• UPS for hub (4-8 hours)</li>
                <li>• Lock batteries (6-12 months)</li>
                <li>• Generator backup option</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-700">Network Resilience</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Local mesh network</li>
                <li>• No cloud dependency</li>
                <li>• Failover internet (LTE)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-purple-700">Access Resilience</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Physical key backup</li>
                <li>• Offline PIN codes</li>
                <li>• Multiple unlock methods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Be-Tech Brand Recommendation */}
      <BeTechCalculatorRecommendation 
        description="Be-Tech smart locks are designed for maximum offline resilience with local processing, Bluetooth backup, and mechanical override options. Operate reliably even during internet or power outages."
        badge="Offline Capable"
      />

      {/* Back Link */}
      <div className="max-w-6xl mx-auto mt-8 mb-12">
        <Link href="/calculators" className="text-blue-600 hover:text-blue-700 font-medium">
          ← Back to All Calculators
        </Link>
      </div>
    </div>
  )
}
