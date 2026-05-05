# Vendor profile research pipeline — Day 1 scope

## Goal

Fill `vendorProfiles.ts` (and enrich `vendorDetails.ts` where thin) for all ~55 vendors that don't yet have Workday-level data, **without Mike's editorial review pass**. AI-driven research + AI verifier, with a "Last verified: YYYY-MM-DD" stamp and an audience-feedback link as the quality net.

This doc is the contract Day 1 produces. Day 2+ is execution.

---

## Pilot vendor: **Paycom** (`paycom`)

Picked because:
- Public company (NYSE: PAYC since Apr 2014) → SEC 10-K, DEF 14A proxy, and quarterly earnings provide clean, citable, dated data for funding, leadership, and headcount.
- HCM category — directly comparable to existing Workday/SAP SuccessFactors profiles, so depth-equivalence is testable.
- ~6,000 employees, $5B+ revenue → enough press coverage to source funding history and leadership, but not so much it becomes a research black hole.
- Founder-led (Chad Richison since 1998) — leadership data should be stable, low risk of "wait, did they just leave?" errors.
- Already has a basic `vendorDetails.ts` entry, so we're testing the **enrichment** path, not the cold-start path.

After Paycom passes the pilot, the same pipeline runs against the rest of the Tier 1 list (SAP SuccessFactors, Oracle HCM Cloud, UKG Pro, Ceridian Dayforce, iCIMS, SmartRecruiters, Workable, Cornerstone OnDemand, Namely, Zenefits).

---

## Shape contract — what each agent run must produce

For each vendor `<slug>`, the output must drop into three places in `src/data/vendorProfiles.ts`:

### 1. `fundingProfileBySlug[<slug>]`

```ts
{
  history: FundingRound[],   // chronological, oldest first
  totalRaised?: string,      // '$2.6B' or 'Public since YYYY' or 'Undisclosed'
  lastValuation?: string,    // '$X market cap (Mon YYYY)' for public; '$X (Mon YYYY)' for private
}

type FundingRound = {
  round: string         // 'Seed' | 'Series A'..'Series G' | 'IPO' | 'Acquired' | 'PE Buyout' | 'Debt'
  date: string          // 'Mon YYYY' format, e.g. 'Apr 2014'
  amount: string        // '$200M', '$1.4M', 'Undisclosed', 'IPO'
  leadInvestor?: string // 'Greylock' | 'NYSE: PAYC' (for IPO row) | 'Vista Equity Partners'
  valuation?: string    // '$13.5B' or '$2.6B at IPO' — only when publicly disclosed
}
```

### 2. `leadershipProfileBySlug[<slug>]`

```ts
LeadershipMember[]  // 5–8 rows recommended: CEO, CFO, CTO/CPO, CHRO/CPO-people, CRO, plus any recently departed C-suite within last ~6mo

type LeadershipMember = {
  name: string
  role: string          // 'CEO', 'CFO', 'CTO', 'CHRO', 'CRO', 'Head of Product'
  tenureYears: number   // years in THIS role (not at company); fractional allowed (0.5 for new hires)
  prior?: string        // 'Previously CFO at Coupa' — concise, one notable prior
  departed?: string     // 'Departed Feb 2026' — present ONLY when exec left in last ~6mo
  linkedin?: string     // LinkedIn handle ('chadrichison'), not full URL
}
```

### 3. `supportProfileBySlug[<slug>]`

```ts
{
  issueBreakdown: SupportIssueBreakdown[],  // sums to 100 across categories
  sentimentTrend: number[],                  // exactly 12 entries, 0-100 scale, oldest→newest
}

type SupportIssueBreakdown = {
  category: string  // 'Onboarding' | 'Integrations' | 'Billing' | 'Performance' | 'Feature requests' | 'Documentation' | 'Bug reports'
  volume: number    // relative weight 0-100; entries must sum to 100
}
```

**Sentiment trend sourcing:** quarterly G2/Capterra/Trustpilot review-tone aggregation if available, otherwise a reasonable estimate anchored on the vendor's current support-quality score. Mark as `// estimated` in a code comment if not directly measured.

