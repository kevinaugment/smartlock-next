import Link from 'next/link'
import type { Metadata } from 'next'
import {
  DollarSign, Battery, Signal, DoorOpen, Wand2, Home,
  Link as LinkIcon, Radio, Building2, Key, Clock, Scale,
  AlertTriangle, Zap, ClipboardList, Wrench, Calculator,
  Users, ShieldCheck, GitCompare, Timer, Wifi, Flame, KeyRound, Bluetooth,
  Lock, Volume2, Shield, ShieldAlert, Ruler
} from 'lucide-react'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Smart Lock Calculators - SLockHub.com',
  description: 'Interactive smart lock calculators for TCO, battery life, signal strength, installation cost, and more.',
  alternates: { canonical: '/calculators' },
}

const calculators: { name: string; slug: string; icon: ReactNode; description: string; features: string[]; complexity: string }[] = [
  {
    name: 'TCO Calculator',
    slug: 'lock-tco',
    icon: <DollarSign className="w-8 h-8" />,
    description: 'Calculate total cost of ownership for smart lock deployments. Compare protocols, battery costs, and hub investments over time',
    features: ['Multi-year TCO analysis', 'Protocol comparison', 'Battery cost projection', 'ROI calculation'],
    complexity: 'Simple',
  },
  {
    name: 'Battery Life Calculator',
    slug: 'battery-life',
    icon: <Battery className="w-8 h-8" />,
    description: 'Estimate how long your smart lock batteries will last based on usage patterns and features',
    features: ['Usage frequency analysis', 'Battery type comparison', 'Feature impact calculation', 'Optimization tips'],
    complexity: 'Simple',
  },
  {
    name: 'Signal Strength Analyzer',
    slug: 'signal-strength',
    icon: <Signal className="w-8 h-8" />,
    description: 'Analyze and optimize your smart lock\'s wireless signal strength for reliable operation',
    features: ['Signal quality assessment', 'Distance calculation', 'Interference detection', 'Improvement suggestions'],
    complexity: 'Moderate',
  },
  {
    name: 'Installation Cost Estimator',
    slug: 'installation-cost',
    icon: <DollarSign className="w-8 h-8" />,
    description: 'Calculate the total cost of your smart lock installation including hardware and labor',
    features: ['Hardware cost breakdown', 'Labor estimation', 'Additional materials', 'Total project cost'],
    complexity: 'Simple',
  },
  {
    name: 'Door Compatibility Checker',
    slug: 'compatibility',
    icon: <DoorOpen className="w-8 h-8" />,
    description: 'Check if your door is compatible with different smart lock models',
    features: ['Door measurements', 'Material compatibility', 'Lock type matching', 'Installation difficulty'],
    complexity: 'Moderate',
  },
  {
    name: 'Protocol Selection Wizard',
    slug: 'protocol-wizard',
    icon: <Wand2 className="w-8 h-8" />,
    description: 'Get personalized protocol recommendations based on your specific requirements and priorities',
    features: ['Smart recommendation engine', 'Multi-factor scoring', 'Pros/cons analysis', 'Ecosystem matching'],
    complexity: 'Moderate',
  },
  {
    name: 'STR ROI Calculator',
    slug: 'str-roi',
    icon: <Home className="w-8 h-8" />,
    description: 'Calculate ROI and payback time for smart locks in short-term rental properties',
    features: ['Labor time savings', 'Lockout cost reduction', 'Lost key savings', 'Payback analysis'],
    complexity: 'Simple',
  },
  {
    name: 'Mesh Node Planner',
    slug: 'mesh-planner',
    icon: <LinkIcon className="w-8 h-8" />,
    description: 'Estimate required mesh repeaters for your deployment by floor and area',
    features: ['Node count calculation', 'Coverage analysis', 'Cost estimation', 'Placement guidelines'],
    complexity: 'Simple',
  },
  {
    name: 'RF Coverage Estimator',
    slug: 'rf-coverage',
    icon: <Radio className="w-8 h-8" />,
    description: 'Plan mesh network topology and calculate signal coverage for your building',
    features: ['Coverage area calculation', 'Hub requirement', 'Signal quality analysis', 'Placement recommendations'],
    complexity: 'Moderate',
  },
  {
    name: 'Multi-Property Fleet Planner',
    slug: 'fleet-planner',
    icon: <Building2 className="w-8 h-8" />,
    description: 'Analyze protocol fragmentation and plan unified fleet across properties',
    features: ['Fragmentation scoring', 'Unification cost analysis', 'Maintenance savings', 'Payback calculation'],
    complexity: 'Moderate',
  },
  {
    name: 'Credential Capacity Planner',
    slug: 'credential-planner',
    icon: <Key className="w-8 h-8" />,
    description: 'Check if your locks can handle all employee, contractor, and guest credentials',
    features: ['Capacity utilization', 'User type breakdown', 'Overflow detection', 'Upgrade recommendations'],
    complexity: 'Simple',
  },
  {
    name: 'Installation Time Estimator',
    slug: 'installation-time',
    icon: <Clock className="w-8 h-8" />,
    description: 'Estimate technician hours, crew-days, and total labor cost for installation projects',
    features: ['Time per door calculation', 'Labor cost estimation', 'Crew planning', 'Project timeline'],
    complexity: 'Simple',
  },
  {
    name: 'Subscription vs Purchase',
    slug: 'subscription-compare',
    icon: <Scale className="w-8 h-8" />,
    description: 'Compare long-term costs of cloud subscription versus local system purchase',
    features: ['Multi-year cost analysis', 'Break-even calculation', 'Pros/cons comparison', 'TCO projection'],
    complexity: 'Simple',
  },
  {
    name: 'Offline Resilience Scorecard',
    slug: 'offline-resilience',
    icon: <Battery className="w-8 h-8" />,
    description: 'Score how well your locks work during internet and power outages',
    features: ['Resilience scoring', 'Weakness identification', 'Backup system evaluation', 'Improvement recommendations'],
    complexity: 'Moderate',
  },
  {
    name: 'Emergency Backup Evaluator',
    slug: 'emergency-backup',
    icon: <AlertTriangle className="w-8 h-8" />,
    description: 'Evaluate your emergency unlock backup plan robustness',
    features: ['Backup method assessment', 'Risk analysis', 'Security evaluation', 'Emergency scenario planning'],
    complexity: 'Simple',
  },
  {
    name: 'Access Control Capacity',
    slug: 'access-capacity',
    icon: <Users className="w-8 h-8" />,
    description: 'Verify your locks can handle all users, credentials, and permission groups at scale',
    features: ['User capacity analysis', 'Credential storage check', 'Platform comparison', 'Upgrade recommendations'],
    complexity: 'Moderate',
  },
  {
    name: 'Security Compliance Checker',
    slug: 'security-compliance',
    icon: <ShieldCheck className="w-8 h-8" />,
    description: 'Evaluate ANSI/BHMA, UL 437, and EN 12209 standard compliance for your installation',
    features: ['Grade assessment', 'Mandatory feature check', 'Compliance gaps', 'Standards reference'],
    complexity: 'Moderate',
  },
  {
    name: 'Smart Lock Comparison',
    slug: 'lock-compare',
    icon: <GitCompare className="w-8 h-8" />,
    description: 'Side-by-side comparison of 2-4 smart lock models across specs, features, and price',
    features: ['Multi-model compare', 'Feature matrix', 'Protocol analysis', 'Best value highlight'],
    complexity: 'Simple',
  },
  {
    name: 'Warranty & Lifecycle',
    slug: 'warranty-lifecycle',
    icon: <Timer className="w-8 h-8" />,
    description: 'Predict product lifespan, warranty coverage gaps, and long-term replacement costs',
    features: ['Lifespan prediction', 'Failure rate analysis', 'Replacement cost', 'Brand comparison'],
    complexity: 'Moderate',
  },
  {
    name: 'Network Bandwidth',
    slug: 'network-bandwidth',
    icon: <Wifi className="w-8 h-8" />,
    description: 'Estimate bandwidth requirements for cloud-connected smart lock deployments',
    features: ['Protocol bandwidth', 'Feature impact', 'Monthly data usage', 'Internet plan sizing'],
    complexity: 'Moderate',
  },
  {
    name: 'PoE Power Budget',
    slug: 'poe-power',
    icon: <Zap className="w-8 h-8" />,
    description: 'Plan Power over Ethernet budgets for hardwired commercial smart lock installations',
    features: ['Per-port power check', 'Switch budget analysis', 'Cable loss calculation', 'Expansion capacity'],
    complexity: 'Moderate',
  },
  {
    name: 'Fire Code Compliance',
    slug: 'fire-compliance',
    icon: <Flame className="w-8 h-8" />,
    description: 'Verify IBC, NFPA, and ADA fire safety compliance for smart lock installations',
    features: ['Code violation check', 'ADA compliance', 'Egress verification', 'FACP integration'],
    complexity: 'Moderate',
  },
  {
    name: 'Guest Code Planner',
    slug: 'guest-code',
    icon: <KeyRound className="w-8 h-8" />,
    description: 'Plan guest code capacity, rotation schedules, and collision risk for smart locks',
    features: ['Code capacity check', 'Collision probability', 'Rotation planning', 'Brand limits'],
    complexity: 'Simple',
  },
  {
    name: 'BLE Range Calculator',
    slug: 'ble-range',
    icon: <Bluetooth className="w-8 h-8" />,
    description: 'Estimate Bluetooth signal coverage for proximity-based smart lock unlocking',
    features: ['RSSI estimation', 'Path loss calculation', 'Obstacle attenuation', 'Reliability score'],
    complexity: 'Moderate',
  },
  {
    name: 'PIN Security Strength Checker',
    slug: 'pin-strength',
    icon: <Lock className="w-8 h-8" />,
    description: 'Evaluate PIN entropy, detect weak patterns, and calculate brute-force resistance',
    features: ['Pattern detection', 'Entropy calculation', 'Brute-force time', 'Security grading'],
    complexity: 'Simple',
  },
  {
    name: 'Door Measurement Fit Checker',
    slug: 'door-fit',
    icon: <Ruler className="w-8 h-8" />,
    description: 'Enter your door measurements to find compatible smart lock models instantly',
    features: ['Thickness matching', 'Backset verification', 'Bore diameter check', 'Material compatibility'],
    complexity: 'Simple',
  },
  {
    name: 'Retrofit vs Replace Advisor',
    slug: 'retrofit-advisor',
    icon: <GitCompare className="w-8 h-8" />,
    description: 'Should you retrofit your existing lock or buy a full smart lock replacement?',
    features: ['Cost comparison', 'Feature analysis', 'Time estimation', 'Renter-friendly options'],
    complexity: 'Simple',
  },
  {
    name: 'Hotel & Hospitality ROI',
    slug: 'hotel-roi',
    icon: <Building2 className="w-8 h-8" />,
    description: 'Calculate ROI for smart lock deployment in hotels — keycard elimination, labor savings, and more',
    features: ['Keycard savings', 'Front desk labor', 'Lockout reduction', '5-year ROI'],
    complexity: 'Moderate',
  },
  {
    name: 'Energy Cost Calculator',
    slug: 'energy-cost',
    icon: <Zap className="w-8 h-8" />,
    description: 'Calculate the ongoing electricity and battery costs of your smart lock fleet',
    features: ['Protocol comparison', 'Battery vs PoE', 'CO₂ estimation', 'Solar panel sizing'],
    complexity: 'Simple',
  },
  {
    name: 'Noise Level Estimator',
    slug: 'noise-level',
    icon: <Volume2 className="w-8 h-8" />,
    description: 'Estimate smart lock operating noise and check environment suitability',
    features: ['Motor type analysis', 'dB estimation', 'Environment rating', 'Noise comparison scale'],
    complexity: 'Simple',
  },
  {
    name: 'Privacy & Data Compliance',
    slug: 'privacy-compliance',
    icon: <Shield className="w-8 h-8" />,
    description: 'Assess GDPR, CCPA, and biometric privacy compliance for smart lock data practices',
    features: ['GDPR/CCPA scoring', 'Biometric law check', 'DPIA assessment', 'Risk identification'],
    complexity: 'Moderate',
  },
  {
    name: 'Cyber Risk Scorecard',
    slug: 'cyber-risk',
    icon: <ShieldAlert className="w-8 h-8" />,
    description: 'Evaluate the digital attack surface of your smart lock deployment across 5 categories',
    features: ['Authentication audit', 'Encryption check', 'Firmware analysis', 'Vulnerability report'],
    complexity: 'Moderate',
  },
]

