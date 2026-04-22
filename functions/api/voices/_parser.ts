// Minimal RSS 2.0 + Atom 1.0 parser, stdlib-only. Shared by the /refresh
// edge function. Handles the feed shapes we actually ingest \u2014 good enough
// for well-formed feeds, not a conformance-level parser.

export type FeedKind = 'rss' | 'atom' | 'youtube'

export interface ParsedItem {
  guid: string
  url: string
  title: string
  excerpt: string | null
  image_url: string | null
  author: string | null
  published_at: string   // ISO
}

const EXCERPT_MAX = 280

export function parseFeed(feedKind: FeedKind, xml: string): ParsedItem[] {
  const looksAtom = /<feed[\s>]/i.test(xml) && /<entry[\s>]/i.test(xml)
  const looksRss  = /<rss[\s>]/i.test(xml) || /<channel[\s>]/i.test(xml)
  if (looksAtom) return parseAtom(xml)
  if (looksRss)  return parseRss(xml)
  if (feedKind === 'atom' || feedKind === 'youtube') return parseAtom(xml)
  return parseRss(xml)
}

function parseRss(xml: string): ParsedItem[] {
  return splitItems(xml, 'item').map((body): ParsedItem => {
    const title   = stripTags(firstMatch(body, 'title'))
    const link    = stripTags(firstMatch(body, 'link')) || firstAttr(body, 'link', 'href')
    const guidRaw = stripTags(firstMatch(body, 'guid')) || link
    const pubDate = stripTags(firstMatch(body, 'pubDate')) || stripTags(firstMatch(body, 'dc:date'))
    const contentEncoded = extractCdataOrText(firstMatch(body, 'content:encoded'))
    const descriptionRaw = extractCdataOrText(firstMatch(body, 'description'))
    const descText = stripTags(descriptionRaw)
    const author = stripTags(firstMatch(body, 'dc:creator')) || stripTags(firstMatch(body, 'author'))
    // Podcast feeds don't carry a standard <enclosure type="image/...">; cover
    // art lives in <itunes:image href="..."/>. Prefer in order: generic
    // enclosure image (rare), media:content/thumbnail, iTunes image, first
    // <img> in the description HTML.
    const enclosureImg = firstAttr(body, 'enclosure', 'url')
    const mediaImg     = firstAttr(body, 'media:content', 'url') || firstAttr(body, 'media:thumbnail', 'url')
    const itunesImg    = firstAttr(body, 'itunes:image', 'href')
    const htmlImg      = firstImageFromHtml(contentEncoded || descriptionRaw)
    return {
      guid: guidRaw,
      url: link,
      title,
      excerpt: descText ? clampExcerpt(descText) : null,
      image_url: enclosureImg || mediaImg || itunesImg || htmlImg || null,
      author: author || null,
      published_at: toIso(pubDate) ?? '',
    }
  })
}

function parseAtom(xml: string): ParsedItem[] {
  return splitItems(xml, 'entry').map((body): ParsedItem => {
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
      published_at: toIso(published) ?? '',
    }
  })
}

// ---------- helpers ----------

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&amp;/g, '&')
}

function stripTags(html: string): string {
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

function extractCdataOrText(s: string): string {
  if (!s) return ''
  const m = s.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)
  return m ? m[1] : s
}

function firstMatch(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i')
  const m = xml.match(re)
  return m ? m[1] : ''
}

function firstAttr(xml: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i')
  const m = xml.match(re)
  return m ? m[1] : ''
}

function splitItems(xml: string, tag: string): string[] {
  const out: string[] = []
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'gi')
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) out.push(m[1])
  return out
}

function firstImageFromHtml(html: string): string | null {
  const m = html.match(/<img[^>]+src="([^"]+)"/i)
  return m ? m[1] : null
}

function toIso(dateStr: string): string | null {
  if (!dateStr) return null
  const t = new Date(dateStr)
  if (isNaN(t.getTime())) return null
  return t.toISOString()
}

function clampExcerpt(text: string): string {
  const t = text.trim()
  if (t.length <= EXCERPT_MAX) return t
  const cut = t.slice(0, EXCERPT_MAX)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > EXCERPT_MAX - 60 ? cut.slice(0, lastSpace) : cut).trimEnd() + '\u2026'
}
