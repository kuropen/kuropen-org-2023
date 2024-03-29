/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: BUSL-1.1
 */

import { MetadataRoute } from 'next'
import getWhatsNew from "../utils/getWhatsNew"
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapElements = [
        {
            url: 'https://2023.kuropen.org/pgn-archives',
            lastModified: new Date(),
        },
    ]

    const archiveContents = await getWhatsNew()
    archiveContents.filter((content) => content.source === 'PGN-CMS').forEach((content) => {
        sitemapElements.push({
            url: `https://2023.kuropen.org/pgn-archives/${content.url}`,
            lastModified: content.date ? new Date(content.date) : new Date(),
        })
    })

    return sitemapElements
}