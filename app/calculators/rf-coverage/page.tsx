'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { Radio, MapPin, AlertTriangle, Check } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'

export default function RFCoverage() {
  const [buildingLength, setBuildingLength] = useState(30)
  const [buildingWidth, setBuildingWidth] = useState(20)
  const [floors, setFloors] = useState(2)
  const [lockCount, setLockCount] = useState(10)
  const [protocol, setProtocol] = useState('zigbee')
  const [wallDensity, setWallDensity] = useState('medium')

  // New professional fields
  const [buildingType, setBuildingType] = useState('offices')
  const [hasMeshRepeaters, setHasMeshRepeaters] = useState(false)
  const [repeaterCount, setRepeaterCount] = useState(0)
  const [interferenceLevel, setInterferenceLevel] = useState('medium')
  const [ceilingHeight, setCeilingHeight] = useState('standard')

  const calculate = () => {
    const area = buildingLength * buildingWidth * floors
    const protocolRange = { zigbee: 30, zwave: 40, wifi: 25, thread: 28 }[protocol] || 30
    const wallPenalty = { low: 0.9, medium: 0.7, high: 0.5 }[wallDensity] || 0.7

    // Building type layout factor
    const layoutFactor: Record<string, number> = { 'open-plan': 1.2, offices: 0.85, 'hotel-corridor': 0.7, apartments: 0.6 }
    const layoutMul = layoutFactor[buildingType] || 0.85

    // Interference reduction
    const interferencePenalty: Record<string, number> = { low: 1.0, medium: 0.9, high: 0.75 }
    const intMul = interferencePenalty[interferenceLevel] || 0.9

    // Ceiling height propagation factor
    const ceilingFactor: Record<string, number> = { standard: 1.0, high: 0.9, warehouse: 0.75 }
    const ceilMul = ceilingFactor[ceilingHeight] || 1.0

    const effectiveRange = protocolRange * wallPenalty * layoutMul * intMul * ceilMul
    const coverage = Math.PI * effectiveRange * effectiveRange

    // Mesh repeaters extend coverage
    const repeaterExtension = hasMeshRepeaters && repeaterCount > 0 ? repeaterCount * coverage * 0.6 : 0
    const totalCoverage = area
    const effectiveCoverageCapacity = coverage + (repeaterExtension / Math.max(1, Math.ceil(area / coverage)))

    const hubsNeeded = Math.max(1, Math.ceil(area / effectiveCoverageCapacity))
    const locksPerHub = Math.ceil(lockCount / hubsNeeded)
    const signalQuality = locksPerHub < 15 ? 'Excellent' : locksPerHub < 25 ? 'Good' : 'Fair'

    return {
      area,
      effectiveRange: Math.round(effectiveRange),
      hubsNeeded,
      locksPerHub,
      signalQuality,
      coverage: Math.round(coverage),
      repeatersActive: hasMeshRepeaters ? repeaterCount : 0
    }
  }

  const result = calculate()

  return (
    <div className="page-bg">
      <div className="container-main section">
        <Link href="/calculators" className="back-link">← Back</Link>

        <div className="text-center mb-12">
          <div className="page-header__icon"><Radio className="w-14 h-14 mx-auto" /></div>
          <h1 className="text-4xl font-bold mb-4">RF Coverage Estimator</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--color-text-secondary)" }}>Plan mesh network topology and signal coverage</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
            <h2 className="text-2xl font-bold mb-6">Building Specifications</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Building Length: {buildingLength}m</label>
                <input type="range" min="10" max="100" value={buildingLength} onChange={(e) => setBuildingLength(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Building Width: {buildingWidth}m</label>
                <input type="range" min="10" max="100" value={buildingWidth} onChange={(e) => setBuildingWidth(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Floors: {floors}</label>
                <input type="range" min="1" max="20" value={floors} onChange={(e) => setFloors(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Total Locks: {lockCount}</label>
                <input type="range" min="1" max="100" value={lockCount} onChange={(e) => setLockCount(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Protocol</label>
                <select value={protocol} onChange={(e) => setProtocol(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="zigbee">Zigbee</option>
                  <option value="zwave">Z-Wave</option>
                  <option value="wifi">Wi-Fi</option>
                  <option value="thread">Thread</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Wall Density</label>
                <select value={wallDensity} onChange={(e) => setWallDensity(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="low">Low (Open plan)</option>
                  <option value="medium">Medium (Normal)</option>
                  <option value="high">High (Many walls)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Building Layout</label>
                <select value={buildingType} onChange={(e) => setBuildingType(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="open-plan">Open Plan (best coverage)</option>
                  <option value="offices">Office Partitions (standard)</option>
                  <option value="hotel-corridor">Hotel / Corridor (linear)</option>
                  <option value="apartments">Apartments (isolated units)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Interference Level</label>
                <select value={interferenceLevel} onChange={(e) => setInterferenceLevel(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="low">Low (few electronics nearby)</option>
                  <option value="medium">Medium (typical office)</option>
                  <option value="high">High (industrial / dense WiFi)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Ceiling Height</label>
                <select value={ceilingHeight} onChange={(e) => setCeilingHeight(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="standard">Standard (2.4–3m)</option>
                  <option value="high">High Ceiling (3–5m)</option>
                  <option value="warehouse">Warehouse / Industrial (5m+)</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                  <input type="checkbox" checked={hasMeshRepeaters} onChange={(e) => setHasMeshRepeaters(e.target.checked)} className="w-4 h-4" />
                  <span>Has Mesh Repeaters / Range Extenders</span>
                </label>
              </div>
              {hasMeshRepeaters && (
                <div>
                  <label className="block mb-2 font-medium">Number of Repeaters: {repeaterCount}</label>
                  <input type="range" min="0" max="10" value={repeaterCount} onChange={(e) => setRepeaterCount(Number(e.target.value))} className="w-full" />
                </div>
              )}
            </div>
          </div>

          <div>
            <div className={`p-8 rounded-lg shadow-lg text-white sticky top-4 ${result.signalQuality === 'Excellent' ? 'result-panel--grade-a' :
                result.signalQuality === 'Good' ? 'result-panel--grade-b' :
                  'result-panel--grade-c'
              }`}>
              <h2 className="text-xl font-bold mb-6">Coverage Analysis</h2>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">{result.hubsNeeded}</div>
                <div className="text-lg">Hubs/Gateways Needed</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Total Area</span>
                  <span className="font-semibold">{result.area}m²</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Effective Range</span>
                  <span className="font-semibold">{result.effectiveRange}m</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Coverage per Hub</span>
                  <span className="font-semibold">{result.coverage}m²</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Locks per Hub</span>
                  <span className="font-semibold">{result.locksPerHub}</span>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-white/40">
                <div className="flex justify-between items-center">
                  <span>Signal Quality</span>
                  <span className="text-2xl font-bold">{result.signalQuality}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
            <h3 className="font-semibold mb-3 inline-flex items-center gap-2"><MapPin className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Hub Placement</h3>
            <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
              <li>• Central locations</li>
              <li>• Away from metal</li>
              <li>• Height: 2m optimal</li>
              <li>• Avoid corners</li>
            </ul>
          </div>
          <div className="p-6 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
            <h3 className="font-semibold mb-3 inline-flex items-center gap-2"><AlertTriangle className="w-5 h-5" style={{ color: "var(--color-warning)" }} /> Obstacles</h3>
            <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
              <li>• Metal reduces 50%</li>
              <li>• Concrete reduces 40%</li>
              <li>• Water reduces 30%</li>
              <li>• Glass minimal impact</li>
            </ul>
          </div>
          <div className="p-6 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
            <h3 className="font-semibold mb-3 inline-flex items-center gap-2"><Check className="w-5 h-5" style={{ color: "var(--color-success)" }} /> Best Practices</h3>
            <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
              <li>• Test before final install</li>
              <li>• Add 20% redundancy</li>
              <li>• Document coverage map</li>
              <li>• Plan for expansion</li>
            </ul>
          </div>
        </div>
      </div>

      <ToolRating toolSlug="rf-coverage" />

      <RelatedResources calculatorSlug="rf-coverage-estimator" />

      {/* Be-Tech Brand Recommendation */}
      <BeTechCalculatorRecommendation
        description="Be-Tech locks feature excellent RF signal quality and mesh network support across all protocols. Optimized antenna design ensures reliable coverage even in challenging environments."
        badge="Strong Signal"
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
