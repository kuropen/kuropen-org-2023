/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: CC0-1.0
 */

interface FrontPageSectionProps {
    children: React.ReactNode;
    title: string;
}

export default function FrontPageSection({ children, title }: FrontPageSectionProps) {
    return (
        <>
            <h2 className="text-2xl font-bold md:text-right md:mb-4">{title}</h2>
            <div className="md:col-span-2 mb-4">
                {children}
            </div>
        </>
    )
}
