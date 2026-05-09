import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import assert from 'node:assert/strict'

const root = process.cwd()

const files = [
  'components/Header.tsx',
  'components/Footer.tsx',
  'components/CalculatorDiscovery.tsx',
  'components/calculators/RelatedContent.tsx',
  'app/calculators/page.tsx',
  'app/articles/[category]/[slug]/page.tsx',
]

function linkOpeningTags(source: string): string[] {
  return Array.from(source.matchAll(/<Link\b[^>]*>/g)).map((match) => match[0])
}

for (const file of files) {
  const source = readFileSync(join(root, file), 'utf8')
  const missingPrefetch = linkOpeningTags(source).filter((tag) => !tag.includes('prefetch={false}'))

  assert.equal(
    missingPrefetch.length,
    0,
    `${file} has ${missingPrefetch.length} Link tag(s) without prefetch={false}`,
  )
}

console.log('High-density navigation links disable Next.js RSC prefetching')
