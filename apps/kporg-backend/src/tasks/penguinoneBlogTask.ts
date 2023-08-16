/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: BUSL-1.1
 */

import { WhatsNewContent } from "../../../../packages/kporg-types"
import { CrawlTask } from "../@types"

type Toc = {
    slug: string
    title: string
    date: string
}[]

class PenguinoneBlogTask implements CrawlTask {
    private bucket?: R2Bucket

    constructor(bucket?: R2Bucket) {
        this.bucket = bucket
    }

    async crawl(): Promise<WhatsNewContent[]> {
        if (!this.bucket) {
            return []
        }

        const tocObject = await this.bucket.get("toc.json")
        if (tocObject === null) {
            console.error("toc.json not found.")
            return []
        }

        const toc: Toc = await tocObject.json()
        return toc.map((element) => {
            const entry: WhatsNewContent = {
                is_external: false,
                source: 'PGN-CMS',
                url: element.slug,
                ...element
            }
            return entry
        })
    }
}

export default PenguinoneBlogTask
