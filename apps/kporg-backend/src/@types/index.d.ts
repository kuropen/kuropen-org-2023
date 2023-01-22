/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import WhatsNewContent from "@kuropen/kporg-types"

interface CrawlTask {
    async crawl(): Promise<WhatsNewContent[]>
}

export {
    CrawlTask,
}
