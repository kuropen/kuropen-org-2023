import { connect, ExecutedQuery, Config } from "@planetscale/database/dist"
import Env from "../@types/env"
import { WhatsNewContent, CrawlTask } from "../@types"
import generateQueryParam from "../util/generateQueryParam"
import NoteTask from "./noteTask"
import PenguinoneCmsTask from "./penguinoneCmsTask"

/**
 * Runs aggregate tasks.
 * @param env Environment variables
 * @returns result (for debug purpose; normally discarded)
 */
async function runAggregateTask(env: Env): Promise<ExecutedQuery[] | WhatsNewContent[]> {
	const tasks: CrawlTask[] = [
		new NoteTask(),
	]

	if (env.PGN_API_HOST) {
		tasks.push(new PenguinoneCmsTask(env.PGN_API_HOST))
	}

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
		const query = 'INSERT INTO whatsnew (`source`, `title`, `date`, `is_external`, `url`, `updated_at`) VALUES (:source, :title, :date, :is_external, :url, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE `title` = :title, `date` = :date, `updated_at` = CURRENT_TIMESTAMP;'
		const transactions = feedContents.map((content) => conn.execute(query, generateQueryParam(content)))
		const results = await Promise.all(transactions)
		
		return results
	} else {
		return feedContents
	}
}

export default runAggregateTask
