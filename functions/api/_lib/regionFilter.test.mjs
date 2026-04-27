// Smoke test: simulate SQLite LIKE evaluation of the helper against fixture
// locations to confirm correct (location, remote) pairs are excluded vs kept.
// Run: node functions/api/_lib/regionFilter.test.mjs
//
// Mirrors LIKE semantics manually so we don't need a D1 instance.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const src = readFileSync(path.join(here, 'regionFilter.ts'), 'utf8')

function extractArray(name) {
  const re = new RegExp(`const ${name} = \\[([\\s\\S]*?)\\]`)
  const m = src.match(re)
  if (!m) throw new Error(`could not parse ${name}`)
  return Array.from(m[1].matchAll(/'([^']+)'/g)).map(x => x[1])
}

const NAMES = extractArray('BLOCK_NAMES')
const CODES = extractArray('BLOCK_CODES')

function isRemoteExcluded(remote, location) {
  if (remote !== 'remote') return false
  if (!location) return false
  const loc = location.toLowerCase()
  // Mirrors helper: name must follow a comma or dash to avoid US-state-prefix
  // false matches ("india" inside "Indianapolis", etc.).
  for (const raw of NAMES) {
    const n = raw.trim()
    if (loc.endsWith(`, ${n}`) || loc.includes(`, ${n},`)) return true
    if (loc.endsWith(`- ${n}`) || loc.includes(`- ${n},`)) return true
  }
  // Trailing 2-letter codes must have at least 2 prior commas
  // so US "City, State" (1 comma) doesn't false-match (DE/Delaware, IN/Indiana, etc.).
  for (const c of CODES) {
    const tail = `, ${c}`
    const idx = loc.lastIndexOf(tail)
    if (idx > 0) {
      const before = loc.slice(0, idx)
      if ((before.match(/,/g) ?? []).length >= 1) {
        if (loc.endsWith(tail) || loc.includes(`${tail},`)) return true
      }
    }
  }
  return false
}

const cases = [
  // [remote, location, expectedExclude, label]
  ['remote', 'Remote, India', true,  'remote India by name'],
  ['remote', 'Remote, EMEA', true,  'remote EMEA region'],
  ['remote', 'London, United Kingdom', true,  'remote UK by name'],
  ['remote', 'Berlin, Berlin, DE', true,  'remote DE by trailing code'],
  ['remote', 'Bangalore, Karnataka, IN', true,  'remote IN by trailing code'],
  ['remote', 'Sydney, NSW, AU', true,  'remote AU'],
  ['remote', 'Mexico City, Mexico', true,  'remote Mexico'],
  ['remote', 'Sao Paulo, Brazil', true,  'remote Brazil'],
  ['remote', 'Remote', false, 'bare Remote stays'],
  ['remote', 'Remote - US', false, 'remote US explicit stays'],
  ['remote', 'Remote, NY', false, 'remote NY stays'],
  ['remote', 'Remote, Toronto', false, 'remote Toronto stays'],
  ['remote', 'San Francisco, CA', false, 'remote SF stays'],
  ['remote', 'Toronto, ON, Canada', false, 'remote Toronto Canada stays'],
  ['onsite', 'London, United Kingdom', false, 'onsite UK stays (only remote excluded)'],
  ['hybrid', 'Berlin, Germany', false, 'hybrid Germany stays'],
  ['onsite', 'Bangalore, Karnataka, IN', false, 'onsite India stays'],
  ['remote', null, false, 'null location stays'],
  ['remote', '', false, 'empty location stays'],
  // Tricky: ensure US state names don't false-match
  ['remote', 'Indianapolis, IN', false, 'Indiana NOT excluded (state code collision avoided)'],
  ['remote', 'Wilmington, DE', false, 'Delaware NOT excluded (state code collision avoided)'],
  ['remote', 'Chicago, IL', false, 'Illinois NOT excluded'],
  ['remote', 'Boston, MA', false, 'Massachusetts NOT excluded'],
  ['remote', 'Boulder, CO', false, 'Colorado NOT excluded'],
  ['remote', 'Boise, ID', false, 'Idaho NOT excluded'],
  ['remote', 'Portland, OR, USA', false, 'Oregon stays'],
  ['remote', 'Austin, TX', false, 'Texas stays'],
  ['remote', 'Albuquerque, New Mexico', false, 'New Mexico (state) NOT excluded'],
  ['remote', 'Albany, NY', false, 'plain US city stays'],
  ['remote', 'Remote - India', true, 'dash-separated India excluded'],
  ['remote', 'Remote - APAC', true, 'dash-separated APAC excluded'],
  ['remote', 'Remote, India, Asia', true, 'comma-prefix India in middle excluded'],
]

let pass = 0, fail = 0
for (const [remote, loc, expected, label] of cases) {
  const got = isRemoteExcluded(remote, loc)
  const ok = got === expected
  if (ok) pass++
  else fail++
  console.log(`${ok ? 'PASS' : 'FAIL'}  exclude=${got}  expected=${expected}  [${remote} | ${loc}] -- ${label}`)
}
console.log(`\n${pass} pass, ${fail} fail`)
process.exit(fail === 0 ? 0 : 1)
