// import { Application, Request, Response } from "express";

import { handlePullRequestSummary } from "../../endpoints/pullRequestSummary";

import * as pullSummaryMod from "../../github/getPullRequestSummary";

// import getPullRequestSummary from "../github/getPullRequestSummary";

// export function registerPullRequestEndpoints(app: Application): void {
//   app.get("/pulls/summary/:repoURL", handlePullRequestSummary);
// }

// export async function handlePullRequestSummary(
//   req: Request,
//   res: Response
// ): Promise<void> {
//   const repoURL = new URL(req.params.repoURL);

//   // Remove the leading slash and split the url to get the owner and repo
//   const [owner, repo] = repoURL.pathname.slice(1).split("/");

//   try {
//     const summary = await getPullRequestSummary(owner, repo);
//     res.json(summary);
//   } catch (err) {
//     res.status(400);

//     if (err instanceof Error) {
//       res.send(err?.message);
//     } else {
//       res.send(`Could not get pull request summary for ${repoURL.toString()}`);
//     }
//   }
// }

describe("pullRequestSummaryEndpoint", () => {
  const mockReq = {
    params: { repoURL: "https://github.com/ZachSandersDev/Backend-Demo" },
  };
  const mockRes: Record<string, jest.Mock> = {};

  const pullSummaryMock = jest.spyOn(pullSummaryMod, "default");

  beforeEach(() => {
    jest.resetAllMocks();

    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);
    mockRes.send = jest.fn().mockReturnValue(mockRes);
  });

  describe("handlePullRequestSummary", () => {
    it.each([
      undefined,
      "",
      "hello world",
      "https://github.com/",
      "https://github.com/ZachSandersDev",
      "https://github.com/ZachSandersDev/",
    ])("returns an error if the github url is invalid", async (repoURL) => {
      // @ts-ignore
      await handlePullRequestSummary({ params: { repoURL } }, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith(
        "Supplied Github URL was invalid"
      );
    });

    it("sends caught errors as the response body", async () => {
      pullSummaryMock.mockRejectedValue(new Error("example error"));

      // @ts-ignore
      await handlePullRequestSummary(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith("example error");
    });

    it("sends generic error message for caught throws with no error obj", async () => {
      pullSummaryMock.mockRejectedValue("example error");

      // @ts-ignore
      await handlePullRequestSummary(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith(
        `Could not get pull request summary for ${mockReq.params.repoURL}`
      );
    });

    it("sends an expected value", async () => {
      const exampleSummary: PullRequestSummary = {
        id: 1,
        number: 1,
        title: "title",
        author: "author",
        commit_count: 1,
      };
      pullSummaryMock.mockResolvedValue([exampleSummary]);

      // @ts-ignore
      await handlePullRequestSummary(mockReq, mockRes);
      expect(mockRes.json).toHaveBeenCalledWith([exampleSummary]);
    });
  });
});
