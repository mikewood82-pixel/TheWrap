// Side-table augmenting vendorDetails with funding history + leadership data.
// Kept separate so the heavy public-record data doesn't bloat the editorial
// vendorDetails.ts file. Merged into VendorDetail at render time.
//
// IMPORTANT: figures and tenure data are based on public reporting
// (Crunchbase, SEC filings, LinkedIn, vendor press releases) as of
// 2026-04. Verify before publishing for any vendor before pulling these
// into customer-facing surfaces beyond the deep-dive page.

import type { FundingRound, LeadershipMember, SupportIssueBreakdown } from './vendorDetails'

export type FundingProfile = {
  history: FundingRound[]
  totalRaised?: string
  lastValuation?: string
}

export type SupportProfile = {
  issueBreakdown: SupportIssueBreakdown[]
  sentimentTrend: number[]   // 12 months of 0-100 sentiment scores
}

export const fundingProfileBySlug: Record<string, FundingProfile> = {
  'workday': {
    history: [
      { round: 'Series A', date: 'Jan 2008', amount: '$15M', leadInvestor: 'Greylock' },
      { round: 'Series B', date: 'Aug 2008', amount: '$30M', leadInvestor: 'New Enterprise Associates' },
      { round: 'Series C', date: 'Jun 2009', amount: '$75M', leadInvestor: 'New Enterprise Associates' },
      { round: 'Series D', date: 'Oct 2011', amount: '$85M', leadInvestor: 'T. Rowe Price' },
      { round: 'IPO',      date: 'Oct 2012', amount: 'IPO',  leadInvestor: 'NYSE: WDAY', valuation: '$9.5B at IPO' },
    ],
    totalRaised: '$205M (pre-IPO)',
    lastValuation: '$58B market cap (Apr 2026)',
  },

  'rippling': {
    history: [
      { round: 'Seed',     date: 'May 2017', amount: '$11.7M', leadInvestor: 'Initialized Capital' },
      { round: 'Series A', date: 'Aug 2019', amount: '$45M',   leadInvestor: 'Kleiner Perkins' },
      { round: 'Series B', date: 'May 2021', amount: '$145M',  leadInvestor: 'Founders Fund', valuation: '$1.35B' },
      { round: 'Series C', date: 'Oct 2021', amount: '$250M',  leadInvestor: 'Sequoia',        valuation: '$6.5B' },
      { round: 'Series D', date: 'May 2022', amount: '$250M',  leadInvestor: 'Founders Fund',  valuation: '$11.25B' },
      { round: 'Series E', date: 'Apr 2024', amount: '$200M',  leadInvestor: 'Founders Fund',  valuation: '$13.5B' },
      { round: 'Series G', date: 'May 2025', amount: '$450M',  leadInvestor: 'Sands Capital',  valuation: '$16.8B' },
    ],
    totalRaised: '~$1.35B',
    lastValuation: '$16.8B (May 2025)',
  },

  'bamboohr': {
    history: [
      { round: 'Series A', date: 'Apr 2014', amount: '$1.4M',  leadInvestor: 'Pelion Venture Partners' },
      { round: 'Series B', date: 'Sep 2018', amount: 'Undisclosed', leadInvestor: 'BainCapital Tech Opps' },
      { round: 'Series C', date: 'Mar 2022', amount: 'Undisclosed', leadInvestor: 'Vista Equity Partners' },
    ],
    totalRaised: 'Undisclosed (majority Vista-owned)',
    lastValuation: 'Private',
  },

  'adp': {
    history: [
      { round: 'IPO', date: 'Sep 1961', amount: 'IPO', leadInvestor: 'NASDAQ: ADP', valuation: '$4M at IPO' },
    ],
    totalRaised: 'Public since 1961',
    lastValuation: '$120B+ market cap (Apr 2026)',
  },

  'greenhouse': {
    history: [
      { round: 'Series A', date: 'Mar 2014', amount: '$7.5M',  leadInvestor: 'Benchmark' },
      { round: 'Series B', date: 'Dec 2014', amount: '$13.6M', leadInvestor: 'Benchmark' },
      { round: 'Series C', date: 'Jul 2016', amount: '$35M',   leadInvestor: 'Riverwood Capital' },
      { round: 'Series D', date: 'Sep 2018', amount: '$50M',   leadInvestor: 'Riverwood Capital' },
      { round: 'Acquired', date: 'May 2021', amount: 'Undisclosed', leadInvestor: 'TPG Capital', valuation: 'Estimated $500M' },
    ],
    totalRaised: '$110M+ pre-acquisition',
    lastValuation: 'Private (TPG portfolio)',
  },

  'lever': {
    history: [
      { round: 'Seed',     date: 'Mar 2013', amount: '$2.1M',  leadInvestor: 'Y Combinator' },
      { round: 'Series A', date: 'Jul 2014', amount: '$10M',   leadInvestor: 'Matrix Partners' },
      { round: 'Series B', date: 'Jul 2016', amount: '$20M',   leadInvestor: 'Matrix Partners' },
      { round: 'Series C', date: 'Mar 2019', amount: '$30M',   leadInvestor: 'Adams Street' },
      { round: 'Acquired', date: 'Apr 2022', amount: 'Undisclosed', leadInvestor: 'Employ Inc (K1)' },
    ],
    totalRaised: '$73M pre-acquisition',
    lastValuation: 'Private (Employ Inc subsidiary)',
  },

  'ashby': {
    history: [
      { round: 'Seed',     date: 'Jul 2020', amount: '$3.5M',  leadInvestor: 'Y Combinator' },
      { round: 'Series A', date: 'Mar 2022', amount: '$15.3M', leadInvestor: 'YC + Lightspeed' },
      { round: 'Series B', date: 'Aug 2023', amount: '$30M',   leadInvestor: 'F-Prime Capital', valuation: '$200M' },
      { round: 'Series C', date: 'Jun 2024', amount: '$30M',   leadInvestor: 'Lachy Groom' },
      { round: 'Series D', date: '2025',     amount: '$50M',   leadInvestor: 'Undisclosed' },
    ],
    totalRaised: '~$129M',
    lastValuation: 'Undisclosed (Series D, 2025)',
  },

  'lattice': {
    history: [
      { round: 'Seed',     date: 'Jan 2017', amount: '$3.4M',  leadInvestor: 'Khosla Ventures' },
      { round: 'Series A', date: 'Aug 2018', amount: '$15M',   leadInvestor: 'Founders Fund' },
      { round: 'Series B', date: 'May 2019', amount: '$15M',   leadInvestor: 'Shasta Ventures' },
      { round: 'Series C', date: 'Sep 2020', amount: '$45M',   leadInvestor: 'Tiger Global' },
      { round: 'Series E', date: 'Mar 2022', amount: '$175M',  leadInvestor: 'Thrive Capital',  valuation: '$3B' },
    ],
    totalRaised: '~$328M',
    lastValuation: '$3B (Mar 2022)',
  },

  'gusto': {
    history: [
      { round: 'Series A', date: 'Apr 2014', amount: '$20M',   leadInvestor: 'General Catalyst' },
      { round: 'Series B', date: 'Apr 2015', amount: '$60M',   leadInvestor: 'Google Capital' },
      { round: 'Series C', date: 'Sep 2018', amount: '$140M',  leadInvestor: 'T. Rowe Price' },
      { round: 'Series D', date: 'Jul 2019', amount: '$200M',  leadInvestor: 'Fidelity',       valuation: '$3.8B' },
      { round: 'Series E', date: 'Aug 2021', amount: '$175M',  leadInvestor: 'Generation IM',  valuation: '$9.5B' },
    ],
    totalRaised: '~$675M',
    lastValuation: '$9.5B (Aug 2021)',
  },

  'deel': {
    history: [
      { round: 'Seed',     date: 'May 2019', amount: '$4.7M',  leadInvestor: 'A.Capital' },
      { round: 'Series A', date: 'Sep 2020', amount: '$14M',   leadInvestor: 'Andreessen Horowitz' },
      { round: 'Series B', date: 'Apr 2021', amount: '$50M',   leadInvestor: 'Andreessen Horowitz' },
      { round: 'Series C', date: 'Oct 2021', amount: '$425M',  leadInvestor: 'Coatue',          valuation: '$5.5B' },
      { round: 'Series D', date: 'May 2022', amount: '$50M',   leadInvestor: 'Coatue',          valuation: '$12B' },
    ],
    totalRaised: '~$680M',
    lastValuation: '$12B (May 2022)',
  },

  'hibob': {
    history: [
      { round: 'Seed',     date: 'Sep 2015', amount: '$8M',    leadInvestor: 'Bessemer Venture Partners' },
      { round: 'Series A', date: 'Sep 2018', amount: '$17.5M', leadInvestor: 'Battery Ventures' },
      { round: 'Series B', date: 'Sep 2020', amount: '$70M',   leadInvestor: 'Bessemer' },
      { round: 'Series C', date: 'Oct 2021', amount: '$150M',  leadInvestor: 'General Atlantic', valuation: '$1.65B' },
      { round: 'Series D', date: 'Aug 2022', amount: '$150M',  leadInvestor: 'General Atlantic', valuation: '$2.45B' },
    ],
    totalRaised: '~$425M',
    lastValuation: '$2.45B (Aug 2022)',
  },

  'paylocity': {
    history: [
      { round: 'IPO', date: 'Mar 2014', amount: 'IPO', leadInvestor: 'NASDAQ: PCTY', valuation: '$870M at IPO' },
    ],
    totalRaised: 'Public since 2014',
    lastValuation: '$10B+ market cap (Apr 2026)',
  },

  'culture-amp': {
    history: [
      { round: 'Series A', date: 'Aug 2015', amount: '$6.3M',  leadInvestor: 'Felicis' },
      { round: 'Series B', date: 'Mar 2017', amount: '$12M',   leadInvestor: 'Index Ventures' },
      { round: 'Series C', date: 'Jul 2018', amount: '$40M',   leadInvestor: 'Index Ventures' },
      { round: 'Series E', date: 'Sep 2019', amount: '$82M',   leadInvestor: 'Sequoia China',   valuation: '$1B' },
      { round: 'Series F', date: 'Jul 2021', amount: '$100M',  leadInvestor: 'TDM Growth',      valuation: '$1.5B' },
    ],
    totalRaised: '~$258M',
    lastValuation: '$1.5B (Jul 2021)',
  },

  '15five': {
    history: [
      { round: 'Seed',     date: 'Mar 2013', amount: '$1M',    leadInvestor: 'Point Nine' },
      { round: 'Series A', date: 'Mar 2017', amount: '$8.2M',  leadInvestor: 'Origin Ventures' },
      { round: 'Series B', date: 'Sep 2019', amount: '$30.7M', leadInvestor: 'Next47' },
      { round: 'Series C', date: 'Jul 2021', amount: '$52M',   leadInvestor: 'Next47',          valuation: '$300M+' },
    ],
    totalRaised: '~$92M',
    lastValuation: '$300M+ (Jul 2021)',
  },

  'personio': {
    history: [
      { round: 'Seed',     date: 'Apr 2016', amount: '$1.7M',  leadInvestor: 'Picus Capital' },
      { round: 'Series A', date: 'Apr 2018', amount: '$12M',   leadInvestor: 'Northzone' },
      { round: 'Series B', date: 'Sep 2019', amount: '$40M',   leadInvestor: 'Index Ventures' },
      { round: 'Series C', date: 'Jan 2021', amount: '$125M',  leadInvestor: 'Index + Meritech', valuation: '$1.7B' },
      { round: 'Series D', date: 'Oct 2021', amount: '$270M',  leadInvestor: 'Greenoaks',        valuation: '$6.3B' },
      { round: 'Series E', date: 'Jun 2022', amount: '$200M',  leadInvestor: 'Greenoaks',        valuation: '$8.5B' },
    ],
    totalRaised: '~$650M',
    lastValuation: '$8.5B (Jun 2022)',
  },

  // Last verified: 2026-05-04
  'paycom': {
    history: [
      { round: 'PE Buyout', date: 'Jul 2007', amount: '$56M',  leadInvestor: 'Welsh, Carson, Anderson & Stowe' },
      // low confidence: $100M = gross IPO offering size; net proceeds to Paycom were ~$64.3M
      { round: 'IPO',       date: 'Apr 2014', amount: '$100M', leadInvestor: 'NYSE: PAYC' },
    ],
    totalRaised: '$56M PE buyout + $100M IPO',
    lastValuation: '$6.29B market cap (1 May 2026)',
  },
}

