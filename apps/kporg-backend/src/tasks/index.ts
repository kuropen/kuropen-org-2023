/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { connect, ExecutedQuery, Config } from "@planetscale/database/dist"
import Env from "../@types/env"
import { CrawlTask } from "../@types"
import generateQueryParam from "../util/generateQueryParam"
import NoteTask from "./noteTask"
import PenguinoneBlogTask from "./penguinoneBlogTask"
import { WhatsNewContent, WhatsNewContentWithHash } from "../../../../packages/kporg-types"
import Jssha from "jssha"

/**
 * Runs aggregate tasks.
 * @param env Environment variables
 * @returns result (for debug purpose; normally discarded)
 */
async function runAggregateTask(env: Env): Promise<(ExecutedQuery | WhatsNewContent | undefined)[]> {
	const tasks: CrawlTask[] = [
		new NoteTask(),
		new PenguinoneBlogTask(env.BLOG_BUCKET),
	]

	const promises = tasks.map((task) => task.crawl())
	const feeds = await Promise.all(promises)
	let feedContents: WhatsNewContent[] = []
	feeds.forEach((feed) => {
		feedContents = feedContents.concat(feed)
	})

	if (env.PS_HOST && env.PS_USER && env.PS_PASSWORD) {
		const psConfig: Config = {
			host: env.PS_HOST,
			username: env.PS_USER,
			password: env.PS_PASSWORD,
		}
		const conn = connect(psConfig)
		const feedContentsForTransaction = await Promise.all(feedContents.map(async (content) => {
			// SHA-256 checksum of JSON representation of content.
			const shaObj = new Jssha("SHA-256", "TEXT")
			shaObj.update(JSON.stringify(content))
			const hash = shaObj.getHash("HEX")
			// Check if there is a record with same hash.
			const hashQuery = 'SELECT `hash` FROM whatsnew WHERE `hash` = :hash;'
			const hashResult = await conn.execute(hashQuery, { hash })

			let contentWithHash: WhatsNewContentWithHash | undefined
			if (hashResult.size === 0) {
				contentWithHash = {
					...content,
					hash: hash,
				}
			}
			return contentWithHash
		}))
			
		const query = 'INSERT INTO whatsnew (`source`, `title`, `date`, `is_external`, `url`, `updated_at`, `hash`) VALUES (:source, :title, :date, :is_external, :url, CURRENT_TIMESTAMP, :hash) ON DUPLICATE KEY UPDATE `title` = :title, `date` = :date, `updated_at` = CURRENT_TIMESTAMP, `hash` = :hash;'
		const transactions = feedContentsForTransaction.map((content) => {
			if (content) {
				return conn.execute(query, generateQueryParam(content))
			}
		})
		const results = await Promise.all(transactions)
		
		return results.filter((result) => result !== undefined)
	} else {
		return feedContents
	}
}

export default runAggregateTask
