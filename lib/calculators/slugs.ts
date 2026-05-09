export const calculatorRouteSlugs = [
  'access-capacity',
  'battery-life',
  'ble-range',
  'compatibility',
  'credential-planner',
  'cyber-risk',
  'door-fit',
  'emergency-backup',
  'energy-cost',
  'fire-compliance',
  'fleet-planner',
  'guest-code',
  'hotel-roi',
  'installation-cost',
  'installation-time',
  'lock-compare',
  'lock-tco',
  'mesh-planner',
  'network-bandwidth',
  'noise-level',
  'offline-resilience',
  'pin-strength',
  'poe-power',
  'privacy-compliance',
  'protocol-wizard',
  'retrofit-advisor',
  'rf-coverage',
  'security-compliance',
  'signal-strength',
  'str-roi',
  'subscription-compare',
  'warranty-lifecycle',
] as const

export type CalculatorRouteSlug = (typeof calculatorRouteSlugs)[number]

export const calculatorTitles: Record<CalculatorRouteSlug, string> = {
  'access-capacity': 'Access Capacity Calculator',
  'battery-life': 'Battery Life Calculator',
  'ble-range': 'BLE Range Calculator',
  compatibility: 'Compatibility Checker',
  'credential-planner': 'Credential Planner',
  'cyber-risk': 'Cyber Risk Calculator',
  'door-fit': 'Door Fit Checker',
  'emergency-backup': 'Emergency Backup Planner',
  'energy-cost': 'Energy Cost Calculator',
  'fire-compliance': 'Fire Code Compliance Checker',
  'fleet-planner': 'Fleet Planner',
  'guest-code': 'Guest Code Planner',
  'hotel-roi': 'Hotel ROI Calculator',
  'installation-cost': 'Installation Cost Calculator',
  'installation-time': 'Installation Time Estimator',
  'lock-compare': 'Lock Comparison Tool',
  'lock-tco': 'TCO Calculator',
  'mesh-planner': 'Mesh Network Planner',
  'network-bandwidth': 'Network Bandwidth Calculator',
  'noise-level': 'Noise Level Calculator',
  'offline-resilience': 'Offline Resilience Planner',
  'pin-strength': 'PIN Strength Analyzer',
  'poe-power': 'PoE Power Budget Calculator',
  'privacy-compliance': 'Privacy Compliance Checker',
  'protocol-wizard': 'Protocol Selection Wizard',
  'retrofit-advisor': 'Retrofit Advisor',
  'rf-coverage': 'RF Coverage Planner',
  'security-compliance': 'Security Compliance Checker',
  'signal-strength': 'Signal Strength Calculator',
  'str-roi': 'STR ROI Calculator',
  'subscription-compare': 'Subscription Comparison',
  'warranty-lifecycle': 'Warranty Lifecycle Planner',
}

export const calculatorDataSlugByRoute: Partial<Record<CalculatorRouteSlug, string>> = {
  'battery-life': 'battery-life-comparison',
  compatibility: 'door-lock-compatibility-checker',
  'credential-planner': 'credential-capacity-planner',
  'emergency-backup': 'emergency-backup-evaluator',
  'energy-cost': 'power-consumption-estimator',
  'fleet-planner': 'multi-property-fleet-planner',
  'installation-cost': 'installation-cost-estimator',
  'installation-time': 'installation-time-estimator',
  'lock-tco': 'lock-tco-calculator',
  'mesh-planner': 'mesh-node-planner',
  'offline-resilience': 'offline-resilience-scorecard',
  'protocol-wizard': 'protocol-selection-wizard',
  'rf-coverage': 'rf-coverage-estimator',
  'security-compliance': 'security-audit-scorecard',
  'signal-strength': 'signal-strength-analyzer',
  'str-roi': 'short-term-rental-roi-calculator',
  'subscription-compare': 'subscription-vs-purchase-calculator',
}

const legacyRouteSlugMap: Record<string, CalculatorRouteSlug> = {
  'anomaly-detector': 'cyber-risk',
  'api-compatibility-checker': 'compatibility',
  'battery-life-comparison': 'battery-life',
  'bia-calculator': 'lock-tco',
  'cyber-risk-scorecard': 'cyber-risk',
  'credential-capacity-planner': 'credential-planner',
  'data-retention-calculator': 'security-compliance',
  'diagnostic-tool': 'compatibility',
  'door-lock-compatibility-checker': 'compatibility',
  'door-measurement-fit-checker': 'door-fit',
  'emergency-backup-evaluator': 'emergency-backup',
  'energy-cost-calculator': 'energy-cost',
  'error-code-lookup': 'compatibility',
  'failover-tester': 'offline-resilience',
  'hotel-hospitality-roi-calculator': 'hotel-roi',
  'installation-cost-estimator': 'installation-cost',
  'installation-time-estimator': 'installation-time',
  'integration-roi-calculator': 'hotel-roi',
  'lock-tco-calculator': 'lock-tco',
  'log-analyzer': 'security-compliance',
  'mesh-node-planner': 'mesh-planner',
  'multi-property-fleet-planner': 'fleet-planner',
  'noise-level-estimator': 'noise-level',
  'offline-resilience-scorecard': 'offline-resilience',
  'pin-security-strength-checker': 'pin-strength',
  'power-consumption-estimator': 'energy-cost',
  'privacy-data-compliance-evaluator': 'privacy-compliance',
  'privacy-impact-assessment': 'privacy-compliance',
  'protocol-selection-wizard': 'protocol-wizard',
  'rental-roi-calculator': 'str-roi',
  'retrofit-vs-replace-advisor': 'retrofit-advisor',
  'rf-coverage-estimator': 'rf-coverage',
  'rto-rpo-planner': 'emergency-backup',
  'security-audit-scorecard': 'security-compliance',
  'short-term-rental-roi-calculator': 'str-roi',
  'signal-strength-analyzer': 'signal-strength',
  'subscription-vs-purchase-calculator': 'subscription-compare',
  'turnover-time-estimator': 'installation-time',
}

const calculatorRouteSlugSet = new Set<string>(calculatorRouteSlugs)

export function resolveCalculatorRouteSlug(slug: string): CalculatorRouteSlug | null {
  if (calculatorRouteSlugSet.has(slug)) return slug as CalculatorRouteSlug
  return legacyRouteSlugMap[slug] ?? null
}

export function resolveCalculatorDataSlug(slug: string): string | null {
  const routeSlug = resolveCalculatorRouteSlug(slug)
  if (!routeSlug) return null
  return calculatorDataSlugByRoute[routeSlug] ?? null
}

export function getCalculatorTitle(slug: string): string {
  const routeSlug = resolveCalculatorRouteSlug(slug)
  return routeSlug ? calculatorTitles[routeSlug] : slug
}