export const leadershipBySlug: Record<string, LeadershipMember[]> = {
  'workday': [
    { name: 'Aneel Bhusri',  role: 'CEO',             tenureYears: 0.2, prior: 'Co-founder; returned Feb 2026' },
    { name: 'Carl Eschenbach', role: 'CEO', tenureYears: 2, prior: 'VMware COO', departed: 'Departed Feb 2026' },
    { name: 'Sayan Chakraborty', role: 'CTO',         tenureYears: 4,   prior: 'Workday Engineering EVP' },
    { name: 'Ashley Goldsmith', role: 'CHRO',         tenureYears: 12,  prior: 'Polycom CHRO' },
    { name: 'Pete Schlampp', role: 'Head of Product', tenureYears: 2,   prior: 'Workday Analytics GM' },
    { name: 'Zane Rowe',     role: 'CFO',             tenureYears: 1.5, prior: 'VMware CFO' },
  ],

  'rippling': [
    { name: 'Parker Conrad',     role: 'CEO',             tenureYears: 9,   prior: 'Founded Zenefits (CEO 2013-2016)' },
    { name: 'Prasanna Sankar',   role: 'CTO',             tenureYears: 9,   prior: 'Co-founder; ex-Bessemer' },
    { name: 'Adam Swiecicki',    role: 'CFO',             tenureYears: 2,   prior: 'Brex CFO' },
    { name: 'Matt Plank',        role: 'CRO',             tenureYears: 4,   prior: 'Rippling SVP Sales' },
    { name: 'Jen Cohen Crompton', role: 'CHRO',           tenureYears: 0.6, prior: 'Snowflake VP People' },
  ],

  'bamboohr': [
    { name: 'Brad Rencher',  role: 'CEO',             tenureYears: 4,   prior: 'Adobe EVP Digital Experience' },
    { name: 'Ryan Sanders',  role: 'Co-founder',      tenureYears: 16,  prior: 'BambooHR Co-founder' },
    { name: 'Cassie Whitlock', role: 'CHRO',          tenureYears: 6,   prior: 'BambooHR HR Director' },
    { name: 'Dan Schoenbaum', role: 'CRO',            tenureYears: 0.4, prior: 'Riverbed CRO' },
  ],

  'adp': [
    { name: 'Maria Black',   role: 'CEO',             tenureYears: 3,   prior: 'ADP President' },
    { name: 'Don McGuire',   role: 'CHRO',            tenureYears: 5,   prior: 'ADP CMO' },
    { name: 'Sreeni Kutam',  role: 'President of Global HR & Talent', tenureYears: 4, prior: 'ADP CHRO' },
    { name: 'Vipul Nagrath', role: 'CIO',             tenureYears: 7,   prior: 'Bloomberg Global Head of Engineering' },
    { name: 'Peter Hadley',  role: 'CFO',             tenureYears: 6,   prior: 'ADP SVP Finance' },
  ],

  'greenhouse': [
    { name: 'Daniel Chait',  role: 'CEO',             tenureYears: 13,  prior: 'Co-founder' },
    { name: 'Jon Stross',    role: 'President',       tenureYears: 13,  prior: 'Co-founder' },
    { name: 'Tahmid Choudhury', role: 'CTO',          tenureYears: 5,   prior: 'Greenhouse VP Engineering' },
    { name: 'Carin Van Vuuren', role: 'CMO',          tenureYears: 3,   prior: 'Selligent Marketing Cloud CMO' },
  ],

  'lever': [
    { name: 'Jerry Jao',     role: 'CEO (Employ Inc., parent)', tenureYears: 0.2, prior: 'Appointed Feb 2026' },
    { name: 'Nate Smith',    role: 'CEO',             tenureYears: 3,   prior: 'Lever VP Product', departed: 'Departed Nov 2022' },
    { name: 'Sarah Nahm',    role: 'Founder',         tenureYears: 11,  prior: 'Lever co-founder; stepped back from CEO 2018' },
    { name: 'Allison Robinson', role: 'CRO',          tenureYears: 2,   prior: 'Mother\'s Quest Founder' },
  ],

  'ashby': [
    { name: 'Benji Encz',    role: 'CEO',             tenureYears: 6,   prior: 'Stripe Engineering Lead' },
    { name: 'Abhik Pramanik', role: 'CTO',            tenureYears: 6,   prior: 'Co-founder' },
    { name: 'Shannon Hogue', role: 'Head of People',  tenureYears: 1.5, prior: 'Karat VP People' },
  ],

  'lattice': [
    { name: 'Sarah Franklin', role: 'CEO',            tenureYears: 2.3, prior: 'Salesforce President & CMO' },
    { name: 'Jack Altman',   role: 'Founder',         tenureYears: 9,   prior: 'Lattice founder; stepped back from CEO Dec 2023' },
    { name: 'Ryan Hopkins',  role: 'CTO',             tenureYears: 4,   prior: 'Lattice VP Engineering' },
    { name: 'Cara Brennan Allamano', role: 'CHRO',    tenureYears: 3,   prior: 'Udemy CPO' },
  ],

  'gusto': [
    { name: 'Joshua Reeves', role: 'CEO',             tenureYears: 13,  prior: 'Co-founder' },
    { name: 'Tomer London', role: 'CPO',              tenureYears: 13,  prior: 'Co-founder' },
    { name: 'Mike Triplett', role: 'CRO',             tenureYears: 5,   prior: 'Box VP Sales' },
    { name: 'Lexi Reese',    role: 'COO', tenureYears: 6,    prior: 'Google Director', departed: 'Departed 2021' },
  ],

  'deel': [
    { name: 'Alex Bouaziz',  role: 'CEO',             tenureYears: 7,   prior: 'Co-founder' },
    { name: 'Shuo Wang',     role: 'CRO',             tenureYears: 7,   prior: 'Co-founder' },
    { name: 'Dan Westgarth', role: 'COO',             tenureYears: 5,   prior: 'Revolut Head of Ops' },
    { name: 'Stefania Tonarelli', role: 'CFO',        tenureYears: 2,   prior: 'Deel VP Finance' },
  ],

  'hibob': [
    { name: 'Ronni Zehavi',  role: 'CEO',             tenureYears: 11,  prior: 'Co-founder; ex-CEO Cotendo (acquired by Akamai)' },
    { name: 'Israel David',  role: 'Co-founder',      tenureYears: 11,  prior: 'Co-founder' },
    { name: 'Nirit Peled-Muntz', role: 'CHRO',        tenureYears: 5,   prior: 'HiBob VP People' },
    { name: 'Boaz Shvartz',  role: 'CTO',             tenureYears: 11,  prior: 'Co-founder' },
  ],

  'paylocity': [
    { name: 'Toby Williams', role: 'CEO',             tenureYears: 4,   prior: 'Paylocity COO' },
    { name: 'Ryan Glasgow',  role: 'CFO',             tenureYears: 2,   prior: 'Paylocity SVP Finance' },
    { name: 'Kelli Smith',   role: 'CHRO',            tenureYears: 3,   prior: 'Paylocity VP People' },
  ],

  'culture-amp': [
    { name: 'Caroline Rawlinson', role: 'CEO',        tenureYears: 0.3, prior: 'Appointed Jan 2026' },
    { name: 'Didier Elzinga', role: 'Executive Chairman', tenureYears: 14, prior: 'Co-founder; CEO 2010-2025' },
    { name: 'Doug English',  role: 'CTO',             tenureYears: 14,  prior: 'Co-founder' },
    { name: 'Pip Russell',   role: 'CHRO',            tenureYears: 4,   prior: 'Atlassian Head of People' },
  ],

  '15five': [
    { name: 'David Hassell', role: 'CEO',             tenureYears: 0.5, prior: 'Co-founder; returned as CEO Nov 2025' },
    { name: 'Shane Metcalf', role: 'Chief Culture Officer', tenureYears: 14, prior: 'Co-founder' },
    { name: 'Adam Weber',    role: 'CHRO',            tenureYears: 5,   prior: 'Emplify Co-founder' },
  ],

  'personio': [
    { name: 'Hanno Renner',  role: 'CEO',             tenureYears: 10,  prior: 'Co-founder' },
    { name: 'Roman Schumacher', role: 'CPO',          tenureYears: 10,  prior: 'Co-founder' },
    { name: 'Ross Seychell', role: 'CHRO',            tenureYears: 5,   prior: 'TransferWise CHRO' },
    { name: 'Florian Englmaier', role: 'CFO',         tenureYears: 0.7, prior: 'Snowflake EMEA CFO' },
  ],

  // Last verified: 2026-05-04
  'paycom': [
    { name: 'Chad Richison',       role: 'Chief Executive Officer and Chairman', tenureYears: 28.3, prior: 'Founded Paycom in 1998', linkedin: 'chadrichison' },
    { name: 'Shane Hadlock',       role: 'President and Chief Client Officer',   tenureYears: 0.2,  prior: 'Chief Client Officer and Chief Technology Officer of Paycom (Aug 2025 – Feb 2026)', linkedin: 'shane-hadlock-7091437' },
    { name: 'Bob Foster',          role: 'Chief Financial Officer',              tenureYears: 1.2,  prior: 'Chief Executive Officer of iiPay (2016 – Oct 2022)' },
    { name: 'Jeff York',           role: 'Chief Sales Officer',                  tenureYears: 0.3,  prior: 'Leadership Strategist at Paycom (2021 – Jan 2026)' },
    { name: 'Randy Peck',          role: 'Chief Operating Officer',              tenureYears: 1.9,  prior: 'Strategic Advisor to Executive Management at Paycom' },
    { name: 'Jason D. Clark',      role: 'Chief Administrative Officer',         tenureYears: 2.4,  prior: 'President and Chief Executive Officer of CompSource Mutual Insurance Company (2009 – 2023)' },
    { name: 'Jennifer Kraszewski', role: 'Chief Human Resources Officer',        tenureYears: 1.9,  prior: 'Senior Executive Vice President of Human Resources at Paycom', linkedin: 'jenniferkraszewski' },
    { name: 'Matt Paque',          role: 'Chief Legal Officer',                  tenureYears: 1.9,  prior: 'General Counsel at Paycom' },
    // low confidence: limited public data on Gannon's pre-Paycom background
    { name: 'Rachael Gannon',      role: 'Chief Automation Officer',             tenureYears: 0.7,  prior: 'Promoted to CAO Aug 2025 (Paycom internal)' },
    { name: 'Brad Smith',          role: 'Chief Information Officer',            tenureYears: 7.8,  prior: 'Director of Information Technology at Paycom', departed: 'Departed Oct 2025' },
  ],
}

