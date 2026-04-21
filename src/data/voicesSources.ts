// Curated HR tech voices powering the /voices hub.
//
// Ingest (scripts/voices-ingest.mjs) reads this list, pulls each feed, and
// POSTs items to /api/voices/ingest. The DB row is the source of truth at
// runtime — this file is the seed + the thing editors add new sources to.
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
    slug: 'hr-brew',
    name: 'HR Brew',
    kind: 'newsletter',
    site_url: 'https://www.hr-brew.com',
    feed_url: 'https://www.hr-brew.com/stories.rss',
    description: 'Morning Brew\u2019s daily HR newsletter.',
  },
  {
    slug: 'workology',
    name: 'Workology',
    kind: 'blog',
    site_url: 'https://workology.com',
    feed_url: 'https://workology.com/feed/',
    description: 'HR, recruiting, and workplace tech from Jessica Miller-Merrell.',
  },
  {
    slug: 'hr-executive',
    name: 'HR Executive',
    kind: 'blog',
    site_url: 'https://hrexecutive.com',
    feed_url: 'https://hrexecutive.com/feed/',
    description: 'News and strategy for senior HR leaders.',
  },
  {
    slug: 'laurie-ruettimann',
    name: 'Laurie Ruettimann',
    kind: 'blog',
    site_url: 'https://laurieruettimann.com',
    feed_url: 'https://laurieruettimann.com/feed/',
    description: 'Punk Rock HR \u2014 independent commentary on work.',
  },
  {
    slug: 'redthread-research',
    name: 'RedThread Research',
    kind: 'analyst',
    site_url: 'https://redthreadresearch.com',
    feed_url: 'https://redthreadresearch.com/feed/',
    description: 'Independent human capital research.',
  },
  {
    slug: 'fistful-of-talent',
    name: 'Fistful of Talent',
    kind: 'blog',
    site_url: 'https://fistfuloftalent.com',
    feed_url: 'https://fistfuloftalent.com/feed',
    description: 'Frank talent and HR commentary from a rotating crew of practitioners.',
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
    slug: 'hr-morning',
    name: 'HRMorning',
    kind: 'newsletter',
    site_url: 'https://www.hrmorning.com',
    feed_url: 'https://www.hrmorning.com/feed/',
    description: 'Daily HR news briefing.',
  },
  {
    slug: 'people-managing-people',
    name: 'People Managing People',
    kind: 'blog',
    site_url: 'https://peoplemanagingpeople.com',
    feed_url: 'https://peoplemanagingpeople.com/feed/',
    description: 'Practitioner-written HR leadership content.',
  },
  {
    slug: 'hrtechfeed',
    name: 'HR Tech Feed',
    kind: 'blog',
    site_url: 'https://hrtechfeed.com',
    feed_url: 'https://hrtechfeed.com/feed/',
    description: 'HR technology industry news aggregator.',
  },
  {
    slug: 'shrm',
    name: 'SHRM',
    kind: 'blog',
    site_url: 'https://www.shrm.org',
    feed_url: 'https://www.shrm.org/rss/topics/all-news.aspx',
    description: 'Society for Human Resource Management.',
  },
]
