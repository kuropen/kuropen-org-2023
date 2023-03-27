import type {OgpData} from "../ogpDataProps"

interface OgpMetaProp {
    property: string
    content: string
}

export default function generateOgpMeta(og: OgpData): OgpMetaProp[] {
    const props: OgpMetaProp[] = [
        {
            property: 'og:url',
            content: og.url,
        },
        {
            property: 'og:type',
            content: og.type,
        },
        {
            property: 'og:title',
            content: og.title,
        },
        {
            property: 'og:site_name',
            content: og.siteName,
        }
    ]
    if (og.description) {
        props.push({
            property: 'og:description',
            content: og.description,
        })
    }
    if (og.image) {
        props.push({
            property: 'og:image',
            content: og.image,
        })
    }
    return props
}
