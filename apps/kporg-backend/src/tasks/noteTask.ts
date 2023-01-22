/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { WhatsNewContent } from "@kuropen/kporg-types"
import { read } from '@extractus/feed-extractor'
import { CrawlTask } from "../@types"

const NOTE_RSS_URL = 'https://note.com/penguinote/rss' as const

class NoteTask implements CrawlTask {
    async crawl(): Promise<WhatsNewContent[]> {
        const rssContent = await read(NOTE_RSS_URL)
        const contentsFromNote = rssContent.entries?.map((content) => {
            const entry: WhatsNewContent = {
                source: 'Note',
                is_external: true,
                url: content.link || '',
                title: content.title,
                date: content.published?.toString(),
            }
            return entry
        })
        return contentsFromNote || []
    }
}

export default NoteTask