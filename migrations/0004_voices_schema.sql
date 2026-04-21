-- The Wrap — Voices (industry feed hub) schema
-- Binding: JOBS_DB (shared with jobs; tables prefixed voices_*).

CREATE TABLE IF NOT EXISTS voices_sources (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  slug               TEXT NOT NULL UNIQUE,         -- 'josh-bersin'
  name               TEXT NOT NULL,                -- 'Josh Bersin'
  kind               TEXT NOT NULL,                -- blog | newsletter | podcast | video | analyst
  site_url           TEXT NOT NULL,
  feed_url           TEXT NOT NULL,
  feed_kind          TEXT NOT NULL DEFAULT 'rss',  -- rss | atom | youtube
  avatar_url         TEXT,
  description        TEXT,
  active             INTEGER NOT NULL DEFAULT 1,
  etag               TEXT,
  last_modified      TEXT,
  last_fetched_at    TEXT,
  last_fetch_status  TEXT,                         -- ok | error:<reason>
  added_at           TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at         TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_voices_sources_active ON voices_sources(active);
CREATE INDEX IF NOT EXISTS idx_voices_sources_kind   ON voices_sources(kind);

CREATE TABLE IF NOT EXISTS voices_items (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  source_id      INTEGER NOT NULL REFERENCES voices_sources(id) ON DELETE CASCADE,
  guid           TEXT NOT NULL,                    -- from feed; stable per-source
  url            TEXT NOT NULL,                    -- canonical link OUT
  title          TEXT NOT NULL,
  excerpt        TEXT,                             -- sanitized, capped at ingest time
  image_url      TEXT,
  author         TEXT,
  published_at   TEXT NOT NULL,                    -- ISO; normalized at ingest
  fetched_at     TEXT NOT NULL DEFAULT (datetime('now')),
  featured       INTEGER NOT NULL DEFAULT 0,       -- editor's pick toggle
  hidden         INTEGER NOT NULL DEFAULT 0,       -- editorial kill-switch
  UNIQUE (source_id, guid)
);

CREATE INDEX IF NOT EXISTS idx_voices_items_published  ON voices_items(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_voices_items_source_pub ON voices_items(source_id, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_voices_items_visible    ON voices_items(hidden, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_voices_items_featured   ON voices_items(featured, published_at DESC);

-- Optional: track ingest runs so we can see per-source health at a glance.
CREATE TABLE IF NOT EXISTS voices_ingest_runs (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at    TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at   TEXT,
  sources_ok    INTEGER NOT NULL DEFAULT 0,
  sources_err   INTEGER NOT NULL DEFAULT 0,
  items_added   INTEGER NOT NULL DEFAULT 0,
  error         TEXT
);
