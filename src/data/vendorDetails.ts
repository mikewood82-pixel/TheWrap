export type CapabilityScore = { label: string; score: number; rationale?: string }
export type ReviewHighlight = { text: string; role: string }

// One funding round (or IPO). `valuation` is post-money when known; many
// later-stage private rounds publish it, earlier rounds usually don't.
export type FundingRound = {
  round: string         // 'Seed' | 'Series A' | 'Series B' | … | 'IPO' | 'Acquired'
  date: string          // 'Mon YYYY' for display, e.g. 'Apr 2025'
  amount: string        // '$200M', 'undisclosed', 'IPO'
  leadInvestor?: string // 'Founders Fund', 'Sequoia', etc
  valuation?: string    // '$13.5B post', if disclosed
}

// Single leadership row. `departed` is set when the exec has left in the
// last ~6 months — we surface this as a yellow flag in the UI because
// recent C-suite churn is a buying signal.
export type LeadershipMember = {
  name: string
  role: string          // 'CEO', 'CTO', 'CHRO', 'CRO', 'Head of Product'
  tenureYears: number   // years in this role; <1 should be flagged
  prior?: string        // previous notable employer/role
  departed?: string     // 'Departed Feb 2026' — when set, render struck-through
  linkedin?: string     // LinkedIn handle for deep linking
}

// Customer support issue-volume breakdown. `volume` is a relative weight,
// not a count — buckets sum to 100 across categories. Sources are
// editorial/aggregated review analysis, not vendor-provided.
export type SupportIssueBreakdown = {
  category: string      // 'Onboarding', 'Integrations', 'Billing', 'Performance', 'Feature requests'
  volume: number        // 0-100, relative share
}

export type VendorDetail = {
  capabilities: CapabilityScore[]
  idealCustomer: { size: string; industries: string[]; useCase: string }
  integrations: string[]
  news: { headline: string; date: string; source: string }[]
  financialHealth?: {
    fundingStage: string
    lastRaise?: string
    headcountTrend: string
    recentLayoffs?: string
    acquisitionRisk: string
    keySignals: string[]
    fundingHistory?: FundingRound[]   // chronological, oldest first
    totalRaised?: string              // '$2.6B', for headline display
    lastValuation?: string            // most recent disclosed valuation
  }
  supportQuality?: {
    overallScore: number
    responseTime: string
    channels: string[]
    dedicatedCsm: string
    supportTrend: string
    highlights: ReviewHighlight[]
    issueBreakdown?: SupportIssueBreakdown[]  // sums to ~100
    sentimentTrend?: number[]                  // 12 months, 0-100 sentiment scores
  }
  leadership?: LeadershipMember[]
}

