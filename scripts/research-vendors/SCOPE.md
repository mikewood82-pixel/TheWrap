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

## Research agent prompt (template)

```
You are researching vendor `{VENDOR_NAME}` (slug: `{VENDOR_SLUG}`) to populate
three TypeScript records in src/data/vendorProfiles.ts. Do not write prose
commentary. Output ONLY valid TypeScript object literals matching the shape
contract below, plus a sources block listing the URLs you used.

REQUIRED SHAPES:
{paste shape contract section verbatim}

CONSTRAINTS:
- Every funding round must have a citable source. If you cannot cite it, omit the round.
- Leadership tenureYears must reflect time IN THIS ROLE, not at the company. If unsure, use 0 and note in comment.
- If an exec listed on LinkedIn is no longer on the vendor's "Leadership" or "About" page, flag as `departed` with the date the press release / LinkedIn change indicates.
- Never fabricate. If a field is unknown, omit optional fields and use 'Undisclosed' for required strings.
- Output format MUST be:

  // ==== fundingProfileBySlug[{VENDOR_SLUG}] ====
  '{VENDOR_SLUG}': { history: [...], totalRaised: '...', lastValuation: '...' },

  // ==== leadershipProfileBySlug[{VENDOR_SLUG}] ====
  '{VENDOR_SLUG}': [ { name: '...', role: '...', tenureYears: ..., ... }, ... ],

  // ==== supportProfileBySlug[{VENDOR_SLUG}] ====
  '{VENDOR_SLUG}': { issueBreakdown: [...], sentimentTrend: [...] },

  // ==== SOURCES ====
  // - <url> (used for: funding round X, leadership Y)
  // - <url> (used for: ...)

VERIFICATION CHECKLIST (your output must internally pass before returning):
- [ ] Every funding round has at minimum: round, date (Mon YYYY), amount, leadInvestor
- [ ] Funding history is chronological, oldest first
- [ ] If vendor is public, last row is 'IPO' and totalRaised reflects pre-IPO + IPO context
- [ ] No leadership entry has tenureYears > 25 (if so, you've confused company tenure with role tenure)
- [ ] No leadership entry is older than 5 years stale (cross-check against vendor's current "About" page TODAY)
- [ ] supportProfileBySlug.issueBreakdown sums to exactly 100
- [ ] supportProfileBySlug.sentimentTrend has exactly 12 entries
- [ ] All sources are from the source allowlist
```

---

## Verifier agent prompt (template)

```
You are verifying the output of the research agent for vendor `{VENDOR_SLUG}`.
You will be given the agent's output. Your job is to cross-check every
claim against AT LEAST 2 INDEPENDENT sources from the source allowlist.

For each claim, output:
- claim: <the specific assertion>
- status: 'verified' | 'low_confidence' | 'contradicted' | 'unverifiable'
- sources: [<url>, <url>]
- note: <one line explaining low_confidence/contradicted only>

KNOWN ERROR CLASSES TO CATCH (from Apr 27 verification — these are the patterns that slipped past the first research pass on the original 15):
1. Wrong round name (Series F vs G, Series C → C+D split)
2. Stale leadership tenures (someone listed at 14 years when they returned 6 months ago)
3. Departed execs still listed as current (cross-check vendor's About page TODAY)
4. Stale departure dates (5+ year-old exits listed as recent)
5. Frankenstein rounds (two real rounds merged into one record with mixed details)
6. Tenure inflated by counting time at company vs time in role

OUTPUT GATE:
- If ≥2 claims are 'contradicted' OR ≥4 are 'low_confidence' → status: NEEDS_REWORK, do not ship.
- If 0 contradictions and ≤3 low_confidence → status: SHIP_WITH_FLAGS, attach low_confidence list as code comments next to the affected fields.
- If 0 contradictions and 0 low_confidence → status: SHIP_CLEAN.

Do not edit the agent's output. Just verify and decide.
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

## What success looks like at end of Day 1

- [ ] This SCOPE.md exists and is committed
- [ ] Pilot run on Paycom produces verifier status: SHIP_CLEAN or SHIP_WITH_FLAGS
- [ ] `vendorProfiles.ts` has Paycom in all three maps, types check, deep-dive page renders
- [ ] "Last verified" stamp + correction-link UI is live (one small commit)
- [ ] Wall-clock spend: ~3–4 hours including verification debate

If verifier returns NEEDS_REWORK on the pilot, **stop**. Don't run the batch. Fix the prompts first — pilot failure means the pipeline isn't ready and batching errors at scale would cost more to clean up than the time saved.

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