// Support issue-volume breakdown by category. Each vendor's bucket sums
// to ~100. Sentiment trend is 12 months of 0-100 scores (Apr-prev → Apr-now).
// Editorial-aggregated from G2, Capterra, and Glassdoor support reviews.
export const supportProfileBySlug: Record<string, SupportProfile> = {
  'workday': {
    issueBreakdown: [
      { category: 'Implementation', volume: 32 },
      { category: 'Reporting',      volume: 24 },
      { category: 'Integrations',   volume: 18 },
      { category: 'Performance',    volume: 14 },
      { category: 'Billing',        volume: 12 },
    ],
    sentimentTrend: [70, 71, 69, 68, 70, 72, 73, 71, 70, 72, 71, 72],
  },
  'rippling': {
    issueBreakdown: [
      { category: 'Onboarding',    volume: 28 },
      { category: 'Integrations',  volume: 24 },
      { category: 'Payroll edge cases', volume: 22 },
      { category: 'Feature gaps',  volume: 16 },
      { category: 'Billing',       volume: 10 },
    ],
    sentimentTrend: [60, 62, 63, 64, 65, 66, 65, 67, 67, 68, 69, 68],
  },
  'bamboohr': {
    issueBreakdown: [
      { category: 'Reporting',     volume: 30 },
      { category: 'Payroll',       volume: 22 },
      { category: 'Integrations',  volume: 20 },
      { category: 'Feature requests', volume: 18 },
      { category: 'Billing',       volume: 10 },
    ],
    sentimentTrend: [85, 84, 85, 83, 82, 82, 81, 80, 81, 80, 81, 82],
  },
  'adp': {
    issueBreakdown: [
      { category: 'Tax filing',    volume: 26 },
      { category: 'Implementation',volume: 24 },
      { category: 'Customer service wait times', volume: 22 },
      { category: 'UI / UX',       volume: 16 },
      { category: 'Billing',       volume: 12 },
    ],
    sentimentTrend: [58, 57, 56, 58, 59, 58, 57, 58, 60, 59, 60, 61],
  },
  'greenhouse': {
    issueBreakdown: [
      { category: 'Reporting',     volume: 32 },
      { category: 'Integrations',  volume: 24 },
      { category: 'Configuration', volume: 18 },
      { category: 'Pricing tier limits', volume: 16 },
      { category: 'Billing',       volume: 10 },
    ],
    sentimentTrend: [78, 79, 78, 80, 79, 81, 80, 82, 81, 82, 83, 82],
  },
  'lever': {
    issueBreakdown: [
      { category: 'Search & filtering', volume: 28 },
      { category: 'Integrations',  volume: 24 },
      { category: 'Reporting',     volume: 20 },
      { category: 'Sourcing tools',volume: 16 },
      { category: 'Billing',       volume: 12 },
    ],
    sentimentTrend: [72, 71, 70, 71, 72, 73, 72, 73, 74, 73, 74, 75],
  },
  'ashby': {
    issueBreakdown: [
      { category: 'Onboarding',    volume: 26 },
      { category: 'Reporting depth',volume: 22 },
      { category: 'Integrations',  volume: 20 },
      { category: 'Feature gaps',  volume: 18 },
      { category: 'Pricing',       volume: 14 },
    ],
    sentimentTrend: [82, 83, 84, 85, 86, 87, 88, 88, 89, 89, 90, 91],
  },
  'lattice': {
    issueBreakdown: [
      { category: 'Reporting',     volume: 28 },
      { category: 'Goal-setting UX', volume: 24 },
      { category: 'Integrations',  volume: 18 },
      { category: 'Feature requests', volume: 18 },
      { category: 'Billing',       volume: 12 },
    ],
    sentimentTrend: [80, 80, 81, 82, 81, 80, 79, 78, 77, 76, 76, 75],
  },
  'gusto': {
    issueBreakdown: [
      { category: 'Customer service wait times', volume: 30 },
      { category: 'Tax filing',    volume: 24 },
      { category: 'Benefits admin',volume: 18 },
      { category: 'Reporting',     volume: 16 },
      { category: 'Billing',       volume: 12 },
    ],
    sentimentTrend: [78, 77, 76, 75, 74, 75, 76, 75, 74, 75, 76, 77],
  },
  'deel': {
    issueBreakdown: [
      { category: 'Country-specific compliance', volume: 30 },
      { category: 'Onboarding speed', volume: 22 },
      { category: 'Currency / payments', volume: 20 },
      { category: 'Feature requests', volume: 16 },
      { category: 'Billing',       volume: 12 },
    ],
    sentimentTrend: [82, 81, 80, 79, 78, 78, 79, 80, 79, 80, 81, 82],
  },
  'hibob': {
    issueBreakdown: [
      { category: 'Reporting depth', volume: 28 },
      { category: 'Integrations',  volume: 24 },
      { category: 'Workflow customization', volume: 20 },
      { category: 'Mobile app',    volume: 16 },
      { category: 'Billing',       volume: 12 },
    ],
    sentimentTrend: [82, 83, 83, 84, 85, 84, 85, 85, 86, 86, 87, 87],
  },
  'paylocity': {
    issueBreakdown: [
      { category: 'Implementation',volume: 26 },
      { category: 'Reporting',     volume: 22 },
      { category: 'Customer service responsiveness', volume: 20 },
      { category: 'UI / UX',       volume: 18 },
      { category: 'Billing',       volume: 14 },
    ],
    sentimentTrend: [73, 72, 71, 72, 73, 72, 71, 70, 71, 72, 73, 73],
  },
  'culture-amp': {
    issueBreakdown: [
      { category: 'Survey configuration', volume: 26 },
      { category: 'Reporting',     volume: 22 },
      { category: 'Integrations',  volume: 20 },
      { category: 'Translation / localization', volume: 18 },
      { category: 'Billing',       volume: 14 },
    ],
    sentimentTrend: [83, 84, 84, 85, 84, 85, 85, 86, 85, 86, 86, 87],
  },
  '15five': {
    issueBreakdown: [
      { category: 'Goal-setting workflows', volume: 26 },
      { category: 'Reporting',     volume: 24 },
      { category: 'Integrations',  volume: 20 },
      { category: 'Mobile app',    volume: 18 },
      { category: 'Billing',       volume: 12 },
    ],
    sentimentTrend: [80, 80, 81, 81, 82, 82, 82, 83, 83, 83, 84, 84],
  },
  'personio': {
    issueBreakdown: [
      { category: 'Country-specific localization', volume: 28 },
      { category: 'Reporting',     volume: 24 },
      { category: 'Integrations',  volume: 20 },
      { category: 'Workflow customization', volume: 16 },
      { category: 'Billing',       volume: 12 },
    ],
    sentimentTrend: [78, 79, 80, 80, 81, 81, 82, 81, 82, 83, 83, 84],
  },

  // Last verified: 2026-05-04. sentimentTrend is editorial estimate from
  // G2/Capterra/Trustpilot patterns; not from a single primary monthly tracker.
  'paycom': {
    issueBreakdown: [
      { category: 'Onboarding',       volume: 22 },
      { category: 'Integrations',     volume: 14 },
      { category: 'Billing',          volume: 12 },
      { category: 'Performance',      volume: 8  },
      { category: 'Feature requests', volume: 14 },
      { category: 'Documentation',    volume: 10 },
      { category: 'Bug reports',      volume: 20 },
    ],
    sentimentTrend: [62, 60, 58, 57, 55, 54, 56, 58, 59, 61, 63, 64],
  },
}

// When each vendor's profile was last verified against primary sources.
// Surfaced on the deep-dive page as a "Last verified: <date>" stamp so
// readers know when claims were last cross-checked. Format: 'YYYY-MM-DD'.
export const lastVerifiedBySlug: Record<string, string> = {
  'paycom': '2026-05-04',
}
