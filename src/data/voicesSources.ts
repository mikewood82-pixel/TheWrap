// Curated HR tech voices powering the /voices hub.
//
// Ingest (scripts/voices-ingest.mjs) reads this list, pulls each feed, and
// POSTs items to /api/voices/ingest. The DB row is the source of truth at
// runtime — this file is the seed + the thing editors add new sources to.
//
// Editorial focus: named individuals, not publications. Every voice here is
// someone Mike reads personally.
//
// To add a voice:
//   1. Add a row here.
//   2. Next scheduled ingest picks it up and upserts into voices_sources.
//   3. If a feed 404s or parses badly, last_fetch_status on the DB row
//      surfaces the error — remove the row from this file to take it down.

export type VoiceKind = 'blog' | 'newsletter' | 'podcast' | 'video' | 'analyst'
export type FeedKind = 'rss' | 'atom' | 'youtube'

export interface VoiceSourceSeed {
  slug: string
  name: string
  kind: VoiceKind
  site_url: string
  feed_url: string
  feed_kind?: FeedKind   // defaults to 'rss'
  avatar_url?: string
  description?: string
}

export const voicesSources: VoiceSourceSeed[] = [
  {
    slug: 'josh-bersin',
    name: 'Josh Bersin',
    kind: 'analyst',
    site_url: 'https://joshbersin.com',
    feed_url: 'https://joshbersin.com/feed/',
    description: 'HR industry analysis from the Josh Bersin Company.',
  },
  {
    slug: 'tim-sackett',
    name: 'Tim Sackett',
    kind: 'blog',
    site_url: 'https://timsackett.com',
    feed_url: 'https://timsackett.com/feed/',
    description: 'HR + talent acquisition commentary.',
  },
  {
    slug: 'laurie-ruettimann',
    name: 'Laurie Ruettimann',
    kind: 'newsletter',
    site_url: 'https://laurieruettimann.substack.com',
    feed_url: 'https://laurieruettimann.substack.com/feed',
    description: 'Punk Rock HR \u2014 independent commentary on work.',
  },
  {
    slug: 'jess-von-bank',
    name: 'Jess Von Bank',
    kind: 'newsletter',
    site_url: 'https://jessvonbank.substack.com',
    feed_url: 'https://jessvonbank.substack.com/feed',
    description: 'Candid dispatches from the future of work.',
  },
  {
    slug: 'beacon-turn',
    name: 'Beacon Turn',
    kind: 'newsletter',
    site_url: 'https://news.beaconturn.com',
    feed_url: 'https://news.beaconturn.com/feed',
    description: 'Signal over noise for HR and talent leaders.',
  },
  {
    slug: 'recruiting-brainfood',
    name: 'Recruiting Brainfood',
    kind: 'newsletter',
    site_url: 'https://recruitingbrainfood.substack.com',
    feed_url: 'https://recruitingbrainfood.substack.com/feed',
    description: 'Hung Lee\u2019s weekly roundup for the recruiting community.',
  },
  {
    slug: 'robin-schooling',
    name: 'Robin Schooling',
    kind: 'newsletter',
    site_url: 'https://robinschooling.substack.com',
    feed_url: 'https://robinschooling.substack.com/feed',
    description: 'Words on Work \u2014 Robin Schooling on HR and leadership.',
  },
  {
    slug: 'trish-steed',
    name: 'Trish Steed',
    kind: 'newsletter',
    site_url: 'https://trishsteed.substack.com',
    feed_url: 'https://trishsteed.substack.com/feed',
    description: 'HR industry insight from the co-host of At Work in America.',
  },
  {
    slug: 'work-tech-weekly',
    name: 'Work Tech Weekly',
    kind: 'podcast',
    site_url: 'https://podcasts.apple.com/us/podcast/work-tech-weekly/id1867039410',
    feed_url: 'https://go.repcap.com/podcasts/204382303635/rss.xml',
    description: 'Steve Smith\u2019s weekly conversations on the business of HR tech.',
  },
  {
    slug: 'matt-charney',
    name: 'Matt Charney',
    kind: 'blog',
    site_url: 'https://mattcharney.com',
    feed_url: 'https://mattcharney.com/feed/',
    description: 'Snark Attack \u2014 pointed commentary on recruiting and HR tech.',
  },
]