const categories: { name: string; icon: ReactNode; calculators: string[] }[] = [
  { name: 'Power & Energy', icon: <Zap className="w-7 h-7" />, calculators: ['battery-life', 'poe-power', 'energy-cost'] },
  { name: 'Connectivity', icon: <Radio className="w-7 h-7" />, calculators: ['signal-strength', 'ble-range', 'rf-coverage', 'mesh-planner', 'network-bandwidth'] },
  { name: 'Planning & Budget', icon: <ClipboardList className="w-7 h-7" />, calculators: ['lock-tco', 'installation-cost', 'installation-time', 'subscription-compare', 'str-roi', 'fleet-planner', 'warranty-lifecycle', 'hotel-roi', 'retrofit-advisor'] },
  { name: 'Hardware', icon: <Wrench className="w-7 h-7" />, calculators: ['compatibility', 'lock-compare', 'fire-compliance', 'door-fit', 'noise-level'] },
  { name: 'Security & Compliance', icon: <ShieldCheck className="w-7 h-7" />, calculators: ['security-compliance', 'offline-resilience', 'emergency-backup', 'credential-planner', 'access-capacity', 'guest-code', 'pin-strength', 'privacy-compliance', 'cyber-risk'] },
  { name: 'Comparison & Selection', icon: <Wand2 className="w-7 h-7" />, calculators: ['protocol-wizard', 'lock-compare'] },
]