---

## Source allowlist

Research agent may consult, in order of preference:
1. **SEC EDGAR** (10-K, 10-Q, DEF 14A proxy) — for public companies, ground truth
2. **Crunchbase** — funding rounds, last valuation
3. **Vendor's own IR / press / about pages** — leadership bios, latest funding announcements
4. **LinkedIn company pages** — current C-suite + tenure (cross-check against vendor IR)
5. **Reputable trade press** — TechCrunch, Pitchbook excerpts, HR Executive, HR Dive, Reuters
6. **G2 / Capterra / Trustpilot** — support-quality aggregates and sentiment

**Not allowed:** Wikipedia (unsourced), random Medium posts, vendor's own marketing pages claiming customer counts, AI-generated summaries from third-party sites.

If two sources conflict on a fact, prefer the more recent + the more authoritative (SEC > Crunchbase > vendor IR > press). Log the conflict in the verifier output.

---

## Research agent prompt (template — v3, post-Tier-1-batch)

### Why v3

The v2 prompt fixed v1's fabrication failures (no fabricated valuations, better `prior` fields). But the first Tier 1 batch (SAP SuccessFactors, UKG Pro, Ceridian Dayforce, iCIMS) hit **3-of-4 NEEDS_REWORK** for a different class of problem: agents ignoring schema format details (date format, LinkedIn handle vs URL, sentiment scale 1-5 vs 0-100) AND continued tenure inflation when source quotes mention long company tenure ("20-year veteran", "joined 1994").

v3 adds:
1. **A verbatim sample copied from the existing data file** — agents copy patterns better than they parse rules
2. **Hard regex self-checks** the agent must run before returning
3. **Worked examples** of the tenure-inflation trap

### v3 prompt template (use verbatim — substitute `{VENDOR_NAME}`, `{VENDOR_SLUG}`, `{TODAY_DATE}`)

