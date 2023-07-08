import Link from "next/link"

export default function PrivacyPage() {
    return (
        <main>
            <nav className="border rounded-md p-2 mb-4"><Link href="/">Home</Link> / Literature</nav>
            <div>
                <h2 className="text-xl">Privacy Policy</h2>
                <div className="border rounded-md p-2 dark:bg-gray-100">
                <div className="prose">
                        <p>Scroll down for English.</p>
                        <h2 id="プライバシーポリシー">プライバシーポリシー</h2>
                        <p>2023年7月8日現在の情報を記載しています。
                            プライバシーポリシーに掲載している状況は、サイトの機能追加やコンテンツの状態によって変動する可能性がありますので、常に最新の情報をご確認いただくことをおすすめ致します。</p>
                        <h3 id="広告に関する開示事項">広告に関する開示事項</h3>
                        <ul>
                            <li>当サイトは<a href="https://publishers.basicattentiontoken.org/?locale=ja">Brave Rewards</a>に参加しています。<a href="https://brave.com/ja/">Brave</a>ブラウザをご利用のユーザー様におかれましては、ブラウザの機能により、当サイトの閲覧時間に応じてまたはユーザー様の任意の操作により、暗号通貨 Basic Attention TokenによるKuropenに対しての送金が行われ、または広告が表示される場合がありますが、これらの機能はユーザー様の属性・サイトの閲覧履歴その他の個人情報を収集するものではありません。</li>
                            <li>記事に関連する商品を紹介する目的で、通信販売サイトへのリンクを設置する場合があります。この場合はリンク先の事業者を明示することとします。閲覧者はリンクをクリックすることにより、当該事業者にアクセス元IPアドレスや、当サイトから当該事業者ウェブサイトに遷移したことなどの情報が送信され、その取り扱いは当該事業者のプライバシーポリシーに従うことに同意したものと見なします。</li>
                        </ul>
                        <h3 id="アクセス解析に関する開示事項">アクセス解析に関する開示事項</h3>
                        <ul>
                            <li>当サイトはアクセス解析システムとして、<a href="https://vercel.com/docs/concepts/analytics">Vercel Web Analytics</a>を採用しています。
                                <ul>
                                    <li>KuropenはWebサイト設計の参考とするため、このシステムを通じて、閲覧者の居住国、直前に閲覧していたページのドメイン名、使用したOSならびにブラウザの名称、
                                        デバイスの種類（デスクトップかモバイルか）を収集します。なお、このシステムはCookieには依存せず、また、閲覧者のIPアドレス等個人の特定に直接結びつく情報は把握できません。</li>
                                    <li>データの取り扱いの詳細は、<a href="https://vercel.com/legal/privacy-policy">Vercelのプライバシーポリシー</a>をご確認ください。</li>
                                </ul>
                            </li>
                            <li>アクセス解析は、閲覧者がBrave等のプライバシーブラウザを用いることで無効化することができ、これがため利用者は何等の不利益を受けることはありません。</li>
                        </ul>
                        <h3 id="webフォントに関する開示事項">Webフォントに関する開示事項</h3>
                        <ul>
                            <li>当サイトのWebフォントは<a href="https://fonts.google.com/">Google Fonts</a>を使用しています。このサービスは<a href="https://www.google.com/">Google</a>を通じて提供されており、Googleはこのサービスを通じて個人情報の収集をする可能性があります。</li>
                        </ul>
                        <h3 id="cookieに関する開示事項">Cookieに関する開示事項</h3>
                        <ul>
                            <li>当サイトの閲覧・利用に関して必須となるCookieはありません。</li>
                        </ul>
                        <hr />
                            <h2 id="privacy-policy">Privacy Policy</h2>
                            <p>This document is as of July 8, 2023.</p>
                            <p>Information on Privacy Policy is subject to change following function addition of website and the status of contents.
                                I recommend you to check the newest information.</p>
                            <h3 id="disclosure-about-advertisement">Disclosure about advertisement</h3>
                            <ul>
                                <li>This site is <a href="https://publishers.basicattentiontoken.org/">Brave Rewards</a> publisher. If you are using <a href="https://brave.com/ja/">Brave</a>, as a function of the browser, Cryptocurrency “Basic Attention Token” (BAT) may be sent to Kuropen according to the visiting time or your operation. This function does not collect your personal information.</li>
                                <li>Pages on this website may have link(s) to e-commerce website for purpose to introduce product(s) that is/are mentioned in an article. Before clicking such link, you should agree that your information, such as IP address and the fact that you reach to such website from this website, are sent to the merchant, and these are handled according to their privacy policy.</li>
                            </ul>
                            <h3 id="disclosure-about-analytics">Disclosure about analytics</h3>
                            <ul>
                                <li>This website is deployed with <a href="https://vercel.com/docs/concepts/analytics">Vercel Web Analytics</a>.
                                    <ul>
                                        <li>For reference in website design, I collect following user data: your country name, the domain name of the referrer, your OS and browser name,
                                            the type of the device (desktop, mobile). This system does not require cookies and not collect personal identification information such as IP address.</li>
                                        <li>Please refer to <a href="https://vercel.com/legal/privacy-policy">Vercel’s privacy policy</a> for the detail of data handling.</li>
                                    </ul>
                                </li>
                                <li>You can block analytics with privacy browsers such as Brave. You will have no side-effect for doing so.</li>
                            </ul>
                            <h3 id="disclosure-about-web-font">Disclosure about Web font</h3>
                            <ul>
                                <li>The web fonts on this website are provided by <a href="https://fonts.google.com/">Google Fonts</a>. This service is provided by <a href="https://www.google.com/">Google</a> which may collect personal information through this service.</li>
                            </ul>
                            <h3 id="disclosure-about-cookie-or-other-local-storage">Disclosure about cookie or other local storage</h3>
                            <ul>
                                <li>This website does not need any Cookie functionality.</li>
                            </ul>
        </div>
                </div>
            </div>
        </main>
    )
}