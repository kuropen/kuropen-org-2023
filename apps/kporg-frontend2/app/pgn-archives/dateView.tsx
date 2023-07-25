/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: CC0-1.0
 */

import {format} from 'date-fns'

interface DateViewProps {
    date?: string;
}

export default function DateView({ date }: DateViewProps) {
    const dateObject = new Date(date || '');
    return (<>{format(dateObject, 'yyyy/MM/dd')}</>);
}
