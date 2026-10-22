#!/usr/bin/env node
// Regression tests for the latest-newsletter parser.
//
// Case 2 is the one that matters: it is edition #87's exact shape on
// 2026-09-03, with `tileImage` after `body`. The old regex returned a body
// carrying the whole previous edition and every other check in the repo passed.
//
// Run: node scripts/test-latest-newsletter.mjs

import { parseLatestNewsletter } from './lib/latest-newsletter.mjs'

let failures = 0
const ok = (name) => console.log(`  ✓ ${name}`)
const bad = (name, detail) => { failures++; console.error(`  ✗ ${name}\n      ${detail}`) }

function expectPass(name, source, check) {
  try {
    const result = parseLatestNewsletter(source)
    const problem = check?.(result)
    if (problem) bad(name, problem)
    else ok(name)
  } catch (err) {
    bad(name, `threw unexpectedly: ${err.message.split('\n')[0]}`)
  }
}

function expectThrow(name, source, matcher) {
  try {
    parseLatestNewsletter(source)
    bad(name, 'expected a throw, but parsing succeeded')
  } catch (err) {
    if (matcher && !matcher.test(err.message)) {
      bad(name, `threw, but the message did not match ${matcher}:\n      ${err.message.split('\n')[1] ?? err.message}`)
    } else ok(name)
  }
}

const entry = ({ slug, folder, tileAfterBody = false, tile = null, extra = '' }) => {
  const tileLine = tile ? `    tileImage: '/newsletters/${folder}/${tile}',\n` : ''
  const bodyBlock =
    `    body: \`\n` +
    `<img src="/newsletters/${folder}/hero.webp" alt="hero" />\n` +
    `<p>Body copy for ${slug}.</p>\n` +
    `<h2>News</h2>\n` +
    `<img src="/newsletters/${folder}/second.webp" alt="second" />\n` +
    `\`,\n`
  return (
    `  {\n` +
    `    slug: '${slug}',\n` +
    `    date: 'September 4, 2026',\n` +
    `    title: 'Title ${slug}',\n` +
    `    tag: 'AI & Hiring',\n` +
    `    excerpt:\n      'Excerpt for ${slug}.',\n` +
    (tileAfterBody ? bodyBlock + tileLine : tileLine + bodyBlock) +
    extra +
    `  },\n`
  )
}

const file = (...entries) =>
  `export interface Newsletter {\n  slug: string\n  body: string\n}\n\n` +
  `export const newsletters: Newsletter[] = [\n${entries.join('')}]\n`

console.log('latest-newsletter parser')

// 1. Baseline — tileImage before body, two entries.
expectPass(
  'parses the newest entry when tileImage precedes body',
  file(
    entry({ slug: 'edition-87-post', folder: 'edition-87', tile: 'tile.webp' }),
    entry({ slug: 'edition-86-post', folder: 'edition-86' })
  ),
  (r) => {
    if (r.slug !== 'edition-87-post') return `slug was "${r.slug}"`
    if (r.body.includes('edition-86')) return 'body leaked the previous edition'
    if (r.tileImage !== '/newsletters/edition-87/tile.webp') return `tileImage was "${r.tileImage}"`
    return null
  }
)

// 2. THE REGRESSION: tileImage after body. The old regex silently returned
//    edition 87 + edition 86 concatenated. Field order must not matter now.
expectPass(
  'parses correctly when tileImage FOLLOWS body (the #87 bug)',
  file(
    entry({ slug: 'edition-87-post', folder: 'edition-87', tile: 'tile.webp', tileAfterBody: true }),
    entry({ slug: 'edition-86-post', folder: 'edition-86' })
  ),
  (r) => {
    if (r.slug !== 'edition-87-post') return `slug was "${r.slug}"`
    if (r.body.includes('edition-86')) return 'body leaked the previous edition — the bug is back'
    if (r.tileImage !== '/newsletters/edition-87/tile.webp') return `tileImage was "${r.tileImage}"`
    return null
  }
)

// 3. A single entry with no following edition still parses.
expectPass(
  'parses a single-entry array',
  file(entry({ slug: 'only-post', folder: 'edition-87' })),
  (r) => (r.slug === 'only-post' ? null : `slug was "${r.slug}"`)
)

// 4. Braces and backticks inside the HTML body must not confuse the scanner.
expectPass(
  'survives braces and quotes inside the body HTML',
  file(
    `  {\n` +
    `    slug: 'tricky',\n    date: 'September 4, 2026',\n    title: 'Tricky',\n` +
    `    body: \`\n<p>CSS looks like { color: red } and code like if (x) { y() }</p>\n` +
    `<p>An apostrophe's fine, "quotes" too, and a // slash.</p>\n` +
    `<img src="/newsletters/edition-87/a.webp" alt="a" />\n\`,\n  },\n`,
    entry({ slug: 'older', folder: 'edition-86' })
  ),
  (r) => {
    if (r.slug !== 'tricky') return `slug was "${r.slug}"`
    if (r.body.includes('edition-86')) return 'body leaked the previous edition'
    return null
  }
)

// 5. Cross-edition image paths are rejected outright.
expectThrow(
  'rejects a body referencing two edition folders',
  file(
    `  {\n    slug: 'mixed',\n    date: 'September 4, 2026',\n    title: 'Mixed',\n` +
    `    body: \`\n<img src="/newsletters/edition-87/a.webp" alt="a" />\n` +
    `<img src="/newsletters/edition-86/b.webp" alt="b" />\n\`,\n  },\n`
  ),
  /different edition folders/
)

// 6. A tileImage pointing at another edition's folder is rejected.
expectThrow(
  'rejects a tileImage from a different edition folder',
  file(
    `  {\n    slug: 'mismatched',\n    date: 'September 4, 2026',\n    title: 'Mismatched',\n` +
    `    tileImage: '/newsletters/edition-86/tile.webp',\n` +
    `    body: \`\n<img src="/newsletters/edition-87/a.webp" alt="a" />\n\`,\n  },\n`
  ),
  /tileImage points at/
)

// 7. Missing required fields fail loudly rather than sending a blank email.
expectThrow(
  'rejects an entry with no body',
  file(`  {\n    slug: 'no-body',\n    date: 'September 4, 2026',\n    title: 'No Body',\n  },\n`),
  /missing "body"/
)

expectThrow(
  'rejects a file with no newsletters array',
  'export const something = []\n',
  /Could not find/
)

// 8. Sponsor assets live outside /newsletters/ and must not trip the check.
expectPass(
  'allows /sponsors/ paths alongside edition assets',
  file(
    `  {\n    slug: 'sponsored',\n    date: 'September 4, 2026',\n    title: 'Sponsored',\n` +
    `    body: \`\n<img src="/sponsors/perfecthire.webp" alt="sponsor" />\n` +
    `<img src="/newsletters/edition-87/a.webp" alt="a" />\n\`,\n  },\n`
  ),
  (r) => (r.slug === 'sponsored' ? null : `slug was "${r.slug}"`)
)

console.log('')
if (failures) {
  console.error(`${failures} test(s) failed.\n`)
  process.exit(1)
}
console.log('All parser tests passed.\n')
