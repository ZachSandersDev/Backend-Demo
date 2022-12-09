import { Application, Request, Response } from "express";

import getPullRequestSummary from "../github/getPullRequestSummary";

export function registerPullRequestEndpoints(app: Application): void {
  app.get("/pulls/summary/:repoURL", handlePullRequestSummary);
}

export async function handlePullRequestSummary(
  req: Request,
  res: Response
): Promise<void> {
  let owner: string, repo: string;

  try {
    const repoURL = new URL(req.params.repoURL);

    // Remove the leading slash and split the url to get the owner and repo
    [owner, repo] = repoURL.pathname.slice(1).split("/");
    if (!owner || !repo) {
      throw "invalid url";
    }
  } catch (err) {
    res.status(400).send("Supplied Github URL was invalid");
    return;
  }

  try {
    const summary = await getPullRequestSummary(owner, repo);
    res.json(summary);
  } catch (err) {
    res.status(400);

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send(`Could not get pull request summary for ${req.params.repoURL}`);
    }
  }
}