export default function CalculatorsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Smart Lock Calculators',
    description: 'Interactive smart lock calculators for TCO, battery life, signal strength, installation cost, and more.',
    url: 'https://www.slockhub.com/calculators',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: calculators.length,
      itemListElement: calculators.map((calc, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: calc.name,
        url: `https://www.slockhub.com/calculators/${calc.slug}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="page-wrapper-alt">
        <div className="container-main section">
          {/* Header */}
          <div className="page-header">
            <div className="page-header__icon">
              <Calculator className="w-10 h-10" />
            </div>
            <h1 className="page-header__title">Smart Lock Calculators</h1>
            <p className="page-header__subtitle">
              Interactive tools to help you make informed decisions about smart lock systems.
              Get instant calculations and expert recommendations.
            </p>
          </div>

          {/* Categories */}
          <div className="mb-16">
            <h2 className="section-title">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.name} className="card card-hover">
                  <div className="mb-2 text-color-accent">{category.icon}</div>
                  <h3 className="font-semibold mb-1 text-color-primary">{category.name}</h3>
                  <p className="text-sm text-color-secondary">
                    {category.calculators.length} tool{category.calculators.length > 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Calculators Grid */}
          <div className="mb-16">
            <h2 className="section-title">All Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {calculators.map((calculator) => (
                <Link
                  key={calculator.slug}
                  href={`/calculators/${calculator.slug}`}
                  className="group block card card-hover overflow-hidden p-0"
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-color-accent">{calculator.icon}</div>
                      <div className="flex-1">
                        <h3
                          className="text-lg font-bold mb-2 text-color-primary group-hover:text-cyan-600 transition-colors"
                        >
                          {calculator.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`badge ${calculator.complexity === 'Simple' ? 'badge-success' : 'badge-warning'}`}>
                            {calculator.complexity}
                          </span>
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0 text-color-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-color-secondary">
                      {calculator.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {calculator.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <svg className="feature-item__icon feature-item__icon--success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-color-secondary">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="group-hover:bg-cyan-50 transition-colors p-4 px-8 bg-slate-50"
                  >
                    <span className="font-semibold text-sm text-color-accent">
                      Try Calculator →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="card-elevated mb-16 p-12 bg-cyan-50">
            <h2 className="section-title section-title--center">Why Use Our Calculators?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Zap className="w-7 h-7" />, title: 'Instant Results', desc: 'Get immediate calculations without waiting' },
                { icon: <Calculator className="w-7 h-7" />, title: 'Expert Algorithms', desc: 'Based on industry standards and real data' },
                { icon: <Wrench className="w-7 h-7" />, title: 'Customizable', desc: 'Adjust parameters to match your exact needs' },
              ].map((f) => (
                <div key={f.title} className="text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-cyan-600 text-white"
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-color-primary">{f.title}</h3>
                  <p className="text-sm text-color-secondary">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <h2 className="cta-section__title">Need More Information?</h2>
            <p className="cta-section__subtitle">
              Explore our comprehensive knowledge base for detailed guides and articles about smart lock systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/articles" className="btn btn-primary btn-lg">Browse Articles</Link>
              <Link href="/" className="btn btn-secondary btn-lg">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
