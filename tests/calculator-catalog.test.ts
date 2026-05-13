import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { calculatorCount } from '../lib/calculators/catalog'
import { calculatorRouteSlugs } from '../lib/calculators/slugs'

function main() {
  assert.equal(calculatorCount, calculatorRouteSlugs.length, 'shared calculator count must come from route slug registry')

  const calculatorRouteCount = calculatorRouteSlugs.filter((slug) =>
    existsSync(path.join('app', 'calculators', slug, 'page.tsx'))
  ).length
  assert.equal(calculatorCount, calculatorRouteCount, 'shared calculator count must match live calculator routes')

  for (const filePath of ['app/about/page.tsx', 'app/calculators/page.tsx']) {
    const source = readFileSync(filePath, 'utf8')
    assert.match(source, /calculatorCount/, `${filePath} must use the shared calculator count`)
    assert.doesNotMatch(source, /32 specialized tools|32 interactive tools/, `${filePath} must not hard-code the calculator count`)
  }
}

main()
