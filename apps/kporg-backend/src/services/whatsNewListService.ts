import { connect, Config } from "@planetscale/database/dist"
import { WhatsNewContent, WhatsNewListSelectOptions } from "../@types"
import Env from "../@types/env"

type WhatsNewListSelectParam = {
    limit?: number
    offset?: number
}

/**
 * Fetches "What's New" table and returns its content in JSON string.
 * @param env Environment variables
 * @returns JSON string
 */
async function getWhatsNewList(env: Env, options: WhatsNewListSelectOptions): Promise<string> {
    const { limit, offset } = options

    if (env.PS_HOST && env.PS_USER && env.PS_PASSWORD) {
        const psConfig: Config = {
			host: env.PS_HOST,
			username: env.PS_USER,
			password: env.PS_PASSWORD,
		}

        const conn = connect(psConfig)

        let params: WhatsNewListSelectParam = {}

        let query = 'SELECT `source`, `title`, `date`, `is_external`, `url` FROM `whatsnew` WHERE `date` < NOW() ORDER BY `date` DESC'
        if (limit) {
            query += ' LIMIT :limit'
            params.limit = limit
        }
        if (offset) {
            query += ' OFFSET :offset'
            params.offset = offset
        }
        query += ';'
        const result = await conn.execute(query, params)
        const contents = result.rows.map((row) => {
            let content: WhatsNewContent | undefined
            if (!Array.isArray(row)) {
                content = {
                    is_external: (row.is_external == 1),
                    source: row.source,
                    url: row.url,
                    date: row.date,
                    title: row.title,
                }
            }
            return content
        })

        return JSON.stringify(contents)
    } else {
        return '[]'
    }
}

export default getWhatsNewList
