#!/usr/bin/env node
// Voices ingest runner — intended to run from GitHub Actions.
//
// Reads src/data/voicesSources.ts, fetches each source's RSS/Atom feed, parses
// items, and POSTs them to {SITE_URL}/api/voices/ingest (Bearer authed).
//
// Env:
//   SITE_URL              e.g. https://ilovethewrap.com
//   VOICES_INGEST_TOKEN   shared secret, must match Cloudflare env var
//
// Local: `npx wrangler pages dev dist` in one terminal, then:
//   SITE_URL=http://127.0.0.1:8788 VOICES_INGEST_TOKEN=... node scripts/voices-ingest.mjs

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

const SITE_URL            = process.env.SITE_URL?.replace(/\/$/, '')
const VOICES_INGEST_TOKEN = process.env.VOICES_INGEST_TOKEN
if (!SITE_URL)            { console.error('SITE_URL env required'); process.exit(1) }
if (!VOICES_INGEST_TOKEN) { console.error('VOICES_INGEST_TOKEN env required'); process.exit(1) }

// Drop items whose published_at is older than this; avoids bulk-backfilling old
// archives from sources we just added to the seed list.
const MAX_AGE_DAYS = 45
const EXCERPT_MAX = 280
const FETCH_TIMEOUT_MS = 15_000
// Parallel per-source fetches. Modest to stay polite to upstream hosts.
const FETCH_CONCURRENCY = 4

const run_id = `voices_run_${Date.now()}`
const started_at = new Date().toISOString()

// ---------- load seed list from TS file (no bundler) ----------
function loadSources() {
  const src = readFileSync(path.join(ROOT, 'src/data/voicesSources.ts'), 'utf8')
  const marker = 'voicesSources: VoiceSourceSeed[] = '
  const idx = src.indexOf(marker)
  if (idx < 0) throw new Error('voicesSources.ts: could not find assignment')
  // Search for the opening array bracket AFTER the marker so we skip the
  // `[]` inside `VoiceSourceSeed[]` type annotation.
  const start = src.indexOf('[', idx + marker.length)
  if (start < 0) throw new Error('voicesSources.ts: could not find array start')
  let depth = 0, end = start
  for (let i = start; i < src.length; i++) {
    const ch = src[i]
    if (ch === '[') depth++
    else if (ch === ']') { depth--; if (depth === 0) { end = i; break } }
  }
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${src.slice(start, end + 1)});`)()
}

// ---------- ingest HTTP ----------
async function postIngest(body) {
  const payload = JSON.stringify(body)
  let lastErr
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 2000))
    const r = await fetch(`${SITE_URL}/api/voices/ingest`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${VOICES_INGEST_TOKEN}`,
      },
      body: payload,
    })
    if (r.ok) return r.json()
    const text = await r.text().catch(() => '')
    lastErr = new Error(`ingest ${r.status}: ${text.slice(0, 500)}`)
    if (r.status < 500) break
    console.log(`  ! ingest ${r.status}, retrying in 2s...`)
  }
  throw lastErr
}

// ---------- feed fetch ----------
async function fetchFeed(url) {
  const ctrl = new AbortController()
  const to = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
  try {
    const r = await fetch(url, {
      headers: {
        'user-agent': 'TheWrapVoicesBot/1.0 (+https://ilovethewrap.com)',
        accept: 'application/rss+xml, application/atom+xml, application/xml;q=0.9, */*;q=0.8',
      },
      redirect: 'follow',
      signal: ctrl.signal,
    })
    if (!r.ok) throw new Error(`http ${r.status}`)
    const text = await r.text()
    return {
      text,
      etag: r.headers.get('etag'),
      last_modified: r.headers.get('last-modified'),
    }
  } finally {
    clearTimeout(to)
  }
}

// ---------- XML helpers (regex-based, good enough for well-formed feeds) ----------
function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, '&')
}

function stripTags(html) {
  return decodeEntities(
    html
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function extractCdataOrText(s) {
  if (!s) return ''
  const m = s.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)
  return m ? m[1] : s
}

function firstMatch(xml, tag) {
  // Match <tag ...>content</tag>, capturing content. Namespaced tags work too.
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i')
  const m = xml.match(re)
  return m ? m[1] : ''
}

function firstAttr(xml, tag, attr) {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i')
  const m = xml.match(re)
  return m ? m[1] : ''
}

function splitItems(xml, tag) {
  const out = []
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'gi')
  let m
  while ((m = re.exec(xml)) !== null) out.push(m[1])
  return out
}

function firstImageFromHtml(html) {
  const m = html.match(/<img[^>]+src="([^"]+)"/i)
  return m ? m[1] : null
}

function toIso(dateStr) {
  if (!dateStr) return null
  const t = new Date(dateStr)
  if (isNaN(t.getTime())) return null
  return t.toISOString()
}

function clampExcerpt(text) {
  const t = text.trim()
  if (t.length <= EXCERPT_MAX) return t
  const cut = t.slice(0, EXCERPT_MAX)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > EXCERPT_MAX - 60 ? cut.slice(0, lastSpace) : cut).trimEnd() + '\u2026'
}

