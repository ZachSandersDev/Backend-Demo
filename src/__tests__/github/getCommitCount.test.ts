import * as githubUtils from "../../github/utils";

import getCommitCount from "../../github/getCommitCount";

describe("getCommitCount", () => {
  const fetchMock = jest.spyOn(githubUtils, "fetchWithGHCredentials");

  beforeEach(() => {
    jest.resetAllMocks();
    fetchMock.mockResolvedValue(new Response('{ "total_commits": 5 }'));
  });

  it("calls an expected github endpoint", async () => {
    await getCommitCount("owner", "repo", "base", "head");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/repos/owner/repo/compare/base...head?per_page=1"
    );
  });

  it("throws an expected error if the response has an error code", async () => {
    const failedResponse = new Response("example error", { status: 400 });
    fetchMock.mockResolvedValue(failedResponse);

    expect.assertions(1);
    getCommitCount("owner", "repo", "base", "head").catch((e) =>
      expect(e).toEqual(new Error("Failed to get commit list\nexample error"))
    );
  });

  it("returns an expected result", async () => {
    const result = await getCommitCount("owner", "repo", "base", "head");
    expect(result).toEqual(5);
  });
});
