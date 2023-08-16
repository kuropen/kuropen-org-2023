/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: BUSL-1.1
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
