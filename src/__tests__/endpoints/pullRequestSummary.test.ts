import { handlePullRequestSummary } from "../../endpoints/pullRequestSummary";

import * as pullSummaryMod from "../../github/getPullRequestSummary";
import { PullRequestSummary } from "../../github/githubTypes";

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
