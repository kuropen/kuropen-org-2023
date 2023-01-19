/**
 * Welcome to Cloudflare Workers! This is your first scheduled worker.
 *
 * - Run `wrangler dev --local` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/cdn-cgi/mf/scheduled"` to trigger the scheduled event
 * - Go back to the console to see what your worker has logged
 * - Update the Cron trigger in wrangler.toml (see https://developers.cloudflare.com/workers/wrangler/configuration/#triggers)
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/runtime-apis/scheduled-event/
 */

import { WhatsNewListSelectOptions } from "./@types";
import Env from "./@types/env"
import getWhatsNewList from "./services/whatsNewListService";
import runAggregateTask from "./tasks"

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url)
		const { pathname } = url

		if (pathname === '/whatsnew') {
			const sLimit = url.searchParams.get('limit')
			const sOffset = url.searchParams.get('offset')
			const options: WhatsNewListSelectOptions = {
				limit: (typeof sLimit === "string") ? parseInt(sLimit) : sLimit,
				offset: (typeof sOffset === "string") ? parseInt(sOffset) : sOffset,
			}
			const result = await getWhatsNewList(env, options)
			return new Response(result, {
				headers: {
					'Content-Type': 'application/json',
				}
			})
		}

		if (pathname === '/manual-execute') {
			const result = await runAggregateTask(env)
			return new Response(JSON.stringify(result), {
				headers: {
					'Content-Type': 'application/json',
				}
			})
		}

		return new Response("This is kuropen.org backend.", {
			headers: {
				'Content-Type': 'text/plain',
			}
		})
	},
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext
	): Promise<void> {
		await runAggregateTask(env)
	},
};
