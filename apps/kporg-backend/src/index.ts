/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
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
	let count = 0
	for (const result of fetchResult) {
		if (typeof result === 'number') {
			count += result
		} else if (typeof result === 'object') {
			for (const subResult of result) {
				if (typeof subResult === 'number') {
					count += subResult
				}
			}
		}
	}

	let updateResult: any = []

	// Once after fetching tasks are done, we will trigger a webhook
	// if such webhook is defined in environment variable "REFRESH_WEBHOOK_URL".
	// But if the count of fetchResult is zero, the webhook should be skipped.
	if (env.REFRESH_WEBHOOK_URL && count > 0) {
		const response = await fetch(env.REFRESH_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: 'Content update is done.',
			}),
		})
		if (!response.ok) {
			// In this case, error message is included in update result.
			const message = 'Failed to trigger a webhook.'
			console.error(message, response)
			updateResult = message
		} else {
			// include the webhook response in update result.
			updateResult = await response.json()
		}
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
