import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function main() {
  const source = readFileSync('app/page.tsx', 'utf8')

  assert.match(source, /independent tool site/i, 'homepage must position SLockHub as an independent tool site')
  assert.match(source, /not a lock manufacturer or official brand site/i, 'homepage must explicitly avoid official-brand positioning')
  assert.match(source, /Check Door Fit/, 'homepage must route users to door-fit validation')
  assert.match(source, /Choose Protocol/, 'homepage must route users to protocol selection')
  assert.match(source, /battery-life/, 'homepage must route users to battery estimates')
  assert.match(source, /lock-tco/, 'homepage must route users to ownership-cost modeling')
  assert.match(source, /Route by search intent/, 'homepage must expose intent-based routing')
}

main()
