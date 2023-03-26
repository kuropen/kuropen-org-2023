/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { WhatsNewContent, WhatsNewContentOnDatabase } from "../../../../packages/kporg-types"
import { format } from "date-fns"

function generateQueryParam(content: WhatsNewContent): WhatsNewContentOnDatabase {
    let dateString: string | undefined
    
    if (content.date) {
        dateString = format(new Date(content.date), 'yyyy-MM-dd HH:mm:ss')
    }

    const param: WhatsNewContentOnDatabase = {
        ...content,
        date: dateString,
        is_external: (content.is_external ? 1 : 0)
    }
    return param
}

export default generateQueryParam
