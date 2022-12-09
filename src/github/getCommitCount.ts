import { fetchWithGHCredentials } from "./utils";

export default async function getCommitCount(
  owner: string,
  repo: string,
  base: string,
  head: string
): Promise<number> {
  // Get the comparison between base and head
  // We include "per_page=1" here to prevent fetching uneccessary data
  const res = await fetchWithGHCredentials(
    `https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}?per_page=1`
  );

  if (!res.ok) {
    throw new Error("Failed to get commit list\n" + (await res.text()));
  }

  const compare: CompareResponse = await res.json();
  return compare.total_commits;
}
