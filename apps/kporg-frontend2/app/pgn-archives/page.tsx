/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: CC-BY-NC-SA-4.0
 */

import getWhatsNew from "../../utils/getWhatsNew"
import Link from "next/link"
import FrontPageSection from "../frontPageSection"
import { CalendarIcon, GlobeAltIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import DateView from "./dateView"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Literature - Kuropen',
}

export default async function PgnArchivesPage() {
    const contents = await getWhatsNew()

    return (
        <main>
            <nav className="border rounded-md p-2 mb-4"><Link href="/">Home</Link> / Literature</nav>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FrontPageSection title="Literature">
                    <div className="flex flex-col gap-2">
                        {contents.map((content) => (
                            <div key={content.url} className="border rounded-md p-2 mb-4">
                                {content.source === 'PGN-CMS' ? (
                                    <Link href={`/pgn-archives/${content.url}`}>
                                        <p className="text-xl">{content.title}</p>
                                        <aside className="flex flex-row gap-2">
                                            <dl className="flex flex-row gap-1">
                                                <dt><CalendarIcon className="w-6 h-6" /><span className="sr-only">Date</span></dt>
                                                <dd><DateView date={content.date} /></dd>
                                            </dl>
                                        </aside>
                                    </Link>
                                ) : (
                                    <a className="flex flex-row gap-1 content-center" href={content.url} target="_blank" rel="noopener noreferrer">
                                        <div className="flex-grow">
                                            <p className="text-xl">{content.title}</p>
                                            <aside className="flex flex-row gap-2">
                                                <dl className="flex flex-row gap-1">
                                                    <dt><CalendarIcon className="w-6 h-6" /><span className="sr-only">Date:</span></dt>
                                                    <dd><DateView date={content.date} /></dd>
                                                    <dt><GlobeAltIcon className="w-6 h-6" /><span className="sr-only">Site posted to:</span></dt>
                                                    <dd>{content.source}</dd>
                                                </dl>
                                            </aside>
                                        </div>
                                        <ArrowTopRightOnSquareIcon className="w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </FrontPageSection>
            </div>
        </main>
    )
}
