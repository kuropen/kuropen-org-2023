import { redirect } from 'next/navigation'

type OldPageEndpointProps = {
    params: {
        slug: string
    }
}

export default async function OldPageEndpoint({ params }: OldPageEndpointProps) {
    redirect(`/pgn-archives/${params.slug}`)
}
