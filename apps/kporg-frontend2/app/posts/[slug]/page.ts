/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: CC0-1.0
 */

import { redirect } from 'next/navigation'

type OldPageEndpointProps = {
    params: {
        slug: string
    }
}

export default async function OldPageEndpoint({ params }: OldPageEndpointProps) {
    redirect(`/pgn-archives/${params.slug}`)
}
