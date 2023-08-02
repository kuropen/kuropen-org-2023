/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: CC0-1.0
 */

interface Nip05 {
    names: {
        [K: string]: string
    }
}

export async function GET() {
    if (!process.env.NOSTR_PUBLIC_KEY_HEX) {
        return new Response("Not found.", {
            status: 404,
        })
    }
    const nip05Response: Nip05 = {
        names: {
            "_": process.env.NOSTR_PUBLIC_KEY_HEX,
            "kuropen": process.env.NOSTR_PUBLIC_KEY_HEX,
        }
    }
    return new Response(JSON.stringify(nip05Response), {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
    })
}
