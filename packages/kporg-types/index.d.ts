/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: BUSL-1.1
 */

type Source = 'PGN-CMS' | 'Note'

interface WhatsNewContent {
    source: Source | string
    title?: string
    date?: string
    is_external: boolean
    url: string
}

type WhatsNewContentWithHash = WhatsNewContent & { hash: string }

type WhatsNewContentOnDatabase = Omit<WhatsNewContent, "is_external"> & {
    is_external: 0 | 1
} & Partial<Pick<WhatsNewContentWithHash, "hash">>

type PenguinonePostAttribute = {
    title: string
    slug: string
    date: string
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

type StrapiDataElement = PenguinonePostAttribute

type StrapiData<T extends Partial<StrapiDataElement> = PenguinonePostAttribute> = {
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

type StrapiResult<T extends Partial<StrapiDataElement> = PenguinonePostAttribute> = {
    data: Array<StrapiData<T>>
    meta: StrapiMeta
}

type FetchDataParams = {
    slug?: string
    page?: number
    limit?: number
    fields?: string[]
}

type FetchDataResult<T extends Partial<StrapiDataElement> = PenguinonePostAttribute> = {
    allData: StrapiData<T>[]
    hasNextPage: boolean
}

type PaginationParams = {
    page?: number
    pageSize?: number
    withCount?: boolean
}

type SingleFilterCondition = {
    [K in keyof StrapiDataElement | "id"]?: {
        $eq?: string | number
        $eqi?: string
        $ne?: string | number
        $lt?: string | number
        $lte?: string | number
        $gt?: string | number
        $gte?: string | number
        $in?: string[] | number[]
        $notIn?: string[] | number[]
        $contains?: string
        $notContains?: string
        $containsi?: string
        $notContainsi?: string
        $null?: boolean
        $notNull?: boolean
        $between?: string | number
        $startsWith?: string
        $startsWithi?: string
        $endsWith?: string
        $endsWithi?: string
    }
}

type FilterConditions = SingleFilterCondition | {
    $or?: SingleFilterCondition[]
    $and?: SingleFilterCondition[]
}

type FetchApiParams = {
    filters?: FilterConditions
    sort?: string[]
    pagination?: PaginationParams
    fields?: string[]
}

type WhatsNewListSelectOptions = {
    source?: Source
}

export {
    WhatsNewContent,
    WhatsNewContentOnDatabase,
    FetchApiParams,
    FilterConditions,
    SingleFilterCondition,
    StrapiData,
    PaginationParams,
    StrapiResult,
    WhatsNewListSelectOptions,
    WhatsNewContentWithHash,
}
