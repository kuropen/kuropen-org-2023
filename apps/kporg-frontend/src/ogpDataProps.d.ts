type OgpType = 'website' | 'article'

interface OgpData {
    url: string
    type: OgpType
    title: string
    description?: string
    siteName: string
    image?: string
}

// Because value for url property can be obtained through Astro.url,
// it is not needed to be given as parameter
type OgpDataAsParameter = Omit<OgpData, "url" | "title" | "siteName"> & Partial<Pick<OgpData, "url" | "title" | "siteName">>

export {
    OgpData,
    OgpDataAsParameter,
}
