/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import useSWR from 'swr'

import type { WhatsNewContent } from '../../../../packages/kporg-types'
import getWhatsNew from '../utils/getWhatsNew'
import {format} from 'date-fns'

interface ArticleListProps {
    /**
     * Data fetched by Page component of Astro during SSG process.
     * This is to be refreshed by SWR when the component is running on browser.
     */
    articles?: WhatsNewContent[]
}

export default function ArticleList ({articles}: ArticleListProps) {
    const { data, error, isLoading } = useSWR('/whatsnew', getWhatsNew)

    let articlesList = articles

    if (!error && !isLoading && data) {
        console.info('Article list updated by the client.')
        articlesList = data
    }

    if (!articlesList) {
        let message = '表示できる記事がありません。'
        if (error) {
            message = '記事一覧を読み込めませんでした。'
        } else if (isLoading) {
            message = '記事一覧を読み込み中です。';
        }
        console.warn(`Client-side article list update status: ${message}`)
        return (<div>{message}</div>)
    }

    return (
        <ul>
            {
                articlesList.map((article) => {
                    const targetUrl = article.source === 'PGN-CMS' ? `/pgn-archives/${article.url}` : article.url
                    const targetWindow = article.source === 'PGN-CMS' ? '_self' : '_blank'
                    const articleDate = article.date ? new Date(article.date) : new Date()
                    return (
                        <li key={article.url}>
                            <a href={targetUrl} target={targetWindow} className="block border rounded-lg shadow-lg my-2 p-4 hover:bg-indigo-200">
                                <p className="text-lg">{article.title}</p>
                                <aside>
                                    <ul>
                                        <li>{format(articleDate, 'yyyy/MM/dd')}</li>
                                        {
                                            article.source !== 'PGN-CMS' ? (
                                                <li>{article.source}に投稿</li>
                                            ) : (<></>)
                                        }
                                    </ul>
                                </aside>
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}