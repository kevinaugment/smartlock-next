import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import assert from 'node:assert/strict'

const root = process.cwd()

function sourceFiles(dir: string): string[] {
  return readdirSync(join(root, dir)).flatMap((entry) => {
    const relativePath = join(dir, entry)
    const absolutePath = join(root, relativePath)
    const stat = statSync(absolutePath)

    if (stat.isDirectory()) return sourceFiles(relativePath)
    if (!/\.(tsx|ts)$/.test(entry)) return []

    return [relativePath]
  })
}

function linkOpeningTags(source: string): string[] {
  return Array.from(source.matchAll(/<Link\b[^>]*>/g)).map((match) => match[0])
}

const files = ['app', 'components']
  .flatMap(sourceFiles)
  .filter((file) => readFileSync(join(root, file), 'utf8').includes("from 'next/link'"))

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
