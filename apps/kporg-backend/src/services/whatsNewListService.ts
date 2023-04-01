/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { WhatsNewContent, WhatsNewContentOnDatabase, WhatsNewListSelectOptions } from "../../../../packages/kporg-types"
import Env from "../@types/env"

/**
 * Fetches "What's New" table and returns its content in JSON string.
 * @param env Environment variables
 * @returns JSON string
 */
async function getWhatsNewList(env: Env, options: WhatsNewListSelectOptions): Promise<string> {
    const { source } = options

    if (env.DB) {
        const whereConditions = [
            "`date` < datetime('now')"
        ]
        if (source) {
            whereConditions.push('source = ?')
        }

        let query = 'SELECT source, title, date, is_external, url FROM whatsnew WHERE ' + whereConditions.join(' AND ') + ' ORDER BY date DESC;'

        let stmt = env.DB?.prepare(query)
        if (source) {
            stmt = stmt?.bind(source)
        }
        const { results } = await stmt.all<WhatsNewContentOnDatabase>();
        const contents = results?.map((row) => {
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
