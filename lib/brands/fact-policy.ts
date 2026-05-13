export type FactStatus = 'Vendor stated' | 'Catalog field' | 'Unknown' | 'Needs verification'

export interface FactDisplay {
    label: string
    value: string
    status: FactStatus
    caveat: string
}

export interface ProtocolFact {
    label: string
    slug: string
    supported: boolean
    status: FactStatus
    caveat: string
}

export const brandFactLastVerified = '2026-05-13'

export const brandFactReviewCadence = 'Review brand and product facts when catalog data changes, vendor manuals change, or protocol support is used for SEO claims.'

const protocolDefinitions = [
    { label: 'Wi-Fi', slug: 'wifi', brandField: 'supports_wifi', matches: ['wifi', 'wi-fi'] },
    { label: 'Zigbee', slug: 'zigbee', brandField: 'supports_zigbee', matches: ['zigbee'] },
    { label: 'Z-Wave', slug: 'z-wave', brandField: 'supports_zwave', matches: ['zwave', 'z-wave'] },
    { label: 'Thread', slug: 'thread', brandField: 'supports_thread', matches: ['thread'] },
    { label: 'Matter', slug: 'matter', brandField: 'supports_matter', matches: ['matter'] },
    { label: 'Bluetooth', slug: 'bluetooth', brandField: 'supports_bluetooth', matches: ['bluetooth', 'ble'] },
] as const

type BrandProtocolFields = Record<(typeof protocolDefinitions)[number]['brandField'], boolean>

interface ProductFactFields {
    protocol?: string | null
    secondary_protocol?: string | null
    supports_matter?: boolean | null
    battery_life_months?: number | null
    ansi_grade?: string | null
}

function normalizeProtocol(value: string | null | undefined): string {
    return (value || '').toLowerCase().replace(/\s+/g, '-')
}

export function getBrandProtocolFacts(brand: BrandProtocolFields): ProtocolFact[] {
    return protocolDefinitions.map((definition) => {
        const supported = Boolean(brand[definition.brandField])
        return {
            label: definition.label,
            slug: definition.slug,
            supported,
            status: supported ? 'Vendor stated' : 'Unknown',
            caveat: supported
                ? `${definition.label} support is listed at brand level; verify exact model support before purchase.`
                : `${definition.label} support is not listed at brand level in the current catalog.`,
        }
    })
}

export function getProductProtocolFacts(product: ProductFactFields): ProtocolFact[] {
    const primary = normalizeProtocol(product.protocol)
    const secondary = normalizeProtocol(product.secondary_protocol)

    return protocolDefinitions.map((definition) => {
        const protocolMatch = definition.matches.some((match) => primary.includes(match) || secondary.includes(match))
        const supported = definition.slug === 'matter' ? Boolean(product.supports_matter) : protocolMatch
        return {
            label: definition.label,
            slug: definition.slug,
            supported,
            status: supported ? 'Catalog field' : 'Unknown',
            caveat: supported
                ? `${definition.label} is explicitly represented in product protocol fields.`
                : `${definition.label} is not listed for this product; do not infer it from other protocols.`,
        }
    })
}

export function getSupportedProtocolLabels(facts: ProtocolFact[]): string[] {
    return facts.filter((fact) => fact.supported).map((fact) => fact.label)
}

export function getProtocolFact(facts: ProtocolFact[], label: string): ProtocolFact | undefined {
    return facts.find((fact) => fact.label === label)
}

export function getFactDisplay(facts: FactDisplay[], label: string): FactDisplay | undefined {
    return facts.find((fact) => fact.label === label)
}

export function buildProductFactDisplays(product: ProductFactFields): FactDisplay[] {
    return [
        {
            label: 'Battery',
            value: product.battery_life_months ? `${product.battery_life_months} months` : 'Unknown',
            status: product.battery_life_months ? 'Catalog field' : 'Needs verification',
            caveat: product.battery_life_months
                ? 'Battery life comes from the catalog model field and still depends on usage, signal, weather, and door alignment.'
                : 'Battery life is not listed in the current catalog; verify the vendor manual or product listing.',
        },
        {
            label: 'Protocol',
            value: product.protocol ? product.protocol.toUpperCase() : 'Unknown',
            status: product.protocol ? 'Catalog field' : 'Needs verification',
            caveat: product.protocol
                ? 'Primary protocol is stored as a product catalog field.'
                : 'Primary protocol is missing; avoid protocol-led recommendations until verified.',
        },
        {
            label: 'ANSI grade',
            value: product.ansi_grade ? `Grade ${product.ansi_grade}` : 'Unknown',
            status: product.ansi_grade ? 'Catalog field' : 'Needs verification',
            caveat: product.ansi_grade
                ? 'ANSI/BHMA grade is listed in the product catalog.'
                : 'ANSI/BHMA grade is not listed; verify certification before security-led claims.',
        },
        {
            label: 'Matter support',
            value: product.supports_matter ? 'Yes' : 'Unknown',
            status: product.supports_matter ? 'Catalog field' : 'Unknown',
            caveat: product.supports_matter
                ? 'Matter support is explicitly true in the product catalog.'
                : 'Matter support is not listed as true; do not infer Matter from Thread, Wi-Fi, or ecosystem names.',
        },
        {
            label: 'Warranty',
            value: 'Unknown',
            status: 'Needs verification',
            caveat: 'Warranty is not a product-level catalog field yet; verify vendor warranty terms before publishing warranty claims.',
        },
    ]
}

export function getProtocolClaimText(facts: ProtocolFact[]): string {
    const supported = getSupportedProtocolLabels(facts)
    return supported.length > 0 ? supported.join(', ') : 'Protocol support needs verification'
}
