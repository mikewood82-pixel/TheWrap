export type ReviewHighlight = { text: string; role: string }

export const vendorHighlights: Record<string, {
  g2: ReviewHighlight[]
  glassdoor: ReviewHighlight[]
  painPoints: ReviewHighlight[]
  gainPoints: ReviewHighlight[]
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
    painPoints: [
      { text: "Implementation took 18 months and cost twice what we budgeted. The professional services fees are a significant hidden cost not reflected in the software price.", role: 'VP of HR, 2,400 employees' },
      { text: "Customizations are expensive and slow. Every configuration change requires a consultant and the change management window is unpredictable.", role: 'HRIS Manager' },
    ],
    gainPoints: [
      { text: "Having payroll, benefits, and recruiting in one system eliminated the data reconciliation work that used to consume two days every pay cycle.", role: 'Director of HR Operations' },
      { text: "The reporting flexibility is unmatched. We built 40 custom dashboards that our CHRO uses weekly — something impossible in our previous system.", role: 'People Analytics Lead' },
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
    painPoints: [
      { text: "The UI still feels like it was designed in 2010. Navigating between modules involves too many clicks and our employees frequently call HR because they can't find basic self-service features.", role: 'HR Technology Manager, 6,000 employees' },
      { text: "Support tickets get routed through multiple tiers before reaching someone who can actually resolve the issue. Average resolution for a configuration change takes three weeks.", role: 'Global HRIS Director' },
    ],
    gainPoints: [
      { text: "Global compliance across 40 countries is handled automatically. We haven't had a localization penalty since switching, and that alone justified the cost.", role: 'VP HR Operations, Multinational' },
      { text: "The People Analytics module now generates workforce forecasts that finance actually uses in their planning cycle. Closes a gap we'd had for years.", role: 'HR Technology Manager' },
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
    painPoints: [
      { text: "The standalone HR experience requires significant configuration effort to feel modern. If you're not on Oracle ERP, the integration value disappears and you're left with a dated interface.", role: 'VP HR Technology, Enterprise' },
      { text: "Fusion's reporting requires deep technical training — we needed six months before our team could write meaningful custom reports without relying on consultants.", role: 'HRIS Analyst' },
    ],
    gainPoints: [
      { text: "The Guided Learning overlay reduced our system training time by 50%. New employees can navigate core workflows without reading documentation.", role: 'HRIS Analyst' },
      { text: "Being on the same Oracle stack across ERP, finance, and HR means zero reconciliation effort. Our audit prep time dropped from two weeks to two days.", role: 'VP HR Technology, Enterprise' },
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
    painPoints: [
      { text: "Configuration for multi-union environments is powerful but complex. We spent four months just on the accrual rules before go-live.", role: 'VP HRIS, 5,000+ employees' },
      { text: "Training end users takes significant time. The depth of the system that makes it powerful for admins makes it overwhelming for managers who just want to approve a time-off request.", role: 'HR Systems Manager' },
    ],
    gainPoints: [
      { text: "Acuity-based scheduling for our nursing staff reduced overtime spend by 12% in the first six months. No other platform we evaluated handled that use case.", role: 'Operations Director, Healthcare' },
      { text: "The compliance automation for our multi-state operation handles 23 different sets of overtime rules flawlessly. What used to require weekly manual review runs automatically.", role: 'HR Systems Manager' },
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
    painPoints: [
      { text: "Implementation timeline is aggressive and the project plan doesn't leave room for data quality issues. We had to push go-live by six weeks because payroll data cleanup wasn't factored in.", role: 'HR Technology Manager' },
      { text: "The mobile app lags behind the desktop experience — several manager workflows aren't available on mobile, which creates friction for our field supervisors.", role: 'Director of Payroll Operations' },
    ],
    gainPoints: [
      { text: "Real-time payroll means pay corrections process the same day instead of waiting for the next cycle. That alone improved employee trust in HR significantly.", role: 'Director of Payroll Operations' },
      { text: "Single-database architecture means benefits changes sync to payroll instantly. We eliminated an entire reconciliation process that used to take our team eight hours per pay period.", role: 'HR Technology Manager' },
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
    painPoints: [
      { text: "Pricing escalates quickly once you move beyond the core payroll module. By the time we added benefits administration and the time tracking module, the annual cost was triple the initial quote.", role: 'HR Director, 500 employees' },
      { text: "Customer support wait times have degraded as the company has grown. Simple questions that used to get answered same-day now take two to three business days.", role: 'Payroll Manager' },
    ],
    gainPoints: [
      { text: "Beti caught 47 payroll errors in our first three months that would have required corrections. Employees reviewing their own data before processing has essentially eliminated our error rate.", role: 'Payroll Manager' },
      { text: "The employee self-service portal genuinely works. Ticket volume to HR dropped 60% in the first quarter and hasn't crept back up.", role: 'HR Director, 500 employees' },
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
    painPoints: [
      { text: "The interface hasn't been meaningfully updated in years. Employees regularly complain about how many steps it takes to do something as basic as updating their direct deposit.", role: 'HR Coordinator, 200 employees' },
      { text: "Support quality is inconsistent. When you get a knowledgeable rep it's great, but turnaround times are unpredictable and complex issues can sit for a week.", role: 'Controller' },
    ],
    gainPoints: [
      { text: "The compliance alert system notified us about a state minimum wage change 45 days before it took effect. We updated our rates without any scramble.", role: 'HR Coordinator, 200 employees' },
      { text: "Having a dedicated account rep means someone actually knows our account history. When I call, I don't have to re-explain our setup from scratch every time.", role: 'Controller' },
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
    painPoints: [
      { text: "The reporting toolset requires a dedicated administrator with SQL knowledge to get beyond surface-level reports. For mid-market companies without that resource, you're limited to pre-built dashboards.", role: 'HRIS Director, Manufacturing' },
      { text: "Implementation partners for Infor are fewer than for SAP or Workday, and quality varies. We went through two partners before finding one that understood our manufacturing workflows.", role: 'HR Analytics Manager' },
    ],
    gainPoints: [
      { text: "Industry-specific configurations for manufacturing — shift differentials, union rules, multi-plant scheduling — came pre-built. We estimated saving 200 hours of custom configuration work.", role: 'HRIS Director, Manufacturing' },
      { text: "Multi-site workforce planning finally works the way our operations team thinks. Headcount variance reports by plant and shift type are now automated weekly.", role: 'HR Analytics Manager' },
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
    painPoints: [
      { text: "Western enterprise integrations are limited. Connecting to our global benefits providers and background check vendors required custom API work that wasn't in the original scope.", role: 'HR Technology Lead' },
      { text: "Some modules feel less polished compared to the core HCM experience — the performance module in particular needed several workarounds to fit our review process.", role: 'CHRO, 3,000 employees Asia-Pacific' },
    ],
    gainPoints: [
      { text: "Frontline employee adoption rate is above 85% without any training mandate. The mobile-first design means our factory floor workers actually use the app daily for scheduling and attendance.", role: 'CHRO, 3,000 employees Asia-Pacific' },
      { text: "Payroll localization for India, Indonesia, and Philippines was handled natively. What would have taken six months of configuration in our previous system was live in eight weeks.", role: 'HR Technology Lead' },
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
    painPoints: [
      { text: "The ATS integration is shallow — candidate data doesn't flow into HRIS automatically and we manually re-enter offer details for every hire. For 200 hires a year, that's a real burden.", role: 'HR Manager' },
      { text: "Payroll module limitations start showing above 300 employees. We had to supplement with a third-party tool for off-cycle payments which defeats the purpose of an all-in-one system.", role: 'VP People, 350 employees' },
    ],
    gainPoints: [
      { text: "Benefits administration and open enrollment is the strongest feature in the platform. Carrier connections work reliably and employees complete enrollment without calling HR.", role: 'HR Manager' },
      { text: "Compliance reporting for ACA and EEOC filings generates automatically with zero manual preparation. That used to consume a week of my time twice a year.", role: 'VP People, 350 employees' },
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
    painPoints: [
      { text: "Pricing is steep for mid-market companies and scales aggressively with headcount. By the time we added the CRM module and advanced analytics, we were paying more than our HRIS.", role: 'Head of Talent, 400 employees' },
      { text: "HRIS integrations require technical setup that isn't well-documented. Our Workday sync took two months to configure correctly and still requires manual reconciliation for edge cases.", role: 'Senior Recruiter' },
    ],
    gainPoints: [
      { text: "Structured scorecards eliminated 'gut feel' feedback from our debrief meetings. Interview-to-offer conversion improved by 22% in the first year because we were making better decisions.", role: 'Head of Talent, 400 employees' },
      { text: "Hiring manager response rates on interview feedback went from 60% to 95% after we moved to Greenhouse. The mobile scorecard experience is just that much easier to complete.", role: 'Senior Recruiter' },
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
    painPoints: [
      { text: "The CRM candidate engagement features are strong conceptually but require consistent recruiter discipline to maintain. If your team isn't rigorous about data entry, the pipeline data degrades fast.", role: 'Director of Talent Acquisition' },
      { text: "Custom reporting hits a ceiling quickly. We needed to export to Excel for any analysis that went beyond the built-in funnel metrics.", role: 'Head of Recruiting' },
    ],
    gainPoints: [
      { text: "Nurture campaigns for engineering roles have rebuilt a passive candidate pipeline we had let go cold. We made three hires last quarter from candidates who had been in nurture for over a year.", role: 'Director of Talent Acquisition' },
      { text: "The visual pipeline makes pipeline reviews with hiring managers genuinely productive. I spend 20 minutes in the meeting instead of 45 because everyone can see status at a glance.", role: 'Senior Technical Recruiter' },
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
    painPoints: [
      { text: "The UI feels dated compared to newer ATS competitors. High-volume recruiters working 80+ requisitions find the navigation inefficient and we've had several request a different tool.", role: 'Talent Operations Lead' },
      { text: "Customizing offer letter workflows took longer than expected — the template engine has quirks that required support involvement for anything beyond basic variable substitution.", role: 'HRIS Director, Enterprise' },
    ],
    gainPoints: [
      { text: "The integrations marketplace has saved us from building every custom connector from scratch. We connected our assessment vendor, video interviewing tool, and background check provider in one afternoon.", role: 'HRIS Director, Enterprise' },
      { text: "EEO and OFCCP compliance reporting is completely automated. Our legal team used to spend a week preparing government contractor filings — it now takes two hours to review the auto-generated report.", role: 'Compliance Manager' },
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
    painPoints: [
      { text: "The product is lean, which means some enterprise features like advanced approval workflows and custom permission levels are missing. We hit those gaps at 400 employees.", role: 'Head of Talent, 500 employees' },
      { text: "Reporting customization is limited. The built-in analytics are good for core funnel metrics but anything requiring custom dimensions requires a data export to another tool.", role: 'People Operations Manager' },
    ],
    gainPoints: [
      { text: "We were live in 17 days from contract signature. Other ATS vendors we'd evaluated quoted 8 to 12 weeks for implementation — that timeline alone justified the switch.", role: 'People Operations Manager' },
      { text: "The built-in analytics surface pipeline health daily without any setup. I can see time-in-stage, offer acceptance rates, and interviewer consistency scores from the dashboard without running a single report.", role: 'Head of Talent, 500 employees' },
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
    painPoints: [
      { text: "The onboarding workflow integration with HRIS is not seamless. After making a hire, we still manually re-enter candidate data into BambooHR — a frustrating gap for an 'enterprise' platform.", role: 'Talent Operations Director' },
      { text: "Account management responsiveness drops noticeably after the contract is signed. During the sales cycle we had weekly calls; post-signature it took three days to get a response to a basic question.", role: 'Senior Recruiter' },
    ],
    gainPoints: [
      { text: "The sourcing marketplace integrations mean we post to 200+ job boards in one click. Our applicant volume increased 40% without adding any sourcing budget.", role: 'Talent Operations Director' },
      { text: "Collaborative hiring features genuinely changed hiring manager engagement. Panel scorecards and Slack notifications mean debriefs happen within 24 hours instead of a week later.", role: 'Senior Recruiter' },
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
    painPoints: [
      { text: "Reporting is limited for growing teams. Once you're running more than 20 active roles, the built-in pipeline metrics don't give enough granularity and you're exporting to spreadsheets.", role: 'Recruiter, 150 employees' },
      { text: "The AI sourcing suggestions are hit or miss. It surfaces candidates that don't match the role requirements about 30% of the time, which means more time screening than expected.", role: 'COO, 80 employees' },
    ],
    gainPoints: [
      { text: "We posted our first job listing within two hours of signing up. The setup process is genuinely frictionless compared to the three-month implementations we'd seen from other vendors.", role: 'COO, 80 employees' },
      { text: "Candidate communication templates are professional and customizable. Our candidate satisfaction scores improved after switching — the automated touchpoints actually feel personal.", role: 'Recruiter, 150 employees' },
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
    painPoints: [
      { text: "The platform starts showing its limitations around 100 employees. Advanced workflows, multi-office configurations, and sophisticated reporting require workarounds that eat up admin time.", role: 'HR Director, 90 employees' },
      { text: "HRIS integration options are narrow. We had to use Zapier to connect JazzHR to our onboarding system, which introduced latency and occasional sync failures.", role: 'Business Owner' },
    ],
    gainPoints: [
      { text: "The price-to-feature ratio is unmatched in this category. We get structured interviews, scorecards, and automated candidate communications for less than a single mid-market competitor's monthly minimum.", role: 'Business Owner' },
      { text: "Hiring manager adoption was immediate — the interface is clean enough that they didn't need training. That's the first time I've said that about any HR software in 10 years.", role: 'HR Director, 90 employees' },
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
    painPoints: [
      { text: "The reporting on temp-to-perm conversion rates and fill time by client requires exporting to Excel — the built-in analytics don't support the agency-specific metrics we need to present to clients.", role: 'Agency Owner, 45 recruiters' },
      { text: "Implementation and onboarding support quality has declined as the company has grown. Our go-live had data migration issues that took three weeks to resolve after launch.", role: 'VP Operations, Staffing' },
    ],
    gainPoints: [
      { text: "The VMS integration handles Fieldglass and Beeline connections natively. What used to require manual status updates across five portals now syncs automatically, saving each recruiter about 90 minutes per day.", role: 'VP Operations, Staffing' },
      { text: "Client portal visibility has changed our relationship with key accounts. Clients can see pipeline in real time and trust has increased measurably — we've expanded two contracts because of it.", role: 'Agency Owner, 45 recruiters' },
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
    painPoints: [
      { text: "The analytics dashboard doesn't support custom date ranges for pipeline reports. We're stuck with weekly/monthly presets, which doesn't align with how we track sprint-based hiring goals.", role: 'Talent Acquisition Manager' },
      { text: "Mobile experience for candidates needs work — the application form on mobile has formatting issues that we believe are costing us applicants.", role: 'HR Manager, 120 employees' },
    ],
    gainPoints: [
      { text: "Candidate experience automation is best-in-class for our budget. Automated stage updates and rejection emails are personalized enough that candidates actually respond positively to them.", role: 'HR Manager, 120 employees' },
      { text: "The Kanban view for pipeline management is the fastest way to get a full-team picture of hiring status. Our weekly standups went from 45 minutes to 15 minutes after we started using the board view.", role: 'Talent Acquisition Manager' },
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
    painPoints: [
      { text: "The interface hasn't materially changed in years and it shows. Candidates regularly drop off the application process on mobile — the application form is not optimized for modern devices.", role: 'HRIS Director' },
      { text: "As an Oracle product, roadmap investment is unpredictable. Features we were promised during the sales cycle took 18 months to appear in a release.", role: 'Compliance Manager, Federal Contractor' },
    ],
    gainPoints: [
      { text: "OFCCP compliance and disposition tracking is the most thorough I've seen. We passed an audit with zero findings after switching, for the first time in five years.", role: 'Compliance Manager, Federal Contractor' },
      { text: "Integration with Oracle HCM means new hires move from offer to onboarding with zero manual data transfer. Our HRIS team saves about 15 minutes per hire across 400 annual hires.", role: 'HRIS Director' },
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
    painPoints: [
      { text: "Payroll doesn't handle off-cycle payments well. Running a supplemental bonus outside the regular schedule requires a call to support and creates reconciliation headaches.", role: 'CHRO, 150 employees' },
      { text: "The ATS integration is shallow. Candidate data from Greenhouse requires manual mapping and we lose custom field data every time.", role: 'HR Manager, 80 employees' },
    ],
    gainPoints: [
      { text: "The UI is the best in this category — employees actually enjoy using it. Our self-service adoption rate is 94% and we haven't run a training session in two years.", role: 'CHRO, 150 employees' },
      { text: "Performance review cycles that used to require a project manager now run autonomously. The automation handles reminder cadences, routing, and calibration workflows without any manual intervention.", role: 'People Director' },
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
    painPoints: [
      { text: "Support response time degrades during high-volume periods. We had a payroll question on a Friday before a holiday and couldn't get a response until Tuesday. That's unacceptable for payroll software.", role: 'HR Generalist' },
      { text: "Pricing gets complex as you add modules. By the time we added global payroll, IT management, and the spend management module, it was twice our initial budget with fees that weren't disclosed upfront.", role: 'COO, 150 employees' },
    ],
    gainPoints: [
      { text: "New hire onboarding went from a two-day process to 45 minutes. IT provisioning, payroll enrollment, and benefits setup happen simultaneously the moment an offer is accepted.", role: 'People Ops Manager, 200–500 employees' },
      { text: "Combining HR and IT device management in one platform eliminated an entire category of error. We no longer have active accounts for departed employees — everything deprovisioned in 30 seconds.", role: 'COO, 150 employees' },
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
    painPoints: [
      { text: "Customer support is chat-only for lower-tier plans. When we had a payroll error on a Thursday night before payday, there was no way to reach a human and the delay cost us hours of stress.", role: 'COO, 45 employees' },
      { text: "The HR features beyond payroll feel secondary. Time-off tracking and org chart tools work fine, but they lack the depth we needed as we grew past 80 employees.", role: 'HR Coordinator' },
    ],
    gainPoints: [
      { text: "Setup took three days and first payroll ran perfectly. After years of manual spreadsheet payroll, the time savings in the first month alone paid for a full year of the subscription.", role: 'COO, 45 employees' },
      { text: "International contractor payments in 15 currencies with zero compliance incidents. The tax form automation at year-end eliminated what used to be a two-week project.", role: 'Finance Director' },
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
    painPoints: [
      { text: "The platform shows its ceiling around 200 employees. Approval workflows can't be customized beyond basic tiers and the payroll module doesn't handle multi-state complexity.", role: 'Director of HR' },
      { text: "Support quality has declined noticeably over the past year. What used to be responsive phone support is now a ticket queue with 48-hour response windows.", role: 'HR Manager, 180 employees' },
    ],
    gainPoints: [
      { text: "Open enrollment completion rate went from 71% to 96% in the first year. The employee interface for benefits selection is genuinely the simplest I've seen.", role: 'HR Manager, 180 employees' },
      { text: "Benefits administration accuracy improved dramatically. Carrier feeds work and we haven't had a coverage discrepancy since switching — something that plagued us quarterly under our previous system.", role: 'Director of HR' },
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
    painPoints: [
      { text: "Payroll support for the UK and Germany is solid, but expanding to other European countries revealed gaps — our Portugal payroll required a local provider integration that took three months to configure.", role: 'HR Director, Europe' },
      { text: "The analytics module is basic compared to dedicated people analytics tools. We can pull standard headcount reports but anything involving attrition prediction requires exporting data.", role: 'HR Manager, 250 employees' },
    ],
    gainPoints: [
      { text: "GDPR compliance is genuinely built in, not a checkbox. Data residency, consent management, and employee data access controls work out of the box without any custom configuration.", role: 'HR Director, Europe' },
      { text: "Approval workflow flexibility is the best we've seen. Our German co-determination workflows required a multi-level approval chain that Personio configured correctly in under a week.", role: 'People Operations Lead' },
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
    painPoints: [
      { text: "Custom fields have limits that constrain our HR data model. We track nuanced job family and level data that doesn't fit Bob's field types and we've had to create workarounds that are fragile.", role: 'CHRO, 800 employees' },
      { text: "Payroll integration with our UK provider broke during a platform update and took two weeks to restore. That level of instability is nerve-wracking for payroll-adjacent data.", role: 'Head of People, 400 employees' },
    ],
    gainPoints: [
      { text: "Employee experience is the best in the HRIS market. Our Glassdoor scores went up after we launched Bob because employees notice when their company invests in tools that don't feel like 2010.", role: 'Head of People, 400 employees' },
      { text: "The compensation benchmarking data integrated directly into the platform saves our total rewards team from buying separate market data reports. That's a $15k annual savings on its own.", role: 'CHRO, 800 employees' },
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
    painPoints: [
      { text: "Reporting is basic — we can see headcount and time-off balances but building anything more complex requires a data export. For a growing company we need more analytics depth.", role: 'HR Manager, 200 employees' },
      { text: "Onboarding documentation for payroll setup in France was incomplete. We discovered three missing configuration steps during our first payroll run, which required two days of back-and-forth with support to resolve.", role: 'People Operations Lead' },
    ],
    gainPoints: [
      { text: "Time tracking integration with payroll means we no longer manually reconcile timesheets. Hours flow directly into payroll calculation and we haven't had a discrepancy in eight months.", role: 'People Operations Lead' },
      { text: "The absence management module handles Spain's complex sick leave and vacation accrual rules without any custom configuration. That used to take our HR team several hours per month to calculate manually.", role: 'HR Manager, 200 employees' },
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
    painPoints: [
      { text: "Benefits quality varies significantly by country. In the Netherlands and Germany the local benefits packages are excellent; in some Southeast Asian markets they feel thin and generic.", role: 'Global HR Director' },
      { text: "Entity setup timelines are quoted optimistically. Our Brazil entity took five weeks longer than promised and we had to delay a critical hire as a result.", role: 'Head of Remote Operations' },
    ],
    gainPoints: [
      { text: "We hired our first employee in Singapore in 11 days. Before Deel, that would have required a local entity, a lawyer, and at minimum two months. The speed-to-hire advantage is real.", role: 'Head of Remote Operations' },
      { text: "Compliance automation is the core value — employment contracts, tax withholding, and social contributions are handled correctly in every country we've hired in. Zero legal incidents in 18 months across 22 countries.", role: 'CFO, 120 employees' },
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
    painPoints: [
      { text: "The product is beautiful but limited in scope. We outgrew it at 250 employees when we needed more robust payroll integration and multi-country support that wasn't on the roadmap.", role: 'People Operations Lead' },
      { text: "Built-in reporting is minimal. Anything beyond standard headcount and org charts requires using the API, which means involving engineering resources for HR analytics.", role: 'Head of Engineering, 200 employees' },
    ],
    gainPoints: [
      { text: "API-first architecture let us build a custom people dashboard in two weeks that connects Humaans data to our internal BI tool. No other HRIS made that integration this clean.", role: 'Head of Engineering, 200 employees' },
      { text: "The employee profile design is genuinely elegant. New hires rate it as the best onboarding tool they've used and it signals our company's commitment to great employee experience from day one.", role: 'People Operations Lead' },
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
    painPoints: [
      { text: "Feature depth is limited outside the Sage accounting integration. The performance management module is too basic for our quarterly review process and we had to add a separate tool.", role: 'HR Manager' },
      { text: "Mobile app functionality is behind the desktop experience. Managers can't approve time-off requests from mobile without a clunky workaround, which slows down our remote team.", role: 'Finance Director, 300 employees' },
    ],
    gainPoints: [
      { text: "Sage accounting sync means payroll journal entries post automatically with zero manual bookkeeping. Our month-end close is two days faster than before.", role: 'Finance Director, 300 employees' },
      { text: "Org chart and reporting line management is effortless. We update the org structure in Sage HR and it cascades everywhere automatically — no more stale PowerPoint org charts.", role: 'HR Manager' },
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
    painPoints: [
      { text: "Support hold times regularly exceed 45 minutes. For a payroll issue that needs immediate resolution, that wait is unacceptable and has caused us to miss payday deadlines twice.", role: 'Payroll Manager, Enterprise' },
      { text: "The interface feels like it was designed a decade ago. Navigating between modules requires too many clicks and our HR coordinators spend unnecessary time on basic tasks.", role: 'Director of Total Rewards' },
    ],
    gainPoints: [
      { text: "Five years and zero missed payrolls. For 800 employees across six states, that reliability is the entire value proposition and ADP delivers it consistently.", role: 'Payroll Manager, Enterprise' },
      { text: "Multi-state tax compliance is completely automated. What used to require a dedicated resource staying current on state law changes is handled automatically without any input from our team.", role: 'Controller, 800 employees' },
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
    painPoints: [
      { text: "Support quality is entirely dependent on which account rep you get. We had three reps in two years and the service experience changed dramatically with each transition.", role: 'HR Coordinator' },
      { text: "The Flex platform has a confusing module structure that makes pricing opaque. By the time we understood what we needed, the quote was 40% higher than the initial estimate.", role: 'Controller, 80 employees' },
    ],
    gainPoints: [
      { text: "The HR compliance library notified us about a new California bereavement law 60 days before it took effect. We updated our policy and communicated it to employees before the effective date without any scramble.", role: 'Business Owner' },
      { text: "Year-end W-2 processing is completely automated. What used to take our payroll team three days to prepare and distribute now happens automatically on the first business day of January.", role: 'Controller, 80 employees' },
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
    painPoints: [
      { text: "Benefits administration module requires a broker to be fully useful. Without our broker involved, the carrier EDI feeds don't get set up correctly and we had enrollment errors in year one.", role: 'HR Manager, 300 employees' },
      { text: "Custom reporting takes time to learn. The report builder is powerful but not intuitive — we needed three support calls before we could build the headcount by cost center report our CFO needed.", role: 'Director of HR' },
    ],
    gainPoints: [
      { text: "Pulse surveys built into the payroll platform increased our response rate from 34% to 71% in one quarter. Employees already log in for pay stubs — adding a two-minute survey there was frictionless.", role: 'HR Manager, 300 employees' },
      { text: "Our payroll implementation had zero errors on go-live day. The data migration team caught discrepancies in our old system that we didn't even know existed.", role: 'Payroll Specialist' },
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
    painPoints: [
      { text: "HR features beyond payroll are minimal. No time-off tracking, no org chart, no employee directory — for a growing company we had to add separate tools for basic HR administration.", role: 'CFO, 50 employees' },
      { text: "Integration options are limited. Connecting OnPay to our accounting software required a manual CSV export that we run weekly — not ideal but workable at our size.", role: 'Business Owner, 30 employees' },
    ],
    gainPoints: [
      { text: "The phone support experience is the best in this category. I've called three times in two years and each time reached a knowledgeable person within five minutes who resolved my issue on the call.", role: 'Business Owner, 30 employees' },
      { text: "Three years, zero payroll errors, zero late filings. For a company without a dedicated payroll person, that reliability means I can focus on the business instead of worrying about compliance.", role: 'CFO, 50 employees' },
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
    painPoints: [
      { text: "The free tier is feature-limited in ways that aren't obvious until you need them. Payroll integration requires a paid plan and by the time you realize that, you're mid-implementation.", role: 'Retail Store Manager' },
      { text: "Customer support response times have slowed as the product has grown. Simple questions that should take five minutes sometimes require a two-day ticket cycle.", role: 'Restaurant Owner, 40 employees' },
    ],
    gainPoints: [
      { text: "Scheduling and payroll in one platform means our hourly staff time entries flow directly into payroll without any re-entry. We're saving three hours per bi-weekly payroll run.", role: 'Restaurant Owner, 40 employees' },
      { text: "The team communication features built into the scheduling app reduced our no-show rate by 20%. Shift reminders and easy swap requests mean our floor is properly staffed without me manually texting everyone.", role: 'Retail Store Manager' },
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
    painPoints: [
      { text: "The payroll UI is embedded in QuickBooks in a way that feels secondary. Adding a new pay type or editing a deduction setup requires navigating through accounting menus that aren't intuitive for HR staff.", role: 'Controller, 60 employees' },
      { text: "HR features beyond payroll are minimal — no performance management, limited time-off tracking, no org chart. You need to budget for additional tools as you grow.", role: 'CFO, Small Business' },
    ],
    gainPoints: [
      { text: "QuickBooks integration is genuinely seamless — payroll journal entries post automatically and our accountant can see everything in one system. Reconciliation at month-end went from four hours to 30 minutes.", role: 'Controller, 60 employees' },
      { text: "Automatic state and federal tax filings mean we haven't had a late filing in two years. Previously we missed two quarterly filings and paid penalties — that alone justified switching.", role: 'CFO, Small Business' },
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
    painPoints: [
      { text: "Contractor payment scheduling is limited to weekly or bi-weekly. Our freelancers prefer milestone-based payments and the platform doesn't support that without a workaround.", role: 'Business Owner, 15 employees' },
      { text: "The HR module is basic — time-off tracking works but the absence calendar doesn't integrate with Google Calendar without a manual export step.", role: 'Office Manager' },
    ],
    gainPoints: [
      { text: "The price is genuinely unbeatable. We run payroll for 14 employees and pay less per year than a single month of ADP. The cost savings in year one funded a new hire.", role: 'Business Owner, 15 employees' },
      { text: "US-based phone support means real answers from people who know the product. Called at 4pm on a Friday with a question and had a resolution in 12 minutes.", role: 'Office Manager' },
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
    painPoints: [
      { text: "EOR pricing varies significantly by country and the quote process takes a week. We couldn't get a number for Mexico and Colombia until after we'd already committed to hiring there.", role: 'Head of Remote Operations' },
      { text: "Onboarding support quality is inconsistent. Our first hire in Japan had a document signing error that took 10 days to resolve — we almost lost the candidate during the delay.", role: 'CFO, 80 employees' },
    ],
    gainPoints: [
      { text: "EOR coverage in 170+ countries means we can hire the best candidate regardless of where they live. We've built a team across 14 countries without a single entity setup and zero compliance penalties.", role: 'Head of Remote Operations' },
      { text: "Local benefits administration is handled entirely by Remote. Our employees in Germany, Singapore, and Brazil all have locally competitive packages that we didn't have to research or negotiate ourselves.", role: 'CFO, 80 employees' },
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
    painPoints: [
      { text: "Implementation took three months and required extensive data cleansing that wasn't scoped in the initial contract. We ended up paying for 40 hours of professional services that weren't in the original quote.", role: 'Global Payroll Director' },
      { text: "The platform is clearly built for large enterprise and the minimum viable configuration is complex. We have 800 employees across 12 countries and still felt like we were over-buying for our needs.", role: 'VP Finance' },
    ],
    gainPoints: [
      { text: "Global payroll processing that used to take our team two weeks per cycle now completes in three days. The automated validation rules catch errors before submission instead of after.", role: 'Global Payroll Director' },
      { text: "The CFO dashboard showing real-time labor cost by region and headcount by department has changed how we plan. Finance and HR are finally working from the same numbers.", role: 'VP Finance' },
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
    painPoints: [
      { text: "The product is limited to Canadian payroll — no US support. When we acquired a small US subsidiary we had to add an entirely separate payroll provider, which created reconciliation complexity.", role: 'Controller, Canadian SMB' },
      { text: "Benefits administration is not included. We manage payroll in Wagepoint and benefits in a separate system, and the manual data sync between them introduces errors about twice a year.", role: 'Office Manager' },
    ],
    gainPoints: [
      { text: "Canadian provincial tax compliance is perfect. We operate in six provinces and every remittance, T4, and Record of Employment is filed correctly and on time without any manual intervention.", role: 'Controller, Canadian SMB' },
      { text: "The interface is so clean that we onboarded our new payroll admin in half a day. Previous providers required a week of training just to run a basic payroll without making errors.", role: 'Office Manager' },
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
    painPoints: [
      { text: "The OKR module requires a significant time investment to set up correctly. We spent six weeks in workshops before our first cycle and it still took two full cycles before alignment felt real.", role: 'Engineering Manager' },
      { text: "Pricing has increased significantly with each renewal. We're paying 40% more than our initial contract for essentially the same feature set and it's becoming hard to justify to leadership.", role: 'VP People, 600 employees' },
    ],
    gainPoints: [
      { text: "Manager adoption rate is above 90% without any mandate. The interface is approachable enough that even our most resistant managers complete 1:1s and reviews on time.", role: 'VP People, 600 employees' },
      { text: "Calibration features eliminated the grade inflation we'd had for years. Compensation decisions are now defensible because the data shows clear differentiation across performance levels.", role: 'HR Business Partner' },
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
    painPoints: [
      { text: "The check-in cadence requires manager discipline to work. When managers get busy and skip weeks, the data gaps make reporting unreliable and the whole system loses credibility.", role: 'Director of People Operations' },
      { text: "HRIS integration is limited to certain platforms. Our NetSuite connection required a third-party tool and adds a layer of complexity that breaks periodically.", role: 'VP Engineering' },
    ],
    gainPoints: [
      { text: "Weekly check-ins surfaced a retention risk on our engineering team four months before we would have seen it in a quarterly survey. We adjusted the situation and kept the person — that's real ROI.", role: 'HR Business Partner' },
      { text: "OKR visibility across the org changed how our engineering managers operate. Everyone can see how their sprint work connects to company goals and it's reduced the 'why are we building this' questions significantly.", role: 'VP Engineering' },
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
    painPoints: [
      { text: "The pricing model is per-employee and scales steeply. As we've grown from 400 to 1,200 employees, our annual cost has tripled while the feature set has barely changed.", role: 'CHRO, 1,200 employees' },
      { text: "Action planning tools are limited. Survey results surface the issues well but the built-in tools for tracking manager follow-through on commitments are too basic for our accountability culture.", role: 'Head of People' },
    ],
    gainPoints: [
      { text: "Benchmark comparisons against similar companies transformed our executive conversations. Instead of debating whether a 72% engagement score is good, we can show it's 8 points above our industry peers.", role: 'CHRO, 1,200 employees' },
      { text: "Manager effectiveness reports drove our first data-driven L&D investment. We identified the bottom quartile of managers by team engagement score and built a targeted program — retention on those teams improved 18% in a year.", role: 'Head of People' },
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
    painPoints: [
      { text: "Configuring the OKR hierarchy took three months of internal alignment before we could fully launch. The software supports the complexity, but your org needs to be ready for it before you go live.", role: 'VP Strategy' },
      { text: "The mobile experience is underdeveloped. Managers who are primarily on their phones struggle with the check-in workflow and we see lower completion rates from field managers versus desk-based teams.", role: 'CHRO, 1,500 employees' },
    ],
    gainPoints: [
      { text: "Moving from annual to continuous performance cycles changed our ability to course-correct. We caught a critical product initiative misalignment in Q2 instead of during the annual review in December.", role: 'CHRO, 1,500 employees' },
      { text: "OKR transparency across the company reduced inter-team dependency friction. When everyone can see what every team is working toward, coordination conversations are shorter and more productive.", role: 'VP Strategy' },
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
    painPoints: [
      { text: "The learning module integration requires content to be hosted in Leapsome's system, which meant migrating 80 existing courses. That migration took two months and delayed our full launch.", role: 'CHRO, 800 employees' },
      { text: "Survey customization is limited. We couldn't modify validated question templates without losing the benchmarking data, which constrained how much we could tailor the experience for our culture.", role: 'People Director' },
    ],
    gainPoints: [
      { text: "The connected performance-learning loop is genuinely unique. When a manager receives low scores on a specific behavior in their review, a targeted learning path surfaces automatically. That kind of personalization changes behavior.", role: 'CHRO, 800 employees' },
      { text: "Feedback quality improved measurably after the first cycle. The structured prompts guide reviewers away from vague comments and the data shows — our average feedback length increased by 40% in year one.", role: 'People Director' },
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
    painPoints: [
      { text: "The gamification features require active admin maintenance to stay fresh. After the initial engagement spike, points and badges lose novelty and need reconfiguration to remain motivating — that's ongoing work HR didn't budget for.", role: 'HR Director, 400 employees' },
      { text: "Analytics depth is limited. We can see who's using the recognition features but correlating that data to performance outcomes requires a separate data extract.", role: 'VP Operations' },
    ],
    gainPoints: [
      { text: "Daily active usage of the recognition features is something no other performance tool we've used has achieved. Engagement with the platform didn't drop after the launch window — it actually increased over six months.", role: 'HR Director, 400 employees' },
      { text: "OKR flexibility across different department structures is genuine. Our engineering team uses sprints, sales uses monthly targets, and ops uses quarterly goals — all managed in one system without any friction.", role: 'VP Operations' },
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
    painPoints: [
      { text: "Goal management features are underdeveloped. We use Reflektive for feedback and recognition but had to add a separate OKR tool because the goal-setting module didn't support cascading objectives.", role: 'VP People' },
      { text: "Post-acquisition product investment has been uneven. Several features on the roadmap during our sales process haven't shipped and support ticket response times have increased.", role: 'People Operations Manager' },
    ],
    gainPoints: [
      { text: "Slack integration means feedback happens in the flow of work. Our Slack-native feedback volume is 3x higher than what we got through the standalone web app in our previous tool.", role: 'VP People' },
      { text: "Real-time recognition between peers changed the team dynamic visibly within 60 days. Managers report that morale conversations in 1:1s shifted from complaints to shared wins.", role: 'People Operations Manager' },
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
    painPoints: [
      { text: "Reporting flexibility is limited. We can run standard review completion and rating distribution reports, but anything requiring cross-cycle analysis or custom filters requires a data export.", role: 'HR Manager, 600 employees' },
      { text: "The product is simple which is mostly a strength, but when we tried to implement a 9-box calibration process it required workarounds that felt kludgy and made the output harder to use.", role: 'Director of HR' },
    ],
    gainPoints: [
      { text: "Our review cycle completion rate went from 68% to 94% in the first cycle. The interface is simple enough that managers don't procrastinate on it.", role: 'HR Manager, 600 employees' },
      { text: "Configuration to match our exact review form took one afternoon. Every other tool we evaluated required either us to change our process or months of custom development.", role: 'Director of HR' },
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
    painPoints: [
      { text: "The UX needs modernization. Our managers describe the interface as functional but dated — the navigation structure requires too many steps for common tasks like updating a goal status.", role: 'HR Business Partner' },
      { text: "Integration with our HRIS for automatic employee data sync doesn't work reliably. We manually update organizational structure changes once a month, which introduces lag in reporting accuracy.", role: 'HR Director' },
    ],
    gainPoints: [
      { text: "Goal cascading from company strategy down to individual contributors is finally visible. Our managers can explain how their team's work connects to the annual plan, which they couldn't do before.", role: 'HR Business Partner' },
      { text: "Implementation support was genuine. Our CSM stayed on weekly calls for three months post-launch and the advice on goal-setting cadence was more valuable than any software feature.", role: 'HR Director' },
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
    painPoints: [
      { text: "The methodology-first approach means significant upfront change management. Our first OKR cycle required four executive workshops before we could set goals — worthwhile but not something we could have done in 90 days.", role: 'VP Strategy' },
      { text: "Enterprise pricing requires a multi-year commitment with limited flexibility. When our headcount dropped 20% mid-contract, we couldn't adjust the contract terms.", role: 'Chief of Staff, Fortune 500' },
    ],
    gainPoints: [
      { text: "OKR health dashboards give our CEO real-time visibility into strategic initiative status. Board meeting prep that used to take three days of aggregating data now takes one hour.", role: 'Chief of Staff, Fortune 500' },
      { text: "The built-in OKR methodology means we're not just using software — we're adopting a proven system. Our goal-setting quality improved significantly because the platform guides you through the right questions.", role: 'VP Strategy' },
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
    painPoints: [
      { text: "Implementation took eight months and required three separate consultants. By the time we went live, two of our original project team members had left and we had to re-train our admin team from scratch.", role: 'HR Technology Manager' },
      { text: "The content library is vast but curation tools only partially address the noise problem. We spent three months building a curated catalog before the platform felt usable for self-directed learning.", role: 'L&D Director, 3,000 employees' },
    ],
    gainPoints: [
      { text: "Skills gap analysis connected to our content catalog gave L&D a data-driven investment case for the first time. We reduced external training spend by 30% by identifying what was already available internally.", role: 'Chief Learning Officer' },
      { text: "Career pathing features connected to our HCM increased internal mobility applications by 45% in the first year. Employees could finally see a path forward and started pursuing it.", role: 'L&D Director, 3,000 employees' },
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
    painPoints: [
      { text: "AI content generation is impressive for foundational material but requires significant editing for anything technical or compliance-sensitive. Budget 30% more content review time than the demos suggest.", role: 'L&D Manager, Enterprise' },
      { text: "Customer support SLA response times are inadequate for our contract tier. Critical issues that block learners from accessing content have taken 48 hours to resolve.", role: 'Director of Customer Education' },
    ],
    gainPoints: [
      { text: "AI course generation reduced our average content development time from three weeks to five days. We're producing four times more training material with the same team.", role: 'L&D Manager, Enterprise' },
      { text: "Client training completion rates increased 58% after migration. The learner experience is simply better — the mobile app works, the interface is modern, and completions happen without IT support calls.", role: 'Director of Customer Education' },
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
    painPoints: [
      { text: "Custom reporting requires upgrading to a higher tier. Our base plan has limited report customization and we had to pay for an add-on just to export the compliance completion data our legal team needed.", role: 'HR Director, 250 employees' },
      { text: "Gamification features are basic. We wanted to add custom achievement badges and leaderboards for our sales training program and the configuration options were too limited.", role: 'L&D Specialist' },
    ],
    gainPoints: [
      { text: "Time-to-value is unmatched. We signed on a Thursday, completed setup over the weekend, and had our first compliance training cohort enrolled by the following Wednesday.", role: 'HR Director, 250 employees' },
      { text: "Branch segmentation means our 12 department managers see only their team's learners and courses. Adoption doubled once managers felt ownership instead of seeing a system-wide view they didn't understand.", role: 'L&D Specialist' },
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
    painPoints: [
      { text: "Course authoring tools are not native — you need a third-party tool like Articulate to create SCORM content and the import process is finicky. Budget for authoring tool licensing in addition to the LMS.", role: 'L&D Director' },
      { text: "Implementation support is self-serve by default. We needed more hands-on guidance during data migration and ended up purchasing a support package that should have been included.", role: 'Chief Learning Officer' },
    ],
    gainPoints: [
      { text: "Compliance reporting is genuinely comprehensive. Our legal team can pull completion certificates, audit trails, and attestation records for any learner at any time without involving IT.", role: 'L&D Director' },
      { text: "Completion rates increased 30% after migration — attributable to the redesigned learner interface. Employees stopped calling IT to ask how to access training, which alone freed up 15 hours per month.", role: 'Chief Learning Officer' },
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
    painPoints: [
      { text: "Customization is limited by the SAP product architecture. We needed a specific report format for our safety compliance program and support told us it would require a custom development request with a 90-day lead time.", role: 'Compliance Training Manager' },
      { text: "The Litmos interface shows its age compared to modern LMS competitors. New learners need more onboarding than we expected and our under-30 workforce is particularly vocal about the UX gap.", role: 'L&D Manager, Field Operations' },
    ],
    gainPoints: [
      { text: "The pre-built compliance content library saved us an estimated 400 hours of content development. OSHA, harassment prevention, and security awareness training was ready on day one.", role: 'Compliance Training Manager' },
      { text: "Mobile completion rates for our field service technicians are above 80%. No other LMS we piloted got above 45% on mobile with this workforce — the offline capability is what makes the difference.", role: 'L&D Manager, Field Operations' },
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
    painPoints: [
      { text: "Collaborative course creation requires significant culture change. Our SMEs had never been expected to create content before and the adoption took two full quarters of nudging, coaching, and enablement.", role: 'CLO, 800 employees' },
      { text: "Reporting on collaborative course quality is limited. We can see completion rates but measuring whether collaboratively created content is better or worse than L&D-created content requires manual analysis.", role: 'L&D Specialist' },
    ],
    gainPoints: [
      { text: "Subject matter expert contributions increased our training catalog from 40 to 180 courses in 12 months without adding any L&D headcount. The crowdsourced model is genuinely scalable.", role: 'CLO, 800 employees' },
      { text: "Learner reaction data surfacing directly to course authors changed how our SMEs think about content. Authorship completion rate improved after we showed authors their satisfaction scores.", role: 'L&D Specialist' },
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
    painPoints: [
      { text: "Content volume is a double-edged sword. With 22,000+ courses, employees without curation guidance report feeling overwhelmed and self-directed adoption is lower than expected without L&D-built learning paths.", role: 'L&D Director, 5,000 employees' },
      { text: "Reporting on learning impact is limited. We can see completions and time-spent but connecting LinkedIn Learning engagement to performance outcomes requires significant additional analytics work.", role: 'CLO' },
    ],
    gainPoints: [
      { text: "Integration with LinkedIn profiles increased employee-driven learning by 35%. When employees can display completed courses publicly, they seek them out without any L&D push.", role: 'CLO' },
      { text: "Content quality across the 22,000+ catalog is consistently high. Employees rate LinkedIn Learning content 4.3/5 on average — significantly above the 3.1 average we saw on our previous internal content library.", role: 'L&D Director, 5,000 employees' },
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
    painPoints: [
      { text: "Implementation is lengthy and requires dedicated internal resources. We spent six months on data architecture and content migration before any employees saw the platform.", role: 'L&D Technology Manager' },
      { text: "The skills ontology is powerful but requires significant curation effort. Out-of-the-box skill tags didn't match our job architecture and aligning them took three months with a dedicated project team.", role: 'Head of Talent Development' },
    ],
    gainPoints: [
      { text: "Skills intelligence gave our workforce planning team a capability map they'd never had before. We identified a critical gap in cloud infrastructure skills nine months before it would have become a hiring emergency.", role: 'Head of Talent Development' },
      { text: "Single learning interface across 180+ content sources increased employee learning hours by 60% in the first year. When employees don't have to switch between five different portals, they actually learn more.", role: 'L&D Technology Manager' },
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
    painPoints: [
      { text: "The platform is purpose-built for sales enablement which means it doesn't serve non-revenue teams well. We tried to use it for engineering onboarding and the experience was clearly designed for a different use case.", role: 'Sales Enablement Manager' },
      { text: "Pricing is premium and the contract requires a three-year commitment. For a sales team of 80, the annual cost is significant and the ROI calculation requires strong assumptions.", role: 'VP Sales Enablement' },
    ],
    gainPoints: [
      { text: "CRM integration means coaching recommendations appear in Salesforce at exactly the right deal stage. Our win rate on enterprise opportunities improved 12% in the six months following rollout.", role: 'Sales Enablement Manager' },
      { text: "Just-in-time learning for objection handling has replaced the pre-call 'what do I say if they say X' panic. Reps have the right content at their fingertips during calls and confidence levels are measurably higher.", role: 'VP Sales Enablement' },
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
    painPoints: [
      { text: "The LMS and performance modules feel like separate products that have been connected rather than natively integrated. Switching between them requires re-logging in and user profile data doesn't sync automatically.", role: 'HR Director, 1,200 employees' },
      { text: "Content authoring is not included — you need a third-party tool like Articulate or Lectora. That's an additional $15,000/year we didn't account for in our initial budget.", role: 'L&D Manager' },
    ],
    gainPoints: [
      { text: "Development goal alignment between the LMS and performance module means managers can assign training that directly maps to a review gap. That closed-loop connection is something no standalone LMS offers.", role: 'HR Director, 1,200 employees' },
      { text: "Automatic manager alerts when team members fall behind on required compliance training eliminated our manual tracking spreadsheet. Completion rates for mandatory training went from 78% to 97% in one cycle.", role: 'L&D Manager' },
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
    painPoints: [
      { text: "Implementation requires a multi-month data integration project before any analytics are live. We waited five months before our CHRO saw a single dashboard and that delay nearly killed internal support for the initiative.", role: 'CHRO, 8,000 employees' },
      { text: "Pricing is enterprise-only and opaque. The initial quote was significantly below what we ultimately paid once data connectors and premium benchmarking modules were added.", role: 'People Analytics Lead, Enterprise' },
    ],
    gainPoints: [
      { text: "Benchmarking against 50,000+ companies transformed our board conversations. We can now contextualize our turnover rate against industry peers and present retention investments as data-backed decisions.", role: 'CHRO, 8,000 employees' },
      { text: "Pre-built predictive attrition models identified 23 high-flight-risk employees in Q1. We intervened on 18 of them and retained 14. That's measurable ROI from a people analytics tool — something I'd never achieved before.", role: 'People Analytics Lead, Enterprise' },
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
    painPoints: [
      { text: "Prism is only valuable if you're already deep in the Workday ecosystem. We spent three months trying to ingest data from our legacy benefits provider and ultimately had to abandon the integration.", role: 'HR Analytics Manager' },
      { text: "The learning curve is steep. Building a custom analytics dashboard requires Workday reporting training that takes weeks to develop competency in — we needed to hire a dedicated Workday Analytics specialist.", role: 'Head of People Analytics' },
    ],
    gainPoints: [
      { text: "External salary benchmark data merged with our Workday compensation data in one analytics layer gave our compensation team insights they'd never had. We rebuilt our entire pay band structure based on the combined analysis.", role: 'Head of People Analytics' },
      { text: "Data lineage tracking means every metric in our board deck can be traced back to its source in three clicks. Our first clean external audit in five years was directly attributable to that auditability.", role: 'HR Analytics Manager' },
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
    painPoints: [
      { text: "The analytics product requires a SuccessFactors foundation — if you're using another HCMS the connector quality drops significantly and data freshness lags by 24 hours in some modules.", role: 'HRIS Director' },
      { text: "Story-based reports are impressive in demos but require significant admin effort to maintain. When underlying data structures change, the stories break and need to be rebuilt manually.", role: 'People Analytics Manager' },
    ],
    gainPoints: [
      { text: "Native SuccessFactors integration means our workforce data is always current. We eliminated a weekly data refresh process that had introduced a 72-hour lag in our previous analytics setup.", role: 'HRIS Director' },
      { text: "Story-based presentation layer means our CHRO presents analytics to the board without needing a data translator in the room. Business leaders understand the insights directly.", role: 'People Analytics Manager' },
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
    painPoints: [
      { text: "The product requires HRIS data to be clean and well-structured before you get useful modeling outputs. We spent two months on data hygiene work before OrgVue could give us reliable scenario results.", role: 'Head of Workforce Planning' },
      { text: "Pricing is consultation-based and not publicly listed. The sales process took longer than expected and the final contract included implementation fees we hadn't budgeted for.", role: 'Chief People Officer' },
    ],
    gainPoints: [
      { text: "Scenario modeling for our 3,000-person reorg saved us from a decision we would have regretted. Simulation 8 showed a spans-and-layers problem that wasn't visible in a static spreadsheet analysis.", role: 'Chief People Officer' },
      { text: "Visualization quality is genuinely different from what we built in Tableau. Interactive org charts that update in real time during a planning session changed how our executive team makes design decisions.", role: 'Head of Workforce Planning' },
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
    painPoints: [
      { text: "Implementation requires HRIS data export and transformation work that took longer than estimated. The data model expects a specific format and our SAP data needed four weeks of preprocessing.", role: 'VP Workforce Planning' },
      { text: "The platform is powerful for analytics but requires a dedicated people analyst to maintain. Executives who expected self-service insights were disappointed — the tool requires interpretation expertise.", role: 'CHRO' },
    ],
    gainPoints: [
      { text: "Finance and HR finally collaborate on headcount using the same data. Before Crunchr, we had three different headcount numbers across Finance, HR, and Recruiting. Now there's one source of truth.", role: 'VP Workforce Planning' },
      { text: "External benchmarking contextualizes our internal data in ways that changed how we set targets. Our voluntary turnover looked concerning until benchmarking revealed we're below industry median for our sector.", role: 'CHRO' },
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
    painPoints: [
      { text: "Manager action planning tools are limited. Survey results highlight problems clearly but the tools for tracking whether managers actually addressed them are too lightweight for our accountability expectations.", role: 'People Analytics Director' },
      { text: "Response rate maintenance requires ongoing effort. After the initial launch excitement, weekly pulse survey participation dropped from 78% to 52% by month four and we had to redesign our communication strategy.", role: 'Head of People Insights' },
    ],
    gainPoints: [
      { text: "Weekly listening identified a team experiencing manager relationship issues four months before it would have surfaced in an annual survey. We intervened before it became a retention crisis and kept three strong performers.", role: 'Head of People Insights' },
      { text: "Scientific survey methodology means our data has statistical validity we can stand behind in board presentations. I've stopped getting challenged on methodology and started getting asked for recommendations instead.", role: 'People Analytics Director' },
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
    painPoints: [
      { text: "Pricing is enterprise-only with a complex module structure. We ended up in a multi-tier purchase that required board approval — the initial quote for 'the full platform' was 60% below what we actually needed.", role: 'CHRO, 20,000 employees' },
      { text: "Implementation requires dedicated professional services and the process is lengthy. From contract to first survey live was four months — longer than any listening platform we've used before.", role: 'Head of Employee Experience' },
    ],
    gainPoints: [
      { text: "Running all six of our survey programs on one platform — onboarding, exit, pulse, engagement, manager 360, and lifecycle — eliminated four separate vendor contracts and the data is finally comparable across programs.", role: 'Head of Employee Experience' },
      { text: "Manager action planning tools have measurably changed behavior. Teams whose managers completed action plans show 14-point higher engagement scores in subsequent pulses compared to teams whose managers didn't.", role: 'CHRO, 20,000 employees' },
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
    painPoints: [
      { text: "Implementation is complex and expensive. We paid $180,000 in professional services fees before the platform was configured. That's a significant hidden cost that wasn't fully disclosed during the sales process.", role: 'VP Employee Experience' },
      { text: "The platform requires dedicated technical administration. We hired a full-time Qualtrics admin and even then, building new dashboards and connecting external data sources requires support ticket involvement.", role: 'Chief Experience Officer' },
    ],
    gainPoints: [
      { text: "Text analytics transformed how we use open-ended survey responses. We used to read a sample manually; now every comment is automatically categorized and the themes are ranked by frequency and sentiment.", role: 'VP Employee Experience' },
      { text: "Cross-program correlation between employee and customer experience data revealed that teams with high manager effectiveness scores have 23% higher customer satisfaction scores. That insight drove a $2M manager development investment.", role: 'Chief Experience Officer' },
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
    painPoints: [
      { text: "Enterprise contract minimum is high and the ROI case requires significant assumptions about data integration depth. Companies that don't have mature operational data pipelines will struggle to justify the investment.", role: 'VP Analytics' },
      { text: "The platform requires dedicated technical resources to connect operational systems. The API-first promise is real, but realizing it took our engineering team three months of integration work.", role: 'Chief Experience Officer' },
    ],
    gainPoints: [
      { text: "Combined customer and employee signal in one platform revealed that employee engagement in our contact centers predicts customer satisfaction scores with a three-week lead time. We now use it as an early warning system.", role: 'Chief Experience Officer' },
      { text: "API connections to our operational systems mean survey insights are automatically enriched with transaction data. Feedback from high-value customer segments is now automatically flagged and routed differently.", role: 'VP Analytics' },
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
    painPoints: [
      { text: "Data coverage varies significantly by industry and geography. Our manufacturing division in Southeast Asia had too few data points for reliable benchmarking and the confidence intervals were too wide to use in a board presentation.", role: 'VP People Analytics' },
      { text: "The platform requires data science skills to extract full value. Business analysts without Python or SQL experience can use the dashboards but can't do the custom analysis that makes the product truly differentiated.", role: 'Head of Talent Strategy' },
    ],
    gainPoints: [
      { text: "Competitive talent flow analysis showed us exactly which companies were successfully recruiting from our engineering teams — and which companies our people were joining. We redesigned our retention program based on that data.", role: 'Head of Talent Strategy' },
      { text: "Labor market benchmarking from Revelio replaced $85,000 in annual market research reports. The data is more current, more granular, and directly integrated into our headcount planning model.", role: 'VP People Analytics' },
    ],
  },
}