// ---------- parsers ----------
function parseRss(xml) {
  const items = splitItems(xml, 'item')
  return items.map(body => {
    const title   = stripTags(firstMatch(body, 'title'))
    const link    = stripTags(firstMatch(body, 'link')) || firstAttr(body, 'link', 'href')
    const guidRaw = stripTags(firstMatch(body, 'guid')) || link
    const pubDate = stripTags(firstMatch(body, 'pubDate')) || stripTags(firstMatch(body, 'dc:date'))
    const contentEncoded = extractCdataOrText(firstMatch(body, 'content:encoded'))
    const descriptionRaw = extractCdataOrText(firstMatch(body, 'description'))
    const descText = stripTags(descriptionRaw)
    const author = stripTags(firstMatch(body, 'dc:creator')) || stripTags(firstMatch(body, 'author'))
    const enclosureImg = firstAttr(body, 'enclosure', 'url')
    const mediaImg     = firstAttr(body, 'media:content', 'url') || firstAttr(body, 'media:thumbnail', 'url')
    const htmlImg      = firstImageFromHtml(contentEncoded || descriptionRaw)
    return {
      guid: guidRaw,
      url: link,
      title,
      excerpt: descText ? clampExcerpt(descText) : null,
      image_url: enclosureImg || mediaImg || htmlImg || null,
      author: author || null,
      published_at: toIso(pubDate),
    }
  })
}

function parseAtom(xml) {
  const entries = splitItems(xml, 'entry')
  return entries.map(body => {
    const title = stripTags(firstMatch(body, 'title'))
    const link  = firstAttr(body, 'link', 'href') || stripTags(firstMatch(body, 'link'))
    const id    = stripTags(firstMatch(body, 'id')) || link
    const published = stripTags(firstMatch(body, 'published')) || stripTags(firstMatch(body, 'updated'))
    const summary = extractCdataOrText(firstMatch(body, 'summary'))
    const content = extractCdataOrText(firstMatch(body, 'content'))
    const text    = stripTags(summary || content)
    const authorBlock = firstMatch(body, 'author')
    const author = authorBlock ? stripTags(firstMatch(authorBlock, 'name')) : ''
    const mediaImg = firstAttr(body, 'media:thumbnail', 'url') || firstAttr(body, 'media:content', 'url')
    const htmlImg  = firstImageFromHtml(content || summary)
    return {
      guid: id,
      url: link,
      title,
      excerpt: text ? clampExcerpt(text) : null,
      image_url: mediaImg || htmlImg || null,
      author: author || null,
      published_at: toIso(published),
    }
  })
}

function parseFeed(feedKind, xml) {
  // Auto-detect: prefer the signal in the payload over the declared kind.
  const looksAtom = /<feed[\s>]/i.test(xml) && /<entry[\s>]/i.test(xml)
  const looksRss  = /<rss[\s>]/i.test(xml) || /<channel[\s>]/i.test(xml)
  if (looksAtom) return parseAtom(xml)
  if (looksRss)  return parseRss(xml)
  // Fallback to declared kind
  if (feedKind === 'atom' || feedKind === 'youtube') return parseAtom(xml)
  return parseRss(xml)
}

// ---------- main ----------
async function main() {
  console.log(`[${started_at}] voices ingest ${run_id}`)
  const seeds = loadSources()
  console.log(`loading ${seeds.length} voice source(s)`)

  // 1) Upsert seed sources so voices_sources stays aligned with the TS file.
  const sources = seeds.map(s => ({
    slug: s.slug,
    name: s.name,
    kind: s.kind,
    site_url: s.site_url,
    feed_url: s.feed_url,
    feed_kind: s.feed_kind ?? 'rss',
    avatar_url: s.avatar_url ?? null,
    description: s.description ?? null,
  }))
  await postIngest({ action: 'upsert_sources', run_id, sources })

  // 2) Fetch + parse + upsert per source.
  let sourcesOk = 0
  let sourcesErr = 0
  let itemsAdded = 0
  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 3600 * 1000

  const mapBatched = async (items, size, fn) => {
    for (let i = 0; i < items.length; i += size) {
      await Promise.all(items.slice(i, i + size).map(fn))
    }
  }

  await mapBatched(seeds, FETCH_CONCURRENCY, async (s) => {
    try {
      const { text, etag, last_modified } = await fetchFeed(s.feed_url)
      const rawItems = parseFeed(s.feed_kind ?? 'rss', text)
      const items = rawItems
        .filter(it => it.url && it.title && it.guid && it.published_at)
        .filter(it => new Date(it.published_at).getTime() >= cutoff)

      await postIngest({
        action: 'upsert_items',
        run_id,
        source_slug: s.slug,
        items,
        fetch_status: 'ok',
        etag,
        last_modified,
      })
      sourcesOk++
      itemsAdded += items.length
      console.log(`  ok  ${s.slug}  (${items.length} items, parsed ${rawItems.length})`)
    } catch (err) {
      sourcesErr++
      const msg = String(err?.message ?? err).slice(0, 200)
      console.log(`  ERR ${s.slug}: ${msg}`)
      // Record error bookkeeping so /voices admins can see which feeds are broken.
      try {
        await postIngest({
          action: 'upsert_items',
          run_id,
          source_slug: s.slug,
          items: [],
          fetch_status: `error:${msg}`,
          etag: null,
          last_modified: null,
        })
      } catch { /* swallow — finalize still runs */ }
    }
  })

  // 3) Finalize run bookkeeping.
  await postIngest({
    action: 'finalize',
    run_id,
    started_at,
    sources_ok: sourcesOk,
    sources_err: sourcesErr,
    items_added: itemsAdded,
  })

  console.log(`[${new Date().toISOString()}] done — ok=${sourcesOk} err=${sourcesErr} items=${itemsAdded}`)
}

main().catch(err => {
  console.error('voices ingest failed:', err)
  process.exit(1)
})
