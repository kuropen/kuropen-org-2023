/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { connect, Config } from "@planetscale/database/dist"
import { WhatsNewContent, WhatsNewListSelectOptions } from "@kuropen/kporg-types"
import Env from "../@types/env"

type WhatsNewListSelectParam = {
    limit?: number
    offset?: number
    source?: string
}

/**
 * Fetches "What's New" table and returns its content in JSON string.
 * @param env Environment variables
 * @returns JSON string
 */
async function getWhatsNewList(env: Env, options: WhatsNewListSelectOptions): Promise<string> {
    const { limit, offset, source } = options

    if (env.PS_HOST && env.PS_USER && env.PS_PASSWORD) {
        const psConfig: Config = {
			host: env.PS_HOST,
			username: env.PS_USER,
			password: env.PS_PASSWORD,
		}

        const conn = connect(psConfig)

        let params: WhatsNewListSelectParam = {}

        const whereConditions = [
            '`date` < NOW()'
        ]
        if (source) {
            whereConditions.push('`source` = :source')
            params.source = source
        }

        let query = 'SELECT `source`, `title`, `date`, `is_external`, `url` FROM `whatsnew` WHERE ' + whereConditions.join(' AND ') + ' ORDER BY `date` DESC'
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
