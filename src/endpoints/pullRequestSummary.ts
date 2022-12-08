import { Application, Request, Response } from "express";
import { getPullRequestList } from "../github/api";

export function registerPullRequestEndpoints(app: Application) {
  app.get("/pulls/summary/:repoURL", handlePullRequestSummary);
}

export async function handlePullRequestSummary(req: Request, res: Response) {
  const repoURL = new URL(req.params.repoURL);

  const [owner, repo] = repoURL.pathname.slice(1).split("/");
  await getPullRequestSummary(owner, repo);

  res.send("ok");
}

export async function getPullRequestSummary(owner: string, repo: string) {
  const pullRequests = await getPullRequestList(owner, repo);

  console.log(pullRequests)
}