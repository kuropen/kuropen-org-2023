/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import type { FetchApiParams, FilterConditions, StrapiResult } from "../../../../packages/kporg-types"
import * as qs from "qs"

/**
 * Parameters for GetPgnCmsContent
 */
interface GetPgnCmsContentParams {
    /**
     * Slug of target article
     */
    slug: string
}

/**
 * Fetching single article from Penguinone CMS (Strapi)
 * @param param0 See GetPgnCmsContentParams
 * @returns Article Data (null if not found)
 */
export default async function ({ slug }: GetPgnCmsContentParams) {
    const API_URL = `${import.meta.env.PGN_CMS_HOST}/api/posts`
    const requestUrl = new URL(API_URL)

    const filterConditions: FilterConditions = {
        slug: {
            $eq: slug,
        },
    }

    const apiParams: FetchApiParams = {
        filters: filterConditions,
    }

    requestUrl.search = qs.stringify(apiParams, {
        encodeValuesOnly: true,
    })

    const apiResponse = await fetch(requestUrl.toString())

    const {data}: StrapiResult = await apiResponse.json()
    if (data.length > 0) {
        return data
    }
    return null
}
