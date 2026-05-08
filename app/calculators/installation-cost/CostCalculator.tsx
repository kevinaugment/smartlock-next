'use client'

import { useState } from 'react'

// Regional labor rate multipliers (US = 1.0 baseline)
const regionMultipliers: Record<string, { label: string; multiplier: number }> = {
  us: { label: 'United States', multiplier: 1.0 },
  eu: { label: 'European Union', multiplier: 1.15 },
  uk: { label: 'United Kingdom', multiplier: 1.10 },
  asia: { label: 'Asia Pacific', multiplier: 0.65 },
  'middle-east': { label: 'Middle East / Africa', multiplier: 0.80 },
  canada: { label: 'Canada', multiplier: 1.05 },
  australia: { label: 'Australia / NZ', multiplier: 1.20 },
}

// Base US labor rates (2026, HomeAdvisor / Angi / Thumbtack data)
const LABOR_RATES = {
  diy: 0,
  handyman: 65,
  locksmith: 85,
  electrician: 95,
  security_integrator: 120,
}

// Installation time by complexity (hours per lock)
const INSTALL_TIME = {
  simple: 1.5,
  standard: 2.5,
  complex: 4.0,
  commercial: 6.0,
  'high-security': 8.0,
}

// Door types and their modification costs
const DOOR_MOD_COST: Record<string, { label: string; cost: number }> = {
  none: { label: 'No modification needed', cost: 0 },
  backset: { label: 'Backset adapter ($30/door)', cost: 30 },
  bore: { label: 'Re-bore hole ($75/door)', cost: 75 },
  reinforce: { label: 'Reinforce door/frame ($120/door)', cost: 120 },
  'full-prep': { label: 'Full door prep + frame ($200/door)', cost: 200 },
  'fire-door': { label: 'Fire-rated door modification ($350/door)', cost: 350 },
}

// Network infrastructure costs
const NETWORK_COSTS: Record<string, { label: string; cost: number }> = {
  none: { label: 'None (standalone Wi-Fi/BLE lock)', cost: 0 },
  'zigbee-hub': { label: 'Zigbee Hub ($60)', cost: 60 },
  'zwave-hub': { label: 'Z-Wave Hub ($80)', cost: 80 },
  'thread-border': { label: 'Thread Border Router ($100)', cost: 100 },
  'access-panel': { label: 'Access Control Panel ($300)', cost: 300 },
  'server-rack': { label: 'Central Server + Rack ($1,500)', cost: 1500 },
}

// Compliance/permit costs
const COMPLIANCE_COSTS: Record<string, { label: string; cost: number }> = {
  none: { label: 'None', cost: 0 },
  permit: { label: 'Building Permit ($75)', cost: 75 },
  'fire-cert': { label: 'Fire Marshal Cert ($200)', cost: 200 },
  'ada': { label: 'ADA Compliance Review ($150)', cost: 150 },
  'full': { label: 'Full Compliance Package ($500)', cost: 500 },
}

// Bulk quantity discount tiers
function getBulkDiscount(qty: number): number {
  if (qty >= 100) return 0.20
  if (qty >= 50) return 0.15
  if (qty >= 20) return 0.10
  if (qty >= 10) return 0.05
  return 0
}

interface CostBreakdown {
  hardware: number
  labor: number
  wiring: number
  tools: number
  hub: number
  modification: number
  network: number
  compliance: number
  bulkDiscount: number
  total: number
  timeHours: number
  perLock: number
}

