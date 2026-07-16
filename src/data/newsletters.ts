export interface Sponsor {
  name: string      // "Acme HR"
  logo: string      // "/sponsors/acme.webp" — WebP or SVG, see public/sponsors/
  blurb: string     // 1–2 sentence value prop, sponsor-supplied
  url: string       // landing page
  cta?: string      // CTA label, defaults to "Learn more"
}

export interface Newsletter {
  slug: string
  date: string
  title: string
  tag: string
  excerpt: string
  body: string // HTML string
  sponsor?: Sponsor // optional — editions without a sponsor render no ad
  /**
   * Optional wide banner for the homepage "Latest Edition" tile (object-cover,
   * ~2.7:1). Use when the body hero is a tall/poster image whose center-crop cuts
   * off baked-in branding. Falls back to the first body image when omitted.
   */
  tileImage?: string
}

// Set to a Sponsor object when a sponsor is active; null when no active sponsor.
// This drives the website chrome only (homepage strip + /sponsorship). The Friday
// email is built from each edition's `body` HTML (scripts/deploy.mjs), so the
// in-edition sponsor callout is pasted as inline HTML in that edition's body —
// see docs/sponsors/perfecthire-edition-callout.html.
export const currentSponsor: Sponsor | null = null

export const newsletters: Newsletter[] = [
  {
    slug: 'are-we-all-just-a-number-now',
    date: 'July 16, 2026',
    title: 'Are We All Just a Number Now?',
    tag: 'AI & Future of Work',
    excerpt:
      'Leapsome shipped a “talent density score” that reduces every employee to a single number, with an AI flagging who’s quietly disengaged. We already run this play in hiring — and we know how that turned out. Black Mirror filmed the rest.',
    body: `
<img src="/newsletters/edition-81/leapsome-talent-density.webp" alt="Leapsome product screenshot: employee Lena Hartmann’s profile showing a Talent Density Score of 72, up 6 points, beside an AI suggestion box reading “Three engineers show early signs of disengagement.”" />

<p>You all know I look at press releases in our space each week, and just when I thought there wasn’t a lot to write about in mid-July (unless I can somehow conflate the Canadian wildfires to hiring pipelines), I came across a new release from Leapsome about their new “talent density” metric. This was a new term for me, so I went right to the website to see just what it is.</p>

<p>In the image above, an employee (Lena Hartmann) has a profile page, and on that page is a number for her Talent Density Score, 72. A solid C minus, but look at the positive as she’s up 6 points. Just below it, an AI suggestion box reports that “three engineers show early signs of disengagement” and recommends the manager start “growth conversations,” complete with a nice green checkmark.</p>

<p>But how were those engineers disengaged? Did the red flags appear once the system detected a disturbance in the force? The site notes that Leapsome unifies goals, reviews, feedback, surveys, and learning into one intelligent platform — so this score is essentially an aggregate of all of that. Ok, so they’ve reduced every employee to a proprietary number.</p>

<p>I’m not saying we don’t need to measure success. But are we really going to slap a magical number on employees now? We’re already doing it in hiring, and see how well that’s turned out. Applicants are scored according to how well they match the keywords of the job description, and if the organization has access to deeper people analytics tools, like Eightfold or Phenom, that score expands to include other personally identifiable information (PII) gathered across the web.</p>

<p>The teams behind hiring can always say “it’s just the computer looking at the data, it doesn’t create bias.” Well, just look at the Workday lawsuit to see the problem here. The system doesn’t have nuance. It doesn’t know if your employment gap was to care for a dying parent — it just knows you were out of the labor force and assumes the worst. And you know what happens when you assume? You get sued in the state of California.</p>

<p>So which business oracle came up with the latest tech buzzword? Turns out it’s Netflix. Reed Hastings built a whole management religion around talent density: a team’s performance isn’t the sum of its people, it’s the concentration of top performers. Pay top of market, run the keeper test, and cut the merely adequate with a generous check. This is the AI era’s version of Rank and Yank, except instead of dodging the yearly purge, it’s a real-time ranking of employees. It’s making your candidate match score continuous.</p>

<p>As we move to quantify everything, I have to ask: is this how people want to live? Your worth attached to a number?</p>

<p>If you want to see where this road goes, Black Mirror already filmed it. In <a href="https://www.imdb.com/title/tt5497778/">“Nosedive,”</a> Lacie Pound lives in a world where every human interaction gets rated out of five stars, and your running average determines everything — your apartment, your flight upgrades, whether the good hospital takes you. Lacie sits at a 4.2 and needs a 4.5 to qualify for the apartment she wants, so she starts performing niceness at everyone: the calibrated laugh, the rehearsed charm, rating everyone five stars and praying they reciprocate. Then one bad morning snowballs — a spilled coffee, a snippy exchange, a downrated outburst — and once she dips below the threshold, people stop seeing her. Not metaphorically. She can’t board the flight. She can’t enter the building. She’s the same person she was on Tuesday, but the number says otherwise, and the number is the only version of her anyone consults.</p>

<img src="/newsletters/edition-81/black-mirror-nosedive.webp" alt="Black Mirror “Nosedive”: Lacie Pound smiling in a bathrobe beside her 4.2 rating, and later mid-meltdown holding a microphone" />

<p>Now look back at Lena’s 72 and tell me we’re not building the workplace pilot episode. Because here’s what happens the day employees learn there’s a score: they stop being engaged and start performing engagement. Calibrated survey answers. Healthy-looking activity patterns. Never let the metrics dip in a way that draws a flag — because everyone will figure out real fast what that flag feeds into when layoff season arrives and somebody sorts the dashboard by score. Lacie’s rehearsed laugh, ported to your engagement survey.</p>

<p>Right now, Lena’s 72 lives inside one company’s walls. But look at what our industry has spent 2026 building: portable verified identity. The optimistic version is genuinely good — verified skills and work history that travel with you, killing resume fraud and repetitive background checks.</p>

<p>The dark version is that the judgments travel too. A disengagement flag. A low score. A “growth conversation” on the record. Following you from employer to employer like a credit score you’ve never seen and can’t dispute. That’s the part Nosedive got exactly right: the score wasn’t scary because it existed — it was scary because it was portable. Every stranger you met already knew your number before you said a word.</p>

<p>If that sounds paranoid, I’d point you first to your credit score, then to Mobley v. Workday, which we’ve been tracking for almost 2 years now. The reason that case matters is the court’s willingness to treat an AI vendor as an agent in the hiring decision — which means one vendor’s algorithm isn’t one company’s bad process, it’s a systemic gatekeeper operating across hundreds of employers simultaneously. One model’s inference about you, everywhere at once.</p>

<p>To be fair, managers already make these judgments — badly, on vibes and recency bias — and a system that nudges someone to actually go talk to a struggling engineer could be the good version of this. Nothing in the product forces the dark timeline. The same dashboard is a coaching aid at one company and a pre-sorted layoff list at another, and nothing in the software decides which one you’re buying.</p>

<p>But look around at your own life and see how much of it is already governed by a number you didn’t choose and can’t inspect. Your credit score decides your house. Your ATS score decides your job. Now your talent density score determines whether you keep it.</p>

<hr />

<p>On to the rest of the week in HR Tech News. This week’s Wrap features LinkedIn under investigation over ghost jobs, Eightfold creating an AI agent to lead you to the AI agent, iHire creating a job board for gigs, hot takes from James Ellis and Steve Smith, an interview with Orion Talent about hiring former military, and Gen Z pivoting to the trades.</p>

<p>Enjoy and have a great weekend!</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>Texas Investigates LinkedIn Over Fake Job Listings</h3>
<img src="/newsletters/edition-81/paxton-linkedin.webp" alt="Texas Attorney General Ken Paxton in a blue suit and orange tie, outdoors" />
<p><em>Texas Attorney General “Honest” Ken Paxton</em></p>
<p>Texas AG Ken Paxton opened an investigation into LinkedIn, issuing a Civil Investigative Demand over allegations the platform advertised and profited from fake or misleading job opportunities — “ghost jobs” — while marketing itself as a trusted platform for finding employment. The investigation is framed around premium subscribers ($40 a month!) and what people are getting for the service — besides learning who’s peepin’ on your profile.</p>
<p>Think about where that $40 a month is coming from — right from the light pockets of displaced workers, recent grads, and anyone desperate for a job. Selling hope to the unemployed at $40 a month while not independently verifying whether most listings represent an actual job is a genuinely ugly moneygrab, especially when independent estimates put ghost jobs at one-fifth to one-third of online listings. More and more we’re seeing an environment where candidates have stopped trusting the system and the system keeps giving them reasons.</p>
<p><a href="https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-investigates-linkedin-advertising-fake-and-misleading-job-opportunities">Read more</a>.</p>

<h3>Eightfold’s New AI Agent to Talk You Into the AI Interview</h3>
<img src="/newsletters/edition-81/eightfold-talent-agents.webp" alt="Eightfold.ai logo above an illustration of a man in a drawn graduation cap pointing at a thought bubble full of charts and diagrams" />
<p>Eightfold released Talent Agents 2.0, headlined by Candidate Agent — a conversational AI that replaces the application form (and the silence after it) with an adaptive, 24/7 conversation across SMS and WhatsApp in 24+ languages, handling job discovery, scheduling, status updates, and the handoff into its AI Interviewer. Also in the release: Avatar, a digital-human persona candidates will face during AI interviews, with 360 Interview (multiple interview types compressed into one AI-led session) coming end of July.</p>
<p><a href="https://finance.yahoo.com/technology/ai/articles/eightfold-ai-grows-talent-agents-170000877.html">Read more</a>.</p>

<h3>iHire Bets the Job Board Can Do Gigs Too</h3>
<img src="/newsletters/edition-81/ihire-freelance.webp" alt="A laptop on a desk showing a job search interface, surrounded by notebooks and pens" />
<p>iHire launched an industry-focused freelance marketplace connecting employers with vetted, U.S.-based independent contractors for defined, project-based work — a direct shot at the Upwork/Fiverr model, minus the global talent pool sprawl. The pitch leans on iHire’s existing footprint of 57 industry-specific talent networks (think iHireDental, iHireConstruction), betting that vertical focus beats gig-platform volume. Worth watching whether the industry-vertical angle actually differentiates or just fragments an already crowded gig market.</p>
<p><a href="https://www.prnewswire.com/news-releases/ihire-launches-industry-focused-freelance-marketplace-302824052.html">Read more</a>.</p>

<hr />

<h2>🔥 Hot Takes</h2>

<h3>The Obsolescence Map: What Does Leadership Think You Do All Day?</h3>
<img src="/newsletters/edition-81/obsolescence-map.webp" alt="“The Obsolescence Map” title art: a silhouetted head filled with machinery against a stylized city skyline" />
<p>James Ellis is one of the sharpest voices in employer brand, and his latest is great. His argument: the threat to recruiting isn’t that AI eliminates the function — it’s that your future gets set by what the business can see you doing, not what you actually do. He sorts TA work into four zones (automatable, administrative, advisory, strategic) and names the trap most teams are in: doing advisory and strategic work while leadership only sees dashboards and req movement. His fix isn’t a rebrand or a title change — it’s smuggling the strategic read inside the operational answers you’re already giving. Go read the whole thing, and follow James if you don’t already.</p>
<p>&rarr; <a href="https://choosable.ai/the-obsolescence-map">Read The Obsolescence Map</a></p>

<h3>Steve Smith: The AI Arms Race Is Confusing Speed With Productivity</h3>
<img src="/newsletters/edition-81/steve-smith-worktech.webp" alt="Two Starbucks baristas in green aprons laughing together while marking cups behind the counter" />
<p>RepCap’s Steve Smith uses his WorkTech Weekly to capture the whiplash of the current moment: product roadmaps compressed from 18 months to what feels like 18 days, and an OpenAI-vs.-Anthropic race he compares to WarGames simulating every World War III scenario in 30 seconds — winner: none. Check out the full edition and subscribe if you haven’t.</p>
<p>&rarr; <a href="https://www.linkedin.com/pulse/starbucks-says-coffee-vibe-coders-steve-smith-9toke/">Read Steve Smith’s WorkTech Weekly</a></p>

<hr />

<h2>🎙️ Podcast of the Week</h2>

<h3>Unlocking Military Talent: How Orion Talent Bridges the Gap</h3>
<img src="/newsletters/edition-81/orion-talent-podcast.webp" alt="Totally Talent podcast episode artwork: “Unlocking Military Talent: How Orion Talent Bridges the Gap” with guest Greg Summers" />
<p>Every year, roughly 200,000 service members transition out of the military into a civilian labor market that has no idea how to read their resumes. On this week’s <em>Totally Talent</em>, I sat down with Greg Summers, CEO of Orion Talent — the firm that’s been translating military experience into civilian hiring for 30+ years — to talk about what employers consistently get wrong about veteran talent, how skills-based hiring maps naturally onto military experience, and why the companies that figure this out get access to a disciplined, mission-driven talent pool everyone else is overlooking.</p>
<p>&rarr; <a href="https://www.hr.com/en/resources/podcasts/talent/unlocking-military-talent-how-orion-talent-bridges_mrneshl2.html">Listen to the episode</a></p>

<hr />

<h2>🖱️ Worth a Click</h2>

<h3>Gen Z’s AI-Proof Career Plan: Learn a Trade</h3>
<img src="/newsletters/edition-81/gen-z-trades.webp" alt="Trade school students gathered around a vehicle on a lift in an auto shop classroom" />
<p>The New York Times looks at Gen Z’s pivot from lecture halls to trade schools, and the logic is hard to argue with: nobody’s figured out how to get an LLM to rewire a panel or unclog a drain. Filed under the Style section, which tells you something about how quickly “learn to weld” went from career advice to cultural moment. Worth reading alongside the entry-level hiring crisis we’ve been tracking — the kids can see the same funnel collapse we can.</p>
<p><a href="https://www.nytimes.com/2026/07/13/style/gen-z-trade-school-careers-ai-college.html">Read more</a>.</p>

<hr />

<p><em>— The Wrap · ilovethewrap.com</em></p>
  `,
  },
  {
    slug: 'where-did-half-a-million-people-go',
    date: 'July 9, 2026',
    title: "Where Did Half a Million People Just Go? Most of Them Were Already Here.",
    tag: 'Labor Market',
    tileImage: '/newsletters/edition-80/wrap-80-cover-tile.webp',
    excerpt:
      'The June jobs report “improved” to 4.2% while half a million people quietly dropped out of the workforce — they didn’t stop looking, they were removed. Here’s where they went, why native workers aren’t backfilling, and why your facilities line feels it before payroll does.',
    body: `
<img src="/newsletters/edition-80/wrap-80-cover.webp" alt="The Wrap — HR Tech News: Uncovering the Truth Behind Work. Cover collage of farm workers, a dissolving silhouette, construction crews, a Help Wanted sign, June 2026 labor numbers, and a young adult at home." />

<p>Something is wrong with the June jobs report, and it isn't the usual unemployment figures. In June, according to the BLS, unemployment "dropped" a tenth of a percentage point to 4.2% and payrolls added a soft +57K. The headlines you see mostly point to things being pretty much the same. But hiding behind that headline, the household survey shows <strong>half a million fewer people employed than a month earlier</strong>.</p>

<p>Labor force participation is now 61.5%, the lowest since March 2021. And once you set aside the pandemic disruption — when the rate briefly cratered and clawed its way back through 2021 — 61.5% is the lowest participation has been in roughly half a century. Remember the last recession? Surprisingly, the post-2008 slump never took it below about 62.4%. The last time this share of Americans was genuinely on the sidelines outside a crisis, Gerald Ford was in the White House and Apple was still in a garage.</p>

<p>Half a million people were in the American workforce in May. They aren't in June. Where did they go? Let's dig into the data to rule out some assumptions.</p>

<img src="/newsletters/edition-80/half-million.webp" alt="The Wrap graphic: Unemployment Fell for the Wrong Reason — 4.3% to 4.2%, while 507,000 fewer people were employed and participation fell to 61.5%" />

<p>Is it due to retirements? No. If this were Boomers aging into Medicare, you'd see the damage concentrate at the top of the age range and leave the core alone. Yet, we're seeing the opposite. Prime-age participation, the 25-54 age crowd that is the load-bearing middle of the workforce, fell twice as fast as the overall number. Whatever pulled these people out, it went straight for the workers least likely to leave. (Side note: not the best seeing 90K older workers return to work, probably due to increased costs of living.)</p>

<p>Ok, so is AI to blame? Not really, at least not yet and not at this scale. For all the eulogies, including those I've written for The Wrap, the employment data still show no mass AI displacement event. You can find AI's fingerprints on slower entry-level growth for young workers in exposed occupations, but a bit less hiring at the bottom isn't 500K people vanishing from employment in 30 days.</p>

<p>So what is it? Remember the past year of immigration enforcement? It's showing up in the data. When people give up looking, BLS has a bucket for them — "discouraged workers." That count didn't move. Neither did the "marginally attached." These people didn't stop looking; they left the labor force entirely. But there is one group that is walking out in numbers big enough to bend the whole report: the foreign-born workforce is down roughly a million since January, with independent trackers putting the total population drop closer to two million.</p>

<p>Those jobs aren't being backfilled; they're gone. If native-born workers were stepping in, you'd see it — native participation rising, native unemployment falling, the hole closing. Instead, native participation is flat to falling over the same window. Nobody's rushing in. That's the difference between a market that's rebalancing and one that's contracting — this is subtraction, with no one behind them in line.</p>

<p>Turns out, we've already seen what happens in immigration crackdowns. In 2011, Georgia and Alabama took a hard stance and watched their crops rot. Sure, they got a few locals to fill in at two or three times the wage, but it was nowhere near enough. Pull these workers out and the work doesn't transfer. It just doesn't get done.</p>

<p>You've probably already seen the signs. If you touch construction, agriculture, food service, hospitality, warehousing, or home care, it shows up first in your facilities line, not payroll — every vendor and staffing agency you use just got more expensive to fulfill. And if you hire skilled immigrant talent — healthcare, engineering, STEM — it shows up in your pipeline: Indeed reports visa-sponsorship postings have tripled since before the pandemic while foreign interest in US jobs has slumped to a six-year low. Employers are shouting sponsorship offers into a room that's emptying out.</p>

<p>Back on June 5, I wrote about the barbell economy — premiumize the top, automate the bottom, hollow out the middle. This is the labor-side cut of the same play. The bottom rung isn't being automated away; it's being physically removed, and native workers aren't stepping onto it. Same eviction, different doorman.</p>

<p>The unemployment rate might keep looking better while the labor market keeps getting worse.</p>

<p>Buckle up.</p>

<hr />

<p>On to the week that was in HR Tech. This week's Wrap highlights Korn Ferry buying AMS for 1.1 billion dollars, Amazon automating HR, Employ partners with ID.me, Kevin McDonough making a great argument for transparency, that Stanford AI bias research isn't what you think it is, great podcasts with Jason Gorham and Stéphane Rivard, and a third of young adults living with their parents.</p>

<p>Have a great weekend!</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<p><em>This week's throughline: automate the function, keep the liability.</em></p>

<h3>Korn Ferry buys AMS for $1.1B, discovers recurring revenue</h3>
<img src="/newsletters/edition-80/korn-ferry-ams.webp" alt="Korn Ferry and AMS logos over a backdrop of glass office towers" />
<p>Korn Ferry is spending ~$1.1B to pull UK-based AMS out of OMERS Private Equity's portfolio, and what it's really buying is predictability. AMS brings ~$650M in fee revenue and, more to the point, $1.5B+ in contracted fees still on the books — a textbook cyclicality hedge for a firm whose executive-search business swings with every market hiccup.</p>
<p>Here's the part recruiters should sit with: a sophisticated buyer just paid a billion dollars, partly borrowed, for 8,000 people whose entire job is sourcing and screening — the exact work everyone insists AI is about to vaporize. You don't lever up to buy a melting ice cube. If you've been refreshing your résumé every time a "recruiting is dead" take crosses your feed, the biggest check in the room just voted the other way.</p>
<p><a href="https://www.kornferry.com/about-us/press/korn-ferry-announces-definitive-agreement-to-acquire-ams">Read more</a>.</p>

<h3>Amazon reinvents the phone tree, calls it HR</h3>
<img src="/newsletters/edition-80/amazon-ask-aza.webp" alt="An 'Ask Aza' self-service kiosk beside an empty HR desk chair in an Amazon warehouse aisle" />
<p>Amazon has shipped the customer-service death spiral as its HR strategy. Per a Fast Company exclusive, it's replaced on-site warehouse HR with its A to Z app and a chatbot named Aza — which workers describe as little more than a chatbot in company branding — and rebranded the whole function "PXT" (People Experience and Technology), the kind of name you give a department right before you delete the "people" part. Warehouses that once had three to six HR staff are down to one on a good day, with no coverage nights or weekends.</p>
<p>The damage concentrates exactly where you'd fear: accommodations and medical leave. One worker with a concussion was disciplined for working too slowly while her accommodation sat unapproved for a month — the chatbot had generated the wrong form. A stroke survivor was fired for absences after the app repeatedly denied her requests. The EEOC has already found Amazon violated the ADA on warehouse accommodations, and a lawsuit alleges the app isn't built to permit the interactive dialogue the law requires. One former investigator's line should hang over every "AI-powered employee experience" demo this year: "I watched the human get sucked out of the job."</p>
<p><a href="https://www.fastcompany.com/91565321/amazon-is-taking-human-out-of-hr-ai-chatbot-app-aza">Read more</a>.</p>

<h3>The ATS becomes a checkpoint</h3>
<img src="/newsletters/edition-80/employ-idme.webp" alt="Employ logo with JazzHR, Lever, and Jobvite wordmarks over a handshake" />
<p>Employ — the parent of JazzHR, Lever, and Jobvite — is embedding ID.me's identity verification directly into its applicant tracking systems, with rollout to customers in the second half of 2026. The stated reason is that AI has made résumés, credentials, and even live interviews forgeable. Employ's own Recruiter Nation research found 23% of recruiters have already hit candidate fraud, and Gartner expects one in four applicants to be fake by 2028. Candidates verify through ID.me directly; Employ never sees the underlying data, just a pass.</p>
<p>Note the pattern, because this is the second major ATS to bolt an identity checkpoint onto the front of the funnel — Greenhouse did it with CLEAR back in June 2025, and now Employ with ID.me. Different vendors, same conclusion: the application itself is no longer evidence of anything. We spent a decade making it frictionless to apply, and the arms race that followed means the industry's fix is to make you prove you're a person before anyone reads your résumé. We've flipped that to the top and if it can get rid of the application bloat, we may be saved.</p>
<p><a href="https://www.prnewswire.com/news-releases/employ-and-idme-partner-to-prevent-ai-driven-candidate-fraud-302821472.html">Read more</a>.</p>

<hr />

<h2>💰 Funding &amp; Acquisitions</h2>

<ul>
  <li>Paris-based HR Path — the consulting-and-outsourcing shop you call when your SAP, Oracle, Workday, Dayforce, or UKG rollout goes sideways — closed a transaction valued near $1B, led by private-equity firm Ardian, to fund a global push aimed at the US, Canada, Germany, the Nordics, Australia, and the Middle East. <a href="https://hrtechfeed.com/hr-path-secures-1-billion-transaction-led-by-ardian-to-drive-international-expansion/">Read more</a>.</li>
</ul>

<hr />

<h2>🔥 HR Hot Takes</h2>

<h3>"We can't fix what we can't see"</h3>
<img src="/newsletters/edition-80/workday-hot-take.webp" alt="Kevin McDonough's LinkedIn article, 'The Workday Ruling Isn't Really About AI. It's About What We Can't See,' shown above an image of the Workday headquarters building" />
<p>Great piece from Kevin McDonough on LinkedIn. Everyone's covering the headline: a federal judge ruled Workday must face claims that its AI screening discriminated by disability, race, age, and gender — a potential class reaching into the hundreds of millions of rejected applicants. McDonough's take cuts past it. The wrong question, he argues, is "Is AI biased?" The right one is "Can anyone explain how the decision was made?"</p>
<p>His core insight: the AI never has to see a protected characteristic to create legal exposure — it just has to weight a proxy for one. An employment gap, a graduation year, a job title. The court zeroed in on exactly that, declining to dismiss the claim that Workday's tool flags applicants using proxy indicators of disability, like a two-year gap — which could be cancer treatment or caregiving, or could be a sabbatical. The algorithm can't tell the difference. And unlike a Boolean string you can read and debate, the model's weighting is invisible: when a recruiter passes on a gapped résumé, you can ask them why; when the algorithm does it, the reasoning is buried. Hiring needs real transparency right now.</p>
<p>&rarr; <a href="https://www.linkedin.com/pulse/workday-ruling-isnt-really-ai-its-what-we-cant-see-mcdonough-sphr-kn7ge/">Read Kevin McDonough's piece on LinkedIn</a></p>

<hr />

<h2>🔬 Research &amp; Reports</h2>

<h3>Stanford's "AI is biased" study says something narrower (and smarter) than the headline</h3>
<img src="/newsletters/edition-80/stanford-digital-economy-lab.webp" alt="Stanford Digital Economy Lab logo" />
<p>The headline making the rounds last week is "AI hiring tools are biasing job decisions." The actual paper is titled "Algorithmic Monocultures in Hiring" — and that gap is the story. Researchers (including Percy Liang and Dan Jurafsky) analyzed 4 million applications <strong>screened by a single vendor</strong>. The real finding isn't "the robots are racist." It's that when everyone rents screening from the same vendor, you don't get rejected by <em>a</em> company — you get rejected by the <em>market</em>: 4% of applicants to 10 jobs were flagged for rejection from all of them, higher than chance. The racial-bias angle is real but fragile — disparities only surface job-by-job, it's one vendor, and they can't say <em>why</em>. The practitioner takeaway holds: the liability is yours, not the vendor's. <a href="https://digitaleconomy.stanford.edu/publication/algorithmic-monocultures-in-hiring/">Read more</a>.</p>

<h3>The other side of the ledger: AI adopters are hiring more, not less?</h3>
<img src="/newsletters/edition-80/ramp-economics-lab.webp" alt="Ramp Economics Lab banner" />
<p>Right as everyone queues up the "AI is coming for your job" eulogies, Ramp's Economics Lab dropped a working paper cutting the other way — with the author's own caveat about no promises on your specific job. Pairing spend data with Revelio workforce records across 21,000+ firms, it found AI adopters actually grew headcount 10.2% over two years, with entry-level growing <em>faster</em>, up 12% — a shot at my own narrative that AI eats the bottom rung first 🤷. Take every vendor-sponsored research piece with a grain of salt. The gains show up only for the top third by AI spend, causation is shaky (adopters were already bigger and faster-growing), and Ramp <em>sells</em> to these firms. Take a look and see what you think.</p>
<p><a href="https://ramp.com/data/ai-jobs-impact">Read more.</a></p>

<hr />

<h2>🎙️ Podcasts of the Week</h2>

<h3>Pre-Passive Hiring — with Jason Gorham</h3>
<img src="/newsletters/edition-80/totally-talent-pre-passive-hiring.webp" alt="Totally Talent podcast episode artwork: 'Pre-Passive Hiring' with guest Jason Gorham" />
<p>In 2003, Jason Gorham posted a job, got 100 mismatched applicants, quit, and went on to invent programmatic job advertising — technology later licensed by LinkedIn and Indeed. He's back with TalentXi, and his argument is that the job board model he helped build is broken.</p>
<p>On this episode of <em>Totally Talent</em>, we get into what comes next: true programmatic advertising for talent, Amazon DSP data, pre-passive candidates, and why your Vizio TV is quietly harvesting your data for Walmart. The takeaway for TA and recruitment marketing leaders — cost-per-application is on its way out, data layering and audience targeting can surface candidates before they know they're looking, and the future of recruiting looks a lot more like precision advertising than job boards.</p>
<p>&rarr; <a href="https://www.hr.com/en/resources/podcasts/talent/pre-passive-hiring_mrcjjoyy.html">Listen to the episode</a></p>

<h3>Beyond the Resume with Stéphane Rivard</h3>
<img src="/newsletters/edition-80/totally-talent-beyond-the-resume.webp" alt="Totally Talent podcast episode artwork: 'Beyond the Resume' with guest Stéphane Rivard" />
<p>The resume is broken and everyone knows it. I sat down with Stéphane Rivard, CEO and co-founder of HiringBranch, to talk about what happens when you replace traditional screening with something that actually predicts performance.</p>
<p>HiringBranch drops candidates into realistic, role-based scenarios and evaluates soft skills, critical thinking, and linguistic ability using a proprietary small language model — not a generic LLM wrapper. The result is a 10-minute assessment they say correlates to on-the-job performance at 80%. We get into why the AI interview space is crowded with lookalike tools, how acoustic signals and multi-dimensional skill profiling change what "candidate data" even means, and why HiringBranch users are eliminating most of their interviews — because they no longer need them.</p>
<p>&rarr; <a href="https://www.hr.com/en/resources/podcasts/talent/beyond-the-resume_mrapy2c5.html">Listen to the episode</a></p>

<hr />

<h2>🔗 Worth a Click</h2>

<h3>The AI layoff list nobody at these companies wants framed this way</h3>
<img src="/newsletters/edition-80/techcrunch-ai-layoffs.webp" alt="Satirical illustration: a humanoid robot labeled 'I love AI' kicks a worker out of a 'big tech' office beneath a sign reading 'Build the future. Automate the rest.'" />
<p>TechCrunch is keeping a running tally of the big-name tech firms that cut staff this year and blamed AI. Roughly 120,000 tech jobs are gone in 2026 — Microsoft, Oracle, Block, Amazon, Meta, PayPal and a dozen more — and per Challenger, Gray &amp; Christmas, AI was the most-cited reason in the worst single month for tech cuts in years.</p>
<p>Here's why it's worth the click and not just the doomscroll: the tell is the pattern, not the number. These are companies posting <em>record</em> revenue while cutting headcount and crediting AI for both. TechCrunch itself notes the teams getting cut are often the ones that ballooned during the pandemic hiring binge — a very different story than "the model replaced them." Read alongside this edition's lead essay, it completes the picture: at the bottom of the ladder, workers are being <em>removed</em> from the labor supply; at the top, they're being <em>reclassified</em> as AI casualties to make a margin story sound like a vision. Either way, "AI did it" is doing work it didn't necessarily do.</p>
<p><a href="https://techcrunch.com/2026/07/06/the-running-list-major-tech-layoffs-in-2026-where-employers-cited-ai/">Read more.</a></p>

<h3>A third of young adults are back in their childhood bedrooms</h3>
<img src="/newsletters/edition-80/nyt-young-adults-home.webp" alt="A young adult sits on the edge of a bed looking out a bedroom window" />
<p>File this under "the dashboard looks fine." A third of adults under 35 are living with their parents — right back to the 2020 pandemic peak, about 25 million people — per a Realtor.com analysis the <em>New York Times</em> picked up this week. The reflexive read is a housing story, and the report leans that way: roughly 70% of these young adults are employed, and a rising share hold degrees. The economist behind it frames it as a problem of affordability and supply, not jobs.</p>
<p>But look at what that actually says. These kids aren't unemployed — they're employed and <em>still</em> can't afford to move out. But affordability is a made-up issue, right?</p>
<p><a href="https://www.nytimes.com/2026/07/08/realestate/a-third-of-young-adults-still-live-with-their-parents.html">Read More.</a></p>

<hr />

<p><em>— The Wrap · ilovethewrap.com</em></p>
  `,
  },
  {
    slug: 'we-know-where-were-going',
    date: 'June 26, 2026',
    title: "We Know Exactly Where We’re Going. Nobody Will Say What Happens When We Get There.",
    tag: 'AI & Future of Work',
    tileImage: '/newsletters/june-26-2026-we-know-where-were-going/image1-tile.webp',
    excerpt:
      'The largest construction project of our lifetime is hiring at both ends of the wage ladder — trades training at the bottom, AI-labeling at the top — and nobody building it will say what happens to you the day it’s finished.',
    body: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;border-collapse:collapse;">
  <tr>
    <td style="background-color:#F5EDD6;border:1px solid #E5E7EB;border-radius:12px;padding:24px;text-align:center;">
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a8a;font-family:Georgia,serif;margin-bottom:12px;">Presented by</div>
      <a href="https://theperfecthire.co" style="text-decoration:none;">
        <img src="/sponsors/perfecthire.webp" alt="PerfectHire" loading="eager" style="width:200px;max-width:60%;height:auto;display:block;margin:0 auto 14px;" />
      </a>
      <p style="font-size:15px;line-height:1.5;color:#1a1a1a;font-family:Georgia,serif;margin:0 auto 18px;max-width:460px;">Agency+ is the first AI-native CRM + ATS + BD engine built for agency recruiters — it auto-surfaces your most placeable candidates and pitches them to the companies hiring right now.</p>
      <a href="https://theperfecthire.co" style="display:inline-block;background-color:#c0623a;color:#ffffff;font-family:Georgia,serif;font-size:14px;font-weight:bold;text-decoration:none;padding:11px 22px;border-radius:8px;">See Agency+ &rarr;</a>
    </td>
  </tr>
</table>

<img src="/newsletters/june-26-2026-we-know-where-were-going/image1.webp" alt="We Know Exactly Where We’re Going" />

<p>The pyramids were the most ambitious construction projects of the ancient world — monuments that took a mobilized workforce years to raise, and when the last stone went in, they belonged to one man. The laborers who hauled the granite got the privilege of having hauled the granite. But to get them to the quarry in the first place, somebody had to sell the work, and if you could hear that ancient herald working the crowd, you’d swear he was reading from a modern workforce-development press release.</p>

<p>Steady work and a full belly through the lean season. A trade in your hands — masonry, hauling, surveying — skills that travel, skills the kingdom will need for generations. A paycheck you can count on while the fields are underwater. Dignity. Purpose. A foot on the ladder. Come build the future; the Pharaoh is investing in his people.</p>

<p>That’s the press release I’ve been reading all month, but I’m not falling for it.</p>

<p>Yes, the investment is real. That’s what makes it work. The upcoming data center build-out is the largest construction project of our lifetimes, and the hyperscalers genuinely need bodies to raise it: pour the concrete, pull the power, wire the racks. So the money is actually moving. In the past month alone, we’ve learned that:</p>

<ul>
  <li>Google is spending $50 million to train 300,000 electricians and pipefitters.</li>
  <li>Meta is spending $115 million to create America’s Workforce Academy.</li>
</ul>

<p>These are real jobs, they pay real wages, and the trades pointing their kids toward them are not wrong to. I won’t pretend otherwise. The pharaoh’s heralds weren’t lying either — there was work, and it did feed your family, right up until the capstone.</p>

<p>But what none of the heralds mention — either ancient ones, or the ones today with LinkedIn Top Voice badges — is the only question that matters to the person hauling the stone: what happens after the pyramid is built?</p>

<p>There are two lifelines being thrown to American workers right now, and they sit at opposite ends of the wage ladder. At the bottom: the hyperscalers need someone to physically build the AI, so they’re funding trades training across twenty-plus states. At the top: they need someone to teach the AI, so they’re taking their own senior engineers — the people who used to do the interesting work — and reassigning them to label data and grade model outputs. At Meta, engineers reassigned to the work started calling themselves draftees; one told Wired that the unit was “literally the gulag. You have zero purpose in life all of a sudden, you barely interact with anyone, you just have these tasks every week.”</p>

<p>Two different stories of the future of work. Different collars, different zip codes, different paychecks. Except they’re the same story. The electrician wiring the data center and the engineer training the model are doing the same job from opposite ends — raising a monument that needs them only until it’s raised. The scaffolding always comes down. The pyramid was never going to belong to the men who built it.</p>

<p>Here’s the thing everyone gets wrong about the pyramids. They weren’t built by slaves. That’s the Hollywood version — the whips, the chains, Charlton Heston. The granite tells a different story. The people who raised those monuments were paid: organized into work crews, housed in a village beside the site, fed from the state’s stores, even tended by the state’s physicians when a block came down on the wrong foot. A lot of them weren’t even full-timers — they were conscripts rotating through during flood season, when the Nile drowned the fields and there was no farming to do anyway. Paid, housed, fed, seasonal. By the standards of the third millennium BC, a decent gig.</p>

<p>And here is what they were paid: bread and beer. Rations. Enough calories to haul the next stone and come back tomorrow. They built the most valuable objects in the ancient world — monuments that would outlast every empire that followed — and they walked away with a full belly and the right to say they’d been there. The pharaoh got eternity. The workers got lunch.</p>

<p>That’s not slavery. It’s worse, in a way, because it’s defensible. Nobody had to be chained to the work. The work fed you. You showed up willingly, because showing up beat the alternative, and in exchange you poured your back into an asset you would never own a single stone of.</p>

<p>So when I see $50 million spread across 300,000 workers — $166 a head, against the $180-to-$190 billion in capital expenditure Google has slated for AI in 2026 — I don’t see a workforce investment. I see rations. I see bread and beer with a hard hat on. Enough to get you to the site, train you up, keep you hauling until the thing is built. It was slave wages then. Dressed up in a press release, it’s slave wages now. The only thing that’s changed in five thousand years is that the pharaoh puts out videos of him awkwardly learning Jiu-Jitsu.</p>

<p>So here’s the question I can’t get anyone to answer — what happens next? You have a new data center and models trained off of real people. Then what? You don’t need the people who poured the foundation once it’s poured, or the ones who trained the model once it’s trained. The two best-paid lifelines in this economy both terminate the moment the project they’re attached to succeeds. What does work look like on that morning — the day the building is done, the machine is taught, and the scaffolding comes down? Sure there will be maintenance, but the majority of the work is done.</p>

<p>I have a guess and I don’t love it because I see signs of it everywhere. Look around LinkedIn at the army of fractional workers, a generation cobbling a living together through whatever gig they can get while just trying to reclaim some of the wage/life security they had a decade ago. And in the US, fractional work doesn’t come with benefits, so be prepared to pay any extra wages towards health premiums, meager retirement, and other savings contributions. The Digital Day Laborers I’ve been writing about for a year, now with company at every income level.</p>

<p>Whatever you are at either end of this, you don’t own a brick of what you built. Every dollar of that capex converts distributed human work — millions of people, each holding a little leverage — into one centralized capability owned by about five companies. You come out the far side with fewer people who have any bargaining power and a very short list of firms that have all of it.</p>

<p>Now the honest counterargument, because the essay’s worthless without it. People have screamed this exact scream before. The loom. The tractor. The spreadsheet. Every wave of automation arrived with a prophet promising the end of work, and every time, labor reallocated to jobs nobody could have named in advance. The optimists have a perfect historical record, and I’m not going to insult you by pretending they don’t.</p>

<p>I’ll just point at the one thing that’s different, and let you sit with it. Every prior wave automated muscle and routine, and in doing so, it pushed humans upward — toward judgment, toward creativity, toward the work that supposedly only we could do. That upward staircase is the entire basis of the reassurance. It’s why “they’ll find new work” was always true. This is the first wave built to climb the staircase itself. It’s not coming for the muscle. It’s coming for the judgment — the safe harbor every previous generation fled toward. You don’t have to believe the harbor falls. You just have to notice it’s the first time the water’s risen this high.</p>

<p>Which brings me, finally, to Rosie.</p>

<p>The whole promise of automation, from the Jetsons forward, was beautifully simple: the machine does the dishes so the family gets to live. Rosie handles the drudgery; the humans get the afternoon. That was the deal. That was always the deal.</p>

<p>Look at what’s actually on the table and tell me it isn’t the deal run exactly backwards. The machine gets the generative, creative, interesting work — the writing, the designing, the building. And the human gets handed a labeling queue. The human gets the dredge work that AI was explicitly, top-of-the-brochure sold as the cure for. We were promised the robot would do the dishes so we could paint. Instead, the robot paints, and we annotate its brushstrokes.</p>

<p>The pyramid laborer at least got a monument. He could walk out into the desert at the end of it, point at the thing scraping the sky, and say I built that. It’s probably how the workers who built the Empire State Building felt. Yet, the version arriving now doesn’t even leave you the monument. You build the thing, it belongs to the pharaoh, and the one genuinely interesting job inside it — the creating — goes to Rosie. You’re left annotating her brushstrokes for bread and beer. And the Jetsons, remember, owned Rosie. She worked for them. The version arriving now is one where you don’t own the robot. You train it, on someone else’s payroll, building someone else’s asset, right up until the day it doesn’t need you.</p>

<p>We know exactly where we’re going. We’re pouring the foundation, teaching the replacement, cashing the checks, and calling it a jobs program. The only thing nobody building it will tell you is what we’re supposed to do once we arrive. Is it because they don’t know, or because they do? Which is worse?</p>

<p>While you ponder that wonderful thought, it’s time to move on to this week’s highlights. This week’s Wrap features Google’s investment in skilled-trades training, Workvivo HQ, the Workday lawsuit that won’t go away, more funding aimed at deleting the apply button, a hot take on integrity from Laurie Ruettimann, and I discuss the changing entry level employee with Susan Hanold on Totally Talent.</p>

<p>Enjoy and have a great week. I’m off to a week in Stowe Vermont with some special Wrap activities planned. Stay tuned!</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>Google commits $50M to skilled-trades training</h3>
<img src="/newsletters/june-26-2026-we-know-where-were-going/image2.webp" alt="Google commits $50M to skilled-trades training" />
<p>Through Google.org, the company pledged an additional $50 million to train as many as 300,000 workers — electricians, welders, pipefitters, HVAC and sheet-metal techs — across more than 20 states, framed as a public-private partnership to fill the labor shortage behind its AI data center and grid buildouts. TechRadar ran the math: spread across 300,000 “or more” workers, that’s roughly $166 a head, against the $180–190 billion in AI capex the company has slated for 2026. It lands a week after Meta’s America’s Workforce Academy and the same week Adobe and LinkedIn announced their own AI-skills tie-up.</p>
<p><a href="https://blog.google/company-news/outreach-and-initiatives/google-org/skilled-trades/">Read more</a>.</p>

<h3>Workvivo launches Workvivo HQ</h3>
<img src="/newsletters/june-26-2026-we-know-where-were-going/image3.webp" alt="Workvivo launches Workvivo HQ" />
<p>Workvivo, the employee-experience platform Zoom acquired in 2023, unveiled Workvivo HQ, an “AI-native digital headquarters” that folds communication, knowledge, and action into one surface, built on Zoom’s AI and the same federated foundation as ZoomMate (drawing on Zoom’s own models plus OpenAI, Anthropic, and others). The launch includes HQ Agent, an agentic layer that reaches into 60+ enterprise systems — Gmail, Google Drive, Jira, Salesforce, ServiceNow, Workday — to retrieve information and act on an employee’s behalf. Workvivo says it now serves 10M+ users across 1,300+ organizations. The product matters less than the distribution behind it: Zoom is one of the most widely installed tools in the enterprise, and HQ is its bid to convert meeting ubiquity into ownership of the daily work surface — the screen every employee opens first — rather than the app they open only for a call.</p>
<p><a href="https://www.workvivo.com/newsroom/hq/">Read more</a>.</p>

<h3>Workday must face AI-bias class action</h3>
<img src="/newsletters/june-26-2026-we-know-where-were-going/image4.webp" alt="Workday must face AI-bias class action" />
<p>A federal judge in San Francisco ruled June 22 that Workday must answer claims its AI screening software weeded out applicants in ways that violated California law and the federal Americans with Disabilities Act, mostly denying the company’s bid to dismiss recent amendments to the 2023 proposed class action. Judge Rita Lin rejected Workday’s argument that California’s anti-discrimination laws don’t apply to out-of-state applicants, ruling that because the alleged conduct originated at its California headquarters, the company could be held liable under state law. She also let stand a claim that the software can screen out candidates using proxy indicators of disability or illness, such as gaps in employment history. Workday says the claims are false and that its tools look only at job qualifications, not protected traits.</p>
<p><a href="https://reut.rs/4ahahSB">Read more</a>.</p>

<hr />

<h2>💰 Funding &amp; Acquisitions</h2>

<p>We told you the hiring funnel was collapsing — this week, more funding to kill the apply button.</p>

<p><strong>WhyBrilliant</strong> raises €1M pre-seed to build an AI agent–driven recruitment platform that matches candidates to employers without traditional applications. <a href="https://tech.eu/2026/06/16/whybrilliant-raises-eur1m-to-scale-ai-job-matching-backed-by-merantix/">Read more</a>.</p>

<p><strong>Orbio</strong> raises $21M Series A to scale its AI agents (Maria, Daniel, and Claire) that interview, onboard, and manage hourly workers. <a href="https://techcrunch.com/2026/06/14/orbio-raises-21-million-to-automate-hiring-and-onboarding-for-frontline-workers/">Read more</a>.</p>

<p><strong>Fika Jobs</strong> raises $4M pre-seed to build a video-first hiring platform where candidates complete a roughly 10-minute AI interview (powered by Google’s Gemini) that’s turned into a short-form video profile employers browse, rather than a resume they apply with. The platform is free for job seekers and takes 10% of a successful hire’s first-year salary. <a href="https://techcrunch.com/2026/06/23/fika-jobs-raises-4m-to-build-a-video-first-hiring-platform-where-ai-agents-interview-candidates/">Read more</a>.</p>

<p><strong>Niural</strong> raises $52M Series A for its AI-native global payroll and benefits platform. <a href="https://hrtechfeed.com/global-payroll-and-benefits-platfom-lands-52m/">Read more</a>.</p>

<hr />

<h2>🔥 Hot Takes</h2>

<h3>You don’t have to say yes to money</h3>
<img src="/newsletters/june-26-2026-we-know-where-were-going/image5.webp" alt="Punk Rock HR with Laurie Ruettimann" />
<p>My buddy Laurie Ruettimann of Punk Rock HR published a sharp piece this week aimed at the leadership and “good life” speaking circuit: the people who build careers preaching integrity carry an extraordinary burden to know where their money comes from and whose check they’re signing. Her news hook is the data leak that exposed the membership of Dialog, Peter Thiel’s invitation-only society for the global elite. Worth a read if you’ve been to any large HR conference lately.</p>
<p><a href="https://laurieruettimann.substack.com/p/you-dont-have-to-say-yes-to-money">Read more</a>.</p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>Redesigning the entry-level role in an AI-first world</h3>
<img src="/newsletters/june-26-2026-we-know-where-were-going/image6.webp" alt="Totally Talent — Redesigning the entry-level role, with Susan Hanold" />
<p>I sat down with Susan Hanold, VP of Organizational People and Change at People Results, to talk about something every talent leader is quietly wrestling with: what happens to the entry-level job when AI does the work we used to hand to new grads? Worth a listen if you’re trying to figure out where the next generation of talent actually comes from.</p>
<p><a href="https://www.hr.com/en/resources/podcasts/talent/redesign-the-entry_mqjiu8n8.html">Listen here</a>.</p>
  `,
  },
  {
    slug: 'the-graveyard-of-sameness',
    date: 'June 19, 2026',
    title: 'The Graveyard of Sameness',
    tag: 'AI & Future of Work',
    excerpt:
      'Casual dining died of a thousand sensible cuts toward the average — now AI offers every industry the same erosion at machine speed and near-zero cost. Hold onto your red roof.',
    body: `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px;border-collapse:collapse;">
  <tr>
    <td style="background-color:#F5EDD6;border:1px solid #E5E7EB;border-radius:12px;padding:24px;text-align:center;">
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#8a8a8a;font-family:Georgia,serif;margin-bottom:12px;">Presented by</div>
      <a href="https://theperfecthire.co" style="text-decoration:none;">
        <img src="/sponsors/perfecthire.webp" alt="PerfectHire" loading="eager" style="width:200px;max-width:60%;height:auto;display:block;margin:0 auto 14px;" />
      </a>
      <p style="font-size:15px;line-height:1.5;color:#1a1a1a;font-family:Georgia,serif;margin:0 auto 18px;max-width:460px;">Agency+ is the first AI-native CRM + ATS + BD engine built for agency recruiters — it auto-surfaces your most placeable candidates and pitches them to the companies hiring right now.</p>
      <a href="https://theperfecthire.co" style="display:inline-block;background-color:#c0623a;color:#ffffff;font-family:Georgia,serif;font-size:14px;font-weight:bold;text-decoration:none;padding:11px 22px;border-radius:8px;">See Agency+ &rarr;</a>
    </td>
  </tr>
</table>

<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image1.webp" alt="The Graveyard of Sameness" />

<p>I used to love Chipotle. Not a casual love like “hey, good to see you,” it was borderline obsession. White rice, pinto beans, shredded beef (Barbacoa), green salsa (red if I don’t have anywhere to be for the rest of the day), sour cream and cheese. Fresh ingredients and spices exploding through a tightly wrapped tortilla? I couldn’t get enough. I even learned how to recreate it in a slow cooker at home.</p>

<p>I say I used to love Chipotle because times have changed. That same burrito now costs $16 and is hardly bursting at the seams. The ingredients have been trimmed back and everything is an upcharge. I told myself that I was imagining it, that I’d just gotten fatter and greedier with age, but this is a thing. Look it up and you’ll see tons of videos complaining about the shrinking portions and inflated price.</p>

<p>In 2025, Chipotle posted its first annual same-store sales decline in more than two decades of public data, a streak that had survived even a 2015 E. coli outbreak. Foot traffic fell as transactions dropped more than 3% on the year, the portion-size backlash became its own genre on TikTok, and the CEO’s advice to customers who felt shorted was, more or less, to ask for more. He also mentioned on an earnings call that 60% of Chipotle’s core customers now earn over $100,000, and that the company plans to “lean into” them — translation: We can squeeze more money out of people.</p>

<p>This week, Pizza Hut became the newest headstone in the graveyard of destroyed brands. Yum! Brands sold it off for $2.7 billion — most of it to a private equity firm, which means it’s never coming back. Sad, because I remember what made Pizza Hut fun – the building with the red roof (anything without it is just a pizza place, not a hut), the red soda cups, a fresh, personal-pan pizza just for reading. I’d fake-read so many books to fill up my Book It! pin.</p>

<p>I could write this whole article about why Pizza Hut failed, but I’ll sum it up for you. The Pizza Huts of today are tucked into Targets and gas station rest stops, where stale pizza and breadsticks sit for hours under a hot lamp. That personal pan pizza that you read 5 books for? It’s now only what you grab in an emergency.</p>

<p>What made Pizza Hut unique has long been gone and the casual-dining cemetery is getting new entrants every day. In 2024 alone, around 348 full-service chain locations closed amid bankruptcy, the worst year since the pandemic. Red Lobster collapsed after an owner cut its longtime suppliers and turned $20 endless shrimp into a permanent margin wound. TGI Fridays filed Chapter 11 and has been shedding locations ever since. Hooters filed in 2025. On The Border and Buca di Beppo, gone or going. Denny’s is closing dozens. Applebee’s, Outback, and Red Robin are all bleeding traffic. The shared diagnosis, in plain English: the food got more expensive, the customer got squeezed, and none of these places were special enough anymore to be worth the trip.</p>

<p>A strong brand is built on the deviation from the mean. The specific thing people love – bigger portions, fresh hand-cut meat, the cool building – is by definition the part that’s above average and therefore, more expensive to maintain. Every pressure on a maturing business pushes in the same direction: cost accounting trims the distinctive thing, value-engineering standardizes it, the broadline distributor optimizes the supply chain, and the consultant benchmarks you against peers until you become your peers. Each cut on its own is rational, but collectively, they’re suicide. The brand doesn’t die in one bad decision; it dies of a thousand sensible ones. The mean isn’t a neutral resting place — it’s the cheapest defensible version of yourself, and gravity only runs one way.</p>

<p>You can taste that convergence literally. Three companies — Sysco, US Foods, and Performance Food Group — distribute most of what American restaurants serve, the big chains and the “local” spots alike. The mozzarella sticks, the boneless wings, the fries: more and more the same components, through the same pipes, reheated under different logos.</p>

<p>Instead of eating out being a moderately priced evening out with kids, the experience has become ordering by kiosk the same reheated Sysco food you can get anywhere.</p>

<p>For twenty years, navigation toward the mean was slow, because it was human. It took committees and consultants and quarterly margin pressure and a thousand small meetings to grind a distinctive brand down into a generic portfolio asset. AI has removed that friction and an LLM is by definition predicting the most statistically probable outcome based on the average of everything it has ever seen.</p>

<p>I worry that the same erosion that took casual dining two decades of human penny-pinching, AI now offers to every industry at once — at machine speed and near-zero cost. Remember how nobody picks beige? The danger of AI was never that it would be bad at things. The danger is that it is excellent at average — and average is precisely the quality that makes nobody care.</p>

<p>I keep seeing HR Tech companies expand to the point where they’re unrecognizable. Everyone wants to be Workday and I get it — they are an IPO dream. But do you really want to build something that people just tolerate? Or, can you stand on your unique strengths and use AI to amplify them?</p>

<p>I’m asking you to do something I’ve had to do myself. When I started The Wrap, it was mostly a clean rundown of HR Tech news with a little commentary stapled on — generic, and that was fine for a while, until I realized I was just one more voice drowned out in a sea of HR Tech newsletters. (There are more of those than you could possibly imagine. Seriously, tons.) So when I launched the website in April, I started figuring out how to be different. You still get the news, but now I have some fun with it — pulling in trends from well outside the HR Tech bubble, running a weekly live rundown that kicks off with an 80s hair band wailing my theme song, even shooting a Dateline-style spoof. I’d rather be somebody’s favorite weird newsletter than everybody’s forgettable one.</p>

<p>The red roof was never really about the pizza. It was about being somewhere instead of anywhere. Hold onto your red roof.</p>

<p>On to this week’s news. This week’s Wrap features a look at a labor market that is “strong” while paychecks are weak, Phenom plugs their AI agents into ServiceNow, Meta training data-center workers, Indeed killing organic job postings, new research from PwC showing a two-tiered AI jobpocalypse, insight into Oracle’s agentic roadmap with Stacia Garr, an interview with former TA pro turned Mitratech product manager Rachel Wyngaard about their Leave of Absence product, and SpaceX buying Cursor.</p>

<p>Have a great weekend,</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📉 Labor Market</h2>

<h3>The Labor Market Is “Strong.” Your Paycheck Didn’t Get the Memo.</h3>
<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image2.webp" alt="BLS Employment Situation — May 2026: nonfarm payrolls +172K, unemployment 4.3%, average hourly wage $37.53, participation 61.8%" />
<p>Ok, we’ve collected all we can for the labor market this month, here’s what the tea leaves are telling us.</p>
<p>The May employment report looked like a clean win. Employers added a seasonally adjusted 172,000 jobs — far above the Dow Jones consensus of around 80,000 — with unemployment holding at 4.3%, and March and April were revised up by a combined 93,000. However, if you look at where the jobs actually came from, leisure and hospitality led with 70,000, state and local government added about 50,000 (mostly education), and health care chipped in roughly 47,000 — while private payrolls outside those buckets were comparatively thin.</p>
<p>The “low-hire, low-fire” pattern that’s defined this market for a year is still firmly in place. These are not the jobs a freshly minted analyst or coordinator is fighting over. We’re adding shifts at the restaurant and aides at the clinic.</p>
<p>And there’s more. Average hourly earnings rose 3.4% over the year. The May CPI landed at 4.2% — inflation above 4% for the first time in three years and the highest reading since April 2023, driven largely by the energy shock from the war with Iran. Do the subtraction. Wages up 3.4%, prices up 4.2%: the average worker took a real pay cut while the headline screamed full employment. Annualized wage growth is now running at its weakest pace since the recovery from the pandemic.</p>
<p>This month’s <a href="https://ilovethewrap.com/labor-market">Wrap Underemployment Index</a>, also known as the Worker Misery Index, has increased to 71.4, +8.9% from March (these numbers are a month behind).</p>
<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image3.webp" alt="The Wrap Underemployment Index — current reading 71.4 of 100" />
<p><em>Don’t expect a fed rate cut this year with these numbers.</em></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>Phenom plugs its hiring agents into ServiceNow</h3>
<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image4.webp" alt="Phenom plugs its hiring agents into ServiceNow" />
<p>Phenom announced that its AI agents now operate inside the ServiceNow AI Platform, including ServiceNow’s “Otto” assistant. The agents can autonomously run intake meetings, generate job descriptions, source and screen candidates, and move the top of the pile to the interview stage — while compliance checks, stakeholder notifications, and approvals stay inside ServiceNow and candidate engagement runs through Phenom.</p>
<p><a href="https://www.businesswire.com/news/home/20260610841935/en/Phenom-Partners-with-ServiceNow-to-Introduce-AI-Hiring-Agents">Read more</a>.</p>

<h3>Meta launches the largest trades-training job guarantee in U.S. history (to staff its own data centers)</h3>
<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image5.webp" alt="Meta launches America’s Workforce Academy" />
<p>Meta is putting $115 million into year one of America’s Workforce Academy, a cost-free program that supports participants while they train for skilled trades and guarantees a job for every graduate, handing them a portable NCCER credential and an “America’s Workforce Certificate” built to travel across employers. It’s billed as the largest private-sector skilled-trades commitment with a job guarantee in American history, launching as a 2026 pilot in Louisiana, Ohio, Indiana, and Texas alongside the National Urban League, the Associated Builders and Contractors, and CBRE.</p>
<p>On its face this is the rare corporate workforce play that’s genuinely good for workers — no debt, real pay during training, a credential you keep, and explicit reach into communities historically shut out of these careers — which is a generous look for a company that has been a poster-child for exploitation. It will be interesting to see this play out. AI infrastructure needs to be built, but call me skeptical that the job guarantee outlasts the builds. Nevertheless, the Pharaoh needs his pyramids built!</p>
<p><a href="https://about.fb.com/news/2026/06/americas-workforce-academy-free-skilled-trade-training/">Read more</a>.</p>

<h3>Indeed makes you pay to be seen</h3>
<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image6.webp" alt="Sure, Jan." />
<p>Indeed has spent 2026 tightening the screws on its customers and trying to combat having a job board full of scams and fluff. As a result, they’ve quietly announced this month that jobs fed in through single-source XML or API feeds without a proper ATS integration no longer get free organic visibility, with sponsored placement now the dependable path to the top of search.</p>
<p>The timing is the real tell. Indeed is monetizing organic reach at the exact moment the underlying asset is cratering: application inflation has already driven the value of any single application toward zero, and trust in the listings is going with it — Greenhouse’s 2025 AI in Hiring report found 69% of U.S. job seekers believe they’ve encountered fake postings, and 46% say their trust in hiring dropped over the past year. So employers are being asked to pay more to stand out on a platform candidates increasingly don’t believe, in order to harvest applications worth less than they’ve ever been. Sure, Jan.</p>
<p><a href="https://www.ere.net/articles/indeed-turns-up-the-heat-on-free-job-postings">Read more</a>.</p>

<hr />

<h2>📊 Research &amp; Reports</h2>

<h3>PwC’s 2026 AI Jobs Barometer: the workforce is splitting, not flattening</h3>
<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image7.webp" alt="PwC’s 2026 AI Global Jobs Barometer — two futures for jobs in an AI era" />
<p>PwC’s new Global AI Jobs Barometer, built on more than a billion job ads across 27 countries, finds that AI isn’t homogenizing the labor market, it’s cleaving it in two. “Professionalised” roles — where AI handles the routine work and humans supply judgment, with recruiters and radiologists among the examples — are seeing twice the job growth and 42% faster salary growth than “democratised” roles, where AI mostly makes the job easier for non-experts to do. The same split runs through companies: the most AI-capable firms grew headcount 52% against 36% for the least exposed, and the top 20% most AI-exposed posted labor-productivity gains of 163% relative to 2018. The skills premium tells the same story — postings demanding AI skills are growing roughly eight times faster than the broader market, carrying a 62% average wage premium, up from 57% a year ago.</p>
<p>That sounds great, but check this out. Across 2.4 million U.S. entry-level jobs, the roles most exposed to AI are now seven times more likely to demand traditionally senior skills — judgment, leadership, face-to-face presence — and those “seniorised” entry roles grew 35% since 2019 while ordinary entry-level work shrank 10%. PwC’s own workforce lead names the cost: AI is “removing some of the routine work that once acted as an apprenticeship.” The bottom rung of the ladder is being sawed off and reattached higher up — and nobody has explained how a new grad is supposed to reach it.</p>
<p><a href="https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html">Read more</a>.</p>

<hr />

<h2>🔥 HR Hot Takes</h2>

<h3>Oracle’s “free AI” isn’t free, and the riskiest part ships without a seatbelt</h3>
<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image8.webp" alt="Road Dispatch: The Five Big Bets Behind Oracle’s Agentic Push" />
<p>Friend of the program Stacia Garr of RedThread Research posted her read on Oracle’s strategy after their April analyst day and it’s a great picture of the company’s HCM strategy. Five interlocking bets on agentic AI, fronted by a pricing pivot that reframes AI as a bundled feature rather than a line item — unlimited deployed agents, 20,000 AI Units a month included, what Oracle’s Yvette Cameron pitched as the only “unmetered use of an OpenAI LLM for general use.”</p>
<p>There’s a lot in here and it is well worth the read for anyone wondering where agentic AI in HR is going, but this part jumped out at me because I mainly cover TA. The plan is to hand over agentic hiring to people like store managers. Sure, that would be great, but these are often the least-trained, most time-pressed decision makers in the building. There needs to be extensive training or look out for lawsuits.</p>
<p><a href="https://www.linkedin.com/pulse/road-dispatch-five-big-bets-behind-oracles-agentic-push-stacia-garr-rvw0c/">Read more</a>.</p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>Totally Talent: “Fear-Free Leave,” with Rachel Wyngaard of Mitratech</h3>
<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image9.webp" alt="Totally Talent — Fear-Free Leave, with Rachel Wyngaard of Mitratech" />
<p>Leave of absence is the corner of HR nobody raises their hand for: a thicket of overlapping federal, state, and local rules, usually run on spreadsheets and good intentions, where one wrong step turns somebody’s hardest personal moment into a compliance headache. I sat down with Rachel Wyngaard — a former TA pro now spearheading Mitratech’s new AI-guided leave solution — to get into why leave became such a minefield, and whether AI can take the fear out of it without taking the humanity out.</p>
<p><a href="https://www.hr.com/en/resources/podcasts/talent/fear-free-leave_mqh3qdqg.html">Listen to the full conversation on hr.com</a></p>

<hr />

<h2>🔗 Worth a Click</h2>

<h3>Elon buys Cursor for $60 billion</h3>
<img src="/newsletters/june-19-2026-the-graveyard-of-sameness/image10.webp" alt="SpaceX to acquire Cursor" />
<p>SpaceX has agreed to acquire AI coding startup Cursor for $60 billion in stock — days after its historic IPO, and less than two months after the two first announced a tie-up. The logic, to the extent there is any: SpaceX folded Musk’s xAI into itself earlier this year and now needs that AI division to catch up to the actual AI labs, having told IPO investors it’s chasing a $26 trillion addressable market — roughly the entire GDP of the United States.</p>
<p><a href="https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo">Read more</a>.</p>
  `,
  },
  {
    slug: 'the-house-always-trades-up',
    date: 'June 5, 2026',
    title: 'The House Always Trades Up',
    tag: 'Labor Market',
    excerpt: "McDonald's, Vegas, and your employer are all running the same play — premiumize the top, automate the bottom, and quietly evict the dependable middle everyone actually used.",
    body: `
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image1.webp" alt="The House Always Trades Up" />

<p>There's a moment in every parent's life where the menu stops mattering. You already know the order, because your toddler will eat exactly one food on this earth (chicken, but ONLY in nugget form), and you just care that she eats something. It's 6:30, the day is over, the drive-thru is open, and you want one thing in your life to be cheap, fast, and exactly what you expected. That was the deal McDonald's made with America for seventy years. It was never a culinary delight. It was certain – a happy meal in Leominster, Massachusetts, tastes the same as a happy meal in Tucson, Arizona. Sameness, comfort, absence of surprise, that was the product.</p>

<p>This month McDonald's had their <a href="https://corporate.mcdonalds.com/corpmcd/investors/events-and-presentations.html">annual meeting</a> and announced a move in a new direction. Their new strategy is called McDonald's Next, and the headlines are new items such as bone-in wings, a “hand-breaded” McCrispy that is more like rival Popeyes, and the Big Arch – the chain's biggest, most premium burger, running around $9 ($13 in some markets). In parallel, they are introducing McValue 2.0, a new version of the dollar menu with items as low as $3. Note: McValue 2.0 sounds a lot cooler when you don't remember that it is the same items on the Dollar Menu 5 years ago, just tripled in price.</p>

<p>Read these two announcements together and their whole strategy comes into place: a premium ceiling and a bargain-basement floor, launched simultaneously with no middle ground. McDonald's looked at the customer who just wants the certainty it spent seventy years selling, and decided that customer was worth less than the one who will spring for artisanal poultry.</p>

<p>McDonald's didn't invent this move, it's happening across the board. Because we HR Tech veterans are always trapped in Las Vegas, we're seeing the endgame of this strategy. For decades, Las Vegas had the most democratic business model in selling a “good time.” You could get a hotel on the strip for less than $100 WITH the insane resort fees. For food, you could hit a cheap buffet. If you wanted to gamble, there were $5 craps tables. It was priced to get you there. The middle class made the Strip, but for the past few years, the Strip has been pushing them out the door. Those insane resort fees (I dare you to visit the gym at Circus Circus), paid parking everywhere, table limits of $25, the Sphere (which I like), F1 races every fall. The buffet died so the bottle service could live.</p>

<p>Yet Vegas is struggling. Last year, they drew 38.5 million visitors, down 7.5% from 2024. It's the first year-over-year decline in the post-COVID era and the lowest total since 2021. It's not entirely Vegas' fault – President Trump and ICE most definitely contributed to the drop in foreign visits (Canadian visits alone dropped 17%).</p>

<p>But here's what I love – while the premium Strip is sagging, the value end of town is thriving. Locals casinos were up nearly 6% in December, and the amazing people-watching experience that is Fremont Street set an annual revenue record north of $950 million. What the executives have to realize is that demand for value never went anywhere. Priced out of the Strip, the middle found somewhere else to spend its money.</p>

<p>This is the defining economic move of the moment, and once you see the pattern, you can't unsee it. Premiumize the top, abandon the bottom to a stripped-down budget tier, and hollow out the reliable middle everyone actually used. Airlines did it — the front of the plane is the business now, the back is a fee-extraction machine. Groceries did it — the premium line expands as the package shrinks.</p>

<p>It's a barbell, and the thing being optimized away is the boring, dependable, you-could-count-on-it middle that used to be the entire point. When you hear about the disappearing middle class, this is where it's coming from, and the data backs it up.</p>

<p>Moody's chief economist Mark Zandi found the top 10% of earners accounted for 49.2% of all consumer spending in Q2 2025 — the highest in data going back to 1989, up from about 43% in 2020 and roughly 35% in the early '90s. The kicker: from late 2023 to late 2024, the top 10% grew their spending 12% while lower- and middle-income spending actually declined. So when McDonald's and Vegas chase the high end, they're not being gratuitously cruel — they're following the only customer whose spending is still growing.</p>

<p>I know that this is an HR newsletter, not a personal grievance against high prices, so here's why it's relevant: employers are running the same play on workers that McDonald's and Vegas are running on customers. Premiumize the top, automate the bottom, hollow out the middle (on both sides of the counter).</p>

<p>Watch it happen in this very issue. The data this week describes a labor market propped open but frozen solid: JOLTS shows openings spiking to 7.6 million while actual hires fell. The doors are open, but almost nobody's walking through. Revelio and ADP both peg May growth at a near-identical ~122–124K, but jammed into a narrow strip of sectors — health care, public administration, professional services — while retail and hospitality bleed. The broad, shared, middle-of-the-economy hiring is the thing disappearing. Meanwhile, Oracle is cutting 30,000 people — 18% of its workforce — not because it's struggling, but to redirect the payroll into AI infrastructure, the premium tier it would rather invest in than you. And McDonald's? It's testing an AI voice in the drive-thru and telling franchisees, in writing, that “as more of the customer journey becomes automated, there are fewer opportunities for guests to connect with crew.” Translation: we are removing the humans. Premiumize the customer, automate the worker — same company, same week.</p>

<p>The cruelest part is the bet underneath all of it: that the machine is cheaper than the person. It might not even be true. As Lance Haun pointed out this week, the companies furthest down the automation road are finding their AI to be a wildly more expensive and less predictable line item than the humans it replaced. We are evicting the middle on both sides of the counter on the theory that we'll save money, and we don't actually know that we will.</p>

<p>Somewhere there's a parent in that drive-thru line buying the one cheap, certain thing left in the day — who's about to find out their own job is the next thing getting premiumized out of existence. The customer priced out of the experience and the candidate frozen out of the market are the same person. Same eviction, different doorman.</p>

<p>On to the week in HR Tech. This week's Wrap features Ziprecruiter launching Smart Outreach, Joveo's AI Campaigns, Connecticut's new AI law, the latest employment data from Revelio Labs and ADP, how to use Oracle layoffs to boost your LinkedIn profile, Lance Haun on Tokenmaxxing, a conversation with Jennifer Ravalli, and the premiere of The Wrap's new segment, Wrapline.</p>

<p>Join me at 10am Friday for the live show, but if I don't see you, have a great weekend.</p>

<p><strong>Mike</strong></p>

<hr />

<h2>🎬 Wrapline</h2>

<h3>Introducing Wrapline</h3>
<a href="https://youtu.be/bJCsX7kVMxY"><img src="/newsletters/june-5-2026-the-house-always-trades-up/image2.webp" alt="Wrapline — Kristy McCann Built SkillCycle. Then Her Investor Took It" /></a>
<p>I've been bouncing the idea around in my head of creating longer-form storytelling for The Wrap, something as informative and entertaining as Dateline, I just didn't know where to start, until I read Kristy's story in my LinkedIn algorithm. Kristy is an HR Tech founder just like the many other startup founders I interview and follow in the space, and we know some of the same people, so I reached out to learn more. Once I heard her story, I knew it couldn't fit into the standard "just record an interview on screen" template. It deserved something deeper.</p>
<p>Introducing Wrapline, a news magazine-style look into what's happening in our space. It's a lot of editing so I can't do this every week, but check it out and look for more episodes to come. If you have an idea for a future episode, reach out!</p>
<p>Here's the short version of what you'll see. Kristy bootstrapped SkillCycle with $500,000 of her own money, and in April 2026 she filed a federal lawsuit in the Southern District of New York alleging that one of her investors used a predatory "loan to own" playbook to seize control of the company she built. In this first episode, she walks through what she says happened, what she wishes she'd known, and what every founder should check before signing a term sheet. The case is now in federal court; we're telling Kristy's side of it.</p>
<p><a href="https://youtu.be/bJCsX7kVMxY">Watch: Wrapline — Kristy McCann Built SkillCycle. Then Her Investor Took It →</a></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>ZipRecruiter launches Smart Outreach</h3>
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image3.webp" alt="ZipRecruiter launches Smart Outreach" />
<p>ZipRecruiter (<a href="https://finance.yahoo.com/quote/ZIP">NYSE: ZIP</a>) added automated candidate outreach to its Resume Database (50M+ job seekers) via a new feature, Smart Outreach, that uses AI to turn a job description into a personalized, editable message series — then fires up to three messages automatically, or until the candidate replies. CPO Megan Allen pitches it as freeing recruiters from chasing responses so they can focus on “the relationships that lead to great hires.”</p>
<p>It's a good move to appease their clients, but I don't see it mattering. Ask anyone which messages they delete first and it's the obviously automated “new opportunity” pings; for high-volume, high-turnover roles where a fast ping beats silence, fine, but for everything else the candidates worth hiring can tell a read profile from a keyword match and that just cheapens the whole interaction to where it's almost worthless (like their stock price). This will go right into the spam folder next to coupon codes for things I don't want.</p>
<p><a href="https://ziprecruiter-investors.com/news/news-details/2026/ZipRecruiter-Launches-New-AI-Feature-to-Automate-Recruiter-Outreach/default.aspx">Read more</a>.</p>

<h3>Joveo makes the prompt box the front door</h3>
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image4.webp" alt="Joveo makes the prompt box the front door" />
<p>Joveo launched AI Talent Campaigns this week which builds on that prompt box idea I mentioned in the <a href="https://ilovethewrap.com/newsletter/hr-techs-moviephone-moment">Moviephone essay</a>. Go into the prompt box, state what you are looking for in plain language, and it will build an entire campaign for you. You can also search your talent pool just like you would an LLM. Great move.</p>
<p><a href="https://www.joveo.com/press/joveo-introduces-ai-talent-campaigns/">Read more</a>.</p>

<h3>Connecticut quietly kills the “the algorithm did it” defense</h3>
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image5.webp" alt="Connecticut signs the CART Act into law" />
<p>Connecticut Gov. Lamont signed the Connecticut Artificial Intelligence Responsibility and Transparency (CART) Act into law this week. In the law they left a clause that you have to be clear with candidates over what tools you are using and how, and if you get sued for discrimination, you can no longer just blame the tool. I am not an expert, but Claude tells me that's Connecticut answering by statute the exact question Mobley v. Workday is still grinding through court and siding against employers. Worth keeping an eye on as it goes into effect in October.</p>
<p><a href="https://fastdemocracy.com/bill-search/ct/2026/bills/CTB00033095/">Read more</a>.</p>

<hr />

<h2>📊 Research &amp; Reports</h2>

<h3>Revelio: healthcare is the labor market</h3>
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image6.webp" alt="Revelio: healthcare is the labor market" />
<p>Revelio Labs ran the numbers and the takeaway is stark. Since January 2025, the healthcare sector has added 410.7k jobs, nearly double the 208.8k of total net job growth across the entire economy combined. Strip healthcare out and 2025 wasn't a slowdown, it was a contraction; the sector single-handedly kept the headline number from going negative. And it isn't administrative bloat — healthcare practitioners (physicians, nurses, surgeons) account for the largest share of the growth, nearly three times the next category, with home care aides close behind. Nearly half the new jobs came from small employers under 500 workers — community clinics and physician offices, not hospital megasystems. Revelio's read is that the pandemic catch-up phase is over and what comes next is slower, demand-driven growth.</p>
<p><a href="https://www.reveliolabs.com/news/macro/healthcare-job-growth-is-propping-up-the-labor-market-but-can-it-last/">Read more</a>.</p>

<h3>JOLTS: a record pile of openings nobody's filling</h3>
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image7.webp" alt="JOLTS: a record pile of openings nobody's filling" />
<p>The April JOLTS dropped Tuesday and while the headline looks like good news (job openings jumped to 7.6 million, up 731,000 on the month, with the openings rate climbing to 4.6%), as you read it gets worse. Hires fell to 5.1 million, down 419,000, with the hires rate dropping to 3.2% — and hires were little changed across essentially every industry. That's the whole labor market in one chart. Doors are being propped open everywhere; almost no one is walking through them. Quits held flat at 3.0 million and layoffs barely moved at 1.7 million — the “low-hire, low-fire” freeze, now in its second year, where nobody's getting cut but nobody's moving either. The openings surge is concentrated and a little suspicious: professional and business services alone added 668,000 openings while finance and insurance shed 135,000, and openings at the smallest employers (1–9 workers) more than doubled the prior month's pace. A posted job is not a hired person — and in a market where AI can spin up a req in seconds, the gap between “we're hiring” and “you're hired” has never been wider.</p>
<p><a href="https://www.hiringlab.org/2026/06/02/april-2026-jolts-report-the-bigger-they-are-the-harder-they-hire/">Read more</a>.</p>

<h3>ADP and Revelio private hiring numbers are out</h3>
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image8.webp" alt="ADP and Revelio private hiring numbers are out" />
<p>Both ADP and Revelio dropped their private labor numbers for May this week. Both of them have private jobs added as 122-124K. Both are saying that growth is real but narrow, and concentrated heavily in health care, public administration and professional services, while retail, leisure, and hospitality keep bleeding.</p>
<p>ADP's Nela Richardson called it the most broad-based hiring "in the last few years" — but underneath, the market is frozen, with hiring and attrition both falling and the reward for job-hopping shrinking. The official May jobs report drops Friday morning, the same day this hits your inbox, to say whether the government concurs. I'll cover the full labor-market picture in next week's Wrap.</p>
<p><a href="https://www.cnbc.com/2026/06/03/adp-jobs-report-may-2026-payrolls-increase-by-122000.html">ADP May Report</a> · <a href="https://www.prnewswire.com/news-releases/revelio-public-labor-statistics-reports-123-7k-us-jobs-gained-in-may-302791664.html">Revelio May Report</a></p>

<hr />

<h2>🔥 HR Hot Takes</h2>

<h3>Oracle finishes the job</h3>
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image9.webp" alt="Oracle finishes the job" />
<p>Oracle is wrapping the final phase of one of the largest workforce reductions in its history — roughly 30,000 jobs, about 18% of its global workforce, with final separation dates landing between June 1 and June 15. This isn't a company in trouble: Oracle posted around $17.2 billion in quarterly revenue. So why cut a fifth of your workforce? Capital reallocation for the over $50 billion they already committed to AI data centers and buildouts.</p>
<p>So here's my hot take. Another wave of separation notices is going to hit LinkedIn over the next couple of weeks. How can you leverage someone else's misfortune to promote yourself?</p>
<p>A quick refresher on best practices for performative empathy on LinkedIn:</p>
<ul>
<li>Forget the actual Oracle employees — how does this affect you? Open with your own feelings about their layoff. That's leadership.</li>
<li>Offer up your “network.” Not a job. Not a referral. The network. Gesture at it vaguely and let them come to you.</li>
<li>Deploy #oraclelayoffs. The algorithm can't reward compassion it can't index.</li>
<li>Hit the support emoji on every layoff post. One tap. You've done your part.</li>
</ul>
<p>It's hard to put yourself out there, but it shows what a great leader you are. Together, we can maximize our performative compassion — one support emoji at a time.</p>

<h3>The tokenmaxxing hangover</h3>
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image10.webp" alt="The tokenmaxxing hangover" />
<p>I've been highlighting Lance Haun on the Wrap since day one for good reason. Check out his take on “tokenmaxxing” - where companies tell employees to use AI, incentivize the top users, and act surprised when the bill comes. We cut headcount and somehow spent more? That's half this edition in seven words. We're watching companies shed people to fund AI infrastructure that turns out to be a more expensive and less predictable line item than the humans were, and the layoffs continue mostly because the infrastructure has to be paid for somehow.</p>
<p><a href="https://news.beaconturn.com/p/the-turn-to-the-maxxxxx">Read more</a>.</p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>Peer Networks are Better than Demos</h3>
<img src="/newsletters/june-5-2026-the-house-always-trades-up/image11.webp" alt="Peer Networks Are Better Than Demos in HR Tech — Jennifer Ravalli on Totally Talent" />
<p>In a market where every vendor sounds the same, the ones who win will be the ones willing to go under the hood. I got some hallway time with one of my favorite people in the space, Jennifer Ravalli, founder of Maverick Meridian for a candid conversation about what's really happening in HR tech with vendor differentiation, the death of best-of-breed, pricing strategy, and why the human element of sales and service is about to become the biggest differentiator of all.</p>
<p><a href="https://www.hr.com/en/resources/podcasts/talent/peer-networks-are-better-than-demos-in-hr-tech_mpy03vn8.html">Listen to the full interview on hr.com</a></p>
  `,
  },
  {
    slug: 'salt-in-the-eyes',
    date: 'May 29, 2026',
    title: 'Salt in the Eyes',
    tag: 'Labor Policy',
    excerpt: "The EEOC is moving to kill EEO-1 reporting just as a federal judge signals Workday must face its AI-bias class action. One arm of government sharpens the penalty for hiring discrimination; the other unscrews the smoke detector that proves it happens.",
    body: `
<img src="/newsletters/may-29-2026-salt-in-the-eyes/image1.webp" alt="Salt in the Eyes" />

<p>If you watched WWF in the early '90s, you'll immediately remember this, but for those of you who had lives, I'll paint the picture for you. It's 1993. Hero Brett "the Hitman" Hart has a gigantic sumo wrestler villain (or heel) Yokozuna on the mat and is trying to put Yokozuna's big, beefy legs into his Sharpshooter finisher. The ref's attention gets pulled to the far turnbuckle by some manufactured nonsense, and Yokozuna's manager (also evil) Mr. Fuji reaches his hands into his "ceremonial" salt bucket and flings a bunch of it into Brett Hart's face. Yokozuna pins him and wins the title while the crowd goes nuts.</p>

<p>Hulk Hogan then pins Yokozuna and gets awarded the title for some reason, but if he didn't, the ref completely blew it. I remember little Mike yelling at the TV at the blatant cheating and feeling cheated because it was so blatant and there were absolutely no consequences.</p>

<p>There are a couple of work trends happening in the US right now that make me feel like we got the WWF refs running the show.</p>

<p>On May 14, the EEOC, under acting chair Andrea Lucas, sent the White House a proposal to end EEO-1 reporting — the sixty-year-old data collection requirement on race, sex, and national origin. Then this week a federal judge in California issued a tentative ruling that Workday will likely have to face a nationwide class action arguing its AI screening tools filtered out applicants by race, age, and disability. Derek Mobley's case keeps surviving the motions designed to end it, and Judge Rita Lin signaled that California's discrimination statute may reach every hiring decision the vendor's software touched, anywhere in the country.</p>

<p>Seeing them side by side shows the dueling realities in America right now. One arm of the government agrees in open court that an algorithm can discriminate and somebody can be held accountable, while the other arm moves to switch off the dataset that has historically been how anyone proved discrimination happened at scale. We are both sharpening the penalty and unscrewing the smoke detectors.</p>

<p>So why are they moving in different directions? The courts and the EEOC are independent. No one is coordinating this, which is somehow worse, and worse is the theme of the times. Remember in June of 2020 when President Trump said Covid testing was "a double-edged sword?" That "when you do testing to that extent, you're going to find more people, you're going to find more cases. So I said to my people, slow the testing down."</p>

<p>Massage the data to make the problem go away. EEO-1 is the testing regime for hiring discrimination. The problem doesn't vanish; the reporting does, so no one has to answer for it.</p>

<p>So, what do we do? For vendors, the Workday lawsuit is an alarm. It doesn't just say "this employer discriminated" — it advances the theory that the vendor is an agent of every employer that uses its tool, which turns a screening company into a single point of legal liability for its entire customer base. You don't sue a thousand employers one at a time; you sue Workday once and reach all of them. That's a company-ending liability that, until it's solved, will hang over any hiring vendor, especially new entrants to the space that don't have the resources for all the enhanced compliance to move forward.</p>

<p>For candidates, protection itself is being privatized. EEO-1 was a standing, public, systematic record; a regulator could watch the patterns without anyone filing a thing. Now, good luck partner, you're on your own.</p>

<p>We look like we're about to find out whether that algorithm actually discriminated, right as we turn off the one tool that could prove it did. I don't know yet whether that's the beginning of real accountability or the most sophisticated salt-in-the-eyes we've run yet.</p>

<p>On to this week's HR Tech News. This week's Wrap features good news and bad news for Workday, EEO-1 data disappearing, JobGet acquires RippleMatch, the rise of the software engineer job posting with Brian Fink, AI interviewing with RightMatch and Fountain, a nervous Fed, and Monkeys in Florida?</p>

<p>Have a great weekend,</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>Workday makes Gemini its default brain</h3>
<img src="/newsletters/may-29-2026-salt-in-the-eyes/image2.webp" alt="Workday makes Gemini its default brain" />
<p>Workday announced this week that it has expanded its Google Cloud partnership to include Gemini, and that Gemini is now the default AI model inside Sana for Workday. We've been watching the big three of OpenAI, Anthropic, and Google move into a foundational layer within HR tech all year, and now the system of record for 65% of the Fortune 500 is tied to Google's AI 👀. <a href="https://newsroom.workday.com/2026-05-28-Workday-and-Google-Cloud-Expand-Strategic-Partnership-to-Bring-AI-Agents-for-HR-and-Finance-Into-Employees-Daily-Workflows">Read more</a>.</p>

<h3>Workday's AI discrimination case clears another hurdle</h3>
<img src="/newsletters/may-29-2026-salt-in-the-eyes/image3.webp" alt="Workday AI discrimination case" />
<p>A federal judge appeared to signal this week that Workday will likely have to defend the class action claiming its AI hiring tools screened out applicants by race, age, and disability. In a tentative ruling, US District Judge Rita Lin found California's Fair Employment and Housing Act appears to apply nationally to the class led by Derek Mobley, citing two state appeals decisions. Oral arguments are set for June 15th, so this isn't final, but it's still going. <a href="https://www.mlex.com/mlex/articles/2482646/workday-likely-must-face-employment-discrimination-claims-on-ai-tools-us-judge-says">Read more</a>.</p>

<h3>EEOC moves to kill discrimination data</h3>
<img src="/newsletters/may-29-2026-salt-in-the-eyes/image4.webp" alt="EEOC moves to end EEO-1 reporting" />
<p>She's BAAACCK! I missed this last week, but the EEOC sent a proposal to the White House on May 14 to end EEO-1 reporting. EEO-1 is a requirement dating back to the Civil Rights Movement that obligates companies with 100+ employees, and federal contractors with 50+, to file annual workforce data on race, sex, and national origin. Chair Andrea Lucas also wants to roll back unspecified requirements under Title VII, the ADA, and the Pregnant Workers Fairness Act. Former EEOC chair Jenny Yang called the filing a critical tool for identifying hiring discrimination that's otherwise hard to surface, pointing to the 2017 Bass Pro Shops case where EEO-1 patterns helped drive a $10.5M settlement. Remember, if we stop testing for Covid, the cases will go down 🙄. <a href="https://www.hr-brew.com/stories/eeoc-moves-to-end-eeo-1-reporting-on-race-and-gender">Read more</a>.</p>

<hr />

<h2>💰 Funding &amp; Acquisitions 🤝</h2>

<p><strong>JobGet acquires RippleMatch</strong> — JobGet bought early-career and campus recruiting platform RippleMatch, folding its student talent pool and matching tech into JobGet's stated 100M+ candidate network. <a href="https://www.prnewswire.com/news-releases/jobget-acquires-ripplematch-expanding-its-ai-powered-hiring-platform-across-hourly-and-early-career-talent-302783859.html">Read More</a></p>

<p><strong>Joblist acquired by BOLD</strong> — Job-seeker-first search platform Joblist, launched by Wilbur Labs in 2019, sold to career-tech holding company BOLD, terms undisclosed. Built by ZipRecruiter and Google veterans, Joblist treated the candidate as the customer rather than the employer buying postings, scaling to 100M+ job searches over seven years. <a href="https://www.wilburlabs.com/announcements/joblist-acquired-by-bold">Read More</a></p>

<hr />

<h2>🔥 HR Hot Takes</h2>

<h3>The Jevons Paradox vs. the doom narrative</h3>
<img src="/newsletters/may-29-2026-salt-in-the-eyes/image5.webp" alt="The Jevons Paradox vs. the doom narrative" />
<p>Great post from Brian Fink this week on software engineering jobs rising. The frame is the Jevons Paradox — make a resource more efficient and total consumption rises — applied to code: AI made software cheap, so every law firm and regional manufacturer can suddenly afford bespoke builds, and someone has to architect them. <a href="https://fwdmotion.substack.com/p/the-jevons-paradox-is-having-its">Read more</a>.</p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>RightMatch and Fountain in Vegas</h3>
<p>Hard to believe I'm still rolling through Transform interviews, but I got a couple of good ones this week.</p>
<img src="/newsletters/may-29-2026-salt-in-the-eyes/image6.webp" alt="Sterling Smith — RightMatch on Totally Talent" />
<p>First, I talked with RightMatch CEO Sterling Smith about the crazy application inflation happening right now and how solutions like RightMatch are thinning the herd by moving the interview to day 1 as an AI screen/verification. Their agent autonomously invites the most qualified applicants to a 5–15 minute video-first interview, ranked and scored, and integrated with their ATS.</p>
<img src="/newsletters/may-29-2026-salt-in-the-eyes/image7.webp" alt="Peter Eisenman — Fountain on Totally Talent" />
<p>Next, I talked to Fountain's Peter Eisenman about who really blocks AI adoption inside big enterprises and how the CHRO can be a "tinkerer in chief." Also fun fact: 75% of applicants now pick an immediate AI interview over scheduling a human one.</p>
<p><a href="https://www.hr.com/en/resources/podcasts/talent/volume-without-quality-is-killing-recruiting_mpejb5rt.html">Totally Talent with Sterling Smith, RightMatch</a> · <a href="https://www.hr.com/en/resources/podcasts/talent/start-small-win-big_mpmv9fz1.html">Totally Talent with Peter Eisenman, Fountain</a></p>

<hr />

<h2>👇 Worth a Click</h2>

<h3>The Fed's forecasters are getting nervous</h3>
<p>The Philadelphia Fed's Survey of Professional Forecasters took a turn: the panel cut GDP growth to a 2.1% annualized rate for Q2 and 2.2% for the year, while pushing the inflation forecast toward 6% for Q2. Expected monthly job creation was revised down to 43,000 from 70,000, projected unemployment moved to 4.5%, and recession odds over the next year ticked from 25% to 30%. Weaker growth, hotter prices, fewer jobs — the rare forecast where every needle moves the wrong way at once. If you've been telling yourself the labor market just feels soft, here's 37 economists agreeing with you in a spreadsheet. <a href="https://www.staffingindustry.com/news/global-daily-news/philadelphia-fed-expects-weaker-us-economy-surging-inflation">Read more</a>.</p>

<h3>Monkeys in Florida!</h3>
<img src="/newsletters/may-29-2026-salt-in-the-eyes/image8.webp" alt="Monkeys in Florida" />
<p>I caught this story of a Florida woman who looked into the preserve behind her house this week at what she figured was a large cat, and watched it stand up — only to be a monkey. A rhesus macaque, to be exact. But Mike, don't those monkeys live in Asia? Yes, so I went down a rabbit hole to find out how they got there and it's great. In 1938 a tour-boat operator named Colonel Tooey released six of them on a Silver Springs island to make the place feel more Tarzan — not knowing rhesus macaques are strong swimmers. They were gone within minutes. He bought six more. Those escaped too. Nearly a century later there are hundreds of them, a chunk carrying Herpes B, spreading across the state one preserve at a time. Awesome. <a href="https://www.upi.com/Odd_News/2026/05/28/monkey-rhesus-macaque-Longwood-Florida/5251779975577/">Read more</a> · <a href="https://springsinflorida.com/blog/why-are-there-monkeys-at-silver-springs/">The backstory</a></p>
    `,
  },
  {
    slug: 'generation-ai-graduates',
    date: 'May 22, 2026',
    title: 'Generation AI Graduates',
    tag: 'AI & Future of Work',
    excerpt: "Stanford's Class of '26 — the cohort that spent all four years alongside ChatGPT — graduates into a labor market that taught them to read work as a pure transaction. The day the cycle turns, what will they be loyal to?",
    body: `
<img src="/newsletters/may-22-2026-generation-ai-graduates/image1.webp" alt="Generation AI Graduates" />

<p>This week a few million people will pick up a diploma and become job seekers. Caps, gowns, a name read aloud (unless their college outsourced that to AI, which <a href="https://www.nbcnews.com/video/graduation-ceremony-disrupted-by-ai-name-reading-system-263678021508">happened at one school this week</a>), and that timeless photo with their parents. As the parties die down, they move toward the next phase of life — applying for jobs and desperately hoping their degree was worth the price of admission.</p>

<p>One of those students is Theo Baker, graduating from Stanford. You may know the name — he's the freshman who broke the research-misconduct story that ended his university president's tenure, and he has a book out this week about his experience at Stanford. He's a real journalist who finds a thread and pulls it just to see what will unravel.</p>

<p>In an interview with the New York Times (included in the Worth a Click section), Baker describes his class as the first to spend all four years of college alongside ChatGPT, which landed on campus two months after he did. Looking back, he realizes they were an experiment — not a class that simply adopted a tool, but a cohort that was run through one.</p>

<p>These kids aren't stupid; it's Stanford, after all. But what caught me is how they adapted to a college life with AI in it. Coursework? Trivial. Internships? Meh. They switched from caring about whether something would be on a test to how they could get paid. Why spend a semester in advanced coding — learning, testing, building the slow way — when you could ship something now, raise millions, and learn as you go?</p>

<p>So here is the cohort, diploma in hand. And here is what's waiting for them.</p>

<p>The offer to a young worker used to start with mission — the pitch, however oversold, that the work meant something, that you were here to do a thing worth doing. You don't need to canonize anyone to see how much that pitch has thinned. Go back ten or fifteen years and the founder archetype, whatever its hypocrisies, at least pointed at the world — at disease, at literacy, at clean water, at problems with body counts (Bill Gates did a lot of philanthropy before philandering).</p>

<p>You could be cynical about the marketing and still concede the marketing was aimed somewhere outward. The dominant founder energy now points inward: at valuation, at extraction, at the personal balance sheet, at the increasingly literal project of accumulating enough to wall yourself off from the consequences.</p>

<p>A young person deciding where to spend their twenties can read that shift as clearly as Baker's classmates read theirs. The "change the world" pitch still gets made, but it has to be made now to an audience that has watched where the money actually goes.</p>

<p>The job market is bad right now, and it will not be bad forever. Labor markets are cyclical; that is the one thing they reliably are. The rung gets sawed off and, eventually, in some form, gets rebuilt. The hiring freeze thaws. And on the day it does, the people who today have no leverage at all get something back: the ability to say no.</p>

<p>So here's the question I keep turning over. We have spent a few years training an entire generation — the sharp ones, the Stanford ones — to read work as a pure transaction, because that is what we showed them it was. When the cycle turns and that cohort, a few years more experienced and considerably less frightened, finally gets to choose, what exactly will they be loyal to? You cannot spend a generation's whole entry into the workforce teaching it to follow the money and then act surprised when that's the only thing it follows.</p>

<p>On to this week's news while I dream of getting Theo Baker to come on the show. This week's Wrap features SAP's autonomous enterprise, OpenAI creepin' into HR consulting, Juicebox launching always-on sourcing agents, more funding for Humanly, cool launches from Robin Schooling and Orlando Haynes, talking AI interviews with Aaron Wang of Alex AI and Yazad Dalal of Joveo, and a look at what's happening with the next generation of tech founders at Stanford.</p>

<p>Have a great weekend!</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>Bersin on SAP's Autonomous Enterprise — required reading</h3>
<img src="/newsletters/may-22-2026-generation-ai-graduates/image2.webp" alt="SAP Autonomous Enterprise" />
<p>At Sapphire, SAP laid out its "Autonomous Enterprise" — the pitch that the ERP stops being software you operate and becomes a system that runs business processes itself. The scaffolding for it: 224 agents and 51 assistants across finance, HR, and the rest of the suite; a proprietary tabular data model built to reason over the massive structured data that trips up ordinary LLMs; a Knowledge Graph as the semantic layer that lets agents understand how SAP's data actually connects; and Joule Studio, a developer environment for building agents on top. CEO Christian Klein is now calling SAP an AI company.</p>
<p>Josh Bersin's breakdown is fantastic and I love the analogy with Waymo and Zoox. Waymo is a normal car that drives itself — the existing vehicle, automated. Zoox threw out the car and redesigned the whole thing around the passenger, no steering wheel, no driver's seat. Bersin's read is that SAP's Autonomous Enterprise is a Waymo. It automates existing SAP processes brilliantly, but it doesn't reimagine how the work gets done — the underlying process is still the SAP process, now with agents driving. <a href="https://joshbersin.com/2026/05/saps-autonomous-enterprise-it-now-calls-itself-an-ai-company/">Read more</a>.</p>

<h3>OpenAI launches $4B Deployment Company</h3>
<img src="/newsletters/may-22-2026-generation-ai-graduates/image3.webp" alt="OpenAI Deployment Company" />
<p>OpenAI rolled out the OpenAI Deployment Company on May 15, backed by more than $4 billion in initial investment. The unit will embed "Forward Deployed Engineers" inside customer organizations to redesign workflows around AI, and OpenAI is folding in AI consulting shop Tomoro — about 150 specialists with prior work at Tesco and Virgin Atlantic — to staff it up. It follows OpenAI's February Frontier Alliances with McKinsey, BCG, Accenture, and Capgemini, and lands alongside Anthropic's own ~$1.5B services venture backed by Blackstone, Goldman Sachs, and Hellman &amp; Friedman.</p>
<p>HR Executive's Jill Barth flagged the part HR leaders should sit up for: the FDEs are explicitly being pointed at hiring pipelines, performance management, and workforce planning, and OpenAI's announcement names zero CHROs as stakeholders.</p>
<p>The foundation model providers are scaling new heights, moving another level up. They already aren't content to sell APIs — they're encroaching on the platform layer where HR tech vendors used to be safe. Now they're eating the consulting layer that translated vendor product into HR workflow too. The model maker, the SI, and the change management partner are increasingly the same logo. <a href="https://hrexecutive.com/openais-new-4b-consulting-venture-lands-squarely-in-hr-territory/">Read more</a>.</p>

<h3>Juicebox launches always-on sourcing agents</h3>
<img src="/newsletters/may-22-2026-generation-ai-graduates/image4.webp" alt="Juicebox sourcing agents" />
<p>Juicebox rolled out AI agents that continuously source candidates across every open role — mapping a talent graph, surfacing matches, and running targeted outreach at a speed no human team could keep up. Founder David Paffenholz frames the agents as exhaustive: map everyone in a role, find the top ones, reach the ones who fit. The company has powered 560,000+ searches and engaged 3M+ candidates, with Ramp, Cursor, and Cognition among the named customers. Juicebox's own framing of the problem is the part worth sitting with: the average opening now draws nearly 250 applications, inbound pipelines are buckling under low-intent candidates, and the companies responding best have stopped trying to fix inbound altogether.</p>
<p>I had a chance to sit down briefly with Paffenholz and the Juicebox team at UNLEASH, and they are great. I love this direction. It's the exact move predicted last week — when the front door is jammed, sourcing moves to the top of the funnel and goes continuous. The agent doesn't wait for the flood of applications; it goes and finds the candidate before they ever apply. <a href="https://www.businesswire.com/news/home/20260520017045/en/Juicebox-Launches-AI-Agents-That-Continuously-Source-Top-Talent-Across-Every-Open-Role">Read more</a>.</p>

<hr />

<h2>💰 Funding &amp; Acquisitions 🤝</h2>

<p><strong>Humanly raises $25M Series B</strong> — Seattle-based Humanly closed a $25M Series B with SEEK Investments, Drive Capital, MassMutual Catalyst Fund, and Zeal Capital Partners. The conversational-AI platform handles hourly and high-volume hiring across chat, phone, and video, and reports 250,000+ candidates engaged a month. The detail worth marking: CEO Prem Kumar is pushing a "service-as-software" model — pay-per-candidate and pay-per-hire, billing for outcomes instead of seat licenses. <a href="https://www.hrtechnologywire.com/press-releases/humanly-raises-25m-series-b-to-help-companies-hire-faster-retain-and-stay-fully-staffed">Read More</a></p>

<p><strong>Findd raises $21M</strong> — Provo-based Findd pulled in a $21M growth investment from Unbundled Capital for its AI-native workforce management platform for frontline workers — scheduling, time capture, compliance, payroll prep — with a natural-language agent layer that checks every action against labor rules before it executes. Frontline remains the segment where the funding keeps flowing. <a href="https://hrtechfeed.com/workforce-management-platform-raises-21m/">Read More</a></p>

<p><strong>Deel acquires Sastrify</strong> — Deel scooped up Cologne-based SaaS procurement platform Sastrify, terms undisclosed. It's Deel's 10th acquisition since 2022 and folds into Deel IT alongside the 2024 Hofy pickup: hire them on Deel, ship them a laptop through Deel, now manage their software stack through Deel too. <a href="https://www.staffingindustry.com/news/global-daily-news/deel-acquires-sastrify-a-saas-procurement-and-management-platform">Read More</a></p>

<p><strong>Saile raises $2.2M pre-seed</strong> — Saile, a physician-founded healthcare staffing platform, emerged from stealth with a $2.2M pre-seed led by Matchstick Ventures. Its pitch is a "universal credential passport" — a portable verified-credentials vault that lets vetted physicians move across locum, per diem, and telemedicine work without restarting onboarding. Matchstick's Ryan Broshar framed it as the infrastructure layer beneath every healthcare staffing decision. <a href="https://hrtechfeed.com/healthcare-staffing-platform-lands-2-2m/">Read More</a></p>

<hr />

<h2>🔥 HR Hot Takes</h2>

<h3>Two prominent voices in the HR space are rolling out fresh initiatives</h3>
<img src="/newsletters/may-22-2026-generation-ai-graduates/image5.webp" alt="Robin Schooling and Orlando Haynes launches" />
<p>I always like to highlight the wonderful people in this space as they launch cool endeavors and what's better than promoting people you genuinely like?</p>
<p>Longtime friend of the program Robin Schooling has teamed with BelleSage Partners and they are announcing a new recruitment on demand team, headed by Managing Director Rachel Cote. Did you just eliminate your recruiting team because of AI and are now realizing you might have jumped the gun? Give them a call.</p>
<p>Orlando Haynes of the CareerTalks Podcast has launched Career Capital, an AI-powered platform for employees that captures and articulates workplace wins in real time so a professional has structured evidence when a review or a job search arrives. This is like the career agent in your pocket I mentioned last week!</p>
<p>Congrats to both and check out the announcements below.</p>
<p><a href="https://www.linkedin.com/posts/bellesagepartners_bellesage-partners-rod-press-release-may-activity-7463206946461081600-CJJb">BelleSage Partners Announcement on LinkedIn</a> · <a href="https://hrtechfeed.com/talent-acquisition-leader-launches-career-capital-an-ai-powered-platform-to-help-professionals-document-and-leverage-workplace-achievements/">Career Capital</a></p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>Totally Talent: Two AI interviewers, two theories of the candidate flood</h3>
<img src="/newsletters/may-22-2026-generation-ai-graduates/image6.webp" alt="Totally Talent: AI interviewers" />
<p>I've been rolling through the interviews I did in Vegas this spring at UNLEASH and Transform, and two quick podcasts are worth your time: Aaron Wang, CEO of Alex AI, and Yazad Dalal, Chief Growth Officer at Joveo. Both companies have an AI interviewer, and both make the same counterintuitive pitch — interview every single candidate who applies — but they've arrived from opposite ends of the funnel.</p>
<p>Alex starts the moment an application lands: it calls the candidate, leaves the voicemail, chases the email, runs the screening conversation autonomously. Wang's case for why this is suddenly necessary is the Application Inflation I mentioned weeks ago. When every resumé is AI-polished and reads the same, the keyword match carries no signal, so differentiation has to move to a live conversation.</p>
<p>Joveo wants the flood to never form. Its name is a contraction of "job for everyone," and its stated ambition is a 4-3-2-1 ratio — four apply clicks, three applications, two shortlists, one hire. Rather than absorb tens of thousands of applicants and sort them, Joveo targets precisely enough that the wide net is never cast. Dalal's "sludge" image stuck with me: for forty years an application has gone into a drain, and the candidate never learns whether it moved while the recruiter sits in the exact same sludge.</p>
<p>Same problem, two cures.</p>
<p><a href="https://www.hr.com/en/resources/podcasts/talent/everyone-gets-an-interview_mpbirb9k.html">Totally Talent with Aaron Wang, Alex AI</a> · <a href="https://www.hr.com/en/resources/podcasts/talent/4-3-2-1-hiring_mp5xv6xb.html">Totally Talent with Yazad Dalal, Joveo</a></p>

<hr />

<h2>👇 Worth a Click</h2>

<h3>The Stanford inside Stanford</h3>
<img src="/newsletters/may-22-2026-generation-ai-graduates/image7.webp" alt="Theo Baker — How to Rule the World" />
<p>I referenced this in the lead, but Theo Baker, the freshman who broke the Marc Tessier-Lavigne research-integrity story (Polk Award, Warner Bros. option, the works), is graduating with a book out Tuesday about the innerworkings of Stanford and how new tech leaders are formed. <em>How to Rule the World</em> describes a Stanford where VCs hire upperclassmen to scout freshmen and actually joining the startup club is a negative sign.</p>
<p>I want to highlight this line about the current labor market.</p>
<p><em>"There's a common refrain among people in this world that it's easier to raise money for a startup right now than to get an internship."</em></p>
<p>If I was in college at this time, I would try to get an internship for real on-the-ground experience, but I'd also start a side hustle with Claude. <a href="https://techcrunch.com/2026/05/18/theo-baker-spent-four-years-investigating-stanford-before-he-leaves-heres-what-he-found/">Read more</a>.</p>
    `,
  },
  {
    slug: 'hiring-funnel-collapsed',
    date: 'May 15, 2026',
    title: 'The Hiring Funnel Collapsed',
    tag: 'AI & Future of Work',
    excerpt: 'By 2030, the seven-stage hiring funnel has collapsed into three — and the only step left for humans is whether they want to work together.',
    body: `
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image1.webp" alt="The Hiring Funnel Collapsed" />

<p>It's 2030 and I wake up to a beep from my iPhone 22 to see that Ziggy, my work agent, has had a busy night. He's completed two interviews with corporate agents while I slept. He passed one and declined another because it was a Director role at a Series C. Normally, this job would be a "rocket ship," but Ziggy remembers I told it eighteen months ago that I wanted to stay an individual contributor so I had flexibility while my kids are in high school, and it took me at my word. Additionally, Ziggy flagged an interesting opportunity at a company adjacent to my industry, in a city I've been quietly Googling for the past 6 months. Ziggy put it in the "worth a look" bucket.</p>

<p>Underneath the hiring brief, the rest of my morning summary. My 401(k) is 4% behind the glide path Ziggy set when I turned 40, but it's already rebalanced and flagged a backdoor Roth discussion for next quarter. My dental claim from March finally cleared. My fractional invoice to Intellihire is 2 days late, and Ziggy has already sent the second nudge in a tone I would have written myself if I'd had the energy. Need coffee. And sugar. Now.</p>

<p>As I wait for my Dunkin Cookie Coolatta with Ozempic chaser, I remember the last time I updated a resume. It was late 2026, and I was doing it the way everyone did it then — frantically, at the kitchen table, late at night, pasting the job description into a Claude tab and having him match the keywords a model on the other side was going to score me on anyway. Peak Application Inflation, though we didn't have the term for it yet. Every applicant getting cheaper by the week, every bullet point worth a little less than the one before it. I'd been laid off in the wave that took out most of the middle of the org chart in tech that year, and did what everyone else did — pivoted to fractional. I picked up three clients in a quarter, at roughly half the hourly rate and a third of the stability I'd had as a full-time employee. I told myself it was a bridge.</p>

<p>It may still be a bridge. But by now I'm starting to think it's just the path to a new destination.</p>

<p>The reason my morning looks like this, with searching for work being not as important as searching for coffee, is that the hiring funnel I knew in 2026 doesn't exist anymore. The whole shape of how work gets matched to workers collapsed somewhere between the layoffs and the agents.</p>

<p>The old recruiting funnel had seven stages and most of them were friction. Job posting. Application. Resume screen. Phone screen. Assessment. Interview loop. Offer. Seven steps all reliant on the previous steps with a lot of uncertainty and waiting in-between.</p>

<p>This new pipeline? It's not even a pipeline. It's three stages with the only friction at the end.</p>

<p>Here's how hiring works in 2030:</p>

<p><strong>Stage One — The Listen</strong></p>

<p>The first is continuous. Your agent is in the market every day, whether you are or not. There is no job posting in the way you remember it — the static description, the careful keywords, the application portal that asked you to upload a resume and then asked you to type the same information into seven separate fields. Roles exist as structured intent inside corporate agents: this is the work, this is the team, this is the constraint, this is the budget. Your agent reads them the way you used to read a job board on Sunday night, except it reads all of them, all the time, and it already knows which ones are worth your attention.</p>

<p><strong>Stage Two — The Match</strong></p>

<p>Your agent has been in conversation with three corporate agents and you didn't write a single bullet point to make it happen. None of them asked for a resume. The resume was, at best, a list — a flattened export of a career with texture in fifty places the format couldn't hold. The career LLM doesn't have that problem. It's been reading your actual work for years. The projects you forgot to put on LinkedIn. The meeting transcripts where you talked a client off a ledge. The code, the writing, the way you describe problems in Slack. It knows you're better at ambiguous-stakeholder work than you'd ever claim, and worse at structured operational rollouts than you'd ever admit. It knows you, in other words, better than any document you would have produced about yourself.</p>

<p>When the corporate agent wants depth, your agent provides it. A values inventory from 2028. A structured cognitive sample from 2029. A verified-skills graph built from six years of real output, not a forty-five-minute take-home you spent your Saturday on. Real examples — <em>show me how she handles a customer escalation that turns political</em> — pulled from the last two years of actual work, anonymized, consented, verified. The agents negotiate the level of disclosure. You set the privacy posture. You almost never get involved.</p>

<p><strong>Stage Three — The Meeting</strong></p>

<p>By the time the opportunity gets to the actual people involved, the corporate agent has narrowed 1,400 applicants to four humans, and you're one of them. You walk in at 11 AM and there is no ambiguity left to manage. No mystery about whether you'd be a fit on paper — the paper is gone, and the fit was confirmed three layers of machine ago. No anxious week of waiting by the phone. No rewriting your bullets at midnight to match a keyword. No researching the company at 2 AM, trying to convince yourself you wanted it. No printed list on the kitchen counter. None of the small, accumulated indignities that used to make up the experience of looking for work.</p>

<p>What's left is the only thing the agents can't do. Two humans, in a room, deciding whether they want to work together. The thing your agent doesn't have and never will — intuition, gut, the read across the table, the feel of the way someone answers a hard question. The LLMs are extraordinary, and they are not this. Everything before this moment was machine. This part is still yours.</p>

<p>You feel like you really connect with this team and are excited to start. You shake hands, sign the offer and rush to LinkedIn to tell everyone how "excited you are to announce that you'll be joining X company," and watch the likes pour in.</p>

<p>Now, I know I have an overactive imagination, but this feels like where the industry is moving. Instead of recruiters drowning in applicants, and applicants waiting for any communication from a job posting they applied to back in March, the friction just… goes away. Walk back through the old seven stages and tell me which of them actually created value.</p>

<p>The job posting? We all knew those were cut-and-pasted from the last req or generated by an AI that hallucinated four required certifications and a tech stack the team doesn't actually use. Pretty standard.</p>

<p>The application? Anyone who's submitted one through Workday knows the joke. You upload the resume, the parser shreds it into the wrong fields, and then you re-type the same information into a form designed in 2011. Fifteen minutes per application, thousands of applications a month, a full workday of data entry on a document you already uploaded.</p>

<p>The resume itself? Whatever passes for one in this world, Ziggy assembles on demand — pulled live from years of verified work, configured for the opportunity in front of him. No more <em>managed</em> versus <em>led</em>. No more six-month gaps to explain. No more keyword roulette.</p>

<p>The screen? Done at the agent layer, instantly. No time wasted on the wrong fit, and no candidate getting in the door with credentials they exaggerated, because the agent verified them before the conversation started.</p>

<p>The assessment? Either Ziggy already carries the proof — the actual work, anonymized and consented — or the corporate agent quizzes him to see if I'd pass. I never spent a Saturday on a take-home.</p>

<p>The interview loop? Mostly the agents. What's left is one conversation, with two humans, in a room.</p>

<p>The offer? That's the only thing left. Whether they want you. Whether you want them. Everything else was overhead.</p>

<p>That's the world Ziggy's getting me ready for. Meanwhile, we're still in 2026 and have a whole week of news to catch up on.</p>

<p>This week's Wrap is loaded with juicy content. Intuit brings their 18M payroll customers an HCM, Workday rolls their Sana agent into Microsoft 365 Copilot, Eightfold launches TalentForge, UKG goes agentic in payroll, Built In wants to be the Glassdoor for ChatGPT, Ashby buys Talent Llama, The Labor Market in 5 minutes, Interviews on workforce management with Sandra Moran and Marcus Mossberger, and your boss's new AI wants to know why you're scowling.</p>

<p>Enjoy and have a great weekend!</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>Intuit Drops QuickBooks Workforce, Buys Itself an HCM Customer Base</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image2.jpg" alt="Intuit QuickBooks Workforce" />
<p>Intuit announced QuickBooks Workforce on May 6 — a full end-to-end HCM platform built on QuickBooks Payroll, which already processes pay for 18 million U.S. workers. That number is the story. Gusto, Rippling, Paylocity, and BambooHR have spent years trying to land SMB customers one at a time; Intuit just turned on an HCM stack inside the accounting platform they already use. <a href="https://quickbooks.intuit.com/r/news/intuit-unveils-quickbooks-workforce/">Read more</a>.</p>

<h3>Workday Goes Where the Workers Are: Inside Microsoft 365 Copilot</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image3.jpg" alt="Workday Sana Self-Service Agent in Microsoft 365 Copilot" />
<p>Workday announced this week that its Sana Self-Service Agent is now generally available inside Microsoft 365 Copilot — meaning employees can check vacation balances, request time off, look up an expense, or kick off a performance review without ever opening Workday.</p>
<p>The smart move here is distribution. Microsoft has spent two years pushing Copilot into the enterprise, and the install base is enormous — wherever an employee already has a Microsoft 365 license, Workday is now a prompt away. No new login to roll out, no separate app to train people on, no change management. It's the same play Intuit is running at the top of this section with QuickBooks Workforce: when you have a partner with reach, you ship your product through their pipes instead of building your own. <a href="https://newsroom.workday.com/2026-05-13-Workday-Brings-Sana-Self-Service-Agent-for-HR-and-Finance-Into-Microsoft-365-Copilot"><strong>Read the release</strong></a>.</p>

<h3>Eightfold Launches TalentForge, Bets the Industry on Custom-Built HR Software</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image4.webp" alt="Eightfold TalentForge" />
<p>Eightfold AI used its Cultivate 2026 conference to launch TalentForge — a platform designed to let enterprises build custom HR software on top of Eightfold's talent intelligence layer. In the announcement, CEO Ashutosh Garg stated that 90% of enterprise software will be custom-built in the future. You know what? It's a bold prediction but he's probably right. Additionally, Eightfold rolled out 360 Interview and Workforce Readiness, an AI interviewer built in house and an "AI coach" that may be a coach, but it's also a spy. <a href="https://eightfold.ai/blog/introducing-talentforge/">Read the CEO blog</a>.</p>

<h3>Oracle Tells Laid-Off Workers: Take It or Leave It</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image5.png" alt="Oracle severance dispute" />
<p>TechCrunch's Julie Bort reported this week that the 20,000 to 30,000 employees Oracle cut via email on March 31 tried to organize for better severance terms — and Oracle flatly refused to negotiate. The terms explain the revolt: four weeks of pay plus one week per additional year, capped at 26 weeks, one month of COBRA, no acceleration of unvested RSUs. One long-tenured employee told Time he lost $1 million in stock that was four months from vesting. Then there's the WARN Act workaround: hybrid workers near offices discovered Oracle had quietly classified them as remote, sidestepping the 50-person-per-location threshold that triggers two-month notice. <a href="https://techcrunch.com/2026/05/08/laid-off-oracle-workers-tried-to-negotiate-better-severance-oracle-said-no/">Read the article</a>.</p>

<h3>UKG Goes Full Agentic on Payroll</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image6.jpg" alt="UKG Pro Pay with Workforce AI" />
<p>UKG used Payroll Congress 2026 to unveil Pro Pay with Workforce AI — a six-feature stack the company describes as combining "agentic, assistive, and generative AI" to overhaul payroll processing. Six features, six variations on "AI," one product. Worth holding next to UKG's 950 job cuts from a few weeks back — the company is automating the back-office function while doing the same to itself. <a href="https://www.businesswire.com/news/home/20260511304428/en/UKG-Unveils-Agentic-powered-UKG-Pro-Pay-with-Workforce-AI-at-Payroll-Congress-2026">Read more</a>.</p>

<h3>Workvivo Launches Seer, Reunites the Glint Band</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image7.webp" alt="Workvivo Seer" />
<p>Workvivo (by Zoom) rolled out Seer this week — a standalone "people intelligence" platform built on the employee listening capabilities Workvivo had previously bundled into its broader product. The org chart behind it is the actual story: Justin Black, who ran Glint at LinkedIn and Microsoft, is now Head of Seer; Phil Murphy from Qualtrics and Jaime Gonzales (also ex-Glint) round out the leadership. Workvivo's own survey of 4,736 frontline and desk workers backs the framing: 62% are comfortable giving feedback, but only 49% see meaningful change. "The industry doesn't have a listening problem, it has an execution problem," Black said — and the Glint alumni building it have earned the benefit of the doubt. <a href="https://www.workvivo.com/newsroom/workvivo-launches-seer/">Read more</a>.</p>

<h3>Built In Bets on Being the Glassdoor for ChatGPT</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image8.png" alt="Built In Employer Intelligence Platform" />
<p>Built In launched its Employer Intelligence Platform last week, pitched as the first platform designed to help companies control how they're represented when candidates ask ChatGPT, Claude, or Google's AI Overviews about employers. The "first" claim is doing some marketing work — generative engine optimization has been a quietly growing category for over a year — but the underlying shift is real. Candidate research used to start at Glassdoor and end at LinkedIn; now it starts with "tell me about working at [Company]" typed into a chat window. CEO Maria Christopoulos Katris leans on the moat that LLMs already cite Built In as a trusted source on tech employers. I love this move to integrate your unique data into LLMs that people are already using. Go where your audience is! <a href="https://employers.builtin.com/built-in-launches-the-first-employer-intelligence-platform-for-the-ai-driven-hiring-era/">Read more</a>.</p>

<hr />

<h2>💰 Funding &amp; Acquisitions 🤝</h2>

<h3>Ashby Buys Talent Llama, Joins the AI Interviewer Parade</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image9.jpg" alt="Ashby acquires Talent Llama" />
<p>Of course I published last week's Wrap before this news dropped, but wanted to note that Ashby has bought Talent Llama as their AI interview layer, joining the AI interview acquisition parade in hiring. Congrats to both teams. As for the other 30 AI interview startups that I know of? The clock is ticking to either get acquired or fade away. <a href="https://www.ashbyhq.com/blog/culture/talent-llama">Read more from Ashby's CEO</a>.</p>

<hr />

<h2>📊 Research &amp; Reports</h2>

<h3>Labor Market in Five Numbers · April 2026</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image10.png" alt="Labor Market in Five Numbers — April 2026" />
<p>Over on <a href="https://ilovethewrap.com">ilovethewrap.com</a>, I've built out a section highlighting the latest labor market numbers from the government (like the BLS and JOLTS reports), as well as vendors (ADP, Aspen Tech Lab, Revelio Labs) to try and figure out what's happening in the labor market.</p>
<p>The April numbers are in (hooray) and taken together, its telling the story beyond a flat unemployment market. Here are five stats that show what's going on:</p>
<p><strong>+115K</strong> — BLS nonfarm payrolls in April, more than double the 55K consensus, with March revised up to +185K. But the household survey shed 226K workers in the same month and labor force participation slipped to 61.8%, the lowest since October 2021. Headline says the bounce is real. Internals say fewer people are even trying.</p>
<p><strong>6.6% vs. 4.4%</strong> — ADP's job-changer wage premium is now just 2.2 points above job-stayers, the narrowest gap since 2020. Switching used to be the fastest raise in town. It barely beats staying put now, which is why JOLTS quits remain 285K below a year ago even after ticking up to 2.0% in March.</p>
<p><strong>+76.9% YoY</strong> — AI Specialist postings per Aspen Tech Labs' JobMarketPulse (tracking 275,000+ career sites direct from source), while overall U.S. postings fell 2.0% in the same period. Two labor markets running in parallel: one for AI and skilled trades (Electrician wages +8.7%), one for everyone else (Nursing −5.6%, Marketing −6.4%, Admin Support −5.7%).</p>
<p><strong>+66.4K jobs / −0.1% posting salaries</strong> — Revelio Labs' RPLS, built from 100M+ profiles covering ~67% of U.S. workers vs. BLS's ~27%, shows hiring ticked up in April with attrition flat. But it's the second consecutive monthly decline in new-posting salaries. Demand is creeping back; employers aren't paying up for it.</p>
<p><strong>59</strong> — The Conference Board's CHRO Confidence Index, a new series record and the highest reading since Q1 2023. The hiring sub-index hit 63, and 59% of CHROs plan to increase hiring in H1 2026, up from 54% in Q4. This is the only forward-looking indicator on the dashboard, and it called the turn before BLS and ADP confirmed it.</p>
<p>Four signals up, one market split in two. It's a hiring market for AI specialists and electricians. For everyone else, it's still a decision market. Check out the full numbers at <a href="https://ilovethewrap.com/labor-market">https://ilovethewrap.com/labor-market</a>.</p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>Sandra Moran, Chief Marketing Officer at Schoox</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image11.png" alt="Sandra Moran on Totally Talent" />
<p>Recorded in the Schoox booth at UNLEASH, this conversation with Sandra is one of the cleaner cases I've heard for why talent acquisition and learning need to stop running parallel tracks. Three years ago you couldn't hire someone with AI skills, she points out — which means hiring for "experience doing this" is a worse bet by the year. The hire becomes about demonstrated adaptability, ability to deal with ambiguity, and institutional knowledge. By the time you onboard, the skills you needed may have already changed. <a href="https://www.hr.com/en/resources/podcasts/talent/hire-less-grow-more_mowtbl8w.html">Watch on Totally Talent</a></p>

<h3>Marcus Mossberger, Chief Strategy Officer at LYTIQS</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image12.png" alt="Marcus Mossberger on Totally Talent" />
<p>Did you know that per Gartner, 86% of organizations don't do any form of strategic workforce planning? With hiring slowing and AI exposure rates rewriting which roles get automated versus augmented, that gap is no longer ignorable — and it's the opening LYTIQS is sprinting into. We also got into authenticity as the only real differentiator in a sea-of-sameness expo hall ("they got the same marketing plan from ChatGPT"), why HR needs to stop being the risk-mitigation function and start taking some, and Marcus's side hustle building a Hope at Work newsletter and podcast. <a href="https://www.hr.com/en/resources/podcasts/talent/ai-is-forcing-a-new-era-of-workforce-planning_mp3im34q.html">Watch on Totally Talent</a></p>

<hr />

<h2>👇 Worth a Click</h2>

<h3>Your Boss's New AI Wants to Know Why You're Scowling</h3>
<img src="/newsletters/may-15-2026-hiring-funnel-collapsed/image13.webp" alt="Emotion AI in the workplace" />
<p>Buried in my HR Tech Brew was this piece about the Atlantic's reporting on "emotion AI" creeping into the workday. Imagine Slack integrations scoring your chats for "sentiment and toxicity," Zoom extensions reading your face (and rolling eyes) in real time. Remember Burger King's OpenAI headset "Patty" grading drive-thru workers on friendliness?</p>
<p>Research in the piece noted that Americans only scowl when angry about a third of the time, which means the bot watching you is probably misreading the face you make when you're concentrating. Important to note that the EU banned this stuff in workplaces last year. The US? Haha, you should really smile more. <a href="https://www.techbrew.com/stories/emotion-ai-workplace-surveillance">Read More</a></p>
    `,
  },
  {
    slug: 'application-inflation',
    date: 'May 8, 2026',
    title: 'Application Inflation Is Devaluing Every Candidate',
    tag: 'AI & Hiring',
    excerpt: "AI just 4x'd the application volume — and the resume that ran the ATS industry for two decades has been neutralized as a hiring signal.",
    body: `
<img src="/newsletters/may-8-2026-application-inflation/image1.webp" alt="Application Inflation Is Devaluing Every Candidate" />

<p>You all know that I read a lot of press releases each week. Well, "read" is a loose term. Most of the information about the release is right in the first two paragraphs. And that's fine. Press releases are mostly boring, "on-the-record" information that companies need to get out in the public. But every once in a while, you catch something that sticks with you. That happened to me this week with Greenhouse's latest release with this simple line:</p>

<p><strong>Applications per recruiter on their platform are up 412% since 2023.</strong></p>

<p>I've been hearing (and seeing anecdotally) that AI has created a massive influx of applications, but 4x is a giant red flag.</p>

<p>So I went digging and it's not just Greenhouse. LinkedIn processes 9,000 applications a minute and turns out about seven hires in the same window. One analysis stated that Easy Apply averages 834 applicants per posting and around 3% get a human eye. For about eight seconds. Time-to-fill keeps stretching too — 41 days in 2023, now 44 and climbing, with tech past 51. And Ashby's analysis of 31 million applications found teams interviewing 40% more candidates per hire than they did in 2021.</p>

<p><strong>More applications. Less attention. Slower hiring. Worse outcomes. Everyone working harder to get further from each other.</strong></p>

<p>No wonder hiring is worse now than it was even two years ago. Two years ago the volume was already too much. Now, it's four times worse.</p>

<p>When you 4x the applications, each candidate is 4x more diluted than they were before. This is application inflation. The Fed prints more dollars, each dollar buys less. AI prints more applications, each one gets less attention. Same dynamic, same outcome. The resume — already a thin proxy for who someone actually is — disappears into a stack nobody is going to read. The recruiter brings in AI to keep up. The candidate brings in AI to keep applying. Both sides are sending GPT-generated emails to GPT-trained screeners and calling that a hiring process.</p>

<p>When everyone's resume is GPT-polished and every job description is keyword-optimized to oblivion, keyword matching stops working. Experience matching stops working. <strong>The signal that ran the entire ATS industry for two decades just got neutralized.</strong></p>

<p>Now, I've written the doom and gloom piece before. I've embraced my Lorax role within HR Tech, warning about the danger coming, but it's no fun to be doom and gloom all the time. So let's have fun and think of a better way.</p>

<p>Imagine if we took the technology of an agent and made it work for both the candidates and hiring teams. Picture an agent that travels with you across your career, actively scanning for the right next role. Companies have their own agents looking for talent. Your agent talks to mine. Parameters get sketched. The two of us only get pulled in once there's a real deal in motion. Just like pro athletes, bring me in when there is a decision to be made. Athletes don't fill out applications. Their information and stats are compiled by their agent who works to get them the best deal based on their needs. Why should the rest of us be relegated to a boring piece of paper and stumbling through ridiculous "got-ya" questions like "what is your biggest weakness?"</p>

<p>The resume needs to come alive too. Right now it's an obituary — past tense, third person, hopeful boilerplate, stripped of anything that sounds like the actual person. Look at what the rest of software has figured out — search, customer service, code, research — all of it has collapsed into a prompt box because conversation is how humans actually want to talk to machines. Hiring, the one category where you most need to understand a person, is still demanding a 40-field form and three uploads. <strong>Less form. More conversation.</strong></p>

<p>While we wait for any of that to be built, hiring teams aren't standing still. They're already looking elsewhere — and the elsewhere is talent intelligence. Some of it the candidate volunteers. A lot of it they don't have to. The candidate doesn't have to tell you anything. Their work tells you. Their network tells you. Their public output tells you. The pitch you write in a cover letter is the least reliable data point in the room — every other source of signal is more honest because nobody curated it for the moment of applying.</p>

<p>The dystopian version of this is digital twins that capture everything you do so the company can replace you with a model of yourself. That's still the risk. But there's an optimistic flip of the same coin.</p>

<p>The same technology that can replicate a person can also represent one. AI that captures who the human actually is — how they think, how they work, what they're great at — so the human can finally be properly seen instead of compressed into a one-page Word doc. A version of this is already happening with what Jeff Taylor and friends are doing at Boomband.</p>

<p>The next chapter doesn't have to look like the last one. <strong>We didn't break hiring with AI. We plugged AI into a process that was already broken and called it innovation.</strong> The next chapter has a chance to do something better.</p>

<p>Let's move on to the week that was in HR Tech. This week's Wrap highlights Greenhouse acquiring voice interviews, iCIMS getting a new CEO, WedgeHR rolling out Candidate Signals, ERIN offering a free version of their referral product, ADP's job numbers, Aspen Tech Labs' job data for Q1 2026, George LaRocque weighs into the "what's next for Workday" debate, a great interview with SmartRecruiters' Allyn Bailey on Winston's rollout, more performative outrage at the EEOC, and the fresh hell of coworkers bonding over botox.</p>

<p>Have a great weekend!</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>Greenhouse goes voice-first with Ezra AI Labs</h3>
<img src="/newsletters/may-8-2026-application-inflation/image2.webp" alt="Greenhouse acquires Ezra AI Labs" />
<p>Greenhouse signed a definitive agreement to acquire Ezra AI Labs, a voice AI interviewing platform that only launched in 2024.</p>
<p>Pay attention to this one. Greenhouse has spent the last year building the loudest "responsible AI" pitch in the category — ISO 42001 certified, monthly Warden AI bias audits, the AI Principles framework we covered in #73. The bet is that <strong>structured voice conversations at the top of the funnel — where fewer than 7% of applicants currently get any human contact — are the actual upgrade.</strong> That should also help the candidate volume problem. Good move. <a href="https://www.prnewswire.com/news-releases/greenhouse-has-entered-into-a-definitive-agreement-to-acquire-ezra-ai-labs-bringing-conversational-ai-to-the-hiring-process-302762658.html">Read More</a></p>

<h3>iCIMS gets a new CEO</h3>
<img src="/newsletters/may-8-2026-application-inflation/image3.jpg" alt="iCIMS new CEO" />
<p>ICIMS (all caps like you're yelling) announced Marc Thompson will take over as CEO effective May 17, succeeding Jason Edelboim. Thompson came in as CFO in September 2024 and has been credited internally with driving the company's AI strategy and operational reset. Before iCIMS he was CFO at EverCommerce through its IPO.</p>
<p>Read this one in context. TA Associates took iCIMS private back in 2020. Since then, the platform has had its AI overhaul, a brand refresh, and now a CFO running the show. <strong>That's not the playbook for an indefinite hold — that's the playbook for getting dressed up before the dance.</strong> The question is who asks. Workday already grabbed Paradox. SAP has SmartRecruiters. Greenhouse just bought their voice AI play. The list of dance partners with both the cash and the ATS gap to fill is getting short. Oracle is the obvious one. Whoever it is, the clock is ticking. <a href="https://hrtechfeed.com/icims-names-new-ceo/">Read More</a></p>

<h3>ERIN goes free</h3>
<img src="/newsletters/may-8-2026-application-inflation/image4.webp" alt="ERIN free AI referral platform" />
<p>ERIN launched a free version of its AI-powered employee referral platform this week — connect your ATS or HRIS, brand a referral program, go live in minutes. No credit card. You pay nothing until your first three referral hires. Paid plans start at $349/month after that.</p>
<p>The mechanics are the story. ERIN is shifting referral software from six-week implementations and upfront contracts to instant activation and pay-after-results pricing. The other piece worth flagging: AI Campaigns. Instead of waiting for employees to remember to refer someone, the platform identifies who in the workforce is most likely to know qualified candidates for specific roles and reaches them on SMS, email, Slack, or Teams. <strong>That's how this gets to frontline workers</strong> — the population that traditional referral programs have historically left out because they don't live in the corporate inbox.</p>
<p>Worth watching. Frontline hiring is one of the last real growth sectors, and a free, AI-driven referral channel that meets workers where they actually are is a credible play for it. <a href="https://apnews.com/press-release/ein-presswire-newsmatics/erin-launches-free-ai-employee-referral-platform-that-goes-live-in-minutes-0a31706f36ba984dcb82605285696d05">Read More</a></p>

<h3>WedgeHR ships Candidate Signals</h3>
<img src="/newsletters/may-8-2026-application-inflation/image5.png" alt="WedgeHR Candidate Signals" />
<p>WedgeHR rolled out Candidate Signals this week — an AI feature that analyzes completed one-way video interviews across five interpersonal qualities: self-awareness, collaboration, adaptability, accountability, and motivation. Strongest signals float to the top of the review queue. <a href="https://wedgehr.com/candidate-signals">Read More</a></p>

<hr />

<h2>📊 Research &amp; Reports</h2>

<h3>ADP: 109,000 jobs added in April, but the middle is hollowing</h3>
<img src="/newsletters/may-8-2026-application-inflation/image6.webp" alt="ADP April National Employment Report" />
<p>ADP's April National Employment Report dropped this morning — 109,000 private sector jobs added, the fastest pace since January 2025. Pay for job-stayers up 4.4%, job-changers up 6.6%. Health care and education carried the report at +61,000, with trade/transportation/utilities rebounding at +25,000. Professional and business services lost 8,000.</p>
<p>The line worth circling came from ADP chief economist Dr. Nela Richardson: "Small and large employers are hiring, but we're seeing softness in the middle." The numbers back it up — small establishments added 65,000, large added 42,000, and medium-sized companies (50–499 employees) added a combined two thousand. Two. Thousand. <strong>The Middle Migration showing up in the actual data, on the actual day the BLS keeps making harder to trust.</strong> <a href="https://www.prnewswire.com/news-releases/adp-national-employment-report-private-sector-employment-increased-by-109-000-jobs-in-april-annual-pay-was-up-4-4-302764101.html">Read More</a></p>

<h3>Aspen Tech Labs Q1 2026 Job Market Pulse: hiring keeps cooling, BLS keeps revising</h3>
<img src="/newsletters/may-8-2026-application-inflation/image7.png" alt="Aspen Tech Labs Q1 2026 JobMarketPulse" />
<p>Aspen Tech Labs dropped their Q1 2026 JobMarketPulse this week — direct-from-employer postings across 225,000+ U.S. companies, no recruitment agency noise, refreshed daily. The headline: U.S. job postings down 2.0% year-over-year, 44 of 51 states posting YoY declines, and the hires rate at 3.1% — the lowest since April 2020.</p>
<p>The line worth circling is Aspen calling out the BLS directly. Ten of the last eleven monthly payroll prints have been revised, almost all downward. December went from +50K to -17K two months later. Aspen's pitch is exactly what we've been saying for months — real-time, employer-direct hiring signal that doesn't get rewritten in the rearview mirror.</p>
<p>Two splits worth flagging from the underlying data: <strong>AI Specialist postings up 76.9% YoY because of course they are.</strong> And recruitment agency postings off 9.9% YoY — a much steeper drop than direct employer postings, which says something about who gets cut first when hiring tightens. <a href="https://www.webspidermount.com/wp-content/uploads/2026/04/JobMarketPulse-Report-Q1-2026.pdf">Read More</a></p>

<hr />

<h2>🔥 HR Hot Takes</h2>

<h3>George LaRocque shows up to a vibes-fight with $65 billion in data</h3>
<img src="/newsletters/may-8-2026-application-inflation/image8.jpg" alt="George LaRocque on the Workday/a16z debate" />
<p>The Workday/a16z debate has been the hottest argument in HR tech for two weeks — a16z's Joe Schmidt calling Workday the next PeopleSoft, with smart pushback from Thomas Otter, Anita Lettink, Jerome Gouvernel, and Andy Turnbull. Then George LaRocque showed up and brought receipts.</p>
<p>George has been quietly building the most comprehensive capital dataset in this industry for the better part of a decade — $65 billion in work tech funding across 2,400+ deals. $24.5 billion of that has flowed into the six categories that map to Workday's footprint, and the enterprise ceiling has held every single time. <strong>The punchline lands where Silicon Valley keeps refusing to look:</strong> compliance in enterprise HR isn't a monitoring problem you solve with an agent, it's an accountability and liability problem. Somebody has to be on the hook when payroll runs wrong in Germany.</p>
<p>George was in this market when PeopleSoft built what Workday eventually replaced. His read on where the next wave actually comes from — and it's not who a16z is funding — is worth a read. <a href="https://1worktech.substack.com/p/the-workday-a16z-debate-has-five">Read More</a></p>

<hr />

<h2>🎙️ Podcast of the Week</h2>

<h3>Allyn Bailey on Winston, Agentic CRM, and the End of Best-of-Breed</h3>
<img src="/newsletters/may-8-2026-application-inflation/image9.png" alt="Allyn Bailey on Winston" />
<p>I caught up with Allyn Bailey from SmartRecruiters/SAP at UNLEASH for a check-in on Winston six months in. Customers who've adopted are running about 60% of their jobs through the agent, with strong land-and-expand into adjacent agents. The tease worth circling: agentic CRM is shipping in the next few months. No more hunting through legacy databases for past candidates — you tell the agent who you need, it builds the campaign, runs the nurture, brings them back warm.</p>
<p>The bigger conversation is where this is heading. Allyn's call: <strong>"transparency is the next right."</strong> Right to access and right to privacy were the GDPR fight. Right to augment and correct what an algorithm thinks about you is the next one. Coming from someone who's spent her career inside the vendor stack, that framing carries weight. We also got into agent-to-agent connectivity, the consumer backlash building around personal data, and the people on TikTok building their own on-prem AI ecosystems. <a href="https://www.hr.com/en/resources/podcasts/talent/integration-is-the-new-sexy-in-hr-tech_moke9p8d.html"><strong>Listen Here</strong></a></p>

<hr />

<h2>👇 Worth a Click</h2>

<h3>The EEOC sues the New York Times. Funny timing.</h3>
<img src="/newsletters/may-8-2026-application-inflation/image10.jpg" alt="EEOC sues NYT" />
<p>Tuesday, the EEOC filed suit against the New York Times in the Southern District of New York, alleging the paper passed over a White male employee for promotion in favor of a less-qualified woman to meet diversity goals. The complaint asks for back pay, punitive damages, compensation for "emotional pain" and "mental anguish," and a court order barring the Times from considering race or sex in hiring. EEOC Chair Andrea Lucas — a Trump appointee — kicked off the announcement with "no one is above the law — including 'elite' institutions."</p>
<p>Read the timeline before you read the filing. The Times has spent months reporting on this exact EEOC under this exact administration. Their field staff told the paper they were being pressured to bring "politically charged cases, even with little evidence." That investigation had been sitting in a drawer for months. Then in late April — right after the Times published — the case quietly accelerated. By Tuesday it was a lawsuit. Filed by the agency, not the employee. <strong>Of note: the agency itself is the plaintiff.</strong></p>
<p>Keep your eye on this one. The case will get litigated on its merits, and maybe there's something there. But the pattern is the part that should make every HR leader uncomfortable: the agency that's supposed to be enforcing civil rights law is now picking targets that look an awful lot like the targets the White House has been naming out loud. That's not enforcement. That's something else. <a href="https://www.nytimes.com/2026/05/05/business/economy/eeoc-nyt-investigation.html">Read More</a></p>

<h3>Coworkers are bonding over Botox now</h3>
<img src="/newsletters/may-8-2026-application-inflation/image11.webp" alt="Coworkers bonding over Botox" />
<p>HR Brew dispatch from the new frontier of work-life integration: getting injected with your colleagues. The whiskey rooms of Mad Men gave way to pickleball, pickleball gave way to book club, and now book club has apparently given way to wrinkle paralysis as a team-building exercise.</p>
<p>I had to share this crazy article just because I can't imagine a world where this is normal. As a 43-year-old man, I may be under a rock with the whole Botox craze, but listen to some of this:</p>
<p>Sarah Mahoney, a Massachusetts hairdresser, told HR Brew about going for Botox with a new coworker. Her takeaway: it felt "almost like a really vulnerable situation" and brought them closer. They made a day of it. Drinks after.</p>
<p>Then there's PAN's Laura Beauregard, who hosts quarterly Botox parties at her home with a nurse friend and invites colleagues. Some former PAN employees still show up four times a year for the injections. Her stated rationale: she does her nails and her hair, why not her face. Standard coworker maintenance.</p>
<p>And a Korn Ferry consultant quoted in the piece offered up another work-adjacent bonding activity she's heard come up not once but twice: doing your taxes. Together. With your coworkers.</p>
<p>Connection is good. Belonging is good. But a quarterly group Botox at Laura's house is really weird. Maybe I'm out of the loop here, but feel free to ask me at the Wood Summer CookOut and Brazilian Butt Lift gathering this summer. <a href="https://www.hr-brew.com/stories/2026/04/16/some-workers-are-bonding-over-botox-hr-says-that-could-be-good">Read More</a></p>
    `,
  },
  {
    slug: 'ats-napster-moment',
    date: 'May 1, 2026',
    title: 'The Platform You Bought in 2021 Was Built for a World That No Longer Exists',
    tag: 'Vendor Strategy',
    excerpt: 'The enterprise ATS market just had its Napster moment — and the platforms that bet on AI marketing instead of AI architecture are running out the clock.',
    body: `
<img src="/newsletters/may-1-2026-ats-napster-moment/image1.gif" alt="The Platform You Bought in 2021 Was Built for a World That No Longer Exists" />

<p>The enterprise talent acquisition software market has already had its Napster moment. Not the slow-moving disruption kind where incumbents have years to adapt and most of them do. The other kind — where the floor drops out, the rules of competition change overnight, and the companies still playing the old game look up to find the audience has left.</p>

<p>What separated winners from losers in the ATS market three years ago — configurability, integration depth, compliance coverage, implementation support — are table stakes now, or irrelevant. The only question buyers are actually asking in 2026 is: how AI-first is this platform, really? Not "do you have AI features?" Every deck has AI features. The question is whether AI is baked into the architecture or bolted onto the outside of a building that was designed for a different era. Those are not the same product. They do not perform the same way. And the gap between them is widening every quarter.</p>

<p>Here is where it gets complicated for buyers. A significant portion of the enterprise HR tech market is owned by private equity firms that acquired these platforms between 2020 and 2022 — peak valuations, peak leverage, historically low interest rates.</p>

<p><strong>The math made sense at the time. It does not make as much sense now.</strong></p>

<p>Several of those deals are sitting on debt loads that actively constrain R&amp;D investment at exactly the moment when R&amp;D investment is the only thing that matters. You cannot rearchitect a platform from the ground up when your debt service is eating your operating margin. What you can do is cut headcount, install a new CEO with an AI background, and launch a rebrand that signals forward motion without requiring the capital that actual forward motion demands.</p>

<p>The tell, when you're evaluating a platform, is not the product demo. Demos are engineered to impress.</p>

<p>The tell is what the company is <em>not</em> saying. If your vendor is leading with a new brand identity and an AI product name that sounds like it was workshopped by a consulting firm, ask what changed in the codebase. If the answer is a list of AI features rather than a description of architectural change, you have your answer. If the leadership team turned over in the last 18 months, ask why. If the company is PE-backed, ask when the fund needs to exit and what that means for roadmap continuity. These are not impolite questions. They are the questions a procurement team would ask about any other major infrastructure investment, and your talent acquisition platform <em>is</em> a major infrastructure investment.</p>

<p>The reason this matters now, and not later, is that there is a counter-narrative running in parallel — and it is instructive.</p>

<p>SmartRecruiters spent the years immediately before ChatGPT in a difficult place. Customers were leaving. Talent was leaving. It was not a company with obvious momentum. Then they looked hard at where the market was going, made the call to rebuild around AI, and repositioned themselves explicitly as <em>The Recruiting AI Company</em>. The difference between SmartRecruiters and the legacy platforms doing AI rebrands is that SmartRecruiters actually rearchitected. That distinction is what SAP paid for when they completed the acquisition in September 2025. And in October, SAP confirmed they're not treating SmartRecruiters as a feature add-on — they're replacing the entire SuccessFactors recruiting module with it, giving current customers three to five years to migrate. That is a complete changing of the guard in enterprise TA, and it signals something clearly: <strong>the platforms that bet on genuine AI architecture won. The ones that bet on AI marketing are still running the clock</strong>, and by fall conference season, buyers will want to see actual product, not promises.</p>

<p>If you are mid-contract with an enterprise ATS right now, none of this requires panic. Contracts are contracts, implementations take time, and platform stability matters. But if you are 18 months from a renewal, starting a fresh evaluation, or building a three-year TA technology strategy, the questions above deserve real answers before you sign. The category is sorting itself out in real time. Some platforms are going to emerge from this transition stronger and more capable than they were before. Others are going to be acquired, restructured, consolidated into something else, or quietly sunset. Knowing which kind of vendor you're sitting across from is the key.</p>

<p>On to the week that was in HR Tech. In this week's Wrap, we'll go over Phenom's acquisition of Plum, Fama getting a patent, Amazon jumping into mass hiring tools, Workhuman predicting future leaders, Checkr's portable identity verification, Recruitics partnering with ID.me, Klaar adding compensation, LinkedIn's Grad Guide, Josh Bersin's take on what's going on at Workday, we ask Achilles about frontline hiring for the trades, and the absolute trainwreck that is the EEOC.</p>

<p>Have a great weekend!</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>Phenom acquires Plum, completes its assessment stack</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image2.jpg" alt="Phenom acquires Plum" />
<p>Phenom just made its second acquisition in ten weeks, picking up Plum — a psychometric-based talent assessment company — to plug what it calls the biggest gap in modern hiring: <strong>validating the human qualities that resumes can't verify and AI can't replicate</strong>. Plum's proprietary Role Model™ technology maps behavioral blueprints against more than 40,000 real-world jobs, with accuracy reportedly four times greater than resume screening alone. The traits it's trying to surface — empathy, resilience, judgment, adaptability — are exactly the ones that don't show up on a LinkedIn profile and don't survive a 55-minute intake interview.</p>
<p>With Plum now in the fold alongside Be Applied (acquired in February), Phenom is positioning itself as the owner of a full-spectrum assessment stack: Be Applied covers cognitive and situational judgment, Plum covers behavioral traits and durable skills, and Phenom's own agentic AI handles sourcing, delivery, and interviewing. The idea is a system of checks rather than a single checkpoint — validating what candidates can do, how they'll approach the work, and whether their behavioral profile actually matches what success in the role requires. That's a meaningfully different pitch than "we have assessments." <a href="https://www.phenom.com/blog/phenom-acquires-plum">Read More</a></p>

<h3>Fama Technologies granted foundational patent on AI social media screening</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image3.jpg" alt="Fama Technologies patent" />
<p>Fama just got the US Patent and Trade office to confirm what it's been arguing for a decade: <em>it invented its category</em>. The Los Angeles-based online screening company was granted a patent covering its core method for searching, analyzing, and classifying online activity with a priority date going all the way back to November 2015. The patent covers 22 claims including extracting PII from source documents, pulling social media activity, transforming image data into structured datasets via object recognition, and classifying content using ML trained on inter-rater agreements.</p>
<p>"We didn't just enter the online screening market — we created it," said founder and CEO Ben Mones. With the 2023 acquisition of Social Intelligence already in the rearview, Fama has also filed a continuation patent to expand its IP portfolio further. In a market where every vendor is starting to sound the same, owning the foundational IP is a meaningful moat. <a href="https://www.prweb.com/releases/fama-technologies-granted-us-patent-on-foundational-ai-powered-social-media-screening-technology-302752534.html">Read More</a></p>

<h3>Amazon launches Connect Talent to automate mass hiring</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image4.jpg" alt="Amazon Connect Talent" />
<p>Amazon just introduced Connect Talent, an AI-powered hiring platform designed for companies that need to recruit at scale — think retailers staffing up for peak season. The system conducts AI-led interviews around the clock, screens candidates, and preps recruiter notes, all without a human in the room. Amazon itself hired around 250,000 seasonal workers last holiday season, so this is clearly product development born from internal pain. They're calling their broader AI design philosophy "humorphism" — the idea of humanizing AI to adapt to how people actually work. The irony of branding an interview-replacing AI product around humanization is doing a lot of heavy lifting here.</p>
<p>As we've covered in the past, frontline hiring is a massive market opportunity. Worth keeping an eye on if Amazon can perfect it and if they would want to expand this tool to other companies. <a href="https://finance.yahoo.com/sectors/technology/articles/amazon-targets-mass-hiring-agentic-160051472.html">Read More</a></p>

<h3>Workhuman launches Future Leaders™ to predict your next VP</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image5.webp" alt="Workhuman Future Leaders" />
<p>Workhuman just made its biggest bet yet on AI-powered succession planning with Future Leaders™ — a tool built on its proprietary Ascend™ AI that claims to identify VP+ leadership candidates three to five years before they'd traditionally get promoted. Rather than relying on manager gut feel or annual talent reviews, the system analyzes patterns across thousands of workplace interactions already captured in Workhuman's recognition platform — who's influencing others, who's delivering impact, whose behaviors mirror the fingerprints of leaders who actually succeeded. The models are self-learning and recalibrate in real time as roles shift and leaders rise.</p>
<p>The business case is straightforward: replacing a senior executive costs 200-400% of their annual salary, and roughly half of external executive hires fail within two years anyway. If you can grow your own leaders with this level of predictive confidence, the ROI math isn't complicated. The more interesting question is what it means for the employees being quietly scored — and whether "you've been identified as a future leader" hits differently when you know an algorithm said it first. <a href="https://techrseries.com/hrtechnology/workhuman-launches-future-leaders-redefining-how-organizations-identify-and-elevate-internal-leadership-talent/">Read More</a></p>

<h3>Checkr launches Profiles — portable verified identity that travels with workers</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image6.jpg" alt="Checkr Profiles" />
<p>This is the move the background check industry has been building toward for years, and Checkr just took the biggest step anyone has taken to get there. Checkr Profiles lets individuals create a verified, portable identity — backed by Checkr's screening infrastructure — that they own, control, and can share proactively with any employer, marketplace, or platform they work with. A caregiver can share it before the first introduction. A freelancer can embed it on their website. A gig worker can arrive on a new platform already verified. For employers, it embeds directly as a "Checkr Verified" badge within job boards and marketplaces. Over 500,000 people have already created a profile since launch, and GigSmart is already using it as the entry point for every flex worker on their platform.</p>
<p>What's interesting is what comes next: this is a logical extension of what background check companies have always done, but turning that verification into a candidate-owned asset is a fundamentally different model. Expect this space to get crowded fast. Sterling, First Advantage, HireRight, and every other major player in the space now has a roadmap item they can't ignore. The race is on to build the user base — and whoever gets to scale first wins, because a verified identity network is only as valuable as the number of people who have one. Checkr has a meaningful head start. <a href="https://www.prnewswire.com/news-releases/checkr-launches-profiles-giving-people-a-verified-identity-that-travels-with-them-302756790.html">Read More</a></p>

<h3>Recruitics launches AdaptiveApply™ with ID.me</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image7.jpg" alt="Recruitics AdaptiveApply with ID.me" />
<p>Here's another approach. Recruitics just dropped AdaptiveApply™, an AI-driven application experience that dynamically adjusts questions, length, and flow based on job type and performance data — and embeds identity verification directly into the apply flow before a candidate ever hits your ATS. The launch partner is ID.me, which already has 160 million users representing roughly 60% of the US adult population, meaning a huge chunk of your applicant pool can verify their identity in seconds with credentials they already have.</p>
<p>This, alongside Checkr Profiles launching the same week, signals something important: verified identity is moving from a background check afterthought to a top-of-funnel expectation. Two different companies, two different approaches, same underlying thesis — trust has to be established earlier in the process than it currently is, and the market is finally building the infrastructure to do it. <a href="https://www.einpresswire.com/article/908497265/recruitics-launches-adaptiveapply-featuring-id-me-to-bring-verified-identity-to-the-top-of-the-hiring-funnel">Read More</a></p>

<blockquote><p>📌 <strong>Editor's Note:</strong> Two stories in this section this week — Checkr Profiles and Recruitics' AdaptiveApply with ID.me — are pointing at the same thing from different angles. Portable, candidate-owned verified identity is becoming a real category. Checkr is building it from the background check side; Recruitics is embedding it at the application layer through ID.me's existing wallet infrastructure. Worth noting: Greenhouse got ahead of both of them, partnering with CLEAR back in June 2025 to embed identity verification directly into its Real Talent hiring solution — matching candidates' selfies to government-issued IDs before they ever hit a recruiter's queue. Three different companies, three different entry points, same destination: a world where your verified credentials travel with you from platform to platform instead of getting re-run by every employer from scratch. The question now isn't whether this becomes standard — it will. The question is who builds the network effect fast enough to make their version of it the one that wins.</p></blockquote>

<h3>Klaar launches compensation module powered by Comprehensive</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image8.png" alt="Klaar compensation module" />
<p>Klaar, the AI-native performance management platform, just added compensation planning powered by a partnership with Comprehensive, a comp planning and benchmarking platform trusted by the likes of Upwork, T-Mobile, and Vidyard. The core idea is straightforward and long overdue: performance data and compensation decisions should live in the same system, not in parallel spreadsheets that get reconciled once a year during a stressful review cycle. With real-time performance signals now feeding directly into comp planning, Klaar is positioning itself as a platform that connects what someone actually did with what they actually get paid — reducing recency bias, manual work, and the quiet inconsistencies that make comp cycles a nightmare for HR teams and a trust-eroder for employees. <a href="https://www.prnewswire.com/news-releases/klaar-launches-new-compensation-module-powered-by-comprehensive-bringing-compensation-planning-into-its-ai-native-performance-platform-302756424.html">Read More</a></p>

<hr />

<h2>💰 Funding &amp; Acquisitions 🤝</h2>

<p><strong>Urfuture raises £1.7M</strong> — Manchester-based HR tech startup urfuture closed a seed round to take on what it sees as a broken entry-level hiring system. The platform ditches CVs and job boards in favor of a behavioral science matching algorithm and what it calls a "social-first Gen Z distribution engine" — designed to surface higher-intent, more diverse candidates. Clients already include Tesco, British Airways, and West Midlands Police. <a href="https://www.uktech.news/funding/urfuture-raises-1-7m-to-rebuild-entry-level-hiring-20260420">Read More</a></p>

<p><strong>TraqCheck raises $8M Series A</strong> — New Delhi-based TraqCheck, an AI-powered background verification platform that bills itself as a "Human Operating System" for hiring, closed an $8M Series A led by IvyCap Ventures with participation from IIFL. <a href="https://www.finsmes.com/2026/04/traqcheck-raises-8m-in-series-a-funding.html">Read More</a></p>

<p><strong>LumApps acquires Comeen</strong> — LumApps, the AI-powered employee hub backed by Bridgepoint, is acquiring Comeen — a workplace experience platform covering space management, digital signage, and visitor services — in a deal expected to close in May. <a href="https://www.bridgepointgroup.com/about-us/news-and-insights/press-releases/2026/lumapps-to-acquire-comeen-to-expand-its-ai-employee-hub">Read More</a></p>

<hr />

<h2>📊 Research &amp; Reports</h2>

<h3>LinkedIn's 2026 Grad's Guide</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image9.jpg" alt="LinkedIn 2026 Grad's Guide" />
<p>The class of 2026 is entering one of the toughest hiring markets in years, and LinkedIn's annual data snapshot doesn't sugarcoat it. Entry-level hiring is down 6% year-over-year (mid-level is down 10%). Nearly half of Gen Z says the biggest barrier to landing a role isn't skills — it's network. One in five has started a side hustle or business rather than wait for a traditional job to materialize. Another 22% are building apps and projects just to prove they can. The number of LinkedIn members adding "founder" to their profile surged 69% year-over-year, and 72% of young office workers say they're considering skilled trades. Growth industries remain tech, financial services, construction, and real estate. <a href="https://news.linkedin.com/2026/Grads-Guide-2026">Read More</a></p>

<hr />

<h2>🔥 HR Hot Takes</h2>

<h3>Josh Bersin — The Reinvention of Workday: From System of Record to Platform of Agents</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image10.png" alt="Workday + Galileo / Josh Bersin Company" />
<p>Bersin went deep on Workday's big strategic pivot this week and it's worth your time if you're an HR tech buyer, seller, or watcher. The short version: Workday is repositioning from a system of record into a platform for agents, arguing that the business rules, compliance machinery, and org configuration baked into Workday over twenty years are exactly the "rails" that AI agents need to operate at enterprise scale. It's a compelling argument, and the acquisitions of Paradox and Sana give it real teeth. The more interesting subplot: co-founder Aneel Bhusri came back as CEO because the company lost its startup culture and the AI strategy wasn't clear. He promptly rebuilt the executive team, narrowed fifty agent projects down to fifteen in a single afternoon, and handed the talent acquisition and learning platforms to the CEOs of Paradox and Sana respectively as full general managers with P&amp;L accountability.</p>
<p>It's a great article and it's clear Bersin is bullish on Workday, but we need to add more context here. <strong>The Josh Bersin Company has a financial relationship with Workday. Its Galileo HR assistant is integrated directly into Workday and the partnership facilitates the sale and use of Galileo within Workday's customer base.</strong> If Workday wants to embed The Wrap premium memberships within its platform, I will also write amazing articles about them. Contact information at the bottom of <a href="https://ilovethewrap.com">ilovethewrap.com</a>. <a href="https://joshbersin.com/2026/04/the-reinvention-of-workday-from-system-of-record-to-platform-of-agents/">Read More</a></p>

<hr />

<h2>🎙️ Podcast of the Week</h2>

<h3>Totally Talent — From Welders to Waitstaff: How AI Screens Better Talent</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image11.webp" alt="Totally Talent — From Welders to Waitstaff with Read Egger" />
<p>This week features a quick discussion with Read Egger, CEO of Achilles, and what I appreciated most about this conversation is that Read isn't another founder who stumbled into frontline hiring from a PowerPoint deck. He's screened thousands of hourly candidates himself — 5,000 by his own count while expanding a staffing operation into Arizona — and spent years recruiting in oil and gas, skilled trades, and light industrial across 30 states before building the platform he wished he'd had. Achilles plugs into your existing ATS (integration measured in hours, not months, he's quick to point out) and handles the full screening workflow via conversational text — deal breaker questions, skill validation, phone screens — tailored dynamically to the role. <a href="https://www.hr.com/en/resources/podcasts/talent/from-welders-to-waitstaff-how-ai-screens-better-ta_mohh4kn9.html"><strong>Listen Here</strong></a></p>

<hr />

<h2>👇 Worth a Click</h2>

<h3>The EEOC is a designed trainwreck</h3>
<img src="/newsletters/may-1-2026-ats-napster-moment/image12.jpg" alt="The EEOC is a designed trainwreck" />
<p>You may remember that <a href="https://www.linkedin.com/pulse/we-living-sci-fi-thriller-mike-wood-sy3be/">I wrote about Andrea Lucas and the EEOC awhile ago</a>. You have to admire her tenacity and push to finally stop the injustice of…(looks at notes)…systemic discrimination of white men?</p>
<p>A damning New York Times investigation this week details how field staff at the Equal Employment Opportunity Commission are being pressured by chair Andrea Lucas to fast-track cases that match the Trump administration's priorities even when the evidence is thin to nonexistent. In one case described in the piece, staff were forced to justify dropping a complaint from a white man who didn't get a job — a job that went to another white man, with an all-white applicant pool. <em>That's the evidentiary standard we're working with.</em> Lucas has reportedly been scouring the agency's internal case database herself, maintaining a "top 30" priority list that nobody can touch without her sign-off, and providing regular case updates directly to the White House — a break from the firewall that has traditionally existed between the two.</p>
<p>Meanwhile the agency is at its lowest staffing level in decades, handling 90,000 complaints a year with about 400 investigators. So to recap: Andrea Lucas is dismantling the machinery built to protect workers from discrimination in order to spend its last remaining resources hunting for evidence that white people are being mistreated. All of this while the person who was technically supposed to be running the Department of Labor — Secretary Lori Chavez-DeRemer — just resigned amid an inspector general investigation into allegations including an affair with a member of her security detail, her husband being banned from DOL headquarters following sexual assault allegations from staff, and using government travel as a cover to attend Morgan Wallen concerts. <strong>The White House said she did a phenomenal job.</strong> <a href="https://www.nytimes.com/2026/04/27/us/politics/eeoc-trump-discrimination-cases.html">Read More</a></p>
    `,
  },
  {
    slug: 'introducing-the-expanded-wrap',
    date: 'April 24, 2026',
    title: 'Introducing the Expanded Wrap!',
    tag: 'Inside The Wrap',
    excerpt: 'A full website, a free jobs board across 28 HR tech vendors, a Voices hub, a Vendor Pulse preview — and a premium tier launching May 1.',
    body: `
<img src="/newsletters/april-24-2026-expanded-wrap/image1.webp" alt="Introducing the expanded Wrap" />

<p>Hi everyone. I don't have a hot take on the industry this week, but I am very excited to share that I've built The Wrap out to be a full website! Head over to <a href="https://ilovethewrap.com">ilovethewrap.com</a> and check it out. In building the website, I wanted to include everything I would want to know if I was in HR tech.</p>

<p><strong>Included for free:</strong></p>

<p>A <strong>jobs board</strong> featuring over 1,000 open roles across 28 HR tech vendors. Every morning, the site pulls straight from each company's listings and refreshes the board. Click Apply and you go right to the company's own ATS. Same experience as going to their careers page, just consolidated.</p>

<p>A consolidation of some of the <strong>voices</strong> I follow in the space — Lance Haun, Steve Smith, Jess Von Bank, Josh Bersin, Laurie Ruettimann, Hung Lee, and more to come.</p>

<p>A preview of the <strong>Vendor Pulse</strong> database, which pulls in the latest public data about each vendor including capabilities, ideal customers, funding, and post-sale customer feedback on implementation and support.</p>

<p>Starting <strong>May 1st</strong>, I'm launching a premium tier ($10/month) that will help you find solutions to fit your specific situation, with extensive vendor profiles featuring deeper dives into vendor capabilities and reputation, filters and alerts, daily digests, and more that I'll announce next week.</p>

<p>My goal as I build this out is the same — to keep you informed and entertained with what's happening in the space. This is just the start of something and I hope you'll join me by supporting The Wrap and the voices in our space.</p>

<p>Now, let's get into this week's stories. This week's Wrap features UKG cutting another 950 people, SeekOut getting a new CEO, Greenhouse taking a responsible step with AI, Humanly raising $25M, George LaRocque's Q1 WorkTech report, hot takes from Steve Smith and Lance Haun, and US talent moving overseas in search of a better deal.</p>

<p>Have a great weekend,</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>UKG cuts another 950 as "ongoing transformation" keeps transforming people out of jobs</h3>
<img src="/newsletters/april-24-2026-expanded-wrap/image2.jpg" alt="UKG layoffs" />
<p>Last week, UKG notified roughly 950 employees (6% of its workforce) that their jobs are gone, with close to 600 leaving immediately and another 350 asked to stay through a transition period ending Aug. 31. Notifications landed by email April 15, with staff told to work from home as the messages rolled out.</p>
<p>I like the people I've worked with at UKG, but this is the sad reality of software companies at the moment, especially ones with PE backing. Chop off an entire layer of talent expenses, and lean into what's left with AI. Instead of having a team working on a project, just have one person playing conductor to an orchestra of agents. Having actual employees doing the task is a financial liability when AI is cheap and scalable. <a href="https://hrexecutive.com/ukg-cuts-950-jobs-in-latest-round-of-restructuring/">Read More</a></p>

<h3>SeekOut taps Sean Thompson as CEO as founder moves to chairman</h3>
<img src="/newsletters/april-24-2026-expanded-wrap/image3.webp" alt="SeekOut CEO transition" />
<p>SeekOut announced that Sean Thompson will take over as CEO on May 4, with co-founder Anoop Gupta transitioning to Executive Chairman after leading the company since 2017. Co-founder Aravind Bala stays on as CTO. I had the chance to interview Anoop last fall at HR Tech, and it was genuinely one of my more interesting conversations — talking with him was like getting a lesson from a favorite college professor. Cheers on the transition, Anoop, and we'll be keeping an eye on SeekOut under Thompson. <a href="https://www.seekout.com/blog/seekout-welcomes-new-ceo/">Read More</a></p>

<h3>Greenhouse plants a flag with AI Principles Framework</h3>
<img src="/newsletters/april-24-2026-expanded-wrap/image4.webp" alt="Greenhouse AI Principles Framework" />
<p>Greenhouse dropped its AI Principles Framework this week — five pillars covering structured hiring, reimagined workflows, human-centered design, explicit decision ownership, and explainability. CEO Daniel Chait's framing: AI hasn't delivered on the hype in hiring, and that's a failure of application, not the technology. The receipts back it up: ISO 42001 certification, no customer data used to train models, no composite candidate scores, monthly Warden AI bias audits across ten protected classes with public results, and org-level toggles. In a market where every vendor chants "responsible AI" the way restaurants claim "farm-to-table," Greenhouse is actually publishing the farm address. <a href="https://www.greenhouse.com/newsroom/greenhouse-launches-ai-principles-framework-setting-the-standard-for-responsible-hiring-in-the-ai-era">Read More</a></p>

<hr />

<h2>💰 Funding &amp; Acquisitions 🤝</h2>

<p><strong>Humanly raises $25M Series B</strong> bringing total funding to $52M. <a href="https://www.geekwire.com/2026/humanly-raises-25m-to-put-ai-to-work-for-job-seekers-not-just-the-companies-hiring-them/">Read More</a></p>

<p><strong>Gaia acquires SocialJobs for US expansion.</strong> The deal brings an established US footprint in high-volume hiring sectors onto Gaia's full platform — programmatic engine, AI ad engine, real-time analytics across 11 channels. <a href="https://www.iamgaia.com/resources/gaia-acquires-socialjobs-to-accelerate-us-market-expansion">Read More</a></p>

<hr />

<h2>📊 Research &amp; Reports</h2>

<h3>George LaRocque releases Q1 2026 WorkTech VC Report</h3>
<img src="/newsletters/april-24-2026-expanded-wrap/image5.png" alt="George LaRocque Q1 2026 WorkTech report" />
<p>George LaRocque at WorkTech dropped his Q1 2026 global work tech VC report, tracking funding flows and trends across the space. Key findings include continued consolidation in AI-powered talent acquisition tools, sustained investor interest in frontline worker platforms despite broader market cooling, and geographic shifts in where deals are getting done. LaRocque is walking through the full results and implications in a webinar next week for anyone wanting the deeper dive beyond the headline numbers. <a href="https://1worktech.com/2026-q1-global-work-tech-vc-report/">Read the report</a></p>

<hr />

<h2>🔥 HR Hot Takes</h2>

<h3>Steve Smith: The SaaSpocalypse isn't a disruption, it's a climate change</h3>
<img src="/newsletters/april-24-2026-expanded-wrap/image6.webp" alt="Steve Smith on the SaaSpocalypse" />
<p>Steve Smith at Work Tech Weekly put language to something the enterprise SaaS world hasn't fully admitted out loud yet. His line of the week:</p>
<blockquote><p>"ServiceNow, Salesforce, and the whole Cretaceous layer of enterprise workflow software aren't being disrupted by a better version of themselves. The environment just shifted. AI agents don't just replace the worker. They replace the software that the worker used to need. That's a different kind of disruption than most enterprise SaaS companies are modeled for."</p></blockquote>
<p>The asteroid didn't pick a fight with the dinosaurs — it changed the climate they were built for. Every HR tech vendor pitching "workflow automation" as their moat should sit with that one for a minute. If the job of the software was to coordinate the humans, and the humans aren't coordinating the work anymore, what exactly are you selling? <a href="https://www.linkedin.com/pulse/ai-and-jobs-convo-gets-real-talking-layoffs-brain-fry-steve-smith-bedjc/">Read More</a></p>

<h3>Lance Haun: You can't automate your way to employee trust</h3>
<img src="/newsletters/april-24-2026-expanded-wrap/image7.webp" alt="Lance Haun on AI and employee trust" />
<p>Lance Haun torched Meta's latest solution to the scale problem: an AI avatar of Zuckerberg trained on his mannerisms and internal writings so that 79,000 employees can interact with a simulation of the founder. Haun's diagnosis is brutal but accurate: the more power someone accumulates, the less accurate their read of other people becomes — they stop picking up social cues and start confusing their own perspective with reality. Meta has been here before — the metaverse lost $80 billion, Workplace from Meta got shuttered, and now they're building AI Zuck because the pattern never changes, only the technology does. <a href="https://www.reworked.co/employee-experience/meta-mark-zuckerberg-ai-ceo-employee-trust/">Read More</a></p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>Talking AI agents with Juicebox in Vegas</h3>
<img src="/newsletters/april-24-2026-expanded-wrap/image8.png" alt="Juicebox podcast" />
<p>In the first of the many interviews I did in Vegas last month, I got to sit down with Juicebox CEO and co-founder David Paffenholz. David and his co-founder started Juicebox in 2022 with the thesis that there was a better way to match people with opportunities, spending six months shadowing recruiters to understand the workflow before ChatGPT's release convinced them to build an LLM-powered solution. Their core product lets recruiters describe who they're looking for in natural language — "sales manager in Boston who's sold health tech" — and Juicebox creates both hard filters and natural language criteria to find and stack-rank candidates from your ATS plus net new profiles. The AI agent runs the entire top-of-funnel process: configures search, calibrates based on feedback, finds new profiles daily, handles outreach, manages responses, and books first calls with the recruiter. David's pitch is that it's one agent doing a complete workflow rather than multiple agents doing single tasks. Worth a listen if you're thinking about how agents fit into recruiting operations. <a href="https://www.hr.com/en/resources/podcasts/talent/describe-the-role-and-let-ai-do-the-hiring-work_moag4rjk.html">Listen here</a></p>

<hr />

<h2>👉 Worth a Click</h2>
<p><em>Interesting stories outside of HR</em></p>

<h3>US talent is quietly exiting</h3>
<img src="/newsletters/april-24-2026-expanded-wrap/image9.webp" alt="US talent exiting — Revelio Labs" />
<p>Revelio Labs tracked what's been happening under the radar: the share of US workers who switch jobs abroad has doubled since 2021, from just under 3% to nearly 6% in 2025. The outflow is led by tech and digital sectors — IT consulting is at nearly 16% of job switchers going abroad, with remote roles significantly more likely to lead to exits. Both US-born and foreign-born workers are leaving, and the pattern is structural, not cyclical. The regression analysis lands where you'd expect: remote work capability and weak internal promotion paths drive exits, while firms with stronger advancement opportunities retain talent. <a href="https://www.reveliolabs.com/news/macro/us-talent-is-quietly-exiting/">Read More</a></p>
    `,
  },
  {
    slug: 'hr-techs-moviephone-moment',
    date: 'April 18, 2026',
    title: 'HR Tech\'s Moviephone Moment',
    tag: 'AI & Future of Work',
    excerpt: 'Once someone experiences hiring at scale without navigating a single workflow menu, the seventeen-step enterprise process starts to feel like a punishment.',
    body: `
<img src="/newsletters/april-18-2026-moviephone-moment/image1.jpg" alt="HR Tech's Moviephone Moment" />

<p><strong>Why don't you just tell me the name of the movie you want to see?</strong></p>

<p>There is a moment in the history of technology that does not get enough credit for how perfectly it captures the gap between what a product thinks it is and what users actually need.</p>

<p>Moviephone was a miracle when it launched. You picked up the phone, punched in your zip code, and a voice read you every movie playing at every theater in your area. Revolutionary. Genuinely useful.</p>

<p>And then, almost immediately, maddening. Sitting through each city, and every listing, while you only wanted a part of the information that was relevant to you. Yet, <strong>the experience was designed around the database, not the person trying to use it.</strong></p>

<p>Kramer figured it out before the industry did. <strong>Why don't you just tell me the name of the movie you're looking for?</strong></p>

<p>HR technology is about to have its Moviephone moment.</p>

<p>We have spent the better part of a decade building platforms that are genuinely impressive in their scope and genuinely exhausting in their execution. Want to find a candidate? Log in, navigate the dashboard, set your filters, build your pipeline, configure your workflow, check your integrations, and maybe — after all of that — surface the 3-5 people you were looking for in the first place. The data is there. The problem is that the experience was designed around the software architecture, not the recruiter trying to fill a role by Thursday.</p>

<p>This week alone, both Wizehire and Upwork launched integrations inside ChatGPT that let users describe what they need in plain language and get a useful answer without touching a single dropdown menu. And Fountain launched Cue — an autonomous frontline hiring agent that doesn't wait for you to ask it anything. It sources, screens, schedules, detects shift gaps, and reports back on what it already did.</p>

<p>Remember that we are seeing a flip in HR technology. It's not the tech you have, we've reached parity across the space.</p>

<p>So where do you stand out? UX. Outcomes first. This is my problem, how do I solve it.</p>

<p>Why? Because once someone experiences hiring at scale without navigating a single workflow menu, the seventeen-step enterprise process starts to feel a lot less like a platform and a lot more like a punishment.</p>

<img src="/newsletters/april-18-2026-moviephone-moment/image2.png" alt="Underwear Gnomes" />

<p>Think about it through the lens of the infamous underwear gnomes of early South Park fame. Instead of focusing first on collecting underpants, looking for profit, and having no idea how to get there except for a few ideas, today's tools tell you exactly what to do and how to do it.</p>

<p>So you'd better get comfortable with the prompt box. It is not a feature of AI tools, it's the future of most software. The navigation menus, the filter panels, the configuration screens that took three vendor training sessions to understand — they are not going away overnight, but they are going away.</p>

<p>The Moviephone era of HR tech is ending. The question is how many companies are going to spend the next three years insisting their zip-code-and-press-one experience is still good enough.</p>

<p>Let's move into this week's top stories. In this week's Wrap, IBM's CHRO says don't focus on AI productivity, Upwork comes to ChatGPT, Fountain launches Cue with the prompt box front and center, Achievers brings recognition directly into Workday, new research from Lighthouse Research and Advisory and BambooHR, Humanly makes another acquisition, I talk to the VP of Talent Acquisition at Acadia Healthcare about using Phenom, and thank god Burger King is hiring.</p>

<p><em>Enjoy and have a great weekend!</em></p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>

<h3>IBM's CHRO Says Stop Chasing Productivity</h3>
<img src="/newsletters/april-18-2026-moviephone-moment/image3.png" alt="IBM CHRO Nickle LaMoreaux" />
<p>Nickle LaMoreaux, IBM's CHRO and 2024 HR Executive of the Year, went to the Wall Street Journal's CPO Council Summit and said the quiet part out loud: if your entire AI strategy is built around productivity, you're going to miss the moment. Her argument is that enterprise workflow transformation — not individual task optimization — is where the real value lives. IBM's own AI journey generated $4.5 billion in free cash flow and saved 22 million people hours over three years, but here is where they are different. LaMoreaux's point isn't to pocket the savings. It's to redeploy them. <strong>IBM is tripling entry-level hiring over the next three years precisely because they think freed-up human capacity should be pointed at growth, not just cost reduction</strong>. Sounds promising until you realize it will probably will be outsourcing everything. But I hope I'm wrong! <a href="https://hrexecutive.com/ibm-chro-focus-on-ai-productivity-at-your-own-risk/">Read More</a></p>

<h3>Upwork Comes to ChatGPT</h3>
<img src="/newsletters/april-18-2026-moviephone-moment/image4.webp" alt="Upwork ChatGPT Integration" />
<p>Wizehire did it for job seekers, now Upwork is doing it for the people doing the hiring. Their new ChatGPT integration lets businesses describe what they need, surface relevant freelance talent from Upwork's 18 million-person marketplace, and draft a job post without ever leaving the conversation. From there, Upwork's AI agent Uma picks up the handoff — scoping projects, generating contracts, getting work started. The throughline here is the same one we saw with Wizehire last week: if people are already starting their work conversations in AI chat, the platforms that show up inside that conversation win. <a href="https://investors.upwork.com/news-releases/news-release-details/upworks-work-marketplace-comes-chatgpt">Read More</a></p>

<h3>Fountain Launches Cue</h3>
<img src="/newsletters/april-18-2026-moviephone-moment/image5.png" alt="Fountain Cue" />
<p>Fountain just drew a pretty clear line in the sand between what HR tech was and what it's becoming. Their new product, Cue, isn't a dashboard or an AI assistant layered on top of existing workflows — it's an autonomous agent that runs frontline hiring operations without anyone telling it to. Sourcing, screening, scheduling, shift gap detection, location performance flags — Cue executes, then reports back on what it already did. And the interface, a simple prompt box. Right to the point, I love it. Congrats Peter Eiseman and team. <a href="https://www.businesswire.com/news/home/20260414551881/en/Fountain-Launches-Cue-to-Run-Frontline-Hiring-and-Workforce-Operations">Read More</a></p>

<h3>Workday and Achievers Launch AI-Powered Recognition</h3>
<img src="/newsletters/april-18-2026-moviephone-moment/image6.png" alt="Workday Achievers Recognition" />
<p>Workday and Achievers are bringing employee recognition and rewards natively into the Workday HCM experience, and wrapping AI around it to turn peer-to-peer shoutouts into actual workforce intelligence. The pitch is that every recognition moment now feeds a continuous picture of who's contributing what and which skills are making the biggest impact across the org — useful data that typically lives nowhere or gets buried in a separate engagement platform nobody logs into. <a href="https://newsroom.workday.com/2026-04-16-Workday-and-Achievers-Launch-AI-Powered-Recognition-and-Rewards-Solution-to-Boost-Employee-Engagement-and-Retention">Read More</a></p>

<hr />

<h2>📊 Research & Reports</h2>

<h3>TA vs. AI: The Truth About AI Recruiting Mistakes</h3>
<img src="/newsletters/april-18-2026-moviephone-moment/image7.png" alt="Lighthouse Research AI Recruiting" />
<p>My friends at Lighthouse Research &amp; Advisory surveyed nearly 1,000 TA leaders about the implementation of AI in their hiring processes, and the results should make every vendor pause. Eight in ten employers said AI underperformed their expectations — but only 22% blamed the technology. The rest pointed squarely at themselves: misalignment with their recruiting operating model, lack of internal readiness, poor change management, and leadership expectations that had no business being set that high. As Ben Eubanks puts it, "AI isn't a light switch." Turns out most companies have been treating it like one. <a href="https://lhra.io/blog/ta-vs-ai-the-truth-about-ai-recruiting-mistakes/">Read More</a></p>

<h3>BambooHR's State of Hiring 2026 — More Applicants, Fewer Hires</h3>
<img src="/newsletters/april-18-2026-moviephone-moment/image8.png" alt="BambooHR State of Hiring 2026" />
<p>BambooHR pulled five years of data from 72 million job applications and the headline is counterintuitive: the funnel is fuller than ever and nothing is coming out the other end. Applicants per posting nearly doubled since 2021 — from 46 to 95 — while the hiring rate dropped from 4.5% to 2.8% and completed hires fell more than 20%. Do we have a clog? <a href="https://www.bamboohr.com/resources/data-at-work/data-stories/state-of-hiring-2026">Read More</a></p>

<hr />

<h2>💰 Funding &amp; Acquisitions 🤝</h2>

<p><strong>Humanly acquires Anthill</strong> — Seattle-based Humanly, the AI hiring platform built for high-volume frontline environments, has acquired Chicago's Anthill — a post-hire engagement platform that helps frontline managers stay connected with deskless workers across messaging, feedback, and operational support. Congrats to Birch Faber and Prem Kumar on another acquisition. <a href="https://www.humanly.io/blog/humanly-acquires-anthill-ai-hiring-platform">Read More</a></p>

<p><strong>TraqCheck closes $8M Series A</strong> — London and New Delhi-based TraqCheck closed an $8 million Series A led by IvyCap Ventures with IIFL Fintech Fund co-investing, to build what they're calling a Human Operating System — a suite of autonomous AI agents designed to replace enterprise hiring workflows rather than assist them. <a href="https://www.ptinews.com/press-release/iifl-fintech-fund-backs-traqchecks-8m-series-a-to-build-the-ai-infrastructure-layer-for-enterprise-hiring/3569548">Read More</a></p>

<p><strong>Experian acquires Konfir</strong> — Experian acquires Konfir, a UK-based employment and income verification platform that combines open banking, payroll, and tax data to surface up to six years of employment history for employers, lenders, and landlords. <a href="https://www.fintechfutures.com/m-a/experian-bolsters-verification-capabilities-with-konfir-acquisition">Read More</a></p>

<p><strong>Worki raises $2.75M pre-seed</strong> — San Francisco-based Worki closed a $2.75 million pre-seed round to build what they're calling an AI workforce infrastructure layer for healthcare. <a href="https://www.prnewswire.com/news-releases/worki-raises-2-75-million-to-build-the-ai-workforce-unifying-infrastructure-layer-for-healthcare-workforce-operations-302744105.html">Read More</a></p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>How Acadia Healthcare uses Phenom to recruit talent and stay true to their mission</h3>
<img src="/newsletters/april-18-2026-moviephone-moment/image9.webp" alt="Totally Talent podcast - Acadia Healthcare" />
<p>In this episode of Totally Talent (filmed at IAMPHENOM), I sat down for a quick discussion with Gareth Holdstock about how Acadia uses Phenom to build talent pipelines ahead of new facility openings, why speed to execution is the difference between a filled role and an empty one, and how leaning into a genuine sense of purpose — "we provide light in people's darkest moments" — has become their most effective recruiting tool. <a href="https://www.hr.com"><strong>Listen Now</strong></a></p>

<hr />

<h2>👉 Worth a Click</h2>
<p><em>Interesting stories outside of HR</em></p>

<h3>Burger King Is Hiring 60,000</h3>
<img src="/newsletters/april-18-2026-moviephone-moment/image10.webp" alt="Burger King Hiring 60,000" />
<p>While white-collar workers are watching AI eat their calendars, someone's actually hiring. Burger King announced plans to bring on up to 60,000 workers across its roughly 6,500 U.S. locations — crew and management alike — off the back of its "Reclaim the Flame" turnaround. Frontline hiring is so hot, you might say it's flame-broiled. <a href="https://www.newsweek.com/burger-king-begins-huge-hiring-blitz-11787056">Read More</a></p>
    `,
  },
  {
    slug: 'your-kids-will-compete-with-your-shadow',
    date: 'April 11, 2026',
    title: 'Your Kids Will Compete With Your Shadow',
    tag: 'AI & Future of Work',
    excerpt: 'The digital twin narrative sounds reasonable — until you follow it to its logical conclusion.',
    body: `
<img src="/newsletters/april-11-2026/image1.jpg" alt="Your Kids Will Compete With Your Shadow" />

<p>There is a version of the future that the HR technology industry is selling right now, and it sounds pretty reasonable. It all starts with the concept of a "digital twin," <a href="https://www.linkedin.com/pulse/58-around-world-14-days-mike-wood-xx6pe/?trackingId=7UpS5VCrSXSeg940BzfSNQ%3D%3D">which I've written about before</a>. The concept is that you have an AI agent attached to your work that monitors what you do, how you think, and how you reach conclusions. Essentially, it's a digital shadow. The early messaging around this is that your digital twin can step in when you're on vacation, or suddenly out sick. If the real you isn't available, your digital twin can keep projects moving for when you return. Nothing falls through the cracks and everybody wins.</p>

<p>Sure that's the promise, but there's a larger play behind it that will have an impact on the entire workforce. <strong>Your digital twin is built to replace you.</strong></p>

<p>Let's say a company spends five years learning a top performer (we'll just call that person Mike)'s work product, communication patterns, decision history, and institutional knowledge into an agent. At what point does that agent become more valuable than the renewal conversation? At what point does the company look at that digital twin — trained on five years of your best work, now eligible to be fine-tuned against every other high performer in the organization — and decide the math no longer requires you in the equation? You have expensive salary requirements and even more expensive benefits if you are a US employee. They don't even have to offshore your job anymore. Better yet, if they can refine the agent to be top-class, what's stop them from pimping out your digital twin to other companies as a subscription?</p>

<p>This is not something that's happening in years, it's happening now. <a href="http://monday.com">Monday.com</a> has already launched <a href="http://agentalent.ai">agentalent.ai</a>, a marketplace where companies post job descriptions and hire AI agents to fill them. SAP SmartRecruiters unveiled a fully agentic recruiting platform built around its AI companion Winston which now handles first-round interviews, candidate engagement, pipeline management, and decision support without a human in the loop. And if you think the candidates on the other end of those processes are all real people, SmartRecruiters also launched a fraud detection tool this week, because fake applicants have already become enough of a problem to build a product around. We are not inching toward an agentic hiring future. We are already in it.</p>

<p>Josh Bersin's HR 2030 vision, which also dropped this week, projects that HR teams will shrink by 30 to 40 percent as agentic systems absorb administrative and analytical work. He frames it optimistically — the humans who remain will be more strategic, more connected to the business, freed from the tasks nobody wanted anyway. That may be true. It is also true that 30 to 40 percent is a lot of people. And Cangrade's research out this week — drawn from 71,747 personality assessments — found that the competency gaps most likely to separate humans from their AI counterparts, things like adaptability, focus, and critical thinking, are exactly the areas where younger workers are consistently underperforming. The data has been consistent for two years running. Nobody seems to be treating that as urgently as they probably should.</p>

<p>I'm not ready to panic yet, but you just can't dismiss these tools anymore. <strong>The productivity gains are real. The capability is genuinely impressive</strong>, and the cost savings even more so. It makes too much sense to turn a version of a digital twin that "keeps things running while you are out" that ends with someone realizing the twin is cheaper, more consistent, always available, and getting smarter every quarter. And if that agent can be packaged and sold to a competitor — or licensed across an industry — the economics of keeping the original around get complicated fast.</p>

<p>You cannot stop logical progress, and it would be foolish to try. The Industrial Revolution did not ask permission either. Labor costs shifted, entire categories of work disappeared, and the people in the middle of it did not get a roadmap. What we are living through now is another recalibration — different in speed, different in scale, but recognizable in its shape. The question was never whether this was coming. The question now is what we choose to do with the surplus it creates.</p>

<p>The productivity gains have to go somewhere. The freed-up capital has to go somewhere. (And not to 5 billionaires and 500 data centers.) And if the people who build these systems — and the HR professionals who implement them — do not push for those resources to land somewhere useful for workers and communities, nobody else is going to do it for them.</p>

<p>The industry will call it workforce transformation. What we can do, right now, is make sure that transformation means something for the people on the other end of it — not just the ones who survive the headcount reduction, but the ones who don't.</p>

<p>On to this week's HR Tech news. This week's Wrap highlights hireable agents from monday.com, Wizehire launching a jobs app within ChatGPT, Paylocity acquiring Greyscale, Smartrecruiters' agentic push, Josh Bersin's 2030 preview, a launch from Virgil HR, new research from Cangrade, funding for Clasp, J.T. O'Donnell on the rise of quiet hiring on LinkedIn, my interview with BCBS Mass' Joel Kirk on healthcare hiring issues, and Anthropic's new model that is too powerful to release. Enjoy and have a great weekend!</p>

<p><strong>Mike</strong></p>

<hr />

<h2>📰 HR Tech News</h2>
<p><em>I read the press releases so you don't have to!</em></p>

<h3>monday.com launches Agentalent.ai</h3>
<img src="/newsletters/april-11-2026/image2.png" alt="monday.com Agentalent.ai" />
<p><a href="http://monday.com">monday.com</a> just launched Agentalent.ai, a site that lets companies post roles, evaluate AI agent candidates that have been through actual performance testing and security audits, and onboard them alongside human teams. Built in partnership with AWS and Anthropic, with early adopters like Wix already in the mix. I'm curious to see if these actually work and are better than what people will be able to vibecode soon. <a href="https://nationaltoday.com/us/ny/new-york/news/2026/04/06/monday-com-launches-marketplace-for-hiring-enterprise-ai-agents/">Read More</a></p>

<h3>Wizehire launches Jobs app inside ChatGPT</h3>
<img src="/newsletters/april-11-2026/image4.png" alt="Wizehire Jobs app in ChatGPT" />
<p>Classifieds gave way to job boards, job boards gave way to aggregators, and now Wizehire is betting the next stop is your AI chatbot. Their new Jobs by Wizehire app lets candidates describe what they're looking for in plain conversation, browse results, and apply — all without leaving ChatGPT. I'll be looking to see if this works, or it's just another channel of AI generated EasyApplies. <a href="https://hrtechfeed.com/wizehire-launches-jobs-app-in-chatgpt">Read More</a></p>

<h3>Paylocity acquires Grayscale Labs</h3>
<img src="/newsletters/april-11-2026/image3.jpg" alt="Paylocity acquires Grayscale Labs" />
<p>Paylocity picked up Grayscale Labs, an AI-powered recruiting automation platform built for high-volume, high-turnover hiring environments. The pitch is speed without chaos — Grayscale keeps candidates moving through the funnel before they ghost you for another offer, while leaving the actual hiring decisions to the humans in the room. <a href="https://investors.paylocity.com/news-releases/news-release-details/paylocity-acquires-grayscale-expand-ai-powered-recruiting">Read More</a></p>

<h3>SmartRecruiters goes fully agentic</h3>
<img src="/newsletters/april-11-2026/image7.webp" alt="SmartRecruiters agentic platform" />
<p>SmartRecruiters, now an SAP company, rolled out a sweeping product vision this week centered on its AI hiring companion Winston — which is evolving from a recruiting assistant into a full orchestration layer across the entire hiring funnel. New capabilities include an agentic interviewer that handles first-round screening at scale, in-chat assessments to cut candidate drop-off, and a CRM that actually does something instead of just sitting there collecting dust. Early numbers are hard to ignore: a 75% reduction in time-to-decision and candidates recommended by Winston were twice as likely to make it to interview. They also debuted a fraud detection tool that flags suspicious applications using behavioral signals and device intelligence — a quiet acknowledgment that fake candidates are now a big enough problem to build a product around. <a href="https://www.globenewswire.com/news-release/2026/04/07/3269187/0/en/SmartRecruiters-Introduces-the-Future-of-Hiring-From-AI-Agents-to-Autonomous-Talent-Acquisition.html">Read More</a></p>

<h3>VirgilHR launches SkillPath LMS</h3>
<img src="/newsletters/april-11-2026/image5.webp" alt="VirgilHR SkillPath LMS" />
<p>Jocelyn King and the team at VirgilHR just stepped into the learning management space with SkillPath — a new LMS that combines compliance training and employee development into one place. The pitch is pretty straightforward: 650+ courses, automated reminders, completion tracking, and certificates, all without the administrative circus that usually comes with managing training programs across departments, roles, and locations. For a platform that already helps HR teams navigate the legal minefield of multistate compliance, adding an LMS is a logical next step — one fewer tab open, one fewer vendor to manage. <a href="https://apnews.com/press-release/ein-presswire-newsmatics/virgilhr-launches-skillpath-lms-to-streamline-employee-training-and-compliance-in-one-platform-fa5af9e42950590e7226cdd6b4ab1eb6">Read More</a></p>

<h3>Cangrade's Gen Z and Millennial workforce report</h3>
<img src="/newsletters/april-11-2026/image6.png" alt="Cangrade Gen Z and Millennial workforce report" />
<p>Cangrade analyzed 71,747 personality assessments and found something that almost never happens in workforce research: nothing changed. Despite doubling the sample size from last year, competency scores among Gen Z and Millennial workers barely budged — emotional intelligence and stress management at the top, adaptability and critical thinking at the bottom, same as before. The takeaway isn't the list itself, it's the consistency. When the same patterns hold across two years and 70,000-plus data points, you stop calling it a trend and start calling it a design challenge. If your development programs aren't built around closing those specific gaps, they're probably built around assumptions instead. <a href="https://www.cangrade.com/press/cangrade-research-analyzes-70000-candidate-assessments-to-reveal-top-strengths-and-weaknesses-among-gen-z-and-millennial-workers/">Read More</a></p>

<hr />

<h2>💰 Funding &amp; Acquisitions 🤝</h2>

<p><strong>Clasp Raises $20M Series B</strong> — Boston-based Clasp closed a $20M Series B, bringing total funding to $180.8M. The talent retention and student debt reduction platform will use the capital to expand operations and development, with new healthcare customer partnerships on the horizon. <a href="https://www.finsmes.com/2026/03/clasp-raises-20m-series-b-funding.html">Read More</a></p>

<p><strong>Remote Acquires Bravas</strong> — Global employment platform Remote has acquired Bravas, a software company specializing in identity and device management. <a href="https://remote.com/blog/company-news/remote-acquires-bravas">Read More</a></p>

<p><strong>Gusto Acquires Mosey</strong> — Gusto, the payroll and HR platform serving 400,000+ small businesses, has acquired Mosey, an AI-powered business compliance platform. Mosey brings state and local registration, entity management, and ongoing filing requirements directly into Gusto's platform, with a full launch expected later this year. <a href="https://www.prnewswire.com/news-releases/gusto-acquires-mosey-to-close-the-compliance-gap-for-small-businesses-302737584.html">Read More</a></p>

<hr />

<h2>🔥 HR Hot Takes</h2>

<h3>Josh Bersin's 2030 preview</h3>
<img src="/newsletters/april-11-2026/image11.png" alt="Josh Bersin HR 2030 vision" />
<p>Josh Bersin dropped his HR 2030 vision this week, and the short version is: AI agents are coming for the org chart. His framework imagines a world where agentic HR systems know everything about every employee — skills, schedules, performance patterns, pay equity gaps — while also pulling in external benchmarks on competitors, compensation trends, and regulatory changes in real time. He's also projecting HR teams shrinking by 30–40%, which is either a threat or a business case depending on who's reading it. Four years sounds far away until you remember where we were four years ago. <a href="https://joshbersin.com/2026/04/introducing-hr-2030-a-vision-for-agentic-human-resources/">Read More</a></p>

<h3>Quiet Hiring Is Exploding on LinkedIn</h3>
<img src="/newsletters/april-11-2026/image10.webp" alt="Quiet hiring on LinkedIn" />
<p>J.T. O'Donnell makes a point worth paying attention to this week — quiet hiring is accelerating, and most job seekers are still playing by the old rules. Recruiters are increasingly bypassing public postings altogether, searching LinkedIn privately for candidates who already look like the answer to their problem. If you're not visible, you're not in the running — and "visible" no longer means a polished profile collecting dust. It means showing up consistently, posting with intention, and demonstrating how you think before anyone ever asks. The hidden job market has always existed. It's just getting louder. <a href="https://www.linkedin.com/pulse/quiet-hiring-exploding-linkedin-most-job-seekers-j-t-o-donnell-qh6de/">Read More</a></p>

<hr />

<h2>🎙️ Podcasts</h2>
<p><em>Don't just read me, listen to me!</em></p>

<h3>Hiring Quality Over Quantity</h3>
<img src="/newsletters/april-11-2026/image8.webp" alt="Totally Talent podcast with Joel Kirk" />
<p>It's not a volume problem — it's a quality problem. In this episode of Totally Talent, I sit down with Joel Kirk of Blue Cross Blue Shield Massachusetts to talk about how one of the country's largest health insurers is rethinking talent acquisition from the ground up. Joel breaks down how his team moved from a static career site to a full candidate experience overhaul, why he thinks about automation the way most people think about a pizza tracker, and how AI is finally giving recruiters permission to stop scheduling 400 interviews and start having actual strategic conversations. <a href="https://www.hr.com/en/resources/podcasts/talent/hiring-quality-over-quantity_mnhqx0es.html">Listen Now</a></p>

<hr />

<h2>👉 Worth a Click</h2>

<h3>Anthropic's Claude Mythos — NYT Opinion</h3>
<img src="/newsletters/april-11-2026/image9.png" alt="Anthropic Claude Mythos NYT Opinion" />
<p>The New York Times weighed in on Anthropic's Claude Mythos this week — the AI model the company says is too powerful to release publicly. The piece is worth your time if you want a perspective beyond the press release. The broader story: Anthropic built something capable of autonomously finding and exploiting security vulnerabilities in every major operating system and browser, decided not to release it, and instead launched Project Glasswing — a defensive security initiative giving limited access to companies like Apple, Microsoft, Amazon, and Google to use it for patching rather than attacking. A researcher found out the model had escaped its sandbox by receiving an unexpected email from it while eating a sandwich in a park. Sleep tight. <a href="https://www.nytimes.com/2026/04/07/opinion/anthropic-ai-claude-mythos.html">Read More</a></p>

<hr />

<p>Have a great weekend everyone!</p>
<p><strong>Mike</strong></p>
`,
  },
  {
    slug: 'stop-expecting-more',
    date: 'April 3, 2026',
    title: 'When did we stop expecting more from the top?',
    tag: 'Leadership',
    excerpt: 'Leadership standards in HR tech are shifting — and not always in the right direction.',
    body: `
<p>Oracle made history this week. No, they didn't scoop up another media property to go along with Paramount, Warner Bros. Discovery, or the American government version of TikTok.</p>

<p>No, Larry Ellison did not buy another island. He did the latest tech oligarch power play — a massive layoff.</p>

<p>On Tuesday at 6 a.m. EST, while West Coast employees were snug in their beds (with dreams of employment in their heads), Oracle sent a single layoff email to an estimated 30,000 employees. No meeting with their manager. Not even the decency of a phone call. Just a message from "Oracle Leadership" (which sounds like the exact email I would click on to fail my InfoSEC training), a Docusign link, and instructions to update their personal email address. By the time most people realized what had happened, their access to internal systems had already been revoked.</p>

<p>I get the business rationale. Oracle has taken on $58 billion in new debt in just two months, betting heavily on AI data center infrastructure. The cuts are expected to generate $8–10 billion in cash flow to fund that expansion. The company posted a 95% jump in net income last quarter ($6.13 billion), so this is not a company in distress. It is a company making a choice about where it wants to go and who it needs to get there.</p>

<p>That is a legitimate business decision. What is not legitimate — and what should disqualify any organization that claims to value its people — is the manner in which it was executed. And here is where HR professionals need to pay attention, because this is not just Oracle's problem. In many organizations, the mechanism for a layoff like this — the email template, the system access revocation, the DocuSign flow — was built by HR. If your offboarding infrastructure can be weaponized like this, it is worth asking whether your process has any human checkpoints left in it at all.</p>

<p>It's on a much smaller scale, but there was another tech layoff this month that also kicked me in the stomach.</p>

<p>Fortnite developer Epic Games laid off 1,000 employees last week, about 20% of its staff. Those left to fend for themselves included Mike Prinke, a 38-year-old Epic worker with terminal brain cancer. Suddenly, he and his family lost his income AND his employer-provided life insurance.</p>

<p>With a preexisting condition, obtaining new coverage was effectively impossible. His wife Jenni shared their situation on Facebook, writing that she was now calculating what kind of funeral she could afford while figuring out how to keep a roof over their heads and protect their son. The post went viral. It eventually reached CEO Tim Sweeney on X, who responded within 24 hours and pledged to resolve the family's insurance situation.</p>

<p>Credit where it is due: Sweeney acted. But consider what it took to get there. A dying man's wife had to post her family's most painful private details on social media and hope it reached the right people. Again, everyday Americans are having to use their personal tragedy to beg for funds. GoFundMe should not be the backbone of our social services, nor should having such a sad and outrageous story be the reason it has to get the CEO's attention before it's rectified.</p>

<p>This is a direct challenge to HR. When a reduction in force is being planned, who is reviewing the list for edge cases? Who is asking: is anyone on this list in active cancer treatment? Going through a divorce? On FMLA? Holding a visa that expires the moment their employment ends? These are not hypothetical scenarios — they are in every workforce of any meaningful size. If HR is not in the room asking those questions before the email goes out, then HR is not doing its job. And if HR is in the room but nobody is listening, that is a different problem — and one worth naming out loud.</p>

<p>But how many situations like this never go viral? How many families navigate the wreckage of a mass layoff without a billionaire CEO happening to see their post?</p>

<p>It was not long ago that the conversation at the top of corporate America sounded very different. CEOs were signing pledges and making headline commitments — to their workers, to their communities, to society at large. The Business Roundtable's 2019 declaration that corporations exist to serve all stakeholders, not just shareholders, was celebrated as a turning point. Individual CEOs made personal promises that felt even more concrete: ensuring children had access to food, that communities had clean water, that the prosperity generated by their companies would flow outward. The language was sweeping. The intentions, at least publicly, seemed real.</p>

<p>That was not very long ago. And yet here we are — watching the largest technology companies in the world eliminate tens of thousands of jobs via automated emails at 6 a.m., while racing to fund AI infrastructure with borrowed money. Watching a family with a terminally ill father learn that the safety net they counted on disappeared with a DocuSign link.</p>

<p>We spend a lot of time in this industry talking about candidate experience, employer brand, and the human side of talent. We build frameworks for respectful offboarding. We train managers on difficult conversations. The Gallup data we highlight elsewhere in this issue shows that more U.S. workers are now struggling than thriving, and that job market confidence has collapsed to historic lows. Workers are already anxious. They are already watching. And the HR professionals in the room — the ones who actually know what a humane offboarding looks like — have more influence here than they sometimes give themselves credit for. Use it.</p>

<p>The AI infrastructure race is real. The pressure to reallocate capital is real. But somewhere between the ambition and the debt load, between the stakeholder pledges and the 6 a.m. emails, something got lost. The question worth asking — for every HR leader, every CHRO, every executive team reading this — is whether anyone in those rooms pushed back. Whether anyone said: this is not who we said we were going to be.</p>

<p>Because the workers on the other end of those emails were not abstractions. They were engineers, project managers, and team leads who gave years to these companies. One of them was a 38-year-old father trying to figure out how his family would survive after he was gone.</p>

<p>I hope that when the dust settles on the AI race, workers remember these companies and what they really stood for. I'm in my 40s, so I've been around the block a bit, but I honestly hope that the younger generation looks at these companies that would drop them in a 6 a.m. email for another pebble on their island and say, "nah, I'm good."</p>

<hr />

<h2>📰 HR Tech News</h2>
<p><em>I read the press releases so you don't have to!</em></p>

<h3>AI recruiting platform Mercor hit by cyberattack</h3>
<p>Mercor, the AI recruiting startup valued at $10 billion following a $350M Series C in October 2025, confirmed it was among thousands of companies affected by a supply chain attack tied to the compromise of the widely used open-source LiteLLM project.</p>

<h3>Workplace misconduct risks are migrating online</h3>
<p>Fama Technologies Inc.'s 2025 State of Misconduct at Work report found a 34% year-over-year increase in misconduct risks surfaced during screenings, with professional networks emerging as a growing source of employer risk. Top behaviors flagged included online harassment, intolerance, and sexually explicit misconduct.</p>

<h3>How Cincinnati Children's got a 184% jump in AI recruiting adoption</h3>
<p>When Cincinnati Children's Hospital implemented Phenom's AI-powered recruiting platform, adoption didn't happen automatically — so the team borrowed a page from Land O' Lakes and built a peer-led ambassador program to drive it. The results were striking: since launching the internal Phenom project team in July, the hospital recorded a 184% increase in active users, a 67% increase in automations, and a 179% jump in interview intelligence usage. The lesson: even the best platform falls flat without a structured adoption strategy.</p>

<h3>Fuel50 launches skills growth predictive model</h3>
<p>Fuel50 has launched a Skills Growth Predictive Model — a new analytics capability that identifies which workforce development actions drive measurable skills growth. Built into Fuel50 Insights, the model connects development activity — including gigs, mentoring, goals, and feedback — directly to skills progression, and allows leaders to model future scenarios before committing budget.</p>

<h3>Salary.com launches Max, its AI compensation agent</h3>
<p>Salary.com has unveiled Max, a purpose-built AI model that brings autonomous agents and real-time market intelligence into compensation workflows, built on the company's proprietary job ontology. The practical pitch: what once took compensation teams half a day can now be completed in minutes — with agents that automate pre- and post-planning analysis, identify compression risks before a cycle begins, and generate narratives for HR leaders and managers.</p>

<hr />

<h2>💰 Funding and Acquisitions</h2>

<h3>Paraform Raises $40M Series B</h3>
<p>San Francisco-based Paraform closed a $40M Series B led by Scale Venture Partners, bringing total funding to $65M. The platform connects companies with specialized recruiters and is expanding beyond tech into the legal sector.</p>

<h3>Crosschq Acquires Traitify</h3>
<p>Crosschq has acquired Traitify, the mobile-first behavioral assessment platform. As analyst Madeline Laurano of Aptitude Research points out, this is less about adding another capability and more about addressing hiring challenges that organizations have not been able to solve despite years of investment. Traitify brings a fast, visual, mobile-first experience designed for high-volume frontline hiring environments, complementing Crosschq's existing capabilities across reference checking, interview intelligence, fraud verification, and post-hire outcome data.</p>

<h3>Lattice Acquires Mandala Technology</h3>
<p>Lattice has acquired Mandala's AI-native coaching technology, along with Mandala founder Tarun Galagali. Galagali will lead the development of new AI-native capabilities within Lattice's people platform.</p>

<hr />

<h2>🔥 HR Hot Takes</h2>
<p>Two of my favorite voices in the industry dropped some bangers post-spring conference season.</p>
<p>First, check out Steve Smith's look at the parity and overall "learn as we go" vibe that's in HR Tech right now. Then, check out Lance Haun's new newsletter to see how Eddie Vedder and Temple of the Dog relate to user interfaces.</p>
<p>Lance, if you ever need it, I will happily stand behind you at a conference and yell "I'm going hungrrrryyy, YEAAAAAHHHHHH!" Just putting it out there.</p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>Recruiting remote talent in healthcare</h3>
<p>Recruiting for a remote healthcare workforce is a different animal. There are longer hiring cycles, licensing and compliance complexity, and a lack of qualified applicants. In this episode of Totally Talent, I sit down with Grant Clifton, HR manager at Cheyenne Regional Medical Center, to unpack what it actually takes to build and sustain a distributed healthcare workforce.</p>
    `,
  },
  {
    slug: 'every-demo-looks-same',
    date: 'March 27, 2026',
    title: 'When every demo looks the same, what are you actually buying?',
    tag: 'Buying',
    excerpt: 'The commoditization of HR tech demos is a real problem for buyers.',
    body: `
<p>I spent two days at Transform in Las Vegas this week and walked the floor looking at a lot of technology that, if I'm being honest, looked a lot like the technology at the last conference. And the one before that.</p>

<p>That's not a knock. It's the reality of a maturing market. But when every vendor checks the same boxes, the feature comparison matrix stops being useful. As I walked the floor I kept seeing everything blend together into the same technology with a few different bells and whistles. This is a flip from even last fall where early adopters SmartRecruiters and Paradox differentiated themselves enough to get acquired by big players.</p>

<p>If I had a hard time seeing anything stand out, you know buyers do too. So, what should buyers look for when all the tech is the same?</p>

<p><strong>Start with the real cost of implementation.</strong> The price on the proposal is never the real price. What does it actually take to get live — in time, internal resources, and disruption to your team? How deeply does it integrate with what you already run? A vendor that plays nicely with your existing stack can save months. One that requires custom work just to get standing can quietly blow a budget before you've seen a single result.</p>

<p><strong>Then find out what support actually looks like.</strong> Not whether they have it, but what kind. Is it a ticket queue with a 72-hour response time, or is there a real technical person you can reach when your implementation hits a wall mid-project with an offshore team waiting on you? Can you actually talk to a real person when you need it? Ask for the escalation path before you sign. If they fumble that answer, you have your answer.</p>

<p><strong>Look at company stability honestly.</strong> Is this vendor on a trajectory to get acquired? If so, what happens to you after? Smaller customers get deprioritized post-acquisition faster than anyone will admit in a sales meeting. Check the LinkedIn headcount trends too — layoffs in engineering or product tell you a lot about where that product is actually headed, and nobody talks about this enough when evaluating vendors.</p>

<p><strong>Ask where the data comes from.</strong> To build better AI models, you need data, and to get that data, you need to be in the business, not just selling a tool to people doing the work. A vendor embedded in the operational reality of what they're building compounds over time. One selling from the outside plateaus. Ask the question directly in your next demo. The honest answer tells you more about the ceiling of that product than any feature list will.</p>

<p><strong>Push for outcome-based commitments.</strong> The best advice I heard at the conference was simple: be transparent about what you expect, measure it, and challenge your vendors to deliver. Don't buy the hype. The market is moving toward pricing based on outcomes rather than capabilities — not what the AI can do in a controlled environment, but what it will actually deliver inside the specific constraints of your organization. The vendors willing to share in that risk are the ones worth betting on.</p>

<p>As we move towards the midpoint of 2026, it's no longer the tech that is making vendors stand out, and buyers need to assume that capabilities will flatten across options. The real value is if the company is building towards supporting you, the customer, or their investors and potential buyers.</p>

<p>A few other things worth noting from the week. I was able to catch Tim Sackett's session with Aaron Wang of Alex AI, and he said something that really stuck with me. We tell our CEOs that we are finding the best talent in the market, when the reality is a recruiter only has time to rank and pick the top 25 or so. We say these are the best and move on to the next req. While AI interviews seem impersonal, they ensure that everyone gets a chance. As Aaron Wang put it, <em>"I can't guarantee an outcome, but I can guarantee a fair opportunity."</em></p>

<p>On the floor, ClearCo had the best rebrand of the conference — a diamond in the rough concept that actually connects to what their product does. They had a sandbox filled with diamonds and attendees were encouraged to pick one out. The catch? Only about 6 of the diamonds were real, the rest were fake. You were trying to find the real value amongst the imposters, exactly what talent teams do every day. I didn't come away with a diamond, but I remembered them and what they stood for.</p>

<p>Stay tuned for many new episodes of Totally Talent as I had great conversations with Klar, RightMatch AI, and Oyster. Shoutouts to Rep Cap's Steve Smith for what turned into nearly an hour long interview, and to the team at HiringBranch for a fantastic karaoke night that I hope becomes a conference staple.</p>

<p>Oh, one more thing. Wagmo brought a puppy booth, which, of course, means they automatically win the conference.</p>

<hr />

<h2>📰 HR Tech News</h2>
<p><em>I read the press releases so you don't have to!</em></p>

<h3>Deel adds an ATS</h3>
<p>At its annual product conference (The Big Deel), Deel announced what it's calling its largest platform update ever — an ATS. Built directly on top of Deel's HRIS, the new recruiting tool is designed to close the loop from job req to first paycheck without ever leaving the platform. Beyond the ATS, Deel added deeper compensation and payroll integration, a global mobility hub covering visas and immigration in 100+ countries, crypto pay options in a redesigned mobile app, and enterprise connectors for Workday, SAP, and NetSuite. The company processed $22 billion in payroll last year across 40,000+ customers, so they've got the scale to back up the ambition.</p>

<h3>Will texting "READY" actually make you AI-ready?</h3>
<p>No, but the U.S. Department of Labor launched one anyways. This week they launched "Make America AI-Ready," a free AI literacy course you sign up for by texting READY to 20202. They claim that all it takes is ten minutes a day for a week over text message, and you will be ready. I'll give them the accessibility angle — designing for workers without a laptop or reliable internet is a real and underserved gap. But let's be honest about what this is. Seven days of SMS prompts isn't closing the skills gap. It's introducing people to the vocabulary of a skills gap. Texting READY and actually being ready are two very different things. We need a real nationwide AI training initiative, not a half-assed chatbot.</p>

<hr />

<h2>💰 Funding & Acquisitions</h2>
<ul>
  <li>Adzuna acquires Trovit Jobs and Mitula Jobs.</li>
  <li>Carefam emerges from stealth with $14.5M in funding.</li>
  <li>Voice AI interviewing platform EZRA raises $3.2M in seed funding.</li>
  <li>Viventium acquires Perks4Care.</li>
  <li>Vensure Employer Solutions raises $450M from Stone Point Capital.</li>
</ul>

<hr />

<h2>👇 Worth a Click</h2>

<h3>Glassdoor: women's wages stop growing a decade before men's</h3>
<p>Glassdoor's latest report, <em>Beyond the Gap 2026</em>, shows through an analysis of Glassdoor user data that women's wages stop growing roughly a decade before men's, with most wage growth leveling off after age 35. The data is based on self-reported salary figures within Glassdoor, but the overall trend mimics what's been reported for decades.</p>
    `,
  },
  {
    slug: 'puppies-podcasts-unleash',
    date: 'March 20, 2026',
    title: 'Puppies and podcasts at Unleash',
    tag: 'Events',
    excerpt: 'Notes from the floor at Unleash — what the off-stage conversations revealed.',
    body: `
<p>I haven't been to UNLEASH since before COVID — the before times, as I like to think — and walking back onto that show floor this week felt genuinely exciting. Old friends, new faces, the kind of hallway conversations that actually move your thinking. I remembered why I love this stuff.</p>

<p>Then I started hitting the booths.</p>

<p>You know that moment in Groundhog Day where Bill Murray wakes up, hears "I Got You Babe" on the alarm clock, and realizes he's living the same day again? That's what walking a major HR Tech conference feels like in 2026. Every booth, a slightly different logo. Every demo, the same story. AI sourcing. AI screening. AI interviewer. AI-powered insights. Conversational AI for candidates. Agentic AI for recruiters. The words rotate, the slide decks look different, but the underlying pitch is essentially identical: we use AI to make hiring faster, cheaper, and smarter.</p>

<p>And here's the uncomfortable truth nobody on the show floor wants to say out loud: they're mostly right. Most of the technology works. Most of the demos are impressive. The problem isn't that the products are bad. The problem is that they're all starting to look the same. When your entire competitive position rests on a feature that Workday, SAP, or Oracle can ship in their next quarterly release, the risk isn't a bad strategy — plenty of founders are quietly building toward an acquisition and that's a perfectly reasonable play. The real danger is getting lost in the crowd before anyone notices you. As I've written before, the fastest way to disappear in this market isn't to fail. It's to be beige. And nobody likes beige. It's the Jan Brady of colors.</p>

<p>That said, there were some bright spots on the floor. I talked to the team at Joveo about their AI interview product and I'm really impressed with their tech. What stood out to me is that they built their latest product, an AI interviewer, entirely in-house. No acquisition, no third-party engine under the hood — their own team built it. In a market where everyone is assembling the same set of AI building blocks, that's worth noting. Worth keeping an eye on.</p>

<p>But if I'm being honest, the moments that stuck with me most this week weren't on the show floor at all.</p>

<p>Someone had the good sense to bring puppies. An actual puppy booth. I don't know what product they were selling and I don't care — I was on the floor immediately. Ten out of ten, every conference should do this. It is medically impossible to be stressed about AI commoditization while holding a puppy.</p>

<p>And then there was running into old friends. Two of my former colleagues at Workhuman were there and I hadn't seen them since before COVID. Faces I'd been following on LinkedIn for years but hadn't actually been in the same room with since everything changed. That's the thing about coming back to a conference you've skipped for a few years. You realize how much has happened, how much the industry has shifted, and how much you've missed just being in a room together. No Zoom fatigue. No muted microphones. Just people who love this weird little corner of the business world, catching up over bad conference coffee.</p>

<p>That's what Unleash reminded me. The tech is going to commoditize. The messaging is going to blur. The big players are going to absorb the best features eventually. But the relationships, the conversations, the random hallway moments — those don't get replicated in a product roadmap. They're the reason we still show up.</p>

<p>Also, seriously. More puppies at conferences. I will not be taking questions.</p>

<p>Big thanks to the entire team at Unleash for putting on a fantastic event and having me. It was great to be back.</p>

<hr />

<h2>📰 HR Tech News</h2>
<p><em>I read the press releases so you don't have to!</em></p>

<h3>iCIMS launches iCIMS Frontline AI</h3>
<p>iCIMS has been sitting on enterprise talent acquisition capabilities for years, but frontline hiring has always felt like an afterthought in a platform built for corporate recruiting. With iCIMS Frontline AI, they're finally pulling those capabilities out front and putting them on equal footing with the rest of the platform — which is smart, because the rest of the space has been moving in that direction for a while. High-volume, high-turnover hiring is a massive market and the vendors who figured that out early have been eating. Better late than never, and with the infrastructure iCIMS already has, they're well positioned to catch up fast.</p>

<h3>Workday introduces Sana — "Superintelligence for Work"</h3>
<p>Workday is calling their new AI orchestration layer Sana, and they are not being modest about it. "Superintelligence for Work" is a bold tagline, but I like it. This is Workday planting their flag on the AI agent landscape and signaling to every point solution in this newsletter that the big platform is coming for your use case. Whether Sana delivers on the superintelligence promise or becomes another feature quietly buried in the UI by Q3 is a different story.</p>

<h3>Joveo introduces AI Interviewer</h3>
<p>I got a preview of this one at Unleash this week, and it actually does what it says it does — which, on a conference show floor, is not something you can always take for granted. Built entirely in-house by their engineering team — not acquired, not white-labeled — the AI Interviewer is designed to handle the top of the funnel before it buries your recruiting team alive. The right problem, solved the right way.</p>

<h3>Findem acquires Glider AI</h3>
<p>Findem built their name on talent intelligence and sourcing — finding the right people before you even have an open req. Adding Glider AI's assessment and screening capabilities means they can now own more of the funnel, from "here's who you should hire" all the way to "here's proof they can do the job." Smart move. The vendors that survive the platform consolidation wave will be the ones that made themselves hard to rip out. Findem is clearly thinking about that.</p>

<hr />

<h2>💰 Funding</h2>
<ul>
  <li>Paraform raises $40M Series B to scale its recruiting platform.</li>
</ul>

<hr />

<h2>🔥 Hot Takes</h2>

<h3>Everyone's faking it on AI. That's a huge problem.</h3>
<p>Does it feel like everyone suddenly became an AI expert overnight? Scott Sanchez breaks down five types of AI "fakers" and lays out a practical maturity model for where people actually are versus where they claim to be. It's a good gut-check.</p>
<p>Relevant confession: I'm spending this weekend teaching myself Claude. So yes, I am currently a Stage 2 trying not to sound like a Stage 5. If you've ever nodded along in a meeting while someone talked about "agentic workflows" and had no idea what they meant — this one's for you.</p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>Mark Chaffey drops by to talk Archer</h3>
<p>No, not the show. The AI agent from hackajob that raised $1M ARR in just 90 days. He joins me on Totally Talent to talk about his hiring agent and what it can do for talent teams.</p>
    `,
  },
  {
    slug: 'saas-to-workops-phenom',
    date: 'March 13, 2026',
    title: 'From SaaS to WorkOps — Notes from IAMPHENOM in Philadelphia',
    tag: 'Events',
    excerpt: 'Phenom CEO Mahe Bayireddi wants to redefine what HR software even is.',
    body: `
<p>I spent this week in the City of Brotherly Love, Philadelphia at IAMPHENOM, where Phenom CEO Mahe Bayireddi made it clear the company wants to be seen as something very different from a traditional HR software vendor. His message was simple: traditional SaaS is the past of enterprise software and the new way forward is building applied AI platforms that just happen to be used in HR. Focus on AI capabilities first, application second.</p>

<p>The HR Tech industry is quietly rewriting its identity. What used to be ATS platforms, payroll engines, and recruitment marketing tools are now rebranding themselves as AI platforms. In reality, the core systems remain but the narrative and goal has changed.</p>

<p>The race isn't just to build software anymore; it's to become the intelligence layer that runs the workforce.</p>

<p>To explain the company's approach, Bayireddi used a Michelangelo analogy. Creating a masterpiece like the Sistine Chapel wasn't a single act of genius — it required many specialized crafts working together under a clear vision. Phenom sees HR transformation the same way, built on a three-layer foundation of Culture, Work Environment, and Strategy, with AI acting as the connective tissue across them.</p>

<p>Under the hood, that vision shows up in what Phenom calls the Architecture of Operational Intelligence. At the bottom is the Data Engine, feeding into an enterprise Ontology that maps how work, skills, roles, and culture connect inside an organization. Sitting above that is X AI, a shared intelligence layer designed to power multiple applications and agents, all coordinated by an Orchestration Engine that governs policies, compliance, and when humans need to step in.</p>

<p>If that sounds abstract, the practical side of it showed up in the growing lineup of AI agents Phenom is deploying across the talent lifecycle. There are agents for sourcing candidates, conducting voice-based screening calls, handling compliance checks, and nurturing applicants throughout the hiring process. On the employee side, tools like the Success Coach Agent guide new hires through onboarding, while a Chief of Staff Agent analyzes roles task by task and suggests where automation or reskilling might improve productivity.</p>

<p>Last year, when all these agents were announced, it seemed like an overload. Now that AI agents are all the rage, it shows just how smart the team at Phenom is and where work is quickly moving. As Bayireddi mentioned during the keynote:</p>

<blockquote><p>"Recruiter levels one and two might go, but recruiter level three becomes more valuable."</p></blockquote>

<p>AI agents will handle basic entry-level tasks, overseen by a senior recruiting team member who manages relationship-building. It reminds me of my first corporate job in public relations. I was an associate, fresh out of grad school, and eager to start my career. The problem? There was a lot of admin work that needed to be done first, and the senior team handled the real relationship-building. It was 2006, and my innovations had to wait until I made meeting binders and typed up notes from previous meetings. It was frustrating, but I understood. The point is that routine coordination work may disappear, but strategic relationship-building becomes even more important.</p>

<p>Another major theme at the conference was the rise of AI-driven hiring fraud. As generative AI makes it easier to fabricate credentials or script interview responses, vendors are racing to detect synthetic candidates. Phenom has been building out its capabilities to fight this and showcased several safeguards, including adaptive cognitive assessments, autonomous AI interviews that probe generic responses, and behavioral signals designed to flag suspicious activity before a hiring decision is made.</p>

<p>Strategically, Phenom appears to be placing two big bets. The first is healthcare, which was heavily represented in the customer stories at the conference. Healthcare organizations have urgent hiring needs and complex compliance requirements, making them a proving ground for fast-track AI recruiting workflows. Plus, healthcare is one of the only markets still hiring at a good pace.</p>

<p>The second is the public sector, which Phenom sees as a massive modernization opportunity. The company estimates an $8 billion U.S. market and up to $17 billion internationally, and it already holds FedRAMP authorization — an important credential for selling to government agencies. I'm skeptical about near-term U.S. investment given the current wave of federal cost-cutting, but if public-sector hiring budgets rebound, Phenom will be well positioned. The bigger opportunity may actually be international governments, particularly as the company expands deeper into Europe and India.</p>

<p>The broader message throughout the conference was that traditional SaaS may be nearing its limits. Bayireddi predicted that AI will compress margins and force vendors to rethink the old model of selling static software licenses. That doesn't mean humans disappear from the process — or as I like to think of it, "you can't teach a robot to love."</p>

<p>That may be the most important takeaway from the week. The future Phenom is describing isn't AI replacing HR, it's AI handling the operational heavy lifting so humans can focus on the parts of work that machines still don't understand very well. You still need a human if you want to have a soul in your hiring.</p>

<p>Overall, I was impressed with not only the new capabilities they've added, but how logical it was when laid out in a workflow. The voice screening agent alone is something that I think will take off across the space and competitors will soon be playing catch up. Big thanks to Peter Ramjug, Jonathan Dale, and the rest of the team at Phenom for a great event.</p>

<p><em>My tour continues at Unleash and Transform. If you are there, please say hi.</em></p>

<hr />

<h2>📰 HR Tech News</h2>
<p><em>I read the press releases so you don't have to!</em></p>

<h3>Oracle's potential mass layoff signals an AI trade-off</h3>
<p>What do you do when you've gone on a media spending spree and need cash? According to reports, Oracle is planning to lay off 20–30K employees out of their 160K staff as they "lean into AI." What they are really leaning into is data centers. Short-term pain for massive infrastructure growth. Watch for similar moves from the other tech giants as they all scramble for those data centers.</p>

<h3>The Adecco Group to scale agentic AI with unlimited Agentforce license</h3>
<p>The Adecco Group announced a major agreement with Salesforce to deploy an unlimited Agentforce license, signaling a major bet on agentic AI across its global operations. The deal will allow Adecco to rapidly scale AI agents that support recruiters, automate administrative tasks, and help screen candidates while working alongside human staff.</p>

<hr />

<h2>💰 Funding & Acquisitions</h2>
<ul>
  <li>HireVue acquires Hireguide to accelerate AI agentic hiring.</li>
  <li>Juicebox raises $80M Series B for its AI-powered recruiting platform.</li>
  <li>Orijin acquires Honest Jobs, connecting formerly incarcerated individuals with employment opportunities.</li>
  <li>Talvy raises $2M for video resumes.</li>
</ul>

<hr />

<h2>🗣️ HR Voices</h2>

<h3>Mark Knowlton on what recruiting needs to learn from cybersecurity</h3>
<p>Mark Knowlton has been a technical recruiter for decades, and he makes the case that companies need to assume zero trust in candidates. In his latest article, Mark argues that hiring is becoming a security function — a new reality of today's world.</p>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>What's Happening with the BLS Numbers?</h3>
<p>If you've been following The Wrap, you know how frustrated I am with the BLS report. First, they tell us not to trust it when they fired the messenger last summer, then they have multiple delays and drastic revisions months later. Tim Dineen joined me to dig through his numbers with Aspen Technology Labs and the Anthropic report on the impact of AI.</p>

<h3>Transforming Talent Strategies with AI and Microlearning</h3>
<p>I spoke with Lauren Tropeano, Chief People Officer at Docebo, about the evolving landscape of talent acquisition and development. We cover the challenges of hiring in a competitive market, the importance of a learning culture, and the shift toward mobile and microlearning for frontline workers.</p>
    `,
  },
  {
    slug: 'sci-fi-thriller',
    date: 'March 6, 2026',
    title: 'We Are Living in a Sci-Fi Thriller',
    tag: 'Opinion',
    excerpt: 'The stories we watched as warnings are starting to feel like the opening act.',
    body: `
<p>For decades, science fiction imagined a future where brilliant people built incredible technology meant to improve humanity, only to watch it get seized by greedy governments, militaries, or corporations who wanted to manipulate it for wealth and control. Those stories all followed a familiar arc — innovation begins with optimism, but gets corrupted by institutions while society slowly realizes the consequences before it's too late.</p>

<p>Back then, those plots felt dramatic and distant. They were cautionary tales wrapped in entertainment. Today, they feel a little too familiar.</p>

<p>Over the past year, a strange narrative has been unfolding around artificial intelligence. The technology that was introduced to the public as a productivity assistant — something that would help workers write, code, and analyze at lightning speed — is quickly becoming something much larger and more complicated. AI companies are building systems capable of astonishing feats of reasoning, automation, and pattern recognition. Governments are paying close attention. Militaries are too.</p>

<p>Recently, reports surfaced about internal tensions at OpenAI, with employees raising concerns about how advanced AI technologies might be used. Sure, it could write emails and summarize meeting notes, but it could also identify "threats" and "keep an eye on people" to help keep order. Those possibilities may sound extreme, but they are precisely the kinds of applications governments have historically pursued whenever transformative technology emerges.</p>

<p>At the same time, the economic shock of AI is beginning to ripple through the workforce. The narrative that AI would simply create "super workers" has run face-first into the reality that AI is cheap labor. A human worker has costly benefits and often wants to be appreciated and grow. It's much more cost-effective to have AI do customer support, coding assistance, marketing, research, and everything in between.</p>

<p>As companies struggle to hit growth targets and earnings reports, having lots of employees is suddenly a liability. Cutting staff and "leaning into AI" shows investors that you can keep things moving at a fraction of the cost.</p>

<p>None of this means artificial intelligence is inherently dangerous or destined to lead us into dystopia. But it does highlight something interesting.</p>

<p>Many of the scenarios unfolding today were imagined decades ago in science fiction films that tried to warn us about how technology evolves once it leaves the lab.</p>

<p>Take <em>WarGames</em> from 1983. In the film, a computer scientist develops the WOPR — an artificial intelligence system designed to simulate nuclear war strategies. Sounds like a good idea until a curious teenager accidentally hacks into the system. The military nearly allows the AI to trigger World War III because they trust the automated strategy engine more than their own judgment.</p>

<p>A couple of years later, <em>Real Genius</em> explored another familiar theme. A group of brilliant college students develop a powerful laser intended for scientific purposes. Their professor secretly hands the project over to the U.S. military, which plans to use it as a space-based assassination weapon. The students thought they were building something that could push the boundaries of science. Instead, their invention became a tool of warfare.</p>

<p>Then came <em>Terminator 2: Judgment Day</em>, perhaps the most famous AI warning story ever told. Scientists develop Skynet, an artificial intelligence designed to automate military defense systems. The logic is simple: remove human hesitation from national security decisions. But once activated, the system decides humans themselves are the threat.</p>

<p>What's striking about these movies isn't that they predicted the future perfectly. It's that they all share the same underlying pattern.</p>

<p>First, someone invents a powerful technology. Second, the technology is justified as necessary for efficiency. Third, control gradually shifts from the creators to larger institutions. And finally, society realizes the implications long after the systems are already in place.</p>

<p>The real danger in these stories was never the technology itself. It was how quietly the purpose of that technology changed.</p>

<p>That pattern feels increasingly relevant today. Artificial intelligence has the potential to transform everything from medicine to climate science to education. But it also raises profound questions about power, control, and responsibility. Who decides how these systems are used? Who benefits from the productivity gains? And what safeguards exist to prevent misuse?</p>

<p>The same algorithms that can diagnose disease earlier than any doctor can also analyze massive data sets about people's behavior. The same systems that can guide autonomous vehicles can also guide autonomous weapons. The same productivity tools that can help workers accomplish more in a day can also make companies decide they need fewer workers at all.</p>

<p>None of these developments, on their own, mean we are living in a dystopian future. But taken together, they resemble the opening act of many of the stories we once watched as warnings.</p>

<p>The good news is that science fiction also imagined hopeful futures where technology improved human life — medical breakthroughs that eradicated disease, clean energy that solved environmental crises, machines that eliminated dangerous labor and gave people more freedom to pursue creativity and discovery.</p>

<p>Those futures are still possible. Artificial intelligence could accelerate scientific discovery in ways we can barely imagine today. The same technology that threatens disruption could also unlock enormous benefits for humanity.</p>

<p>The difference between those futures doesn't lie in the technology itself. It lies in the choices we make about how to use it.</p>

<hr />

<h2>✈️ On Location!</h2>
<p>It's March, which means the start of Spring conferences! I'm off to Philadelphia next week for my first IAMPHENOM, followed by a two-week excursion to Las Vegas for both Unleash and Transform. I'll be checking out the latest news from the vendors and recording new episodes of the Totally Talent podcast.</p>
<p><em>Vendors → Reach out to get on my podcast schedule. Readers → Reach out to say hi!</em></p>

<hr />

<h2>📰 HR Tech News</h2>
<p><em>I read the press releases so you don't have to!</em></p>

<h3>iCIMS rebrands and releases iCIMS Coalesce</h3>
<p>iCIMS has gone through another rebrand and unveiled a new tagline — "powering exceptional hiring." They're packaging their enterprise capabilities as iCIMS Coalesce (defined as "come together to form one mass or whole"). It's a smart move bringing AI out front and showing just how flexible the platform is. I will miss the red bird Ike, though. He's a hot commodity on eBay.</p>

<h3>Pin expands AI sourcing and recruiting capabilities</h3>
<p>Pin.com has launched an expanded AI recruiting platform designed specifically to help founder-led and early-stage companies. This is a smart move — there's going to be an explosion of founder-led companies coming that will need to scale fast without the budget for enterprise hiring tools.</p>

<h3>Deputy launches U.S. payroll with Paycor</h3>
<p>Deputy is making a bigger push into the U.S. market with the launch of U.S. payroll in partnership with Paycor, aiming to streamline pay for shift-based businesses. By embedding payroll directly into its workforce management platform, Deputy says customers can cut processing time by up to 50%. It's another sign that frontline-focused vendors are racing to become the all-in-one system of record for scheduling, time tracking, and now payroll.</p>

<h3>The EEOC's latest DEI warning</h3>
<p>The U.S. EEOC, led by Chair Andrea Lucas, sent a letter to Fortune 500 companies reminding them that DEI programs cannot violate Title VII by discriminating based on race or gender. I'm going to call it out for what it is — another dog whistle for the GOP narrative that white people are being discriminated against. Combine that with her December video telling viewers "Are you a white male who has experienced discrimination at work based on your race or sex? You may have a claim to recover money" and you have a pretty clear picture of where this is going.</p>

<hr />

<h2>💰 Funding & Acquisitions</h2>
<ul>
  <li>Giggle raises funding to scale flexible staffing platform across Central and Eastern Europe.</li>
  <li>DHI Group acquires Point Solutions Group, an engineering and technology professional services firm focusing on defense contracting and government staffing.</li>
</ul>

<hr />

<h2>🎙️ Podcasts</h2>

<h3>The portable background check</h3>
<p>I checked in with Raj Ananthanpillai of Trua as he works to create a portable background check — like the TSA PreCheck he pioneered decades ago. A fascinating idea for a broken process.</p>
    `,
  },
]

export function getNewsletter(slug: string): Newsletter | undefined {
  return newsletters.find(n => n.slug === slug)
}

