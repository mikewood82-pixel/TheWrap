// Single source of truth for pulling the latest edition out of
// src/data/newsletters.ts.
//
// This used to be a regex, duplicated in three places:
//
//   /body:\s*`([\s\S]*?)`\s*,?\s*\n  \},/
//
// It required the body's closing backtick to be followed by `},`, so any field
// placed AFTER `body` in an entry meant the lazy match could not terminate at
// the end of that entry — it ran on and closed at the NEXT entry's backtick,
// silently appending the whole previous edition to the outgoing email.
//
// That happened on 2026-09-03: edition #87 put `tileImage` after `body` and the
// extracted body came out at 41,251 characters instead of 17,797, carrying all
// of edition #86 and its eight images. `tsc` and `vite build` both passed. Only
// a manual test send caught it, minutes before a 2,162-recipient broadcast.
//
// So: no regex for structure. We scan the source with a small state machine
// that understands quotes, template literals and comments, take the first
// top-level object in the array, and read fields from inside that object only.
// Field order cannot matter. Then we assert the result really is one edition.

import { readFileSync } from 'node:fs'

const ARRAY_DECL = 'export const newsletters: Newsletter[] = ['

/**
 * Walk `src` from `start` (the index of an opening brace) and return the index
 * just past its matching close brace. Understands '…', "…", `…` (including
 * ${…} interpolation), // line comments and /* block comments *\/, so braces
 * and quotes inside an HTML body can't throw off the count.
 */
function findObjectEnd(src, start) {
  let depth = 0
  // Stack of template-literal nesting depths, so ${ } inside `…` is tracked.
  const tmpl = []
  for (let i = start; i < src.length; i++) {
    const c = src[i]
    const next = src[i + 1]

    if (c === '\\') { i++; continue }

    if (c === '/' && next === '/') {
      i = src.indexOf('\n', i)
      if (i === -1) break
      continue
    }
    if (c === '/' && next === '*') {
      i = src.indexOf('*/', i + 2)
      if (i === -1) break
      i++
      continue
    }

    if (c === "'" || c === '"') {
      const quote = c
      for (i++; i < src.length; i++) {
        if (src[i] === '\\') { i++; continue }
        if (src[i] === quote) break
      }
      continue
    }

    if (c === '`') {
      // Consume the template literal, but stop at ${ so nested braces count.
      for (i++; i < src.length; i++) {
        if (src[i] === '\\') { i++; continue }
        if (src[i] === '`') break
        if (src[i] === '$' && src[i + 1] === '{') {
          tmpl.push(depth)
          depth++
          i++
          break
        }
      }
      continue
    }

    if (c === '{') { depth++; continue }
    if (c === '}') {
      depth--
      if (tmpl.length && depth === tmpl[tmpl.length - 1]) {
        // Closing a ${ } — resume the template literal that opened it.
        tmpl.pop()
        for (i++; i < src.length; i++) {
          if (src[i] === '\\') { i++; continue }
          if (src[i] === '`') break
          if (src[i] === '$' && src[i + 1] === '{') {
            tmpl.push(depth)
            depth++
            i++
            break
          }
        }
        continue
      }
      if (depth === 0) return i + 1
    }
  }
  throw new Error('Unbalanced braces: could not find the end of the first newsletter entry.')
}

/** Read a single-line string field (slug, date, title, tag, tileImage). */
function readString(entry, field) {
  const m = entry.match(
    new RegExp(`(?:^|[\\s,{])${field}\\s*:\\s*(['"\`])((?:\\\\.|(?!\\1)[\\s\\S])*)\\1`)
  )
  return m ? m[2] : undefined
}

/** Read the `body` template literal from within a single entry. */
function readBody(entry) {
  const at = entry.search(/(?:^|[\s,{])body\s*:\s*`/)
  if (at === -1) return undefined
  const open = entry.indexOf('`', at)
  for (let i = open + 1; i < entry.length; i++) {
    if (entry[i] === '\\') { i++; continue }
    if (entry[i] === '`') return entry.slice(open + 1, i)
  }
  throw new Error('Unterminated `body` template literal in the latest newsletter entry.')
}

/**
 * Parse the newest edition out of newsletters.ts source text.
 * Throws with a specific message rather than returning something half-right.
 */
export function parseLatestNewsletter(source) {
  const declAt = source.indexOf(ARRAY_DECL)
  if (declAt === -1) {
    throw new Error(`Could not find "${ARRAY_DECL}" in newsletters.ts.`)
  }

  const braceAt = source.indexOf('{', declAt + ARRAY_DECL.length)
  if (braceAt === -1) throw new Error('The newsletters array appears to be empty.')

  const entry = source.slice(braceAt, findObjectEnd(source, braceAt))

  const out = {
    slug: readString(entry, 'slug'),
    date: readString(entry, 'date'),
    title: readString(entry, 'title'),
    tag: readString(entry, 'tag'),
    tileImage: readString(entry, 'tileImage'),
    excerpt: readString(entry, 'excerpt'),
    body: readBody(entry)?.trim(),
  }

  for (const field of ['slug', 'date', 'title', 'body']) {
    if (!out[field]) throw new Error(`Latest newsletter entry is missing "${field}".`)
  }

  validateLatestNewsletter(out)
  return out
}

/**
 * Assert the parsed result is exactly one edition. These are the checks that
 * would have caught the #87 bleed; `tsc` and the Vite build both pass without
 * them.
 */
export function validateLatestNewsletter(n) {
  const problems = []

  // 1. Bleed into the next entry drags its object syntax along with it.
  if (/\n\s*\},\s*\n\s*\{/.test(n.body)) {
    problems.push('body contains an object boundary ("}," followed by "{") — it has run on into the next entry')
  }
  for (const field of ['slug:', 'excerpt:', 'tileImage:', 'body:']) {
    if (n.body.includes(`\n    ${field}`)) {
      problems.push(`body contains a literal "${field}" field declaration — it has run on into the next entry`)
    }
  }

  // 2. Every /newsletters/<dir>/ reference must point at one edition's folder.
  //    This is the direct tell: #87's bad body carried both edition-87/ and
  //    edition-86/ paths. /sponsors/ and other roots are deliberately ignored.
  const dirs = [...new Set(
    [...n.body.matchAll(/\/newsletters\/([^/"'\s)]+)\//g)].map(m => m[1])
  )]
  if (dirs.length > 1) {
    problems.push(`body references ${dirs.length} different edition folders (${dirs.join(', ')}) — it has run on into another edition`)
  }

  // 3. tileImage, when set, belongs to the same edition folder.
  if (n.tileImage && dirs.length === 1) {
    const tileDir = n.tileImage.match(/\/newsletters\/([^/]+)\//)?.[1]
    if (tileDir && tileDir !== dirs[0]) {
      problems.push(`tileImage points at "${tileDir}" but the body's images are in "${dirs[0]}"`)
    }
  }

  if (!n.body.includes('<')) {
    problems.push('body contains no HTML tags — that is almost certainly a parse failure')
  }

  if (problems.length) {
    throw new Error(
      `Latest newsletter ("${n.title}" / ${n.slug}) failed validation:\n` +
      problems.map(p => `  • ${p}`).join('\n') +
      '\n\nMost likely cause: a field was placed after "body" in the entry. ' +
      'Keep "body" last — see scripts/lib/latest-newsletter.mjs for why.'
    )
  }
}

/** Convenience wrapper: read the file and parse it. */
export function readLatestNewsletter(path = 'src/data/newsletters.ts') {
  return parseLatestNewsletter(readFileSync(path, 'utf8'))
}
