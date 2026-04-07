export type ReviewHighlight = { text: string; role: string }

export const vendorHighlights: Record<string, {
  g2: ReviewHighlight[]
  glassdoor: ReviewHighlight[]
}> = {

  // ── HCM ──────────────────────────────────────────────────────────────────
  workday: {
    g2: [
      { text: "Workday's unified platform eliminated our need for three separate systems. The reporting is genuinely powerful once your team understands the configuration.", role: 'HR Director, Enterprise' },
      { text: "Implementation is lengthy and expensive, but the end result is worth it for companies above 1,000 employees. We'd make the same decision again.", role: 'VP of People, 2,200 employees' },
      { text: "The self-service capabilities have reduced HR ticket volume by 40%. Employees can actually find and update their own information.", role: 'HRIS Manager' },
    ],
    glassdoor: [
      { text: "Strong compensation and genuinely interesting technical challenges. Work-life balance can slip during major release cycles.", role: 'Software Engineer' },
      { text: "The HR org practices what it preaches — benefits are excellent, management is accessible, and the culture feedback loops actually work.", role: 'Senior People Partner' },
    ],
  },

  'sap-successfactors': {
    g2: [
      { text: "The global compliance coverage is unmatched. Operating in 40+ countries, SuccessFactors handles localization requirements no other vendor can match at scale.", role: 'Global HRIS Director' },
      { text: "Powerful but requires dedicated administrator expertise. Budget for a full-time SAP resource or the value erodes quickly.", role: 'VP HR Operations' },
      { text: "Reporting and analytics have improved significantly. The People Analytics module finally feels like a modern tool.", role: 'HR Technology Manager' },
    ],
    glassdoor: [
      { text: "Global enterprise offers incredible scale of exposure and learning. Large org means moving slower than you'd like on product decisions.", role: 'Principal Product Manager' },
      { text: "Competitive compensation, especially at senior levels. Bureaucracy is real but manageable if you learn how to navigate it.", role: 'Software Architect' },
    ],
  },

  'oracle-hcm-cloud': {
    g2: [
      { text: "Best suited for organizations already deep in the Oracle ecosystem. The integration with Oracle ERP is seamless; the standalone HR experience is harder to justify.", role: 'VP HR Technology, Enterprise' },
      { text: "Fusion HCM reporting is genuinely powerful once you invest in learning it. The Guided Learning module has improved adoption significantly.", role: 'HRIS Analyst' },
    ],
    glassdoor: [
      { text: "Scale and prestige of Oracle offset some of the bureaucracy. Strong compensation and real global mobility opportunities.", role: 'Software Engineer' },
      { text: "Large org with lots of opportunity if you're proactive about finding it. Innovation moves slower than at smaller vendors.", role: 'Product Manager' },
    ],
  },

  'ukg-pro': {
    g2: [
      { text: "The workforce scheduling tools are best-in-class for shift-based operations. Our healthcare clients are particularly well-served by acuity-based staffing features.", role: 'Operations Director, Healthcare' },
      { text: "Complex to configure but handles our multi-union, multi-state environment better than any other platform we evaluated.", role: 'VP HRIS, 5,000+ employees' },
      { text: "Once you're past implementation, the system runs reliably. Training investment upfront pays off significantly in year two.", role: 'HR Systems Manager' },
    ],
    glassdoor: [
      { text: "Strong product vision post-merger. The culture integration between Kronos and Ultimate Software employees is still in progress but improving.", role: 'Senior Product Manager' },
      { text: "Good compensation and solid benefits. Internal mobility is real if you're proactive about seeking it out.", role: 'Software Engineer' },
    ],
  },

  'ceridian-dayforce': {
    g2: [
      { text: "Single database architecture genuinely eliminates the sync errors we had with two-system setups. Dayforce Pay gets real-time payroll right.", role: 'Director of Payroll Operations' },
      { text: "The implementation timeline is aggressive compared to peers. Budget for dedicated internal resources or it will drag.", role: 'HR Technology Manager' },
    ],
    glassdoor: [
      { text: "Post-rebrand the culture is more focused on product quality. Strong vision and compensation is competitive.", role: 'Senior Engineer' },
      { text: "Good work-life balance compared to industry peers. Career growth paths could be clearer in some functions.", role: 'Customer Success Manager' },
    ],
  },

  paycom: {
    g2: [
      { text: "The employee self-service is the best I've used. Training employees to handle their own data takes two hours and it sticks — ticket volume dropped 60%.", role: 'HR Director, 500 employees' },
      { text: "Single database means no integration headaches. Running payroll, benefits, and performance in one system with zero data sync errors is underrated.", role: 'VP HR Technology' },
      { text: "The Beti self-service payroll feature is legitimately innovative — employees catching their own payroll errors before processing changed our audit workload.", role: 'Payroll Manager' },
    ],
    glassdoor: [
      { text: "Strong growth trajectory and comp that keeps pace. High performance culture — not for everyone but rewarding if you thrive in it.", role: 'Sales Representative' },
      { text: "The product quality is something you can be proud of. Engineering standards are high and the roadmap is ambitious.", role: 'Software Developer' },
    ],
  },

  'paychex-flex': {
    g2: [
      { text: "The HR library and compliance alert system is underrated — it saved us from two state law changes we would have missed otherwise.", role: 'HR Coordinator, 200 employees' },
      { text: "Works reliably for straightforward payroll needs. Complex configurations are best handled by working directly with a dedicated rep.", role: 'Controller' },
    ],
    glassdoor: [
      { text: "Stable company with strong benefits and a clear retirement plan. Certain roles can feel siloed from product innovation.", role: 'HR Services Manager' },
      { text: "Support teams do important work that doesn't always get visibility. Culture is improving under current leadership.", role: 'Payroll Specialist' },
    ],
  },

  'infor-hcm': {
    g2: [
      { text: "Built for manufacturing and distribution in ways that SAP and Workday aren't. Industry-specific workflows save considerable configuration time.", role: 'HRIS Director, Manufacturing' },
      { text: "The reporting tools require dedicated expertise but deliver serious analytical depth for complex multi-site operations.", role: 'HR Analytics Manager' },
    ],
    glassdoor: [
      { text: "Global company with real technical depth and interesting infrastructure challenges. Enterprise sales cycles can make progress feel slow.", role: 'Senior Developer' },
      { text: "Strong benefits and interesting technical challenges. Middle management quality varies significantly by team.", role: 'Solutions Architect' },
    ],
  },

  darwinbox: {
    g2: [
      { text: "The mobile-first approach is genuinely different from legacy HCM — our frontline employees actually use it daily without needing a desktop.", role: 'CHRO, 3,000 employees Asia-Pacific' },
      { text: "Rapid product iteration means features improve quickly. Some modules are still maturing compared to Western competitors.", role: 'HR Technology Lead' },
    ],
    glassdoor: [
      { text: "Entrepreneurial culture with strong growth trajectory in the APAC market. Fast-moving and rewarding for self-starters.", role: 'Product Manager' },
      { text: "High energy and strong mission alignment. Expect ambiguity — processes are still being built as the company scales.", role: 'Software Engineer' },
    ],
  },

  namely: {
    g2: [
      { text: "The right tool for mid-market companies that have outgrown Gusto but aren't ready for Workday. Hits the sweet spot at our size.", role: 'VP People, 350 employees' },
      { text: "Benefits administration and compliance reporting are the standout features. The ATS integration could be deeper.", role: 'HR Manager' },
    ],
    glassdoor: [
      { text: "Customer-focused culture with good product-market fit. Company has matured; current strategic direction feels stable.", role: 'Customer Success' },
      { text: "Competitive compensation and genuine focus on customer outcomes. Team size means you wear multiple hats.", role: 'Account Manager' },
    ],
  },

  // ── ATS ──────────────────────────────────────────────────────────────────
  greenhouse: {
    g2: [
      { text: "The structured hiring framework is a game changer. Our interview consistency scores improved measurably within a quarter of implementation.", role: 'Head of Talent, 400 employees' },
      { text: "Integrations are solid. LinkedIn, Calendly, and our background check vendor all connect without persistent headaches.", role: 'Senior Recruiter' },
      { text: "Scorecards keep the process honest. We've had to have fewer uncomfortable conversations because the data does the talking.", role: 'Hiring Manager, Engineering' },
    ],
    glassdoor: [
      { text: "Remote-friendly before it was the norm. Management genuinely trusts employees to do their jobs without micromanagement.", role: 'Sales Engineer' },
      { text: "Mission-driven team with strong technical culture. Decision-making can be slow, which is frustrating when you want to move fast.", role: 'Product Designer' },
    ],
  },

  lever: {
    g2: [
      { text: "The CRM layer on top of an ATS is the right idea — we've rebuilt candidate relationships that would have gone cold in a traditional ATS.", role: 'Director of Talent Acquisition' },
      { text: "Visual pipeline is clean and fast. The nurture campaign features are genuinely useful for roles we hire repeatedly.", role: 'Senior Technical Recruiter' },
      { text: "Analytics are solid for mid-market. If you need deep custom reporting, you'll hit the ceiling, but most teams won't.", role: 'Head of Recruiting' },
    ],
    glassdoor: [
      { text: "Strong product culture and smart colleagues. Post-Employ acquisition brought changes — team is adapting and trajectory looks positive.", role: 'Software Engineer' },
      { text: "Good benefits and flexible work environment. Leadership has been transparent about strategic changes which helps.", role: 'Account Executive' },
    ],
  },

  icims: {
    g2: [
      { text: "The integrations marketplace is the biggest differentiator — 700+ pre-built connectors means we haven't had to build a single custom integration.", role: 'HRIS Director, Enterprise' },
      { text: "Enterprise-grade compliance tools that I haven't seen matched at this level of depth, particularly for government contractors.", role: 'Compliance Manager' },
      { text: "The UI needs a refresh and can slow down high-volume recruiters. Power users work around it but it's a real friction point.", role: 'Talent Operations Lead' },
    ],
    glassdoor: [
      { text: "Solid mid-size company with good work-life balance. Product is genuinely useful and the team cares about customers.", role: 'Customer Success Manager' },
      { text: "Strong benefits and decent growth paths in technical roles. Sales-heavy culture can overshadow the product org at times.", role: 'Product Manager' },
    ],
  },

  ashby: {
    g2: [
      { text: "The analytics are genuinely built into the recruiting workflow, not bolted on. Pipeline health metrics are actionable, not just dashboards.", role: 'Head of Talent, 500 employees' },
      { text: "Fastest implementation we've experienced in an ATS. From contract to live in under three weeks for a 300-person company.", role: 'People Operations Manager' },
    ],
    glassdoor: [
      { text: "Small, focused team with genuine product conviction. Every person directly impacts what ships.", role: 'Software Engineer' },
      { text: "Strong engineering culture and ambitious roadmap. Early-stage energy — exciting but requires comfort with uncertainty.", role: 'Product Designer' },
    ],
  },

  smartrecruiters: {
    g2: [
      { text: "The marketplace of 700+ sourcing and assessment integrations is genuinely differentiated — we haven't had to build a custom connector yet.", role: 'Talent Operations Director' },
      { text: "Collaborative hiring features reduce friction getting hiring manager engagement. Pipeline visibility across the org is strong.", role: 'Senior Recruiter' },
    ],
    glassdoor: [
      { text: "Strong product culture and enterprise customer focus. Some internal processes still catching up with growth.", role: 'Account Executive' },
      { text: "Good compensation and benefits. The product and sales orgs have good alignment which isn't always the case.", role: 'Customer Success' },
    ],
  },

  workable: {
    g2: [
      { text: "Time-to-value is best in class. We were running job postings within 48 hours of signing. No other ATS comes close.", role: 'COO, 80 employees' },
      { text: "The AI candidate sourcing saves our small team hours every week. Not perfect but good enough to be genuinely useful day-to-day.", role: 'Recruiter, 150 employees' },
    ],
    glassdoor: [
      { text: "Mission-driven team with strong technical culture and genuinely remote-friendly policies.", role: 'Software Engineer' },
      { text: "Good benefits and interesting product challenges. International team creates diverse perspectives that improve the product.", role: 'Product Manager' },
    ],
  },

  jazzhr: {
    g2: [
      { text: "Hiring managers actually complete scorecards on time because the interface doesn't intimidate them. That's the real test.", role: 'HR Director, 90 employees' },
      { text: "Best value for a small business ATS. At this price point, no one else comes close for the feature set.", role: 'Business Owner' },
    ],
    glassdoor: [
      { text: "Acquired by Employ which brought stability and resources. Culture is adapting well to being part of a larger organization.", role: 'Software Engineer' },
      { text: "Focused, practical team building a product that genuinely helps small businesses hire.", role: 'Customer Success' },
    ],
  },

  bullhorn: {
    g2: [
      { text: "Purpose-built for staffing. The candidate relationship management and client portal features are more mature than anything a general ATS offers.", role: 'Agency Owner, 45 recruiters' },
      { text: "Deep integration with major job boards and VMS platforms is essential for agency operations. Bullhorn delivers here consistently.", role: 'VP Operations, Staffing' },
    ],
    glassdoor: [
      { text: "Strong product vision for the staffing market. Customer-focused culture that aligns incentives well with customer outcomes.", role: 'Product Manager' },
      { text: "Competitive pay and good benefits. Fast growth means organizational structure is still evolving in some areas.", role: 'Account Executive' },
    ],
  },

  'breezy-hr': {
    g2: [
      { text: "The visual pipeline makes candidate status immediately clear across our hiring team. Drag-and-drop works exactly as expected.", role: 'Talent Acquisition Manager' },
      { text: "Candidate experience features are genuinely thoughtful — automated communications don't feel robotic or generic.", role: 'HR Manager, 120 employees' },
    ],
    glassdoor: [
      { text: "Small, focused team with direct impact on the product. Agile and customer-responsive culture.", role: 'Software Engineer' },
      { text: "Great place for people who want ownership and impact. Resources are lean which requires genuine resourcefulness.", role: 'Customer Success' },
    ],
  },

  'oracle-taleo': {
    g2: [
      { text: "Enterprise-grade compliance and EEO reporting that handles our government contractor requirements fully and automatically.", role: 'Compliance Manager, Federal Contractor' },
      { text: "Deeply integrated with Oracle HCM — if you're on that stack, Taleo is the path of least resistance despite the age of the interface.", role: 'HRIS Director' },
    ],
    glassdoor: [
      { text: "Oracle's scale offers career breadth and stability. Innovation pace is slower than at standalone vendors.", role: 'Product Manager' },
      { text: "Strong compensation and benefits. Large company means navigating organizational layers to get things done.", role: 'Software Engineer' },
    ],
  },

  // ── HRIS ─────────────────────────────────────────────────────────────────
  bamboohr: {
    g2: [
      { text: "Best UI in the mid-market HRIS space by a significant margin. My team actually enjoys using it, which I can't say about any other HR software.", role: 'CHRO, 150 employees' },
      { text: "Reporting could go deeper, but for an SMB that doesn't need everything, this is exactly right. Time-to-value was under two weeks.", role: 'HR Manager, 80 employees' },
      { text: "The performance management module surprised me — it's cleaner than dedicated tools we evaluated at twice the price.", role: 'People Director' },
    ],
    glassdoor: [
      { text: "Genuinely lives its values. One of the few companies where the culture statements actually match day-to-day experience.", role: 'Customer Success Manager' },
      { text: "Good work-life balance and strong benefits. Limited upward mobility in some departments once you hit a certain level.", role: 'Software Developer' },
    ],
  },

  rippling: {
    g2: [
      { text: "Onboarding new hires used to take two days. Rippling got that down to under an hour — IT provisioning included. The automation is legitimately impressive.", role: 'People Ops Manager, 200–500 employees' },
      { text: "The breadth is the differentiator. HR, IT, and payroll in one place isn't a gimmick — the integration actually reduces errors significantly.", role: 'COO, 150 employees' },
      { text: "Customer support response times could be faster, but the product itself rarely gives us problems to complain about.", role: 'HR Generalist' },
    ],
    glassdoor: [
      { text: "High growth means fast-moving. Great if you want to advance quickly, genuinely challenging if you need stability and clear process.", role: 'Product Manager' },
      { text: "Excellent compensation and smart colleagues across the board. Expect long hours during launch cycles — they're not kidding about the pace.", role: 'Software Engineer, L4' },
    ],
  },

  gusto: {
    g2: [
      { text: "Switching from manual payroll processing to Gusto saved us 6 hours per payroll run. Setup took three days, not three months.", role: 'COO, 45 employees' },
      { text: "Benefits administration is seamless. Employees manage their own enrollment and the AI assistant handles most questions before they reach HR.", role: 'HR Coordinator' },
      { text: "The contractor payment feature is excellent. We pay people in 15 countries and haven't had a compliance issue since switching.", role: 'Finance Director' },
    ],
    glassdoor: [
      { text: "Care deeply about the product and the customers it serves. Great team to be part of, mission feels real, not performative.", role: 'People Partner' },
      { text: "Competitive salary and genuine growth opportunities. Some teams can feel siloed — cross-functional collaboration takes effort.", role: 'Software Engineer, Senior' },
    ],
  },

  zenefits: {
    g2: [
      { text: "Benefits administration is the core strength — the carrier connections are solid and open enrollment is genuinely simple for employees.", role: 'HR Manager, 180 employees' },
      { text: "Works best for companies under 200 employees. Above that, you start feeling the platform limitations.", role: 'Director of HR' },
    ],
    glassdoor: [
      { text: "Company has matured significantly since its early days. More stable and focused than its historical reputation suggests.", role: 'Software Engineer' },
      { text: "Good product-market fit for the SMB segment. Culture is improving and benefits are competitive.", role: 'Customer Success' },
    ],
  },

  personio: {
    g2: [
      { text: "European-first design means GDPR compliance and local labor law support is built in, not a workaround. Essential for our Germany and Spain operations.", role: 'HR Director, Europe' },
      { text: "Onboarding workflows saved us 3 hours per new hire and the approval flows are genuinely flexible across our team structures.", role: 'HR Manager, 250 employees' },
      { text: "Customer support quality has improved considerably. Response times are fast and the team is knowledgeable.", role: 'People Operations Lead' },
    ],
    glassdoor: [
      { text: "Strong European tech culture with genuine investment in employee growth. Stock options and shaping the product are big draws.", role: 'Engineering Manager' },
      { text: "International team with diverse perspectives. Some growing pains as the company scales rapidly.", role: 'Operations Analyst' },
    ],
  },

  hibob: {
    g2: [
      { text: "The best HRIS experience I've had in 12 years of HR. Modern UX, fast configuration, and employees actually use the self-service features.", role: 'Head of People, 400 employees' },
      { text: "Bob's club feature genuinely builds culture for remote teams — sounds gimmicky, works in practice. Adoption was immediate.", role: 'People Operations Manager' },
      { text: "The analytics and workforce planning tools have matured significantly. Closing the gap with more established platforms.", role: 'CHRO, 800 employees' },
    ],
    glassdoor: [
      { text: "Rapid growth with the culture mostly intact. Product moves fast and the team is energized by the mission.", role: 'Software Engineer' },
      { text: "Great diversity on the team and genuine inclusion efforts. Hypergrowth means some processes are still catching up.", role: 'Customer Success' },
    ],
  },

  factorial: {
    g2: [
      { text: "European-first design means GDPR compliance and local labor law support is built in natively for our Spain and UK operations.", role: 'HR Manager, 200 employees' },
      { text: "The time tracking and absence management modules are particularly well-built for our hybrid workforce.", role: 'People Operations Lead' },
    ],
    glassdoor: [
      { text: "Barcelona-based with strong international ambition. Energetic startup culture with genuine mission alignment.", role: 'Software Engineer' },
      { text: "Great compensation for the market and genuine equity upside. Growing fast with all the challenges that brings.", role: 'Product Manager' },
    ],
  },

  deel: {
    g2: [
      { text: "Hiring internationally used to require lawyers and months of entity setup. Deel made it a two-week process. It's a genuine unlock for distributed-first companies.", role: 'Head of Remote Operations' },
      { text: "Contractor payments in 150+ currencies with compliance built in. Essential infrastructure for any company hiring globally.", role: 'CFO, 120 employees' },
      { text: "The local benefits packages vary in quality by country — some regions are excellent, others feel thin. Worth auditing before committing.", role: 'Global HR Director' },
    ],
    glassdoor: [
      { text: "Hyper-growth company — move fast, break things, rebuild better. Rewarding if you're energized by pace; exhausting if you're not.", role: 'Operations Manager' },
      { text: "Compensation is strong and the team is globally distributed which makes for diverse perspectives. Middle management is still maturing.", role: 'Engineering Lead' },
    ],
  },

  humaans: {
    g2: [
      { text: "API-first approach is a genuine differentiator for tech companies that want to connect HR data to their own systems without middleware.", role: 'Head of Engineering, 200 employees' },
      { text: "Cleanest HRIS UI on the market by a significant margin. If your team cares about product quality, this shows.", role: 'People Operations Lead' },
    ],
    glassdoor: [
      { text: "Small team with outsized product impact. Direct line between individual work and customer outcomes.", role: 'Software Engineer' },
      { text: "High standards across the board. Compensation is competitive and the work is genuinely interesting.", role: 'Product Designer' },
    ],
  },

  'sage-hr': {
    g2: [
      { text: "Solid choice for companies already in the Sage ecosystem. Integration with Sage accounting is seamless and the data flows both ways.", role: 'Finance Director, 300 employees' },
      { text: "Time-off management and org chart features are well-executed. Reporting is straightforward and reliable for our needs.", role: 'HR Manager' },
    ],
    glassdoor: [
      { text: "Sage's backing provides stability and resources. Culture is professional and collaborative across the team.", role: 'Software Engineer' },
      { text: "Good benefits and career development pathways. Large company structure requires navigating to find the right opportunities.", role: 'Product Manager' },
    ],
  },

  // ── Payroll ───────────────────────────────────────────────────────────────
  adp: {
    g2: [
      { text: "Reliable above everything else. ADP has not missed a payroll in five years of use. For a company our size, that reliability is worth more than any flashy feature.", role: 'Payroll Manager, Enterprise' },
      { text: "The interface feels dated and support wait times are real, but the underlying compliance engine is rock-solid and the integrations ecosystem is unmatched.", role: 'Director of Total Rewards' },
      { text: "Tax filing automation alone justifies the cost for us. Multi-state compliance would be a full-time hire without it.", role: 'Controller, 800 employees' },
    ],
    glassdoor: [
      { text: "Stable, large company with great benefits. Career growth is possible but requires proactively building relationships across the org.", role: 'HR Consultant' },
      { text: "Good training programs and clear paths for advancement. Some legacy processes slow things down, but the company is modernizing.", role: 'Software Developer' },
    ],
  },

  paychex: {
    g2: [
      { text: "Works exactly as advertised. Straightforward payroll that runs without drama. For a business our size, that simplicity is the whole value proposition.", role: 'Controller, 80 employees' },
      { text: "Support quality varies significantly by account rep. Once you find a good one, stick with them — the variance is real.", role: 'HR Coordinator' },
      { text: "The HR library and compliance alerts are underrated. Saved us from two state law changes we would have missed otherwise.", role: 'Business Owner' },
    ],
    glassdoor: [
      { text: "Stable company with good benefits and retirement plan. Growth can be slow in more specialized roles.", role: 'HR Services Manager' },
      { text: "Training and development resources are solid. Sales culture dominates in some regions.", role: 'Payroll Specialist' },
    ],
  },

  paylocity: {
    g2: [
      { text: "The engagement features are a smart addition — pulse surveys and peer recognition built into payroll software changes the ROI conversation.", role: 'HR Manager, 300 employees' },
      { text: "Customer support response times are consistently fast. Issues get resolved same day far more often than with our previous provider.", role: 'Director of HR' },
      { text: "Implementation was smoother than expected. The data migration team was thorough and the go-live had zero payroll errors.", role: 'Payroll Specialist' },
    ],
    glassdoor: [
      { text: "Product-first culture with genuine investment in engineering talent. The work is technically interesting and the team moves fast.", role: 'Software Engineer' },
      { text: "Good benefits and collaborative culture. Leadership is accessible and communicates strategy clearly.", role: 'Product Manager' },
    ],
  },

  onpay: {
    g2: [
      { text: "Customer support is the differentiator. Actual humans pick up the phone and resolve issues same-day more often than not.", role: 'Business Owner, 30 employees' },
      { text: "Accuracy is perfect and the interface is the cleanest in the small business payroll category. No surprises after 3 years.", role: 'CFO, 50 employees' },
    ],
    glassdoor: [
      { text: "Customer-first culture that's reflected in how support teams are resourced and recognized.", role: 'Customer Support Lead' },
      { text: "Focused, well-run company with strong retention. Product quality is something the team is genuinely proud of.", role: 'Software Engineer' },
    ],
  },

  homebase: {
    g2: [
      { text: "For shift-based teams, the scheduling and time clock integration with payroll is the most seamless combination we've found.", role: 'Restaurant Owner, 40 employees' },
      { text: "The free tier is genuinely useful — unusual in HR tech. Easy way to validate before committing to a paid plan.", role: 'Retail Store Manager' },
    ],
    glassdoor: [
      { text: "Strong mission helping small businesses manage hourly workers. Team cares deeply about the customer outcome.", role: 'Product Manager' },
      { text: "Good culture and interesting challenges. Competitive compensation for the market.", role: 'Software Engineer' },
    ],
  },

  'quickbooks-payroll': {
    g2: [
      { text: "If you're already in QuickBooks, this is the most seamless payroll path available. No data re-entry, no sync errors, no reconciliation work.", role: 'Controller, 60 employees' },
      { text: "Tax filing automation handles multi-state requirements reliably. The automatic filings alone justify the cost for our size.", role: 'CFO, Small Business' },
    ],
    glassdoor: [
      { text: "Intuit's scale provides excellent benefits and career development. Large company but innovation continues at meaningful pace.", role: 'Software Engineer' },
      { text: "Strong comp, great benefits, real investment in engineering talent. Some legacy product constraints require patience.", role: 'Senior Engineer' },
    ],
  },

  'patriot-software': {
    g2: [
      { text: "Best cost-to-feature ratio in the small business payroll category. Nothing comes close at this price point.", role: 'Business Owner, 15 employees' },
      { text: "US-based support team is responsive and genuinely helpful. Issues get resolved by people who actually know the product.", role: 'Office Manager' },
    ],
    glassdoor: [
      { text: "Values-driven company that genuinely cares about the small businesses it serves. Strong culture throughout.", role: 'Customer Support' },
      { text: "Smaller team means real ownership of your work. Good benefits for a company of this size.", role: 'Software Developer' },
    ],
  },

  remote: {
    g2: [
      { text: "Employer of Record coverage in 170+ countries makes global hiring genuinely accessible for a company our size without a legal team.", role: 'Head of Remote Operations' },
      { text: "The compliance automation handles local employment law requirements that would otherwise require expensive local counsel in each market.", role: 'CFO, 80 employees' },
    ],
    glassdoor: [
      { text: "Fully distributed company that lives its product values. Flexibility and autonomy are genuine, not performative.", role: 'Engineering Manager' },
      { text: "Excellent benefits and strong equity program. Fast-growing company with evolving processes — requires adaptability.", role: 'Operations Lead' },
    ],
  },

  'papaya-global': {
    g2: [
      { text: "Automated payroll workflows for multi-country payroll reduced our processing time by 60% in the first quarter after implementation.", role: 'Global Payroll Director' },
      { text: "The workforce analytics dashboard gives CFO-level visibility into global labor costs that we simply didn't have before.", role: 'VP Finance' },
    ],
    glassdoor: [
      { text: "Dynamic company in a genuinely growing market. Strong compensation and mission-driven team.", role: 'Product Manager' },
      { text: "Fast-paced environment where priorities can shift quickly. Good for people who thrive in ambiguity.", role: 'Operations Analyst' },
    ],
  },

  wagepoint: {
    g2: [
      { text: "Purpose-built for Canada — provincial and federal tax compliance is accurate and automated without requiring our team to stay current on every change.", role: 'Controller, Canadian SMB' },
      { text: "The interface is notably clean compared to legacy payroll providers. Training new staff takes hours, not days.", role: 'Office Manager' },
    ],
    glassdoor: [
      { text: "Small, customer-focused team with a clear mission. Good benefits and genuine work-life balance.", role: 'Customer Success' },
      { text: "Tight-knit culture with real ownership of your work. Growing steadily with good fundamentals.", role: 'Software Developer' },
    ],
  },

  // ── Perf Mgmt ─────────────────────────────────────────────────────────────
  lattice: {
    g2: [
      { text: "Our managers actually use it without being nagged. That's the real test, and Lattice passes it. The interface doesn't intimidate people.", role: 'VP People, 600 employees' },
      { text: "The review cycle setup is the smoothest I've experienced — we went from spreadsheets to running cycles in under two weeks.", role: 'HR Business Partner' },
      { text: "OKR module needs polish, but the 1:1 features and continuous feedback tools are genuinely excellent.", role: 'Engineering Manager' },
    ],
    glassdoor: [
      { text: "High-performance culture without being cutthroat about it. Real investment in employee development, not just talk.", role: 'Software Engineer' },
      { text: "Leadership communicates well and transparently. You always know where the company is heading and why decisions were made.", role: 'Product Manager' },
    ],
  },

  '15five': {
    g2: [
      { text: "Weekly check-ins surfaced morale problems we wouldn't have caught for months. The cadence creates a feedback loop that actually changes how we manage.", role: 'HR Business Partner' },
      { text: "Simple enough that managers don't resist it, powerful enough that we get real signal from the data.", role: 'Director of People Operations' },
      { text: "OKR tracking is clean and the manager coaching prompts are a nice touch — practical, not generic.", role: 'VP Engineering' },
    ],
    glassdoor: [
      { text: "The team walks the talk on continuous feedback — which makes sense for a company that sells it. Manager quality is generally high.", role: 'Customer Success' },
      { text: "Good work-life balance and strong product roadmap vision. Compensation is competitive, equity could be better.", role: 'Software Engineer' },
    ],
  },

  'culture-amp': {
    g2: [
      { text: "The benchmarking data is the real differentiator. Knowing how your scores compare to industry peers is invaluable context that most tools don't offer.", role: 'People Analytics Lead' },
      { text: "Survey design is intelligent — the questions are validated and the fatigue warnings are genuinely useful for keeping response rates high.", role: 'Head of People' },
      { text: "The manager effectiveness reports have become a cornerstone of our L&D program. Managers take it seriously because the data is credible.", role: 'CHRO, 1,200 employees' },
    ],
    glassdoor: [
      { text: "Strong mission alignment across the team. You feel like the work matters, not just to the company but to the customers you're helping.", role: 'People Scientist' },
      { text: "Great culture (no surprise) and solid autonomy. Some internal processes haven't kept pace with company growth.", role: 'Product Designer' },
    ],
  },

  betterworks: {
    g2: [
      { text: "The continuous performance model has genuinely changed how our leadership team operates. Quarterly check-ins replaced annual reviews within two cycles.", role: 'CHRO, 1,500 employees' },
      { text: "OKR tracking that connects individual goals to company strategy in a way that makes sense to managers and ICs alike.", role: 'VP Strategy' },
    ],
    glassdoor: [
      { text: "Strong customer focus and genuine belief in the product. Real enterprise customers transforming through the platform.", role: 'Customer Success Manager' },
      { text: "Good benefits and smart colleagues. Enterprise sales cycles can make progress feel slower than you'd like.", role: 'Account Executive' },
    ],
  },

  leapsome: {
    g2: [
      { text: "The integration between performance reviews, surveys, and learning paths creates a people development loop we haven't seen in any other tool.", role: 'CHRO, 800 employees' },
      { text: "Manager effectiveness module is the standout — the feedback quality has measurably improved since implementation.", role: 'People Director' },
    ],
    glassdoor: [
      { text: "European HQ with global ambition. Strong mission alignment and genuine investment in employee development.", role: 'Software Engineer' },
      { text: "Smart, values-driven team. High standards and genuine care about the impact on customers.", role: 'Product Manager' },
    ],
  },

  engagedly: {
    g2: [
      { text: "The gamification elements drive adoption in a way traditional performance tools don't. Recognition features are used daily, not just during review cycles.", role: 'HR Director, 400 employees' },
      { text: "Goal-setting and OKR features are flexible enough to work across our different department structures and planning cadences.", role: 'VP Operations' },
    ],
    glassdoor: [
      { text: "Focused team with clear product direction. Customer-centric culture is evident in how decisions get made.", role: 'Product Manager' },
      { text: "Good growth opportunities for people who want to build in a scaling company.", role: 'Software Engineer' },
    ],
  },

  reflektive: {
    g2: [
      { text: "Real-time recognition and continuous feedback features changed the dynamic between our managers and their teams within a quarter.", role: 'People Operations Manager' },
      { text: "Integration with Slack and Teams means feedback happens where work happens — adoption was immediate and sustained.", role: 'VP People' },
    ],
    glassdoor: [
      { text: "Innovative product team with strong technical culture. Company navigating post-acquisition integration.", role: 'Software Engineer' },
      { text: "Good benefits and smart colleagues. Some organizational uncertainty during the transition period.", role: 'Product Designer' },
    ],
  },

  performyard: {
    g2: [
      { text: "Configures to our exact performance review process without forcing us to change our workflow to fit the software. Rare in this category.", role: 'Director of HR' },
      { text: "The simplest enterprise performance tool I've evaluated. Rollout was faster than any tool we've implemented.", role: 'HR Manager, 600 employees' },
    ],
    glassdoor: [
      { text: "Customer-focused culture with strong retention. Small team, big impact — everyone's work is visible.", role: 'Customer Success' },
      { text: "Good benefits and genuine ownership of your role. Product quality is something you can be proud of.", role: 'Software Engineer' },
    ],
  },

  trakstar: {
    g2: [
      { text: "Goal alignment features connect individual objectives to company priorities in a way that managers can actually explain to their teams.", role: 'HR Business Partner' },
      { text: "Implementation is straightforward and the support team responds with actual expertise, not just ticket routing.", role: 'HR Director' },
    ],
    glassdoor: [
      { text: "Stable company with consistent product investment. Team cares about doing right by customers.", role: 'Customer Success' },
      { text: "Good culture and work-life balance. Opportunities for growth if you're proactive about seeking them.", role: 'Software Developer' },
    ],
  },

  workboard: {
    g2: [
      { text: "Strategy execution visibility at the executive level is genuinely differentiated — the OKR health dashboards show real signal, not vanity metrics.", role: 'Chief of Staff, Fortune 500' },
      { text: "The facilitated OKR methodology built into the software is the key differentiator. It's a system, not just a tracker.", role: 'VP Strategy' },
    ],
    glassdoor: [
      { text: "Mission-driven team working with serious enterprise customers on complex strategy challenges.", role: 'Customer Success Manager' },
      { text: "Strong compensation and interesting customer problems. Fast-moving environment that rewards ownership.", role: 'Software Engineer' },
    ],
  },

  // ── L&D ──────────────────────────────────────────────────────────────────
  'cornerstone-ondemand': {
    g2: [
      { text: "Content library is the largest we evaluated — 50,000+ courses covering compliance, skills, and leadership. The curation tools help manage the volume.", role: 'L&D Director, 3,000 employees' },
      { text: "Skills graph and career pathing features are maturing into genuine differentiators for large enterprises mapping workforce capability gaps.", role: 'Chief Learning Officer' },
      { text: "Implementation complexity is real — budget 6+ months. The product is powerful enough to justify the investment for the right organization.", role: 'HR Technology Manager' },
    ],
    glassdoor: [
      { text: "Mission-driven company with strong focus on employee development. Benefits are good and leadership is accessible.", role: 'Customer Success Manager' },
      { text: "Product organization is strong and the work is technically interesting. Some legacy architecture creates constraints.", role: 'Senior Software Engineer' },
    ],
  },

  docebo: {
    g2: [
      { text: "AI-generated course content cut our development time in half. The quality is better than we expected from an automated process.", role: 'L&D Manager, Enterprise' },
      { text: "Customer education use case is where Docebo really shines — our client training completion rates improved dramatically after migration.", role: 'Director of Customer Education' },
    ],
    glassdoor: [
      { text: "Strong product culture and genuine investment in AI-first learning. Toronto and international offices have good energy.", role: 'Software Engineer' },
      { text: "Competitive compensation and real growth opportunities. Enterprise sales cycles require patience in some roles.", role: 'Account Executive' },
    ],
  },

  talentlms: {
    g2: [
      { text: "Fastest time-to-value in the LMS category. We were delivering training to 200 employees within a week of signing.", role: 'HR Director, 250 employees' },
      { text: "The branch feature for segmenting learner groups is particularly well-executed for multi-department rollouts.", role: 'L&D Specialist' },
    ],
    glassdoor: [
      { text: "Part of Epignosis — strong tech heritage with global reach. Customer-obsessed culture.", role: 'Software Engineer' },
      { text: "Good benefits and interesting product challenges. Tight team with real ownership of outcomes.", role: 'Product Manager' },
    ],
  },

  'absorb-lms': {
    g2: [
      { text: "The reporting is the strongest in the mid-market LMS space — compliance tracking and completion analytics are genuinely comprehensive.", role: 'L&D Director' },
      { text: "Learner experience has been redesigned to actually be enjoyable. Completion rates increased 30% after migration from our previous LMS.", role: 'Chief Learning Officer' },
    ],
    glassdoor: [
      { text: "Strong customer focus and product quality culture. Calgary headquarters with global remote team.", role: 'Software Engineer' },
      { text: "Good work-life balance and competitive compensation. Team genuinely cares about the product they're building.", role: 'Customer Success' },
    ],
  },

  'sap-litmos': {
    g2: [
      { text: "Pre-built content library with 2,000+ compliance courses reduces our content development burden significantly.", role: 'Compliance Training Manager' },
      { text: "The mobile app is well-executed — completion rates for on-the-go training are strong across our field teams.", role: 'L&D Manager, Field Operations' },
    ],
    glassdoor: [
      { text: "Part of SAP's portfolio means strong resources and stability. Product maintains its own identity within the larger org.", role: 'Product Manager' },
      { text: "Competitive benefits and global career mobility through SAP. Large company with navigational complexity.", role: 'Software Engineer' },
    ],
  },

  '360learning': {
    g2: [
      { text: "Collaborative course creation means subject matter experts actually contribute to L&D programs instead of just validating what the L&D team built.", role: 'CLO, 800 employees' },
      { text: "The reaction data from learners feeds directly back into course improvement workflows. Tight feedback loop that actually changes content.", role: 'L&D Specialist' },
    ],
    glassdoor: [
      { text: "Paris and New York teams with strong collaborative culture. Mission around collaborative learning is genuinely lived internally.", role: 'Software Engineer' },
      { text: "Fast-growing company with ambitious vision. Good compensation and equity. Some growing pains in operations.", role: 'Account Executive' },
    ],
  },

  'linkedin-learning': {
    g2: [
      { text: "Content breadth is unmatched — 22,000+ courses across every professional skill category. The curation tools help manage the volume for our teams.", role: 'L&D Director, 5,000 employees' },
      { text: "Integration with LinkedIn profiles means employees can showcase completed learning publicly, which drives intrinsic motivation in a way internal LMS tools can't.", role: 'CLO' },
    ],
    glassdoor: [
      { text: "Part of Microsoft now — benefits and compensation are excellent, stability is real. LinkedIn culture remains distinct.", role: 'Senior Engineer' },
      { text: "Strong mission and genuine investment in the product. Large org means significant coordination overhead.", role: 'Product Manager' },
    ],
  },

  degreed: {
    g2: [
      { text: "Skills intelligence layer connects learning to actual workforce capability mapping — the use case that goes well beyond just another LMS.", role: 'Head of Talent Development' },
      { text: "Integrates with 180+ content providers so learners access everything through one interface regardless of source.", role: 'L&D Technology Manager' },
    ],
    glassdoor: [
      { text: "Mission-driven team working on a genuinely complex problem in workforce development. Smart colleagues throughout.", role: 'Software Engineer' },
      { text: "Good compensation and benefits. Growth trajectory is strong after a period of strategic focus.", role: 'Product Manager' },
    ],
  },

  'seismic-learning': {
    g2: [
      { text: "Revenue team enablement is what this is built for — the sales coaching and just-in-time learning features are best-in-class.", role: 'VP Sales Enablement' },
      { text: "Integration with CRM means coaching recommendations surface at the right moment in the deal cycle, not after the fact.", role: 'Sales Enablement Manager' },
    ],
    glassdoor: [
      { text: "Strong sales culture with genuine investment in product quality. San Diego and global offices with good energy.", role: 'Account Executive' },
      { text: "Competitive compensation and growth trajectory. Fast-moving company that rewards results.", role: 'Software Engineer' },
    ],
  },

  'bridge-lms': {
    g2: [
      { text: "The combination of LMS and performance in one platform eliminates the disconnect between learning goals and development goals.", role: 'HR Director, 1,200 employees' },
      { text: "Manager visibility into team learning progress drives accountability without requiring HR to chase completions manually.", role: 'L&D Manager' },
    ],
    glassdoor: [
      { text: "Instructure's backing provides stability and resources. Team is focused on building a genuinely useful product.", role: 'Software Engineer' },
      { text: "Good work-life balance and collaborative culture. Interesting product challenges at the intersection of learning and performance.", role: 'Product Manager' },
    ],
  },

  // ── Analytics ─────────────────────────────────────────────────────────────
  visier: {
    g2: [
      { text: "The benchmarking data against 50,000+ organizations is the feature you can't replicate internally. Puts your workforce data in real context.", role: 'People Analytics Lead, Enterprise' },
      { text: "Pre-built analytics for every major HR domain means time-to-insight is measured in days, not quarters.", role: 'CHRO, 8,000 employees' },
    ],
    glassdoor: [
      { text: "Purpose-built analytics company with genuine expertise in the people data space. Team walks the talk on data-driven culture.", role: 'Data Scientist' },
      { text: "Strong compensation and interesting technical challenges. Vancouver headquarters with global remote team.", role: 'Software Engineer' },
    ],
  },

  'workday-prism': {
    g2: [
      { text: "Combining Workday transactional data with external sources in one analytics environment eliminates the spreadsheet layer entirely.", role: 'Head of People Analytics' },
      { text: "The data lineage tracking is critical for audit purposes — we can trace every workforce metric back to its source data.", role: 'HR Analytics Manager' },
    ],
    glassdoor: [
      { text: "Part of Workday means strong resources and mission alignment. Analytics team works on genuinely complex problems at scale.", role: 'Senior Engineer' },
      { text: "Excellent benefits and career development. The scale of Workday's data creates unique and interesting technical challenges.", role: 'Data Engineer' },
    ],
  },

  'sap-people-analytics': {
    g2: [
      { text: "Native to SuccessFactors means zero integration work for the 60% of our workforce data that already lives in SAP.", role: 'HRIS Director' },
      { text: "The story-based presentation layer makes workforce analytics accessible to business leaders who aren't data experts.", role: 'People Analytics Manager' },
    ],
    glassdoor: [
      { text: "SAP's scale and resources support a serious analytics product investment. The team has genuine domain expertise.", role: 'Software Architect' },
      { text: "Strong compensation and global mobility. Large organization requires navigating to find the right opportunities.", role: 'Product Manager' },
    ],
  },

  orgvue: {
    g2: [
      { text: "Org design scenario modeling is genuinely powerful for planning reorgs. We ran 12 scenarios before making a decision that affected 3,000 roles.", role: 'Chief People Officer' },
      { text: "The data visualization for headcount and cost analysis is cleaner than anything we built ourselves in BI tools.", role: 'Head of Workforce Planning' },
    ],
    glassdoor: [
      { text: "Specialist in a genuinely important problem space — org design is underserved by the major HCM vendors.", role: 'Consultant' },
      { text: "Smart, expert team working on complex consulting-adjacent challenges. Good compensation for the market.", role: 'Software Engineer' },
    ],
  },

  crunchr: {
    g2: [
      { text: "Workforce planning capabilities with scenario modeling changed how our finance and HR teams collaborate on headcount decisions.", role: 'VP Workforce Planning' },
      { text: "The benchmarking data gives external reference points that make internal metrics meaningful for board-level reporting.", role: 'CHRO' },
    ],
    glassdoor: [
      { text: "Netherlands-based with global customer base. Focused team with genuine expertise in people analytics.", role: 'Software Engineer' },
      { text: "Startup energy with real enterprise customers. Good opportunity for people who want to build and have direct influence.", role: 'Product Manager' },
    ],
  },

  peakon: {
    g2: [
      { text: "Continuous listening model generates weekly signal rather than annual noise. We identified retention risks months earlier than our previous approach.", role: 'Head of People Insights' },
      { text: "The scientific methodology behind the survey design is evident in the quality of insights — not just pretty charts over noisy data.", role: 'People Analytics Director' },
    ],
    glassdoor: [
      { text: "Part of Workday now — stability and resources improved. Product continues to evolve with strong vision intact.", role: 'Software Engineer' },
      { text: "Good mission and team quality. Integration into Workday creates both opportunities and some constraints.", role: 'Product Manager' },
    ],
  },

  perceptyx: {
    g2: [
      { text: "Listening program depth is unmatched at enterprise scale — we run six distinct survey programs on one platform without degrading signal quality.", role: 'Head of Employee Experience' },
      { text: "The manager action planning tools convert survey results into actual behavior change, which is where most listening platforms fall short.", role: 'CHRO, 20,000 employees' },
    ],
    glassdoor: [
      { text: "Customer-focused culture with genuine investment in the science of employee listening. Expert team throughout.", role: 'People Scientist' },
      { text: "Good benefits and interesting work at the intersection of I/O psychology and enterprise software.", role: 'Software Engineer' },
    ],
  },

  'qualtrics-employeexm': {
    g2: [
      { text: "The text analytics are genuinely industry-leading — open-ended responses get categorized and surfaced in ways that make them actionable, not just readable.", role: 'VP Employee Experience' },
      { text: "Running employee, customer, and brand experience on one platform simplifies our analytics stack and enables correlation analysis.", role: 'Chief Experience Officer' },
    ],
    glassdoor: [
      { text: "Strong mission and product quality culture. SAP acquisition brought changes but the core team and culture are strong.", role: 'Product Designer' },
      { text: "Competitive compensation and good benefits. Provo and global offices with collaborative, mission-driven culture.", role: 'Software Engineer' },
    ],
  },

  medallia: {
    g2: [
      { text: "Signal analytics across customer and employee data in one platform enables correlation analysis that our previous point solutions couldn't support.", role: 'Chief Experience Officer' },
      { text: "The API-first approach means integration with operational systems is genuinely achievable, not just a slide in the sales deck.", role: 'VP Analytics' },
    ],
    glassdoor: [
      { text: "Strong enterprise customer roster and interesting technical challenges at scale. Mission is compelling.", role: 'Software Engineer' },
      { text: "Good benefits and growth opportunities. Post-IPO company navigating scale with evolving culture.", role: 'Account Executive' },
    ],
  },

  'revelio-labs': {
    g2: [
      { text: "Public labor market data enriched with their proprietary methodology gives us benchmarking capabilities that would cost 10x from traditional research firms.", role: 'Head of Talent Strategy' },
      { text: "Workforce intelligence for competitive analysis changed how our talent strategy team evaluates competitor moves in the market.", role: 'VP People Analytics' },
    ],
    glassdoor: [
      { text: "Data science-forward company solving real enterprise problems. Small team with direct access to leadership.", role: 'Data Scientist' },
      { text: "Interesting research challenges and genuine product impact. Good compensation for the stage.", role: 'Software Engineer' },
    ],
  },
}
