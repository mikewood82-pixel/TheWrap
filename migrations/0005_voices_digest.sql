-- The Wrap — Voices digest (Wrap+ follow + Tuesday email)
-- Binding: JOBS_DB (continues the voices_* shared schema).

-- Per-user follows. One row per (user, source). PK composite for O(1) checks.
CREATE TABLE IF NOT EXISTS voices_follows (
  clerk_user_id   TEXT NOT NULL,
  source_id       INTEGER NOT NULL REFERENCES voices_sources(id) ON DELETE CASCADE,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (clerk_user_id, source_id)
);

CREATE INDEX IF NOT EXISTS idx_voices_follows_user   ON voices_follows(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_voices_follows_source ON voices_follows(source_id);

-- Per-user digest state. Created on first follow (so we know who to email
-- and where). `last_sent_at` is the cursor for incremental digests — items
-- with published_at > last_sent_at go in the next digest. `active=0` lets
-- a recipient pause all voices emails without losing their follows.
CREATE TABLE IF NOT EXISTS voices_digest_state (
  clerk_user_id   TEXT PRIMARY KEY,
  email           TEXT NOT NULL,
  active          INTEGER NOT NULL DEFAULT 1,
  last_sent_at    TEXT,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_voices_digest_active ON voices_digest_state(active);

-- Per-item send record for dedup. Belt-and-suspenders on top of last_sent_at
-- so a same-Tuesday retry (network blip mid-delivery) can't double-send.
CREATE TABLE IF NOT EXISTS voices_digest_sent (
  clerk_user_id   TEXT NOT NULL,
  item_id         INTEGER NOT NULL REFERENCES voices_items(id) ON DELETE CASCADE,
  sent_at         TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (clerk_user_id, item_id)
);

CREATE INDEX IF NOT EXISTS idx_voices_digest_sent_user ON voices_digest_sent(clerk_user_id);

-- Run bookkeeping.
CREATE TABLE IF NOT EXISTS voices_digest_runs (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at      TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at     TEXT,
  digests_sent    INTEGER NOT NULL DEFAULT 0,
  items_sent      INTEGER NOT NULL DEFAULT 0,
  skipped_empty   INTEGER NOT NULL DEFAULT 0,
  errors          INTEGER NOT NULL DEFAULT 0
);
