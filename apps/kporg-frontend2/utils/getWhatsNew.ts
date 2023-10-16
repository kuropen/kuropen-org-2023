/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: BUSL-1.1
 */

import * as qs from "qs"
import type { WhatsNewContent, WhatsNewListSelectOptions } from "../../../packages/kporg-types"

/**
 * Fetching article list from "What's New" backend API
 * @param params designation of limit and offset
 * @returns Article List
 */
export default async function (params: WhatsNewListSelectOptions = {}) {
    const API_URL = `${process.env.BACKEND_HOST}/whatsnew`
    const requestUrl = new URL(API_URL)
    requestUrl.search = qs.stringify(params, {
        encodeValuesOnly: true
    })
    const apiResponse = await fetch(requestUrl, { next: { revalidate: 600 } })
    const result: WhatsNewContent[] = await apiResponse.json()
    return result
}
