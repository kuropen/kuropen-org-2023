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

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url)
		const { pathname } = url

		if (pathname === '/whatsnew') {
			const sLimit = url.searchParams.get('limit')
			const sOffset = url.searchParams.get('offset')
			const source = url.searchParams.get('source')
			const options: WhatsNewListSelectOptions = {
				limit: (typeof sLimit === "string") ? parseInt(sLimit) : sLimit,
				offset: (typeof sOffset === "string") ? parseInt(sOffset) : sOffset,
				source: (source === 'PGN-CMS' || source === 'Note') ? source : undefined,
			}
			const result = await getWhatsNewList(env, options)
			return new Response(result, {
				headers: {
					'Content-Type': 'application/json',
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
			const result = await runAggregateTask(env)
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
		await runAggregateTask(env)
	},
};
