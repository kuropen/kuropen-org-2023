/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: MPL-2.0
 */

import { WhatsNewListSelectOptions } from "../../../packages/kporg-types";
import Env from "./@types/env"
import getPgnArchiveDoc from "./services/pgnArchiveDocService";
import getWhatsNewList from "./services/whatsNewListService";
import runAggregateTask from "./tasks"

/**
 * Content update related tasks.
 * @param env Environment variable
 * @returns Results of fetching tasks
 */
const doTasks = async (env: Env) => {
	// Running fetching tasks.
	const tasks: Promise<any>[] = [
		runAggregateTask(env),
	]
	const fetchResult = await Promise.all(tasks)

	// Now "fetchResult" is an array may be nested.
	// Count the number of all contents.
	const count = fetchResult.reduce((acc, cur) => {
		if (Array.isArray(cur)) {
			return acc + cur.length
		}
		return acc + 1
	}, 0)

	let updateResult: any = []

	// Once after fetching tasks are done, we will trigger a webhook
	// if such webhook is defined in environment variable "REFRESH_WEBHOOK_URL".
	// But if the count of fetchResult is zero, the webhook should be skipped.
	if (env.REFRESH_WEBHOOK_URL && count > 0) {
		const webhookResult = await fetch(env.REFRESH_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				count,
			}),
		})
		updateResult = await webhookResult.json()
	}

	return {
		result: {
			fetch: fetchResult,
			update: updateResult,
		}
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url)
		const { pathname } = url

		if (pathname === '/whatsnew') {
			const source = url.searchParams.get('source')
			const options: WhatsNewListSelectOptions = {
				source: (source === 'PGN-CMS' || source === 'Note') ? source : undefined,
			}
			const result = await getWhatsNewList(env, options)
			return new Response(result, {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}
			})
		}

		if (pathname === '/fb') {
			if (env.FB_URL) {
				return Response.redirect(env.FB_URL, 303)
			}
			return new Response('Not found.', {
				headers: {
					'Content-Type': 'text/plain',
				},
				status: 404,
			})
		}

		if (pathname === '/manual-execute') {
			const result = await doTasks(env)
			return new Response(JSON.stringify(result), {
				headers: {
					'Content-Type': 'application/json',
				}
			})
		}

		if (pathname === '/api/posts') {
			const result = await getPgnArchiveDoc(env, url.searchParams)
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
		await doTasks(env)
	},
};
