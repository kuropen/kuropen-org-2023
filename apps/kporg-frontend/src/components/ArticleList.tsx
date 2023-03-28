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

    let articlesList: WhatsNewContent[] | undefined

    if (error) {
        return (<div>記事一覧を読み込めませんでした。</div>)
    } else if (isLoading) {
        if (articles) {
            articlesList = articles
        } else {
            return (<div>記事一覧を読み込み中です。</div>)
        }
    } else {
        articlesList = data
    }

    if (!articlesList) {
        return (<div>表示できる記事がありません。</div>)
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