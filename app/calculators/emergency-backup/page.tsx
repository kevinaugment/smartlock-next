'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { ShieldAlert, Check, AlertTriangle, Lightbulb } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

export default function EmergencyBackup() {
  const faqs = [
    {
      question: 'What happens when smart lock batteries die?',
      answer: 'When smart lock batteries die, keypad, app, wireless, and motor functions may stop. Recovery depends on the model: physical key, 9V terminal, USB emergency power, external battery contacts, or a locksmith may be needed.',
    },
    {
      question: 'Do all locks have emergency power?',
      answer: 'No. Some locks include 9V terminals, USB emergency power, or removable battery access from outside, but others rely on a mechanical key or interior battery access. Verify backup access before installing on a critical door.',
    },
    {
      question: 'Is a physical key still needed?',
      answer: 'A physical key is still the simplest final fallback for many smart locks, especially rentals and remote properties. If a key is not available, the backup plan should include emergency power, local support, and documented locksmith access.',
    },
    {
      question: 'What is fail-safe vs fail-secure?',
      answer: 'Fail-safe hardware unlocks when power is lost, often for life-safety egress. Fail-secure hardware stays locked when power is lost, often for security. The correct mode depends on door function, code requirements, and emergency procedures.',
    },
    {
      question: 'How often should backup access be tested?',
      answer: 'Backup access should be tested after installation, after battery replacement, after firmware changes, and on a regular schedule. Rental and commercial operators should test before high-occupancy periods or critical events.',
    },
  ]

  const [hasPhysicalKey, setHasPhysicalKey] = useState(true)
  const [hasBackupPIN, setHasBackupPIN] = useState(true)
  const [hasMobileApp, setHasMobileApp] = useState(true)
  const [hasRemoteAccess, setHasRemoteAccess] = useState(true)
  const [hasBluetoothBackup, setHasBluetoothBackup] = useState(false)
  const [keyStorageSecure, setKeyStorageSecure] = useState(true)
  const [pinDocumented, setPinDocumented] = useState(true)
  const [multiplePeople, setMultiplePeople] = useState(true)

  // New professional fields
  const [lockCount, setLockCount] = useState(1)
  const [hasBatteryBackup, setHasBatteryBackup] = useState(false)
  const [hasUPS, setHasUPS] = useState(false)
  const [responseTimePlan, setResponseTimePlan] = useState('within-hour')
  const [hasEmergencyContact, setHasEmergencyContact] = useState(false)

  const calculate = () => {
    let score = 0
    const strengths: string[] = []
    const weaknesses: string[] = []
    const recommendations: string[] = []

    if (hasPhysicalKey) {
      score += 20
      strengths.push('Physical key available')
      if (keyStorageSecure) {
        score += 10
        strengths.push('Key stored securely')
      } else {
        weaknesses.push('Key storage not secure')
        recommendations.push('Store key in secure location (lockbox, trusted neighbor)')
      }
    } else {
      weaknesses.push('No physical key backup')
      recommendations.push('Keep at least one physical key as ultimate backup')
    }

    if (hasBackupPIN) {
      score += 15
      strengths.push('Backup PIN configured')
      if (pinDocumented) {
        score += 5
        strengths.push('PIN documented securely')
      } else {
        weaknesses.push('PIN not documented')
        recommendations.push('Store PIN in password manager or secure note')
      }
    } else {
      weaknesses.push('No backup PIN')
      recommendations.push('Program backup PIN codes in lock')
    }

    if (hasMobileApp) {
      score += 10
      strengths.push('Mobile app access')
    }

    if (hasRemoteAccess) {
      score += 15
      strengths.push('Remote unlock capability')
    } else {
      weaknesses.push('No remote access')
      recommendations.push('Enable remote access for emergencies')
    }

    if (hasBluetoothBackup) {
      score += 10
      strengths.push('Bluetooth backup available')
    }

    if (multiplePeople) {
      score += 15
      strengths.push('Multiple people have access')
    } else {
      weaknesses.push('Single point of failure')
      recommendations.push('Share access with trusted person')
    }

    // New field scoring
    if (hasBatteryBackup) {
      score += 15
      strengths.push('Battery backup for power failures')
    } else {
      weaknesses.push('No battery backup for power outages')
      recommendations.push('Add 9V battery terminal or backup power solution')
    }

    if (hasUPS) {
      score += 10
      strengths.push('UPS protects access control panel')
    }

    if (hasEmergencyContact) {
      score += 10
      strengths.push('24/7 emergency locksmith on file')
    } else {
      recommendations.push('Keep a 24/7 locksmith contact for emergencies')
    }

    // Response time SLA scoring
    const responseScore = { immediate: 15, 'within-hour': 10, 'next-day': 3 }[responseTimePlan] || 10
    score += responseScore
    if (responseTimePlan === 'immediate') {
      strengths.push('Immediate emergency response plan')
    } else if (responseTimePlan === 'next-day') {
      weaknesses.push('Next-day response plan is too slow for emergencies')
      recommendations.push('Establish a response plan with < 1 hour target')
    }

    // Scale risk warning by lock count
    if (lockCount > 10 && score < 60) {
      recommendations.push(`With ${lockCount} locks at risk, prioritize backup improvements immediately`)
    }

    const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D'
    const status = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor'

    return { score: Math.min(100, score), grade, status, strengths, weaknesses, recommendations, lockCount }
  }

  const result = calculate()

  return (
    <div className="page-bg">
      <div className="container-main section">
        <Link href="/calculators" className="back-link" prefetch={false}>← Back</Link>

        <div className="page-header">
          <div className="page-header__icon"><ShieldAlert className="w-14 h-14" /></div>
          <h1 className="text-4xl font-bold mb-4">Emergency Backup Evaluator</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--color-text-secondary)" }}>Evaluate your emergency unlock backup plan</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <CalculatorAnswerBlock
            title="What backup access should every smart lock have?"
            answer="Every smart lock should have at least one fallback that does not depend on the phone app, cloud service, or live internet connection. Common backup methods include a physical key, emergency battery terminals, USB or 9V power, offline PINs, Bluetooth access, a trusted local contact, and a documented locksmith procedure."
          />
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
            <h2 className="text-2xl font-bold mb-6">Backup Systems</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "2px solid var(--color-border)" }}>
                  <input type="checkbox" checked={hasPhysicalKey} onChange={(e) => setHasPhysicalKey(e.target.checked)} className="w-5 h-5" />
                  <span className="font-medium">Physical Key Available</span>
                </label>
                {hasPhysicalKey && (
                  <label className="flex items-center gap-2 p-3 ml-6 rounded cursor-pointer" style={{ border: "1px solid var(--color-border)" }}>
                    <input type="checkbox" checked={keyStorageSecure} onChange={(e) => setKeyStorageSecure(e.target.checked)} className="w-4 h-4" />
                    <span className="text-sm">Key stored securely</span>
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "2px solid var(--color-border)" }}>
                  <input type="checkbox" checked={hasBackupPIN} onChange={(e) => setHasBackupPIN(e.target.checked)} className="w-5 h-5" />
                  <span className="font-medium">Backup PIN Code</span>
                </label>
                {hasBackupPIN && (
                  <label className="flex items-center gap-2 p-3 ml-6 rounded cursor-pointer" style={{ border: "1px solid var(--color-border)" }}>
                    <input type="checkbox" checked={pinDocumented} onChange={(e) => setPinDocumented(e.target.checked)} className="w-4 h-4" />
                    <span className="text-sm">PIN documented securely</span>
                  </label>
                )}
              </div>

              <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "2px solid var(--color-border)" }}>
                <input type="checkbox" checked={hasMobileApp} onChange={(e) => setHasMobileApp(e.target.checked)} className="w-5 h-5" />
                <span className="font-medium">Mobile App Access</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "2px solid var(--color-border)" }}>
                <input type="checkbox" checked={hasRemoteAccess} onChange={(e) => setHasRemoteAccess(e.target.checked)} className="w-5 h-5" />
                <span className="font-medium">Remote Unlock</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "2px solid var(--color-border)" }}>
                <input type="checkbox" checked={hasBluetoothBackup} onChange={(e) => setHasBluetoothBackup(e.target.checked)} className="w-5 h-5" />
                <span className="font-medium">Bluetooth Backup</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "2px solid var(--color-border)" }}>
                <input type="checkbox" checked={multiplePeople} onChange={(e) => setMultiplePeople(e.target.checked)} className="w-5 h-5" />
                <span className="font-medium">Multiple People Have Access</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "2px solid var(--color-border)" }}>
                <input type="checkbox" checked={hasBatteryBackup} onChange={(e) => setHasBatteryBackup(e.target.checked)} className="w-5 h-5" />
                <span className="font-medium">Battery Backup / 9V Terminal</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "2px solid var(--color-border)" }}>
                <input type="checkbox" checked={hasUPS} onChange={(e) => setHasUPS(e.target.checked)} className="w-5 h-5" />
                <span className="font-medium">UPS for Access Panel</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "2px solid var(--color-border)" }}>
                <input type="checkbox" checked={hasEmergencyContact} onChange={(e) => setHasEmergencyContact(e.target.checked)} className="w-5 h-5" />
                <span className="font-medium">24/7 Emergency Locksmith on File</span>
              </label>

              <div className="pt-4">
                <label className="block mb-2 font-medium">Number of Locks to Protect: {lockCount}</label>
                <input type="range" min="1" max="50" value={lockCount} onChange={(e) => setLockCount(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span>1 lock</span>
                  <span>50 locks</span>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Emergency Response Time Plan</label>
                <select value={responseTimePlan} onChange={(e) => setResponseTimePlan(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="immediate">Immediate (on-site staff / self)</option>
                  <option value="within-hour">Within 1 Hour (on-call locksmith)</option>
                  <option value="next-day">Next Business Day</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className={`result-panel result-panel--grade-${result.grade.toLowerCase()}`}>
              <h2 className="text-xl font-bold mb-6">Backup Readiness</h2>
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
                  <span>Backup Methods:</span>
                  <span className="font-semibold">
                    {[hasPhysicalKey, hasBackupPIN, hasMobileApp, hasRemoteAccess, hasBluetoothBackup].filter(Boolean).length}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Security Level:</span>
                  <span className="font-semibold">{keyStorageSecure && pinDocumented ? 'High' : 'Medium'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          {result.strengths.length > 0 && (
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <Check className="w-5 h-5" style={{ color: "var(--color-success)" }} />
                <span>Strengths</span>
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-green-800">• {s}</li>
                ))}
              </ul>
            </div>
          )}

          {result.weaknesses.length > 0 && (
            <div className="callout callout-danger">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" style={{ color: "var(--color-danger)" }} />
                <span>Weaknesses</span>
              </h3>
              <ul className="space-y-2">
                {result.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-red-800">• {w}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="callout callout-info">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
                <span>Recommendations</span>
              </h3>
              <ul className="space-y-2">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="text-sm text-blue-800">• {r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto mt-12 result-panel result-panel--grade-b">
          <h2 className="text-2xl font-bold mb-4">Emergency Scenarios to Plan For</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Phone dies:</strong> Physical key or keypad backup needed</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span><strong>App malfunction:</strong> Alternative unlock method required</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Internet down:</strong> Local/offline access essential</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Battery dead:</strong> Mechanical override or 9V terminal</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Forgot code:</strong> Documented backup or reset procedure</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span><strong>Locked out abroad:</strong> Remote unlock or trusted contact</span>
            </div>
          </div>
        </div>
      </div>

      <ToolRating toolSlug="emergency-backup" />

      <RelatedResources calculatorSlug="emergency-backup-evaluator" />
      <div className="max-w-6xl mx-auto">
        <CalculatorFaqBlock faqs={faqs} />
      </div>

      {/* Be-Tech Brand Recommendation */}
      <BeTechCalculatorRecommendation
        description="Be-Tech smart locks feature multiple backup access methods including physical keys, backup PINs, 9V emergency power, and offline operation capabilities for maximum security."
        badge="Emergency Ready"
      />

      {/* Back Link */}
      <div className="max-w-7xl mx-auto mt-8 mb-12">
        <Link href="/calculators" style={{ color: "var(--color-accent)", fontWeight: 500 }} prefetch={false}>
          ← Back to All Calculators
        </Link>
      </div>
    </div>
  )
}
