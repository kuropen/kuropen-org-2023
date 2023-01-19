import { WhatsNewContent, WhatsNewContentOnDatabase } from "../@types"
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
