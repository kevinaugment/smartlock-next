import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CompatibilityChecker from './CompatibilityChecker'
import {
  Search, CheckCircle, Settings, AlertTriangle, XCircle, Ruler,
  DollarSign, Signal, Wrench, BookOpen, Landmark, Factory
} from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'
import { SeoPathways } from '@/components/seo/SeoPathways'
import { CalculatorSeoBlock } from '@/components/seo/CalculatorSeoBlock'
import { ReportLeadCapture } from '@/components/seo/ReportLeadCapture'
import { CalculatorAnswerBlock } from '@/components/seo/CalculatorAnswerBlock'
import { CalculatorFaqBlock } from '@/components/seo/CalculatorFaqBlock'

export const metadata: Metadata = {
  title: 'Smart Lock Door Compatibility Checker - See If Your Door Fits',
  description: 'Check door thickness, backset, bore size, material, and installation risk before buying a smart lock.',
  keywords: 'smart lock compatibility, door thickness, backset measurement, ANSI A156.2, bore hole size, door compatibility checker',
  alternates: { canonical: '/calculators/compatibility' },
  openGraph: {
    title: 'Smart Lock Door Compatibility Checker - See If Your Door Fits',
    description: 'Check door thickness, backset, bore size, material, and installation risk before buying a smart lock.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Lock Door Compatibility Checker - See If Your Door Fits',
    description: 'Verify physical smart lock fit before purchase using ANSI/BHMA door-prep standards.',
  },
}

