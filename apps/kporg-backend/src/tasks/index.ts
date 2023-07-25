/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: MPL-2.0
 */

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
async function runAggregateTask(env: Env): Promise<(D1Result | WhatsNewContent | undefined)[]> {
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

	if (env.DB) {
		const feedContentsForTransaction = await Promise.all(feedContents.map(async (content) => {
			// SHA-256 checksum of JSON representation of content.
			const shaObj = new Jssha("SHA-256", "TEXT")
			shaObj.update(JSON.stringify(content))
			const hash = shaObj.getHash("HEX")
			// Check if there is a record with same hash.
			const hashQuery = 'SELECT hash FROM whatsnew WHERE hash = ?;'
			const hashResult = await env.DB?.prepare(hashQuery).bind(hash).all()
			
			let contentWithHash: WhatsNewContentWithHash | undefined
			if (hashResult?.results?.length === 0) {
				contentWithHash = {
					...content,
					hash: hash,
				}
			}
			return contentWithHash
		}))
		const insertQuery = 'INSERT INTO whatsnew (source, title, date, is_external, url, updated_at, hash) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?);'
		const updateCheckQuery = 'SELECT id FROM whatsnew WHERE source = ? AND url = ?;'
		const updateQuery = 'UPDATE whatsnew SET title = ?, date = ?, updated_at = CURRENT_TIMESTAMP, hash = ? WHERE id = ?;'
		const promises = feedContentsForTransaction.map(async (c) => {
			if (c) {
				const content = generateQueryParam(c)
				const id = await env.DB?.prepare(updateCheckQuery).bind(content.source, content.url).first<string | number>('id')
				if (!id) {
					return env.DB?.prepare(insertQuery).bind(content.source, content.title, content.date, content.is_external, content.url, content.hash).run()
				}
				return env.DB?.prepare(updateQuery).bind(content.title, content.date, content.hash, id).run()
			}
		})
		const results = await Promise.all(promises)
		return results.filter((result) => result !== undefined)
	} else {
		return feedContents
	}
}

export default runAggregateTask