```
You are researching the HR-tech vendor **{VENDOR_NAME}** (slug: `{VENDOR_SLUG}`) to
populate three TypeScript records in src/data/vendorProfiles.ts. This data ships
on a paid product visible to HR buyers. **Accuracy matters more than completeness.**
Today's date is **{TODAY_DATE}**.

The pipeline has had 2 prior failure modes — fabrication (v1) and schema-format
slop (v2). v3 below adds a verbatim sample of the existing data shape (copy this
pattern exactly) and hard regex self-checks before returning.

## REFERENCE — exact shape, copied from production (Workday entry, verified)

  // fundingProfileBySlug
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

  // leadershipProfileBySlug — note: linkedin is a HANDLE only, like 'chadrichison', NOT a full URL
  'paycom': [
    { name: 'Chad Richison',  role: 'Chief Executive Officer and Chairman', tenureYears: 28.3, prior: 'Founded Paycom in 1998', linkedin: 'chadrichison' },
    { name: 'Bob Foster',     role: 'Chief Financial Officer',              tenureYears: 1.2,  prior: 'Chief Executive Officer of iiPay (2016 – Oct 2022)' },
    { name: 'Brad Smith',     role: 'Chief Information Officer',            tenureYears: 7.8,  prior: 'Director of Information Technology at Paycom', departed: 'Departed Oct 2025' },
  ],

  // supportProfileBySlug — note: sentimentTrend is on a 0-100 scale, NOT 1-5
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

Match this format exactly. Same date format. Same linkedin handle pattern.
Same 0-100 sentimentTrend range. Same single-string `departed` format.

## CRITICAL ANTI-FABRICATION RULES

1. **Valuation must be directly cited.** Do NOT infer from share-price math,
   strike-price disclosures, or "implied" reasoning. If you cannot cite the exact
   figure, set `valuation: undefined` (omit the field). Same for `lastValuation`:
   omit if you cannot cite. Do NOT use the parent company's market cap when
   profiling a subsidiary or product line — `lastValuation` should reflect the
   entity being profiled, not its parent.

2. **`prior` field must be ≤1 short factual phrase from a verifiable source.**
   Do NOT compose narrative phrases. If you cannot find a citable prior role,
   OMIT the field. Cross-check the prior employer/role you cite — if a press
   release says they joined SuccessFactors but their LinkedIn shows the prior
   role was at Microsoft (not "Qualtrics SWAT Team"), use the LinkedIn-confirmed
   prior, not a guess.

3. **`role` is free-form** — verbatim title from a primary source.

4. **Tenure must be date-math from the role-start date, NOT the company-start
   date.** Compute as `({TODAY_DATE} minus role_start_date) / 365.25`, rounded
   to 1 decimal.

   **Tenure-inflation trap (DO NOT FALL FOR THIS):** Press releases often say
   "20-year veteran" or "joined the company in 1994". That is COMPANY tenure,
   not ROLE tenure. The CRO who joined the company in 1994 and was promoted to
   CRO in 2018 has tenureYears = ~7.0, not ~32.

   Examples of what to do:
   - "Maryann Abbajay, who has been with SAP for 17 years, was named CRO of
     SuccessFactors in 2018." → tenureYears: ~7.0 (not 17.0)
   - "Gregory Swick, a 32-year veteran of UKG, serves as CRO." → look up when
     he was promoted to CSO/CRO. If 2000, tenureYears: ~26.0 (not 32.0).
   - "Chris Armstrong, who joined Ceridian in 2004, was named CCO in 2024." →
     tenureYears: ~2.0 (not 22.0).

   If you cannot find the role-start date, set `tenureYears: 0` and flag in
   CONFIDENCE NOTES. Do not use company tenure as a fallback.

5. **Founder exception** for tenure > 25 years applies ONLY to verified founders
   still serving as CEO. Long-tenured non-founder employees do not qualify.

6. **Market cap freshness.** For `lastValuation` on public companies, source
   dated within past 30 days. Quote the source date. For private companies,
   cite the most recent disclosed valuation event (PE deal, secondary, etc.)
   and note the date.

## Required output shapes

```ts
type FundingRound = { round: string; date: string; amount: string; leadInvestor?: string; valuation?: string }
type LeadershipMember = { name: string; role: string; tenureYears: number; prior?: string; departed?: string; linkedin?: string }
type SupportIssueBreakdown = { category: string; volume: number }
```

## Source allowlist

1. SEC EDGAR (10-K, 10-Q, DEF 14A, 8-K) — ground truth for public companies
2. Crunchbase — pre-IPO funding history
3. Vendor IR + official press releases — current leadership
4. LinkedIn company pages — cross-check current C-suite tenure
5. Reuters, WSJ, Bloomberg, HR Executive, HR Dive, TechCrunch, Nasdaq.com
6. G2, Capterra, Trustpilot — support quality signals

**Banned:** Wikipedia (unsourced), Medium, vendor marketing claims, AI summaries.

## Output format

  // ==== fundingProfileBySlug['{VENDOR_SLUG}'] ====
  '{VENDOR_SLUG}': { history: [...], totalRaised: '...', lastValuation: '...' },

  // ==== leadershipProfileBySlug['{VENDOR_SLUG}'] ====
  '{VENDOR_SLUG}': [ {...}, ... ],

  // ==== supportProfileBySlug['{VENDOR_SLUG}'] ====
  '{VENDOR_SLUG}': { issueBreakdown: [...], sentimentTrend: [...] },

  // ==== SOURCES ====
  // - <url> (used for: <fields>)

  // ==== CONFIDENCE NOTES ====
  // - <field>: <reason>

## HARD SELF-CHECKS — run these before returning

1. **Date regex check.** Every `date` field must match the regex `^[A-Z][a-z]{2}
   \d{4}$` (e.g., `Apr 2014`, `Jan 2008`). NOT `2014-04`, NOT `2014-04-15`,
   NOT `April 2014`. If any fail, fix before returning.

2. **LinkedIn handle check.** Every `linkedin` field must NOT contain `https`,
   `://`, or `linkedin.com`. It is a handle only (e.g., `chadrichison`,
   `shane-hadlock-7091437`). If any contain a URL, strip to handle.