export default function CompatibilityPage() {
  const faqs = [
    {
      question: 'Will a smart lock fit my door?',
      answer: 'A smart lock will fit only if the door thickness, backset, bore hole, latch bore, material, handing, and lock type match the product requirements. Retrofit locks may fit some doors that cannot accept a full replacement.',
    },
    {
      question: 'What backset do I need?',
      answer: 'Most U.S. residential doors use either a 60mm or 70mm backset. Measure from the door edge to the center of the bore hole and confirm the smart lock latch supports that distance.',
    },
    {
      question: 'Can smart locks work on mortise locks?',
      answer: 'Some smart locks support mortise doors, but standard deadbolt smart locks usually do not. Mortise doors often need a compatible mortise smart lock, access control hardware, or professional modification.',
    },
    {
      question: 'Are smart locks renter-friendly?',
      answer: 'Retrofit smart locks are often more renter-friendly because they keep the exterior key cylinder and reduce permanent changes. Renters should still check lease terms and avoid drilling without approval.',
    },
    {
      question: 'What measurements should I take first?',
      answer: 'Measure door thickness, backset, main bore diameter, latch bore, edge plate, strike alignment, and available interior clearance. Also note material, fire rating, glass, and whether the current lock is deadbolt, lever, knob, or mortise.',
    },
  ]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.slockhub.com' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.slockhub.com/calculators' },
      { '@type': 'ListItem', position: 3, name: 'Compatibility Checker', item: 'https://www.slockhub.com/calculators/compatibility' }
    ]
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Smart Lock Compatibility Checker',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Check smart lock door compatibility using ANSI A156.2 standards for thickness, backset, and bore holes'
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Smart Lock Door Compatibility Checker',
    url: 'https://www.slockhub.com/calculators/compatibility',
    description: 'Verify smart lock compatibility using ANSI/BHMA A156.2 standards for door thickness, backset, bore size, material, and installation risk.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'SLockHub.com',
      url: 'https://www.slockhub.com',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <div className="page-bg">
        <div className="container-main section">
          <div className="mb-8">
            <nav className="flex text-sm">
              <ol className="inline-flex items-center space-x-1">
                <li><Link href="/" style={{ color: "var(--color-text-muted)" }}>Home</Link></li>
                <li><span className="breadcrumb__separator">/</span><Link href="/calculators" style={{ color: "var(--color-text-muted)" }}>Calculators</Link></li>
                <li><span className="breadcrumb__separator">/</span><span className="breadcrumb__current">Compatibility Checker</span></li>
              </ol>
            </nav>
          </div>

          <div className="page-header">
            <div className="page-header__icon"><Search className="w-14 h-14" /></div>
            <h1 className="page-header__title">Smart Lock Door Compatibility Checker</h1>
            <p className="page-header__subtitle">Verify compatibility using ANSI/BHMA A156.2 industry standards</p>
          </div>

          <div className="max-w-7xl mx-auto">
            <CalculatorAnswerBlock
              title="Will a smart lock fit my door?"
              answer="A smart lock fits when the door thickness, backset, bore hole, latch bore, material, and lock type match the manufacturer specifications. Standard deadbolt replacements usually need a common 54mm bore and 60mm or 70mm backset, while retrofit locks may work when you need to keep the existing exterior hardware."
            />
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="callout callout-info">
              <h2 className="callout-title">ANSI A156.2-2019 Standards</h2>
              <p >
                <strong>Thickness:</strong> 35-57mm (1-3/8" to 2-1/4") | <strong>Backset:</strong> 60mm or 70mm (2-3/8"/2-3/4") | <strong>Bore:</strong> 54mm (2-1/8") standard. Non-standard specs require adapters or modifications. Verify before purchase to avoid $150+ modification costs.
              </p>
            </div>
          </div>

          <CompatibilityChecker />

          <ToolRating toolSlug="compatibility" />

          <SeoPathways topic="compatibility" title="Validate the Full Door Fit" />

          <div className="max-w-7xl mx-auto">
            <CalculatorSeoBlock
              title="How to interpret door compatibility"
              answers={[
                'Whether your existing door prep fits common smart deadbolt dimensions.',
                'Which measurement is most likely to force drilling, adapter kits, or a different lock type.',
                'Whether material, fire rating, or glass construction makes a retrofit lock safer than a full replacement.',
              ]}
              formula={{
                label: 'Fit score',
                equation: 'Compatibility score = thickness fit + backset fit + bore fit + latch bore fit + material risk adjustment',
                notes: 'The score is intentionally conservative. One failed physical dimension can block installation even when the other measurements look standard.',
              }}
              assumptions={[
                'Most bored residential locks are designed around 35-57mm door thickness.',
                'Common U.S. backsets are 60mm and 70mm; uncommon backsets usually require re-drilling or an adjustable latch.',
                'Glass, narrow stile, and fire-rated doors need manufacturer-specific hardware confirmation.',
              ]}
              example={{
                title: 'Older side door with small bore',
                inputs: '44mm wood door, 60mm backset, 38mm bore, standard latch bore',
                result: 'Thickness and backset pass, but the bore likely needs drilling to 54mm.',
                decision: 'Budget for modification or choose a retrofit lock that mounts over the existing interior thumbturn.',
              }}
              sources={[
                'ANSI/BHMA A156.2 bored lock dimensional standards.',
                'Manufacturer installation manuals for Schlage, Yale, August, Kwikset, and Be-Tech models.',
                'UL and fire-door guidance where hardware modification may affect compliance.',
              ]}
              links={[
                { href: '/calculators/installation-cost', title: 'Estimate Modification Cost', description: 'Price the drilling, adapter, or locksmith work before buying.' },
                { href: '/calculators/signal-strength', title: 'Check Signal Risk', description: 'Metal and exterior doors can affect lock connectivity after fit is solved.' },
                { href: '/best/matter-smart-locks', title: 'Shop Compatible Matter Locks', description: 'Compare cross-platform models after the physical fit passes.' },
              ]}
            />
          </div>

          <div className="max-w-7xl mx-auto">
            <ReportLeadCapture
              reportType="door-compatibility-audit"
              title="Door Compatibility Audit PDF"
              description="Turn your measurements into a one-page compatibility brief before you shortlist products or request installation quotes."
              sourcePath="/calculators/compatibility"
              context={{
                calculator: 'compatibility',
                standard: 'ANSI/BHMA A156.2',
                focus: 'door-fit screening',
              }}
              bullets={[
                'Includes fit checkpoints for thickness, backset, bore, and material risk.',
                'Useful for forwarding to an installer or property stakeholder before purchase.',
                'Pairs naturally with installation-cost estimates when any measurement fails.',
              ]}
            />
          </div>

          {/* Be-Tech Brand */}
          <div className="max-w-7xl mx-auto mt-8">
            <div className="content-card">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="card" style={{ width: "5rem", height: "5rem", padding: "var(--space-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image src="/images/brands/be-tech-logo.png" alt="Be-Tech Logo" width={64} height={64} className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)" }}>Brand reference: Be-Tech</h3>
                    <span className="badge badge-accent">Wide Compatibility</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}>
                    Be-Tech locks support 35-57mm thickness, 60/70mm backset, and standard 54mm bores. Compatible with wood, metal, and composite doors. ANSI A156.2 compliant.
                  </p>
                  <a href="https://www.betechlock.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: "var(--color-accent)", fontWeight: 500 }}>
                    Visit Official Website →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ANSI Standards Table */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <div className="flex justify-between items-center mb-6">
                <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "var(--color-text-primary)" }}>ANSI/BHMA A156.2 Specifications</h2>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Updated: February 2026</span>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr >
                      <th >Parameter</th>
                      <th >Standard Value</th>
                      <th >Acceptable Range</th>
                      <th >Non-Standard Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Door Thickness</td>
                      <td>44mm (1-3/4")</td>
                      <td style={{ color: "var(--color-success)" }}>35-57mm (1-3/8" to 2-1/4")</td>
                      <td style={{ color: "var(--color-text-secondary)" }}>&lt;35mm: surface mount only. &gt;57mm: extension kit needed</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Backset</td>
                      <td>60mm or 70mm</td>
                      <td style={{ color: "var(--color-success)" }}>60mm (2-3/8"), 70mm (2-3/4")</td>
                      <td style={{ color: "var(--color-text-secondary)" }}>Non-standard requires re-drilling or adjustable lock</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Bore Hole (Cylinder)</td>
                      <td>54mm (2-1/8")</td>
                      <td style={{ color: "var(--color-success)" }}>54mm standard</td>
                      <td style={{ color: "var(--color-text-secondary)" }}>Smaller: drill out. Larger: use reducer ring</td>
                    </tr>
                    <tr >
                      <td style={{ fontWeight: 600 }}>Latch Bore</td>
                      <td>25mm (1")</td>
                      <td style={{ color: "var(--color-success)" }}>25mm standard</td>
                      <td style={{ color: "var(--color-text-secondary)" }}>Required for latch bolt installation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="callout callout-info">
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-xs)" }}><strong>ANSI/BHMA Standards Authority:</strong></p>
                <ul className="space-y-1" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                  <li>• <strong>ANSI A156.2-2019:</strong> Bored Locks and Latches (American National Standards Institute)</li>
                  <li>• <strong>BHMA (Builders Hardware Manufacturers Association):</strong> Industry testing and certification body</li>
                  <li>• <strong>UL 10C:</strong> Fire door hardware standards (safety compliance)</li>
                </ul>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginTop: "var(--space-sm)" }}>All measurements are industry-standard minimums. Local building codes may impose stricter requirements.</p>
              </div>
            </div>
          </div>

          {/* Door Material Compatibility */}
          <div className="max-w-7xl mx-auto mt-12">
            <div className="content-card">
              <h2 className="section-title">Door Material Compatibility Matrix</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="rounded-lg p-6" style={{ border: "2px solid var(--color-success)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--color-success-subtle)" }}><CheckCircle className="w-6 h-6" style={{ color: "var(--color-success)" }} /></div>
                    <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Wood Doors</h3>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}><strong>Compatibility: 100%</strong></p>
                  <ul className="space-y-1" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    <li>• All smart locks compatible</li>
                    <li>• Easiest installation (standard drill bits)</li>
                    <li>• Solid core &gt; hollow core (stability)</li>
                  </ul>
                </div>
                <div className="rounded-lg p-6" style={{ border: "2px solid var(--color-accent)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--color-accent-subtle)" }}><Settings className="w-6 h-6" style={{ color: "var(--color-accent)" }} /></div>
                    <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Metal Doors</h3>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}><strong>Compatibility: 90%</strong></p>
                  <ul className="space-y-1" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    <li>• Requires cobalt/carbide drill bits</li>
                    <li>• Slower drill speed (300 RPM)</li>
                    <li>• Reinforced mounting plates recommended</li>
                  </ul>
                </div>
                <div className="border-2 border-yellow-500 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--color-warning-subtle)" }}><AlertTriangle className="w-6 h-6" style={{ color: "var(--color-warning)" }} /></div>
                    <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Fiberglass</h3>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}><strong>Compatibility: 85%</strong></p>
                  <ul className="space-y-1" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    <li>• May crack - use masking tape</li>
                    <li>• Verify lock weight &lt; 4 lbs</li>
                    <li>• Avoid over-tightening screws</li>
                  </ul>
                </div>
                <div className="rounded-lg p-6" style={{ border: "2px solid var(--color-warning)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--color-warning-subtle)" }}><Search className="w-6 h-6" style={{ color: "var(--color-warning)" }} /></div>
                    <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Composite</h3>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}><strong>Compatibility: 80%</strong></p>
                  <ul className="space-y-1" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    <li>• Density varies by manufacturer</li>
                    <li>• Foam core may need reinforcement</li>
                    <li>• Verify with door manufacturer first</li>
                  </ul>
                </div>
                <div className="border-2 border-red-500 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--color-danger-subtle)" }}><XCircle className="w-6 h-6" style={{ color: "var(--color-danger)" }} /></div>
                    <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Glass Doors</h3>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}><strong>Compatibility: 30%</strong></p>
                  <ul className="space-y-1" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    <li>• No deadbolt drilling possible</li>
                    <li>• Surface-mount rim locks only</li>
                    <li>• August retrofit, Yale Linus, Nuki</li>
                  </ul>
                </div>
                <div className="rounded-lg p-6" style={{ border: "2px solid var(--color-border)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface-alt)' }}><Ruler className="w-6 h-6" style={{ color: "var(--color-text-secondary)" }} /></div>
                    <h3 style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>Measurements</h3>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-sm)" }}><strong>How to Measure</strong></p>
                  <ul className="space-y-1" style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    <li>• Thickness: Caliper or ruler on door edge</li>
                    <li>• Backset: Handle center to door edge</li>
                    <li>• Bore: Existing hole diameter</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


          <RelatedResources calculatorSlug="door-lock-compatibility-checker" />
          <div className="max-w-7xl mx-auto">
            <CalculatorFaqBlock faqs={faqs} />
          </div>

          {/* Door Fit, Cost, Signal */}
          <div className="max-w-7xl mx-auto mt-12">
            <h2 className="section-title">Door Fit, Cost, Signal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/calculators/installation-cost" className="link-card">
                <div style={{ color: "var(--color-accent)", marginBottom: "var(--space-sm)" }}><DollarSign className="w-8 h-8" /></div>
                <h3 className="link-card__title">Installation Cost</h3>
                <p className="link-card__desc">Calculate costs if modifications needed</p>
              </Link>
              <Link href="/calculators/signal-strength" className="link-card">
                <div style={{ color: "var(--color-accent)", marginBottom: "var(--space-sm)" }}><Signal className="w-8 h-8" /></div>
                <h3 className="link-card__title">Signal Strength</h3>
                <p className="link-card__desc">Metal doors affect RF signal penetration</p>
              </Link>
              <Link href="/calculators" className="link-card">
                <div style={{ color: "var(--color-accent)", marginBottom: "var(--space-sm)" }}><Wrench className="w-8 h-8" /></div>
                <h3 className="link-card__title">All Calculators</h3>
                <p className="link-card__desc">TCO, battery life, and more tools</p>
              </Link>
            </div>
          </div>

          {/* Data Sources */}
          <div className="max-w-7xl mx-auto mt-12 mb-12">
            <div className="info-box">
              <div className="flex items-center justify-between mb-6">
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text-primary)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><BookOpen className="w-6 h-6" style={{ color: "var(--color-accent)" }} /> Industry Standards & Sources</h3>
                <span className="badge badge-success">Verified Feb 2026</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-lg)" }}>All compatibility criteria based on industry standards and manufacturer specifications</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Landmark className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Standards Organizations</h4>
                  <div className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <p><strong>ANSI (American National Standards Institute):</strong> A156.2-2019 Bored Locks and Latches</p>
                    <p><strong>BHMA (Builders Hardware Manufacturers Assoc):</strong> Testing and certification protocols</p>
                    <p><strong>UL (Underwriters Laboratories):</strong> UL 10C fire door hardware safety</p>
                  </div>
                </div>
                <div className="card">
                  <h4 style={{ fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", display: "inline-flex", alignItems: "center", gap: "var(--space-sm)" }}><Factory className="w-5 h-5" style={{ color: "var(--color-accent)" }} /> Manufacturer Specs</h4>
                  <div className="space-y-2" style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                    <p><strong>Installation Manuals:</strong> Schlage, Yale, August, Kwikset, Be-Tech (2026 editions)</p>
                    <p><strong>Compatibility Guides:</strong> Door prep specifications, extension kit requirements</p>
                    <p><strong>Material Testing:</strong> Drill bit requirements, torque specifications</p>
                  </div>
                </div>
              </div>
              <div className="callout callout-warning mt-6">
                <p >
                  <strong><AlertTriangle className="w-4 h-4 inline" /> Important:</strong> This tool provides guidance based on industry standards. Always verify specific lock model compatibility with manufacturer documentation before purchase. Local building codes may have additional requirements.
                </p>
              </div>
              <div className="mt-4 text-center">
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Calculator last updated: February 15, 2026 | Next review: August 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
