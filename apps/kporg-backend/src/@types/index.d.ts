/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: MPL-2.0
 */

import WhatsNewContent from "../../../packages/kporg-types"

interface CrawlTask {
    async crawl(): Promise<WhatsNewContent[]>
}

export {
    CrawlTask,
}
