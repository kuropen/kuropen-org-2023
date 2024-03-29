/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: BUSL-1.1
 */

import Env from "../@types/env"
import { StrapiData, StrapiResult } from "../../../../packages/kporg-types"
import matter from 'gray-matter'
import { Buffer } from "buffer"

async function getPgnArchiveDoc(env: Env, query: URLSearchParams) {
    // see the definition of FilterCondition
    const slug = query.get('filters[slug][$eq]')
    let postData: StrapiData | undefined

    // @ts-ignore
    globalThis.Buffer = Buffer

    if (slug) {
        const mdObject = await env.BLOG_BUCKET?.get(`${slug}.md`)
        const mdContent = await mdObject?.text()
        if (mdContent) {
            const mdStruct = matter(mdContent)
            postData = {
                id: 0,
                attributes: {
                    body: mdStruct.content,
                    slug: slug,
                    date: mdStruct.data.date,
                    title: mdStruct.data.title,
                    createdAt: mdStruct.data.date,
                    publishedAt: mdStruct.data.date,
                    updatedAt: mdStruct.data.date,
                },
            }
        }
    }
    const result: StrapiResult = {
        data: postData ? [postData] : [],
        meta: {
            pagination: {
                page: 1,
                pageCount: 1,
                pageSize: 1,
                total: postData ? 1 : 0,
            }
        }
    }
    return result
}

export default getPgnArchiveDoc
