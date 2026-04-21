-- The Wrap — Vendor hiring-health change alerts (Wrap+)
-- Binding: JOBS_DB

-- Per-user watches. One row per (user, vendor). Email is snapshotted at
-- subscribe time (or updated on each POST) so the deliver endpoint can
-- send without a Clerk round-trip.
CREATE TABLE IF NOT EXISTS vendor_watches (
  clerk_user_id   TEXT NOT NULL,
  vendor_slug     TEXT NOT NULL REFERENCES vendor_ats(vendor_slug),
  email           TEXT NOT NULL,
  active          INTEGER NOT NULL DEFAULT 1,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (clerk_user_id, vendor_slug)
);

CREATE INDEX IF NOT EXISTS idx_vendor_watches_user   ON vendor_watches(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_vendor_watches_vendor ON vendor_watches(vendor_slug);
CREATE INDEX IF NOT EXISTS idx_vendor_watches_active ON vendor_watches(active);

-- Daily verdict snapshot per vendor. Populated by /api/vendor-alerts/deliver
-- on each run. We need a stored history so day-to-day comparisons are
-- trivial and idempotent (re-running the cron doesn't double-count or
-- re-fire alerts because vendor_health_alerts_sent caps it anyway).
CREATE TABLE IF NOT EXISTS vendor_health_history (
  vendor_slug     TEXT NOT NULL REFERENCES vendor_ats(vendor_slug),
  verdict_date    TEXT NOT NULL,            -- YYYY-MM-DD
  verdict         TEXT NOT NULL,            -- trending_up | stable | slowing | freeze
  ratio           REAL,
  days_of_data    INTEGER NOT NULL,
  recorded_at     TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (vendor_slug, verdict_date)
);

CREATE INDEX IF NOT EXISTS idx_vendor_health_latest ON vendor_health_history(vendor_slug, verdict_date DESC);

-- Dedup table. Keyed on (user, vendor, verdict_date) so re-running the
-- deliver cron for the same day is a no-op.
CREATE TABLE IF NOT EXISTS vendor_health_alerts_sent (
  clerk_user_id   TEXT NOT NULL,
  vendor_slug     TEXT NOT NULL REFERENCES vendor_ats(vendor_slug),
  verdict_date    TEXT NOT NULL,
  verdict         TEXT NOT NULL,
  previous_verdict TEXT,
  sent_at         TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (clerk_user_id, vendor_slug, verdict_date)
);

CREATE INDEX IF NOT EXISTS idx_vendor_alerts_sent_user ON vendor_health_alerts_sent(clerk_user_id);

-- Run bookkeeping. Parallel to voices_digest_runs / ingest_runs.
CREATE TABLE IF NOT EXISTS vendor_alert_runs (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at        TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at       TEXT,
  vendors_scanned   INTEGER NOT NULL DEFAULT 0,
  changes_detected  INTEGER NOT NULL DEFAULT 0,
  digests_sent      INTEGER NOT NULL DEFAULT 0,
  errors            INTEGER NOT NULL DEFAULT 0
);
