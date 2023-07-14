import { MetadataRoute } from 'next'
import getWhatsNew from "../utils/getWhatsNew"
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapElements = [
        {
            url: 'https://kuropen.org',
            lastModified: new Date(),
        },
        {
            url: 'https://kuropen.org/pgn-archives',
            lastModified: new Date(),
        },
        {
            url: 'https://kuropen.org/pc',
            lastModified: new Date(),
        },
        {
            url: 'https://kuropen.org/privacy',
            lastModified: new Date(),
        },
    ]

    const archiveContents = await getWhatsNew()
    archiveContents.filter((content) => content.source === 'PGN-CMS').forEach((content) => {
        sitemapElements.push({
            url: `https://kuropen.org/pgn-archives/${content.url}`,
            lastModified: content.date ? new Date(content.date) : new Date(),
        })
    })

    return sitemapElements
}