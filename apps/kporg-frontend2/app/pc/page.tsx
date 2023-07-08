import Link from "next/link"
import Image from 'next/image'
import PcImage2022 from "./pc-20230624.jpg"
import PcImage2020 from "./pc-20221116.jpg"
import FrontPageSection from "../frontPageSection"
import "./pc-page.css"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'DIY PC - Kuropen',
}

export default function PcPage() {
    return (
        <main>
            <nav className="border rounded-md p-2 mb-4"><Link href="/">Home</Link> / DIY PC</nav>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FrontPageSection title="DIY PC 2022">
                    <Image src={PcImage2022} alt="" className="w-auto md:max-w-xl" />
                    <dl className="speclist">
                        <dt>Purpose</dt>
                        <dd>Multi-purpose PC at home, Saitama</dd>
                        <dt>Case</dt>
                        <dd>
                            ASUS Prime AP201<br />
                            (Thermaltake S100 TG until June 2023)
                        </dd>
                        <dt>Motherboard</dt>
                        <dd>MSI MAG B660M BAZOOKA DDR4</dd>
                        <dt>CPU</dt>
                        <dd>Intel Core i5 12400F</dd>
                        <dt>RAM</dt>
                        <dd>Crucial DDR4-3200 16GBx2</dd>
                        <dt>SSD</dt>
                        <dd>Crucial P5 1TB + SAMSUNG 860 QVO 1TB</dd>
                        <dt>GPU</dt>
                        <dd>MSI GeForce RTX 3060 Ti VENTUS 2X 8GB OC</dd>
                        <dt>Power Supply</dt>
                        <dd>Kurouto-Shikou KRPW-GK750W/90+</dd>
                        <dt>CPU Cooler</dt>
                        <dd>DeepCool AK400</dd>
                        <dt>Case Fan</dt>
                        <dd>Fractal Design Aspect 12 RGB PWM x2 + ASUS buit-in</dd>
                    </dl>
                </FrontPageSection>
                <FrontPageSection title="DIY PC 2020">
                    <Image src={PcImage2020} alt="" className="w-auto md:max-w-xl" />
                    <dl className="speclist">
                        <dt>Purpose</dt>
                        <dd>
                            Multi-purpose PC + Folding@home at home, Saitama <br />
                            After DIY PC 2022 built: Gaming PC at parental home, Aizu-Wakamatsu
                        </dd>
                        <dt>Case</dt>
                        <dd>
                            Thermaltake S100 TG<br />
                            After DIY PC 2022 built: ABKONCORE CRONOS 350M
                        </dd>
                        <dt>Motherboard</dt>
                        <dd>ASRock B460M Pro4</dd>
                        <dt>CPU</dt>
                        <dd>Intel Core i3 10100F</dd>
                        <dt>RAM</dt>
                        <dd>Crucial DDR4-2666 8GBx4</dd>
                        <dt>SSD</dt>
                        <dd>KIOXIA EXCERIA 500GB</dd>
                        <dt>GPU</dt>
                        <dd>
                            MSI GeForce RTX 3060 Ti VENTUS 2X 8GB OC<br />
                            After DIY PC 2022 built: ASUS PH-GTX1660S-O6G
                        </dd>
                        <dt>Power Supply</dt>
                        <dd>Scythe Go-Tan 4 Plugin 700W</dd>
                        <dt>CPU Cooler</dt>
                        <dd>
                            CoolerMaster MasterLiquid ML240L V2<br />
                            After DIY PC 2022 built: Intel retail cooler
                        </dd>
                        <dt>Case Fan</dt>
                        <dd>
                            GELID Silent 14 PWM + Thermaltake buit-in<br />
                            After DIY PC 2022 built: Fractal Design Aspect 12 RGB PWM + ABKONCORE built-in
                        </dd>
                    </dl>
                </FrontPageSection>
            </div>
        </main>
    )
}