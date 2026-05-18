# The Wrap Underemployment Index — Methodology & FAQ

A single number from 0 to 100, updated monthly, that measures how much real slack exists in the U.S. labor market — the kind of slack HR leaders actually feel when hiring, retaining, and budgeting.

Live reading: **[ilovethewrap.com/labor-market](https://ilovethewrap.com/labor-market)**

---

## What is the Wrap Underemployment Index?

A composite labor-market indicator published by The Wrap. It blends three public data series into a single 0-to-100 score so HR and talent leaders can read the labor market at a glance, without having to track three separate rates and remember what "normal" looks like for each.

## Why not just use the unemployment rate?

The official unemployment rate (U-3) only counts people actively job-hunting in the last four weeks. It misses two groups that matter to anyone running people operations:

- Workers stuck in part-time roles who want full-time hours.
- Workers who've stopped quitting because they don't see better options anywhere.

The WUI bundles those signals together so they don't get lost.

## What goes into it?

Three series, all sourced from [FRED](https://fred.stlouisfed.org/) (the Federal Reserve Bank of St. Louis), weighted by how much each tells us:

| Component | Series | Weight | What it captures |
|---|---|---|---|
| U-6 underemployment rate | `U6RATE` | 50% | The broad measure: includes part-time-for-economic-reasons workers and the marginally attached |
| U-6 minus U-3 spread | derived | 30% | How much underemployment is hiding beneath the headline number. A widening gap means the official rate is increasingly misleading |
| Quits rate (JOLTS) | `JTSQUR` | 20% *(inverted)* | How many workers are voluntarily leaving jobs. *Low* quits means workers feel stuck — itself a form of slack — so we flip the score |

## Why a 0-to-100 score?

Raw rates only make sense if you remember what "normal" was. The WUI ranks each component against its own trailing 120 months (10 years) using a mid-rank percentile, so the index tells you where today sits relative to the recent past — no mental calibration required.

The exact formula:

```
WUI = 0.50 × percentile(U-6)
    + 0.30 × percentile(U-6 − U-3 spread)
    + 0.20 × (100 − percentile(quits rate))
```

## How do I read it?

| Range | Interpretation |
|---|---|
| **~50** | In line with the last decade |
| **> 75** | Unusually slack labor market — lots of underemployed workers, few voluntary quits |
| **< 25** | Unusually tight labor market — most workers employed at full capacity, lots of quitting |

The monthly direction matters as much as the level. A rising WUI signals softening conditions even from a low baseline; a falling WUI signals tightening even when the level is high.

## How often does it update?

The 7th of each month at 14:30 UTC. The schedule lines up with the BLS release calendar so the latest WUI-eligible month is always complete:

- BLS *Employment Situation* (U-3, U-6) publishes the first Friday of the month.
- BLS *JOLTS* (quits rate) for two months prior publishes in the first week.
- By the 7th, both inputs for the most recent complete month are available.

Historical FRED revisions are pulled in on every run, so prior months can correct after the fact if BLS revises its data.

## Is it free?

Yes, always. The current reading, three-component breakdown, and 60-month trend chart are live on **[ilovethewrap.com/labor-market](https://ilovethewrap.com/labor-market)** with no paywall and no signup required.

## Why is The Wrap publishing this?

HR and talent leaders read economic indicators built for economists, not for the people making the hiring and retention decisions those indicators describe. The WUI is one attempt to close that gap: a single number, on a single page, that tells you whether the job market is loose or tight relative to the recent past.

## Citation

If you reference the WUI, please cite:

> The Wrap Underemployment Index, The Wrap. ilovethewrap.com/labor-market

Underlying data is from FRED; methodology is original to The Wrap.

## Questions or corrections?

Email **mike@ilovethewrap.com**.
