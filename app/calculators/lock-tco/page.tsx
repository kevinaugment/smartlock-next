'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DollarSign, Lightbulb, AlertTriangle } from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { ReportLeadCapture } from '@/components/seo/ReportLeadCapture'

interface TCOInputs {
  lockPrice: number
  doorCount: number
  protocol: 'wifi' | 'zigbee' | 'zwave' | 'thread' | 'ble' | 'nfc'
  years: number
  installType: 'diy' | 'pro'
  installCostPerDoor: number
  dailyUsage: number
  subscriptionPerDoorPerMonth: number
  batteryPricePerSet: number
  hubCostOverride: number | null
  region: 'us' | 'eu' | 'uk' | 'asia' | 'middle-east'
  scale: 'residential' | 'small-commercial' | 'enterprise'
  lockGrade: 'grade-3' | 'grade-2' | 'grade-1' | 'bhma-commercial'
  warrantyYears: number
  cloudPlatformFee: number
  maintenanceContract: 'none' | 'basic' | 'premium'
}

interface TCOResult {
  hardware: number
  batteries: number
  hub: number
  install: number
  subscriptions: number
  cloudPlatform: number
  maintenance: number
  warranty: number
  total: number
  annualCost: number
  perDoorCost: number
  perDoorPerDay: number
  hardwareShare: number
  batteriesShare: number
  subscriptionsShare: number
  cloudShare: number
  maintenanceShare: number
  mechanicalTotal: number
  deltaVsMechanical: number
}

function getDefaultHubCost(protocol: string): number {
  const costs: Record<string, number> = {
    wifi: 0, zigbee: 80, zwave: 120, thread: 150, ble: 0, nfc: 0
  }
  return costs[protocol] ?? 0
}

function getBatteryLifeMonths(protocol: string): number {
  const life: Record<string, number> = {
    wifi: 3, zigbee: 12, zwave: 12, thread: 10, ble: 14, nfc: 18
  }
  return life[protocol] ?? 12
}

function getRegionMultiplier(region: string): number {
  const multipliers: Record<string, number> = {
    us: 1.0, eu: 1.15, uk: 1.20, asia: 0.70, 'middle-east': 1.10
  }
  return multipliers[region] ?? 1.0
}

function getMaintenanceCost(contract: string, doorCount: number): number {
  if (contract === 'basic') return doorCount * 5 // $5/door/year
  if (contract === 'premium') return doorCount * 15 // $15/door/year
  return 0
}

function getWarrantyReplacementCost(warrantyYears: number, totalYears: number, lockPrice: number, doorCount: number): number {
  if (totalYears <= warrantyYears) return 0
  const yearsOutOfWarranty = totalYears - warrantyYears
  const failureRatePerYear = 0.03 // 3% annual failure rate
  return yearsOutOfWarranty * failureRatePerYear * lockPrice * doorCount
}

function adjustForUsage(dailyUsage: number): number {
  if (!dailyUsage || dailyUsage <= 0) return 1
  const factor = 20 / dailyUsage
  return Math.max(0.3, Math.min(2, factor))
}

