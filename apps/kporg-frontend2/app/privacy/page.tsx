/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: CC-BY-NC-SA-4.0
 */

import { redirect } from "next/navigation"

export default function PrivacyPage() {
    redirect(`${process.env.NEW_SITE_HOST}/privacy`);
}