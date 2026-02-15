import { Metadata } from 'next'
import Link from 'next/link'
import CompatibilityChecker from './CompatibilityChecker'
import {
  Search, CheckCircle, Settings, AlertTriangle, XCircle, Ruler,
  DollarSign, Signal, Wrench, BookOpen, Landmark, Factory
} from 'lucide-react'
import { ToolRating } from '@/components/ToolRating'
import { RelatedResources } from '@/components/calculators/RelatedResources'

export const metadata: Metadata = {
  title: 'Smart Lock Door Compatibility Checker | ANSI A156.2 Standards',
  description: 'Verify smart lock compatibility using ANSI/BHMA A156.2 standards. Check door thickness (35-57mm), backset (60/70mm), material, and bore holes. Instant compatibility score.',
  keywords: 'smart lock compatibility, door thickness, backset measurement, ANSI A156.2, bore hole size, door compatibility checker',
}

export default function CompatibilityPage() {
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

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

          <div className="text-center mb-12">
            <div className="page-header__icon"><Search className="w-14 h-14 mx-auto" /></div>
            <h1 className="page-header__title">Smart Lock Door Compatibility Checker</h1>
            <p className="page-header__subtitle">Verify compatibility using ANSI/BHMA A156.2 industry standards</p>
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

          {/* Be-Tech Brand */}
          <div className="max-w-7xl mx-auto mt-8">
            <div className="content-card">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="card" style={{ width: "5rem", height: "5rem", padding: "var(--space-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="/images/brands/be-tech-logo.png" alt="Be-Tech Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)" }}>Recommended: Be-Tech</h3>
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
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"><Ruler className="w-6 h-6" style={{ color: "var(--color-text-secondary)" }} /></div>
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

{/* Related Resources */}
          <div className="max-w-7xl mx-auto mt-12">
            <h2 className="section-title">Related Resources</h2>
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
