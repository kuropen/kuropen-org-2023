/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

interface Env {
	PS_HOST?: string
	PS_USER?: string
	PS_PASSWORD?: string
	PGN_API_HOST?: string
	FB_URL?: string
	BLOG_BUCKET?: R2Bucket
}

export default Env
