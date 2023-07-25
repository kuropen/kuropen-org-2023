/*
 * SPDX-FileCopyrightText: 2023 Kuropen <hy-kuropen@eternie-labs.net>
 * SPDX-License-Identifier: CC-BY-NC-SA-4.0
 */

import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_JP, Orbitron } from 'next/font/google'
import Image from 'next/image'
import penguinImage from './penguin.png'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/react'

const noto = Noto_Sans_JP({weight: ['400', '700'], subsets: ['latin']})
const orbitron = Orbitron({weight: '700', subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Kuropen',
  description: 'Kuropen.org is personal site of Kuropen.',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://kuropen.org/',
    title: 'Kuropen',
    description: 'Kuropen.org is personal site of Kuropen.',
  },
  twitter: {
    creator: '@kuropen_aizu',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={noto.className}>
        <div className="min-h-full">
          <div className="flex flex-col items-center justify-between p-4 md:p-24">
            <header className="mt-4 md:mt-0 mb-24">
              <Link href="/" className="flex flex-row items-center justify-center gap-4">
                <Image src={penguinImage} alt="" className="w-20 rounded-full" role="none" />
                <h1 className={['text-3xl', orbitron.className].join(' ')}>Kuropen</h1>
              </Link>
            </header>
            {children}
          </div>
          <footer className="p-4 mt-4 text-center">
            <p className="text-sm">
              Copyright &copy; 2018-2023 Kuropen. Licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" rel="license">CC-BY-NC-SA-4.0</a>.<br />
              Powered by <a href="https://nextjs.org/">Next.js</a>, <a href="https://tailwindcss.com/">Tailwind CSS</a>, <a href="https://heroicons.com/">Heroicons</a>, <a href="https://simpleicons.org/">Simple Icons</a>.
            </p>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
