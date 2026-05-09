import assert from 'node:assert/strict'
import { getComparisonSeoProfile } from '../lib/seo/comparison-page-seo'
import { getBestPageSeoProfile } from '../lib/seo/best-page-seo'
import type { Brand, ProductWithBrand } from '../lib/db/brand-models'

function brand(slug: string, name: string): Brand {
  return {
    id: 1,
    name,
    slug,
    description: `${name} smart locks`,
    logo_url: null,
    website_url: null,
    country: null,
    founded_year: null,
    parent_company: null,
    market_position: null,
    target_market: 'Residential',
    price_tier: 'mid',
    warranty_years: null,
    support_rating: null,
    innovation_score: null,
    status: 'published',
    display_order: 1,
    meta_title: null,
    meta_description: null,
    created_at: '',
    updated_at: '',
  }
}

function product(brandSlug: string, overrides: Partial<ProductWithBrand> = {}): ProductWithBrand {
  return {
    id: 1,
    brand_id: 1,
    series_id: 1,
    name: `${brandSlug} lock`,
    slug: `${brandSlug}-lock`,
    model_number: null,
    description: '',
    price_usd: 199,
    currency: 'USD',
    battery_type: null,
    battery_count: null,
    battery_life_months: 12,
    standby_power_mw: null,
    active_power_mw: null,
    protocol: 'wifi',
    secondary_protocol: null,
    supports_matter: false,
    has_fingerprint: false,
    has_keypad: true,
    has_guest_codes: true,
    has_remote_access: true,
    max_pin_codes: null,
    max_fingerprints: null,
    door_thickness_min_mm: null,
    door_thickness_max_mm: null,
    bore_diameter_mm: null,
    backset_mm: null,
    ansi_grade: '2',
    ul_listed: false,
    encryption_type: null,
    ip_rating: null,
    rating: 4.3,
    review_count: 100,
    pros_json: null,
    cons_json: null,
    specs_json: null,
    meta_title: null,
    meta_description: null,
    is_active: true,
    display_order: 1,
    created_at: '',
    updated_at: '',
    brand_name: brandSlug,
    brand_slug: brandSlug,
    ...overrides,
  }
}

function assertMeaningfulText(value: string, label: string) {
  assert.ok(value.length >= 45, `${label} must be specific enough for SEO use`)
  assert.equal(value.includes('undefined'), false, `${label} must not contain undefined`)
  assert.equal(value.includes('null'), false, `${label} must not contain null`)
}

function main() {
  const comparisonPairs = [
    ['nuki', 'Nuki', 'tedee', 'Tedee'],
    ['schlage', 'Schlage', 'weiser', 'Weiser'],
    ['kwikset', 'Kwikset', 'defiant', 'Defiant'],
    ['schlage', 'Schlage', 'defiant', 'Defiant'],
    ['schlage', 'Schlage', 'veise', 'Veise'],
    ['switchbot', 'SwitchBot', 'nuki', 'Nuki'],
    ['august', 'August', 'nuki', 'Nuki'],
    ['august', 'August', 'switchbot', 'SwitchBot'],
    ['eufy', 'Eufy', 'philips', 'Philips'],
    ['schlage', 'Schlage', 'philips', 'Philips'],
    ['schlage', 'Schlage', 'eufy', 'Eufy'],
    ['lockly', 'Lockly', 'eufy', 'Eufy'],
    ['eufy', 'Eufy', 'simplisafe', 'SimpliSafe'],
    ['schlage', 'Schlage', 'lockly', 'Lockly'],
    ['yale', 'Yale', 'godrej', 'Godrej'],
    ['yale', 'Yale', 'aqara', 'Aqara'],
    ['schlage', 'Schlage', 'brinks', 'Brinks'],
    ['kwikset', 'Kwikset', 'philips', 'Philips'],
  ] as const

  for (const [slug1, name1, slug2, name2] of comparisonPairs) {
    const profile = getComparisonSeoProfile(
      brand(slug1, name1),
      brand(slug2, name2),
      [product(slug1)],
      [product(slug2, { price_usd: 149, rating: 4.1 })]
    )

    assert.match(profile.title, new RegExp(`${name1}|${name2}`), `${slug1}-vs-${slug2} title must name a queried brand`)
    assertMeaningfulText(profile.description, `${slug1}-vs-${slug2} description`)
    assertMeaningfulText(profile.subtitle, `${slug1}-vs-${slug2} subtitle`)
    assertMeaningfulText(profile.verdict, `${slug1}-vs-${slug2} verdict`)
    assertMeaningfulText(profile.angle, `${slug1}-vs-${slug2} angle`)
    assertMeaningfulText(profile.faq.question, `${slug1}-vs-${slug2} FAQ question`)
    assertMeaningfulText(profile.faq.answer, `${slug1}-vs-${slug2} FAQ answer`)
  }

  for (const slug of ['matter-smart-locks', 'smart-locks-for-airbnb', 'smart-locks-with-longest-battery-life']) {
    const profile = getBestPageSeoProfile(slug)
    assert.ok(profile, `${slug} must have a dedicated best-page SEO profile`)
    assertMeaningfulText(profile.title, `${slug} title`)
    assertMeaningfulText(profile.description, `${slug} description`)
    assertMeaningfulText(profile.h1, `${slug} H1`)
    assertMeaningfulText(profile.intro, `${slug} intro`)
    assert.equal(profile.methodology.length, 3, `${slug} must define three methodology bullets`)
    assert.equal(profile.intentSignals.length, 3, `${slug} must define three intent signals`)
  }
}

main()
