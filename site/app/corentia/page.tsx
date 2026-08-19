import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollEngine from "@/components/motion/ScrollEngine";
import Reveal from "@/components/motion/Reveal";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import SectionSurface from "@/components/SectionSurface";
import { CORENTIA_PAGE } from "@/lib/content";
import { CORENTIA, SITE } from "@/lib/site";
import { hasAsset } from "@/lib/assets";

/**
 * CORENTIA — ürün sayfası.
 *
 * KONUMLANDIRMA: Rodi Medya'nın kendi geliştirdiği yapay zekâ ürünü.
 * Meta → Instagram ilişkisi: ana marka ajans, bu onun ürünü.
 *
 * PALET: Ana sayfa amber-baskın; burası ink-baskın + Corentia mavisi.
 * Alt markaya girildiği anlaşılıyor ama header/footer aynı kaldığı için
 * aile bağı kopmuyor. Mavi (--color-corentia #2563EB) ink üzerinde
 * yalnızca ÇİZGİ ve İŞARET olarak kullanılıyor; metin olarak değil —
 * ink üzerinde 3.8:1 verir, AA metin eşiğini geçmez.
 *
 * ⚠️ FİYAT YOK (bkz. lib/content.ts CORENTIA_PAGE açıklaması).
 * ⚠️ Ekran görüntüsü YOK — kullanıcı istemedi (BRIEF §3.1).
 */

export const metadata: Metadata = {
  title: "Corentia — WhatsApp Yapay Zekâ Satış Asistanı",
  description:
    "Corentia, emlak ofisleri, oteller ve günlük kiralık işletmeleri için " +
    "WhatsApp üzerinden çalışan otonom satış asistanı. Rodi Medya ürünüdür.",
  alternates: { canonical: "/corentia" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${SITE.url}/corentia`,
    title: "Corentia — WhatsApp Yapay Zekâ Satış Asistanı",
    description: CORENTIA.summary,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: CORENTIA.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, WhatsApp",
  description: CORENTIA.summary,
  url: CORENTIA.url,
  inLanguage: "tr",
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

const LOGO = "/img/logo/corentia.png";

export default function CorentiaPage() {
  return (
    <>
      <ScrollEngine />
      <Reveal />
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="icerik">
        {/* --- HERO ----------------------------------------------------- */}
        <SectionSurface
          tone="ink"
          image="/img/bg/06-corentia.jpg"
          scrim={0.3}
          priority
          parallax={false}
        >
          <div className="shell flex min-h-[100svh] flex-col justify-center pt-28 pb-20 lg:pt-32">
            <Link
              href="/"
              className="t-label mb-10 inline-flex w-fit items-center gap-2 no-underline opacity-70 transition-opacity hover:opacity-100"
            >
              <svg width="15" height="12" viewBox="0 0 14 12" fill="none" aria-hidden="true">
                <path
                  d="M12.5 6H1.5M6 1.5 1.5 6 6 10.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Rodi Medya
            </Link>

            {hasAsset(LOGO) && (
              <Image
                src={LOGO}
                alt="Corentia"
                width={200}
                height={200}
                priority
                sizes="140px"
                className="mb-10 h-auto w-[7rem] sm:w-[8.5rem]"
              />
            )}

            <p className="t-label mb-5 opacity-65">{CORENTIA_PAGE.eyebrow}</p>

            <h1 className="t-display m-0 mb-8 text-[clamp(2.6rem,7.5vw,6.5rem)]">
              {CORENTIA_PAGE.title}
            </h1>

            <p className="t-lede m-0 max-w-[46ch] opacity-80">
              {CORENTIA_PAGE.lede}
            </p>

            <div className="mt-12">
              <a
                href={CORENTIA.url}
                target="_blank"
                rel="noopener noreferrer"
                className="corentia-cta"
              >
                corentia.com.tr
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4.5 11.5 11.5 4.5M11.5 4.5H6M11.5 4.5V10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="sr-only">(yeni sekmede açılır)</span>
              </a>
            </div>
          </div>
        </SectionSurface>

        {/* --- TEK İDDİA ------------------------------------------------ */}
        <section className="surface-ink section-pad">
          <div className="shell">
            <p
              className="t-display m-0 max-w-[18ch] text-[clamp(2rem,5vw,4rem)]"
              data-anim="rise"
            >
              {CORENTIA_PAGE.claim.headline}
            </p>
            <p className="t-lede mt-7 max-w-[52ch] opacity-70" data-anim="rise">
              {CORENTIA_PAGE.claim.body}
            </p>
          </div>
        </section>

        {/* --- SEKTÖRLER ------------------------------------------------ */}
        <section className="surface-ink pb-4">
          <div className="shell">
            <h2 className="t-label mb-8 opacity-55">Kimler kullanıyor</h2>
            <ul className="m-0 list-none p-0">
              {CORENTIA_PAGE.sectors.map((s, i) => (
                <li
                  key={s.name}
                  className="corentia-row"
                  data-anim="rise"
                  data-anim-delay={(i * 0.06).toFixed(2)}
                >
                  <h3 className="corentia-row__name">{s.name}</h3>
                  <p className="t-body m-0 max-w-[44ch] opacity-65">{s.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- ÖĞRENEN ASİSTAN — sayfanın merkezi ---------------------- */}
        <section className="surface-ink section-pad">
          <div className="shell">
            <div className="corentia-highlight" data-anim="rise">
              <p className="t-label mb-6" style={{ color: "var(--color-corentia)" }}>
                {CORENTIA_PAGE.learning.label}
              </p>
              <h2 className="t-display m-0 mb-6 text-[clamp(1.9rem,4.2vw,3.4rem)]">
                {CORENTIA_PAGE.learning.title}
              </h2>
              <p className="t-lede m-0 max-w-[54ch] opacity-80">
                {CORENTIA_PAGE.learning.body}
              </p>
            </div>
          </div>
        </section>

        {/* --- ÖZELLİKLER ----------------------------------------------- */}
        <section className="surface-ink section-pad pt-0">
          <div className="shell">
            <h2 className="t-label mb-10 opacity-55">Neler yapıyor</h2>
            <ul className="m-0 grid list-none gap-x-10 gap-y-9 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {CORENTIA_PAGE.features.map((f, i) => (
                <li
                  key={f.title}
                  data-anim="rise"
                  data-anim-delay={((i % 3) * 0.07).toFixed(2)}
                >
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-[3px] w-9 rounded-full"
                    style={{ background: "var(--color-corentia)" }}
                  />
                  <h3 className="t-display m-0 mb-3 text-[1.15rem] leading-tight">
                    {f.title}
                  </h3>
                  <p className="t-body m-0 opacity-70">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- CTA ------------------------------------------------------ */}
        <SectionSurface tone="amber" image="/img/bg/08-iletisim.jpg" scrim={0.3}>
          <div className="shell section-pad">
            <h2 className="t-display m-0 mb-6 text-[clamp(2.2rem,6vw,5rem)]">
              {CORENTIA_PAGE.cta.title}
            </h2>
            <p className="t-lede m-0 mb-10 max-w-[46ch]">
              {CORENTIA_PAGE.cta.body}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid"
              >
                <span className="t-label">WhatsApp&apos;tan yazın</span>
                <span className="sr-only">(yeni sekmede açılır)</span>
              </a>
              <a href={`tel:${SITE.phoneE164}`} className="btn-outline t-label">
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </SectionSurface>
      </main>

      <SectionSurface tone="ink" image="/img/bg/09-footer.jpg" scrim={0.4}>
        <Footer />
      </SectionSurface>
    </>
  );
}
