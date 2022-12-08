import { fetchWithGHCredentials } from "./utils";

const GITHUB_API = "https://api.github.com/"

export async function getPullRequestList(owner: string, repo: string) {
  const res = await fetchWithGHCredentials(`${GITHUB_API}repos/${owner}/${repo}/pulls`);

  if (!res.ok) {
    throw new Error("Failed to get pull request list\n" + await res.text());
  }

  return res.json();
}