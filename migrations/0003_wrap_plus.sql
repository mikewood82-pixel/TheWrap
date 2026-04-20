-- Wrap+ foundation: daily per-vendor hiring snapshots and member watchlist.
-- Feeds Phase 5 (velocity charts), Phase 6 (hiring health index), and Phase 3
-- (watchlist UI) in the Wrap+ jobs roadmap.

-- Daily per-vendor snapshot. Written at the end of each ingest run, one row
-- per vendor per day. Idempotent on (vendor_slug, snapshot_date) so retries
-- on the same day update in place rather than duplicating.
CREATE TABLE IF NOT EXISTS vendor_snapshots (
  vendor_slug    TEXT NOT NULL,
  snapshot_date  TEXT NOT NULL,  -- YYYY-MM-DD, local to the ingest run
  open_jobs      INTEGER NOT NULL,
  jobs_added     INTEGER NOT NULL DEFAULT 0,
  jobs_closed    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (vendor_slug, snapshot_date)
);

CREATE INDEX IF NOT EXISTS idx_vendor_snap_date ON vendor_snapshots(snapshot_date);

-- Wrap+ members' saved jobs. Scoped by Clerk user id; deleted when the
-- underlying job row is removed (ON DELETE CASCADE) so stale watchlist
-- entries can't outlive the job.
CREATE TABLE IF NOT EXISTS watchlist (
  clerk_user_id  TEXT NOT NULL,
  job_id         INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  saved_at       TEXT NOT NULL DEFAULT (datetime('now')),
  note           TEXT,
  PRIMARY KEY (clerk_user_id, job_id)
);

CREATE INDEX IF NOT EXISTS idx_watchlist_user ON watchlist(clerk_user_id);
