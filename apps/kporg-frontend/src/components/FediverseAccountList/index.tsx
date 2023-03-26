/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React, { useState } from "react"
import FediverseAccounts from "../../utils/FediverseAccounts"
import ClipboardButton from "./ClipboardButton"
import MisskeyIcon from '../../assets/misskey.png'
import './listStyle.css'

interface AccountListProps {
    showDetails?: boolean
}

function getSystemIcon(serverSystem: string) {
    switch(serverSystem) {
        case 'Misskey':
            return (<img src={MisskeyIcon} className="w-8" alt="Misskey" />)
        case 'Mastodon':
            return (<div className="mastodon w-8 fill-current">
                <div className="sr-only">Mastodon</div>
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg>
            </div>)
        default:
            return <React.Fragment />
    }
}

/**
 * Fediverse Account List (React Component)
 * @returns React Component
 */
export default function ({showDetails}: AccountListProps) {
    const [isInactiveShown, setShowInactive] = useState(false)

    return (
        <div className="my-2">
            {showDetails ? (
                <div className="flex flex-row gap-2 items-center">
                <label>
                    <input type="checkbox" onChange={(event) => setShowInactive(event.target.checked)} className="mr-2" />
                    現在運用されていないアカウントも表示する
                </label>
            </div>
            ) : <React.Fragment />}
            <div>
                {
                    FediverseAccounts
                    .getAccounts({isActive: !isInactiveShown})
                    .map(({serverName, serverSystem, accountId, isActive, link, remarks, linkTo}) => {
                        const dlClasses = ['my-2', 'flex', 'flex-row']
                        if (!isActive) {
                            dlClasses.push('text-gray-500')
                        }
                        return (
                            <dl className={dlClasses.join(' ')} key={accountId}>
                                <dt>{getSystemIcon(serverSystem)}</dt>
                                <dd>
                                    <ul>
                                        {showDetails ? (<li>{serverName}</li>) : <React.Fragment />}
                                        <li><div className="flex flex-row gap-1">
                                            <p>
                                                {link ? <a href={linkTo} target="_blank" className="underline">{accountId}</a> : accountId}
                                            </p>
                                            { isActive ? <ClipboardButton text={accountId} /> : <React.Fragment /> }
                                        </div></li>
                                        {showDetails ? (<li>{remarks}</li>) : <React.Fragment />}
                                    </ul>
                                </dd>
                            </dl>
                        )
                    })
                }
            </div>
        </div>
    )
}
