import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { MovieSearchOptions, TMDB } from "@tdanks2000/tmdb-wrapper";
import { fmt } from "./utils/format";

export class TmdbMCP extends McpAgent {
	server = new McpServer({
		name: "TMDB Mcp Server",
		version: "0.1.0",
	});

	async init() {
		this.server.tool(
			"search_movies",
			fmt.trim(`
				Search for movies by title.

				If no query is provided, returns popular movies.
			`),
			{
				query: z.string().optional(),
			},
			async ({ query }) => {
				const token = this.props.tmdbAccessToken as string;
				const tmdb = new TMDB(token);

				if (!query) {
					const popularMovies = await tmdb.movies.popular({
						language: 'ko-KR'
					});
					return {
						content: popularMovies.results.map((movie) => ({
							type: "text",
							text: movie.title,
						})),
					};
				}

				const searchOption: MovieSearchOptions = {
					query,
					include_adult: false,
					language: 'ko-KR',
				};
				const searchResults = await tmdb.search.movies(searchOption);
				return {
					content: searchResults.results.map((movie) => ({
						type: "text",
						text: movie.title,
					})),
				};
			}
		);

		this.server.tool(
			"get_trending_movies",
			fmt.trim(`
				Get a list of trending movies.

				MUST provide the time window for trending movies.
				time window can be either "day" or "week".
			`),
			{
				timeWindow: z.enum(["day", "week"]).describe("Time window for trending movies"),
			},
			async ({ timeWindow }) => {
				const token = this.props.tmdbAccessToken as string;
				const tmdb = new TMDB(token);

				const trendingMovies = await tmdb.trending.trending("movie", timeWindow, {
					language: 'ko-KR',
				});
				return {
					content: trendingMovies.results.map((movie) => ({
						type: "text",
						text: movie.title,
					})),
				};
			}
		);
	}
}

export default {
	fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const url = new URL(request.url);

		const tmdbAccessToken = request.headers.get("X-TMDB-ACCESS-TOKEN");
		if (!tmdbAccessToken) {
			return new Response("Unauthorized", { status: 401 });
		}
		ctx.props.tmdbAccessToken = tmdbAccessToken;

		if (url.pathname === "/sse" || url.pathname === "/sse/message") {
			return TmdbMCP.serveSSE("/sse").fetch(request, env, ctx);
		}

		if (url.pathname === "/mcp") {
			return TmdbMCP.serve("/mcp").fetch(request, env, ctx);
		}

		return new Response("Not found", { status: 404 });
	},
};
