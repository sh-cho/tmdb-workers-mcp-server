# tmdb-workers-mcp-server

This MCP server provides movie data using [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

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
        "TMDB_ACCESS_TOKEN": "wZwWIl62CiMMI32tp3V2YhwIZ4YAYOxNjlLEgljzYmXQOSMTiXY9WJy9IcTiL2TmIZXYjmizjIA.ijeSMFWMsIDXZJMY0zv3i446wdxj5wl0TOJUaVsNmzSzWMdxY0V-2NOCb3xZ.MV6HJiOvOWmYM6GUQecEZJzdV5W-ZOhGJNB3kSIiYNyWYcZ4ycsRdwNiN_XTMziONMiC5tlpzYVjWJyI_LM1liaZ4OMiUiiTz5QY8bhYz4J"
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