export default function TCOCalculator() {
  const [inputs, setInputs] = useState<TCOInputs>({
    lockPrice: 200,
    doorCount: 3,
    protocol: 'zigbee',
    years: 5,
    installType: 'diy',
    installCostPerDoor: 100,
    dailyUsage: 10,
    subscriptionPerDoorPerMonth: 0,
    batteryPricePerSet: 8,
    hubCostOverride: null,
    region: 'us',
    scale: 'residential',
    lockGrade: 'grade-3',
    warrantyYears: 2,
    cloudPlatformFee: 0,
    maintenanceContract: 'none',
  })

  const calculateTCO = (): TCOResult => {
    const { lockPrice, doorCount, protocol, years, installType, installCostPerDoor, dailyUsage, subscriptionPerDoorPerMonth, batteryPricePerSet, hubCostOverride, region, warrantyYears, cloudPlatformFee, maintenanceContract } = inputs

    const regionMul = getRegionMultiplier(region)
    const hub = (hubCostOverride ?? getDefaultHubCost(protocol)) * regionMul
    const baseBatteryLifeMonths = getBatteryLifeMonths(protocol)
    const usageFactor = adjustForUsage(dailyUsage)
    const batteryLifeMonths = baseBatteryLifeMonths * usageFactor
    const monthsTotal = years * 12
    const replacementsPerLock = batteryLifeMonths > 0 ? monthsTotal / batteryLifeMonths : 0
    const batteries = replacementsPerLock * batteryPricePerSet * doorCount

    const hardware = lockPrice * doorCount * regionMul
    const install = installType === 'pro' ? installCostPerDoor * doorCount * regionMul : 0
    const subscriptions = subscriptionPerDoorPerMonth * 12 * years * doorCount
    const cloudPlatform = cloudPlatformFee * 12 * years
    const maintenance = getMaintenanceCost(maintenanceContract, doorCount) * years
    const warranty = getWarrantyReplacementCost(warrantyYears, years, lockPrice, doorCount)

    const total = hardware + hub + install + batteries + subscriptions + cloudPlatform + maintenance + warranty
    const hardwareShare = total > 0 ? (hardware / total) * 100 : 0
    const batteriesShare = total > 0 ? (batteries / total) * 100 : 0
    const subscriptionsShare = total > 0 ? (subscriptions / total) * 100 : 0
    const cloudShare = total > 0 ? (cloudPlatform / total) * 100 : 0
    const maintenanceShare = total > 0 ? ((maintenance + warranty) / total) * 100 : 0

    const annualCost = total / years
    const perDoorCost = total / doorCount
    const perDoorPerDay = total / (doorCount * years * 365)

    const mechanicalLockPrice = 50
    const mechanicalTotal = mechanicalLockPrice * doorCount
    const deltaVsMechanical = total - mechanicalTotal

    return { hardware, batteries, hub, install, subscriptions, cloudPlatform, maintenance, warranty, total, annualCost, perDoorCost, perDoorPerDay, hardwareShare, batteriesShare, subscriptionsShare, cloudShare, maintenanceShare, mechanicalTotal, deltaVsMechanical }
  }

  const result = calculateTCO()

  return (
    <div className="page-bg">
      <div className="container-main section">
        <div className="mb-8">
          <Link href="/calculators" style={{ color: "var(--color-accent)", fontSize: "0.875rem" }}>
            ← Back to Calculators
          </Link>
        </div>

        <div className="text-center mb-12">
          <div className="page-header__icon"><DollarSign className="w-14 h-14 mx-auto" /></div>
          <h1 className="page-header__title">
            Smart Lock TCO Calculator
          </h1>
          <p className="page-header__subtitle">
            Calculate total cost of ownership for your smart lock deployment over time
          </p>
        </div>

        <div className="calculator-shell">
          {/* Input Section */}
          <div className="calculator-inputs space-y-6">
            <div className="content-card">
              <h2 className="section-title">Project Parameters</h2>

              <div className="space-y-6">
                {/* Market Region */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Market Region
                  </label>
                  <select
                    value={inputs.region}
                    onChange={(e) => setInputs({ ...inputs, region: e.target.value as TCOInputs['region'] })}
                    className="form-input"
                  >
                    <option value="us">United States / Canada</option>
                    <option value="eu">European Union</option>
                    <option value="uk">United Kingdom</option>
                    <option value="asia">Asia Pacific</option>
                    <option value="middle-east">Middle East / Africa</option>
                  </select>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>Adjusts hardware and labor costs by regional pricing</p>
                </div>

                {/* Deployment Scale */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Deployment Scale
                  </label>
                  <select
                    value={inputs.scale}
                    onChange={(e) => {
                      const scale = e.target.value as TCOInputs['scale']
                      const maxDoors = scale === 'enterprise' ? 500 : scale === 'small-commercial' ? 100 : 20
                      setInputs({ ...inputs, scale, doorCount: Math.min(inputs.doorCount, maxDoors) })
                    }}
                    className="form-input"
                  >
                    <option value="residential">Residential (1–20 doors)</option>
                    <option value="small-commercial">Small Commercial (1–100 doors)</option>
                    <option value="enterprise">Enterprise (1–500 doors)</option>
                  </select>
                </div>

                {/* Lock Price */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Lock Price per Unit: ${inputs.lockPrice}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="800"
                    step="25"
                    value={inputs.lockPrice}
                    onChange={(e) => setInputs({ ...inputs, lockPrice: Number(e.target.value) })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: "var(--color-border)" }}
                  />
                  <div className="flex justify-between" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                    <span>$50</span>
                    <span>$800</span>
                  </div>
                </div>

                {/* Door Count */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Number of Doors: {inputs.doorCount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max={inputs.scale === 'enterprise' ? 500 : inputs.scale === 'small-commercial' ? 100 : 20}
                    value={inputs.doorCount}
                    onChange={(e) => setInputs({ ...inputs, doorCount: Number(e.target.value) })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: "var(--color-border)" }}
                  />
                  <div className="flex justify-between" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                    <span>1 door</span>
                    <span>{inputs.scale === 'enterprise' ? '500' : inputs.scale === 'small-commercial' ? '100' : '20'} doors</span>
                  </div>
                </div>

                {/* Protocol */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Communication Protocol
                  </label>
                  <select
                    value={inputs.protocol}
                    onChange={(e) => setInputs({ ...inputs, protocol: e.target.value as TCOInputs['protocol'] })}
                    className="form-input"
                  >
                    <option value="wifi">Wi-Fi (No hub, high battery cost)</option>
                    <option value="zigbee">Zigbee (Low cost hub, efficient)</option>
                    <option value="zwave">Z-Wave (Mid cost hub, efficient)</option>
                    <option value="thread">Thread / Matter (Border router, very efficient)</option>
                    <option value="ble">Bluetooth LE (No hub, best battery life)</option>
                    <option value="nfc">NFC (Card/phone tap, ultra-low power)</option>
                  </select>
                </div>

                {/* Lock Grade */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Lock Security Grade
                  </label>
                  <select
                    value={inputs.lockGrade}
                    onChange={(e) => setInputs({ ...inputs, lockGrade: e.target.value as TCOInputs['lockGrade'] })}
                    className="form-input"
                  >
                    <option value="grade-3">ANSI Grade 3 — Residential</option>
                    <option value="grade-2">ANSI Grade 2 — Light Commercial</option>
                    <option value="grade-1">ANSI Grade 1 — Heavy Commercial</option>
                    <option value="bhma-commercial">BHMA A156 — Premium Commercial</option>
                  </select>
                </div>

                {/* Timeframe */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Timeframe: {inputs.years} years
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={inputs.years}
                    onChange={(e) => setInputs({ ...inputs, years: Number(e.target.value) })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: "var(--color-border)" }}
                  />
                  <div className="flex justify-between" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                    <span>1 year</span>
                    <span>10 years</span>
                  </div>
                </div>

                {/* Warranty */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Warranty Coverage: {inputs.warrantyYears} years
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={inputs.warrantyYears}
                    onChange={(e) => setInputs({ ...inputs, warrantyYears: Number(e.target.value) })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: "var(--color-border)" }}
                  />
                  <div className="flex justify-between" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                    <span>1 year</span>
                    <span>5 years</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>Out-of-warranty replacement cost estimated at 3% failure rate/year</p>
                </div>

                {/* Installation */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Installation Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-md)", border: inputs.installType === 'diy' ? '2px solid var(--color-accent)' : '2px solid var(--color-border)', borderRadius: "var(--radius-md)", cursor: "pointer", background: inputs.installType === 'diy' ? 'var(--color-surface-alt)' : 'transparent' }}>
                      <input
                        type="radio"
                        value="diy"
                        checked={inputs.installType === 'diy'}
                        onChange={() => setInputs({ ...inputs, installType: 'diy' })}
                        className="sr-only"
                      />
                      <span className="font-medium">DIY ($0)</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-md)", border: inputs.installType === 'pro' ? '2px solid var(--color-accent)' : '2px solid var(--color-border)', borderRadius: "var(--radius-md)", cursor: "pointer", background: inputs.installType === 'pro' ? 'var(--color-surface-alt)' : 'transparent' }}>
                      <input
                        type="radio"
                        value="pro"
                        checked={inputs.installType === 'pro'}
                        onChange={() => setInputs({ ...inputs, installType: 'pro' })}
                        className="sr-only"
                      />
                      <span className="font-medium">Professional</span>
                    </label>
                  </div>
                </div>

                {inputs.installType === 'pro' && (
                  <div>
                    <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                      Installation Cost per Door: ${inputs.installCostPerDoor}
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="300"
                      step="10"
                      value={inputs.installCostPerDoor}
                      onChange={(e) => setInputs({ ...inputs, installCostPerDoor: Number(e.target.value) })}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: "var(--color-border)" }}
                    />
                    <div className="flex justify-between" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                      <span>$50</span>
                      <span>$300</span>
                    </div>
                  </div>
                )}

                {/* Daily Usage */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Daily Operations: {inputs.dailyUsage} times
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={inputs.dailyUsage}
                    onChange={(e) => setInputs({ ...inputs, dailyUsage: Number(e.target.value) })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: "var(--color-border)" }}
                  />
                  <div className="flex justify-between" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                    <span>1</span>
                    <span>100</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>Affects battery replacement frequency</p>
                </div>

                {/* Subscription */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Monthly Subscription per Door: ${inputs.subscriptionPerDoorPerMonth}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={inputs.subscriptionPerDoorPerMonth}
                    onChange={(e) => setInputs({ ...inputs, subscriptionPerDoorPerMonth: Number(e.target.value) })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: "var(--color-border)" }}
                  />
                  <div className="flex justify-between" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                    <span>$0</span>
                    <span>$50</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>Per-device cloud/app subscription (e.g., Yale Access, August Premium)</p>
                </div>

                {/* Cloud Platform Fee */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Cloud Platform Fee (monthly): ${inputs.cloudPlatformFee}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={inputs.cloudPlatformFee}
                    onChange={(e) => setInputs({ ...inputs, cloudPlatformFee: Number(e.target.value) })}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer" style={{ background: "var(--color-border)" }}
                  />
                  <div className="flex justify-between" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
                    <span>$0</span>
                    <span>$200</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>Platform-level fee (e.g., SALTO KS, Brivo, Kisi management platform)</p>
                </div>

                {/* Maintenance Contract */}
                <div>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}>
                    Maintenance Contract
                  </label>
                  <select
                    value={inputs.maintenanceContract}
                    onChange={(e) => setInputs({ ...inputs, maintenanceContract: e.target.value as TCOInputs['maintenanceContract'] })}
                    className="form-input"
                  >
                    <option value="none">None — Self-maintained</option>
                    <option value="basic">Basic — $5/door/year (annual inspection)</option>
                    <option value="premium">Premium — $15/door/year (quarterly + priority support)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section — Glassmorphism Dashboard */}
          <div className="calculator-results">
            <div className="result-panel-v2">
              <div className="result-panel-v2__header">
                <h2 style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: 'var(--space-md)' }}>
                  Total Cost of Ownership
                </h2>
                <div className="result-panel-v2__value">${result.total.toFixed(0)}</div>
                <div className="result-panel-v2__label">over {inputs.years} years · {inputs.doorCount} door{inputs.doorCount > 1 ? 's' : ''}</div>
              </div>

              <div className="result-panel-v2__body">
                {/* Cost Breakdown Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                  {[
                    { label: 'Hardware', value: result.hardware, pct: result.hardwareShare },
                    ...(result.hub > 0 ? [{ label: 'Hub/Gateway', value: result.hub, pct: result.total > 0 ? (result.hub / result.total) * 100 : 0 }] : []),
                    ...(result.install > 0 ? [{ label: 'Installation', value: result.install, pct: result.total > 0 ? (result.install / result.total) * 100 : 0 }] : []),
                    { label: 'Batteries', value: result.batteries, pct: result.batteriesShare },
                    ...(result.subscriptions > 0 ? [{ label: 'Subscriptions', value: result.subscriptions, pct: result.subscriptionsShare }] : []),
                    ...(result.cloudPlatform > 0 ? [{ label: 'Cloud Platform', value: result.cloudPlatform, pct: result.cloudShare }] : []),
                    ...(result.maintenance > 0 ? [{ label: 'Maintenance', value: result.maintenance, pct: result.maintenanceShare }] : []),
                    ...(result.warranty > 0 ? [{ label: 'Warranty Repairs', value: result.warranty, pct: result.total > 0 ? (result.warranty / result.total) * 100 : 0 }] : []),
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', fontSize: '0.8125rem' }}>
                      <span style={{ width: '6rem', color: 'var(--color-text-muted)', flexShrink: 0 }}>{item.label}</span>
                      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.max(item.pct, 1)}%`, height: '100%', background: 'var(--gradient-brand)', borderRadius: '99px', transition: 'width 0.3s ease' }} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-inverse)', fontWeight: 600, width: '4rem', textAlign: 'right' }}>${item.value.toFixed(0)}</span>
                    </div>
                  ))}
                </div>

                {/* Insight Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                  <div className="insight-card">
                    <div className="insight-card__value">${result.annualCost.toFixed(0)}</div>
                    <div className="insight-card__label">Per year</div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-card__value">${result.perDoorCost.toFixed(0)}</div>
                    <div className="insight-card__label">Per door</div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-card__value">${result.perDoorPerDay.toFixed(2)}</div>
                    <div className="insight-card__label">Per door/day</div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-card__value" style={{ color: result.deltaVsMechanical > 0 ? 'var(--color-warning)' : 'var(--color-accent)' }}>
                      {result.deltaVsMechanical > 0 ? '+' : ''}${result.deltaVsMechanical.toFixed(0)}
                    </div>
                    <div className="insight-card__label">vs. Mechanical</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-md)', opacity: 0.7, textAlign: 'center' }}>
                  Based on ANSI/BHMA industry standards
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown Chart */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="content-card">
            <h2 className="section-title">Cost Breakdown</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>Hardware</span>
                  <span className="link-card__desc">{result.hardwareShare.toFixed(1)}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
                  <div className="h-full bg-blue-600" style={{ width: `${result.hardwareShare}%` }} />
                </div>
              </div>
              {result.batteriesShare > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>Batteries</span>
                    <span className="link-card__desc">{result.batteriesShare.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
                    <div className="h-full bg-yellow-600" style={{ width: `${result.batteriesShare}%` }} />
                  </div>
                </div>
              )}
              {result.subscriptionsShare > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>Subscriptions</span>
                    <span className="link-card__desc">{result.subscriptionsShare.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
                    <div className="h-full bg-red-600" style={{ width: `${result.subscriptionsShare}%` }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Brand - Be-Tech */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="content-card">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className="card" style={{ width: "5rem", height: "5rem", padding: "var(--space-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Image
                    src="/images/brands/be-tech-logo.png"
                    alt="Be-Tech Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)" }}>Recommended: Be-Tech</h3>
                  <span className="badge badge-accent">
                    Multi-Protocol
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}>
                  Professional smart lock manufacturer supporting Wi-Fi, Zigbee, Z-Wave, and Thread protocols. Competitive TCO with excellent battery life.
                </p>
                <a
                  href="https://www.betechlock.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.875rem", color: "var(--color-accent)", fontWeight: 500 }}
                >
                  Visit Official Website →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="content-card">
            <h2 className="section-title">Calculation Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>Hub/Gateway Costs</h3>
                <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  <li><strong>Wi-Fi:</strong> $0 (uses existing router)</li>
                  <li><strong>Zigbee:</strong> $80 (SmartThings, Aqara Hub)</li>
                  <li><strong>Z-Wave:</strong> $120 (Z-Wave controller)</li>
                  <li><strong>Thread:</strong> $150 (Border Router / HomePod mini)</li>
                  <li><strong>BLE:</strong> $0 (phone-to-lock direct)</li>
                  <li><strong>NFC:</strong> $0 (card/phone tap)</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)" }}>Battery Life Assumptions</h3>
                <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  <li><strong>Wi-Fi:</strong> 3 months (always-on radio)</li>
                  <li><strong>Zigbee:</strong> 12 months (low-power mesh)</li>
                  <li><strong>Z-Wave:</strong> 12 months (low-power mesh)</li>
                  <li><strong>Thread:</strong> 10 months (low-power IP)</li>
                  <li><strong>BLE:</strong> 14 months (low-energy advertising)</li>
                  <li><strong>NFC:</strong> 18 months (passive wake-on-tap)</li>
                </ul>
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "var(--space-xs)" }}>Based on average 10 operations/day</p>
              </div>
            </div>
          </div>
        </div>

        <ToolRating toolSlug="lock-tco" />

        <div className="max-w-7xl mx-auto">
          <ReportLeadCapture
            reportType="smart-lock-tco-report"
            title="Smart Lock TCO Report PDF"
            description="Download a shareable ownership-cost summary with deployment scale, protocol assumptions, battery burden, and subscription exposure."
            sourcePath="/calculators/lock-tco"
            context={{
              calculator: 'lock-tco',
              focus: 'multi-year ownership cost',
              scale: inputs.scale,
              protocol: inputs.protocol,
              years: inputs.years,
            }}
            bullets={[
              'Summarizes the cost drivers that matter after sticker price.',
              'Useful for internal approval, installer discussions, or multi-door budgeting.',
              'Includes protocol and deployment context so the PDF is not a generic export.',
            ]}
          />
        </div>

        {/* Hidden Costs Warning */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-warning)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><AlertTriangle className="w-5 h-5" style={{ color: "var(--color-warning)" }} /> Hidden Costs Not Included</h3>
            <ul className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-warning)" }}>
              <li>• <strong>Door modifications</strong> ($20-100 if backset/thickness incompatible)</li>
              <li>• <strong>Mesh repeaters</strong> ($15-30 each if Zigbee/Z-Wave needs range extension)</li>
              <li>• <strong>Lock replacement</strong> (mechanical wear typically 7-10 years)</li>
            </ul>
          </div>
        </div>


        <RelatedResources calculatorSlug="lock-tco-calculator" />

        {/* Related Resources */}
        <div className="max-w-7xl mx-auto mt-8">
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-md)" }}>Related Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/articles/protocols" className="link-card">
              <h4 className="link-card__title">Protocol Comparison</h4>
              <p className="link-card__desc">Compare all protocols</p>
            </Link>
            <Link href="/calculators/battery-life" className="link-card">
              <h4 className="link-card__title">Battery Life Calculator</h4>
              <p className="link-card__desc">Detailed battery analysis</p>
            </Link>
            <Link href="/calculators" className="link-card">
              <h4 className="link-card__title">All Calculators</h4>
              <p className="link-card__desc">More planning tools</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
