/*!
 * Copyright (C) 2023 Kuropen.
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { useState } from "react"
import Accounts from '../../assets/accounts.json'
import './listStyle.css'

/**
 * Fediverse Account List (React Component)
 * @returns React Component
 */
export default function () {
    const [isInactiveShown, setShowInactive] = useState(false)

    return (
        <div className="my-2">
            <div className="p-2 mb-2 border rounded-lg shadow-lg bg-blue-200 md:hidden">
                この表は横スクロール可能です。
            </div>
            <div className="flex flex-row gap-2 items-center">
                <input type="checkbox" name="ShowInactiveCheck" onChange={(event) => setShowInactive(event.target.checked)} />
                <label htmlFor="ShowInactiveCheck">現在運用されていないアカウントも表示する</label>
            </div>
            <div className="overflow-x-auto whitespace-nowrap pb-2">
                <table className="account-list border-t border-b border-neutral-500">
                    <tr className="border-b-2 border-neutral-500">
                        <th>サーバー名</th>
                        <th>アカウント名</th>
                        <th>備考</th>
                    </tr>
                    {
                        Accounts
                            .filter(({isActive}) => isInactiveShown ? true : isActive)
                            .map(({serverName, serverSystem, accountId, isActive, link, remarks}) => {
                                const accountIdElements = (accountId.charAt(0) === '@' ? accountId.substring(1) : accountId)
                                    .split('@')
                                const linkTo = `https://${accountIdElements[1]}/@${accountIdElements[0]}`
                                return (
                                    <tr className={isActive ? '' : 'text-gray-500'} key={accountId}>
                                        <td>{serverName} ({serverSystem})</td>
                                        <td>
                                            <div className="flex flex-row">
                                                <p>
                                                    {link ? <a href={linkTo} target="_blank" className="underline">{accountId}</a> : accountId}
                                                </p>
                                            </div>
                                        </td>
                                        <td>{remarks}</td>
                                    </tr>
                                )
                        })
                    }
                </table>
            </div>
        </div>
    )
}
