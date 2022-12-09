import fetch from "cross-fetch";

export async function fetchWithGHCredentials(
  resource: RequestInfo,
  options?: RequestInit
): Promise<Response> {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    throw new Error("Github token not found");
  }

  return await fetch(resource, {
    ...options,
    headers: {
      ...options?.headers,
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}
