# tmdb-workers-mcp-server

![Static Badge](https://img.shields.io/badge/Made%20with-Cloudflare%20Workers-blue?style=flat&logo=cloudflareworkers&logoColor=white&color=F38020)

This MCP server provides movie data using [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

- Remote MCP Server URL: https://tmdb.mcp.joe-brothers.com/

## Features

### Tools
- **Search Movies**: Search for movies by title. If no query is provided, returns popular movies.

- **Get Trending Movies**: Get a list of trending movies. Must provide the time window for trending movies, which can be either "day" or "week".

### Resources
N/A

### Prompts
N/A

## Supported transport types
- SSE (/sse)
- Streamable HTTP (/mcp)

## Usage

### Claude Desktop
```json
{
  "mcpServers": {
    "tmdb": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://tmdb.mcp.joe-brothers.com/mcp",
        "--header",
        "X-TMDB-ACCESS-TOKEN:${TMDB_ACCESS_TOKEN}"
      ],
      "env": {
        "TMDB_ACCESS_TOKEN": "wZwWIl62CiMMI32tp3V2Yhw..."
      }
    }
  }
}
```

### Authentication
You must provide a valid TMDB API read access token in the `X-TMDB-ACCESS-TOKEN` header.

- https://www.themoviedb.org/settings/api

## References
- https://developers.cloudflare.com/agents/guides/remote-mcp-server/


## Dev

```shell
pnpm start
```
Run mcp server locally.

```shell
npx @modelcontextprotocol/inspector@latest
```
Run inspector and set,

- transport: Streamable HTTP
- url: `http://127.0.0.1:8787/mcp`
- Authentication
  - Header Name: `X-TMDB-ACCESS-TOKEN`
  - Header Value: `<your_tmdb_access_token>`
