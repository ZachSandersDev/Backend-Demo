export interface PullRequest {
  id: number;
  number: number;
  title: string;
  user: { login: string };
  base: { sha: string };
  head: { sha: string };
}

export interface CompareResponse {
  total_commits: number;
}

export interface PullRequestSummary {
  /** The ID of the PR */
  id: number;
  /** The PR's number */
  number: number;
  /** The title of the PR */
  title: string;
  /** The author of the PR */
  author: string;
  /** Number of commits in the PR */
  commit_count: number;
}