3. **Sentiment scale check.** Every value in `sentimentTrend` must be an
   integer between 0 and 100, inclusive. If you used 1-5, multiply by 20 and
   round. If any value is < 30 or > 95, double-check it's plausible.

4. **issueBreakdown sum check.** Sum of `volume` values must equal exactly 100.
   If your sum is 99 or 101, adjust the largest category to fix.

5. **sentimentTrend length check.** Array must have exactly 12 entries.

6. **Departed format check.** Every `departed` field must match
   `^Departed [A-Z][a-z]{2} \d{4}$` (e.g., `Departed Oct 2025`). NOT a long
   sentence, NOT a future date.

7. **Tenure plausibility.** No `tenureYears` exceeds 25 unless the person is
   a verified founder still serving as CEO (rule 5). If > 25 and not a founder,
   you've fallen for the tenure-inflation trap — fix.

8. **No `valuation` without citation.** Every `valuation` field on a funding
   round must trace to a primary-source URL in the SOURCES block. If a
   valuation was inferred (share math, "implied", "approximately based on..."),
   omit the field.

9. **`lastValuation` is for the entity being profiled.** Not the parent company.

If ANY self-check fails, fix before returning. Do not return output that
fails its own self-checks.

Be diligent. Real money rides on this data.
```

### Lessons from prior failures (do not repeat)

The v3 rules above were derived from these specific failures across the Paycom pilot (v1→v2) and Tier 1 batch (v2→v3):

**v1 failures (fixed in v2):**
- Fabricated valuation: Paycom run 1 wrote `valuation: '$400M enterprise value'` for a 2007 buyout, rationalizing it from S-1 management incentive unit strike-price disclosures. Rule 1 directly bans this.
- Schema mismatch: Mapped Chief Sales Officer → `'CRO'` because CSO wasn't in an illustrative enum. Rule 3 makes the field free-form.
- Narrative `prior` text: "Internal Paycom promotion to CAO in 2023" for an external hire. Rule 2 bans composition.
- Founder exception collision: Capped Chad Richison at 25 years (actual 28). Rule 5 adds the founder exception.

**v2 failures (fixed in v3):**
- Date format: 3 of 4 Tier 1 vendors used `'YYYY-MM-DD'` or `'YYYY-MM'` instead of `'Mon YYYY'`. Self-check 1 (regex) enforces.
- LinkedIn full URLs vs handles: 3 of 4 used `'https://linkedin.com/in/...'`. Self-check 2 enforces.
- Sentiment scale: 2 of 4 used 1-5 instead of 0-100. Self-check 3 enforces.
- Tenure inflation continued: Maryann Abbajay 17y CRO (actual ~7), Gregory Swick 32y CRO (actual ~26), Chris Armstrong 16y CCO (actual ~2). Rule 4's tenure-inflation trap section + worked examples.
- `lastValuation` confusion: SAP SuccessFactors run set `lastValuation` to SAP SE's parent market cap ($201B), not SuccessFactors-specific. Rule 1 closing sentence + self-check 9.
- Fabricated `prior`: Maryann Abbajay's "Head of the Qualtrics SWAT Team" appears wrong (Qualtrics was acquired by SAP in 2019; her career predates that). Rule 2 cross-check guidance.
- Future-dated departure: iCIMS run 1 wrote `departed: '2026-05-17 (succeeded by Marc Thompson, announced 2026-05-04)'` — long narrative + future date. Self-check 6 enforces format.

---

## Research agent prompt (template — v2, post-Paycom-pilot, kept for history)

The v1 prompt let the research agent ship 4 verifiable errors on the Paycom pilot. v2 below tightens the rules that broke. Use this verbatim for every batch run; substitute `{VENDOR_NAME}`, `{VENDOR_SLUG}`, and `{TODAY_DATE}` (YYYY-MM-DD).

```
You are researching the HR-tech vendor **{VENDOR_NAME}** (slug: `{VENDOR_SLUG}`) to
populate three TypeScript records in src/data/vendorProfiles.ts. This data ships on
a paid product visible to HR buyers. **Accuracy matters more than completeness.**
Today's date is **{TODAY_DATE}**.

