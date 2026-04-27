export type Vendor = {
  name: string
  slug: string
  category: string
  g2: number
  capterra: number
  reviews: number
  employees: string
  news: number
  deepDive: boolean
  website: string
  description: string
  glassdoor: number
  linkedin: string
}

const rawVendors = [
  // HCM
  { name: 'Workday',              slug: 'workday',              category: 'HCM',       g2: 4.1, capterra: 4.4, reviews: 2800,  employees: '18,000+',  news: 13, deepDive: false, website: 'workday.com',                       description: 'Enterprise-grade HCM suite covering HR, finance, and planning in a single cloud platform.' },
  { name: 'SAP SuccessFactors',   slug: 'sap-successfactors',   category: 'HCM',       g2: 3.9, capterra: 4.0, reviews: 1000,  employees: '100,000+', news: 17, deepDive: false, website: 'successfactors.com',                 description: 'Cloud-based HCM suite from SAP for global enterprise workforce management.' },
  { name: 'Oracle HCM Cloud',     slug: 'oracle-hcm-cloud',     category: 'HCM',       g2: 3.7, capterra: 4.0, reviews: 700,   employees: '150,000+', news: 13, deepDive: false, website: 'oracle.com',                         description: "Oracle's global HR platform integrating talent, payroll, and workforce management." },
  { name: 'UKG Pro',              slug: 'ukg-pro',              category: 'HCM',       g2: 4.3, capterra: 4.3, reviews: 2100,  employees: '15,000+',  news: 11, deepDive: false, website: 'ukg.com',                            description: 'Comprehensive HCM platform built from the merger of Ultimate Software and Kronos.' },
  { name: 'Ceridian Dayforce',    slug: 'ceridian-dayforce',    category: 'HCM',       g2: 4.2, capterra: 4.3, reviews: 1400,  employees: '6,700+',   news: 7,  deepDive: false, website: 'ceridian.com',                       description: 'Unified HCM platform with real-time payroll and workforce management on a single database.' },
  { name: 'Paycom',               slug: 'paycom',               category: 'HCM',       g2: 4.2, capterra: 4.4, reviews: 2400,  employees: '6,000+',   news: 8,  deepDive: false, website: 'paycom.com',                         description: 'Single-database HR and payroll solution with strong employee self-service capabilities.' },
  { name: 'Paychex Flex',         slug: 'paychex-flex',         category: 'HCM',       g2: 4.2, capterra: 4.1, reviews: 5400,  employees: '16,000+',  news: 6,  deepDive: false, website: 'paychex.com',                        description: 'Scalable HR and payroll platform for SMBs through enterprise.' },
  { name: 'Infor HCM',            slug: 'infor-hcm',            category: 'HCM',       g2: 3.7, capterra: 3.8, reviews: 300,   employees: '17,000+',  news: 4,  deepDive: false, website: 'infor.com',                          description: 'Industry-specific HCM suite with deep configurability for complex organizations.' },
  { name: 'Darwinbox',            slug: 'darwinbox',            category: 'HCM',       g2: 4.3, capterra: 4.4, reviews: 150,   employees: '1,000+',   news: 4,  deepDive: false, website: 'darwinbox.com',                      description: 'Mobile-first HCM platform built for high-growth companies in Asia and globally.' },
  { name: 'Namely',               slug: 'namely',               category: 'HCM',       g2: 3.9, capterra: 4.2, reviews: 700,   employees: '500+',     news: 3,  deepDive: false, website: 'namely.com',                         description: 'Mid-market HR platform designed for companies between 25–1,000 employees.' },
  // ATS
  { name: 'Greenhouse',           slug: 'greenhouse',           category: 'ATS',       g2: 4.4, capterra: 4.5, reviews: 2800,  employees: '800+',     news: 10, deepDive: false, website: 'greenhouse.com',                     description: 'Structured hiring platform built for data-driven recruiting teams.' },
  { name: 'Lever',                slug: 'lever',                category: 'ATS',       g2: 4.3, capterra: 4.6, reviews: 2600,  employees: '400+',     news: 3,  deepDive: false, website: 'lever.co',                           description: 'Candidate relationship management meets ATS for talent-forward hiring teams.' },
  { name: 'iCIMS',                slug: 'icims',                category: 'ATS',       g2: 4.1, capterra: 4.3, reviews: 1600,  employees: '1,800+',   news: 9,  deepDive: false, website: 'icims.com',                          description: 'Enterprise recruiting platform with a broad ecosystem of integrations and assessments.' },
  { name: 'Ashby',                slug: 'ashby',                category: 'ATS',       g2: 4.7, capterra: 4.8, reviews: 700,   employees: '200+',     news: 4,  deepDive: false, website: 'ashbyhq.com',                        description: 'Modern ATS built for high-growth teams that want analytics baked into every workflow.' },
  { name: 'SmartRecruiters',      slug: 'smartrecruiters',      category: 'ATS',       g2: 4.2, capterra: 4.2, reviews: 900,   employees: '700+',     news: 6,  deepDive: false, website: 'smartrecruiters.com',                description: 'Enterprise TA suite with a built-in marketplace of recruiting apps and assessments.' },
  { name: 'Workable',             slug: 'workable',             category: 'ATS',       g2: 4.6, capterra: 4.5, reviews: 1300,  employees: '350+',     news: 4,  deepDive: false, website: 'workable.com',                       description: 'All-in-one hiring platform favored by growing SMBs for its speed and simplicity.' },
  { name: 'JazzHR',               slug: 'jazzhr',               category: 'ATS',       g2: 4.3, capterra: 4.4, reviews: 800,   employees: '200+',     news: 2,  deepDive: false, website: 'jazzhr.com',                         description: 'Collaborative ATS built for small businesses scaling their hiring efforts.' },
  { name: 'Bullhorn',             slug: 'bullhorn',             category: 'ATS',       g2: 4.0, capterra: 4.1, reviews: 1100,  employees: '1,500+',   news: 5,  deepDive: false, website: 'bullhorn.com',                       description: 'CRM and ATS platform purpose-built for staffing and recruiting agencies.' },
  { name: 'Breezy HR',            slug: 'breezy-hr',            category: 'ATS',       g2: 4.4, capterra: 4.5, reviews: 600,   employees: '100+',     news: 2,  deepDive: false, website: 'breezy.hr',                          description: 'Visual pipeline ATS with a focus on candidate experience and hiring team collaboration.' },
  { name: 'Oracle Taleo',         slug: 'oracle-taleo',         category: 'ATS',       g2: 3.5, capterra: 3.6, reviews: 500,   employees: '150,000+', news: 7,  deepDive: false, website: 'oracle.com',                         description: "Enterprise ATS embedded in Oracle's broader HCM ecosystem." },
  // HRIS
  { name: 'BambooHR',             slug: 'bamboohr',             category: 'HRIS',      g2: 4.4, capterra: 4.6, reviews: 5200,  employees: '1,200+',   news: 8,  deepDive: false, website: 'bamboohr.com',                       description: 'HR software for small and mid-sized companies with a well-earned reputation for great UX.' },
  { name: 'Rippling',             slug: 'rippling',             category: 'HRIS',      g2: 4.8, capterra: 4.9, reviews: 8000,  employees: '3,000+',   news: 25, deepDive: false, website: 'rippling.com',                       description: 'Unified workforce platform connecting HR, IT, and finance in one system.' },
  { name: 'Gusto',                slug: 'gusto',                category: 'HRIS',      g2: 4.5, capterra: 4.6, reviews: 6100,  employees: '2,500+',   news: 15, deepDive: false, website: 'gusto.com',                          description: 'Payroll, benefits, and HR platform built for SMBs and their teams.' },
  { name: 'Zenefits',             slug: 'zenefits',             category: 'HRIS',      g2: 4.0, capterra: 4.2, reviews: 800,   employees: '1,000+',   news: 5,  deepDive: false, website: 'zenefits.com',                       description: 'HR platform focused on benefits administration and compliance for SMBs.' },
  { name: 'Personio',             slug: 'personio',             category: 'HRIS',      g2: 4.3, capterra: 4.6, reviews: 900,   employees: '2,000+',   news: 8,  deepDive: false, website: 'personio.com',                       description: 'European all-in-one HR platform for small and mid-sized companies.' },
  { name: 'HiBob',                slug: 'hibob',                category: 'HRIS',      g2: 4.5, capterra: 4.6, reviews: 1200,  employees: '1,000+',   news: 9,  deepDive: false, website: 'hibob.com',                          description: "Modern HRIS (called Bob) designed for today's global, distributed workforce." },
  { name: 'Factorial',            slug: 'factorial',            category: 'HRIS',      g2: 4.3, capterra: 4.5, reviews: 500,   employees: '800+',     news: 3,  deepDive: false, website: 'factorialhr.com',                    description: 'HR software for SMBs covering time tracking, payroll, and team management.' },
  { name: 'Deel',                 slug: 'deel',                 category: 'HRIS',      g2: 4.8, capterra: 4.7, reviews: 6300,  employees: '3,000+',   news: 15, deepDive: false, website: 'deel.com',                           description: 'Global HR and payroll platform for companies hiring contractors and employees across borders.' },
  { name: 'Humaans',              slug: 'humaans',              category: 'HRIS',      g2: 4.7, capterra: 4.6, reviews: 200,   employees: '100+',     news: 2,  deepDive: false, website: 'humaans.io',                         description: 'Clean, API-first HRIS for modern tech companies that want control over their HR stack.' },
  { name: 'Sage HR',              slug: 'sage-hr',              category: 'HRIS',      g2: 4.3, capterra: 4.4, reviews: 400,   employees: '14,000+',  news: 3,  deepDive: false, website: 'sage.com',                           description: 'Cloud HR and people management software from Sage for growing SMBs.' },
  // Payroll
  { name: 'ADP',                  slug: 'adp',                  category: 'Payroll',   g2: 4.0, capterra: 4.3, reviews: 17500, employees: '60,000+',  news: 18, deepDive: false, website: 'adp.com',                            description: 'The market leader in payroll and HCM solutions for businesses of all sizes.' },
  { name: 'Paychex',              slug: 'paychex',              category: 'Payroll',   g2: 4.2, capterra: 4.1, reviews: 5400,  employees: '16,000+',  news: 8,  deepDive: false, website: 'paychex.com',                        description: 'Full-service payroll and HR solutions for small to large businesses.' },
  { name: 'Paylocity',            slug: 'paylocity',            category: 'Payroll',   g2: 4.4, capterra: 4.3, reviews: 3600,  employees: '6,000+',   news: 9,  deepDive: false, website: 'paylocity.com',                      description: 'Cloud-based payroll and HCM with a focus on employee communication and engagement.' },
  { name: 'OnPay',                slug: 'onpay',                category: 'Payroll',   g2: 4.8, capterra: 4.8, reviews: 700,   employees: '200+',     news: 2,  deepDive: false, website: 'onpay.com',                          description: 'Simple, accurate payroll with strong customer support built for small businesses.' },
  { name: 'Homebase',             slug: 'homebase',             category: 'Payroll',   g2: 4.3, capterra: 4.6, reviews: 1100,  employees: '1,000+',   news: 3,  deepDive: false, website: 'joinhomebase.com',                   description: 'Scheduling, time tracking, and payroll for hourly workers and shift-based teams.' },
  { name: 'QuickBooks Payroll',   slug: 'quickbooks-payroll',   category: 'Payroll',   g2: 3.9, capterra: 4.5, reviews: 900,   employees: '21,000+',  news: 5,  deepDive: false, website: 'intuit.com',                         description: 'Integrated payroll solution for businesses already running on QuickBooks.' },
  { name: 'Patriot Software',     slug: 'patriot-software',     category: 'Payroll',   g2: 4.8, capterra: 4.8, reviews: 400,   employees: '100+',     news: 1,  deepDive: false, website: 'patriotsoftware.com',                description: 'Affordable payroll and accounting software designed for small businesses.' },
  { name: 'Remote',               slug: 'remote',               category: 'Payroll',   g2: 4.6, capterra: 4.8, reviews: 1600,  employees: '1,000+',   news: 9,  deepDive: false, website: 'remote.com',                         description: 'Global payroll, benefits, and compliance platform for distributed teams.' },
  { name: 'Papaya Global',        slug: 'papaya-global',        category: 'Payroll',   g2: 4.3, capterra: 4.4, reviews: 300,   employees: '700+',     news: 5,  deepDive: false, website: 'papayaglobal.com',                   description: 'Automated global payroll and workforce management platform for multinational companies.' },
  { name: 'Wagepoint',            slug: 'wagepoint',            category: 'Payroll',   g2: 4.5, capterra: 4.7, reviews: 250,   employees: '100+',     news: 1,  deepDive: false, website: 'wagepoint.com',                      description: 'Simple payroll software built for small businesses in Canada and the US.' },
  // Perf Mgmt
  { name: 'Lattice',              slug: 'lattice',              category: 'Perf Mgmt', g2: 4.7, capterra: 4.5, reviews: 4000,  employees: '600+',     news: 6,  deepDive: false, website: 'lattice.com',                        description: 'Performance management and engagement platform with OKR and people analytics features.' },
  { name: '15Five',               slug: '15five',               category: 'Perf Mgmt', g2: 4.6, capterra: 4.7, reviews: 2700,  employees: '300+',     news: 4,  deepDive: false, website: '15five.com',                         description: 'Continuous performance management built around weekly check-ins and OKRs.' },
  { name: 'Culture Amp',          slug: 'culture-amp',          category: 'Perf Mgmt', g2: 4.5, capterra: 4.7, reviews: 300,   employees: '800+',     news: 6,  deepDive: false, website: 'cultureamp.com',                     description: 'Employee engagement and performance platform used by 6,500+ companies worldwide.' },
  { name: 'Betterworks',          slug: 'betterworks',          category: 'Perf Mgmt', g2: 4.3, capterra: 4.4, reviews: 500,   employees: '200+',     news: 3,  deepDive: false, website: 'betterworks.com',                    description: 'Enterprise OKR and continuous performance management platform.' },
  { name: 'Leapsome',             slug: 'leapsome',             category: 'Perf Mgmt', g2: 4.8, capterra: 4.7, reviews: 700,   employees: '300+',     news: 3,  deepDive: false, website: 'leapsome.com',                       description: 'Integrated people enablement platform for performance, engagement, and learning.' },
  { name: 'Engagedly',            slug: 'engagedly',            category: 'Perf Mgmt', g2: 4.4, capterra: 4.5, reviews: 400,   employees: '200+',     news: 2,  deepDive: false, website: 'engagedly.com',                      description: 'Gamified performance management and employee engagement platform for growing teams.' },
  { name: 'Reflektive',           slug: 'reflektive',           category: 'Perf Mgmt', g2: 4.1, capterra: 4.2, reviews: 300,   employees: '150+',     news: 1,  deepDive: false, website: 'reflektive.com',                     description: 'Real-time performance management with built-in manager effectiveness tools.' },
  { name: 'PerformYard',          slug: 'performyard',          category: 'Perf Mgmt', g2: 4.7, capterra: 4.8, reviews: 600,   employees: '100+',     news: 2,  deepDive: false, website: 'performyard.com',                    description: 'Flexible performance management that adapts to any review process or company structure.' },
  { name: 'Trakstar',             slug: 'trakstar',             category: 'Perf Mgmt', g2: 4.3, capterra: 4.4, reviews: 350,   employees: '150+',     news: 1,  deepDive: false, website: 'trakstar.com',                       description: 'Performance appraisal and goal management software for growing companies.' },
  { name: 'WorkBoard',            slug: 'workboard',            category: 'Perf Mgmt', g2: 4.4, capterra: 4.4, reviews: 300,   employees: '200+',     news: 2,  deepDive: false, website: 'workboard.com',                      description: 'Enterprise OKR and strategy execution platform for distributed leadership teams.' },
  // L&D
  { name: 'Cornerstone OnDemand', slug: 'cornerstone-ondemand', category: 'L&D',       g2: 4.1, capterra: 4.1, reviews: 1000,  employees: '3,000+',   news: 6,  deepDive: false, website: 'cornerstoneondemand.com',            description: 'Enterprise learning and talent management suite with deep compliance and skills features.' },
  { name: 'Docebo',               slug: 'docebo',               category: 'L&D',       g2: 4.4, capterra: 4.3, reviews: 700,   employees: '700+',     news: 7,  deepDive: false, website: 'docebo.com',                         description: 'AI-powered LMS for enterprise-scale learning and customer education programs.' },
  { name: 'TalentLMS',            slug: 'talentlms',            category: 'L&D',       g2: 4.6, capterra: 4.7, reviews: 900,   employees: '200+',     news: 3,  deepDive: false, website: 'talentlms.com',                      description: 'Cloud LMS known for ease of use and fast time-to-value for growing teams.' },
  { name: 'Absorb LMS',           slug: 'absorb-lms',           category: 'L&D',       g2: 4.7, capterra: 4.5, reviews: 600,   employees: '300+',     news: 2,  deepDive: false, website: 'absorblms.com',                      description: 'Intuitive LMS with powerful reporting for mid-market to enterprise learning programs.' },
  { name: 'SAP Litmos',           slug: 'sap-litmos',           category: 'L&D',       g2: 4.1, capterra: 4.2, reviews: 500,   employees: '100,000+', news: 3,  deepDive: false, website: 'litmos.com',                         description: 'Cloud training platform with pre-built content library and compliance tracking from SAP.' },
  { name: '360Learning',          slug: '360learning',          category: 'L&D',       g2: 4.6, capterra: 4.5, reviews: 400,   employees: '400+',     news: 4,  deepDive: false, website: '360learning.com',                    description: 'Collaborative LMS powered by peer learning and AI-assisted course creation.' },
  { name: 'LinkedIn Learning',    slug: 'linkedin-learning',    category: 'L&D',       g2: 4.4, capterra: 4.5, reviews: 1800,  employees: '20,000+',  news: 7,  deepDive: false, website: 'linkedin.com',                       description: "Professional skill development platform tied to the world's largest professional network." },
  { name: 'Degreed',              slug: 'degreed',              category: 'L&D',       g2: 4.3, capterra: 4.2, reviews: 500,   employees: '600+',     news: 4,  deepDive: false, website: 'degreed.com',                        description: 'Learning experience platform for continuous skill-building and career development.' },
  { name: 'Seismic Learning',     slug: 'seismic-learning',     category: 'L&D',       g2: 4.6, capterra: 4.7, reviews: 700,   employees: '2,000+',   news: 3,  deepDive: false, website: 'seismic.com',                        description: 'Sales enablement and training platform (formerly Lessonly) for revenue teams.' },
  { name: 'Bridge LMS',           slug: 'bridge-lms',           category: 'L&D',       g2: 4.4, capterra: 4.4, reviews: 400,   employees: '200+',     news: 2,  deepDive: false, website: 'bridgeapp.com',                      description: 'Employee development platform connecting learning, performance, and engagement.' },
  // Analytics
  { name: 'Visier',               slug: 'visier',               category: 'Analytics', g2: 4.4, capterra: 4.3, reviews: 300,   employees: '700+',     news: 7,  deepDive: false, website: 'visier.com',                         description: 'Purpose-built people analytics platform used by global enterprises for workforce insights.' },
  { name: 'Workday Prism',        slug: 'workday-prism',        category: 'Analytics', g2: 4.0, capterra: 4.1, reviews: 400,   employees: '18,000+',  news: 8,  deepDive: false, website: 'workday.com',                        description: 'Blends external data with Workday HR data for advanced workforce analytics and reporting.' },
  { name: 'SAP People Analytics', slug: 'sap-people-analytics', category: 'Analytics', g2: 3.9, capterra: 4.0, reviews: 200,   employees: '100,000+', news: 5,  deepDive: false, website: 'successfactors.com',                 description: 'Embedded analytics within SAP SuccessFactors for real-time workforce insights.' },
  { name: 'OrgVue',               slug: 'orgvue',               category: 'Analytics', g2: 4.3, capterra: 4.2, reviews: 150,   employees: '200+',     news: 2,  deepDive: false, website: 'orgvue.com',                         description: 'Organizational design and workforce planning platform for data-driven HR leaders.' },
  { name: 'Crunchr',              slug: 'crunchr',              category: 'Analytics', g2: 4.5, capterra: 4.4, reviews: 80,    employees: '50+',      news: 1,  deepDive: false, website: 'crunchr.com',                        description: 'People analytics platform focused on workforce planning and organizational benchmarking.' },
  { name: 'Peakon',               slug: 'peakon',               category: 'Analytics', g2: 4.5, capterra: 4.5, reviews: 250,   employees: '18,000+',  news: 4,  deepDive: false, website: 'peakon.com',                         description: 'Employee listening and engagement analytics platform, now part of Workday.' },
  { name: 'Perceptyx',            slug: 'perceptyx',            category: 'Analytics', g2: 4.5, capterra: 4.5, reviews: 300,   employees: '500+',     news: 3,  deepDive: false, website: 'perceptyx.com',                      description: 'Employee listening and people analytics platform for large enterprises.' },
  { name: 'Qualtrics EmployeeXM', slug: 'qualtrics-employeexm', category: 'Analytics', g2: 4.4, capterra: 4.5, reviews: 600,   employees: '5,000+',   news: 7,  deepDive: false, website: 'qualtrics.com',                      description: 'Experience management platform with strong employee pulse surveys and analytics.' },
  { name: 'Medallia',             slug: 'medallia',             category: 'Analytics', g2: 4.3, capterra: 4.3, reviews: 400,   employees: '2,000+',   news: 8,  deepDive: false, website: 'medallia.com',                       description: 'Customer and employee experience platform with advanced text and signal analytics.' },
  { name: 'Revelio Labs',         slug: 'revelio-labs',         category: 'Analytics', g2: 4.5, capterra: 4.4, reviews: 45,    employees: '100+',     news: 2,  deepDive: false, website: 'reveliolabs.com',                    description: 'Workforce intelligence platform using public data to benchmark talent and track trends.' },
]

