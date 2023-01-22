/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

type Source = 'PGN-CMS' | 'Note'

interface WhatsNewContent {
    source: Source
    title?: string
    date?: string
    is_external: boolean
    url: string
}

type WhatsNewContentOnDatabase = Omit<WhatsNewContent, "is_external"> | {
    is_external: 0 | 1
}

type PenguinonePostAttribute = {
    title: string
    slug: string
    date: string
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

type StrapiData<T extends Partial<PenguinonePostAttribute> = PenguinonePostAttribute> = {
    id: number
    attributes: T
}

type StrapiPagination = {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

type StrapiMeta = {
    pagination: StrapiPagination
}

type StrapiResult = {
    data: Array<StrapiData>
    meta: StrapiMeta
}

type FetchDataParams = {
    slug?: string
    page?: number
    limit?: number
    fields?: string[]
}

type FetchDataResult = {
    allData: StrapiData[]
    hasNextPage: boolean
}

type PaginationParams = {
    page?: number
    pageSize?: number
    withCount?: boolean
}

type FilterConditions = {
    slug?: {
        $eq: string
    }
    date?: {
        $lte: string
    }
    // conditions for other parameters and other operators should be written on-demand
}

type FetchApiParams = {
    filters?: FilterConditions
    sort?: string[]
    pagination?: PaginationParams
    fields?: string[]
}

type WhatsNewListSelectOptions = {
    limit?: number | null
    offset?: number | null
    source?: Source
}

export {
    WhatsNewContent,
    WhatsNewContentOnDatabase,
    FetchApiParams,
    FilterConditions,
    StrapiData,
    PaginationParams,
    StrapiResult,
    WhatsNewListSelectOptions,
}
