/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: MPL-2.0
 */

import { WhatsNewContent } from "../../../../packages/kporg-types"
import { extract } from '@extractus/feed-extractor'
import { CrawlTask } from "../@types"

const NOTE_RSS_URL = 'https://note.com/penguinote/rss' as const

class NoteTask implements CrawlTask {
    async crawl(): Promise<WhatsNewContent[]> {
        const rssContent = await extract(NOTE_RSS_URL)
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