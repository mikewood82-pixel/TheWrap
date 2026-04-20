-- Full-text search over jobs. Uses SQLite FTS5 with contentless external-content mode
-- backed by the `jobs` table. Triggers keep it in sync with writes.

CREATE VIRTUAL TABLE IF NOT EXISTS jobs_fts USING fts5(
  title, department, location, description_html,
  content='jobs', content_rowid='id',
  tokenize='porter unicode61'
);

CREATE TRIGGER IF NOT EXISTS jobs_ai AFTER INSERT ON jobs BEGIN
  INSERT INTO jobs_fts(rowid, title, department, location, description_html)
  VALUES (new.id, new.title, new.department, new.location, new.description_html);
END;

CREATE TRIGGER IF NOT EXISTS jobs_ad AFTER DELETE ON jobs BEGIN
  INSERT INTO jobs_fts(jobs_fts, rowid, title, department, location, description_html)
  VALUES ('delete', old.id, old.title, old.department, old.location, old.description_html);
END;

CREATE TRIGGER IF NOT EXISTS jobs_au AFTER UPDATE ON jobs BEGIN
  INSERT INTO jobs_fts(jobs_fts, rowid, title, department, location, description_html)
  VALUES ('delete', old.id, old.title, old.department, old.location, old.description_html);
  INSERT INTO jobs_fts(rowid, title, department, location, description_html)
  VALUES (new.id, new.title, new.department, new.location, new.description_html);
END;
