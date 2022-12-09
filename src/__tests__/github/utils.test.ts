jest.mock("cross-fetch", () => jest.fn());

describe("GitHub utils", () => {
  const originalEnv = process.env;
  let fetchMock = jest.fn();

  beforeEach(async () => {
    jest.resetModules();
    jest.resetAllMocks();

    const fetch = await import("cross-fetch");
    fetchMock = fetch as unknown as jest.Mock<typeof fetch>;

    process.env = {
      ...originalEnv,
      GITHUB_ACCESS_TOKEN: "1234",
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("fetchWithGHCredentials", () => {
    const GITHUB_HEADERS = {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer 1234",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    it("throws an error if GITHUB_ACCESS_TOKEN is undefined", async () => {
      delete process.env.GITHUB_ACCESS_TOKEN;
      const { fetchWithGHCredentials } = await import("../../github/utils");

      expect.assertions(1);
      try {
        await fetchWithGHCredentials("");
      } catch (e) {
        expect(e).toEqual(new Error("Github token not found"));
      }
    });

    it("calls fetch with expected values if options are not passed in", async () => {
      const { fetchWithGHCredentials } = await import("../../github/utils");

      await fetchWithGHCredentials("a url");
      expect(fetchMock).toHaveBeenCalledWith("a url", {
        headers: GITHUB_HEADERS,
      });
    });
  });
});
