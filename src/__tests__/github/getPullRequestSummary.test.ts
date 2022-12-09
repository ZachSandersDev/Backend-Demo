import * as pullListMod from "../../github/getPullRequestList";
import * as comCountMod from "../../github/getCommitCount";
import getPullRequestSummary from "../../github/getPullRequestSummary";

const mockPullRequest = {
  id: 1,
  number: 1,
  title: "title",
  user: { login: "login" },
  base: { sha: "base" },
  head: { sha: "head" },
};

describe("getPullRequestSummary", () => {
  const pullListMock = jest.spyOn(pullListMod, "default");
  const comCountMock = jest.spyOn(comCountMod, "default");

  beforeEach(() => {
    jest.resetAllMocks();
    pullListMock.mockResolvedValue([mockPullRequest, mockPullRequest]);
    comCountMock.mockResolvedValue(1);
  });

  it("calls the pull request list function", async () => {
    await getPullRequestSummary("owner", "repo");
    expect(pullListMock).toHaveBeenCalledWith("owner", "repo");
  });

  it("calls the commit count function once per pull request", async () => {
    await getPullRequestSummary("owner", "repo");
    expect(comCountMock.mock.calls).toEqual([
      ["owner", "repo", "base", "head"],
      ["owner", "repo", "base", "head"],
    ]);
  });

  it("returns an expected result", async () => {
    const result = await getPullRequestSummary("owner", "repo");
    expect(result).toEqual([
      {
        id: 1,
        number: 1,
        title: "title",
        author: "login",
        commit_count: 1,
      },
      {
        id: 1,
        number: 1,
        title: "title",
        author: "login",
        commit_count: 1,
      },
    ]);
  });

  it("hoists errors from getPullRequestList", async () => {
    expect.assertions(1);
    try {
      pullListMock.mockRejectedValue(new Error("example error"));
      await getPullRequestSummary("owner", "repo");
    } catch (err) {
      expect(err).toEqual(new Error("example error"));
    }
  });

  it("hoists errors from getCommitCount", async () => {
    expect.assertions(1);
    try {
      comCountMock.mockRejectedValue(new Error("example error"));
      await getPullRequestSummary("owner", "repo");
    } catch (err) {
      expect(err).toEqual(new Error("example error"));
    }
  });
});
