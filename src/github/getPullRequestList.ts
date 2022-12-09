import { fetchWithGHCredentials } from "./utils";

export default async function getPullRequestList(
  owner: string,
  repo: string
): Promise<PullRequest[]> {
  const res = await fetchWithGHCredentials(
    `https://api.github.com/repos/${owner}/${repo}/pulls`
  );

  if (!res.ok) {
    throw new Error("Failed to get pull request list\n" + (await res.text()));
  }

  return await res.json();
}
