-- The Wrap — Wrap+ alert frequency + webhook delivery
-- Binding: JOBS_DB

-- Frequency controls when a saved search is eligible to fire:
--   'daily'  = default; evaluated every day after ingest (06:17 UTC)
--   'weekly' = evaluated only on Monday (UTC) after ingest
-- 'instant' is intentionally out of scope for this pass — the pipeline
-- fires once per day regardless of this flag.
ALTER TABLE alerts ADD COLUMN frequency TEXT NOT NULL DEFAULT 'daily';

-- Optional webhook delivered IN ADDITION to email. Autodetects Slack
-- (hooks.slack.com/...) and posts Block Kit; anything else gets generic
-- JSON.
ALTER TABLE alerts ADD COLUMN webhook_url TEXT;

-- Same on vendor_watches so freeze alerts can drop directly into a
-- team Slack channel.
ALTER TABLE vendor_watches ADD COLUMN webhook_url TEXT;
