interface PullRequestSummary {
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