/** Glassdoor ratings by vendor slug */
const glassdoorRatings: Record<string, number> = {
  'workday': 3.6, 'sap-successfactors': 3.8, 'oracle-hcm-cloud': 3.5, 'ukg-pro': 3.3,
  'ceridian-dayforce': 3.9, 'paycom': 3.9, 'paychex-flex': 3.7, 'infor-hcm': 3.5,
  'darwinbox': 4.1, 'namely': 3.6,
  'greenhouse': 4.0, 'lever': 3.9, 'icims': 3.8, 'ashby': 4.3, 'smartrecruiters': 3.9,
  'workable': 4.2, 'jazzhr': 3.9, 'bullhorn': 3.6, 'breezy-hr': 4.1, 'oracle-taleo': 3.5,
  'bamboohr': 4.2, 'rippling': 3.7, 'gusto': 4.1, 'zenefits': 3.5, 'personio': 4.1,
  'hibob': 4.3, 'factorial': 4.2, 'deel': 3.8, 'humaans': 4.4, 'sage-hr': 3.8,
  'adp': 3.5, 'paychex': 3.7, 'paylocity': 3.9, 'onpay': 4.3, 'homebase': 3.9,
  'quickbooks-payroll': 4.0, 'patriot-software': 4.2, 'remote': 3.8, 'papaya-global': 3.9, 'wagepoint': 4.1,
  'lattice': 4.1, '15five': 4.3, 'culture-amp': 4.2, 'betterworks': 4.0, 'leapsome': 4.4,
  'engagedly': 3.9, 'reflektive': 3.7, 'performyard': 4.2, 'trakstar': 3.9, 'workboard': 3.8,
  'cornerstone-ondemand': 3.6, 'docebo': 4.0, 'talentlms': 4.1, 'absorb-lms': 4.2, 'sap-litmos': 3.8,
  '360learning': 4.3, 'linkedin-learning': 4.2, 'degreed': 3.9, 'seismic-learning': 4.0, 'bridge-lms': 4.0,
  'visier': 4.1, 'workday-prism': 4.0, 'sap-people-analytics': 3.8, 'orgvue': 4.0, 'crunchr': 4.2,
  'peakon': 4.0, 'perceptyx': 4.1, 'qualtrics-employeexm': 4.1, 'medallia': 3.8, 'revelio-labs': 4.3,
}

