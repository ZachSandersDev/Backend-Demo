import fetch from "cross-fetch"

export function fetchWithGHCredentials(resource: RequestInfo, options?: RequestInit) {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    throw "Github token not found";
  }

  return fetch(resource, {
    ...options,
    headers: {
      ...options?.headers,
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    }
  })
}