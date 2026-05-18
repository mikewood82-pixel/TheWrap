-- BLS / FRED observations backing The Wrap Underemployment Index (WUI).
-- One row per (series_id, observation_date). Months are stored as YYYY-MM-01.
-- FRED revises historical values, so the ingest path upserts on conflict.

CREATE TABLE IF NOT EXISTS bls_observations (
  series_id        TEXT NOT NULL,
  observation_date TEXT NOT NULL,
  value            REAL NOT NULL,
  fetched_at       TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (series_id, observation_date)
);

CREATE INDEX IF NOT EXISTS idx_bls_obs_series_date
  ON bls_observations(series_id, observation_date DESC);
