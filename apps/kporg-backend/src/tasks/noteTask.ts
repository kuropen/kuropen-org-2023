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