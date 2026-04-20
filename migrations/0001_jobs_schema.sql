-- The Wrap — jobs database schema
-- Binding: JOBS_DB (see wrangler.toml)

CREATE TABLE IF NOT EXISTS vendor_ats (
  vendor_slug   TEXT PRIMARY KEY,
  vendor_name   TEXT NOT NULL,
  ats           TEXT NOT NULL,  -- greenhouse | lever | ashby | smartrecruiters | workable | recruitee | unknown
  handle        TEXT,           -- company identifier on the ATS (e.g. "stripe" for Greenhouse)
  careers_url   TEXT,
  active        INTEGER NOT NULL DEFAULT 1,
  last_error    TEXT,
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS jobs (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  external_id     TEXT NOT NULL,           -- id as reported by the ATS
  vendor_slug     TEXT NOT NULL REFERENCES vendor_ats(vendor_slug),
  ats_source      TEXT NOT NULL,
  title           TEXT NOT NULL,
  department      TEXT,
  location        TEXT,
  remote          TEXT,                    -- remote | hybrid | onsite | unknown
  employment_type TEXT,                    -- full_time | part_time | contract | intern | unknown
  seniority       TEXT,                    -- entry | mid | senior | lead | exec | unknown
  url             TEXT NOT NULL,
  description_html TEXT,
  posted_at       TEXT,                    -- ISO timestamp
  first_seen_at   TEXT NOT NULL DEFAULT (datetime('now')),
  last_seen_at    TEXT NOT NULL DEFAULT (datetime('now')),
  status          TEXT NOT NULL DEFAULT 'open', -- open | closed
  UNIQUE (vendor_slug, ats_source, external_id)
);

CREATE INDEX IF NOT EXISTS idx_jobs_vendor      ON jobs(vendor_slug);
CREATE INDEX IF NOT EXISTS idx_jobs_status      ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_at   ON jobs(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_seniority   ON jobs(seniority);
CREATE INDEX IF NOT EXISTS idx_jobs_remote      ON jobs(remote);

CREATE TABLE IF NOT EXISTS alerts (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  clerk_user_id TEXT NOT NULL,
  email         TEXT NOT NULL,
  name          TEXT,                      -- optional user label "SF Senior PM"
  query_json    TEXT NOT NULL,             -- serialized filter payload
  active        INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_alerts_user   ON alerts(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_active ON alerts(active);

CREATE TABLE IF NOT EXISTS alert_sent (
  alert_id  INTEGER NOT NULL REFERENCES alerts(id) ON DELETE CASCADE,
  job_id    INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  sent_at   TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (alert_id, job_id)
);

CREATE TABLE IF NOT EXISTS apply_clicks (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id    INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  ts        TEXT NOT NULL DEFAULT (datetime('now')),
  country   TEXT
);
CREATE INDEX IF NOT EXISTS idx_apply_job ON apply_clicks(job_id);

CREATE TABLE IF NOT EXISTS ingest_runs (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at    TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at   TEXT,
  vendors_ok    INTEGER NOT NULL DEFAULT 0,
  vendors_err   INTEGER NOT NULL DEFAULT 0,
  jobs_added    INTEGER NOT NULL DEFAULT 0,
  jobs_closed   INTEGER NOT NULL DEFAULT 0,
  error         TEXT
);
