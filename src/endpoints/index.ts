import { Application } from "express";
import { registerPullRequestEndpoints } from "./pullRequestSummary";

export default function registerAllEndpoints(app: Application): void {
  registerPullRequestEndpoints(app);
}
