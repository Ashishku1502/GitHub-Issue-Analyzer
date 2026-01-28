export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface GitHubIssue {
  id: number;
  repo: string;
  title: string;
  body: string;
  html_url: string;
  created_at: string;
}

export interface ScanResponse {
  repo: string;
  issues_fetched: number;
  cached_successfully: boolean;
}

export interface AnalyzeResponse {
  analysis: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}
