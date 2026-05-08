'use client'

import { useState } from 'react'

// ANSI/BHMA A156.2 (2019) - Door & Lock Standards
const DOOR_STANDARDS = {
  thickness: {
    min: 35,
    max: 57,
    standard: [35, 40, 44, 45],
  },
  backset: {
    standard: [60, 70],
    commercial: [70, 102, 152],
  },
  boreHole: {
    lockCylinder: 54,
    latchBolt: 25,
  },
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
  // Existing fields
  const [doorMaterial, setDoorMaterial] = useState('wood')
  const [doorThickness, setDoorThickness] = useState(44)
  const [backset, setBackset] = useState(60)
  const [boreHole, setBoreHole] = useState(54)
  const [hasExistingDeadbolt, setHasExistingDeadbolt] = useState(true)
  const [isDoorHung, setIsDoorHung] = useState(true)
  const [environment, setEnvironment] = useState('indoor')

  // New professional fields
  const [lockStandard, setLockStandard] = useState('ansi-grade2')
  const [doorType, setDoorType] = useState('hinged-single')
  const [fireRating, setFireRating] = useState('none')
  const [lockingPoints, setLockingPoints] = useState('single')
  const [handleType, setHandleType] = useState('lever')
  const [doorHanding, setDoorHanding] = useState('right-hand')
  const [ipRating, setIpRating] = useState('none')
  const [frameMaterial, setFrameMaterial] = useState('wood')

  const checkCompatibility = (): CompatibilityResult => {
    let score = 100
    const issues: string[] = []
    const warnings: string[] = []
    const recommendations: string[] = []
    const compatibleLocks: string[] = []

    // Door Material Check
    if (doorMaterial === 'wood') {
      compatibleLocks.push('All standard brands (Yale, Schlage, August, Kwikset, Be-Tech)')
    } else if (doorMaterial === 'metal') {
      score -= 10
      warnings.push('Metal doors require cobalt or carbide drill bits')
      compatibleLocks.push('Schlage Encode, Yale Assure, August Pro, Be-Tech')
      recommendations.push('Use slow drill speed (300 RPM); apply cutting oil')
    } else if (doorMaterial === 'fiberglass') {
      score -= 5
      warnings.push('Fiberglass may crack — use masking tape when drilling')
      compatibleLocks.push('Most brands (verify weight < 4 lbs)')
    } else if (doorMaterial === 'glass') {
      score -= 40
      issues.push('Glass doors incompatible with deadbolt-style locks')
      compatibleLocks.push('Surface-mounted: August Retrofit, Yale Linus, rim locks only')
      recommendations.push('Use smart cylinder replacements or rim-mounted locks')
    } else if (doorMaterial === 'composite') {
      score -= 8
      warnings.push('Composite density varies — verify core material with manufacturer')
      compatibleLocks.push('Solid-core composite compatible with most locks; foam core needs reinforcement')
    } else if (doorMaterial === 'aluminum') {
      score -= 12
      warnings.push('Aluminum profiles require narrow-profile or mortise locks')
      recommendations.push('Check for "narrow stile" compatible models')
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
    } else if (!DOOR_STANDARDS.thickness.standard.includes(doorThickness)) {
      score -= 10
      warnings.push(`Non-standard thickness (${doorThickness}mm). Verify lock compatibility`)
    }

    // Backset Check
    if (!DOOR_STANDARDS.backset.standard.includes(backset) && !DOOR_STANDARDS.backset.commercial.includes(backset)) {
      score -= 25
      issues.push(`Non-standard backset (${backset}mm). Standard: 60mm or 70mm`)
      recommendations.push('Re-drill backset or search for adjustable backset locks')
    }

    // Bore Hole Check
    if (boreHole !== 54 && boreHole !== 0) {
      score -= 15
      warnings.push(`Non-standard bore (${boreHole}mm). Standard: 54mm (2-1/8")`)
      if (boreHole < 54) {
        recommendations.push('Drill out to 54mm with hole saw')
      } else {
        issues.push('Oversized bore may require reducer ring or patching')
      }
    }

    // Lock Standard / Grade
    if (lockStandard === 'ansi-grade1' || lockStandard === 'bhma-commercial') {
      if (doorMaterial !== 'wood' && doorMaterial !== 'metal') {
        score -= 15
        warnings.push('Grade 1 / BHMA Commercial locks require wood or metal doors for proper anchoring')
      }
    }

    // Door Type compatibility
    if (doorType === 'sliding') {
      score -= 30
      issues.push('Sliding doors incompatible with standard deadbolt-style smart locks')
      recommendations.push('Use surface-mounted or hook-style smart locks for sliding doors')
    } else if (doorType === 'pocket') {
      score -= 35
      issues.push('Pocket doors cannot accept standard lock installations')
      recommendations.push('Use cavity-compatible smart locks or electronic pocket door hardware')
    } else if (doorType === 'french-double') {
      score -= 10
      warnings.push('French double doors: only active leaf can accept standard smart lock')
      recommendations.push('Install flush bolts on passive leaf; smart lock on active leaf')
    } else if (doorType === 'dutch') {
      score -= 8
      warnings.push('Dutch (split) doors: verify lock position relative to split line')
    }

    // Fire Rating
    if (fireRating !== 'none') {
      if (fireRating === 'frl-90' || fireRating === 'frl-120') {
        score -= 5
        warnings.push(`Fire-rated door (${fireRating.replace('frl-', '')} min): lock must be UL listed for fire doors`)
        recommendations.push('Use UL 10C / UL 10B listed locks only; no field modifications to fire door')
        if (doorMaterial !== 'metal') {
          score -= 10
          issues.push('90+ min fire rating typically requires steel doors — verify with AHJ')
        }
      } else {
        warnings.push(`Fire-rated door (${fireRating.replace('frl-', '')} min): verify lock is fire-listed`)
      }
    }

    // Multi-Point Locking
    if (lockingPoints === 'multi-3' || lockingPoints === 'multi-5') {
      if (doorType === 'sliding' || doorType === 'pocket') {
        issues.push('Multi-point locking not compatible with sliding/pocket doors')
      } else {
        recommendations.push('Multi-point locks provide enhanced security; require precise door-frame alignment')
        if (lockingPoints === 'multi-5') {
          warnings.push('5-point locking requires specialized mortise preparation — professional install recommended')
        }
      }
    }

    // Handle Type
    if (handleType === 'knob') {
      if (lockStandard === 'bhma-commercial') {
        score -= 10
        issues.push('ADA/commercial codes require lever handles, not knobs (ADA §309.4)')
        recommendations.push('Switch to lever handle for ADA compliance')
      }
    }

    // IP Rating requirement
    if (environment === 'outdoor') {
      if (ipRating === 'none' || ipRating === 'ip20') {
        score -= 15
        issues.push('Outdoor installation requires IP54+ rated lock for weather protection')
        recommendations.push('Select IP65 rated locks: Yale Assure Lock 2, Schlage Encode Plus, Be-Tech outdoor models')
      }
    }

    // Frame Material compatibility
    if (frameMaterial === 'aluminum' && (lockStandard === 'ansi-grade1' || lockStandard === 'bhma-commercial')) {
      score -= 8
      warnings.push('Aluminum frames may not provide adequate anchoring for Grade 1/Commercial locks')
      recommendations.push('Use through-bolting or reinforcement plates')
    }

    // Door Handing
    if (doorHanding === 'unknown') {
      warnings.push('Determine door handing before ordering — some locks are hand-specific')
    }

    // Existing Deadbolt
    if (!hasExistingDeadbolt) {
      warnings.push('New installation requires drilling. Time: +1.5 hours, Cost: +$150-200 labor')
      recommendations.push('Consider hiring locksmith for precise alignment')
    }

    // Door hung check
    if (!isDoorHung) {
      score -= 5
      warnings.push('Unhung door — measure handing after installation')
    }

    const compatible = score >= 60
    if (score < 60) {
      issues.push('Overall compatibility below 60% — major modifications required')
    }

    return {
      compatible,
      score: Math.max(0, Math.min(100, score)),
      issues,
      warnings,
      recommendations,
      compatibleLocks: compatibleLocks.length > 0 ? compatibleLocks : ['Contact manufacturer for compatibility verification'],
    }
  }

  const result = checkCompatibility()

  const getScoreClass = (score: number) => {
    if (score >= 85) return 'result-panel--grade-a'
    if (score >= 70) return 'result-panel--grade-b'
    if (score >= 50) return 'result-panel--grade-c'
    return 'result-panel--grade-f'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent — Fully Compatible'
    if (score >= 70) return 'Good — Minor Adjustments'
    if (score >= 50) return 'Fair — Modifications Required'
    return 'Poor — Major Issues'
  }

  const labelStyle = { display: 'block' as const, fontSize: '0.875rem', fontWeight: 500 as const, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }
  const hintStyle = { fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }

  return (
    <div className="calculator-shell">
      <div className="calculator-inputs space-y-6">
        <div className="content-card">
          <h2 className="section-title">Door Specifications</h2>

          <div className="space-y-6">
            {/* Lock Standard */}
            <div>
              <label style={labelStyle}>Lock Grade / Standard</label>
              <select value={lockStandard} onChange={(e) => setLockStandard(e.target.value)} className="form-input">
                <option value="ansi-grade3">ANSI/BHMA Grade 3 — Residential</option>
                <option value="ansi-grade2">ANSI/BHMA Grade 2 — Light Commercial</option>
                <option value="ansi-grade1">ANSI/BHMA Grade 1 — Heavy-Duty Commercial</option>
                <option value="bhma-commercial">BHMA A156.13 — Mortise Commercial</option>
                <option value="en-grade3">EN 12209 Grade 3 — European Standard</option>
                <option value="en-grade5">EN 12209 Grade 5 — European High Security</option>
              </select>
              <p style={hintStyle}>Higher grades require sturdier door/frame construction</p>
            </div>

            {/* Door Type */}
            <div>
              <label style={labelStyle}>Door Type</label>
              <select value={doorType} onChange={(e) => setDoorType(e.target.value)} className="form-input">
                <option value="hinged-single">Hinged Single (standard)</option>
                <option value="hinged-double">Hinged Double (active + passive leaf)</option>
                <option value="french-double">French Double (both leaves active)</option>
                <option value="dutch">Dutch / Split Door</option>
                <option value="sliding">Sliding / Patio Door</option>
                <option value="pocket">Pocket Door</option>
                <option value="barn">Barn Door (surface mounted)</option>
              </select>
            </div>

            {/* Door Material */}
            <div>
              <label style={labelStyle}>Door Material</label>
              <select value={doorMaterial} onChange={(e) => setDoorMaterial(e.target.value)} className="form-input">
                <option value="wood">Solid Wood</option>
                <option value="wood-hollow">Hollow Core Wood</option>
                <option value="metal">Metal / Steel</option>
                <option value="fiberglass">Fiberglass</option>
                <option value="composite">Composite (WPC / Engineered)</option>
                <option value="aluminum">Aluminum Profile</option>
                <option value="glass">Full Glass / Glass Insert</option>
              </select>
            </div>

            {/* Frame Material */}
            <div>
              <label style={labelStyle}>Frame Material</label>
              <select value={frameMaterial} onChange={(e) => setFrameMaterial(e.target.value)} className="form-input">
                <option value="wood">Wood Frame</option>
                <option value="metal">Steel Frame</option>
                <option value="aluminum">Aluminum Frame</option>
                <option value="pvc">PVC / Vinyl Frame</option>
              </select>
              <p style={hintStyle}>Frame must match lock strike plate anchoring requirements</p>
            </div>

            {/* Door Thickness */}
            <div>
              <label style={labelStyle}>
                Door Thickness: {doorThickness}mm ({(doorThickness / 25.4).toFixed(2)}")
              </label>
              <input
                type="range" min="25" max="80" value={doorThickness}
                onChange={(e) => setDoorThickness(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
              />
              <div className="flex justify-between" style={hintStyle}>
                <span>25mm (1")</span>
                <span style={{ color: 'var(--color-success)' }}>44mm (1-3/4" std)</span>
                <span>80mm (3-1/8")</span>
              </div>
            </div>

            {/* Backset */}
            <div>
              <label style={labelStyle}>Backset Distance</label>
              <select value={backset} onChange={(e) => setBackset(Number(e.target.value))} className="form-input">
                <option value="60">60mm (2-3/8") — Standard Residential</option>
                <option value="70">70mm (2-3/4") — Residential/Commercial</option>
                <option value="102">102mm (4") — Commercial</option>
                <option value="152">152mm (6") — Heavy Commercial</option>
                <option value="45">45mm (1-3/4") — Non-standard / European</option>
              </select>
            </div>

            {/* Bore Hole */}
            <div>
              <label style={labelStyle}>Cylinder Bore Hole Diameter</label>
              <select value={boreHole} onChange={(e) => setBoreHole(Number(e.target.value))} className="form-input">
                <option value="54">54mm (2-1/8") — ANSI Standard</option>
                <option value="51">51mm (2") — Old Standard</option>
                <option value="38">38mm (1-1/2") — Undersized</option>
                <option value="57">57mm (2-1/4") — Oversized</option>
                <option value="0">No existing bore hole</option>
              </select>
            </div>

            {/* Fire Rating */}
            <div>
              <label style={labelStyle}>Fire Rating</label>
              <select value={fireRating} onChange={(e) => setFireRating(e.target.value)} className="form-input">
                <option value="none">None / Not Rated</option>
                <option value="frl-20">20 Minute (FRL 20)</option>
                <option value="frl-45">45 Minute (FRL 45)</option>
                <option value="frl-60">60 Minute (FRL 60)</option>
                <option value="frl-90">90 Minute (FRL 90)</option>
                <option value="frl-120">120 Minute (FRL 120)</option>
              </select>
              <p style={hintStyle}>Fire-rated doors require UL listed hardware — no field modifications allowed</p>
            </div>

            {/* Multi-Point Locking */}
            <div>
              <label style={labelStyle}>Locking Points</label>
              <select value={lockingPoints} onChange={(e) => setLockingPoints(e.target.value)} className="form-input">
                <option value="single">Single Point (standard deadbolt)</option>
                <option value="multi-3">3-Point Multi-Lock</option>
                <option value="multi-5">5-Point Multi-Lock (high security)</option>
              </select>
            </div>

            {/* Handle Type */}
            <div>
              <label style={labelStyle}>Handle Type</label>
              <select value={handleType} onChange={(e) => setHandleType(e.target.value)} className="form-input">
                <option value="lever">Lever Handle (ADA compliant)</option>
                <option value="knob">Round Knob</option>
                <option value="pull">Pull Handle (with separate lock)</option>
                <option value="panic">Panic Bar / Push Bar</option>
                <option value="thumbturn">Thumbturn Only (interior)</option>
              </select>
            </div>

            {/* Door Handing */}
            <div>
              <label style={labelStyle}>Door Handing</label>
              <select value={doorHanding} onChange={(e) => setDoorHanding(e.target.value)} className="form-input">
                <option value="right-hand">Right-Hand (hinges on right, opens inward)</option>
                <option value="left-hand">Left-Hand (hinges on left, opens inward)</option>
                <option value="right-hand-reverse">Right-Hand Reverse (opens outward)</option>
                <option value="left-hand-reverse">Left-Hand Reverse (opens outward)</option>
                <option value="unknown">Unknown / Not Sure</option>
              </select>
            </div>

            {/* IP Rating */}
            <div>
              <label style={labelStyle}>Required IP Rating</label>
              <select value={ipRating} onChange={(e) => setIpRating(e.target.value)} className="form-input">
                <option value="none">None (indoor only)</option>
                <option value="ip20">IP20 (dust protection)</option>
                <option value="ip44">IP44 (splash proof)</option>
                <option value="ip54">IP54 (dust tight, splash)</option>
                <option value="ip65">IP65 (dust tight, water jet)</option>
                <option value="ip67">IP67 (immersion proof)</option>
              </select>
            </div>

            {/* Environment */}
            <div>
              <label style={labelStyle}>Installation Environment</label>
              <select value={environment} onChange={(e) => setEnvironment(e.target.value)} className="form-input">
                <option value="indoor">Indoor (climate controlled)</option>
                <option value="covered">Outdoor Covered (porch, awning)</option>
                <option value="outdoor">Outdoor Exposed (direct weather)</option>
                <option value="marine">Marine / Coastal (salt air)</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div>
              <label style={labelStyle}>Additional Factors</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { checked: hasExistingDeadbolt, setter: setHasExistingDeadbolt, label: 'Has existing deadbolt (replacement)' },
                  { checked: isDoorHung, setter: setIsDoorHung, label: 'Door is already hung' },
                ].map(({ checked, setter, label }) => (
                  <label key={label} className="flex items-center gap-2" style={{ fontSize: '0.875rem', padding: 'var(--space-xs) var(--space-sm)', cursor: 'pointer' }}>
                    <input
                      type="checkbox" checked={checked}
                      onChange={(e) => setter(e.target.checked)}
                      style={{ width: '1rem', height: '1rem', accentColor: 'var(--color-accent)' }}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="calculator-results">
        <div className={`result-panel ${getScoreClass(result.score)}`}>
          <h2 className="text-xl font-bold mb-6">Compatibility Score</h2>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold mb-2">{result.score}%</div>
            <div className="text-lg opacity-90">{getScoreLabel(result.score)}</div>
          </div>

          <div className="mb-6">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all duration-500" style={{ width: `${result.score}%` }} />
            </div>
          </div>

          {result.issues.length > 0 && (
            <div className="mb-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs font-semibold mb-2">Critical Issues:</p>
              <ul className="text-xs space-y-1 opacity-90">
                {result.issues.map((issue, i) => <li key={i}>• {issue}</li>)}
              </ul>
            </div>
          )}

          {result.warnings.length > 0 && (
            <div className="mb-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs font-semibold mb-2">Warnings:</p>
              <ul className="text-xs space-y-1 opacity-90">
                {result.warnings.map((warn, i) => <li key={i}>• {warn}</li>)}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="mb-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs font-semibold mb-2">Recommendations:</p>
              <ul className="text-xs space-y-1 opacity-90">
                {result.recommendations.map((rec, i) => <li key={i}>• {rec}</li>)}
              </ul>
            </div>
          )}

          {result.compatibleLocks.length > 0 && (
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-xs font-semibold mb-2">Compatible Lock Options:</p>
              <ul className="text-xs space-y-1 opacity-90">
                {result.compatibleLocks.map((lock, i) => <li key={i}>✓ {lock}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
