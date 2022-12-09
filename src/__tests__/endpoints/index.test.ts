import express from "express";

import registerAllEndpoints from "../../endpoints";
import * as pullSummaryMod from "../../endpoints/pullRequestSummary";

describe("registerAllEndpoints", () => {
  const registerPullMock = jest.spyOn(
    pullSummaryMod,
    "registerPullRequestEndpoints"
  );

  it("registers the pull request summary endpoint", () => {
    const app = express();
    registerAllEndpoints(app);
    expect(registerPullMock).toHaveBeenCalledWith(app);
  });
});
