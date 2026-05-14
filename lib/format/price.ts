export function formatUsdCents(priceCents: number | null | undefined): string {
  if (priceCents == null) return 'Price not listed'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: priceCents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(priceCents / 100)
}

export function usdCentsToDollars(priceCents: number | null | undefined): number | null {
  if (priceCents == null) return null
  return priceCents / 100
}

export function formatUsdCentsForSchema(priceCents: number | null | undefined): string | null {
  const dollars = usdCentsToDollars(priceCents)
  if (dollars == null) return null
  return dollars.toFixed(2)
}

export function isUsdCentsBelow(priceCents: number | null | undefined, dollarThreshold: number): boolean {
  const dollars = usdCentsToDollars(priceCents)
  return dollars != null && dollars < dollarThreshold
}
