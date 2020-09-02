DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  'year' INTEGER NOT NULL,
  kms INTEGER NOT NULL,
  color TEXT NOT NULL,
  has_air_conditioning BOOLEAN NOT NULL,
  passengers INTEGER NOT NULL,
  is_automatic BOOLEAN NOT NULL,
  created_at DATE DEFAULT (datetime('now')) NOT NULL,
  updated_at DATE DEFAULT (datetime('now')) NOT NULL
)
