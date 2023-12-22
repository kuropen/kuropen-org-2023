/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: CC-BY-NC-SA-4.0
 */

import getWhatsNew from "../../../utils/getWhatsNew"
import getPgnCmsContent from "../../../utils/getPgnCmsContent"
import Link from "next/link"
import { CalendarIcon } from '@heroicons/react/24/outline'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import DateView from "../dateView"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

type PgnArchivesDetailPageProps = {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PgnArchivesDetailPageProps): Promise<Metadata> {
    const contentArray = await getPgnCmsContent({slug: params.slug || ''})
    if (!contentArray) {
        notFound()
    }
    const content = contentArray[0]
    return {
        title: `${content.attributes.title} - Kuropen`,
        openGraph: {
            title: content.attributes.title,
            type: 'article',
            publishedTime: content.attributes.publishedAt,
            modifiedTime: content.attributes.updatedAt,
            url: `https://2023.kuropen.org/pgn-archives/${content.attributes.slug}`,
        }
    }
}

export default async function PgnArchivesDetailPage({ params }: PgnArchivesDetailPageProps) {
    // Redirect to corresponding page on new site if exists
    const newUrl = `${process.env.NEW_SITE_HOST}/pgn-archives/${params.slug}/`
    try {
        const newResponse = await fetch(newUrl, {method: 'HEAD', redirect: 'error'})
        if (newResponse.ok) {
            redirect(newUrl)
        }
    } catch (e) {
        // Nothing to do after redirect error
    }

    const contentArray = await getPgnCmsContent({slug: params.slug || ''})
    if (!contentArray) {
        notFound()
    }
    const content = contentArray[0]
    const mdContent = (await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(content.attributes.body)).value

    return (
        <main>
            <nav className="border rounded-md p-2 mb-4"><Link href="/">Home</Link> / <Link href="/pgn-archives/">Literature</Link> / {content.attributes.title}</nav>
            <div>
                <aside className="bg-yellow-300 text-gray-900 border rounded-md p-2 mb-4 text-xl">
                    このコンテンツは、2024年2月3日をもちまして公開を終了いたします。<br />
                    This contents will be closed on 3rd Feb 2024.
                </aside>
                <h2 className="text-xl">{content.attributes.title}</h2>
                <aside className="flex flex-row gap-2 mb-4">
                    <dl className="flex flex-row gap-1">
                        <dt><CalendarIcon className="w-6 h-6" /><span className="sr-only">Date</span></dt>
                        <dd><DateView date={content.attributes.date} /></dd>
                    </dl>
                </aside>
                <div className="border rounded-md p-2 dark:bg-gray-100">
                    <div className="prose" dangerouslySetInnerHTML={{__html: mdContent.toString()}}></div>
                </div>
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const list = await getWhatsNew({source: 'PGN-CMS'})
    return list.map((element) => {
        const pathDef = {
            slug: element.url
        }
        return pathDef
    })
}