/** LinkedIn company slugs by vendor slug */
const linkedinSlugs: Record<string, string> = {
  'workday': 'workday', 'sap-successfactors': 'sap', 'oracle-hcm-cloud': 'oracle', 'ukg-pro': 'ukg',
  'ceridian-dayforce': 'ceridian', 'paycom': 'paycom', 'paychex-flex': 'paychex', 'infor-hcm': 'infor',
  'darwinbox': 'darwinbox', 'namely': 'namely',
  'greenhouse': 'greenhouse', 'lever': 'lever-co', 'icims': 'icims', 'ashby': 'ashby-inc',
  'smartrecruiters': 'smartrecruiters', 'workable': 'workable', 'jazzhr': 'jazzhr',
  'bullhorn': 'bullhorn', 'breezy-hr': 'breezyhr', 'oracle-taleo': 'oracle',
  'bamboohr': 'bamboohr', 'rippling': 'rippling', 'gusto': 'gusto-hr', 'zenefits': 'zenefits',
  'personio': 'personio', 'hibob': 'hibob', 'factorial': 'factorial-hr', 'deel': 'deel',
  'humaans': 'humaans', 'sage-hr': 'sage',
  'adp': 'adp', 'paychex': 'paychex', 'paylocity': 'paylocity', 'onpay': 'onpay',
  'homebase': 'joinhomebase', 'quickbooks-payroll': 'intuit', 'patriot-software': 'patriot-software',
  'remote': 'remote-com', 'papaya-global': 'papaya-global', 'wagepoint': 'wagepoint',
  'lattice': 'lattice-hq', '15five': '15five', 'culture-amp': 'culture-amp', 'betterworks': 'betterworks',
  'leapsome': 'leapsome', 'engagedly': 'engagedly', 'reflektive': 'reflektive',
  'performyard': 'performyard', 'trakstar': 'trakstar', 'workboard': 'workboard',
  'cornerstone-ondemand': 'cornerstone-ondemand', 'docebo': 'docebo', 'talentlms': 'talentlms',
  'absorb-lms': 'absorb-lms', 'sap-litmos': 'sap-litmos', '360learning': '360learning',
  'linkedin-learning': 'linkedin', 'degreed': 'degreed', 'seismic-learning': 'seismic',
  'bridge-lms': 'bridge-learning', 'visier': 'visier-inc', 'workday-prism': 'workday',
  'sap-people-analytics': 'sap', 'orgvue': 'orgvue', 'crunchr': 'crunchr', 'peakon': 'peakon',
  'perceptyx': 'perceptyx', 'qualtrics-employeexm': 'qualtrics', 'medallia': 'medallia',
  'revelio-labs': 'revelio-labs',
}

