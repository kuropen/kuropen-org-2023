/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React, { useEffect, useState } from "react"
import { ClipboardDocumentListIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline"

interface ClipboardButtonProps {
    text: string
}

/**
 * Duration to show "copy done" image
 */
const COPY_DONE_SHOW_DURATION = 3000 as const

/**
 * Clipboard button (React Component)
 * @returns React Component
 */
export default function ({text}: ClipboardButtonProps) {
    const [isCopied, setCopiedStatus] = useState(false)
    const [isReady, setReadyStatus] = useState(false)

    useEffect(() => {
        if (!!navigator && !!navigator.clipboard) {
            setReadyStatus(true)
        }
        return () => {
            setReadyStatus(false)
        }
    })

    if (isReady) {
        const doCopy = async () => {
            await navigator.clipboard.writeText(text)
            setCopiedStatus(true)
            setTimeout(() => setCopiedStatus(false), COPY_DONE_SHOW_DURATION)
        }

        if (isCopied) {
            return (
                <div>
                    <button title="コピーしました">
                        <ClipboardDocumentCheckIcon className="w-6 h-6" />
                    </button>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={doCopy} title="アカウント名をコピーします">
                        <ClipboardDocumentListIcon className="w-6 h-6" />
                    </button>
                </div>
            )
        }
    } else {
        return <React.Fragment />
    }
}