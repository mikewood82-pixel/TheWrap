export interface Newsletter {
  slug: string
  date: string
  title: string
  tag: string
  excerpt: string
  body: string // HTML string
}

export const newsletters: Newsletter[] = [
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
<img src="/newsletters/april-18-2026-moviephone-moment/image4.png" alt="Upwork ChatGPT Integration" />
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
<img src="/newsletters/april-18-2026-moviephone-moment/image9.png" alt="Totally Talent podcast - Acadia Healthcare" />
<p>In this episode of Totally Talent (filmed at IAMPHENOM), I sat down for a quick discussion with Gareth Holdstock about how Acadia uses Phenom to build talent pipelines ahead of new facility openings, why speed to execution is the difference between a filled role and an empty one, and how leaning into a genuine sense of purpose — "we provide light in people's darkest moments" — has become their most effective recruiting tool. <a href="https://www.hr.com"><strong>Listen Now</strong></a></p>

<hr />

<h2>👉 Worth a Click</h2>
<p><em>Interesting stories outside of HR</em></p>

<h3>Burger King Is Hiring 60,000</h3>
<img src="/newsletters/april-18-2026-moviephone-moment/image10.png" alt="Burger King Hiring 60,000" />
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
<img src="/newsletters/april-11-2026/image7.png" alt="SmartRecruiters agentic platform" />
<p>SmartRecruiters, now an SAP company, rolled out a sweeping product vision this week centered on its AI hiring companion Winston — which is evolving from a recruiting assistant into a full orchestration layer across the entire hiring funnel. New capabilities include an agentic interviewer that handles first-round screening at scale, in-chat assessments to cut candidate drop-off, and a CRM that actually does something instead of just sitting there collecting dust. Early numbers are hard to ignore: a 75% reduction in time-to-decision and candidates recommended by Winston were twice as likely to make it to interview. They also debuted a fraud detection tool that flags suspicious applications using behavioral signals and device intelligence — a quiet acknowledgment that fake candidates are now a big enough problem to build a product around. <a href="https://www.globenewswire.com/news-release/2026/04/07/3269187/0/en/SmartRecruiters-Introduces-the-Future-of-Hiring-From-AI-Agents-to-Autonomous-Talent-Acquisition.html">Read More</a></p>

<h3>VirgilHR launches SkillPath LMS</h3>
<img src="/newsletters/april-11-2026/image5.png" alt="VirgilHR SkillPath LMS" />
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
<img src="/newsletters/april-11-2026/image10.png" alt="Quiet hiring on LinkedIn" />
<p>J.T. O'Donnell makes a point worth paying attention to this week — quiet hiring is accelerating, and most job seekers are still playing by the old rules. Recruiters are increasingly bypassing public postings altogether, searching LinkedIn privately for candidates who already look like the answer to their problem. If you're not visible, you're not in the running — and "visible" no longer means a polished profile collecting dust. It means showing up consistently, posting with intention, and demonstrating how you think before anyone ever asks. The hidden job market has always existed. It's just getting louder. <a href="https://www.linkedin.com/pulse/quiet-hiring-exploding-linkedin-most-job-seekers-j-t-o-donnell-qh6de/">Read More</a></p>

<hr />

<h2>🎙️ Podcasts</h2>
<p><em>Don't just read me, listen to me!</em></p>

<h3>Hiring Quality Over Quantity</h3>
<img src="/newsletters/april-11-2026/image8.png" alt="Totally Talent podcast with Joel Kirk" />
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