export const vendors: Vendor[] = rawVendors.map(v => ({
  ...v,
  glassdoor: glassdoorRatings[v.slug] ?? 3.8,
  linkedin: linkedinSlugs[v.slug] ?? v.slug,
}))

export const activityFeed = [
  { headline: 'Thoma Bravo hands Medallia to creditor consortium in debt-for-equity swap, wiping out $5.1B of $6.4B 2021 take-private', source: 'Reuters', date: 'Apr 22', vendor: 'Medallia' },
  { headline: 'Personio achieves profitability and acquires Munich AI startup aurio to accelerate recruiting AI roadmap', source: 'Personio Newsroom', date: 'Apr 22', vendor: 'Personio' },
  { headline: 'Visier unveils next-gen Workforce AI at Outsmart 2026 with Glean MCP integration for in-flow people analytics', source: 'PR Newswire', date: 'Apr 23', vendor: 'Visier' },
  { headline: 'Gusto reaches 500,000 customers and unveils Spring Showcase with nearly 75 new SMB features', source: 'CPA Practice Advisor', date: 'Apr 23', vendor: 'Gusto' },
  { headline: 'Docebo unveils most significant release in company history at Inspire 2026 — Companion, MCP Server, AI Tutor, AgentHub', source: 'Docebo', date: 'Apr 21', vendor: 'Docebo' },
  { headline: 'Paylocity launches Elevate Solutions to help HR and payroll teams scale more efficiently', source: 'GlobeNewswire', date: 'Apr 21', vendor: 'Paylocity' },
  { headline: 'iCIMS named Best Comprehensive TA Solution by Lighthouse for third year; TechTarget lists Top AI Recruiting Tool', source: 'PR Newswire', date: 'Apr 22', vendor: 'iCIMS' },
  { headline: 'BambooHR launches Broker Partner Program to help benefits brokers extend value through modern HR tech', source: 'GlobeNewswire', date: 'Apr 23', vendor: 'BambooHR' },
  { headline: 'HiBob launches native US Payroll to cut complexity and drive confidence for SMBs', source: 'HiBob Newsroom', date: 'Apr 22', vendor: 'HiBob' },
  { headline: 'Oracle launches Fusion Agentic Applications for HR — 1,000+ AI agents now embedded across HCM at no extra cost', source: 'UC Today', date: 'Apr 20', vendor: 'Oracle HCM Cloud' },
  { headline: 'Greenhouse launches AI Principles Framework, setting standard for responsible hiring in the AI era', source: 'PR Newswire', date: 'Apr 17', vendor: 'Greenhouse' },
  { headline: 'UKG cuts 950 jobs — 6% of workforce — citing AI transformation and market shifts', source: 'HR Executive', date: 'Apr 15', vendor: 'UKG Pro' },
  { headline: 'Workday flagged worst for enterprise data access in Fivetran ODI benchmark, raising AI integration concerns', source: 'The Register', date: 'Apr 22', vendor: 'Workday' },
  { headline: 'Lattice Spring/Summer 2026 release embeds AI into growth moments — Agent drafts Growth Areas from review data', source: 'Lattice Newsroom', date: 'Apr 2026', vendor: 'Lattice' },
  { headline: 'Rippling appoints Sonia Parandekar as SVP Engineering and India site lead to accelerate global product expansion', source: 'Business Wire', date: 'Apr 14', vendor: 'Rippling' },
]