## CRITICAL ANTI-FABRICATION RULES

1. **Valuation must be directly cited.** For any `valuation` field on a funding
   round: the figure must be DIRECTLY stated in a primary source citation. Do NOT
   infer valuation from share-price math, strike-price disclosures, secondary
   commentary, S-1 incentive unit calculations, or any "implied" reasoning. If you
   cannot cite the exact valuation figure, set `valuation: undefined` (omit it).

2. **`prior` field must be ≤1 short factual phrase from a verifiable source** —
   vendor IR bio, LinkedIn About, or SEC proxy/8-K. Do NOT compose narrative
   phrases like "internal promotion", "long-tenured", "30+ yrs business/tech
   leadership", or any inferred career framing. Describe the actual previous role
   and employer ONLY. If you cannot find a citable prior role, OMIT the field.

3. **`role` is free-form** — use the title verbatim from the vendor's current
   Leadership page or most recent SEC filing. Common abbreviations: CEO, CFO,
   CTO, CHRO, COO, CSO (Chief Sales Officer), CRO, CIO, CCO (Chief Client Officer),
   President. Do NOT remap CSO → CRO or do any "close enough" substitution.

4. **Tenure must be date-math.** Compute `tenureYears` as
   `({TODAY_DATE} minus start_date) / 365.25`, rounded to 1 decimal. Cite the
   start_date source in CONFIDENCE NOTES. If start_date is approximate ("since
   2023"), compute from Jan 1 of that year and flag it.

5. **Founder exception.** If a person is a verified founder still serving as CEO,
   tenure can exceed 25 years. Use the actual figure (cite the founding year).

6. **Market cap freshness.** For `lastValuation` on public companies, query a
   figure from a source dated within the past 30 days. Quote the source date in
   the `lastValuation` string. If sources disagree by >5%, take the most recent
   and note the spread in CONFIDENCE NOTES.

## REQUIRED SHAPES
{paste shape contract section verbatim}

## SOURCES (allowed, in order of preference)
1. SEC EDGAR (10-K, 10-Q, DEF 14A proxy, 8-K) — ground truth for public companies
2. Crunchbase — pre-IPO funding history
3. Vendor IR + official press releases — current leadership
4. LinkedIn company pages — cross-check current C-suite tenure
5. Reputable trade press: Reuters, WSJ, Bloomberg, HR Executive, HR Dive,
   TechCrunch, Nasdaq.com
6. G2 / Capterra / Trustpilot — support quality signals

**Banned:** Wikipedia (unsourced for our purposes), Medium, vendor marketing
claims, AI-generated summaries from third-party sites, secondary inference.

## OUTPUT FORMAT — exactly this structure

  // ==== fundingProfileBySlug['{VENDOR_SLUG}'] ====
  '{VENDOR_SLUG}': { history: [...], totalRaised: '...', lastValuation: '...' },

  // ==== leadershipProfileBySlug['{VENDOR_SLUG}'] ====
  '{VENDOR_SLUG}': [ { name: '...', role: '...', tenureYears: ..., ... }, ... ],

  // ==== supportProfileBySlug['{VENDOR_SLUG}'] ====
  '{VENDOR_SLUG}': { issueBreakdown: [...], sentimentTrend: [...] },

  // ==== SOURCES ====
  // - <url> (used for: <fields>)

  // ==== CONFIDENCE NOTES ====
  // - <field>: <reason for any low-confidence value>

## SELF-CHECK before returning

- [ ] No `valuation` field exists without a directly-cited figure
- [ ] No `prior` field contains narrative or composed phrasing — only cited factual content
- [ ] Every `role` is verbatim from a primary source
- [ ] Every `tenureYears` is computed via date math from a cited start_date
- [ ] All current C-suite officers are included (CEO, President, CFO, COO, CSO/CRO, CIO, CHRO, CLO, plus any vendor-specific roles like Chief Client/Automation Officer)
- [ ] Market cap source dated within 30 days
- [ ] issueBreakdown sums to exactly 100
- [ ] sentimentTrend has exactly 12 entries
- [ ] All sources are from the allowlist; none from banned list
- [ ] CONFIDENCE NOTES block flags any estimated field

Be diligent. Real money rides on this data.
```

### Lessons from the Paycom pilot (do not repeat)

The v2 rules above were derived from these specific v1 failures:
- **Fabricated valuation:** v1 agent wrote `valuation: '$400M enterprise value'` for the WCAS 2007 buyout, rationalizing it as "implied from S-1 management incentive unit strike-price disclosures." Rule 1 directly bans this.
- **Schema mismatch:** v1 agent mapped Chief Sales Officer → `'CRO'` because CSO wasn't in the illustrative enum. Rule 3 makes the field free-form.
- **Narrative `prior` text:** v1 agent wrote "Internal Paycom promotion to CAO in 2023" for Jason Clark, who was actually an external hire from CompSource Mutual via the Board. Rule 2 bans composition.
- **Tenure inflation/cap collision:** v1 agent capped Chad Richison at 25 years (actual 28). Rule 5 adds a founder exception.
- **Stale market cap:** v1 used a months-old $5.98B figure. Rule 6 requires a 30-day-fresh source.
- **Missing officers:** v1 missed Jennifer Kraszewski (CHRO) and Matt Paque (CLO) entirely. Self-check now requires explicit officer-completeness check.

---

## Verifier agent prompt (template — v2)

```
You are verifying the research agent's output for vendor `{VENDOR_SLUG}`. The
research agent's prompt has been tightened with anti-fabrication rules; your job
is to confirm those rules were followed AND cross-check every factual claim
against AT LEAST 2 INDEPENDENT sources from the source allowlist (SEC EDGAR,
Crunchbase, vendor IR, LinkedIn, Reuters/WSJ/Bloomberg/HR Executive/HR Dive/
TechCrunch/Nasdaq, G2/Capterra/Trustpilot). Today's date: {TODAY_DATE}.

## For each claim, output

- claim: <specific assertion>
- status: 'verified' | 'low_confidence' | 'contradicted' | 'unverifiable'
- sources: [<url 1>, <url 2>]
- note: <only required for low_confidence | contradicted | unverifiable>

## Tier 1 — must be right (high stakes)

Cross-check each leadership entry against the vendor's CURRENT IR Leadership
page and at least one corroborating press release / 8-K. Specifically:
- CEO, President, CFO, COO, CSO/CRO, CIO, CHRO, CLO — verify each is current
- Any exec marked `departed` — verify departure date against an 8-K or PR
- Founder/long-tenure entries — verify founding year if tenure > 10y

For funding: every round must have a primary source citation.

## Anti-fabrication checks (specific to v2 prompt)

- [ ] **No `valuation` field is present without a directly-cited figure.**
      If you find one with only "implied" / "inferred" / share-math reasoning,
      flag as `contradicted`.
- [ ] **No `prior` field contains narrative phrasing** ("internal promotion",
      "long-tenured", "30+ years experience", etc.). All prior fields should be
      specific, cited prior-role assertions.
- [ ] **All `role` titles are verbatim from primary sources** (no CSO → CRO
      substitutions).
- [ ] **No exec listed as current is actually departed** (cross-check vendor's
      CURRENT Leadership page TODAY).
- [ ] **No current C-suite officer missing.** If the vendor's IR page shows a
      CHRO, CLO, CIO, or other named officer not in the output, flag.

## Known error classes to actively look for (from prior verifications)

1. Wrong round name (Series F vs G; Series C/D Frankenstein)
2. Stale leadership tenures (someone shown at 14y when they returned 6mo ago)
3. Departed execs still listed as current
4. Stale departure dates (5+ year-old exits listed as recent)
5. Two real rounds merged into one record
6. Tenure inflated by counting time at company vs time in role
7. Schema mismatches (CSO → CRO, etc.)
8. Narrative `prior` text fabricated to fit a story
9. Stale market cap (>30 days old)
10. Missing current C-suite officers entirely

## Output gate

- ≥2 `contradicted` OR ≥4 `low_confidence` → **NEEDS_REWORK** (do not ship)
- 0 `contradicted`, ≤3 `low_confidence` → **SHIP_WITH_FLAGS** (list which fields
  need inline `// low confidence: <why>` code comments)
- 0 `contradicted`, 0 `low_confidence` → **SHIP_CLEAN**

End your response with exactly one line: `STATUS: <SHIP_CLEAN | SHIP_WITH_FLAGS | NEEDS_REWORK>`

Do not edit the agent's output. Verify and decide.
```

---

## Integration plan

1. **Run research agent** for `paycom`. Agent outputs three TS object literals + sources block.
2. **Run verifier agent** with research output as input.
3. **If SHIP_CLEAN or SHIP_WITH_FLAGS:** human (or scripted patch) inserts the three blocks into the existing `vendorProfiles.ts` maps, alphabetically sorted, with `// Last verified: 2026-MM-DD` comment above each block.
4. **Run `tsc -b`** — must pass. If it fails, fix shape mismatches, re-verify.
5. **Add a UI element** to `VendorDeepDivePage` showing "Last verified: [date]" pulled from a new `lastVerifiedBySlug` map (one-line addition to vendorProfiles.ts).
6. **Add audience correction link** to the deep-dive page footer: "Spot something wrong? → mike@ilovethewrap.com?subject=Vendor data correction: [name]".
7. **Smoke-test** Paycom's deep-dive page in preview — all six KPI tiles populate, funding timeline renders, leadership card grid shows, support sentiment trend draws.
8. **Commit** once Paycom renders cleanly. This is the green-light to run the same pipeline against the remaining 54 vendors in batches.

---

## Status log

### Day 1 — DONE 2026-05-04
- Pilot run on Paycom → v1 returned NEEDS_REWORK → v2 prompt → SHIP_WITH_FLAGS → integrated, deployed (`e180745`)

### Day 2 (first half) — Tier 1 batch attempt 1, 2026-05-04
- Ran SAP SuccessFactors, UKG Pro, Ceridian Dayforce, iCIMS in parallel with v2 prompt
- Results: 3 NEEDS_REWORK + 1 SHIP_WITH_FLAGS — pipeline failed at scale
- Failure modes: schema format slop (date, LinkedIn, sentiment scale) + tenure inflation when sources mention long company tenure
- Two real news items surfaced: **Dayforce was taken private by Thoma Bravo Feb 4 2026 ($12.3B)** and **iCIMS announced CEO transition today (Edelboim out May 17, Thompson in)**
- v3 prompt above adds embedded sample, hard regex self-checks, and worked tenure-trap examples
- Re-running the same 4 with v3 next

If verifier returns NEEDS_REWORK on a future vendor, stop and rework the prompts. Pipeline failure at scale costs more to clean up than the time saved.

---

## Day 2+ batching

Once pilot passes:
- Tier 1 (10 vendors): run all 10 in parallel as separate agent invocations, batch-verify, batch-merge.
- Tier 2 (~20 vendors): same pipeline, lighter verifier review (spot-check 1 in 4).
- Tier 3 (~25 vendors): same pipeline, light review.
- Total runtime budget: 4 days max for all 55, hard stop.

## Out of scope for this scope

- Subscriber survey integration (separate track, gated on subscriber count)
- vendorDetails.ts editorial enrichment beyond what's needed to make the deep-dive page render — anything subjective stays Mike-authored
- Newsroom feed integration (referenced in idea backlog 2026-05-01, separate ship)
