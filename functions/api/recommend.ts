interface Env {
  ANTHROPIC_API_KEY: string
}

const VENDORS = [
  // HCM
  { slug: 'workday', name: 'Workday', category: 'HCM', desc: 'Enterprise HCM, payroll, and financials for large organizations' },
  { slug: 'rippling', name: 'Rippling', category: 'HCM', desc: 'Unified HR, IT, and finance platform for fast-growing companies' },
  { slug: 'bamboohr', name: 'BambooHR', category: 'HCM', desc: 'SMB-focused HR software with strong onboarding and self-service' },
  { slug: 'ukg-pro', name: 'UKG Pro', category: 'HCM', desc: 'Comprehensive HCM suite for mid-market to enterprise with workforce management' },
  { slug: 'adp', name: 'ADP Workforce Now', category: 'HCM', desc: 'All-in-one HR, payroll, and benefits for mid-sized businesses' },
  { slug: 'sap-successfactors', name: 'SAP SuccessFactors', category: 'HCM', desc: 'Global enterprise HCM deeply integrated with SAP ERP' },
  { slug: 'oracle-hcm-cloud', name: 'Oracle HCM Cloud', category: 'HCM', desc: 'Global enterprise HR platform best suited for Oracle ecosystem' },
  { slug: 'ceridian-dayforce', name: 'Ceridian Dayforce', category: 'HCM', desc: 'Single-application HCM platform with real-time pay and compliance' },
  { slug: 'paychex', name: 'Paychex Flex', category: 'HCM', desc: 'HCM and payroll for small to mid-sized businesses with strong compliance' },
  { slug: 'infor-hcm', name: 'Infor HCM', category: 'HCM', desc: 'Industry-specific HCM for manufacturing, healthcare, and public sector' },
  { slug: 'darwinbox', name: 'Darwinbox', category: 'HCM', desc: 'Modern HCM platform popular in Asia-Pacific and emerging markets' },
  { slug: 'namely', name: 'Namely', category: 'HCM', desc: 'HR platform designed for mid-market with a consumer-grade experience' },
  // ATS
  { slug: 'greenhouse', name: 'Greenhouse', category: 'ATS', desc: 'Best-in-class structured hiring for mid-market and enterprise' },
  { slug: 'lever', name: 'Lever', category: 'ATS', desc: 'ATS + CRM combined, strong for companies focused on candidate relationships' },
  { slug: 'icims', name: 'iCIMS', category: 'ATS', desc: 'Enterprise talent acquisition platform with marketing and onboarding modules' },
  { slug: 'workable', name: 'Workable', category: 'ATS', desc: 'Affordable full-featured ATS with AI sourcing for SMBs and mid-market' },
  { slug: 'ashby', name: 'Ashby', category: 'ATS', desc: 'Modern ATS with powerful analytics, popular with high-growth tech companies' },
  { slug: 'smartrecruiters', name: 'SmartRecruiters', category: 'ATS', desc: 'Enterprise talent acquisition suite with collaborative hiring features' },
  { slug: 'jazzhr', name: 'JazzHR', category: 'ATS', desc: 'Affordable ATS built for small businesses replacing spreadsheet workflows' },
  { slug: 'bullhorn', name: 'Bullhorn', category: 'ATS', desc: 'ATS and CRM purpose-built for staffing and recruiting agencies' },
  { slug: 'breezy-hr', name: 'Breezy HR', category: 'ATS', desc: 'Visual pipeline ATS with video interviewing for growing teams' },
  { slug: 'oracle-taleo', name: 'Oracle Taleo', category: 'ATS', desc: 'Legacy enterprise ATS, large install base in Fortune 500' },
  { slug: 'acme-staffing', name: 'Acme Staffing', category: 'ATS', desc: 'Mid-market ATS with strong workflow for staffing agencies placing 50–500 reqs/month' },
  // HRIS
  { slug: 'hibob', name: 'HiBob', category: 'HRIS', desc: 'Modern HRIS for mid-market with strong engagement and people analytics' },
  { slug: 'personio', name: 'Personio', category: 'HRIS', desc: 'European HRIS leader for SMBs, strong compliance for EU markets' },
  { slug: 'paycom', name: 'Paycom', category: 'HRIS', desc: 'Single-database HR and payroll with high employee self-service adoption' },
  { slug: 'deel', name: 'Deel', category: 'HRIS', desc: 'Global hiring, payroll, and compliance for international and remote teams' },
  { slug: 'paylocity', name: 'Paylocity', category: 'HRIS', desc: 'Cloud HRIS and payroll with strong community and collaboration features' },
  { slug: 'zenefits', name: 'Zenefits', category: 'HRIS', desc: 'Benefits-first HRIS for small businesses with broker-connected benefits admin' },
  { slug: 'factorial', name: 'Factorial', category: 'HRIS', desc: 'European SMB HRIS with affordable pricing and time tracking' },
  { slug: 'humaans', name: 'Humaans', category: 'HRIS', desc: 'Lightweight HRIS for tech-forward companies, deep integrations over breadth' },
  { slug: 'sage-hr', name: 'Sage HR', category: 'HRIS', desc: 'HRIS for small businesses in Sage accounting ecosystem' },
  // Payroll
  { slug: 'gusto', name: 'Gusto', category: 'Payroll', desc: 'Modern payroll and benefits for startups and small businesses' },
  { slug: 'onpay', name: 'OnPay', category: 'Payroll', desc: 'Simple, affordable payroll for small businesses with great customer service' },
  { slug: 'homebase', name: 'Homebase', category: 'Payroll', desc: 'Payroll + scheduling for hourly and shift-based workforces' },
  { slug: 'quickbooks-payroll', name: 'QuickBooks Payroll', category: 'Payroll', desc: 'Payroll integrated with QuickBooks accounting, ideal for existing QB users' },
  { slug: 'patriot-software', name: 'Patriot Software', category: 'Payroll', desc: 'Low-cost payroll and accounting for very small businesses' },
  { slug: 'remote', name: 'Remote', category: 'Payroll', desc: 'Global employer of record and payroll for distributed international teams' },
  { slug: 'papaya-global', name: 'Papaya Global', category: 'Payroll', desc: 'Global payroll and workforce platform for multinational companies' },
  { slug: 'wagepoint', name: 'Wagepoint', category: 'Payroll', desc: 'Canadian-focused payroll for small businesses with great compliance support' },
  { slug: 'paychex-flex', name: 'Paychex Flex', category: 'Payroll', desc: 'Payroll, HR, and benefits for SMBs with dedicated payroll specialist support' },
  // Perf Mgmt
  { slug: 'lattice', name: 'Lattice', category: 'Perf Mgmt', desc: 'Performance reviews, OKRs, and engagement for modern HR teams' },
  { slug: '15five', name: '15Five', category: 'Perf Mgmt', desc: 'Continuous performance management with check-ins, OKRs, and engagement surveys' },
  { slug: 'culture-amp', name: 'Culture Amp', category: 'Perf Mgmt', desc: 'Employee engagement and performance platform with benchmarking data' },
  { slug: 'betterworks', name: 'BetterWorks', category: 'Perf Mgmt', desc: 'Enterprise OKR and continuous performance management' },
  { slug: 'leapsome', name: 'Leapsome', category: 'Perf Mgmt', desc: 'European performance and learning platform, strong in DACH region' },
  { slug: 'engagedly', name: 'Engagedly', category: 'Perf Mgmt', desc: 'Gamified performance management with mentoring and social recognition' },
  { slug: 'reflektive', name: 'Reflektive', category: 'Perf Mgmt', desc: 'Real-time feedback and performance reviews for mid-market' },
  { slug: 'performyard', name: 'PerformYard', category: 'Perf Mgmt', desc: 'Flexible performance management that fits existing review processes' },
  { slug: 'trakstar', name: 'Trakstar', category: 'Perf Mgmt', desc: 'Performance management and learning for mid-market with easy setup' },
  { slug: 'workboard', name: 'Workboard', category: 'Perf Mgmt', desc: 'OKR and strategy execution for enterprise with strong leadership alignment' },
  // L&D
  { slug: 'cornerstone-ondemand', name: 'Cornerstone OnDemand', category: 'L&D', desc: 'Enterprise LMS with compliance training, strong in regulated industries' },
  { slug: 'docebo', name: 'Docebo', category: 'L&D', desc: 'AI-powered LMS for corporate learning with content marketplace' },
  { slug: 'talentlms', name: 'TalentLMS', category: 'L&D', desc: 'Affordable, easy-to-use LMS for SMBs and customer training' },
  { slug: 'absorb-lms', name: 'Absorb LMS', category: 'L&D', desc: 'Modern LMS with intuitive UX and strong ecommerce capabilities' },
  { slug: 'sap-litmos', name: 'SAP Litmos', category: 'L&D', desc: 'Cloud LMS for compliance and sales training, integrates with SAP ecosystem' },
  { slug: '360learning', name: '360Learning', category: 'L&D', desc: 'Collaborative learning platform focused on peer-generated content' },
  { slug: 'linkedin-learning', name: 'LinkedIn Learning', category: 'L&D', desc: 'Vast content library for professional skills development, integrates with LinkedIn' },
  { slug: 'degreed', name: 'Degreed', category: 'L&D', desc: 'Learning experience platform focused on skills intelligence and upskilling' },
  { slug: 'seismic-learning', name: 'Seismic Learning', category: 'L&D', desc: 'Sales enablement and readiness training, formerly Lessonly' },
  { slug: 'bridge-lms', name: 'Bridge LMS', category: 'L&D', desc: 'Simple LMS combining learning, performance, and engagement' },
  // Analytics
  { slug: 'visier', name: 'Visier', category: 'Analytics', desc: 'Workforce analytics and people data platform for enterprise HR teams' },
  { slug: 'workday-prism', name: 'Workday Prism', category: 'Analytics', desc: 'Analytics layer for Workday, blends HR data with external data sources' },
  { slug: 'sap-people-analytics', name: 'SAP People Analytics', category: 'Analytics', desc: 'Embedded analytics within SAP SuccessFactors for HR reporting' },
  { slug: 'orgvue', name: 'OrgVue', category: 'Analytics', desc: 'Org design and workforce planning with scenario modeling' },
  { slug: 'crunchr', name: 'Crunchr', category: 'Analytics', desc: 'Self-service people analytics with strong European data privacy compliance' },
  { slug: 'peakon', name: 'Peakon', category: 'Analytics', desc: 'Employee engagement and listening platform, part of Workday' },
  { slug: 'perceptyx', name: 'Perceptyx', category: 'Analytics', desc: 'Enterprise employee listening and people analytics platform' },
  { slug: 'qualtrics-employeexm', name: 'Qualtrics EmployeeXM', category: 'Analytics', desc: 'Employee experience measurement and action planning for enterprise' },
  { slug: 'medallia', name: 'Medallia', category: 'Analytics', desc: 'Experience management platform capturing employee signals at scale' },
  { slug: 'revelio-labs', name: 'Revelio Labs', category: 'Analytics', desc: 'Workforce intelligence using public labor market data for competitive insights' },
]

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as { query: string }

    if (!body.query?.trim()) {
      return Response.json({ error: 'Query is required' }, { status: 400 })
    }

    if (!context.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 })
    }

    const vendorList = VENDORS.map(v =>
      `- ${v.name} (slug: ${v.slug}) [${v.category}]: ${v.desc}`
    ).join('\n')

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': context.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 700,
        system: `You are an HR technology advisor helping buyers find the right software vendors. Given a list of HR tech vendors and a buyer description of their needs, identify the 3–5 best-fit vendors.

Respond ONLY with valid JSON in exactly this format — no other text:
{"summary":"one concise sentence summarizing what you found for them","results":[{"slug":"vendor-slug","reason":"one sentence explaining why this vendor fits their specific needs"}]}

Use only slugs from the provided vendor list. Prioritize fit over popularity.`,
        messages: [
          {
            role: 'user',
            content: `Available vendors:\n${vendorList}\n\nBuyer's needs: ${body.query.trim()}`,
          },
        ],
      }),
    })

    if (!res.ok) {
      const errData = await res.json() as { error?: { message?: string } }
      const msg = errData?.error?.message ?? `API error ${res.status}`
      return Response.json({ error: msg }, { status: 502 })
    }

    const data = await res.json() as { content: { text: string }[] }
    let text = data.content?.[0]?.text ?? ''
    // Strip markdown code fences if present
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
    const parsed = JSON.parse(text)

    return Response.json(parsed, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return Response.json({ error: msg }, { status: 500 })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
