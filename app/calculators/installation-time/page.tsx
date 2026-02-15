'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BeTechCalculatorRecommendation } from '@/components/calculators/BeTechRecommendation'
import { Timer } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'

export default function InstallationTime() {
  const [doorCount, setDoorCount] = useState(10)
  const [doorType, setDoorType] = useState('standard')
  const [wireRequired, setWireRequired] = useState(false)
  const [technicianCount, setTechnicianCount] = useState(2)
  const [laborRate, setLaborRate] = useState(75)

  // New professional fields
  const [experienceLevel, setExperienceLevel] = useState('experienced')
  const [preppedDoors, setPreppedDoors] = useState(false)
  const [buildingType, setBuildingType] = useState('residential')
  const [travelTime, setTravelTime] = useState(0)
  const [inspectionRequired, setInspectionRequired] = useState(false)

  const calculate = () => {
    const baseTimePerDoor = { standard: 45, thick: 60, metal: 75, glass: 90 }[doorType] || 45
    const wireTimePerDoor = wireRequired ? 30 : 0

    // Experience level multiplier
    const experienceMultiplier = { junior: 1.3, experienced: 1.0, certified: 0.85 }[experienceLevel] || 1.0

    // Prepped doors save 20 min (bore holes already drilled)
    const prepSavings = preppedDoors ? -20 : 0

    // Building type access overhead per door
    const buildingOverhead = { residential: 0, commercial: 15, highrise: 25 }[buildingType] || 0

    // Post-install inspection time
    const inspectionTime = inspectionRequired ? 20 : 0

    const adjustedTimePerDoor = Math.max(10, Math.round((baseTimePerDoor + wireTimePerDoor + prepSavings + buildingOverhead + inspectionTime) * experienceMultiplier))
    const travelTotal = doorCount > 1 ? (doorCount - 1) * travelTime : 0
    const totalMinutes = doorCount * adjustedTimePerDoor + travelTotal
    const totalHours = totalMinutes / 60
    const hoursPerTech = totalHours / technicianCount
    const crewDays = Math.ceil(hoursPerTech / 8)
    const laborCost = totalHours * laborRate
    const costPerDoor = laborCost / doorCount

    return {
      totalMinutes,
      totalHours: Math.round(totalHours * 10) / 10,
      hoursPerTech: Math.round(hoursPerTech * 10) / 10,
      crewDays,
      laborCost: Math.round(laborCost),
      costPerDoor: Math.round(costPerDoor),
      minutesPerDoor: adjustedTimePerDoor,
      travelTotal
    }
  }

  const result = calculate()

  return (
    <div className="page-bg">
      <div className="container-main section">
        <Link href="/calculators" className="back-link">← Back</Link>

        <div className="text-center mb-12">
          <div className="page-header__icon"><Timer className="w-14 h-14 mx-auto" /></div>
          <h1 className="text-4xl font-bold mb-4">Installation Time Estimator</h1>
          <p style={{ fontSize: "1.25rem", color: "var(--color-text-secondary)" }}>Estimate technician hours and labor cost</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
            <h2 className="text-2xl font-bold mb-6">Project Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Number of Doors: {doorCount}</label>
                <input type="range" min="1" max="100" value={doorCount} onChange={(e) => setDoorCount(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Door Type</label>
                <select value={doorType} onChange={(e) => setDoorType(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="standard">Standard (45 min/door)</option>
                  <option value="thick">Thick/Security (60 min/door)</option>
                  <option value="metal">Metal (75 min/door)</option>
                  <option value="glass">Glass/Special (90 min/door)</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: "1px solid var(--color-border)" }}>
                  <input type="checkbox" checked={wireRequired} onChange={(e) => setWireRequired(e.target.checked)} className="w-4 h-4" />
                  <span>Wiring Required (+30 min/door)</span>
                </label>
              </div>
              <div>
                <label className="block mb-2 font-medium">Number of Technicians: {technicianCount}</label>
                <input type="range" min="1" max="10" value={technicianCount} onChange={(e) => setTechnicianCount(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Labor Rate: ${laborRate}/hour</label>
                <input type="range" min="50" max="150" step="5" value={laborRate} onChange={(e) => setLaborRate(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Technician Experience Level</label>
                <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="junior">Junior / First Install (×1.3 time)</option>
                  <option value="experienced">Experienced (standard time)</option>
                  <option value="certified">Certified / Specialist (×0.85 time)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Building Type</label>
                <select value={buildingType} onChange={(e) => setBuildingType(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="residential">Residential (no overhead)</option>
                  <option value="commercial">Commercial (+15 min/door access)</option>
                  <option value="highrise">High-Rise (+25 min/door access)</option>
                </select>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Elevator wait, security check-in, freight access</p>
              </div>
              <div>
                <label className="block mb-2 font-medium">Travel Time Between Doors: {travelTime} min</label>
                <input type="range" min="0" max="30" value={travelTime} onChange={(e) => setTravelTime(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span>0 min (same area)</span>
                  <span>30 min (multi-site)</span>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">Additional Factors</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                    <input type="checkbox" checked={preppedDoors} onChange={(e) => setPreppedDoors(e.target.checked)} className="w-4 h-4" />
                    <span>Doors Pre-Drilled (−20 min/door)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded cursor-pointer" style={{ border: '1px solid var(--color-border)' }}>
                    <input type="checkbox" checked={inspectionRequired} onChange={(e) => setInspectionRequired(e.target.checked)} className="w-4 h-4" />
                    <span>Post-Install Inspection (+20 min/door)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="p-8 rounded-lg shadow-lg text-white sticky top-4" style={{ background: 'linear-gradient(to bottom right, var(--color-warning), var(--color-warning-dark, #a16207))' }}>
              <h2 className="text-xl font-bold mb-6">Time & Cost Estimate</h2>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold mb-2">{result.crewDays}</div>
                <div className="text-lg">Crew-Days</div>
                <div className="text-sm opacity-90 mt-2">{result.totalHours}h total</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Time per Door</span>
                  <span className="font-semibold">{result.minutesPerDoor} min</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Hours per Tech</span>
                  <span className="font-semibold">{result.hoursPerTech}h</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Labor Cost</span>
                  <span className="font-semibold">${result.laborCost}</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Cost per Door</span>
                  <span className="font-semibold">${result.costPerDoor}</span>
                </div>
              </div>
              {result.travelTotal > 0 && (
                <div className="flex justify-between pb-3 border-b border-white/20">
                  <span>Travel Time</span>
                  <span className="font-semibold">{result.travelTotal} min</span>
                </div>
              )}
              <div className="pt-4 border-t-2 border-white/40">
                <div className="text-sm opacity-90">Based on 8-hour work days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 p-8 rounded-lg shadow-lg" style={{ background: 'var(--color-surface)' }}>
          <h2 className="text-2xl font-bold mb-6">Time Breakdown</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--color-accent-subtle)" }}>
              <div className="text-2xl font-bold text-blue-700 mb-1">{Math.round(result.totalHours * 0.6)}h</div>
              <div className="link-card__desc">Physical Installation</div>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--color-success-subtle)" }}>
              <div className="text-2xl font-bold text-green-700 mb-1">{Math.round(result.totalHours * 0.25)}h</div>
              <div className="link-card__desc">Testing & Setup</div>
            </div>
            <div className="text-center p-4 rounded-lg" style={{ background: "var(--color-accent-subtle)" }}>
              <div className="text-2xl font-bold text-purple-700 mb-1">{Math.round(result.totalHours * 0.15)}h</div>
              <div className="link-card__desc">Cleanup & Documentation</div>
            </div>
          </div>
        </div>
      </div>

      <ToolRating toolSlug="installation-time" />

      <RelatedResources calculatorSlug="installation-time-estimator" />

      {/* Be-Tech Brand Recommendation */}
      <BeTechCalculatorRecommendation
        description="Be-Tech locks feature easy installation with clear documentation and professional installer support. Most installations can be completed in 30-45 minutes per door."
        badge="Quick Install"
      />

      {/* Back Link */}
      <div className="max-w-6xl mx-auto mt-8 mb-12">
        <Link href="/calculators" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
          ← Back to All Calculators
        </Link>
      </div>
    </div >
  )
}
