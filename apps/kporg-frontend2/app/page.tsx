import React from 'react'
import FrontPageSection from './frontPageSection'
import { BriefcaseIcon, MapPinIcon, AcademicCapIcon, ArrowsRightLeftIcon, CommandLineIcon } from '@heroicons/react/24/outline'
import { SiFacebook, SiInstagram, SiMisskey, SiMastodon } from '@icons-pack/react-simple-icons'
import './frontpage.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FrontPageSection title="Who I am">
          <dl>
            <dt><BriefcaseIcon className="h-6 w-6" /><span className="sr-only">Occupation</span></dt>
            <dd>Web Engineer</dd>
          </dl>
          <dl>
            <dt><CommandLineIcon className="h-6 w-6" /><span className="sr-only">Speciality</span></dt>
            <dd className="speciality-list">
              <ul>
                  <li>PHP</li>
                  <li>JavaScript</li>
                  <li>TypeScript</li>
              </ul>
            </dd>
          </dl>
          <dl>
              <dt>
                  <MapPinIcon className="w-6 h-6" /><span className="sr-only">Location</span>
              </dt>
              <dd>Japan: Saitama 
                  <ArrowsRightLeftIcon className="w-4 h-4 inline" /><span className="sr-only">and</span>
                  Aizu-Wakamatsu</dd>
          </dl>
          <dl>
              <dt>
                  <AcademicCapIcon className="w-6 h-6" /><span className="sr-only">Alma mater</span>
              </dt>
              <dd>The University of Aizu, Aizu-Wakamatsu, Japan</dd>
          </dl>
        </FrontPageSection>
        <FrontPageSection title="Social">
          <div className="flex flex-col gap-2">
            <a href="https://mi.kuropen.org/@kuropen" target="_blank" rel="noopener noreferrer me" className="social-btn misskey">
              <SiMisskey className="w-6 h-6" />
              <span>Misskey (MICROPEN)</span>
            </a>
            <div>
              <a href="https://fedibird.com/@kuropen" target="_blank" rel="noopener noreferrer me" className="social-btn mastodon">
                <SiMastodon className="w-6 h-6" />
                <span>Mastodon (Fedibird) *</span>
              </a>
              <p className="mt-1 text-right text-xs text-gray-500">* Used when MICROPEN becomes unavailable</p>
            </div>
            <a href="https://site-api.kuropen.org/fb" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
              <SiFacebook className="w-6 h-6" />
              <span>Facebook</span>
            </a>
            <a href="https://www.instagram.com/kuropen/" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
              <SiInstagram className="w-6 h-6" />
              <span>Instagram &amp; Threads</span>
            </a>
            <p className="text-xs text-gray-500">Twitter is no longer linked here because you must login to show user profile.</p>
          </div>
        </FrontPageSection>
        <FrontPageSection title="Personal Projects">
        <div className="flex flex-col gap-2">
          <a href="https://mi.kuropen.org/" target="_blank" rel="noopener noreferrer" className="btn">
            <span>MICROPEN Misskey Server</span>
          </a>
          <a href="https://akabe.co/" target="_blank" rel="noopener noreferrer" className="btn">
            <span>Gain the Power from Akabeko</span>
          </a>
          <a href="https://status.kuropen.org/" target="_blank" rel="noopener noreferrer" className="btn">
            <span>Service Status</span>
          </a>
        </div>
        </FrontPageSection>
        <FrontPageSection title="Literature">
          <Link href="/pgn-archives" className="btn">
            <span>List of articles (in Japanese)</span>
          </Link>
        </FrontPageSection>
      </div>
    </main>
  )
}
