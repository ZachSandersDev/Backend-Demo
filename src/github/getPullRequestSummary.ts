import getCommitCount from "./getCommitCount";
import getPullRequestList from "./getPullRequestList";

import type { PullRequestSummary } from "./githubTypes";

export default async function getPullRequestSummary(
  owner: string,
  repo: string
): Promise<PullRequestSummary[]> {
  const pullRequests = await getPullRequestList(owner, repo);

  const summaries = await Promise.all(
    pullRequests.map(async (pr) => {
      const summary: PullRequestSummary = {
        id: pr.id,
        number: pr.number,
        title: pr.title,
        author: pr.user.login,
        commit_count: await getCommitCount(
          owner,
          repo,
          pr.base.sha,
          pr.head.sha
        ),
      };

      return summary;
    })
  );

  return summaries;
}
