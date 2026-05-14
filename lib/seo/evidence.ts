export type EvidenceSourceType = 'datasheet-derived' | 'vendor-stated' | 'standards-based' | 'market-benchmark' | 'field-observed'

export interface EvidenceSourceNote {
  type: EvidenceSourceType
  label: string
  note: string
}

export interface CalculatorEvidenceProfile {
  slug: string
  title: string
  lastVerified: string
  modelLimit: string
  reviewCadence: string
  sourceNotes: EvidenceSourceNote[]
}

export const calculatorEvidenceLastVerified = '2026-05-13'
export const calculatorEvidenceReviewCadence = 'Review calculator source assumptions at least twice per year and whenever source standards, vendor specifications, or market benchmark data materially changes.'

export const priorityEvidenceCalculatorSlugs = [
  'battery-life',
  'signal-strength',
  'installation-cost',
  'lock-tco',
  'compatibility',
  'protocol-wizard',
] as const

export type PriorityEvidenceCalculatorSlug = (typeof priorityEvidenceCalculatorSlugs)[number]

export const calculatorEvidenceProfiles: Record<PriorityEvidenceCalculatorSlug, CalculatorEvidenceProfile> = {
  'battery-life': {
    slug: 'battery-life',
    title: 'Battery model evidence',
    lastVerified: calculatorEvidenceLastVerified,
    modelLimit: 'Battery estimates are planning ranges, not vendor warranties. Results above 24 months are capped as best-case because self-discharge, firmware polling, motor strain, and low-voltage cutoff dominate long estimates.',
    reviewCadence: 'Review protocol assumptions twice per year and after major Matter, Thread, Wi-Fi, Zigbee, Z-Wave, or battery chemistry updates.',
    sourceNotes: [
      { type: 'datasheet-derived', label: 'Battery capacity', note: 'AA, CR123A, lithium, and rechargeable pack capacity assumptions are based on common manufacturer technical datasheet ranges.' },
      { type: 'datasheet-derived', label: 'Radio power', note: 'Protocol draw uses chipset-class power behavior rather than a single lock vendor claim.' },
      { type: 'field-observed', label: 'Door and weather losses', note: 'Temperature, outdoor exposure, signal retries, and deadbolt drag are modeled as practical derating factors.' },
    ],
  },
  'signal-strength': {
    slug: 'signal-strength',
    title: 'RF model evidence',
    lastVerified: calculatorEvidenceLastVerified,
    modelLimit: 'Signal estimates assume simplified indoor propagation. Metal doors, foil insulation, mirrors, appliances, people, and hub antenna placement can shift real RSSI by more than 10 dB.',
    reviewCadence: 'Review material attenuation and receiver sensitivity assumptions twice per year or when radio modules and protocol specs change.',
    sourceNotes: [
      { type: 'standards-based', label: 'Path loss', note: 'Free-space path loss and indoor attenuation are used to approximate RSSI and link margin.' },
      { type: 'datasheet-derived', label: 'Receiver sensitivity', note: 'Protocol receiver thresholds are based on radio chipset and module-class specifications.' },
      { type: 'field-observed', label: 'Deployment margin', note: 'The 10 dB margin recommendation accounts for moving doors, interference, furniture, and occupancy changes.' },
    ],
  },
  'installation-cost': {
    slug: 'installation-cost',
    title: 'Installation cost evidence',
    lastVerified: calculatorEvidenceLastVerified,
    modelLimit: 'Cost estimates are pre-quote planning ranges. Local licensing, travel minimums, fire-rated doors, glass, metal drilling, wiring, and after-hours work can move actual quotes outside the model.',
    reviewCadence: 'Review labor and hardware benchmarks annually and when major installer wage or retail price shifts appear in source data.',
    sourceNotes: [
      { type: 'market-benchmark', label: 'Labor rates', note: 'Locksmith, handyman, and electrician assumptions are benchmarked from published U.S. service-market ranges.' },
      { type: 'market-benchmark', label: 'Hardware pricing', note: 'Hardware assumptions reflect common retail smart lock price bands rather than promotional sale prices.' },
      { type: 'standards-based', label: 'Door prep', note: 'Modification risk is tied to bore, backset, strike, wiring, and fire-door constraints.' },
    ],
  },
  'lock-tco': {
    slug: 'lock-tco',
    title: 'TCO model evidence',
    lastVerified: calculatorEvidenceLastVerified,
    modelLimit: 'TCO output is a scenario model. It does not include every tax, financing, insurance, downtime, labor-union, or procurement rule that may apply to commercial deployments.',
    reviewCadence: 'Review protocol battery-life defaults, hub costs, subscription ranges, and failure-rate assumptions twice per year.',
    sourceNotes: [
      { type: 'market-benchmark', label: 'Ownership costs', note: 'Hardware, subscription, hub, battery, and maintenance categories are separated so users can replace defaults with quote data.' },
      { type: 'field-observed', label: 'Lifecycle risk', note: 'Warranty and replacement assumptions model planning risk rather than predicting one specific model failure rate.' },
      { type: 'datasheet-derived', label: 'Protocol battery defaults', note: 'Protocol runtime defaults align with the battery-life model used elsewhere on SLockHub.' },
    ],
  },
  compatibility: {
    slug: 'compatibility',
    title: 'Door-fit evidence',
    lastVerified: calculatorEvidenceLastVerified,
    modelLimit: 'Compatibility scoring cannot replace the product installation manual. Mortise, narrow-stile, multi-point, glass, fire-rated, and custom doors require model-specific confirmation.',
    reviewCadence: 'Review dimensional assumptions annually and when ANSI/BHMA standards or major manufacturer installation manuals change.',
    sourceNotes: [
      { type: 'standards-based', label: 'Door prep', note: 'Thickness, backset, bore, and latch-bore assumptions follow common ANSI/BHMA bored lock dimensions.' },
      { type: 'vendor-stated', label: 'Manufacturer manuals', note: 'Fit guidance references recurring requirements from major residential and commercial smart lock manuals.' },
      { type: 'field-observed', label: 'Install risk', note: 'Material, fire rating, glass, and strike alignment are treated as risk factors because they often trigger labor or code review.' },
    ],
  },
  'protocol-wizard': {
    slug: 'protocol-wizard',
    title: 'Protocol decision evidence',
    lastVerified: calculatorEvidenceLastVerified,
    modelLimit: 'Protocol recommendations are planning guidance, not product guarantees. Final reliability still depends on the exact lock model, hub firmware, building materials, radio congestion, local internet, and ecosystem feature support.',
    reviewCadence: 'Review protocol decision weights twice per year and whenever Matter, Thread, Z-Wave, Zigbee, Bluetooth, Wi-Fi, or major hub ecosystems change lock support.',
    sourceNotes: [
      { type: 'standards-based', label: 'Protocol behavior', note: 'Protocol tradeoffs are mapped from public radio standards and smart-home interoperability specifications.' },
      { type: 'datasheet-derived', label: 'Battery and range inputs', note: 'Battery and range weights reuse the same chipset-class assumptions used by SLockHub battery and signal calculators.' },
      { type: 'field-observed', label: 'Deployment friction', note: 'Hub, scale, local-control, and ecosystem weights reflect practical install risk across homes, rentals, and commercial doors.' },
    ],
  },
}
