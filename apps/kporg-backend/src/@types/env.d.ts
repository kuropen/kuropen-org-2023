/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: BUSL-1.1
 */

interface Env {
	PS_HOST?: string
	PS_USER?: string
	PS_PASSWORD?: string
	PGN_API_HOST?: string
	FB_URL?: string
	BLOG_BUCKET?: R2Bucket
	DB?: D1Database
	REFRESH_WEBHOOK_URL?: string
}

export default Env
