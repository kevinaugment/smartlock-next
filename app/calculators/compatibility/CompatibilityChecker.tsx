'use client'

import { useState } from 'react'

// ANSI/BHMA A156.2 (2019) - Door & Lock Standards
const DOOR_STANDARDS = {
  thickness: {
    min: 35, // 1-3/8" (35mm) minimum per ANSI A156.2
    max: 57, // 2-1/4" (57mm) maximum for standard locks
    standard: [35, 40, 44, 45], // Common residential (1-3/8", 1-9/16", 1-3/4", 1-3/4"+)
  },
  backset: {
    standard: [60, 70], // 2-3/8" (60mm), 2-3/4" (70mm) - ANSI standard
    commercial: [70, 102, 152], // 2-3/4", 4", 6" for commercial
  },
  boreHole: {
    lockCylinder: 54, // 2-1/8" (54mm) standard cylinder bore
    latchBolt: 25, // 1" (25mm) latch bore
  }
}

interface CompatibilityResult {
  compatible: boolean
  score: number
  issues: string[]
  warnings: string[]
  recommendations: string[]
  compatibleLocks: string[]
}

export default function CompatibilityChecker() {
  const [doorMaterial, setDoorMaterial] = useState('wood')
  const [doorThickness, setDoorThickness] = useState(44)
  const [backset, setBackset] = useState(60)
  const [boreHole, setBoreHole] = useState(54)
  const [handleType, setHandleType] = useState('lever')
  const [hasExistingDeadbolt, setHasExistingDeadbolt] = useState(true)
  const [isDoorHung, setIsDoorHung] = useState(true)
  const [environment, setEnvironment] = useState('indoor')

  const checkCompatibility = (): CompatibilityResult => {
    let score = 100
    const issues: string[] = []
    const warnings: string[] = []
    const recommendations: string[] = []
    const compatibleLocks: string[] = []

    // Door Material Check
    if (doorMaterial === 'wood') {
      compatibleLocks.push('All brands (Yale, Schlage, August, Kwikset, Be-Tech)')
      score += 0
    } else if (doorMaterial === 'metal') {
      score -= 10
      warnings.push('Metal doors require harder drill bits (cobalt or carbide)')
      compatibleLocks.push('Schlage Encode, Yale Assure, August Pro, Be-Tech (verify model)')
      recommendations.push('Use slow drill speed (300 RPM) to avoid bit breakage')
    } else if (doorMaterial === 'fiberglass') {
      score -= 5
      warnings.push('Fiberglass may crack - use masking tape when drilling')
      compatibleLocks.push('Most brands (verify weight < 4 lbs)')
    } else if (doorMaterial === 'glass') {
      score -= 40
      issues.push('Glass doors incompatible with deadbolt-style locks')
      compatibleLocks.push('August Smart Lock (retrofit only), Yale Linus, rim locks')
      recommendations.push('Use surface-mounted rim locks or smart cylinder replacements')
    } else if (doorMaterial === 'composite') {
      score -= 8
      warnings.push('Composite density varies - verify with manufacturer')
      compatibleLocks.push('Check core material: foam core may need reinforcement')
    }

    // Thickness Check (ANSI A156.2)
    if (doorThickness < 35) {
      score -= 35
      issues.push(`Door too thin (${doorThickness}mm < 35mm min). ANSI A156.2 requires 1-3/8" minimum`)
      recommendations.push('Surface-mounted rim locks only (Yale ENTR, Nuki Smart Lock)')
    } else if (doorThickness > 57) {
      score -= 20
      issues.push(`Door too thick (${doorThickness}mm > 57mm max). Requires extension kit`)
      recommendations.push('Order manufacturer door thickness extension kit (+$15-30)')
      compatibleLocks.push('Schlage Encode (up to 70mm with kit), Be-Tech (verify model)')
    } else if (!DOOR_STANDARDS.thickness.standard.includes(doorThickness)) {
      score -= 10
      warnings.push(`Non-standard thickness (${doorThickness}mm). Verify lock compatibility`)
    }

    // Backset Check (ANSI A156.2)
    if (!DOOR_STANDARDS.backset.standard.includes(backset) && !DOOR_STANDARDS.backset.commercial.includes(backset)) {
      score -= 25
      issues.push(`Non-standard backset (${backset}mm). Standard: 60mm (2-3/8") or 70mm (2-3/4")`)
      recommendations.push('Re-drill backset or search for adjustable backset locks')
      compatibleLocks.push('Kwikset Halo (adjustable backset), some Be-Tech models')
    }

    // Bore Hole Check
    if (boreHole !== 54) {
      score -= 15
      warnings.push(`Non-standard bore (${boreHole}mm). Standard: 54mm (2-1/8")`)
      if (boreHole < 54) {
        recommendations.push('Drill out to 54mm with hole saw')
      } else {
        issues.push('Oversized bore may require reducer ring or patching')
      }
    }

    // Existing Deadbolt
    if (!hasExistingDeadbolt) {
      warnings.push('New installation requires drilling. Time: +1.5 hours, Cost: +$150-200 labor')
      recommendations.push('Consider hiring locksmith for precise alignment')
    }

    // Door Hanging (left/right)
    if (!isDoorHung) {
      score -= 5
      warnings.push('Unhung door - measure handing after installation')
    }

    // Environment (outdoor durability)
    if (environment === 'outdoor') {
      warnings.push('Outdoor exposure requires weatherproof locks (IP54+ rated)')
      compatibleLocks.push('Yale Assure Lock 2 (IP65), Schlage Encode Plus, Be-Tech outdoor models')
      recommendations.push('Apply silicone sealant around lock body to prevent moisture ingress')
    }

    // Calculate final compatibility
    const compatible = score >= 60
    if (score < 60) {
      issues.push('Overall compatibility below 60% - major modifications required')
    }

    return {
      compatible,
      score: Math.max(0, score),
      issues,
      warnings,
      recommendations,
      compatibleLocks: compatibleLocks.length > 0 ? compatibleLocks : ['Contact manufacturer for compatibility verification']
    }
  }

  const result = checkCompatibility()

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-green-600 to-green-700'
    if (score >= 70) return 'from-blue-600 to-blue-700'
    if (score >= 50) return 'from-yellow-600 to-yellow-700'
    return 'from-red-600 to-red-700'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent - Fully Compatible'
    if (score >= 70) return 'Good - Minor Adjustments'
    if (score >= 50) return 'Fair - Modifications Required'
    return 'Poor - Major Issues'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Door Specifications</h2>
          
          <div className="space-y-6">
            {/* Door Material */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Door Material</label>
              <select value={doorMaterial} onChange={(e) => setDoorMaterial(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="wood">Wood (Solid or Hollow Core)</option>
                <option value="metal">Metal/Steel</option>
                <option value="fiberglass">Fiberglass</option>
                <option value="composite">Composite</option>
                <option value="glass">Glass/Full Glass</option>
              </select>
            </div>

            {/* Door Thickness */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Door Thickness: {doorThickness}mm ({(doorThickness / 25.4).toFixed(2)}")
              </label>
              <input type="range" min="30" max="70" value={doorThickness} onChange={(e) => setDoorThickness(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>30mm (1-1/4")</span>
                <span className="text-green-600">44mm (1-3/4" std)</span>
                <span>70mm (2-3/4")</span>
              </div>
            </div>

            {/* Backset */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backset Distance</label>
              <select value={backset} onChange={(e) => setBackset(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="60">60mm (2-3/8") - Standard Residential</option>
                <option value="70">70mm (2-3/4") - Standard Residential/Commercial</option>
                <option value="102">102mm (4") - Commercial</option>
                <option value="152">152mm (6") - Heavy Commercial</option>
                <option value="45">45mm (1-3/4") - Non-standard</option>
              </select>
            </div>

            {/* Bore Hole */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cylinder Bore Hole Diameter</label>
              <select value={boreHole} onChange={(e) => setBoreHole(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="54">54mm (2-1/8") - ANSI Standard</option>
                <option value="51">51mm (2") - Old Standard</option>
                <option value="38">38mm (1-1/2") - Undersized</option>
                <option value="57">57mm (2-1/4") - Oversized</option>
                <option value="0">No existing bore hole</option>
              </select>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Additional Factors</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" checked={hasExistingDeadbolt} onChange={(e) => setHasExistingDeadbolt(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded"/>
                  <span className="ml-2 text-gray-700">Has existing deadbolt (replacement)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={isDoorHung} onChange={(e) => setIsDoorHung(e.target.checked)} className="w-4 h-4 text-blue-600 border-gray-300 rounded"/>
                  <span className="ml-2 text-gray-700">Door is already hung (not pre-install)</span>
                </label>
                <div className="flex items-center gap-4 mt-3">
                  <label className="text-sm font-medium text-gray-700">Environment:</label>
                  <select value={environment} onChange={(e) => setEnvironment(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor (Weatherproof)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-1">
        <div className={`bg-gradient-to-br ${getScoreColor(result.score)} rounded-lg shadow-lg p-8 text-white sticky top-4`}>
          <h2 className="text-xl font-bold mb-6">Compatibility Score</h2>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold mb-2">{result.score}%</div>
            <div className="text-lg opacity-90">{getScoreLabel(result.score)}</div>
          </div>

          <div className="mb-6">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all duration-500" style={{ width: `${result.score}%` }}></div>
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="mb-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs font-semibold mb-2">❌ Critical Issues:</p>
              <ul className="text-xs space-y-1 opacity-90">
                {result.issues.map((issue, i) => <li key={i}>• {issue}</li>)}
              </ul>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="mb-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs font-semibold mb-2">⚠️ Warnings:</p>
              <ul className="text-xs space-y-1 opacity-90">
                {result.warnings.map((warn, i) => <li key={i}>• {warn}</li>)}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-xs font-semibold mb-2">💡 Recommendations:</p>
              <ul className="text-xs space-y-1 opacity-90">
                {result.recommendations.map((rec, i) => <li key={i}>• {rec}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
