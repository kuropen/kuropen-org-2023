import WhatsNewContent from "@kuropen/kporg-types"

interface CrawlTask {
    async crawl(): Promise<WhatsNewContent[]>
}

export {
    CrawlTask,
}
