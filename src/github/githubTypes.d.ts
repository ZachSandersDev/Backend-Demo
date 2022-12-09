interface PullRequest {
  id: number;
  number: number;
  title: string;
  user: { login: string };
  base: { sha: string };
  head: { sha: string };
}

interface CompareResponse {
  total_commits: number;
}
