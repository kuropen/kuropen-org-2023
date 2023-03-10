/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { FetchApiParams, FilterConditions, PaginationParams, StrapiData, StrapiResult, WhatsNewContent } from "@kuropen/kporg-types";
import * as qs from "qs"
import { CrawlTask } from "../@types";

class PenguinoneCmsTask implements CrawlTask {
    private apiHost: string

    constructor(apiHost: string) {
        this.apiHost = apiHost
    }

    async crawl(): Promise<WhatsNewContent[]> {
        if (!this.apiHost) {
            throw new Error("API Host variable is not set yet.")
        }

        const API_URL = this.apiHost + '/api/posts'
        const requestUrl = new URL(API_URL)

        let allData: StrapiData[] = []

        let page = 1
        let hasNextPage = true
        let paginationParam: PaginationParams = {
            pageSize: 100,
        }
        let shouldPaginate = true

        const filterConditions: FilterConditions = {
            date: {
                $lte: new Date().toISOString()
            }
        }

        do {
            paginationParam.page = page
    
            const apiParams: FetchApiParams = {
                filters: filterConditions,
                pagination: paginationParam,
            }
    
            requestUrl.search = qs.stringify(apiParams, {
                encodeValuesOnly: true,
            })
            const apiResponse = await fetch(requestUrl.toString())
    
            try {
                const result: StrapiResult = await apiResponse.json()
                allData = allData.concat(result.data)
    
                hasNextPage = (result.meta.pagination.pageCount > page)
                page++
            } catch (e: any) {
                throw new Error("Communication error with strapi: " + e)
            }
        } while (shouldPaginate && hasNextPage)

        return allData.map((data) => {
            const entry: WhatsNewContent = {
                source: 'PGN-CMS',
                is_external: false,
                url: data.attributes.slug,
                title: data.attributes.title,
                date: data.attributes.date,
            }
            return entry
        })
    }

}

export default PenguinoneCmsTask
