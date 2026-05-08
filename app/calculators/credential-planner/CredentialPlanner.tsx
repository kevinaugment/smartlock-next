'use client'

import { useState } from 'react'

// Real manufacturer credential capacities (2026 specs)
const LOCK_MODELS = {
  basic: {
    capacity: 50,
    name: 'Basic/Entry',
    examples: 'Wyze Lock, August Wi-Fi',
    pinLength: '4-6 digits',
    credTypes: ['PIN']
  },
  standard: {
    capacity: 100,
    name: 'Standard/Mid-Range',
    examples: 'Schlage Encode, Yale Assure',
    pinLength: '4-8 digits',
    credTypes: ['PIN', 'RFID']
  },
  premium: {
    capacity: 250,
    name: 'Premium/Pro',
    examples: 'August Pro, Schlage Connect',
    pinLength: '4-10 digits',
    credTypes: ['PIN', 'RFID', 'NFC']
  },
  enterprise: {
    capacity: 500,
    name: 'Enterprise/Commercial',
    examples: 'Allegion NDE, Assa Abloy',
    pinLength: '4-12 digits',
    credTypes: ['PIN', 'RFID', 'NFC', 'Biometric']
  }
}

// Credential lifecycle best practices (NIST SP 800-63B)
const CAPACITY_THRESHOLDS = {
  safe: 70, // < 70% green
  warning: 85, // 70-85% yellow
  critical: 90 // 85-90% orange
  // > 90% red
}

interface CapacityResult {
  capacity: number
  totalCredentials: number
  utilization: number
  available: number
  status: string
  statusClass: string
  recommendation: string
  credentialBreakdown: {
    employees: number
    contractors: number
    guests: number
  }
  turnoverImpact: number
}

