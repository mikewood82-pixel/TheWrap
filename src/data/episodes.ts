// The Wrap Show — episode catalog. Append new episodes at the top.
// Each entry shows up on /show; the homepage hero embed is configured
// independently via LATEST_EPISODE_URL in src/pages/HomePage.tsx.

export interface Episode {
  number: number
  date: string
  title: string
  youtubeId: string
  /** Optional one-line description shown under the title in the list. */
  description?: string
  /** Optional newsletter slug this episode pairs with. */
  newsletterSlug?: string
}

export const episodes: Episode[] = [
  {
    number: 75,
    date: 'May 8, 2026',
    title: 'Application Inflation Is Devaluing Every Candidate',
    youtubeId: '5YGO7fRAn5M',
    description: '412% more applicants, 7% get a human eye — plus Greenhouse buys voice AI, iCIMS dresses up for the dance, ERIN goes free, and group Botox as team building.',
    newsletterSlug: 'application-inflation',
  },
  {
    number: 74,
    date: 'May 1, 2026',
    title: 'The ATS Napster Moment',
    youtubeId: 'tg1ST4OgzjM',
    description: 'The enterprise ATS market just had its Napster moment — and the platforms that bet on AI marketing instead of AI architecture are running out the clock.',
    newsletterSlug: 'ats-napster-moment',
  },
  {
    number: 73,
    date: 'April 24, 2026',
    title: 'Introducing the Expanded Wrap!',
    youtubeId: 'BehToAi0lk0',
    description: 'A full website launch, 1,000+ HR tech jobs, the Voices hub, and a Strait of Hormuz hot take from a 6-year-old.',
    newsletterSlug: 'introducing-the-expanded-wrap',
  },
  {
    number: 72,
    date: 'April 18, 2026',
    title: "HR Tech's Moviephone Moment",
    youtubeId: 'Agw6lq-_qFY',
    description: 'Why the prompt box is the future of enterprise software — and why your seventeen-step workflow menu is on borrowed time.',
    newsletterSlug: 'hr-techs-moviephone-moment',
  },
]
