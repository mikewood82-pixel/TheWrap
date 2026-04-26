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
