export type CapabilityScore = { label: string; score: number }
export type VendorDetail = {
  capabilities: CapabilityScore[]
  idealCustomer: { size: string; industries: string[]; useCase: string }
  integrations: string[]
  news: { headline: string; date: string; source: string }[]
}

export const vendorDetails: Record<string, VendorDetail> = {

  // ─── HCM ───────────────────────────────────────────────────────────────────

  'workday': {
    capabilities: [
      { label: 'Core HR', score: 96 },
      { label: 'Payroll', score: 88 },
      { label: 'Benefits', score: 85 },
      { label: 'Workforce Mgmt', score: 90 },
      { label: 'Analytics', score: 92 },
      { label: 'Global', score: 94 },
    ],
    idealCustomer: {
      size: '5,000+ employees',
      industries: ['Technology', 'Healthcare', 'Financial Services', 'Higher Education'],
      useCase: 'Large enterprises seeking a unified HCM and financial management platform with deep analytics',
    },
    integrations: ['Slack', 'Salesforce', 'ServiceNow', 'Microsoft Teams', 'Okta', 'ADP'],
    news: [
      { headline: 'Workday launches AI-powered Skills Cloud to match employees with internal mobility opportunities', date: 'Jan 2026', source: 'Workday Newsroom' },
      { headline: 'Workday expands Illuminate AI assistant across HCM, Finance, and Analytics modules', date: 'Mar 2026', source: 'Workday Newsroom' },
      { headline: 'Workday reports Q4 FY2026 revenue of $2.35B, driven by subscription growth in EMEA', date: 'Feb 2026', source: 'Workday Investor Relations' },
    ],
  },

  'rippling': {
    capabilities: [
      { label: 'Core HR', score: 88 },
      { label: 'Payroll', score: 91 },
      { label: 'Benefits', score: 84 },
      { label: 'Workforce Mgmt', score: 80 },
      { label: 'Analytics', score: 79 },
      { label: 'Global', score: 86 },
    ],
    idealCustomer: {
      size: '50–2,000 employees',
      industries: ['Technology', 'Professional Services', 'Retail', 'Healthcare'],
      useCase: 'Fast-growing companies needing HR, IT, and Finance unified in a single platform',
    },
    integrations: ['Slack', 'GitHub', 'Google Workspace', 'Salesforce', 'QuickBooks', 'Okta'],
    news: [
      { headline: 'Rippling raises $450M Series F at $16.8B valuation to accelerate global expansion', date: 'Jan 2026', source: 'Rippling Blog' },
      { headline: 'Rippling launches Spend Management module to consolidate corporate cards and expense reporting', date: 'Mar 2026', source: 'TechCrunch' },
      { headline: 'Rippling announces native EOR capabilities in 50 additional countries', date: 'Feb 2026', source: 'Rippling Newsroom' },
    ],
  },

  'bamboohr': {
    capabilities: [
      { label: 'Core HR', score: 87 },
      { label: 'Payroll', score: 78 },
      { label: 'Benefits', score: 75 },
      { label: 'Workforce Mgmt', score: 70 },
      { label: 'Analytics', score: 72 },
      { label: 'Global', score: 58 },
    ],
    idealCustomer: {
      size: '25–1,000 employees',
      industries: ['Technology', 'Nonprofit', 'Professional Services', 'Hospitality'],
      useCase: 'SMBs wanting an intuitive all-in-one HR platform without the enterprise complexity',
    },
    integrations: ['Slack', 'QuickBooks', 'Indeed', 'LinkedIn', 'Google Workspace', 'Zapier'],
    news: [
      { headline: 'BambooHR introduces AI-driven eNPS benchmarking to help SMBs track employee sentiment', date: 'Feb 2026', source: 'BambooHR Blog' },
      { headline: 'BambooHR adds payroll support for Canada, marking its first international payroll offering', date: 'Jan 2026', source: 'BambooHR Newsroom' },
      { headline: 'BambooHR partners with Gusto to offer seamless payroll migration for growing companies', date: 'Mar 2026', source: 'HR Tech Insider' },
    ],
  },

  'ukg-pro': {
    capabilities: [
      { label: 'Core HR', score: 91 },
      { label: 'Payroll', score: 93 },
      { label: 'Benefits', score: 88 },
      { label: 'Workforce Mgmt', score: 94 },
      { label: 'Analytics', score: 84 },
      { label: 'Global', score: 80 },
    ],
    idealCustomer: {
      size: '1,000–50,000 employees',
      industries: ['Healthcare', 'Retail', 'Manufacturing', 'Hospitality'],
      useCase: 'Mid-to-large employers in shift-heavy industries needing powerful workforce scheduling alongside payroll',
    },
    integrations: ['Microsoft Teams', 'Salesforce', 'ADP', 'ServiceNow', 'Workato', 'Kronos (legacy)'],
    news: [
      { headline: 'UKG Pro integrates Great Place To Work culture data directly into its HCM dashboard', date: 'Feb 2026', source: 'UKG Newsroom' },
      { headline: 'UKG announces UKG Bryte AI enhancements for proactive burnout detection in frontline workers', date: 'Jan 2026', source: 'UKG Newsroom' },
      { headline: 'UKG acquires workforce analytics firm Immedis to strengthen global payroll intelligence', date: 'Mar 2026', source: 'Business Wire' },
    ],
  },

  'adp': {
    capabilities: [
      { label: 'Core HR', score: 85 },
      { label: 'Payroll', score: 97 },
      { label: 'Benefits', score: 86 },
      { label: 'Workforce Mgmt', score: 80 },
      { label: 'Analytics', score: 76 },
      { label: 'Global', score: 90 },
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
  },

  'sap-successfactors': {
    capabilities: [
      { label: 'Core HR', score: 90 },
      { label: 'Payroll', score: 84 },
      { label: 'Benefits', score: 80 },
      { label: 'Workforce Mgmt', score: 82 },
      { label: 'Analytics', score: 87 },
      { label: 'Global', score: 95 },
    ],
    idealCustomer: {
      size: '5,000+ employees',
      industries: ['Manufacturing', 'Energy', 'Financial Services', 'Public Sector'],
      useCase: 'Global enterprises already on SAP ERP seeking tight HCM integration and multi-country compliance',
    },
    integrations: ['SAP S/4HANA', 'Microsoft Teams', 'Concur', 'Qualtrics', 'ServiceNow', 'Okta'],
    news: [
      { headline: 'SAP SuccessFactors embeds Joule AI copilot across all HCM modules for real-time HR guidance', date: 'Feb 2026', source: 'SAP Newsroom' },
      { headline: 'SAP SuccessFactors wins HR Tech Platinum Award for Best Global HCM Suite for fifth consecutive year', date: 'Oct 2025', source: 'HR Technology Conference' },
      { headline: 'SAP SuccessFactors expands payroll localisation to 17 new countries including Vietnam and Nigeria', date: 'Jan 2026', source: 'SAP Newsroom' },
    ],
  },

  'oracle-hcm-cloud': {
    capabilities: [
      { label: 'Core HR', score: 89 },
      { label: 'Payroll', score: 85 },
      { label: 'Benefits', score: 83 },
      { label: 'Workforce Mgmt', score: 81 },
      { label: 'Analytics', score: 88 },
      { label: 'Global', score: 92 },
    ],
    idealCustomer: {
      size: '5,000+ employees',
      industries: ['Financial Services', 'Healthcare', 'Retail', 'Technology'],
      useCase: 'Large organisations seeking a fully integrated Oracle Cloud ERP and HCM stack',
    },
    integrations: ['Oracle ERP Cloud', 'Salesforce', 'Microsoft Teams', 'Taleo', 'ServiceNow', 'Okta'],
    news: [
      { headline: 'Oracle HCM Cloud launches AI-powered Talent Advisor for automated succession planning', date: 'Jan 2026', source: 'Oracle Newsroom' },
      { headline: 'Oracle announces deep integration between HCM Cloud and Oracle Analytics Cloud for workforce insights', date: 'Mar 2026', source: 'Oracle Newsroom' },
      { headline: 'Oracle HCM Cloud adds payroll support for 12 Asia-Pacific countries in latest release', date: 'Feb 2026', source: 'Oracle Blog' },
    ],
  },

  'ceridian-dayforce': {
    capabilities: [
      { label: 'Core HR', score: 88 },
      { label: 'Payroll', score: 91 },
      { label: 'Benefits', score: 85 },
      { label: 'Workforce Mgmt', score: 92 },
      { label: 'Analytics', score: 83 },
      { label: 'Global', score: 82 },
    ],
    idealCustomer: {
      size: '1,000–25,000 employees',
      industries: ['Retail', 'Healthcare', 'Hospitality', 'Manufacturing'],
      useCase: 'Mid-market employers needing real-time payroll calculation alongside advanced scheduling',
    },
    integrations: ['Microsoft Teams', 'Workato', 'PowerBI', 'Salesforce', 'Okta', 'ADP'],
    news: [
      { headline: 'Ceridian rebrands to Dayforce, unifying its product and corporate identity under one name', date: 'Oct 2025', source: 'Dayforce Newsroom' },
      { headline: 'Dayforce launches Co-Pilot, an AI assistant for managers to handle schedule exceptions in real time', date: 'Feb 2026', source: 'Dayforce Newsroom' },
      { headline: 'Dayforce reports 22% YoY cloud revenue growth driven by new enterprise wins in healthcare', date: 'Jan 2026', source: 'Dayforce Investor Relations' },
    ],
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
      { headline: 'Darwinbox raises $140M Series E to expand AI-powered HR platform across Southeast Asia and Middle East', date: 'Feb 2026', source: 'TechCrunch' },
      { headline: 'Darwinbox launches GenAI HR assistant in 14 languages for frontline worker accessibility', date: 'Jan 2026', source: 'Darwinbox Blog' },
      { headline: 'Darwinbox surpasses 3 million employees managed on platform, doubling from 2024', date: 'Mar 2026', source: 'Darwinbox Newsroom' },
    ],
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
  },

  // ─── ATS ───────────────────────────────────────────────────────────────────

  'greenhouse': {
    capabilities: [
      { label: 'Sourcing', score: 82 },
      { label: 'Pipeline Mgmt', score: 94 },
      { label: 'Interview Tools', score: 91 },
      { label: 'Reporting', score: 88 },
      { label: 'Candidate CX', score: 87 },
      { label: 'Integrations', score: 95 },
    ],
    idealCustomer: {
      size: '200–10,000 employees',
      industries: ['Technology', 'Financial Services', 'Media', 'Professional Services'],
      useCase: 'Structured-hiring teams that prioritise DEI data, interview kits, and a rich integration ecosystem',
    },
    integrations: ['Slack', 'LinkedIn', 'Workday', 'BambooHR', 'HireEZ', 'DocuSign'],
    news: [
      { headline: 'Greenhouse launches Hiring Intelligence suite with AI-driven bias alerts and structured interview scoring', date: 'Feb 2026', source: 'Greenhouse Newsroom' },
      { headline: 'Greenhouse crosses 7,500 customers and announces Series E extension of $110M', date: 'Jan 2026', source: 'TechCrunch' },
      { headline: 'Greenhouse adds native video interviewing powered by Zoom directly in the candidate pipeline', date: 'Mar 2026', source: 'Greenhouse Blog' },
    ],
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
      { headline: 'iCIMS launches Copilot for Recruiters, an AI assistant embedded directly in the ATS workflow', date: 'Feb 2026', source: 'iCIMS Newsroom' },
      { headline: 'iCIMS acquires conversational AI startup Paradox to power automated candidate screening', date: 'Jan 2026', source: 'Business Wire' },
      { headline: 'iCIMS Talent Cloud surpasses 600 enterprise customers and 4M annual hires processed', date: 'Mar 2026', source: 'iCIMS Newsroom' },
    ],
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
      { headline: 'SmartRecruiters wins HR Tech Best Recruitment Software award at the 2025 HR Technology Conference', date: 'Oct 2025', source: 'HR Technology Conference' },
      { headline: 'SmartRecruiters expands SmartCRM module with predictive talent pipeline forecasting capabilities', date: 'Mar 2026', source: 'SmartRecruiters Blog' },
    ],
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
      { headline: 'HiBob raises $150M Series E valuing the company at $2.5B, accelerating US and APAC expansion', date: 'Jan 2026', source: 'TechCrunch' },
      { headline: 'HiBob expands payroll integrations to cover 50 countries in partnership with Papaya Global', date: 'Mar 2026', source: 'HiBob Blog' },
    ],
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
      { headline: 'Personio launches HR Analytics Pro with turnover prediction models for European mid-market companies', date: 'Jan 2026', source: 'Personio Newsroom' },
      { headline: 'Personio expands into UK and Iberian markets with localised compliance and payroll partnerships', date: 'Feb 2026', source: 'Personio Blog' },
      { headline: 'Personio surpasses 15,000 customers and €1B ARR milestone, announces IPO consideration for 2027', date: 'Mar 2026', source: 'Financial Times' },
    ],
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
  },

  'paylocity': {
    capabilities: [
      { label: 'Employee Records', score: 84 },
      { label: 'Onboarding', score: 82 },
      { label: 'Benefits Admin', score: 80 },
      { label: 'Compliance', score: 81 },
      { label: 'Self-Service', score: 86 },
      { label: 'Analytics', score: 77 },
    ],
    idealCustomer: {
      size: '50–2,500 employees',
      industries: ['Healthcare', 'Retail', 'Manufacturing', 'Professional Services'],
      useCase: 'US mid-market companies seeking a modern HRIS with strong community and communication tools',
    },
    integrations: ['QuickBooks', 'ADP', 'Microsoft 365', 'Slack', 'Indeed', 'Checkr'],
    news: [
      { headline: 'Paylocity launches Community, a social intranet within the HRIS to connect distributed workforces', date: 'Feb 2026', source: 'Paylocity Newsroom' },
      { headline: 'Paylocity adds AI-powered salary benchmarking using real-time market data from 500K+ companies', date: 'Jan 2026', source: 'Paylocity Blog' },
      { headline: 'Paylocity reports fiscal Q2 2026 revenue of $380M, citing 19% growth in total HCM customers', date: 'Mar 2026', source: 'Paylocity Investor Relations' },
    ],
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
      { headline: 'Gusto launches Gusto Global to support US small businesses with EOR services in 12 countries', date: 'Jan 2026', source: 'Gusto Newsroom' },
      { headline: 'Gusto introduces AI payroll assistant to automatically flag anomalies before pay runs are submitted', date: 'Feb 2026', source: 'Gusto Blog' },
      { headline: 'Gusto surpasses 400,000 businesses on platform, processing over $30B in payroll annually', date: 'Mar 2026', source: 'Gusto Newsroom' },
    ],
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
      { headline: 'Remote launches Remote Equity to manage stock option grants for international employees compliantly', date: 'Feb 2026', source: 'Remote Newsroom' },
      { headline: 'Remote expands EOR coverage to 30 new countries including Saudi Arabia, Vietnam, and Colombia', date: 'Jan 2026', source: 'Remote Blog' },
      { headline: 'Remote reaches $1B ARR milestone driven by rapid adoption of global payroll consolidation', date: 'Mar 2026', source: 'TechCrunch' },
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
      { headline: 'Papaya Global launches AI-powered payroll variance detection to flag cross-country anomalies instantly', date: 'Jan 2026', source: 'Papaya Global Newsroom' },
      { headline: 'Papaya Global achieves $100M quarterly processing in payments network across 160 countries', date: 'Feb 2026', source: 'Papaya Global Blog' },
      { headline: 'Papaya Global partners with HSBC to offer embedded global payroll payments within banking infrastructure', date: 'Mar 2026', source: 'Business Wire' },
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
      { headline: 'Lattice launches AI Performance Coach, delivering personalised development suggestions based on review data', date: 'Jan 2026', source: 'Lattice Newsroom' },
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
      { headline: 'Cornerstone OnDemand launches Cornerstone Galaxy AI platform for personalised skills-based learning paths', date: 'Feb 2026', source: 'Cornerstone Newsroom' },
      { headline: 'Cornerstone acquires SumTotal Systems to consolidate global talent management market share', date: 'Jan 2026', source: 'Business Wire' },
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
      { headline: 'Docebo launches Shape AI to generate course content from PDFs, videos, and web pages in minutes', date: 'Jan 2026', source: 'Docebo Newsroom' },
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
      { headline: 'Degreed launches Skills Intelligence Cloud to map organisational skill inventory in real time using AI', date: 'Feb 2026', source: 'Degreed Newsroom' },
      { headline: 'Degreed partners with Coursera and edX to make 10,000 credential courses directly assignable by HR teams', date: 'Jan 2026', source: 'Degreed Blog' },
      { headline: 'Degreed raises $100M Series D to expand skills-based learning platform into 30 new enterprise accounts', date: 'Mar 2026', source: 'Business Wire' },
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
      { headline: 'Visier launches Vee, a generative AI workforce analyst that answers natural language HR questions instantly', date: 'Jan 2026', source: 'Visier Newsroom' },
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
      { headline: 'Medallia launches Ask Athena GenAI engine to surface employee and customer insights via conversational search', date: 'Feb 2026', source: 'Medallia Newsroom' },
      { headline: 'Medallia expands Employee Experience suite with always-on listening across email, chat, and HRIS signals', date: 'Jan 2026', source: 'Medallia Blog' },
      { headline: 'Medallia closes $200M strategic investment from Permira to accelerate AI and global growth initiatives', date: 'Mar 2026', source: 'Business Wire' },
    ],
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
