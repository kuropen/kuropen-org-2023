/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as qs from "qs"
import type { WhatsNewContent, WhatsNewListSelectOptions } from "@kuropen/kporg-types"

/**
 * Fetching article list from "What's New" backend API
 * @param params designation of limit and offset
 * @returns Article List
 */
export default async function (params: WhatsNewListSelectOptions = {}) {
    const API_URL = `${import.meta.env.PUBLIC_BACKEND_HOST}/whatsnew`
    const requestUrl = new URL(API_URL)
    requestUrl.search = qs.stringify(params, {
        encodeValuesOnly: true
    })
    const apiResponse = await fetch(requestUrl)
    const result: WhatsNewContent[] = await apiResponse.json()
    return result
}