export default function CredentialPlanner() {
  const [employees, setEmployees] = useState(20)
  const [contractors, setContractors] = useState(10)
  const [guests, setGuests] = useState(30)
  const [lockModel, setLockModel] = useState<keyof typeof LOCK_MODELS>('standard')
  const [monthlyTurnover, setMonthlyTurnover] = useState(5)

  // New professional fields
  const [credentialExpiry, setCredentialExpiry] = useState('none')
  const [auditCompliance, setAuditCompliance] = useState('none')
  const [multiDoorAccess, setMultiDoorAccess] = useState(1)
  const [shiftCount, setShiftCount] = useState('1')
  const [guestScheduleType, setGuestScheduleType] = useState('one-time')

  const calculate = (): CapacityResult => {
    const model = LOCK_MODELS[lockModel]
    const capacity = model.capacity

    // Multi-door access multiplier
    const totalCredentialInstances = (employees + contractors + guests) * multiDoorAccess

    // Shift overlap: multi-shift needs concurrent credentials
    const shiftMultiplier = { '1': 1.0, '2': 1.3, '3': 1.5 }[shiftCount] || 1.0

    // Guest schedule churn factor
    const guestChurnFactor = { 'one-time': 1.2, recurring: 0.8, mixed: 1.0 }[guestScheduleType] || 1.0
    const adjustedGuests = Math.round(guests * guestChurnFactor)

    // Compliance buffer
    const complianceBuffer: Record<string, number> = { none: 1.0, sox: 1.10, hipaa: 1.15, pci: 1.25 }
    const complianceMul = complianceBuffer[auditCompliance] || 1.0

    // Total active credentials needed with all factors
    const baseCredentials = employees + contractors + adjustedGuests
    const totalCredentials = Math.round(baseCredentials * shiftMultiplier * complianceMul)

    // Utilization percentage
    const utilization = Math.round((totalCredentials / capacity) * 100)

    // Available slots
    const available = Math.max(0, capacity - totalCredentials)

    // Status determination
    let status = 'Safe'
    let statusClass = 'result-panel--grade-a'
    if (utilization >= 90) {
      status = 'Critical'
      statusClass = 'result-panel--grade-f'
    } else if (utilization >= CAPACITY_THRESHOLDS.warning) {
      status = 'High'
      statusClass = 'result-panel--grade-c'
    } else if (utilization >= CAPACITY_THRESHOLDS.safe) {
      status = 'Warning'
      statusClass = 'result-panel--grade-c'
    }

    // Recommendation
    let recommendation = ''
    if (utilization >= 90) {
      recommendation = 'Upgrade required! Exceeding capacity risks credential failures.'
    } else if (utilization >= CAPACITY_THRESHOLDS.warning) {
      recommendation = 'Near capacity. Plan upgrade or reduce active credentials.'
    } else if (utilization >= CAPACITY_THRESHOLDS.safe) {
      recommendation = 'Monitor closely. Maintain 20% buffer for reliability.'
    } else {
      recommendation = 'Capacity OK. Good headroom for growth.'
    }

    // Expiry adds churn overhead
    const expiryChurn: Record<string, number> = { none: 0, '30-days': totalCredentials * 0.5, '90-days': totalCredentials * 0.15, annual: totalCredentials * 0.08 }
    const expiryImpact = Math.round(expiryChurn[credentialExpiry] || 0)

    // Turnover impact (credentials created/deleted per month)
    const turnoverImpact = Math.round(((employees + contractors) * monthlyTurnover) / 100) + expiryImpact

    return {
      capacity,
      totalCredentials,
      utilization,
      available,
      status,
      statusClass,
      recommendation,
      credentialBreakdown: {
        employees,
        contractors,
        guests: adjustedGuests
      },
      turnoverImpact
    }
  }

  const result = calculate()
  const model = LOCK_MODELS[lockModel]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg shadow-lg border p-8" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Credential Requirements</h2>

            <div className="space-y-6">
              {/* Employees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permanent Employees: {employees}
                </label>
                <input type="range" min="0" max="200" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 employees</span>
                  <span>200 employees</span>
                </div>
              </div>

              {/* Contractors */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contractors/Temporary Staff: {contractors}
                </label>
                <input type="range" min="0" max="100" value={contractors} onChange={(e) => setContractors(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0 contractors</span>
                  <span>100 contractors</span>
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guest/Delivery Codes (concurrent active): {guests}
                </label>
                <input type="range" min="0" max="300" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                <p className="text-xs text-gray-500 mt-1">Time-limited codes for visitors, deliveries, cleaners</p>
              </div>

              {/* Monthly Turnover */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Turnover Rate: {monthlyTurnover}%
                </label>
                <input type="range" min="0" max="30" value={monthlyTurnover} onChange={(e) => setMonthlyTurnover(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                <p className="text-xs text-gray-500 mt-1">Employee/contractor churn requiring credential changes</p>
              </div>

              {/* Lock Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lock Model/Tier</label>
                <select value={lockModel} onChange={(e) => setLockModel(e.target.value as keyof typeof LOCK_MODELS)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  {Object.entries(LOCK_MODELS).map(([key, data]) => (
                    <option key={key} value={key}>
                      {data.name} ({data.capacity} codes) - {data.examples}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Supported types:</strong> {model.credTypes.join(', ')} | <strong>PIN length:</strong> {model.pinLength}
                </p>
              </div>

              {/* New Professional Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avg. Doors per Person: {multiDoorAccess}</label>
                <input type="range" min="1" max="20" value={multiDoorAccess} onChange={(e) => setMultiDoorAccess(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: 'var(--color-border)' }} />
                <p className="text-xs text-gray-500 mt-1">Average number of doors each person needs access to</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Shifts</label>
                <select value={shiftCount} onChange={(e) => setShiftCount(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="1">Single Shift (standard hours)</option>
                  <option value="2">Two Shifts (×1.3 concurrent credentials)</option>
                  <option value="3">Three Shifts / 24-7 (×1.5 concurrent credentials)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credential Expiry Policy</label>
                <select value={credentialExpiry} onChange={(e) => setCredentialExpiry(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="none">No Auto-Expiry</option>
                  <option value="30-days">30-Day Rotation (high security)</option>
                  <option value="90-days">90-Day Rotation (standard)</option>
                  <option value="annual">Annual Renewal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Compliance Requirements</label>
                <select value={auditCompliance} onChange={(e) => setAuditCompliance(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="none">None</option>
                  <option value="sox">SOX (+10% buffer)</option>
                  <option value="hipaa">HIPAA (+15% buffer)</option>
                  <option value="pci">PCI-DSS (+25% buffer)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Compliance requires additional credential buffer for audit trails</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guest Schedule Type</label>
                <select value={guestScheduleType} onChange={(e) => setGuestScheduleType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="one-time">One-Time Codes (×1.2 churn)</option>
                  <option value="recurring">Recurring Visitors (lower churn)</option>
                  <option value="mixed">Mixed (standard)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-1">
          <div className={`result-panel ${result.statusClass}`}>
            <h2 className="text-xl font-bold mb-6">Capacity Analysis</h2>

            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-2">{result.utilization}%</div>
              <div className="text-lg opacity-90">Capacity Used</div>
              <div className="text-sm opacity-75 mt-2">{result.status} Status</div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-6 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white transition-all duration-500" style={{ width: `${Math.min(100, result.utilization)}%` }} />
              </div>
              <div className="flex justify-between text-xs opacity-75 mt-1">
                <span>0%</span>
                <span className="font-semibold">70%</span>
                <span className="font-semibold">85%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="space-y-3 text-sm bg-white/10 rounded-lg p-4 mb-6">
              <div className="flex justify-between">
                <span className="opacity-90">Lock Capacity:</span>
                <span className="font-semibold">{result.capacity}</span>
              </div>
              <div className="h-px bg-white/20"></div>
              <div className="flex justify-between">
                <span className="opacity-90">Employees:</span>
                <span className="font-semibold">{result.credentialBreakdown.employees}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Contractors:</span>
                <span className="font-semibold">{result.credentialBreakdown.contractors}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Guests:</span>
                <span className="font-semibold">{result.credentialBreakdown.guests}</span>
              </div>
              <div className="h-px bg-white/20"></div>
              <div className="flex justify-between font-bold text-base">
                <span>Total Needed:</span>
                <span>{result.totalCredentials}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>Available:</span>
                <span className={result.available < 20 ? 'text-yellow-200' : ''}>{result.available}</span>
              </div>
            </div>

            <div className="p-4 bg-white/10 rounded-lg text-xs mb-4">
              <p className="mb-2"><strong>Monthly Churn:</strong> {result.turnoverImpact} credentials/month</p>
              <p><strong>Management Overhead:</strong> {result.turnoverImpact * 12} annual changes</p>
            </div>

            <div className="pt-4 border-t-2 border-white/40">
              <p className="text-sm font-semibold">{result.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
