import getPullRequestList from "../../github/getPullRequestList";
import * as githubUtils from "../../github/utils";

describe("getPullRequestList", () => {
  const fetchMock = jest.spyOn(githubUtils, "fetchWithGHCredentials");

  beforeEach(() => {
    jest.resetAllMocks();
    fetchMock.mockResolvedValue(new Response('{ "success": true }'));
  });

  it("calls an expected github endpoint", async () => {
    await getPullRequestList("owner", "repo");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.github.com/repos/owner/repo/pulls"
    );
  });

  it("throws an expected error if the response has an error code", async () => {
    const failedResponse = new Response("example error", { status: 400 });
    fetchMock.mockResolvedValue(failedResponse);

    expect.assertions(1);
    getPullRequestList("owner", "repo").catch((e) =>
      expect(e).toEqual(
        new Error("Failed to get pull request list\nexample error")
      )
    );
  });

  it("returns an expected result", async () => {
    const result = await getPullRequestList("owner", "repo");
    expect(result).toEqual({ success: true });
  });
});