export const vendorDetails: Record<string, VendorDetail> = {

  // ─── HCM ───────────────────────────────────────────────────────────────────

  'workday': {
    capabilities: [
      { label: 'Core HR', score: 96, rationale: 'Industry-leading core HR depth with 20+ years of enterprise refinement. Widest module set in the category and proven at scale across Fortune 500 deployments.' },
      { label: 'Payroll', score: 88, rationale: 'Native US payroll is strong; global payroll relies on partner network (Safeguard, CloudPay) which creates variable quality. Loses points vs. ADP and Ceridian on direct coverage.' },
      { label: 'Benefits', score: 85, rationale: 'Solid benefits administration tightly integrated with core HR, but third-party benefits vendors often still needed for decision support and ACA compliance depth.' },
      { label: 'Workforce Mgmt', score: 90, rationale: 'Scheduling and time tracking are mature but can feel enterprise-heavy for frontline/hourly use cases. Best suited for salaried professional workforces.' },
      { label: 'Analytics', score: 92, rationale: 'Prism Analytics brings external data into Workday for advanced people analytics. Strong native reporting, though deep custom analytics still require expertise.' },
      { label: 'Global', score: 94, rationale: 'One of the most sophisticated localization engines on the market — supports 100+ countries with deep language, currency, and regulatory coverage.' },
    ],
    idealCustomer: {
      size: '5,000+ employees',
      industries: ['Technology', 'Healthcare', 'Financial Services', 'Higher Education'],
      useCase: 'Large enterprises seeking a unified HCM and financial management platform with deep analytics',
    },
    integrations: ['Slack', 'Salesforce', 'ServiceNow', 'Microsoft Teams', 'Okta', 'ADP'],
    news: [
      { headline: 'Co-founder Aneel Bhusri returns as Workday CEO as Carl Eschenbach steps down amid steep share decline', date: 'Feb 2026', source: 'CNBC' },
      { headline: 'Workday expands Illuminate AI assistant across HCM, Finance, and Analytics modules', date: 'Mar 2026', source: 'Workday Newsroom' },
      { headline: 'Workday flagged worst for enterprise data access in Fivetran ODI benchmark, raising AI integration concerns', date: 'Apr 2026', source: 'The Register' },
    ],
    financialHealth: {
      fundingStage: 'Public (NYSE: WDAY)',
      headcountTrend: '+5% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'FY2026 revenue $8.4B, up 17% YoY',
        'Expanding AI portfolio with Workday Illuminate',
        'Co-founder Aneel Bhusri returned as CEO in Feb 2026; shares down ~40% YoY',
      ],
    },
    supportQuality: {
      overallScore: 72,
      responseTime: '< 4 hours (premium), 24–48 hours (standard)',
      channels: ['Email', 'Phone', 'Chat', 'Community Forum'],
      dedicatedCsm: 'Yes, at enterprise tier (1,000+ employees)',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Our dedicated CSM is responsive and proactive about flagging new features relevant to our setup.', role: 'HRIS Director' },
        { text: 'Standard support is slow — expect 2-day turnaround for non-critical tickets. Worth upgrading to premium.', role: 'HR Systems Manager' },
      ],
    },
  },

  'rippling': {
    capabilities: [
      { label: 'Core HR', score: 88, rationale: 'Compound platform ties HR, IT, and finance to a single employee record, enabling automation no legacy HRIS can match. Depth on complex job architectures and succession still trails Workday.' },
      { label: 'Payroll', score: 91, rationale: 'Native US payroll is fast and tightly coupled with onboarding and device provisioning. Building proprietary payroll infrastructure is reducing historical reliance on third parties.' },
      { label: 'Benefits', score: 84, rationale: 'Streamlined benefits admin with broker marketplace, but lacks the depth of carrier integrations and decision-support tools that larger enterprises expect.' },
      { label: 'Workforce Mgmt', score: 80, rationale: 'Solid time and scheduling for knowledge workers, but shift-heavy industries still favor UKG or Dayforce for advanced labor forecasting.' },
      { label: 'Analytics', score: 79, rationale: 'Reporting has improved quickly but still trails Workday Prism for cross-domain people analytics. Strength is unified data across HR, IT, and spend.' },
      { label: 'Global', score: 86, rationale: 'Aggressive EOR and native payroll expansion into 50+ countries, making it increasingly credible for global mid-market. Coverage still thinner than SAP or Oracle at the high end.' },
    ],
    idealCustomer: {
      size: '50–2,000 employees',
      industries: ['Technology', 'Professional Services', 'Retail', 'Healthcare'],
      useCase: 'Fast-growing companies needing HR, IT, and Finance unified in a single platform',
    },
    integrations: ['Slack', 'GitHub', 'Google Workspace', 'Salesforce', 'QuickBooks', 'Okta'],
    news: [
      { headline: 'Rippling appoints Sonia Parandekar as SVP Engineering and India site lead to accelerate global product expansion', date: 'Apr 2026', source: 'Business Wire' },
      { headline: 'Rippling launches Spend Management module to consolidate corporate cards and expense reporting', date: 'Mar 2026', source: 'TechCrunch' },
      { headline: 'Rippling announces native EOR capabilities in 50 additional countries', date: 'Feb 2026', source: 'Rippling Newsroom' },
    ],
    financialHealth: {
      fundingStage: 'Private (Venture-backed)',
      lastRaise: '$200M Series F at $13.5B valuation — Apr 2025',
      headcountTrend: '+30% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Fastest-growing compound HR/IT/Finance platform in the market',
        'ARR reportedly crossed $350M with aggressive upmarket expansion',
        'Building proprietary payroll infrastructure to reduce third-party dependency',
      ],
    },
    supportQuality: {
      overallScore: 68,
      responseTime: '< 12 hours (standard), < 4 hours (premium)',
      channels: ['Chat', 'Email', 'Phone (premium only)'],
      dedicatedCsm: 'Yes, at 200+ employees or premium plan',
      supportTrend: 'Improving',
      highlights: [
        { text: 'Chat support is fast but scripted. For complex payroll or IT policy issues you need to push for a specialist.', role: 'People Ops Lead' },
        { text: 'The product moves so fast that support sometimes doesn\'t know about features that shipped last week. Growing pains.', role: 'HR Director' },
      ],
    },
  },

  'bamboohr': {
    capabilities: [
      { label: 'Core HR', score: 87, rationale: 'Gold standard UX for SMB HR teams, with fast implementations and onboarding workflows that users consistently rate best-in-class. Architecture is not built for enterprise-grade job structures.' },
      { label: 'Payroll', score: 78, rationale: 'US payroll is competent but thinner than specialists like ADP or Gusto, and only recently expanded to Canada. Tax filing and complex pay rules remain weak spots.' },
      { label: 'Benefits', score: 75, rationale: 'Covers core benefits admin cleanly but relies on broker partners for depth. Lacks the carrier integration library that larger HRIS platforms ship natively.' },
      { label: 'Workforce Mgmt', score: 70, rationale: 'Time tracking is functional for office workers but not designed for shift-heavy workforces. Scheduling and labor forecasting are minimal.' },
      { label: 'Analytics', score: 72, rationale: 'Reporting UI is widely praised for ease of use, but the underlying data model limits advanced people analytics. Custom metrics require workarounds.' },
      { label: 'Global', score: 58, rationale: 'Historically US-centric and only just dipping into international payroll. Multi-country support is a material gap for any company expanding beyond North America.' },
    ],
    idealCustomer: {
      size: '25–1,000 employees',
      industries: ['Technology', 'Nonprofit', 'Professional Services', 'Hospitality'],
      useCase: 'SMBs wanting an intuitive all-in-one HR platform without the enterprise complexity',
    },
    integrations: ['Slack', 'QuickBooks', 'Indeed', 'LinkedIn', 'Google Workspace', 'Zapier'],
    news: [
      { headline: 'BambooHR introduces AI-driven eNPS benchmarking to help SMBs track employee sentiment', date: 'Feb 2026', source: 'BambooHR Blog' },
      { headline: 'BambooHR launches Broker Partner Program to help benefits brokers extend value through modern HR tech', date: 'Apr 2026', source: 'GlobeNewswire' },
      { headline: 'BambooHR partners with Gusto to offer seamless payroll migration for growing companies', date: 'Mar 2026', source: 'HR Tech Insider' },
    ],
    financialHealth: {
      fundingStage: 'Private (Venture-backed)',
      lastRaise: '$Series C — undisclosed, 2022',
      headcountTrend: '-6% YoY',
      recentLayoffs: 'Reduced workforce by ~15% — Jun 2024',
      acquisitionRisk: 'High',
      keySignals: [
        'Potential acquisition target as mid-market HRIS competition intensifies',
        'Product velocity slowed noticeably after layoffs',
        'Still strong brand loyalty among SMB HR teams',
      ],
    },
    supportQuality: {
      overallScore: 82,
      responseTime: '< 4 hours (all tiers)',
      channels: ['Phone', 'Email', 'Chat'],
      dedicatedCsm: 'No — pooled support model',
      supportTrend: 'Declining',
      highlights: [
        { text: 'Support used to be BambooHR\'s best feature. Response times are still good but the depth of knowledge has dropped since the layoffs.', role: 'HR Coordinator' },
        { text: 'Chat support is fast and friendly. For complex reporting or integration issues, you may need to escalate.', role: 'People Ops Manager' },
      ],
    },
  },

  'ukg-pro': {
    capabilities: [
      { label: 'Core HR', score: 91, rationale: 'Strong HR system of record inherited from Ultimate Software, with deep employee experience features. Some friction remains where Ultimate and Kronos data models still meet.' },
      { label: 'Payroll', score: 93, rationale: 'Mature, high-volume US payroll engine trusted by complex employers in healthcare and retail. Tax and compliance depth is a long-standing strength.' },
      { label: 'Benefits', score: 88, rationale: 'Robust benefits admin with carrier integrations and strong open enrollment tooling. Occasional rough edges where WFM and HCM overlap.' },
      { label: 'Workforce Mgmt', score: 94, rationale: 'Kronos heritage shows: arguably the best enterprise WFM on the market for frontline scheduling, labor forecasting, and compliance. Still the primary reason enterprises pick UKG.' },
      { label: 'Analytics', score: 84, rationale: 'UKG Bryte AI and embedded dashboards are credible, but analytics still trails Workday Prism for cross-domain storytelling and predictive modeling.' },
      { label: 'Global', score: 80, rationale: 'Immedis acquisition and expanded global payroll partnerships are closing the gap, though SAP and Oracle still win the most complex multi-country deals.' },
    ],
    idealCustomer: {
      size: '1,000–50,000 employees',
      industries: ['Healthcare', 'Retail', 'Manufacturing', 'Hospitality'],
      useCase: 'Mid-to-large employers in shift-heavy industries needing powerful workforce scheduling alongside payroll',
    },
    integrations: ['Microsoft Teams', 'Salesforce', 'ADP', 'ServiceNow', 'Workato', 'Kronos (legacy)'],
    news: [
      { headline: 'UKG Pro integrates Great Place To Work culture data directly into its HCM dashboard', date: 'Feb 2026', source: 'UKG Newsroom' },
      { headline: 'UKG cuts 950 jobs — 6% of workforce — as AI-driven restructuring hits frontline and Canadian staff', date: 'Apr 2026', source: 'HR Executive' },
      { headline: 'UKG acquires workforce analytics firm Immedis to strengthen global payroll intelligence', date: 'Mar 2026', source: 'Business Wire' },
    ],
    financialHealth: {
      fundingStage: 'Private (PE-backed: Hellman & Friedman, Blackstone)',
      headcountTrend: '+8% YoY',
      acquisitionRisk: 'Medium',
      keySignals: [
        'Estimated $6B+ revenue, IPO rumored for 2026–2027',
        'Continued integration of Kronos and Ultimate Software platforms',
        'Investing heavily in UKG Pro WFM unified experience',
      ],
    },
    supportQuality: {
      overallScore: 74,
      responseTime: '< 8 hours (standard), < 2 hours (premium)',
      channels: ['Phone', 'Email', 'Chat', 'UKG Community'],
      dedicatedCsm: 'Yes, at 500+ employees',
      supportTrend: 'Improving',
      highlights: [
        { text: 'UKG support has gotten noticeably better in the last year. Our CSM actually knows our configuration.', role: 'Payroll Manager' },
        { text: 'Phone support is solid. Chat can be frustrating for complex issues — they escalate quickly but resolution takes time.', role: 'HR Director' },
      ],
    },
  },

  'adp': {
    capabilities: [
      { label: 'Core HR', score: 85, rationale: 'Capable HR system of record across Workforce Now, Vantage, and the newer Lyric platform, but the fragmented portfolio creates inconsistency depending on which product a customer lands on.' },
      { label: 'Payroll', score: 97, rationale: 'The undisputed payroll leader: processes roughly 1 in 6 US paychecks, with unmatched tax compliance, jurisdictional coverage, and audit defensibility. This is why customers stay.' },
      { label: 'Benefits', score: 86, rationale: 'One of the largest benefits marketplaces and carrier networks in the industry, with strong ACA and COBRA tooling. UX in benefits modules can feel dated.' },
      { label: 'Workforce Mgmt', score: 80, rationale: 'Solid time and attendance, though scheduling and labor forecasting lag behind UKG and Dayforce for complex shift operations.' },
      { label: 'Analytics', score: 76, rationale: 'ADP DataCloud offers massive benchmarking data thanks to scale, but the analytics experience itself is less modern than Workday or Visier-powered competitors.' },
      { label: 'Global', score: 90, rationale: 'Native payroll and compliance in dozens of countries through ADP GlobalView and Celergo, making it one of the few credible options for true multi-country payroll.' },
    ],
    idealCustomer: {
      size: '500–100,000+ employees',
      industries: ['Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Government'],
      useCase: 'Enterprises requiring best-in-class payroll compliance and multi-country payroll at scale',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'Oracle HCM', 'QuickBooks', 'Microsoft Teams', 'Salesforce'],
    news: [
      { headline: 'ADP launches generative AI assistant for payroll specialists to reduce query resolution time by 40%', date: 'Jan 2026', source: 'ADP Newsroom' },
      { headline: 'ADP DataCloud adds real-time compensation benchmarking for 140+ job families', date: 'Mar 2026', source: 'ADP Newsroom' },
      { headline: 'ADP reports record Q2 FY2026 new business bookings, citing demand for compliance automation', date: 'Feb 2026', source: 'ADP Investor Relations' },
    ],
    financialHealth: {
      fundingStage: 'Public (NASDAQ: ADP)',
      headcountTrend: '+2% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'FY2025 revenue $19.2B, steady 6% growth',
        'ADP Lyric next-gen HCM platform rolling out to mid-market',
        'Massive data advantage from processing 1 in 6 US paychecks',
      ],
    },
    supportQuality: {
      overallScore: 62,
      responseTime: '< 24 hours (standard), same-day (dedicated rep)',
      channels: ['Phone', 'Email', 'Chat', 'ADP Bridge Portal'],
      dedicatedCsm: 'Yes, at 50+ employees (varies by product tier)',
      supportTrend: 'Stable',
      highlights: [
        { text: 'If you have a dedicated rep, the experience is good. If you call the general line, prepare to wait and re-explain your setup.', role: 'Payroll Director' },
        { text: 'Tax filing support is excellent — that team knows their stuff. Product support for the platform itself is inconsistent.', role: 'HR Manager' },
      ],
    },
  },

  'sap-successfactors': {
    capabilities: [
      { label: 'Core HR', score: 90, rationale: 'Employee Central is a mature system of record with deep configurability for complex global organizations. The UX is aging and implementations remain professional-services-heavy.' },
      { label: 'Payroll', score: 84, rationale: 'Employee Central Payroll inherits SAP HCM localization depth across 40+ countries, but modernization of the payroll engine has lagged cloud-native competitors.' },
      { label: 'Benefits', score: 80, rationale: 'Workable in global benefits scenarios but most US customers pair it with specialist vendors. Not the reason anyone buys SuccessFactors.' },
      { label: 'Workforce Mgmt', score: 82, rationale: 'Time and attendance is competent and improving through the SAP Time Tracking module, but does not match Kronos or Dayforce for operational scheduling.' },
      { label: 'Analytics', score: 87, rationale: 'Strong people analytics heritage and tight integration with SAP Analytics Cloud. Talent intelligence is a real strength when paired with the broader HXM suite.' },
      { label: 'Global', score: 95, rationale: 'Arguably the best global footprint in HCM: unmatched localization, compliance, and multi-country data residency. This is the primary reason global enterprises pick SuccessFactors.' },
    ],
    idealCustomer: {
      size: '5,000+ employees',
      industries: ['Manufacturing', 'Energy', 'Financial Services', 'Public Sector'],
      useCase: 'Global enterprises already on SAP ERP seeking tight HCM integration and multi-country compliance',
    },
    integrations: ['SAP S/4HANA', 'Microsoft Teams', 'Concur', 'Qualtrics', 'ServiceNow', 'Okta'],
    news: [
      { headline: 'SAP SuccessFactors embeds Joule AI copilot across all HCM modules for real-time HR guidance', date: 'Feb 2026', source: 'SAP Newsroom' },
      { headline: 'SAP SuccessFactors 1H 2026 release expands agentic AI suite-wide and adds EU pay transparency reporting tools', date: 'Apr 2026', source: 'SAP News Center' },
      { headline: 'SmartRecruiters now integrated with SAP SuccessFactors with single login, unified navigation, and aligned data', date: 'Apr 2026', source: 'SAP News Center' },
    ],
    financialHealth: {
      fundingStage: 'Public (NYSE: SAP)',
      headcountTrend: '-4% YoY',
      recentLayoffs: 'SAP restructured 8,000 roles globally — Jan 2024',
      acquisitionRisk: 'Low',
      keySignals: [
        'SAP cloud revenue grew 25% in Q4 2025',
        'Heavy investment in RISE with SAP and BTP integration',
        'SuccessFactors being repositioned as part of broader SAP HXM suite',
      ],
    },
    supportQuality: {
      overallScore: 58,
      responseTime: '24–72 hours (standard), < 8 hours (premium)',
      channels: ['Email', 'Phone', 'SAP ONE Support Portal'],
      dedicatedCsm: 'Yes, at enterprise contracts ($500K+)',
      supportTrend: 'Declining',
      highlights: [
        { text: 'Support tickets bounce between teams. Getting to someone who understands your specific configuration takes persistence.', role: 'SAP HCM Lead' },
        { text: 'The knowledge base is deep if you can find what you need. Direct support is hit-or-miss depending on the agent.', role: 'HR Technology Director' },
      ],
    },
  },

  'oracle-hcm-cloud': {
    capabilities: [
      { label: 'Core HR', score: 89, rationale: 'Deep, configurable HR system built on the Fusion data model, shared with Oracle ERP. Power comes at the cost of complex setup and a steep learning curve.' },
      { label: 'Payroll', score: 85, rationale: 'Native Oracle Payroll is expanding its country coverage steadily, with strong integration to Fusion Financials. Less mature than ADP or SAP in complex multi-country scenarios.' },
      { label: 'Benefits', score: 83, rationale: 'Flexible benefits engine that handles complex eligibility rules well, though customer-reported UX and administration complexity drag the score down.' },
      { label: 'Workforce Mgmt', score: 81, rationale: 'Functional time and labor module, but not a category leader for shift-based operations. Customers in frontline industries usually pair it with a specialist WFM.' },
      { label: 'Analytics', score: 88, rationale: 'Oracle Analytics Cloud and Autonomous Data Warehouse give HCM Cloud real advantages in embedded analytics and predictive insights when the broader Oracle stack is in place.' },
      { label: 'Global', score: 92, rationale: 'Among the strongest global HCM footprints, with broad localization and a shared data model across HR and finance. Complex to configure for multinationals but powerful once live.' },
    ],
    idealCustomer: {
      size: '5,000+ employees',
      industries: ['Financial Services', 'Healthcare', 'Retail', 'Technology'],
      useCase: 'Large organisations seeking a fully integrated Oracle Cloud ERP and HCM stack',
    },
    integrations: ['Oracle ERP Cloud', 'Salesforce', 'Microsoft Teams', 'Taleo', 'ServiceNow', 'Okta'],
    news: [
      { headline: 'Oracle launches Fusion Agentic Applications for HR — 1,000+ AI agents now embedded across HCM at no extra cost', date: 'Apr 2026', source: 'UC Today' },
      { headline: 'Oracle announces deep integration between HCM Cloud and Oracle Analytics Cloud for workforce insights', date: 'Mar 2026', source: 'Oracle Newsroom' },
      { headline: 'Oracle HCM Cloud adds payroll support for 12 Asia-Pacific countries in latest release', date: 'Feb 2026', source: 'Oracle Blog' },
    ],
    financialHealth: {
      fundingStage: 'Public (NYSE: ORCL)',
      headcountTrend: '+3% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Oracle Cloud revenue crossed $25B annualized run rate',
        'Aggressive OCI infrastructure expansion fueling HCM growth',
        'Cerner acquisition driving healthcare vertical HCM bundling',
      ],
    },
    supportQuality: {
      overallScore: 55,
      responseTime: '24–48 hours (standard), < 4 hours (Severity 1)',
      channels: ['My Oracle Support Portal', 'Phone', 'Chat'],
      dedicatedCsm: 'Yes, at enterprise tier',
      supportTrend: 'Stable',
      highlights: [
        { text: 'You need to learn the Oracle support system. Once you know how to file tickets properly, response improves significantly.', role: 'HRIS Analyst' },
        { text: 'Quarterly updates break customizations regularly and support takes too long to acknowledge the issue.', role: 'VP People Operations' },
      ],
    },
  },

  'ceridian-dayforce': {
    capabilities: [
      { label: 'Core HR', score: 88, rationale: 'Unified single-database architecture keeps employee data consistent across HR, payroll, and WFM without the sync issues that plague multi-module suites.' },
      { label: 'Payroll', score: 91, rationale: 'Continuous gross-to-net calculation is a genuine differentiator, eliminating end-of-period batch windows and surfacing pay errors in real time. Canadian federal contract validates the payroll engine at scale.' },
      { label: 'Benefits', score: 85, rationale: 'Competent benefits admin tightly coupled to the payroll engine, though the benefits marketplace is smaller than ADP or Workday partners.' },
      { label: 'Workforce Mgmt', score: 92, rationale: 'Best-in-class scheduling and labor forecasting for hourly workforces, with real-time labor cost visibility thanks to continuous payroll. Core strength for retail, hospitality, and healthcare.' },
      { label: 'Analytics', score: 83, rationale: 'Solid operational reporting and improving AI layer, but people analytics trails Workday Prism for talent intelligence and strategic workforce planning.' },
      { label: 'Global', score: 82, rationale: 'Strong North American payroll coverage and expanding internationally, but global footprint still trails SAP, Oracle, and ADP at the enterprise tier.' },
    ],
    idealCustomer: {
      size: '1,000–25,000 employees',
      industries: ['Retail', 'Healthcare', 'Hospitality', 'Manufacturing'],
      useCase: 'Mid-market employers needing real-time payroll calculation alongside advanced scheduling',
    },
    integrations: ['Microsoft Teams', 'Workato', 'PowerBI', 'Salesforce', 'Okta', 'ADP'],
    news: [
      { headline: 'Dayforce launches Co-Pilot, an AI assistant for managers to handle schedule exceptions in real time', date: 'Feb 2026', source: 'Dayforce Newsroom' },
      { headline: 'Dayforce reports 22% YoY cloud revenue growth driven by new enterprise wins in healthcare', date: 'Jan 2026', source: 'Dayforce Investor Relations' },
      { headline: 'Canadian federal government awards Dayforce $350M contract to replace troubled Phoenix payroll system', date: 'Apr 2026', source: 'Globe and Mail' },
    ],
    financialHealth: {
      fundingStage: 'Private (PE: Thoma Bravo — acquired Feb 2026, $12.3B)',
      headcountTrend: '+7% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Taken private by Thoma Bravo in Feb 2026 for $12.3B — delisted from NYSE and TSX',
        'Cloud revenue $1.2B, up 22% YoY at time of acquisition',
        'Aggressively expanding global payroll capabilities under PE ownership',
      ],
    },
    supportQuality: {
      overallScore: 65,
      responseTime: '< 12 hours (standard), < 4 hours (premium)',
      channels: ['Phone', 'Email', 'Dayforce Hub Portal'],
      dedicatedCsm: 'Yes, at enterprise tier (750+ employees)',
      supportTrend: 'Stable',
      highlights: [
        { text: 'The Dayforce Hub has improved self-service dramatically. Most common issues we can resolve ourselves now.', role: 'HRIS Manager' },
        { text: 'Implementation support was rocky but ongoing product support has been solid once you learn the system.', role: 'VP Human Resources' },
      ],
    },
  },

  'paychex': {
    capabilities: [
      { label: 'Core HR', score: 80 },
      { label: 'Payroll', score: 92 },
      { label: 'Benefits', score: 84 },
      { label: 'Workforce Mgmt', score: 75 },
      { label: 'Analytics', score: 68 },
      { label: 'Global', score: 55 },
    ],
    idealCustomer: {
      size: '10–500 employees',
      industries: ['Professional Services', 'Healthcare', 'Construction', 'Retail'],
      useCase: 'Small businesses seeking reliable payroll and HR backed by dedicated service reps',
    },
    integrations: ['QuickBooks', 'Xero', 'Indeed', 'Microsoft 365', 'Google Workspace', 'Clover'],
    news: [
      { headline: 'Paychex launches AI-powered HR Advisor to give small business owners instant compliance guidance', date: 'Feb 2026', source: 'Paychex Newsroom' },
      { headline: 'Paychex Flex adds earned wage access feature in partnership with DailyPay', date: 'Jan 2026', source: 'Paychex Newsroom' },
      { headline: 'Paychex acquires Oasis HR to deepen PEO offering for professional employer services market', date: 'Nov 2025', source: 'Business Wire' },
    ],
    financialHealth: {
      fundingStage: 'Public (NASDAQ: PAYX)',
      headcountTrend: '+3% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'FY2025 revenue $5.3B with steady margin expansion',
        'Strong SMB retention through bundled HR + payroll offering',
        'Investing in AI-powered compliance and tax automation',
      ],
    },
    supportQuality: {
      overallScore: 68,
      responseTime: '< 24 hours (standard), same-day (dedicated rep)',
      channels: ['Phone', 'Email', 'Chat'],
      dedicatedCsm: 'Yes, at 50+ employees',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Our dedicated payroll specialist knows our setup inside and out. General support is slower but competent.', role: 'Office Manager' },
        { text: 'Tax filing support is strong. Getting help with the newer HR features takes longer than it should.', role: 'HR Administrator' },
      ],
    },
  },

  'infor-hcm': {
    capabilities: [
      { label: 'Core HR', score: 82 },
      { label: 'Payroll', score: 78 },
      { label: 'Benefits', score: 74 },
      { label: 'Workforce Mgmt', score: 85 },
      { label: 'Analytics', score: 76 },
      { label: 'Global', score: 80 },
    ],
    idealCustomer: {
      size: '2,000–50,000 employees',
      industries: ['Manufacturing', 'Distribution', 'Healthcare', 'Hospitality'],
      useCase: 'Organisations already on Infor ERP looking for tightly embedded workforce management',
    },
    integrations: ['Infor CloudSuite', 'Microsoft Teams', 'Salesforce', 'ServiceNow', 'Okta', 'ADP'],
    news: [
      { headline: 'Infor HCM embeds Coleman AI across workforce management for predictive scheduling recommendations', date: 'Jan 2026', source: 'Infor Newsroom' },
      { headline: 'Infor expands global payroll coverage to 35 countries with new CloudSuite HCM release', date: 'Mar 2026', source: 'Infor Newsroom' },
      { headline: 'Infor HCM earns top marks in Gartner Magic Quadrant for Cloud HCM Suites, improving in Ability to Execute', date: 'Dec 2025', source: 'Gartner' },
    ],
    financialHealth: {
      fundingStage: 'Private (Koch Industries subsidiary)',
      headcountTrend: 'Stable',
      acquisitionRisk: 'Low',
      keySignals: [
        'Backed by Koch Industries — no funding pressure',
        'Industry-specific focus (manufacturing, healthcare, hospitality) is a moat',
        'Cloud migration still underway from legacy on-prem installs',
      ],
    },
    supportQuality: {
      overallScore: 56,
      responseTime: '24–48 hours (standard)',
      channels: ['Infor Support Portal', 'Phone', 'Email'],
      dedicatedCsm: 'Yes, at enterprise tier',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Support knows the manufacturing-specific modules well. Generic HR questions get routed around too much.', role: 'HRIS Manager' },
        { text: 'The support portal is functional but dated. Phone support is better for urgent payroll issues.', role: 'HR Director' },
      ],
    },
  },

  'darwinbox': {
    capabilities: [
      { label: 'Core HR', score: 85 },
      { label: 'Payroll', score: 82 },
      { label: 'Benefits', score: 76 },
      { label: 'Workforce Mgmt', score: 78 },
      { label: 'Analytics', score: 80 },
      { label: 'Global', score: 72 },
    ],
    idealCustomer: {
      size: '500–20,000 employees',
      industries: ['Technology', 'BFSI', 'Retail', 'Manufacturing'],
      useCase: 'Asia-Pacific enterprises seeking a mobile-first HCM built for emerging-market workforce complexity',
    },
    integrations: ['Microsoft Teams', 'Slack', 'SAP', 'Salesforce', 'Workato', 'Zoho'],
    news: [
      { headline: 'Darwinbox launches GenAI HR assistant in 14 languages for frontline worker accessibility', date: 'Jan 2026', source: 'Darwinbox Blog' },
      { headline: 'Darwinbox surpasses 3 million employees managed on platform, doubling from 2024', date: 'Mar 2026', source: 'Darwinbox Newsroom' },
      { headline: 'Darwinbox raises $40M from Ontario Teachers to accelerate North America expansion and AI features', date: 'Apr 2026', source: 'Outlook Business' },
    ],
    financialHealth: {
      fundingStage: 'Private (Series D)',
      lastRaise: '$72M Series D — Jan 2024',
      headcountTrend: '+25% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Fastest-growing HCM platform in Asia-Pacific market',
        'Expanding into Middle East, Southeast Asia, and Europe',
        'Strong backing from Technology Crossover Ventures and Salesforce Ventures',
      ],
    },
    supportQuality: {
      overallScore: 73,
      responseTime: '< 8 hours (all tiers)',
      channels: ['Email', 'Chat', 'Phone', 'WhatsApp'],
      dedicatedCsm: 'Yes, at 500+ employees',
      supportTrend: 'Improving',
      highlights: [
        { text: 'Support is responsive and the team genuinely wants to solve problems. Product knowledge is strong for the core modules.', role: 'HR Manager' },
        { text: 'WhatsApp support channel is surprisingly effective for quick questions. Complex issues still need email escalation.', role: 'People Ops Lead' },
      ],
    },
  },

  'namely': {
    capabilities: [
      { label: 'Core HR', score: 78 },
      { label: 'Payroll', score: 75 },
      { label: 'Benefits', score: 79 },
      { label: 'Workforce Mgmt', score: 65 },
      { label: 'Analytics', score: 62 },
      { label: 'Global', score: 45 },
    ],
    idealCustomer: {
      size: '50–1,000 employees',
      industries: ['Media', 'Technology', 'Professional Services', 'Nonprofit'],
      useCase: 'Mid-sized companies wanting a modern, people-centric HR platform with managed payroll services',
    },
    integrations: ['Slack', 'QuickBooks', 'Indeed', 'LinkedIn', 'Google Workspace', 'Greenhouse'],
    news: [
      { headline: 'Namely relaunches with refreshed UI and AI-driven HR insights dashboard for people managers', date: 'Jan 2026', source: 'Namely Blog' },
      { headline: 'Namely expands managed payroll service to include benefits administration concierge', date: 'Mar 2026', source: 'Namely Newsroom' },
      { headline: 'Namely partners with Ease to deliver enhanced benefits enrollment experience for SMB clients', date: 'Nov 2025', source: 'Business Wire' },
    ],
    financialHealth: {
      fundingStage: 'Private (PE-backed: Vistria Group)',
      headcountTrend: '-12% YoY',
      recentLayoffs: 'Multiple rounds of reductions in 2023–2024',
      acquisitionRisk: 'High',
      keySignals: [
        'Acquired by Vistria Group in 2022 after financial struggles',
        'Product development has slowed significantly',
        'Existing customer base is sticky but new sales momentum is low',
      ],
    },
    supportQuality: {
      overallScore: 52,
      responseTime: '24–48 hours (standard)',
      channels: ['Email', 'Phone', 'Help Center'],
      dedicatedCsm: 'No — pooled support model',
      supportTrend: 'Declining',
      highlights: [
        { text: 'Support used to be a differentiator. Now it feels understaffed — longer waits, less product knowledge.', role: 'HR Director' },
        { text: 'Basic payroll and benefits questions get answered fine. Anything involving configuration or integrations is a struggle.', role: 'People Ops Manager' },
      ],
    },
  },

  // ─── ATS ───────────────────────────────────────────────────────────────────

  'greenhouse': {
    capabilities: [
      { label: 'Sourcing', score: 82, rationale: 'Competent sourcing with strong LinkedIn and job-board integrations, but sourcing has never been Greenhouse\'s primary identity compared to dedicated tools like HireEZ or Gem.' },
      { label: 'Pipeline Mgmt', score: 94, rationale: 'Category-defining structured-hiring workflow: stages, scorecards, and approvals that enforce hiring discipline. The reason most talent teams pick Greenhouse in the first place.' },
      { label: 'Interview Tools', score: 91, rationale: 'Interview kits and scorecards are the industry standard for structured, consistent interviewing. DEI-friendly by design, with strong calibration tooling.' },
      { label: 'Reporting', score: 88, rationale: 'Rich funnel and source-of-hire analytics with benchmark data from thousands of customers. Custom reporting is improving but still a common reason teams add BI tools on top.' },
      { label: 'Candidate CX', score: 87, rationale: 'Clean candidate experience with well-designed scheduling, communication, and feedback loops. Video interviewing is now native after the recent Zoom integration.' },
      { label: 'Integrations', score: 95, rationale: 'Largest recruiting integration marketplace in the industry, with deep partnerships across HRIS, assessments, and sourcing tools. A major switching cost for customers considering compound HRIS alternatives.' },
    ],
    idealCustomer: {
      size: '200–10,000 employees',
      industries: ['Technology', 'Financial Services', 'Media', 'Professional Services'],
      useCase: 'Structured-hiring teams that prioritise DEI data, interview kits, and a rich integration ecosystem',
    },
    integrations: ['Slack', 'LinkedIn', 'Workday', 'BambooHR', 'HireEZ', 'DocuSign'],
    news: [
      { headline: 'Greenhouse launches AI Principles Framework, setting standard for responsible hiring in the AI era', date: 'Apr 2026', source: 'PR Newswire' },
      { headline: 'Greenhouse adds native video interviewing powered by Zoom directly in the candidate pipeline', date: 'Mar 2026', source: 'Greenhouse Blog' },
      { headline: 'Greenhouse ranked #1 ATS in G2 Spring 2026 Reports across Overall, Enterprise, Mid-Market, and EMEA', date: 'Apr 2026', source: 'PR Newswire' },
    ],
    financialHealth: {
      fundingStage: 'Private (Venture-backed)',
      lastRaise: '$150M Series E — 2022',
      headcountTrend: '-10% YoY',
      recentLayoffs: 'Reduced workforce by ~18% — Jan 2024',
      acquisitionRisk: 'High',
      keySignals: [
        'Market leader in structured hiring but facing margin pressure',
        'Competing with free ATS tiers from HRIS platforms (Rippling, BambooHR)',
        'Strong enterprise brand but SMB churn increasing',
      ],
    },
    supportQuality: {
      overallScore: 76,
      responseTime: '< 8 hours (all plans), < 2 hours (enterprise)',
      channels: ['Email', 'Chat', 'Phone (enterprise only)'],
      dedicatedCsm: 'Yes, at enterprise plan',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Greenhouse support knows recruiting workflows deeply. They suggest configuration changes, not just answers.', role: 'Talent Acquisition Lead' },
        { text: 'No phone support on the standard plan is frustrating when you have urgent hiring issues during peak season.', role: 'Recruiting Manager' },
      ],
    },
  },

  'lever': {
    capabilities: [
      { label: 'Sourcing', score: 84 },
      { label: 'Pipeline Mgmt', score: 88 },
      { label: 'Interview Tools', score: 83 },
      { label: 'Reporting', score: 82 },
      { label: 'Candidate CX', score: 85 },
      { label: 'Integrations', score: 86 },
    ],
    idealCustomer: {
      size: '100–5,000 employees',
      industries: ['Technology', 'SaaS', 'Fintech', 'Healthcare'],
      useCase: 'Growth-stage tech companies wanting a combined ATS and CRM for talent relationship management',
    },
    integrations: ['Slack', 'LinkedIn', 'Rippling', 'BambooHR', 'DocuSign', 'Zoom'],
    news: [
      { headline: 'Lever releases AI candidate summaries and smart outreach templates to reduce time-to-first-contact', date: 'Jan 2026', source: 'Lever Blog' },
      { headline: 'Lever integrates with Handshake to help companies recruit directly from university career portals', date: 'Feb 2026', source: 'Lever Newsroom' },
      { headline: 'Lever named a Leader in Forrester Wave for Talent Acquisition Suites, Q1 2026', date: 'Mar 2026', source: 'Forrester Research' },
    ],
    financialHealth: {
      fundingStage: 'Private (Acquired by Employ Inc.)',
      headcountTrend: '-8% YoY',
      acquisitionRisk: 'Medium',
      keySignals: [
        'Merged with JazzHR and Jobvite under Employ Inc. umbrella in 2022',
        'Integration of three platforms creating uncertainty for existing customers',
        'Product roadmap influenced by parent company priorities',
      ],
    },
    supportQuality: {
      overallScore: 66,
      responseTime: '< 12 hours (standard), < 4 hours (enterprise)',
      channels: ['Email', 'Chat', 'Phone (enterprise only)'],
      dedicatedCsm: 'Yes, at enterprise plan',
      supportTrend: 'Declining',
      highlights: [
        { text: 'Support quality has dipped since the Employ acquisition. Agents are less familiar with Lever-specific workflows.', role: 'Talent Acquisition Manager' },
        { text: 'Chat support is responsive for basic questions. Reporting and integration issues take multiple back-and-forths.', role: 'Recruiting Coordinator' },
      ],
    },
  },

  'icims': {
    capabilities: [
      { label: 'Sourcing', score: 83 },
      { label: 'Pipeline Mgmt', score: 90 },
      { label: 'Interview Tools', score: 84 },
      { label: 'Reporting', score: 87 },
      { label: 'Candidate CX', score: 83 },
      { label: 'Integrations', score: 91 },
    ],
    idealCustomer: {
      size: '1,000–50,000 employees',
      industries: ['Healthcare', 'Retail', 'Manufacturing', 'Government'],
      useCase: 'Enterprises with high-volume hiring needs seeking enterprise-grade compliance and configurability',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'LinkedIn', 'Microsoft Teams', 'Paradox', 'DocuSign'],
    news: [
      { headline: 'iCIMS named Best Comprehensive TA Solution by Lighthouse for third year; TechTarget lists Top AI Recruiting Tool', date: 'Apr 2026', source: 'PR Newswire' },
      { headline: 'iCIMS Talent Cloud surpasses 600 enterprise customers and 4M annual hires processed', date: 'Mar 2026', source: 'iCIMS Newsroom' },
      { headline: 'iCIMS Copilot AI recruiting assistant debuts at HR Tech — automates JD optimization and interview guides', date: 'Apr 2026', source: 'iCIMS Newsroom' },
    ],
    financialHealth: {
      fundingStage: 'Private (PE-backed: Vista Equity, TA Associates)',
      headcountTrend: '+5% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Estimated $400M+ ARR with strong enterprise foothold',
        'Acquired multiple point solutions (TextRecruit, Altru, SkillSurvey)',
        'IPO candidate in the medium term',
      ],
    },
    supportQuality: {
      overallScore: 63,
      responseTime: '< 24 hours (standard), < 8 hours (premium)',
      channels: ['Email', 'Phone', 'iCIMS Community Portal'],
      dedicatedCsm: 'Yes, at enterprise tier',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Enterprise support is solid — our CSM is proactive about upcoming changes. Standard tier is more reactive.', role: 'TA Operations Manager' },
        { text: 'The community portal has good content but direct support for complex integrations can be slow.', role: 'Recruiting Director' },
      ],
    },
  },

  'workable': {
    capabilities: [
      { label: 'Sourcing', score: 82 },
      { label: 'Pipeline Mgmt', score: 85 },
      { label: 'Interview Tools', score: 80 },
      { label: 'Reporting', score: 75 },
      { label: 'Candidate CX', score: 81 },
      { label: 'Integrations', score: 78 },
    ],
    idealCustomer: {
      size: '10–500 employees',
      industries: ['Technology', 'Retail', 'Hospitality', 'Professional Services'],
      useCase: 'Small and mid-sized businesses wanting a self-serve ATS with built-in AI sourcing and job boards',
    },
    integrations: ['Slack', 'LinkedIn', 'Indeed', 'Google Workspace', 'BambooHR', 'Zapier'],
    news: [
      { headline: 'Workable introduces AI Resume Screening with explainability scores to help SMB recruiters prioritise candidates', date: 'Jan 2026', source: 'Workable Blog' },
      { headline: 'Workable launches HR suite adding onboarding, time off, and employee directory modules', date: 'Feb 2026', source: 'Workable Newsroom' },
      { headline: 'Workable reaches 30,000 customers across 100 countries, reports 28% growth in APAC', date: 'Mar 2026', source: 'Workable Newsroom' },
    ],
    financialHealth: {
      fundingStage: 'Private (Venture-backed)',
      lastRaise: '$50M Series C — 2022',
      headcountTrend: '-5% YoY',
      acquisitionRisk: 'Medium',
      keySignals: [
        'Expanding from ATS into full HR suite (payroll, time off, onboarding)',
        'Competing on price in a crowded SMB market',
        'Profitable or near-profitable — not burning cash aggressively',
      ],
    },
    supportQuality: {
      overallScore: 74,
      responseTime: '< 8 hours (all plans)',
      channels: ['Email', 'Chat', 'Phone (premium only)'],
      dedicatedCsm: 'No — pooled support model',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Chat support is fast and the agents know the product well. Self-service help docs are also excellent.', role: 'Hiring Manager' },
        { text: 'For the price point, support quality is above average. They just don\'t offer phone support on the lower tiers.', role: 'HR Coordinator' },
      ],
    },
  },

  'ashby': {
    capabilities: [
      { label: 'Sourcing', score: 78 },
      { label: 'Pipeline Mgmt', score: 87 },
      { label: 'Interview Tools', score: 85 },
      { label: 'Reporting', score: 91 },
      { label: 'Candidate CX', score: 83 },
      { label: 'Integrations', score: 80 },
    ],
    idealCustomer: {
      size: '50–2,000 employees',
      industries: ['Technology', 'Fintech', 'AI/ML', 'SaaS'],
      useCase: 'Data-driven recruiting teams at tech-first companies that need granular hiring analytics out of the box',
    },
    integrations: ['Slack', 'LinkedIn', 'Greenhouse', 'Rippling', 'Notion', 'Gem'],
    news: [
      { headline: 'Ashby raises $30M Series C to build AI-native ATS for analytics-obsessed recruiting teams', date: 'Jan 2026', source: 'TechCrunch' },
      { headline: 'Ashby launches Benchmark product giving companies real-time hiring funnel comparisons by industry and role', date: 'Feb 2026', source: 'Ashby Blog' },
      { headline: 'Ashby surpasses 1,500 paying customers, with notable wins at Notion, Vercel, and Stripe', date: 'Mar 2026', source: 'Ashby Newsroom' },
    ],
    financialHealth: {
      fundingStage: 'Private (Series C)',
      lastRaise: '$30M Series C — 2024',
      headcountTrend: '+40% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Fastest-growing ATS in the mid-market with strong word-of-mouth',
        'Analytics-first approach differentiating from legacy ATS players',
        'Expanding beyond ATS into scheduling, CRM, and onboarding',
      ],
    },
    supportQuality: {
      overallScore: 85,
      responseTime: '< 4 hours (all plans)',
      channels: ['Email', 'Chat', 'Slack (enterprise)'],
      dedicatedCsm: 'Yes, at Growth plan and above',
      supportTrend: 'Improving',
      highlights: [
        { text: 'Best support I\'ve experienced from any HR vendor. They treat every customer like enterprise.', role: 'Head of Talent' },
        { text: 'Slack-based support for enterprise customers is a game changer. Real-time help during peak hiring.', role: 'Recruiting Operations Manager' },
      ],
    },
  },

  'smartrecruiters': {
    capabilities: [
      { label: 'Sourcing', score: 84 },
      { label: 'Pipeline Mgmt', score: 88 },
      { label: 'Interview Tools', score: 81 },
      { label: 'Reporting', score: 83 },
      { label: 'Candidate CX', score: 86 },
      { label: 'Integrations', score: 87 },
    ],
    idealCustomer: {
      size: '1,000–20,000 employees',
      industries: ['Retail', 'Healthcare', 'Technology', 'Financial Services'],
      useCase: 'Global enterprises seeking a Talent Acquisition Suite with marketplace of 600+ partner integrations',
    },
    integrations: ['SAP SuccessFactors', 'Workday', 'LinkedIn', 'Microsoft Teams', 'Docusign', 'Paradox'],
    news: [
      { headline: 'SmartRecruiters launches SmartAssistant AI to automate candidate screening and scheduling across 40 languages', date: 'Feb 2026', source: 'SmartRecruiters Newsroom' },
      { headline: 'SmartRecruiters expands SmartCRM module with predictive talent pipeline forecasting capabilities', date: 'Mar 2026', source: 'SmartRecruiters Blog' },
      { headline: 'SmartRecruiters unveils autonomous AI hiring agents and deep SAP SuccessFactors integration', date: 'Apr 2026', source: 'Globe Newswire' },
    ],
    financialHealth: {
      fundingStage: 'Private (Venture-backed)',
      lastRaise: '$110M Series E — 2021',
      headcountTrend: '-7% YoY',
      recentLayoffs: 'Reduced workforce ~10% — 2023',
      acquisitionRisk: 'Medium',
      keySignals: [
        'Strong enterprise client base but growth has slowed',
        'Marketplace model differentiates but adds integration complexity',
        'Potential M&A target as enterprise ATS market consolidates',
      ],
    },
    supportQuality: {
      overallScore: 64,
      responseTime: '< 24 hours (standard), < 8 hours (enterprise)',
      channels: ['Email', 'Phone', 'SmartRecruiters Community'],
      dedicatedCsm: 'Yes, at enterprise plan',
      supportTrend: 'Declining',
      highlights: [
        { text: 'Our CSM is great but the technical support behind them has thinned out. Escalations take longer than they used to.', role: 'TA Director' },
        { text: 'Marketplace integration issues are the most frustrating. Support points you to the partner, the partner points back.', role: 'Recruiting Operations Lead' },
      ],
    },
  },

  'jazzhr': {
    capabilities: [
      { label: 'Sourcing', score: 75 },
      { label: 'Pipeline Mgmt', score: 80 },
      { label: 'Interview Tools', score: 73 },
      { label: 'Reporting', score: 70 },
      { label: 'Candidate CX', score: 74 },
      { label: 'Integrations', score: 72 },
    ],
    idealCustomer: {
      size: '1–100 employees',
      industries: ['Small Business', 'Retail', 'Hospitality', 'Healthcare'],
      useCase: 'Very small businesses wanting affordable, easy-to-use applicant tracking with minimal setup',
    },
    integrations: ['Indeed', 'LinkedIn', 'QuickBooks', 'Google Workspace', 'Slack', 'Zapier'],
    news: [
      { headline: 'JazzHR introduces AI job description generator and candidate ranking for teams under 100 employees', date: 'Jan 2026', source: 'JazzHR Blog' },
      { headline: 'JazzHR integrates with Checkr for one-click background screening directly in the ATS', date: 'Feb 2026', source: 'JazzHR Newsroom' },
      { headline: 'JazzHR parent company Employ Inc. merges JazzHR, Lever, and NXTThing RPO into single platform offering', date: 'Mar 2026', source: 'Business Wire' },
    ],
    financialHealth: {
      fundingStage: 'Private (Acquired by Employ Inc.)',
      headcountTrend: 'Stable',
      acquisitionRisk: 'Medium',
      keySignals: [
        'Part of Employ Inc. alongside Lever and Jobvite',
        'Positioned as the SMB offering in the Employ portfolio',
        'Product roadmap dependent on Employ parent company strategy',
      ],
    },
    supportQuality: {
      overallScore: 70,
      responseTime: '< 12 hours (all plans)',
      channels: ['Email', 'Chat', 'Phone'],
      dedicatedCsm: 'No — pooled support',
      supportTrend: 'Stable',
      highlights: [
        { text: 'For the price, support is perfectly adequate. They resolve most issues within a day.', role: 'Office Manager' },
        { text: 'Don\'t expect white-glove service but the basics are covered. Help docs fill most gaps.', role: 'HR Generalist' },
      ],
    },
  },

  'bullhorn': {
    capabilities: [
      { label: 'Sourcing', score: 87 },
      { label: 'Pipeline Mgmt', score: 90 },
      { label: 'Interview Tools', score: 74 },
      { label: 'Reporting', score: 83 },
      { label: 'Candidate CX', score: 79 },
      { label: 'Integrations', score: 88 },
    ],
    idealCustomer: {
      size: '50–5,000 employees',
      industries: ['Staffing', 'Recruitment Agencies', 'Professional Services'],
      useCase: 'Staffing agencies and recruitment firms needing a combined ATS and CRM for high-velocity candidate placement',
    },
    integrations: ['LinkedIn', 'Salesforce', 'Microsoft Teams', 'DocuSign', 'HireRight', 'Sense'],
    news: [
      { headline: 'Bullhorn launches Bullhorn AI, embedding generative AI across sourcing, matching, and client management', date: 'Feb 2026', source: 'Bullhorn Newsroom' },
      { headline: 'Bullhorn acquires Textkernel to strengthen AI-powered candidate matching with semantic CV parsing', date: 'Jan 2026', source: 'Business Wire' },
      { headline: 'Bullhorn reports 18% growth in staffing agency customers, surpassing 10,000 clients globally', date: 'Mar 2026', source: 'Bullhorn Newsroom' },
    ],
    financialHealth: {
      fundingStage: 'Private (PE-backed: Insight Partners)',
      headcountTrend: '+6% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Dominant in staffing/recruiting agency market with 10,000+ customers',
        'Acquired Textkernel and Mployee for AI talent matching',
        'IPO candidate as staffing tech consolidates',
      ],
    },
    supportQuality: {
      overallScore: 66,
      responseTime: '< 24 hours (standard), < 4 hours (premium)',
      channels: ['Phone', 'Email', 'Bullhorn Community'],
      dedicatedCsm: 'Yes, at enterprise tier',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Support understands staffing workflows deeply. If you\'re a corporate recruiter using Bullhorn, the fit is awkward.', role: 'Staffing Agency Owner' },
        { text: 'Phone support is reliable for day-to-day issues. Custom report building requires professional services.', role: 'Operations Director' },
      ],
    },
  },

  'breezy-hr': {
    capabilities: [
      { label: 'Sourcing', score: 74 },
      { label: 'Pipeline Mgmt', score: 79 },
      { label: 'Interview Tools', score: 76 },
      { label: 'Reporting', score: 68 },
      { label: 'Candidate CX', score: 77 },
      { label: 'Integrations', score: 70 },
    ],
    idealCustomer: {
      size: '5–200 employees',
      industries: ['Technology', 'Healthcare', 'Retail', 'Nonprofit'],
      useCase: 'Lean HR teams needing a drag-and-drop pipeline ATS with video interviewing at an accessible price point',
    },
    integrations: ['Slack', 'LinkedIn', 'Indeed', 'Google Workspace', 'Zapier', 'Zoom'],
    news: [
      { headline: 'Breezy HR introduces AI Candidate Match Score to help small teams shortlist faster', date: 'Jan 2026', source: 'Breezy HR Blog' },
      { headline: 'Breezy HR adds custom careers page builder with employer branding templates', date: 'Feb 2026', source: 'Breezy HR Newsroom' },
      { headline: 'Breezy HR recognized in G2 Best Small Business ATS report for fifth straight quarter', date: 'Mar 2026', source: 'G2' },
    ],
    financialHealth: {
      fundingStage: 'Private (Bootstrapped / Small team)',
      headcountTrend: 'Stable',
      acquisitionRisk: 'High',
      keySignals: [
        'Small, lean team competing against well-funded ATS players',
        'Strong product-led growth among SMBs',
        'Potential acquisition target for larger HRIS/HCM platforms',
      ],
    },
    supportQuality: {
      overallScore: 77,
      responseTime: '< 8 hours (all plans)',
      channels: ['Email', 'Chat'],
      dedicatedCsm: 'No — pooled support',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Small team but they punch above their weight. Chat support feels personal and knowledgeable.', role: 'Hiring Manager' },
        { text: 'No phone support is the only gap. For the price, the responsiveness on chat and email is excellent.', role: 'HR Coordinator' },
      ],
    },
  },

  'oracle-taleo': {
    capabilities: [
      { label: 'Sourcing', score: 74 },
      { label: 'Pipeline Mgmt', score: 80 },
      { label: 'Interview Tools', score: 71 },
      { label: 'Reporting', score: 78 },
      { label: 'Candidate CX', score: 65 },
      { label: 'Integrations', score: 80 },
    ],
    idealCustomer: {
      size: '5,000+ employees',
      industries: ['Government', 'Healthcare', 'Financial Services', 'Energy'],
      useCase: 'Large enterprises with existing Oracle investments requiring legacy ATS stability and deep ERP integration',
    },
    integrations: ['Oracle HCM Cloud', 'Oracle ERP', 'SAP', 'LinkedIn', 'Kenexa', 'DocuSign'],
    news: [
      { headline: 'Oracle Taleo receives final end-of-life roadmap notice as Oracle migrates customers to Oracle Recruiting Cloud', date: 'Jan 2026', source: 'Oracle Newsroom' },
      { headline: 'Oracle offers incentivised migration credits for Taleo customers transitioning to Oracle HCM Cloud Recruiting', date: 'Feb 2026', source: 'Oracle Blog' },
      { headline: 'Oracle Taleo customer base drops below 2,000 as enterprise migrations to modern ATS accelerate', date: 'Mar 2026', source: 'HR Executive' },
    ],
    financialHealth: {
      fundingStage: 'Public (NYSE: ORCL)',
      headcountTrend: '+3% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Legacy product being sunset in favor of Oracle Recruiting (ORC)',
        'Existing customers being migrated to Oracle HCM Cloud',
        'New investment going into ORC, not Taleo',
      ],
    },
    supportQuality: {
      overallScore: 45,
      responseTime: '24–72 hours (standard)',
      channels: ['My Oracle Support Portal', 'Phone'],
      dedicatedCsm: 'Only for large Oracle HCM contracts',
      supportTrend: 'Declining',
      highlights: [
        { text: 'Taleo support feels like an afterthought. Oracle clearly wants everyone on ORC and it shows in the support priority.', role: 'TA Operations Manager' },
        { text: 'Simple ticket fixes take weeks. Complex issues require Oracle Consulting at billable rates.', role: 'HRIS Analyst' },
      ],
    },
  },

  'acme-staffing': {
    capabilities: [
      { label: 'Sourcing', score: 70 },
      { label: 'Pipeline Mgmt', score: 72 },
      { label: 'Interview Tools', score: 65 },
      { label: 'Reporting', score: 60 },
      { label: 'Candidate CX', score: 68 },
      { label: 'Integrations', score: 58 },
    ],
    idealCustomer: {
      size: '10–300 employees',
      industries: ['Staffing', 'Light Industrial', 'Administrative', 'Clerical'],
      useCase: 'Independent staffing agencies and temp firms needing straightforward candidate pipelines at low cost',
    },
    integrations: ['Indeed', 'LinkedIn', 'QuickBooks', 'Google Workspace', 'Zapier', 'SMS Magic'],
    news: [
      { headline: 'Acme Staffing Software launches mobile-first app for recruiters to manage pipelines on the go', date: 'Jan 2026', source: 'Acme Staffing Blog' },
      { headline: 'Acme Staffing adds AI-powered job description templates for light industrial and clerical roles', date: 'Feb 2026', source: 'Acme Staffing Newsroom' },
      { headline: 'Acme Staffing Software announces integration with ADP for seamless contractor payroll handoff', date: 'Mar 2026', source: 'Acme Staffing Newsroom' },
    ],
  },

  // ─── HRIS ──────────────────────────────────────────────────────────────────

  'hibob': {
    capabilities: [
      { label: 'Employee Records', score: 90 },
      { label: 'Onboarding', score: 88 },
      { label: 'Benefits Admin', score: 79 },
      { label: 'Compliance', score: 78 },
      { label: 'Self-Service', score: 91 },
      { label: 'Analytics', score: 84 },
    ],
    idealCustomer: {
      size: '100–3,000 employees',
      industries: ['Technology', 'Media', 'Professional Services', 'Fintech'],
      useCase: 'Modern, people-first companies seeking an HRIS that scales across multiple countries with strong engagement features',
    },
    integrations: ['Slack', 'LinkedIn', 'Greenhouse', 'Okta', 'Rippling', 'Carta'],
    news: [
      { headline: 'HiBob launches Bob AI, a conversational HR assistant for managers to get instant workforce insights', date: 'Feb 2026', source: 'HiBob Newsroom' },
      { headline: 'HiBob launches native US Payroll to cut complexity and drive confidence for SMBs', date: 'Apr 2026', source: 'HiBob Newsroom' },
      { headline: 'HiBob expands payroll integrations to cover 50 countries in partnership with Papaya Global', date: 'Mar 2026', source: 'HiBob Blog' },
    ],
    financialHealth: {
      fundingStage: 'Private (Series D)',
      lastRaise: '$150M Series D at $2.6B valuation — 2024',
      headcountTrend: '+15% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Well-funded with strong mid-market traction globally',
        'Expanding payroll capabilities market by market',
        'Differentiated UX and culture features driving word-of-mouth growth',
      ],
    },
    supportQuality: {
      overallScore: 78,
      responseTime: '< 8 hours (all plans)',
      channels: ['Chat', 'Email', 'Phone (premium)'],
      dedicatedCsm: 'Yes, at 200+ employees',
      supportTrend: 'Improving',
      highlights: [
        { text: 'Support team knows the product deeply and often suggests features we didn\'t know existed. Rare for an HRIS vendor.', role: 'People Ops Director' },
        { text: 'Chat is the best channel. Phone support is only available on premium and the wait times are reasonable.', role: 'HR Manager' },
      ],
    },
  },

  'personio': {
    capabilities: [
      { label: 'Employee Records', score: 88 },
      { label: 'Onboarding', score: 85 },
      { label: 'Benefits Admin', score: 77 },
      { label: 'Compliance', score: 83 },
      { label: 'Self-Service', score: 87 },
      { label: 'Analytics', score: 79 },
    ],
    idealCustomer: {
      size: '50–2,000 employees',
      industries: ['Technology', 'Professional Services', 'Retail', 'Healthcare'],
      useCase: 'European SMBs and mid-market companies needing a GDPR-compliant, all-in-one HR management platform',
    },
    integrations: ['Slack', 'LinkedIn', 'DATEV', 'Workday', 'Greenhouse', 'Okta'],
    news: [
      { headline: 'Personio achieves profitability and acquires Munich AI startup aurio to accelerate recruiting AI roadmap', date: 'Apr 2026', source: 'Personio Newsroom' },
      { headline: 'Personio expands into UK and Iberian markets with localised compliance and payroll partnerships', date: 'Feb 2026', source: 'Personio Blog' },
      { headline: 'Personio surpasses 15,000 customers and €1B ARR milestone, announces IPO consideration for 2027', date: 'Mar 2026', source: 'Financial Times' },
    ],
    financialHealth: {
      fundingStage: 'Private (Series E)',
      lastRaise: '$200M Series E at $8.5B valuation — 2022',
      headcountTrend: '-5% YoY',
      recentLayoffs: 'Reduced workforce ~6% — 2024',
      acquisitionRisk: 'Low',
      keySignals: [
        'Dominant European SMB HRIS but valuation under pressure from 2022 peak',
        'Expanding into payroll and recruiting to become full HR suite',
        'Strong brand in DACH region, growing in UK and Southern Europe',
      ],
    },
    supportQuality: {
      overallScore: 71,
      responseTime: '< 12 hours (standard), < 4 hours (premium)',
      channels: ['Email', 'Chat', 'Phone (enterprise)'],
      dedicatedCsm: 'Yes, at 200+ employees',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Support is solid for German labor law and payroll questions. English-language support for non-DACH markets is improving but still catching up.', role: 'HR Manager' },
        { text: 'The help center documentation is thorough. Direct support response times are reasonable for the price tier.', role: 'People Operations Lead' },
      ],
    },
  },

  'paycom': {
    capabilities: [
      { label: 'Employee Records', score: 85 },
      { label: 'Onboarding', score: 83 },
      { label: 'Benefits Admin', score: 81 },
      { label: 'Compliance', score: 84 },
      { label: 'Self-Service', score: 89 },
      { label: 'Analytics', score: 75 },
    ],
    idealCustomer: {
      size: '50–5,000 employees',
      industries: ['Healthcare', 'Retail', 'Hospitality', 'Manufacturing'],
      useCase: 'Mid-market employers that want a single database for all HR functions with employee self-service at the forefront',
    },
    integrations: ['QuickBooks', 'Microsoft 365', 'ADP', 'Salesforce', 'Indeed', 'Workato'],
    news: [
      { headline: 'Paycom launches GONE, an AI system that approves time-off requests automatically based on business rules', date: 'Oct 2025', source: 'Paycom Newsroom' },
      { headline: 'Paycom Beti payroll self-service reaches 80% employee adoption across its customer base', date: 'Feb 2026', source: 'Paycom Newsroom' },
      { headline: 'Paycom reports Q4 2025 revenue of $349M, exceeding analyst consensus for third consecutive quarter', date: 'Jan 2026', source: 'Paycom Investor Relations' },
    ],
    financialHealth: {
      fundingStage: 'Public (NYSE: PAYC)',
      headcountTrend: '+4% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'FY2025 revenue $1.9B with strong margin profile',
        'Beti employee-driven payroll is a genuine product differentiator',
        'Investing in AI automation for expense management and talent workflows',
      ],
    },
    supportQuality: {
      overallScore: 71,
      responseTime: '< 8 hours (all clients)',
      channels: ['Phone', 'Email', 'In-app messaging'],
      dedicatedCsm: 'Yes, all clients get a dedicated specialist',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Having a dedicated specialist from day one is a huge plus. They know our setup and payroll history.', role: 'Payroll Manager' },
        { text: 'Specialist turnover can be an issue — we\'ve had three in two years. Each transition means re-explaining our setup.', role: 'HR Director' },
      ],
    },
  },

  'deel': {
    capabilities: [
      { label: 'Employee Records', score: 82 },
      { label: 'Onboarding', score: 84 },
      { label: 'Benefits Admin', score: 78 },
      { label: 'Compliance', score: 91 },
      { label: 'Self-Service', score: 85 },
      { label: 'Analytics', score: 76 },
    ],
    idealCustomer: {
      size: '20–5,000 employees',
      industries: ['Technology', 'SaaS', 'Digital Media', 'Professional Services'],
      useCase: 'Remote-first companies hiring internationally who need EOR, contractor management, and global compliance under one roof',
    },
    integrations: ['Slack', 'QuickBooks', 'Xero', 'Workday', 'Greenhouse', 'Rippling'],
    news: [
      { headline: 'Deel acquires HR intelligence platform Zavvy to add learning and development to its global HR suite', date: 'Jan 2026', source: 'Deel Newsroom' },
      { headline: 'Deel reaches $800M ARR and announces plans for direct listing on NYSE in late 2026', date: 'Feb 2026', source: 'Bloomberg' },
      { headline: 'Deel launches Deel AI, automating compliance risk assessment for 150+ countries in real time', date: 'Mar 2026', source: 'Deel Blog' },
    ],
    financialHealth: {
      fundingStage: 'Private (Series D)',
      lastRaise: '$300M Series D at $12B valuation — 2023',
      headcountTrend: '+20% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'ARR reportedly exceeded $500M — one of the fastest-growing HR platforms ever',
        'Aggressive M&A (acquired PayGroup, Hofy, Assemble)',
        'Expanding from contractor/EOR into full HRIS and payroll platform',
      ],
    },
    supportQuality: {
      overallScore: 72,
      responseTime: '< 8 hours (standard), < 2 hours (premium)',
      channels: ['Chat', 'Email', 'Slack (enterprise)', 'Phone (premium)'],
      dedicatedCsm: 'Yes, at enterprise tier',
      supportTrend: 'Improving',
      highlights: [
        { text: 'Chat support is responsive and handles contractor payment questions well. HRIS-specific support is newer and less mature.', role: 'People Ops Manager' },
        { text: 'The Slack channel for enterprise clients is great for quick answers. Complex compliance questions still need escalation.', role: 'Head of Global HR' },
      ],
    },
  },

  'paylocity': {
    capabilities: [
      { label: 'Employee Records', score: 84, rationale: 'Modern HRIS with clean data model serving US mid-market employers well. Lacks the configurability that enterprise HR teams expect for complex job architectures.' },
      { label: 'Onboarding', score: 82, rationale: 'Smooth, mobile-friendly onboarding flow that ties naturally into payroll and benefits setup. Task management is solid without the complexity of enterprise suites.' },
      { label: 'Benefits Admin', score: 80, rationale: 'Competent benefits admin with good carrier integration for a mid-market platform, though depth and marketplace breadth trail ADP and Workday.' },
      { label: 'Compliance', score: 81, rationale: 'Strong US tax filing and ACA compliance backed by payroll heritage. Multi-state and multi-jurisdiction handling is a known strength in this segment.' },
      { label: 'Self-Service', score: 86, rationale: 'Community social features and modern mobile experience drive unusually high employee adoption for the segment. A consistent bright spot in customer reviews.' },
      { label: 'Analytics', score: 77, rationale: 'Operational reporting covers the basics well, but advanced people analytics and predictive insights are thin compared to enterprise competitors. A known gap as Paylocity moves upmarket.' },
    ],
    idealCustomer: {
      size: '50–2,500 employees',
      industries: ['Healthcare', 'Retail', 'Manufacturing', 'Professional Services'],
      useCase: 'US mid-market companies seeking a modern HRIS with strong community and communication tools',
    },
    integrations: ['QuickBooks', 'ADP', 'Microsoft 365', 'Slack', 'Indeed', 'Checkr'],
    news: [
      { headline: 'Paylocity launches Elevate Solutions to help HR and payroll teams scale more efficiently', date: 'Apr 2026', source: 'GlobeNewswire' },
      { headline: 'Paylocity reports fiscal Q2 2026 revenue of $380M, citing 19% growth in total HCM customers', date: 'Mar 2026', source: 'Paylocity Investor Relations' },
      { headline: 'Paylocity acquires Grayscale to expand AI-powered recruiting automation for high-volume hiring', date: 'Apr 2026', source: 'Globe Newswire' },
    ],
    financialHealth: {
      fundingStage: 'Public (NASDAQ: PCTY)',
      headcountTrend: '+10% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'FY2025 revenue $1.4B, up 18% YoY — fastest grower in mid-market payroll',
        'Community social features differentiating from traditional competitors',
        'Expanding upmarket into 1,000+ employee segment',
      ],
    },
    supportQuality: {
      overallScore: 70,
      responseTime: '< 8 hours (standard), < 4 hours (premium)',
      channels: ['Phone', 'Email', 'Chat', 'Paylocity Community'],
      dedicatedCsm: 'Yes, at 100+ employees',
      supportTrend: 'Improving',
      highlights: [
        { text: 'Our implementation specialist transitioned to a dedicated CSM. Continuity makes a huge difference.', role: 'Payroll Manager' },
        { text: 'Tax support is reliable. Product support for the newer modules (LMS, surveys) is less mature.', role: 'HR Director' },
      ],
    },
  },

  'zenefits': {
    capabilities: [
      { label: 'Employee Records', score: 79 },
      { label: 'Onboarding', score: 80 },
      { label: 'Benefits Admin', score: 85 },
      { label: 'Compliance', score: 78 },
      { label: 'Self-Service', score: 82 },
      { label: 'Analytics', score: 68 },
    ],
    idealCustomer: {
      size: '10–500 employees',
      industries: ['Technology', 'Retail', 'Nonprofit', 'Professional Services'],
      useCase: 'Small businesses wanting streamlined benefits enrollment and HR compliance without a dedicated HR team',
    },
    integrations: ['QuickBooks', 'Slack', 'Google Workspace', 'Indeed', 'Salesforce', 'Zapier'],
    news: [
      { headline: 'TriNet acquires Zenefits and rebrands the platform as TriNet HRCloud for SMB market', date: 'Oct 2025', source: 'Business Wire' },
      { headline: 'TriNet HRCloud (formerly Zenefits) launches AI benefits advisor to guide employees through open enrollment', date: 'Jan 2026', source: 'TriNet Newsroom' },
      { headline: 'TriNet HRCloud expands broker marketplace with 30 new voluntary benefit carriers for small businesses', date: 'Feb 2026', source: 'TriNet Blog' },
    ],
    financialHealth: {
      fundingStage: 'Private (Rebranded as TriNet Zenefits)',
      headcountTrend: '-15% YoY',
      acquisitionRisk: 'High',
      keySignals: [
        'Acquired by TriNet in 2022 after years of operational challenges',
        'Being absorbed into TriNet\'s PEO and HR platform',
        'Standalone Zenefits product future is uncertain',
      ],
    },
    supportQuality: {
      overallScore: 48,
      responseTime: '24–48 hours (standard)',
      channels: ['Email', 'Phone', 'Help Center'],
      dedicatedCsm: 'No — pooled support',
      supportTrend: 'Declining',
      highlights: [
        { text: 'Support has degraded significantly since the TriNet acquisition. Long hold times and agents unfamiliar with the platform.', role: 'HR Manager' },
        { text: 'If you\'re still on Zenefits, start planning your migration. The writing is on the wall.', role: 'People Ops Director' },
      ],
    },
  },

  'factorial': {
    capabilities: [
      { label: 'Employee Records', score: 82 },
      { label: 'Onboarding', score: 83 },
      { label: 'Benefits Admin', score: 72 },
      { label: 'Compliance', score: 80 },
      { label: 'Self-Service', score: 84 },
      { label: 'Analytics', score: 74 },
    ],
    idealCustomer: {
      size: '10–1,000 employees',
      industries: ['Technology', 'Retail', 'Hospitality', 'Professional Services'],
      useCase: 'Southern European SMBs seeking an affordable, multilingual HR platform with strong time tracking',
    },
    integrations: ['Slack', 'Google Workspace', 'Xero', 'Salesforce', 'LinkedIn', 'Zapier'],
    news: [
      { headline: 'Factorial raises €120M Series C to accelerate expansion in Latin America and Southern Europe', date: 'Jan 2026', source: 'TechCrunch' },
      { headline: 'Factorial launches Factorial AI, automating absence management and shift planning for frontline teams', date: 'Feb 2026', source: 'Factorial Blog' },
      { headline: 'Factorial surpasses 10,000 customers across 65 countries, citing strong traction in Brazil and Mexico', date: 'Mar 2026', source: 'Factorial Newsroom' },
    ],
    financialHealth: {
      fundingStage: 'Private (Series C)',
      lastRaise: '$120M Series C — 2023',
      headcountTrend: '+18% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Growing fast in European SMB market, especially Spain and Latin America',
        'Competing with Personio for European mid-market share',
        'Building out payroll capabilities country by country',
      ],
    },
    supportQuality: {
      overallScore: 69,
      responseTime: '< 12 hours (standard)',
      channels: ['Chat', 'Email'],
      dedicatedCsm: 'Yes, at 100+ employees',
      supportTrend: 'Improving',
      highlights: [
        { text: 'Support is friendly and improving. Spanish-language support is excellent, English support is catching up.', role: 'HR Coordinator' },
        { text: 'Chat is the primary channel and it works well for most issues. Complex payroll questions sometimes need escalation.', role: 'People Operations Manager' },
      ],
    },
  },

  'humaans': {
    capabilities: [
      { label: 'Employee Records', score: 85 },
      { label: 'Onboarding', score: 82 },
      { label: 'Benefits Admin', score: 70 },
      { label: 'Compliance', score: 74 },
      { label: 'Self-Service', score: 88 },
      { label: 'Analytics', score: 78 },
    ],
    idealCustomer: {
      size: '50–1,000 employees',
      industries: ['Technology', 'Fintech', 'Media', 'SaaS'],
      useCase: 'API-first tech companies needing a lightweight, developer-friendly HRIS that acts as a system of record',
    },
    integrations: ['Slack', 'Workday', 'Greenhouse', 'Rippling', 'Notion', 'Okta'],
    news: [
      { headline: 'Humaans launches Humaans AI, an HR data assistant that answers workforce questions in plain English', date: 'Feb 2026', source: 'Humaans Blog' },
      { headline: 'Humaans raises $15M Series A to build the API-first HRIS for modern tech companies', date: 'Jan 2026', source: 'TechCrunch' },
      { headline: 'Humaans expands open API ecosystem with 200 pre-built connectors for HR and engineering tools', date: 'Mar 2026', source: 'Humaans Newsroom' },
    ],
    financialHealth: {
      fundingStage: 'Private (Seed / Series A)',
      lastRaise: '$15M Series A — 2023',
      headcountTrend: '+20% YoY',
      acquisitionRisk: 'Medium',
      keySignals: [
        'Small but well-regarded API-first HRIS for tech companies',
        'Limited runway compared to larger competitors',
        'Potential acqui-hire or acquisition target by larger HRIS platforms',
      ],
    },
    supportQuality: {
      overallScore: 80,
      responseTime: '< 4 hours (all plans)',
      channels: ['Email', 'Chat', 'Slack (select customers)'],
      dedicatedCsm: 'No — founder-led support at scale',
      supportTrend: 'Stable',
      highlights: [
        { text: 'You feel like you\'re talking to the engineering team directly. Issues get fixed, not just acknowledged.', role: 'People Ops Lead' },
        { text: 'Small team energy — fast response but limited availability outside business hours.', role: 'HR Manager' },
      ],
    },
  },

  'sage-hr': {
    capabilities: [
      { label: 'Employee Records', score: 81 },
      { label: 'Onboarding', score: 78 },
      { label: 'Benefits Admin', score: 70 },
      { label: 'Compliance', score: 77 },
      { label: 'Self-Service', score: 83 },
      { label: 'Analytics', score: 70 },
    ],
    idealCustomer: {
      size: '10–500 employees',
      industries: ['Professional Services', 'Retail', 'Construction', 'Manufacturing'],
      useCase: 'SMBs already on Sage accounting software needing an HR module with seamless payroll integration',
    },
    integrations: ['Sage Accounting', 'Sage Payroll', 'Slack', 'Google Workspace', 'Microsoft 365', 'Zapier'],
    news: [
      { headline: 'Sage HR deepens integration with Sage Payroll for fully automated pay run reconciliation', date: 'Jan 2026', source: 'Sage Newsroom' },
      { headline: 'Sage HR launches performance review automation for companies with dispersed workforces', date: 'Feb 2026', source: 'Sage Blog' },
      { headline: 'Sage HR adds e-signature for contracts and policies, eliminating paper-based HR processes for SMBs', date: 'Mar 2026', source: 'Sage Newsroom' },
    ],
    financialHealth: {
      fundingStage: 'Public (LSE: SGE)',
      headcountTrend: '+2% YoY',
      acquisitionRisk: 'Low',
      keySignals: [
        'Part of Sage Group — $2.5B+ revenue enterprise software company',
        'Sage HR is a small product within a large portfolio',
        'Investment priority unclear relative to Sage Intacct and core accounting products',
      ],
    },
    supportQuality: {
      overallScore: 62,
      responseTime: '< 24 hours (standard)',
      channels: ['Email', 'Phone', 'Chat'],
      dedicatedCsm: 'No — pooled support',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Basic HR questions get answered quickly. For anything complex, you need to involve your Sage account team.', role: 'HR Administrator' },
        { text: 'The product is simple enough that you rarely need support. When you do, it\'s adequate but not exceptional.', role: 'Office Manager' },
      ],
    },
  },

  // ─── PAYROLL ───────────────────────────────────────────────────────────────

  'gusto': {
    capabilities: [
      { label: 'Payroll Processing', score: 93 },
      { label: 'Tax Compliance', score: 90 },
      { label: 'Time & Attendance', score: 78 },
      { label: 'Benefits', score: 85 },
      { label: 'Reporting', score: 77 },
      { label: 'Global Payroll', score: 48 },
    ],
    idealCustomer: {
      size: '1–500 employees',
      industries: ['Technology', 'Professional Services', 'Retail', 'Nonprofit'],
      useCase: 'US-based SMBs wanting simple, beautiful full-service payroll with built-in benefits and HR',
    },
    integrations: ['QuickBooks', 'Xero', 'FreshBooks', 'Slack', 'Greenhouse', 'BambooHR'],
    news: [
      { headline: 'Gusto reaches 500,000 customers and unveils Spring Showcase with nearly 75 new SMB features', date: 'Apr 2026', source: 'CPA Practice Advisor' },
      { headline: 'Gusto brings payroll into Claude and Slack — enabling pay runs without leaving the conversation', date: 'Apr 2026', source: 'CPA Practice Advisor' },
      { headline: 'Gusto acquires Mosey to close the compliance gap for small businesses with AI-powered state filings', date: 'Apr 2026', source: 'PR Newswire' },
    ],
    financialHealth: {
      fundingStage: 'Private (Series E)',
      lastRaise: '$80M at reduced valuation — 2023',
      headcountTrend: '-8% YoY',
      recentLayoffs: 'Reduced workforce ~10% — 2023',
      acquisitionRisk: 'Medium',
      keySignals: [
        'Dominant SMB payroll brand but facing margin pressure and competition from Rippling',
        'Expanding into embedded payroll for vertical SaaS partners',
        'R&D investment shifting toward API/platform play vs. direct SMB',
      ],
    },
    supportQuality: {
      overallScore: 70,
      responseTime: '< 8 hours (standard), < 2 hours (premium)',
      channels: ['Phone', 'Email', 'Chat'],
      dedicatedCsm: 'No — pooled support (Priority support available at higher tier)',
      supportTrend: 'Declining',
      highlights: [
        { text: 'Gusto support used to be legendary. It\'s still decent but wait times have increased and agent expertise has dipped.', role: 'Small Business Owner' },
        { text: 'Tax filing support remains strong. Product support for the HR and benefits modules is less reliable.', role: 'Bookkeeper' },
      ],
    },
  },

  'onpay': {
    capabilities: [
      { label: 'Payroll Processing', score: 88 },
      { label: 'Tax Compliance', score: 87 },
      { label: 'Time & Attendance', score: 71 },
      { label: 'Benefits', score: 76 },
      { label: 'Reporting', score: 72 },
      { label: 'Global Payroll', score: 30 },
    ],
    idealCustomer: {
      size: '1–100 employees',
      industries: ['Healthcare', 'Nonprofit', 'Agriculture', 'Retail'],
      useCase: 'Small US businesses in niche industries needing accurate, affordable payroll with concierge-level tax filing',
    },
    integrations: ['QuickBooks', 'Xero', 'BambooHR', 'When I Work', 'Deputy', 'Clover'],
    news: [
      { headline: 'OnPay launches automated W-2 and 1099 filing with state e-delivery for all 50 states', date: 'Jan 2026', source: 'OnPay Blog' },
      { headline: 'OnPay adds dedicated payroll support for farm and agricultural workers including H-2A visa handling', date: 'Feb 2026', source: 'OnPay Newsroom' },
      { headline: 'OnPay named Best Payroll Software for Small Business by PCMag for third consecutive year', date: 'Mar 2026', source: 'PCMag' },
    ],
    financialHealth: {
      fundingStage: 'Private (Bootstrapped)',
      headcountTrend: '+10% YoY',
      acquisitionRisk: 'Medium',
      keySignals: [
        'Profitable and bootstrapped — no investor pressure',
        'Consistently top-rated on G2 and Capterra for SMB payroll',
        'Small team limits product velocity but ensures quality',
      ],
    },
    supportQuality: {
      overallScore: 90,
      responseTime: '< 2 hours (all customers)',
      channels: ['Phone', 'Email', 'Chat'],
      dedicatedCsm: 'No — but all agents handle full account context',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Best payroll support I\'ve ever experienced. You call, a human answers, and they actually fix your problem.', role: 'Small Business Owner' },
        { text: 'They proactively flagged a tax filing issue before it became a penalty. That kind of service is rare.', role: 'Bookkeeper' },
      ],
    },
  },

  'homebase': {
    capabilities: [
      { label: 'Payroll Processing', score: 80 },
      { label: 'Tax Compliance', score: 78 },
      { label: 'Time & Attendance', score: 93 },
      { label: 'Benefits', score: 62 },
      { label: 'Reporting', score: 70 },
      { label: 'Global Payroll', score: 20 },
    ],
    idealCustomer: {
      size: '1–100 employees',
      industries: ['Restaurants', 'Retail', 'Hospitality', 'Healthcare'],
      useCase: 'Hourly workforce businesses needing scheduling, time clocks, and payroll in one mobile-first platform',
    },
    integrations: ['Square', 'Clover', 'Toast', 'QuickBooks', 'Gusto', 'Lightspeed'],
    news: [
      { headline: 'Homebase launches AI shift scheduling that auto-fills open shifts based on employee availability and sales forecasts', date: 'Feb 2026', source: 'Homebase Newsroom' },
      { headline: 'Homebase adds team messaging and tip pooling features to simplify restaurant operations', date: 'Jan 2026', source: 'Homebase Blog' },
      { headline: 'Homebase surpasses 100,000 small business customers and 2.5M hourly workers on platform', date: 'Mar 2026', source: 'Homebase Newsroom' },
    ],
    financialHealth: {
      fundingStage: 'Private (Series C)',
      lastRaise: '$71M Series C — 2022',
      headcountTrend: '+5% YoY',
      acquisitionRisk: 'Medium',
      keySignals: [
        'Strong position in hourly workforce scheduling and time tracking',
        'Payroll product is newer but growing fast with existing customer base',
        'Competing with Toast, 7shifts, and When I Work in restaurant/retail vertical',
      ],
    },
    supportQuality: {
      overallScore: 72,
      responseTime: '< 8 hours (all plans)',
      channels: ['Chat', 'Email', 'Phone (paid plans)'],
      dedicatedCsm: 'No — pooled support',
      supportTrend: 'Stable',
      highlights: [
        { text: 'Support understands hourly scheduling challenges. They\'re less experienced with the newer payroll features.', role: 'Restaurant Manager' },
        { text: 'Free plan support is chat-only and can be slow. Paid plan phone support is noticeably better.', role: 'Retail Store Owner' },
      ],
    },
  },

  'quickbooks-payroll': {
    capabilities: [
      { label: 'Payroll Processing', score: 87 },
      { label: 'Tax Compliance', score: 88 },
      { label: 'Time & Attendance', score: 73 },
      { label: 'Benefits', score: 70 },
      { label: 'Reporting', score: 74 },
      { label: 'Global Payroll', score: 25 },
    ],
    idealCustomer: {
      size: '1–50 employees',
      industries: ['Professional Services', 'Retail', 'Construction', 'Healthcare'],
      useCase: 'Very small US businesses already on QuickBooks that want payroll without switching accounting software',
    },
    integrations: ['QuickBooks Online', 'QuickBooks Desktop', 'TurboTax', 'Square', 'Shopify', 'Gusto'],
    news: [
      { headline: 'Intuit QuickBooks Payroll adds AI-powered tax penalty protection with automatic correction filing', date: 'Jan 2026', source: 'Intuit Newsroom' },
      { headline: 'QuickBooks Payroll integrates next-day direct deposit for all Premium plan customers at no extra cost', date: 'Feb 2026', source: 'QuickBooks Blog' },
      { headline: 'Intuit bundles QuickBooks Payroll with QuickBooks Money for an all-in-one small business finance solution', date: 'Mar 2026', source: 'Intuit Newsroom' },
    ],
  },

  'patriot-software': {
    capabilities: [
      { label: 'Payroll Processing', score: 84 },
      { label: 'Tax Compliance', score: 85 },
      { label: 'Time & Attendance', score: 72 },
      { label: 'Benefits', score: 58 },
      { label: 'Reporting', score: 65 },
      { label: 'Global Payroll', score: 20 },
    ],
    idealCustomer: {
      size: '1–100 employees',
      industries: ['Manufacturing', 'Construction', 'Retail', 'Professional Services'],
      useCase: 'Budget-conscious US small businesses needing straightforward payroll and accounting at low monthly cost',
    },
    integrations: ['QuickBooks', 'Xero', 'Patriot Accounting', 'Wave', 'Gusto', 'Zapier'],
    news: [
      { headline: 'Patriot Software launches unlimited payroll runs at flat rate, eliminating per-employee fees for US businesses', date: 'Jan 2026', source: 'Patriot Software Blog' },
      { headline: 'Patriot Software adds multistate payroll support for remote workers without additional fees', date: 'Feb 2026', source: 'Patriot Software Newsroom' },
      { headline: 'Patriot Software earns Top Rated badge on TrustRadius for eighth consecutive year in payroll category', date: 'Mar 2026', source: 'TrustRadius' },
    ],
  },

  'remote': {
    capabilities: [
      { label: 'Payroll Processing', score: 83 },
      { label: 'Tax Compliance', score: 88 },
      { label: 'Time & Attendance', score: 70 },
      { label: 'Benefits', score: 80 },
      { label: 'Reporting', score: 74 },
      { label: 'Global Payroll', score: 92 },
    ],
    idealCustomer: {
      size: '10–5,000 employees',
      industries: ['Technology', 'SaaS', 'Professional Services', 'Digital Media'],
      useCase: 'Remote-first companies hiring full-time employees and contractors in 180+ countries compliantly',
    },
    integrations: ['Slack', 'Workday', 'Greenhouse', 'Rippling', 'BambooHR', 'Okta'],
    news: [
      { headline: 'Remote expands EOR coverage to 30 new countries including Saudi Arabia, Vietnam, and Colombia', date: 'Jan 2026', source: 'Remote Blog' },
      { headline: 'Remote reaches $1B ARR milestone driven by rapid adoption of global payroll consolidation', date: 'Mar 2026', source: 'TechCrunch' },
      { headline: 'Remote acquires Bravas to bring identity and device management into its global employment platform', date: 'Apr 2026', source: 'PR Newswire' },
    ],
  },

  'papaya-global': {
    capabilities: [
      { label: 'Payroll Processing', score: 82 },
      { label: 'Tax Compliance', score: 86 },
      { label: 'Time & Attendance', score: 68 },
      { label: 'Benefits', score: 77 },
      { label: 'Reporting', score: 80 },
      { label: 'Global Payroll', score: 93 },
    ],
    idealCustomer: {
      size: '100–10,000 employees',
      industries: ['Technology', 'Financial Services', 'Retail', 'Manufacturing'],
      useCase: 'Multinational enterprises consolidating fragmented multi-country payroll onto a single compliance-driven platform',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'Oracle HCM', 'ADP', 'NetSuite', 'HiBob'],
    news: [
      { headline: 'Papaya Global achieves $100M quarterly processing in payments network across 160 countries', date: 'Feb 2026', source: 'Papaya Global Blog' },
      { headline: 'Papaya Global partners with HSBC to offer embedded global payroll payments within banking infrastructure', date: 'Mar 2026', source: 'Business Wire' },
      { headline: 'Papaya Global and Tech Mahindra partner to modernize global workforce operations and cross-border payments', date: 'Apr 2026', source: 'PR Newswire' },
    ],
  },

  'wagepoint': {
    capabilities: [
      { label: 'Payroll Processing', score: 83 },
      { label: 'Tax Compliance', score: 85 },
      { label: 'Time & Attendance', score: 70 },
      { label: 'Benefits', score: 64 },
      { label: 'Reporting', score: 68 },
      { label: 'Global Payroll', score: 22 },
    ],
    idealCustomer: {
      size: '1–200 employees',
      industries: ['Professional Services', 'Technology', 'Nonprofit', 'Retail'],
      useCase: 'Canadian small businesses needing a simple, fully automated payroll with CRA compliance built in',
    },
    integrations: ['QuickBooks', 'Xero', 'FreshBooks', 'Wave', 'Sage', 'Zapier'],
    news: [
      { headline: 'Wagepoint expands from Canada to support US payroll processing, targeting cross-border employers', date: 'Feb 2026', source: 'Wagepoint Blog' },
      { headline: 'Wagepoint integrates with Humi HRIS for a fully connected Canadian HR and payroll experience', date: 'Jan 2026', source: 'Wagepoint Newsroom' },
      { headline: 'Wagepoint wins Canadian Payroll Software of the Year at the 2025 Cantech Letter Awards', date: 'Nov 2025', source: 'Cantech Letter' },
    ],
  },

  'paychex-flex': {
    capabilities: [
      { label: 'Payroll Processing', score: 90 },
      { label: 'Tax Compliance', score: 91 },
      { label: 'Time & Attendance', score: 84 },
      { label: 'Benefits', score: 82 },
      { label: 'Reporting', score: 78 },
      { label: 'Global Payroll', score: 42 },
    ],
    idealCustomer: {
      size: '10–1,000 employees',
      industries: ['Healthcare', 'Construction', 'Retail', 'Professional Services'],
      useCase: 'US small and mid-sized businesses needing reliable payroll with hands-on dedicated service',
    },
    integrations: ['QuickBooks', 'Xero', 'Indeed', 'Microsoft 365', 'Google Workspace', 'Clover'],
    news: [
      { headline: 'Paychex Flex launches Flex Intelligent HR, bundling AI analytics and compliance alerts into base plan', date: 'Jan 2026', source: 'Paychex Newsroom' },
      { headline: 'Paychex Flex adds same-day direct deposit for hourly employees at no additional premium', date: 'Feb 2026', source: 'Paychex Blog' },
      { headline: 'Paychex Flex earns SOC 2 Type II certification for all modules following expanded security audit', date: 'Mar 2026', source: 'Paychex Newsroom' },
    ],
  },

  // ─── PERFORMANCE MGMT ──────────────────────────────────────────────────────

  'lattice': {
    capabilities: [
      { label: 'Goal Setting', score: 90 },
      { label: 'Reviews & Feedback', score: 92 },
      { label: 'Engagement', score: 88 },
      { label: 'Calibration', score: 86 },
      { label: 'Analytics', score: 85 },
      { label: 'Development', score: 83 },
    ],
    idealCustomer: {
      size: '100–3,000 employees',
      industries: ['Technology', 'SaaS', 'Media', 'Professional Services'],
      useCase: 'People-focused companies seeking a complete performance management and engagement platform in one system',
    },
    integrations: ['Slack', 'Workday', 'BambooHR', 'Rippling', 'Google Workspace', 'Microsoft Teams'],
    news: [
      { headline: 'Lattice Spring/Summer 2026 release embeds AI into growth moments — Agent drafts Growth Areas from review data', date: 'Apr 2026', source: 'Lattice Newsroom' },
      { headline: 'Lattice adds HRIS functionality to its platform, becoming a full people management suite', date: 'Feb 2026', source: 'TechCrunch' },
      { headline: 'Lattice crosses $200M ARR with 6,000 customers, citing strong adoption of engagement pulse surveys', date: 'Mar 2026', source: 'Lattice Blog' },
    ],
  },

  '15five': {
    capabilities: [
      { label: 'Goal Setting', score: 83 },
      { label: 'Reviews & Feedback', score: 85 },
      { label: 'Engagement', score: 91 },
      { label: 'Calibration', score: 78 },
      { label: 'Analytics', score: 80 },
      { label: 'Development', score: 82 },
    ],
    idealCustomer: {
      size: '50–2,000 employees',
      industries: ['Technology', 'Healthcare', 'Education', 'Nonprofit'],
      useCase: 'Manager-centric organisations wanting continuous feedback loops and weekly check-ins to drive engagement',
    },
    integrations: ['Slack', 'Microsoft Teams', 'BambooHR', 'Workday', 'Google Workspace', 'Rippling'],
    news: [
      { headline: '15Five launches Transform coaching marketplace connecting managers with executive coaches on demand', date: 'Feb 2026', source: '15Five Blog' },
      { headline: '15Five adds AI Meeting Prep to help managers have more effective 1-on-1 conversations using data', date: 'Jan 2026', source: '15Five Newsroom' },
      { headline: '15Five recognized as a Leader in Gartner Magic Quadrant for Voice of the Employee 2025', date: 'Dec 2025', source: 'Gartner' },
    ],
  },

  'culture-amp': {
    capabilities: [
      { label: 'Goal Setting', score: 79 },
      { label: 'Reviews & Feedback', score: 85 },
      { label: 'Engagement', score: 96 },
      { label: 'Calibration', score: 80 },
      { label: 'Analytics', score: 90 },
      { label: 'Development', score: 82 },
    ],
    idealCustomer: {
      size: '200–10,000 employees',
      industries: ['Technology', 'Financial Services', 'Healthcare', 'Retail'],
      useCase: 'Organisations putting employee engagement and retention science at the centre of their people strategy',
    },
    integrations: ['Slack', 'Microsoft Teams', 'Workday', 'BambooHR', 'Greenhouse', 'Okta'],
    news: [
      { headline: 'Culture Amp launches Generative AI insights to surface engagement drivers from free-text survey responses', date: 'Feb 2026', source: 'Culture Amp Newsroom' },
      { headline: 'Culture Amp acquires employee coaching platform Timelycoach to add coaching to its engagement suite', date: 'Jan 2026', source: 'TechCrunch' },
      { headline: 'Culture Amp surpasses 6,500 customers across 95 countries, reporting 30% growth in enterprise segment', date: 'Mar 2026', source: 'Culture Amp Blog' },
    ],
  },

  'betterworks': {
    capabilities: [
      { label: 'Goal Setting', score: 93 },
      { label: 'Reviews & Feedback', score: 85 },
      { label: 'Engagement', score: 79 },
      { label: 'Calibration', score: 83 },
      { label: 'Analytics', score: 82 },
      { label: 'Development', score: 77 },
    ],
    idealCustomer: {
      size: '500–20,000 employees',
      industries: ['Technology', 'Financial Services', 'Healthcare', 'Manufacturing'],
      useCase: 'Enterprises running OKR-based goal frameworks who need performance management aligned to company strategy',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'Salesforce', 'Microsoft Teams', 'Slack', 'Okta'],
    news: [
      { headline: 'Betterworks launches AI Goal Assistant to help employees write SMART OKRs aligned to company objectives', date: 'Jan 2026', source: 'Betterworks Newsroom' },
      { headline: 'Betterworks releases Performance Intelligence dashboard for CHROs to benchmark talent health company-wide', date: 'Feb 2026', source: 'Betterworks Blog' },
      { headline: 'Betterworks expands enterprise footprint with three Fortune 100 wins in Q4 2025', date: 'Mar 2026', source: 'Business Wire' },
    ],
  },

  'leapsome': {
    capabilities: [
      { label: 'Goal Setting', score: 88 },
      { label: 'Reviews & Feedback', score: 90 },
      { label: 'Engagement', score: 86 },
      { label: 'Calibration', score: 84 },
      { label: 'Analytics', score: 83 },
      { label: 'Development', score: 87 },
    ],
    idealCustomer: {
      size: '100–5,000 employees',
      industries: ['Technology', 'SaaS', 'Professional Services', 'E-commerce'],
      useCase: 'European and global tech companies seeking a holistic platform spanning performance, learning, and engagement',
    },
    integrations: ['Slack', 'Microsoft Teams', 'Workday', 'Personio', 'BambooHR', 'HiBob'],
    news: [
      { headline: 'Leapsome launches AI Copilot for HR teams to auto-generate review cycles, goals, and survey templates', date: 'Feb 2026', source: 'Leapsome Newsroom' },
      { headline: 'Leapsome raises $60M Series B to accelerate US expansion after strong European growth', date: 'Jan 2026', source: 'TechCrunch' },
      { headline: 'Leapsome wins Best People Management Tool at the European HR Tech Awards 2025', date: 'Nov 2025', source: 'European HR Tech Awards' },
    ],
  },

  'engagedly': {
    capabilities: [
      { label: 'Goal Setting', score: 83 },
      { label: 'Reviews & Feedback', score: 82 },
      { label: 'Engagement', score: 85 },
      { label: 'Calibration', score: 77 },
      { label: 'Analytics', score: 78 },
      { label: 'Development', score: 86 },
    ],
    idealCustomer: {
      size: '200–5,000 employees',
      industries: ['Technology', 'Healthcare', 'Manufacturing', 'Financial Services'],
      useCase: 'Companies wanting a combined performance management and social learning platform in a single budget',
    },
    integrations: ['Slack', 'Microsoft Teams', 'BambooHR', 'Workday', 'Salesforce', 'Okta'],
    news: [
      { headline: 'Engagedly launches Marissa, an AI HR business partner that provides talent analytics in conversational form', date: 'Jan 2026', source: 'Engagedly Newsroom' },
      { headline: 'Engagedly adds real-time engagement pulse tied directly to OKR completion rates', date: 'Feb 2026', source: 'Engagedly Blog' },
      { headline: 'Engagedly recognized in Inc. 5000 list for fourth consecutive year, citing 200% growth in L&D module adoption', date: 'Mar 2026', source: 'Inc. Magazine' },
    ],
  },

  'reflektive': {
    capabilities: [
      { label: 'Goal Setting', score: 80 },
      { label: 'Reviews & Feedback', score: 83 },
      { label: 'Engagement', score: 79 },
      { label: 'Calibration', score: 76 },
      { label: 'Analytics', score: 74 },
      { label: 'Development', score: 72 },
    ],
    idealCustomer: {
      size: '200–3,000 employees',
      industries: ['Technology', 'Healthcare', 'Retail', 'Professional Services'],
      useCase: 'Mid-market HR teams wanting continuous feedback and check-ins to replace annual review cycles',
    },
    integrations: ['Slack', 'Microsoft Teams', 'Workday', 'BambooHR', 'ADP', 'Okta'],
    news: [
      { headline: 'Reflektive launches Real-Time Feedback Streams giving employees a social-style recognition feed', date: 'Jan 2026', source: 'Reflektive Blog' },
      { headline: 'Reflektive expands analytics with turnover prediction models trained on engagement and review data', date: 'Feb 2026', source: 'Reflektive Newsroom' },
      { headline: 'Reflektive announces integration partnership with Glint for joint engagement and performance data sharing', date: 'Mar 2026', source: 'Business Wire' },
    ],
  },

  'performyard': {
    capabilities: [
      { label: 'Goal Setting', score: 82 },
      { label: 'Reviews & Feedback', score: 88 },
      { label: 'Engagement', score: 74 },
      { label: 'Calibration', score: 81 },
      { label: 'Analytics', score: 78 },
      { label: 'Development', score: 73 },
    ],
    idealCustomer: {
      size: '50–2,000 employees',
      industries: ['Professional Services', 'Architecture', 'Engineering', 'Nonprofit'],
      useCase: 'Service-based organisations needing highly flexible, customisable review forms without enterprise pricing',
    },
    integrations: ['BambooHR', 'ADP', 'Paycom', 'Slack', 'Microsoft Teams', 'Workday'],
    news: [
      { headline: 'PerformYard launches AI Review Writing Assistant to help managers draft more effective evaluations faster', date: 'Feb 2026', source: 'PerformYard Newsroom' },
      { headline: 'PerformYard adds continuous feedback timelines visible to employees throughout the review cycle', date: 'Jan 2026', source: 'PerformYard Blog' },
      { headline: 'PerformYard wins Software Advice FrontRunner badge for performance management for fifth year in row', date: 'Mar 2026', source: 'Software Advice' },
    ],
  },

  'trakstar': {
    capabilities: [
      { label: 'Goal Setting', score: 78 },
      { label: 'Reviews & Feedback', score: 82 },
      { label: 'Engagement', score: 76 },
      { label: 'Calibration', score: 73 },
      { label: 'Analytics', score: 72 },
      { label: 'Development', score: 74 },
    ],
    idealCustomer: {
      size: '100–2,000 employees',
      industries: ['Healthcare', 'Nonprofit', 'Government', 'Education'],
      useCase: 'Mission-driven organisations seeking affordable, compliant performance appraisals with 360-degree feedback',
    },
    integrations: ['BambooHR', 'ADP', 'UKG', 'Microsoft 365', 'Google Workspace', 'Workato'],
    news: [
      { headline: 'Trakstar launches Trakstar Hire for SMBs, bundling ATS and performance management at a unified price', date: 'Jan 2026', source: 'Trakstar Newsroom' },
      { headline: 'Trakstar adds competency libraries for healthcare and nonprofit sectors to speed up review configuration', date: 'Feb 2026', source: 'Trakstar Blog' },
      { headline: 'Trakstar reaches 3,000 customers across healthcare, education, and public sector verticals', date: 'Mar 2026', source: 'Trakstar Newsroom' },
    ],
  },

  'workboard': {
    capabilities: [
      { label: 'Goal Setting', score: 92 },
      { label: 'Reviews & Feedback', score: 78 },
      { label: 'Engagement', score: 73 },
      { label: 'Calibration', score: 79 },
      { label: 'Analytics', score: 84 },
      { label: 'Development', score: 70 },
    ],
    idealCustomer: {
      size: '1,000–50,000 employees',
      industries: ['Technology', 'Financial Services', 'Healthcare', 'Manufacturing'],
      useCase: 'Large enterprises needing enterprise-grade OKR management with board-level strategy alignment and real-time dashboards',
    },
    integrations: ['Microsoft Teams', 'Slack', 'Salesforce', 'Workday', 'ServiceNow', 'Tableau'],
    news: [
      { headline: 'WorkBoard launches AI Strategy Advisor that summarises OKR health and risks for executive leadership teams', date: 'Jan 2026', source: 'WorkBoard Newsroom' },
      { headline: 'WorkBoard expands enterprise footprint with major wins at Johnson & Johnson and Cisco', date: 'Feb 2026', source: 'WorkBoard Blog' },
      { headline: 'WorkBoard integrates with Microsoft Copilot to surface OKR progress directly in Teams and Outlook', date: 'Mar 2026', source: 'WorkBoard Newsroom' },
    ],
  },

  // ─── L&D ───────────────────────────────────────────────────────────────────

  'cornerstone-ondemand': {
    capabilities: [
      { label: 'Content Library', score: 88 },
      { label: 'Course Authoring', score: 80 },
      { label: 'Compliance Training', score: 92 },
      { label: 'Social Learning', score: 75 },
      { label: 'Analytics', score: 84 },
      { label: 'Mobile', score: 78 },
    ],
    idealCustomer: {
      size: '2,000–100,000 employees',
      industries: ['Healthcare', 'Government', 'Manufacturing', 'Financial Services'],
      useCase: 'Enterprises requiring comprehensive talent management with deep compliance training and skills tracking',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'Microsoft Teams', 'Salesforce', 'Degreed', 'Okta'],
    news: [
      { headline: 'Cornerstone showcases Galaxy Workforce Agility platform at Learning Technologies London — 7,000 customers, 140M users', date: 'Apr 2026', source: 'Learning Technologies' },
      { headline: 'Cornerstone announces global Connect Tour kicking off May 20 in New York City across 15+ cities', date: 'Apr 2026', source: 'Cornerstone Newsroom' },
      { headline: 'Cornerstone reports 40M active learners on platform as compliance training adoption grows post-regulation', date: 'Mar 2026', source: 'Cornerstone Newsroom' },
    ],
  },

  'docebo': {
    capabilities: [
      { label: 'Content Library', score: 83 },
      { label: 'Course Authoring', score: 79 },
      { label: 'Compliance Training', score: 82 },
      { label: 'Social Learning', score: 85 },
      { label: 'Analytics', score: 84 },
      { label: 'Mobile', score: 86 },
    ],
    idealCustomer: {
      size: '500–10,000 employees',
      industries: ['Technology', 'Retail', 'Financial Services', 'Manufacturing'],
      useCase: 'Mid-market and enterprise companies needing an AI-powered LMS with strong external training and customer education use cases',
    },
    integrations: ['Salesforce', 'Microsoft Teams', 'Slack', 'Workday', 'Cornerstone', 'Zoom'],
    news: [
      { headline: 'Docebo unveils most significant release in company history at Inspire 2026 — Companion, MCP Server, AI Tutor, AgentHub', date: 'Apr 2026', source: 'Docebo' },
      { headline: 'Docebo reaches 3,600 customers after strong growth in customer training and partner enablement use cases', date: 'Feb 2026', source: 'Docebo Blog' },
      { headline: 'Docebo adds gamification engine with leaderboards and badges to boost learner completion rates', date: 'Mar 2026', source: 'Docebo Newsroom' },
    ],
  },

  'talentlms': {
    capabilities: [
      { label: 'Content Library', score: 74 },
      { label: 'Course Authoring', score: 81 },
      { label: 'Compliance Training', score: 78 },
      { label: 'Social Learning', score: 72 },
      { label: 'Analytics', score: 71 },
      { label: 'Mobile', score: 83 },
    ],
    idealCustomer: {
      size: '10–1,000 employees',
      industries: ['Technology', 'Retail', 'Hospitality', 'Professional Services'],
      useCase: 'SMBs needing a quick-to-deploy, budget-friendly LMS for employee onboarding and compliance training',
    },
    integrations: ['Slack', 'Salesforce', 'Zoom', 'BambooHR', 'Zapier', 'Google Workspace'],
    news: [
      { headline: 'TalentLMS launches AI Course Creator enabling non-technical trainers to build courses from scratch in hours', date: 'Jan 2026', source: 'TalentLMS Blog' },
      { headline: 'TalentLMS reaches 90,000 teams on platform, driven by SMB demand for fast onboarding solutions', date: 'Feb 2026', source: 'TalentLMS Newsroom' },
      { headline: 'TalentLMS parent company Epignosis launches TalentCards mobile microlearning as standalone product', date: 'Mar 2026', source: 'Epignosis Newsroom' },
    ],
  },

  'absorb-lms': {
    capabilities: [
      { label: 'Content Library', score: 80 },
      { label: 'Course Authoring', score: 77 },
      { label: 'Compliance Training', score: 86 },
      { label: 'Social Learning', score: 73 },
      { label: 'Analytics', score: 80 },
      { label: 'Mobile', score: 82 },
    ],
    idealCustomer: {
      size: '250–10,000 employees',
      industries: ['Healthcare', 'Financial Services', 'Technology', 'Manufacturing'],
      useCase: 'Organisations needing a scalable LMS for both employee and external learner training with strong reporting',
    },
    integrations: ['Salesforce', 'Microsoft Teams', 'Workday', 'BambooHR', 'Zoom', 'Okta'],
    news: [
      { headline: 'Absorb LMS launches Absorb Pinpoint AI to surface relevant content at the moment of need within the workflow', date: 'Feb 2026', source: 'Absorb Software Newsroom' },
      { headline: 'Absorb LMS wins Brandon Hall Gold Excellence Award for Best Advance in Learning Management Technology', date: 'Oct 2025', source: 'Brandon Hall Group' },
      { headline: 'Absorb LMS expands intelligent reporting suite with predictive completion and compliance gap analysis', date: 'Jan 2026', source: 'Absorb Blog' },
    ],
  },

  'sap-litmos': {
    capabilities: [
      { label: 'Content Library', score: 85 },
      { label: 'Course Authoring', score: 78 },
      { label: 'Compliance Training', score: 90 },
      { label: 'Social Learning', score: 70 },
      { label: 'Analytics', score: 79 },
      { label: 'Mobile', score: 80 },
    ],
    idealCustomer: {
      size: '500–20,000 employees',
      industries: ['Healthcare', 'Financial Services', 'Technology', 'Retail'],
      useCase: 'SAP-ecosystem organisations needing rapid-deployment compliance and onboarding training with pre-built content',
    },
    integrations: ['SAP SuccessFactors', 'Salesforce', 'Microsoft Teams', 'Workday', 'Okta', 'Zoom'],
    news: [
      { headline: 'SAP Litmos launches AI content recommendation engine personalising learning paths based on role and skill gaps', date: 'Jan 2026', source: 'SAP Litmos Newsroom' },
      { headline: 'SAP Litmos content library surpasses 2,000 off-the-shelf compliance courses in 40 languages', date: 'Feb 2026', source: 'SAP Blog' },
      { headline: 'SAP Litmos deepens integration with SAP SuccessFactors for seamless talent and learning data synchronisation', date: 'Mar 2026', source: 'SAP Newsroom' },
    ],
  },

  '360learning': {
    capabilities: [
      { label: 'Content Library', score: 76 },
      { label: 'Course Authoring', score: 88 },
      { label: 'Compliance Training', score: 75 },
      { label: 'Social Learning', score: 95 },
      { label: 'Analytics', score: 79 },
      { label: 'Mobile', score: 85 },
    ],
    idealCustomer: {
      size: '100–5,000 employees',
      industries: ['Technology', 'Professional Services', 'Healthcare', 'Financial Services'],
      useCase: 'Collaborative learning culture organisations where subject matter experts author and co-create courses with learners',
    },
    integrations: ['Slack', 'Microsoft Teams', 'Salesforce', 'Workday', 'BambooHR', 'Zoom'],
    news: [
      { headline: '360Learning launches AI-powered Learning Needs Analysis to turn skill gaps into course briefs automatically', date: 'Feb 2026', source: '360Learning Newsroom' },
      { headline: '360Learning raises $50M Series C extension to accelerate US market growth following European success', date: 'Jan 2026', source: 'TechCrunch' },
      { headline: '360Learning surpasses 2,000 enterprise customers with 70% using collaborative course authoring monthly', date: 'Mar 2026', source: '360Learning Blog' },
    ],
  },

  'linkedin-learning': {
    capabilities: [
      { label: 'Content Library', score: 97 },
      { label: 'Course Authoring', score: 55 },
      { label: 'Compliance Training', score: 72 },
      { label: 'Social Learning', score: 82 },
      { label: 'Analytics', score: 78 },
      { label: 'Mobile', score: 88 },
    ],
    idealCustomer: {
      size: '200–100,000 employees',
      industries: ['Technology', 'Financial Services', 'Healthcare', 'Professional Services'],
      useCase: 'Enterprises wanting a vast expert-led content library with social proof and LinkedIn profile skill badges',
    },
    integrations: ['Microsoft Teams', 'Workday', 'SAP SuccessFactors', 'Cornerstone', 'Degreed', 'Okta'],
    news: [
      { headline: 'LinkedIn Learning launches AI Coach, a personalised learning companion that curates paths based on career goals', date: 'Jan 2026', source: 'LinkedIn Blog' },
      { headline: 'LinkedIn Learning reaches 1 billion course completions milestone and adds 5,000 new AI skill courses', date: 'Feb 2026', source: 'LinkedIn Newsroom' },
      { headline: 'LinkedIn Learning expands integration with Microsoft Copilot for just-in-time learning suggestions in workflow', date: 'Mar 2026', source: 'Microsoft Blog' },
    ],
  },

  'degreed': {
    capabilities: [
      { label: 'Content Library', score: 89 },
      { label: 'Course Authoring', score: 68 },
      { label: 'Compliance Training', score: 67 },
      { label: 'Social Learning', score: 85 },
      { label: 'Analytics', score: 87 },
      { label: 'Mobile', score: 84 },
    ],
    idealCustomer: {
      size: '1,000–50,000 employees',
      industries: ['Technology', 'Financial Services', 'Healthcare', 'Consulting'],
      useCase: 'Enterprise learning organisations building a skills-based talent strategy by aggregating all learning content sources',
    },
    integrations: ['LinkedIn Learning', 'Coursera', 'Cornerstone', 'Workday', 'Microsoft Teams', 'Udemy Business'],
    news: [
      { headline: 'Degreed partners with Coursera and edX to make 10,000 credential courses directly assignable by HR teams', date: 'Jan 2026', source: 'Degreed Blog' },
      { headline: 'Degreed raises $100M Series D to expand skills-based learning platform into 30 new enterprise accounts', date: 'Mar 2026', source: 'Business Wire' },
      { headline: 'Degreed named a Strategic Leader in the 2026 Fosway 9-Grid for Learning Systems for fourth year running', date: 'Apr 2026', source: 'Business Wire' },
    ],
  },

  'seismic-learning': {
    capabilities: [
      { label: 'Content Library', score: 78 },
      { label: 'Course Authoring', score: 82 },
      { label: 'Compliance Training', score: 68 },
      { label: 'Social Learning', score: 76 },
      { label: 'Analytics', score: 85 },
      { label: 'Mobile', score: 88 },
    ],
    idealCustomer: {
      size: '100–5,000 employees',
      industries: ['Technology', 'Financial Services', 'SaaS', 'Professional Services'],
      useCase: 'Revenue teams needing sales onboarding and enablement training tightly tied to deal execution and pipeline outcomes',
    },
    integrations: ['Salesforce', 'Microsoft Teams', 'Slack', 'Zoom', 'Gong', 'HubSpot'],
    news: [
      { headline: 'Seismic Learning rebrands from Lessonly and launches AI Sales Coach for real-time rep feedback on pitches', date: 'Oct 2025', source: 'Seismic Newsroom' },
      { headline: 'Seismic Learning integrates with Gong to trigger learning content recommendations based on recorded call performance', date: 'Jan 2026', source: 'Seismic Blog' },
      { headline: 'Seismic Learning reaches 2,200 enterprise customers with revenue enablement tying directly to quota attainment', date: 'Feb 2026', source: 'Seismic Newsroom' },
    ],
  },

  'bridge-lms': {
    capabilities: [
      { label: 'Content Library', score: 75 },
      { label: 'Course Authoring', score: 80 },
      { label: 'Compliance Training', score: 82 },
      { label: 'Social Learning', score: 74 },
      { label: 'Analytics', score: 75 },
      { label: 'Mobile', score: 81 },
    ],
    idealCustomer: {
      size: '200–3,000 employees',
      industries: ['Education', 'Healthcare', 'Nonprofit', 'Government'],
      useCase: 'Organisations combining employee training with performance management and career development in one platform',
    },
    integrations: ['BambooHR', 'ADP', 'Workday', 'Microsoft Teams', 'Zoom', 'Google Workspace'],
    news: [
      { headline: 'Bridge LMS launches Career Development module to connect learning completion to internal mobility pathways', date: 'Jan 2026', source: 'Bridge Blog' },
      { headline: 'Bridge LMS adds AI-assisted skill gap analysis linked directly to course recommendations and review cycles', date: 'Feb 2026', source: 'Bridge Newsroom' },
      { headline: 'Bridge LMS parent Instructure reports 25% growth in Bridge customer base following renewed focus on workforce L&D', date: 'Mar 2026', source: 'Instructure Investor Relations' },
    ],
  },

  // ─── ANALYTICS ─────────────────────────────────────────────────────────────

  'visier': {
    capabilities: [
      { label: 'Workforce Planning', score: 93 },
      { label: 'Predictive Analytics', score: 91 },
      { label: 'Benchmarking', score: 88 },
      { label: 'Data Integration', score: 90 },
      { label: 'Visualization', score: 89 },
      { label: 'Real-time Insights', score: 85 },
    ],
    idealCustomer: {
      size: '1,000–100,000 employees',
      industries: ['Technology', 'Financial Services', 'Healthcare', 'Retail'],
      useCase: 'Enterprise CHROs and people analytics teams needing deep workforce intelligence across all HR data sources',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'Oracle HCM', 'ADP', 'Tableau', 'Microsoft Power BI'],
    news: [
      { headline: 'Visier unveils next-gen Workforce AI at Outsmart 2026 with Glean MCP integration for in-flow people analytics', date: 'Apr 2026', source: 'PR Newswire' },
      { headline: 'Visier acquires workforce management analytics vendor Yoi Corp to add capacity planning capabilities', date: 'Feb 2026', source: 'Business Wire' },
      { headline: 'Visier surpasses 75,000 organisations and 25M employee records analysed on platform', date: 'Mar 2026', source: 'Visier Blog' },
    ],
  },

  'workday-prism': {
    capabilities: [
      { label: 'Workforce Planning', score: 87 },
      { label: 'Predictive Analytics', score: 85 },
      { label: 'Benchmarking', score: 80 },
      { label: 'Data Integration', score: 92 },
      { label: 'Visualization', score: 86 },
      { label: 'Real-time Insights', score: 88 },
    ],
    idealCustomer: {
      size: '5,000+ employees',
      industries: ['Technology', 'Healthcare', 'Financial Services', 'Retail'],
      useCase: 'Workday HCM customers wanting to blend external data sources with their existing Workday workforce data',
    },
    integrations: ['Workday HCM', 'Workday Finance', 'Tableau', 'Microsoft Power BI', 'Snowflake', 'Salesforce'],
    news: [
      { headline: 'Workday Prism Analytics adds no-code data blending for non-technical HR analysts to join third-party datasets', date: 'Feb 2026', source: 'Workday Newsroom' },
      { headline: 'Workday Prism launches pre-built Workforce Planning accelerators with industry-specific KPI templates', date: 'Jan 2026', source: 'Workday Blog' },
      { headline: 'Workday Prism deepens Snowflake integration for real-time data sharing without duplication', date: 'Mar 2026', source: 'Workday Newsroom' },
    ],
  },

  'sap-people-analytics': {
    capabilities: [
      { label: 'Workforce Planning', score: 84 },
      { label: 'Predictive Analytics', score: 83 },
      { label: 'Benchmarking', score: 79 },
      { label: 'Data Integration', score: 90 },
      { label: 'Visualization', score: 81 },
      { label: 'Real-time Insights', score: 82 },
    ],
    idealCustomer: {
      size: '5,000+ employees',
      industries: ['Manufacturing', 'Energy', 'Financial Services', 'Public Sector'],
      useCase: 'SAP SuccessFactors customers seeking native people analytics tightly integrated with core HR and finance data',
    },
    integrations: ['SAP SuccessFactors', 'SAP S/4HANA', 'SAP Analytics Cloud', 'Qualtrics', 'Microsoft Teams', 'Tableau'],
    news: [
      { headline: 'SAP People Analytics embeds Joule AI for natural language workforce queries across SuccessFactors data', date: 'Jan 2026', source: 'SAP Newsroom' },
      { headline: 'SAP People Analytics adds workforce carbon footprint dashboards for ESG reporting compliance', date: 'Feb 2026', source: 'SAP Blog' },
      { headline: 'SAP People Analytics achieves certification for EU pay transparency reporting under new 2025 directive', date: 'Mar 2026', source: 'SAP Newsroom' },
    ],
  },

  'orgvue': {
    capabilities: [
      { label: 'Workforce Planning', score: 92 },
      { label: 'Predictive Analytics', score: 84 },
      { label: 'Benchmarking', score: 82 },
      { label: 'Data Integration', score: 85 },
      { label: 'Visualization', score: 91 },
      { label: 'Real-time Insights', score: 80 },
    ],
    idealCustomer: {
      size: '2,000–100,000 employees',
      industries: ['Financial Services', 'Technology', 'Healthcare', 'Consulting'],
      useCase: 'Organisations undergoing transformation who need to model org design scenarios and headcount planning together',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'Oracle HCM', 'Tableau', 'Power BI', 'ServiceNow'],
    news: [
      { headline: 'OrgVue launches AI Org Design Advisor to model workforce restructuring scenarios in minutes rather than weeks', date: 'Feb 2026', source: 'OrgVue Newsroom' },
      { headline: 'OrgVue secures £40M Series C funding to expand strategic workforce planning capabilities globally', date: 'Jan 2026', source: 'TechCrunch' },
      { headline: 'OrgVue adds dynamic skills taxonomy mapping to connect role profiles to labour market data in real time', date: 'Mar 2026', source: 'OrgVue Blog' },
    ],
  },

  'crunchr': {
    capabilities: [
      { label: 'Workforce Planning', score: 86 },
      { label: 'Predictive Analytics', score: 82 },
      { label: 'Benchmarking', score: 80 },
      { label: 'Data Integration', score: 83 },
      { label: 'Visualization', score: 84 },
      { label: 'Real-time Insights', score: 78 },
    ],
    idealCustomer: {
      size: '1,000–30,000 employees',
      industries: ['Technology', 'Financial Services', 'Pharmaceutical', 'Manufacturing'],
      useCase: 'European enterprises needing GDPR-compliant people analytics with rapid time-to-insight for HR business partners',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'HiBob', 'Personio', 'Power BI', 'Tableau'],
    news: [
      { headline: 'Crunchr launches EU Pay Equity Analyser to help companies prepare for EU Pay Transparency Directive compliance', date: 'Jan 2026', source: 'Crunchr Newsroom' },
      { headline: 'Crunchr raises €18M Series B to expand AI-powered workforce analytics across European enterprise market', date: 'Feb 2026', source: 'EU-Startups' },
      { headline: 'Crunchr adds 30-day fast-start implementation for mid-market companies, reducing onboarding time by 60%', date: 'Mar 2026', source: 'Crunchr Blog' },
    ],
  },

  'peakon': {
    capabilities: [
      { label: 'Workforce Planning', score: 72 },
      { label: 'Predictive Analytics', score: 85 },
      { label: 'Benchmarking', score: 88 },
      { label: 'Data Integration', score: 80 },
      { label: 'Visualization', score: 84 },
      { label: 'Real-time Insights', score: 87 },
    ],
    idealCustomer: {
      size: '500–30,000 employees',
      industries: ['Technology', 'Retail', 'Financial Services', 'Healthcare'],
      useCase: 'Workday customers seeking continuous listening and employee sentiment analytics tightly tied to HR system of record',
    },
    integrations: ['Workday', 'Microsoft Teams', 'Slack', 'SAP SuccessFactors', 'BambooHR', 'Okta'],
    news: [
      { headline: 'Workday Peakon Employee Voice adds AI-powered manager effectiveness scoring from continuous survey data', date: 'Jan 2026', source: 'Workday Newsroom' },
      { headline: 'Workday Peakon launches Candidate Experience surveys to connect pre-hire sentiment to post-hire retention', date: 'Feb 2026', source: 'Workday Blog' },
      { headline: 'Workday deepens Peakon integration with Workday HCM for zero-ETL employee listening to business outcomes', date: 'Mar 2026', source: 'Workday Newsroom' },
    ],
  },

  'perceptyx': {
    capabilities: [
      { label: 'Workforce Planning', score: 74 },
      { label: 'Predictive Analytics', score: 86 },
      { label: 'Benchmarking', score: 84 },
      { label: 'Data Integration', score: 79 },
      { label: 'Visualization', score: 82 },
      { label: 'Real-time Insights', score: 83 },
    ],
    idealCustomer: {
      size: '1,000–50,000 employees',
      industries: ['Healthcare', 'Financial Services', 'Retail', 'Government'],
      useCase: 'Large enterprises needing always-on employee listening combined with executive-level behavioural science consulting',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'Microsoft Teams', 'Slack', 'Qualtrics', 'Medallia'],
    news: [
      { headline: 'Perceptyx acquires Cultivate to add AI-powered behavioural nudges for managers based on survey data', date: 'Jan 2026', source: 'Perceptyx Newsroom' },
      { headline: 'Perceptyx launches Workforce Intelligence Platform combining listening, action, and outcomes in one dashboard', date: 'Feb 2026', source: 'Perceptyx Blog' },
      { headline: 'Perceptyx surpasses 700 enterprise customers across 160 countries managing 10M+ active employees', date: 'Mar 2026', source: 'Perceptyx Newsroom' },
    ],
  },

  'qualtrics-employeexm': {
    capabilities: [
      { label: 'Workforce Planning', score: 77 },
      { label: 'Predictive Analytics', score: 90 },
      { label: 'Benchmarking', score: 92 },
      { label: 'Data Integration', score: 88 },
      { label: 'Visualization', score: 91 },
      { label: 'Real-time Insights', score: 89 },
    ],
    idealCustomer: {
      size: '1,000–100,000 employees',
      industries: ['Technology', 'Financial Services', 'Healthcare', 'Retail'],
      useCase: 'Enterprises running sophisticated multi-modal listening programs with advanced statistical analysis and benchmarking',
    },
    integrations: ['Workday', 'SAP SuccessFactors', 'Salesforce', 'ServiceNow', 'Microsoft Teams', 'Slack'],
    news: [
      { headline: 'Qualtrics EmployeeXM launches AI-powered Action Planning to automatically convert survey results to manager actions', date: 'Jan 2026', source: 'Qualtrics Newsroom' },
      { headline: 'Qualtrics adds 360-degree feedback and performance integration to EmployeeXM for a full experience management suite', date: 'Feb 2026', source: 'Qualtrics Blog' },
      { headline: 'SAP confirms Qualtrics will operate as an independent company following Silver Lake-led buyout completion', date: 'Mar 2026', source: 'Financial Times' },
    ],
  },

  'medallia': {
    capabilities: [
      { label: 'Workforce Planning', score: 71 },
      { label: 'Predictive Analytics', score: 87 },
      { label: 'Benchmarking', score: 83 },
      { label: 'Data Integration', score: 87 },
      { label: 'Visualization', score: 88 },
      { label: 'Real-time Insights', score: 90 },
    ],
    idealCustomer: {
      size: '2,000–100,000 employees',
      industries: ['Retail', 'Financial Services', 'Healthcare', 'Hospitality'],
      useCase: 'Enterprises tying employee experience signals directly to customer experience outcomes for business impact proof',
    },
    integrations: ['Salesforce', 'ServiceNow', 'Workday', 'Microsoft Teams', 'Slack', 'Adobe Experience Cloud'],
    news: [
      { headline: 'Thoma Bravo hands Medallia to creditor consortium in debt-for-equity swap, wiping out $5.1B of $6.4B 2021 take-private', date: 'Apr 2026', source: 'Reuters' },
      { headline: 'Medallia expands Employee Experience suite with always-on listening across email, chat, and HRIS signals', date: 'Jan 2026', source: 'Medallia Blog' },
      { headline: 'Medallia closes $200M strategic investment from Permira to accelerate AI and global growth initiatives', date: 'Mar 2026', source: 'Business Wire' },
    ],
    financialHealth: {
      fundingStage: 'Private (Creditor-owned after Apr 2026 debt-for-equity swap)',
      headcountTrend: '-8% YoY',
      acquisitionRisk: 'High',
      keySignals: [
        'Thoma Bravo handed control to creditor consortium in Apr 2026 — $5.1B of $6.4B equity wiped out',
        'Primarily customer experience — employee XM is secondary focus',
        'Ownership transition creates near-term uncertainty for product roadmap and customer commitments',
      ],
    },
    supportQuality: {
      overallScore: 62,
      responseTime: '< 24 hours (standard), < 8 hours (enterprise)',
      channels: ['Email', 'Phone', 'Customer Portal'],
      dedicatedCsm: 'Yes, at enterprise tier',
      supportTrend: 'Declining',
      highlights: [
        { text: 'Support is better for customer XM than employee XM. HR use cases sometimes feel like an afterthought.', role: 'Employee Experience Director' },
        { text: 'Enterprise support is solid but you need to push for the employee XM specialist team. General agents lack context.', role: 'People Analytics Manager' },
      ],
    },
  },

  'revelio-labs': {
    capabilities: [
      { label: 'Workforce Planning', score: 85 },
      { label: 'Predictive Analytics', score: 88 },
      { label: 'Benchmarking', score: 93 },
      { label: 'Data Integration', score: 84 },
      { label: 'Visualization', score: 80 },
      { label: 'Real-time Insights', score: 82 },
    ],
    idealCustomer: {
      size: '500–50,000 employees',
      industries: ['Financial Services', 'Technology', 'Consulting', 'Private Equity'],
      useCase: 'Talent intelligence and strategy teams needing labour market data and competitive workforce benchmarking',
    },
    integrations: ['Snowflake', 'Microsoft Power BI', 'Tableau', 'Databricks', 'Workday', 'Python/R APIs'],
    news: [
      { headline: 'Revelio Labs launches Skills Demand Tracker providing real-time visibility into emerging skill requirements by industry', date: 'Jan 2026', source: 'Revelio Labs Newsroom' },
      { headline: 'Revelio Labs partners with BlackRock and Fidelity to provide workforce analytics for ESG investment scoring', date: 'Feb 2026', source: 'Revelio Labs Blog' },
      { headline: 'Revelio Labs raises $30M Series B to expand global labour market data coverage to 90 countries', date: 'Mar 2026', source: 'TechCrunch' },
    ],
  },
}
