// Wrapline — occasional HR-tech news-magazine segments. Append new segments at
// the top. Unlike The Wrap Show, Wrapline has NO fixed cadence — segments drop
// when there's a story worth telling, so nothing here should imply a weekly
// schedule. The homepage band (src/pages/HomePage.tsx) reads wrapline[0]
// directly, so adding an entry here lights up the homepage automatically.

export interface WraplineSegment {
  number: number
  date: string
  title: string
  youtubeId: string
  /** Optional one-line description shown under the title in the list. */
  description?: string
  /** Optional newsletter slug this segment pairs with. */
  newsletterSlug?: string
}

export const wrapline: WraplineSegment[] = [
  {
    number: 1,
    date: 'June 2, 2026',
    title: 'Kristy McCann Built SkillCycle. Then Her Investor Took It',
    youtubeId: 'bJCsX7kVMxY',
    description:
      'The story of how SkillCycle founder Kristy McCann lost the company she built — and what it says about power, capital, and founders in HR tech.',
  },
]
