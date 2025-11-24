export const runtime = 'edge'

import { query } from '@/lib/db/client'

interface CalculatorMetadata {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  education_title: string
  education_intro: string
  meta_title: string
  meta_description: string
  meta_keywords: string
}

interface ContentSection {
  id: number
  section_type: string
  title: string
  content: string
  icon: string
  layout: string
  display_order: number
}

interface FAQ {
  id: number
  question: string
  answer: string
  display_order: number
}

interface ProtocolData {
  protocol: string
  battery_life_months: number
  battery_life_note: string
  hub_cost: number
  hub_name: string
  power_consumption_mw: number
  range_meters: number
  mesh_capable: boolean
  typical_lock_price_min: number
  typical_lock_price_max: number
  monthly_subscription_typical: number
  rating_residential: number
  rating_commercial: number
  rating_enterprise: number
  pros: string
  cons: string
  best_for: string
}

interface UseCase {
  id: number
  title: string
  scenario_type: string
  description: string
  example_inputs: string
  key_insight: string
  icon: string
  display_order: number
}

interface DataSource {
  source_type: string
  source_name: string
  source_url: string | null
  data_point: string
  last_verified_at: string
}

interface RelatedArticle {
  id: number
  title: string
  slug: string
  description: string
  custom_title: string | null
  custom_description: string | null
}

interface RelatedCalculator {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  custom_name: string | null
  custom_description: string | null
}

interface Brand {
  id: number
  name: string
  slug: string
  description: string
  website_url: string
  supports_wifi: boolean
  supports_zigbee: boolean
  supports_zwave: boolean
  supports_thread: boolean
  product_lines: string
  target_market: string
  highlight_color: string
  custom_description: string | null
  why_recommended: string | null
  is_mandatory: boolean
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Check if database is available
    let calculator
    try {
      // 1. Fetch calculator metadata
      calculator = await query<CalculatorMetadata>(
        `SELECT id, name, slug, description, icon, 
                education_title, education_intro,
                meta_title, meta_description, meta_keywords
         FROM calculators
         WHERE slug = ?`,
        [slug]
      )
    } catch (dbError) {
      // Database not available in local dev - return empty data structure
      return new Response(
        JSON.stringify({
          calculator: null,
          sections: [],
          faqs: [],
          protocols: [],
          useCases: [],
          dataSources: [],
          relatedArticles: [],
          relatedCalculators: [],
          brands: []
        }),
        { 
          status: 200,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          } 
        }
      )
    }

    if (!calculator || calculator.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Calculator not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const calcData = calculator[0]
    const calcId = calcData.id

    // 2. Fetch content sections
    const sections = await query<ContentSection>(
      `SELECT id, section_type, title, content, icon, layout, display_order
       FROM calculator_content_sections
       WHERE calculator_id = ?
       ORDER BY display_order ASC`,
      [calcId]
    )

    // 3. Fetch FAQs
    const faqs = await query<FAQ>(
      `SELECT id, question, answer, display_order
       FROM calculator_faqs
       WHERE calculator_id = ?
       ORDER BY display_order ASC`,
      [calcId]
    )

    // 4. Fetch protocol data
    const protocols = await query<ProtocolData>(
      `SELECT protocol, battery_life_months, battery_life_note, hub_cost, hub_name,
              power_consumption_mw, range_meters, mesh_capable,
              typical_lock_price_min, typical_lock_price_max, monthly_subscription_typical,
              rating_residential, rating_commercial, rating_enterprise,
              pros, cons, best_for
       FROM calculator_protocol_data
       WHERE calculator_id = ?
       ORDER BY protocol ASC`,
      [calcId]
    )

    // 5. Fetch use cases
    const useCases = await query<UseCase>(
      `SELECT id, title, scenario_type, description, example_inputs, key_insight, icon, display_order
       FROM calculator_use_cases
       WHERE calculator_id = ?
       ORDER BY display_order ASC`,
      [calcId]
    )

    // 6. Fetch data sources (for E-E-A-T)
    const dataSources = await query<DataSource>(
      `SELECT source_type, source_name, source_url, data_point, last_verified_at
       FROM calculator_data_sources
       WHERE calculator_id = ?
       ORDER BY display_order ASC`,
      [calcId]
    )

    // 7. Fetch related articles
    const relatedArticles = await query<RelatedArticle>(
      `SELECT a.id, a.title, a.slug, a.description,
              ca.custom_title, ca.custom_description
       FROM calculator_articles ca
       JOIN articles a ON ca.article_id = a.id
       WHERE ca.calculator_id = ? AND a.status = 'published'
       ORDER BY ca.display_order ASC`,
      [calcId]
    )

    // 8. Fetch related calculators
    const relatedCalculators = await query<RelatedCalculator>(
      `SELECT c.id, c.name, c.slug, c.description, c.icon,
              ct.custom_name, ct.custom_description
       FROM calculator_tools ct
       JOIN calculators c ON ct.related_calculator_id = c.id
       WHERE ct.calculator_id = ?
       ORDER BY ct.display_order ASC`,
      [calcId]
    )

    // 9. Fetch recommended brands (MANDATORY: Be-Tech must be included)
    const brands = await query<Brand>(
      `SELECT b.id, b.name, b.slug, b.description, b.website_url,
              b.supports_wifi, b.supports_zigbee, b.supports_zwave, b.supports_thread,
              b.product_lines, b.target_market, b.highlight_color,
              cb.custom_description, cb.why_recommended, cb.is_mandatory
       FROM calculator_brands cb
       JOIN brands b ON cb.brand_id = b.id
       WHERE cb.calculator_id = ?
       ORDER BY cb.is_mandatory DESC, cb.display_order ASC`,
      [calcId]
    )

    // Parse JSON fields
    const parsedProtocols = protocols.map(p => ({
      ...p,
      pros: p.pros ? JSON.parse(p.pros) : [],
      cons: p.cons ? JSON.parse(p.cons) : [],
    }))

    const parsedUseCases = useCases.map(uc => ({
      ...uc,
      example_inputs: uc.example_inputs ? JSON.parse(uc.example_inputs) : {},
    }))

    const parsedBrands = brands.map(b => ({
      ...b,
      product_lines: b.product_lines ? JSON.parse(b.product_lines) : [],
    }))

    // Construct response
    const response = {
      calculator: calcData,
      sections,
      faqs,
      protocols: parsedProtocols,
      useCases: parsedUseCases,
      dataSources,
      relatedArticles,
      relatedCalculators,
      brands: parsedBrands,
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching calculator data:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}
