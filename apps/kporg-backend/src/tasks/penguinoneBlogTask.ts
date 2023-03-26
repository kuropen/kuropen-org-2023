/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
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
            throw new Error("toc.json Not Found.")
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
