'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function EmergencyBackup() {
  const [hasPhysicalKey, setHasPhysicalKey] = useState(true)
  const [hasBackupPIN, setHasBackupPIN] = useState(true)
  const [hasMobileApp, setHasMobileApp] = useState(true)
  const [hasRemoteAccess, setHasRemoteAccess] = useState(true)
  const [hasBluetoothBackup, setHasBluetoothBackup] = useState(false)
  const [keyStorageSecure, setKeyStorageSecure] = useState(true)
  const [pinDocumented, setPinDocumented] = useState(true)
  const [multiplePeople, setMultiplePeople] = useState(true)

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

    const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D'
    const status = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Poor'

    return { score, grade, status, strengths, weaknesses, recommendations }
  }

  const result = calculate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/calculators" className="text-blue-600 text-sm mb-8 inline-block">← Back</Link>
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🆘</div>
          <h1 className="text-4xl font-bold mb-4">Emergency Backup Evaluator</h1>
          <p className="text-xl text-gray-600">Evaluate your emergency unlock backup plan</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Backup Systems</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border-2 rounded hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={hasPhysicalKey} onChange={(e) => setHasPhysicalKey(e.target.checked)} className="w-5 h-5"/>
                  <span className="font-medium">Physical Key Available</span>
                </label>
                {hasPhysicalKey && (
                  <label className="flex items-center gap-2 p-3 border ml-6 rounded hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" checked={keyStorageSecure} onChange={(e) => setKeyStorageSecure(e.target.checked)} className="w-4 h-4"/>
                    <span className="text-sm">Key stored securely</span>
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 p-3 border-2 rounded hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={hasBackupPIN} onChange={(e) => setHasBackupPIN(e.target.checked)} className="w-5 h-5"/>
                  <span className="font-medium">Backup PIN Code</span>
                </label>
                {hasBackupPIN && (
                  <label className="flex items-center gap-2 p-3 border ml-6 rounded hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" checked={pinDocumented} onChange={(e) => setPinDocumented(e.target.checked)} className="w-4 h-4"/>
                    <span className="text-sm">PIN documented securely</span>
                  </label>
                )}
              </div>

              <label className="flex items-center gap-2 p-3 border-2 rounded hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" checked={hasMobileApp} onChange={(e) => setHasMobileApp(e.target.checked)} className="w-5 h-5"/>
                <span className="font-medium">Mobile App Access</span>
              </label>

              <label className="flex items-center gap-2 p-3 border-2 rounded hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" checked={hasRemoteAccess} onChange={(e) => setHasRemoteAccess(e.target.checked)} className="w-5 h-5"/>
                <span className="font-medium">Remote Unlock</span>
              </label>

              <label className="flex items-center gap-2 p-3 border-2 rounded hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" checked={hasBluetoothBackup} onChange={(e) => setHasBluetoothBackup(e.target.checked)} className="w-5 h-5"/>
                <span className="font-medium">Bluetooth Backup</span>
              </label>

              <label className="flex items-center gap-2 p-3 border-2 rounded hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" checked={multiplePeople} onChange={(e) => setMultiplePeople(e.target.checked)} className="w-5 h-5"/>
                <span className="font-medium">Multiple People Have Access</span>
              </label>
            </div>
          </div>

          <div>
            <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${
              result.grade === 'A' ? 'bg-gradient-to-br from-green-600 to-green-700' :
              result.grade === 'B' ? 'bg-gradient-to-br from-blue-600 to-blue-700' :
              result.grade === 'C' ? 'bg-gradient-to-br from-yellow-600 to-yellow-700' :
              'bg-gradient-to-br from-red-600 to-red-700'
            }`}>
              <h2 className="text-xl font-bold mb-6">Backup Readiness</h2>
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
                <span>✓</span>
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
            <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                <span>⚠️</span>
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
            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span>💡</span>
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

        <div className="max-w-6xl mx-auto mt-12 bg-gradient-to-br from-purple-600 to-purple-700 p-8 rounded-lg text-white">
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
    </div>
  )
}
