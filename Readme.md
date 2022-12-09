# Backend-Demo
This is a demo backend service written with Node, TypeScript and Jest.

It takes in a GitHub repo's URL and returns a summary of its pull requests.

## Endpoints

```
GET: /pulls/summary/{github repo url}
```

### Params

- `{github repo url}`: A URL for a GitHub repository 
  - Something like: 
  ```
  https://github.com/ZachSandersDev/Backend-Demo
  ```
  - However, the URL must be URL encoded. This can be achieved using `encodeURIComponent()` in JS: 
  ```
  https%3A%2F%2Fgithub.com%2FZachSandersDev%2FBackend-Demo
  ```

### Return Format

```ts
interface PullRequestSummary {
  id: number;
  number: number;
  title: string;
  author: string;
  commit_count: number;
}

// GET: /pulls/summary/{github repo url} => PullRequestSummary[]
```

- The server will return a `PullRequestSummary[]` (in JSON). One entry per pull request on the repo.
  - `id` is the id of pull request
  - `number` is the number of pull request
  - `title` is the pull request's title 
  - `author` is the username of the pull request's author
  - `commit_count` is the number of commits in the pull request
- If there is any kind of error, the service assumes it's user error and will return a `400` status code. In this case, the body of the request will contain an error message as plaintext.

# Env

This service also requires a GitHub Access Token to operate. This token should be loaded as an environment variable `GITHUB_ACCESS_TOKEN`.
- This can be set through an `.env.local` file and loaded using `dotenv` with the command `npm run startLocalEnv`.
- Or, this can be set through some other means, and the server can be started through the default `npm start` command.