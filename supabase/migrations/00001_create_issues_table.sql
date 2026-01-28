-- Create issues table to cache GitHub issues
CREATE TABLE IF NOT EXISTS issues (
  id BIGINT PRIMARY KEY,
  repo TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  html_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  cached_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster repo lookups
CREATE INDEX IF NOT EXISTS idx_issues_repo ON issues(repo);
CREATE INDEX IF NOT EXISTS idx_issues_created_at ON issues(created_at DESC);

-- Create composite index for repo + created_at queries
CREATE INDEX IF NOT EXISTS idx_issues_repo_created ON issues(repo, created_at DESC);