export default function CostCalculator() {
  const [lockType, setLockType] = useState('standard')
  const [quantity, setQuantity] = useState(1)
  const [installer, setInstaller] = useState('locksmith')
  const [complexity, setComplexity] = useState('standard')
  const [region, setRegion] = useState('us')
  const [doorModification, setDoorModification] = useState('none')
  const [networkInfra, setNetworkInfra] = useState('zigbee-hub')
  const [compliance, setCompliance] = useState('none')
  const [needsWiring, setNeedsWiring] = useState(false)
  const [hasTools, setHasTools] = useState(false)
  const [needsTraining, setNeedsTraining] = useState(false)
  const [needsSiteVisit, setNeedsSiteVisit] = useState(false)

  const calculateCost = (): CostBreakdown => {
    const regionMul = regionMultipliers[region]?.multiplier || 1.0
    const bulkDiscountRate = getBulkDiscount(quantity)

    // Hardware costs (2026 market averages)
    const lockPrices: Record<string, number> = {
      basic: 120,
      standard: 220,
      premium: 380,
      commercial: 650,
      'high-security': 950,
    }

    const baseHardware = (lockPrices[lockType] || 220) * quantity
    const bulkDiscount = baseHardware * bulkDiscountRate
    const hardware = (baseHardware - bulkDiscount) * regionMul

    // Labor
    const baseTime = INSTALL_TIME[complexity as keyof typeof INSTALL_TIME] || 2.5
    const totalTime = baseTime * quantity
    const hourlyRate = (LABOR_RATES[installer as keyof typeof LABOR_RATES] || 0) * regionMul
    const labor = totalTime * hourlyRate

    // Wiring
    const wiring = needsWiring ? (quantity * 2 * LABOR_RATES.electrician * regionMul) : 0

    // Door modification
    const modCost = DOOR_MOD_COST[doorModification]?.cost || 0
    const modification = modCost * quantity * regionMul

    // Network infrastructure
    const network = (NETWORK_COSTS[networkInfra]?.cost || 0) * regionMul

    // Compliance
    const complianceCost = (COMPLIANCE_COSTS[compliance]?.cost || 0) * regionMul

    // Tools (DIY only)
    const tools = (installer === 'diy' && !hasTools) ? 45 : 0

    // Site survey
    const siteVisit = needsSiteVisit ? (150 * regionMul) : 0

    // Staff training
    const training = needsTraining ? (Math.min(quantity, 10) * 50 * regionMul) : 0

    const total = hardware + labor + wiring + modification + network + complianceCost + tools + siteVisit + training

    return {
      hardware,
      labor,
      wiring,
      tools,
      hub: 0,
      modification,
      network: network + siteVisit + training,
      compliance: complianceCost,
      bulkDiscount: bulkDiscount * regionMul,
      total,
      timeHours: totalTime,
      perLock: quantity > 0 ? total / quantity : 0,
    }
  }

  const cost = calculateCost()

  const labelStyle = { display: 'block' as const, fontSize: '0.875rem', fontWeight: 500 as const, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }
  const hintStyle = { fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }

  return (
    <div className="calculator-shell">
      {/* Input Section */}
      <div className="calculator-inputs space-y-6">
        <div className="content-card">
          <h2 className="section-title">Installation Parameters</h2>

          <div className="space-y-6">
            {/* Region */}
            <div>
              <label style={labelStyle}>Market Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="form-input">
                {Object.entries(regionMultipliers).map(([key, data]) => (
                  <option key={key} value={key}>{data.label} (×{data.multiplier.toFixed(2)})</option>
                ))}
              </select>
              <p style={hintStyle}>Regional labor and material cost multiplier</p>
            </div>

            {/* Lock Type */}
            <div>
              <label style={labelStyle}>Lock Type & Price Range</label>
              <select value={lockType} onChange={(e) => setLockType(e.target.value)} className="form-input">
                <option value="basic">Basic ($120) — Wyze, August Wi-Fi</option>
                <option value="standard">Standard ($220) — Schlage Encode, Yale Assure</option>
                <option value="premium">Premium ($380) — August Pro, Level Lock+</option>
                <option value="commercial">Commercial ($650) — Schlage NDE, Assa Abloy</option>
                <option value="high-security">High-Security ($950) — ASSA ABLOY IN120, HES 9600</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label style={labelStyle}>Number of Locks: {quantity}</label>
              <input
                type="range" min="1" max="200" value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }}
              />
              <div className="flex justify-between" style={hintStyle}>
                <span>1 lock</span>
                <span>200 locks</span>
              </div>
              {getBulkDiscount(quantity) > 0 && (
                <p style={{ ...hintStyle, color: 'var(--color-success)' }}>
                  🎉 Bulk discount applied: {(getBulkDiscount(quantity) * 100).toFixed(0)}% off hardware
                </p>
              )}
            </div>

            {/* Installer Type */}
            <div>
              <label style={labelStyle}>Installer Type</label>
              <select value={installer} onChange={(e) => setInstaller(e.target.value)} className="form-input">
                <option value="diy">DIY ($0/hr)</option>
                <option value="handyman">Handyman ($65/hr)</option>
                <option value="locksmith">Locksmith ($85/hr) — Recommended</option>
                <option value="electrician">Electrician ($95/hr) — For wiring jobs</option>
                <option value="security_integrator">Security Integrator ($120/hr) — Commercial</option>
              </select>
            </div>

            {/* Complexity */}
            <div>
              <label style={labelStyle}>Installation Complexity</label>
              <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="form-input">
                <option value="simple">Simple (1.5 hrs) — Replace existing deadbolt</option>
                <option value="standard">Standard (2.5 hrs) — New installation, standard door prep</option>
                <option value="complex">Complex (4 hrs) — Wiring required or frame modification</option>
                <option value="commercial">Commercial (6 hrs) — Access control integration</option>
                <option value="high-security">High-Security (8 hrs) — Full frame reinforcement + wiring</option>
              </select>
            </div>

            {/* Door Modification */}
            <div>
              <label style={labelStyle}>Door Modification Required</label>
              <select value={doorModification} onChange={(e) => setDoorModification(e.target.value)} className="form-input">
                {Object.entries(DOOR_MOD_COST).map(([key, data]) => (
                  <option key={key} value={key}>{data.label}</option>
                ))}
              </select>
            </div>

            {/* Network Infrastructure */}
            <div>
              <label style={labelStyle}>Network Infrastructure</label>
              <select value={networkInfra} onChange={(e) => setNetworkInfra(e.target.value)} className="form-input">
                {Object.entries(NETWORK_COSTS).map(([key, data]) => (
                  <option key={key} value={key}>{data.label}</option>
                ))}
              </select>
              <p style={hintStyle}>Hub, panel, or server required for lock connectivity</p>
            </div>

            {/* Compliance */}
            <div>
              <label style={labelStyle}>Compliance & Permits</label>
              <select value={compliance} onChange={(e) => setCompliance(e.target.value)} className="form-input">
                {Object.entries(COMPLIANCE_COSTS).map(([key, data]) => (
                  <option key={key} value={key}>{data.label}</option>
                ))}
              </select>
              <p style={hintStyle}>Commercial installations may require permits or inspections</p>
            </div>

            {/* Additional Options */}
            <div>
              <label style={labelStyle}>Additional Services</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { checked: needsWiring, setter: setNeedsWiring, label: 'Electrical Wiring', impact: `+$${LABOR_RATES.electrician * 2}/lock` },
                  { checked: needsSiteVisit, setter: setNeedsSiteVisit, label: 'Pre-Install Site Survey', impact: '+$150' },
                  { checked: needsTraining, setter: setNeedsTraining, label: 'Staff/User Training', impact: '+$50/person' },
                  ...(installer === 'diy' ? [{ checked: hasTools, setter: setHasTools, label: 'I Have Required Tools', impact: '-$45' }] : []),
                ].map(({ checked, setter, label, impact }) => (
                  <label key={label} className="flex items-center gap-2" style={{ fontSize: '0.875rem', padding: 'var(--space-xs) var(--space-sm)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                    <input
                      type="checkbox" checked={checked}
                      onChange={(e) => setter(e.target.checked)}
                      style={{ width: '1rem', height: '1rem', accentColor: 'var(--color-accent)' }}
                    />
                    <span>{label}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>({impact})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="calculator-results">
        <div className="rounded-lg shadow-lg p-8 text-white result-panel--grade-a">
          <h2 className="text-xl font-bold mb-6">Total Cost Estimate</h2>

          <div className="text-center mb-8">
            <div className="text-5xl font-bold mb-2">${cost.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="text-lg opacity-90">{cost.timeHours.toFixed(1)} hours total</div>
            <div className="text-sm opacity-75 mt-1">${cost.perLock.toFixed(0)}/lock</div>
          </div>

          <div className="space-y-3 text-sm bg-white/10 rounded-lg p-4 mb-6">
            <div className="flex justify-between">
              <span className="opacity-90">Hardware ({quantity}×):</span>
              <span className="font-semibold">${cost.hardware.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            {cost.bulkDiscount > 0 && (
              <div className="flex justify-between" style={{ color: 'var(--color-success)' }}>
                <span>Bulk Discount:</span>
                <span className="font-semibold">-${cost.bulkDiscount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            )}
            {cost.labor > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Labor ({cost.timeHours}hrs):</span>
                <span className="font-semibold">${cost.labor.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            )}
            {cost.wiring > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Wiring:</span>
                <span className="font-semibold">${cost.wiring.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            )}
            {cost.modification > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Door Modification:</span>
                <span className="font-semibold">${cost.modification.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            )}
            {cost.network > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Network / Training:</span>
                <span className="font-semibold">${cost.network.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            )}
            {cost.compliance > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Compliance:</span>
                <span className="font-semibold">${cost.compliance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            )}
            {cost.tools > 0 && (
              <div className="flex justify-between">
                <span className="opacity-90">Tools:</span>
                <span className="font-semibold">${cost.tools}</span>
              </div>
            )}
          </div>

          <div className="p-4 bg-white/10 rounded-lg">
            <p className="text-xs opacity-90">
              <strong>Tip:</strong> {
                installer === 'diy'
                  ? 'DIY saves labor cost but allow 2-3 hours per lock and watch tutorial videos.'
                  : quantity >= 10
                    ? `Bulk install of ${quantity} locks qualifies for ${(getBulkDiscount(quantity) * 100).toFixed(0)}% hardware discount.`
                    : complexity === 'high-security'
                      ? 'High-security installations require certified installers for warranty coverage.'
                      : 'Professional installation includes alignment check and warranty coverage.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
