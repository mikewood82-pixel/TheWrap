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
    number: 81,
    date: 'June 26, 2026',
    title: 'Bread and Beer',
    youtubeId: '9WkuqiqoOgk',
    description: "The largest construction project of our lifetime — the AI data-center buildout — is hiring at both ends of the wage ladder: trades training at the bottom, AI-labeling at the top, and both lifelines terminate the day the thing they're building succeeds. The pyramids weren't built by slaves; they were built by paid workers who got bread and beer and walked away owning nothing. Plus Google's $50M skilled-trades pledge, Workvivo HQ, the Workday AI-bias class action that won't go away, more funding to kill the apply button (WhyBrilliant, Orbio, Fika Jobs, Niural), Laurie Ruettimann on saying no to money, and Susan Hanold on redesigning the entry-level role.",
    newsletterSlug: 'we-know-where-were-going',
  },
  {
    number: 80,
    date: 'June 19, 2026',
    title: 'The Graveyard of Sameness',
    youtubeId: '02U5vqIpsSM',
    description: "Chipotle shrank the burrito and Pizza Hut became a $2.7B private-equity headstone — because brands don't die in one bad decision, they die of a thousand sensible cuts toward the average, and AI is the most powerful averaging machine ever built. Plus a 'strong' labor market where your paycheck didn't get the memo, the Wrap Underemployment Index at 71.4, Phenom's agents inside ServiceNow, Meta's trades-training job guarantee, Indeed making you pay to be seen, PwC's two-tier AI Jobs Barometer, Oracle's agentic roadmap, 'Fear-Free Leave' with Rachel Wyngaard, and SpaceX buying Cursor for $60B.",
    newsletterSlug: 'the-graveyard-of-sameness',
  },
  {
    number: 79,
    date: 'June 5, 2026',
    title: 'The House Always Trades Up',
    youtubeId: 'G5blofPtNcY',
    description: "McDonald's launched a $9 burger and a $3 value menu with nothing in between — and employers are running the same barbell play on workers: premiumize the top, automate the bottom, hollow out the middle. Plus the premiere of Wrapline (the SkillCycle story), ZipRecruiter Smart Outreach, Joveo's prompt-box pivot, Connecticut's CART Act, a frozen JOLTS/ADP labor market, Oracle's 30K layoffs to fund AI, Lance Haun on 'tokenmaxxing,' and Jennifer Ravalli on why the human touch is the premium product.",
    newsletterSlug: 'the-house-always-trades-up',
  },
  {
    number: 78,
    date: 'May 29, 2026',
    title: 'Salt in the Eyes',
    youtubeId: 'XFkHdIrnO0M',
    description: "The courts are about to make vendors pay for AI hiring discrimination — while the EEOC moves to switch off the EEO-1 data that historically proved it. Plus Workday makes Gemini its default brain, the Mobley case clears another hurdle, JobGet/RippleMatch and Joblist/BOLD, Brian Fink on the Jevons Paradox, two AI-interview founders from Vegas, and the monkeys of Silver Springs.",
    newsletterSlug: 'salt-in-the-eyes',
  },
  {
    number: 77,
    date: 'May 22, 2026',
    title: 'Generation AI Graduates',
    youtubeId: 'usDNrqQEdvY',
    description: "Theo Baker's Stanford class is the first cohort to spend all four years alongside ChatGPT. We taught them work is a pure transaction — when the cycle turns and they get to choose, what will they be loyal to? Plus SAP's Autonomous Enterprise, OpenAI's $4B Deployment Company, Juicebox always-on sourcing, and Humanly's $25M.",
    newsletterSlug: 'generation-ai-graduates',
  },
  {
    number: 76,
    date: 'May 15, 2026',
    title: 'The Hiring Funnel Collapsed',
    youtubeId: 'kG7h1oKWUA8',
    description: "By 2030 your work agent runs the search while you sleep — the seven-stage hiring funnel collapses to three, and the only step left is two humans deciding if they want to work together. Plus Intuit drops QuickBooks Workforce, Workday goes where the workers are, Eightfold's TalentForge, Oracle's take-it-or-leave-it relocation, UKG goes full agentic on payroll, Ashby buys Talent Llama, and five April labor-market numbers.",
    newsletterSlug: 'hiring-funnel-collapsed',
  },
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
