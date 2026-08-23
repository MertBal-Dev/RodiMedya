import type { Metadata } from "next";
import Link from "next/link";
import ScrollEngine from "@/components/motion/ScrollEngine";
import Reveal from "@/components/motion/Reveal";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import SectionSurface from "@/components/SectionSurface";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Geliştirdiğimiz Siteler & Canlı Projeler — Rodi Medya",
  description:
    "Rodi Medya tarafından geliştirilen dijital showroomlar ve satış odaklı web siteleri. Canlı ortamda incelenebilir.",
  alternates: { canonical: "/sitelerimiz" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${SITE.url}/sitelerimiz`,
    title: "Geliştirdiğimiz Siteler & Canlı Projeler — Rodi Medya",
    description: "Rodi Medya canlı web projeleri ve dijital showroom koleksiyonu.",
  },
};

/**
 * Portfolyo — **web projeleri**.
 *
 * ⚠️ Corentia bu listede yok: o bir web sitesi değil, WhatsApp
 * üzerinden çalışan bir yapay zekâ asistanı. "Geliştirdiğimiz siteler"
 * başlığı altında durması yanlış olur. Kendi sayfası var: /corentia
 */
const PROJECTS = [
  {
    id: "dilli-mobilya",
    name: "Dilli Mobilya",
    kicker: "Dijital showroom & düğün paketi platformu",
    client: "Dilli Mobilya Ltd. Şti.",
    sector: "Mobilya, çeyiz ve perakende — Bursa",
    summary:
      "Bursa'nın 25 yıllık markası için tasarlanan dijital showroom. Müşteri kendi salonunu ve çeyiz paketini görsel olarak kuruyor, 16 ay elden taksit tutarını anında görüyor, tek dokunuşla WhatsApp'tan sipariş veriyor.",
    features: [
      "16 ay elden taksit motoru",
      "Fotoğraflı düğün paketi tasarlayıcı",
      "9 şube, Google Harita navigasyonu",
      "Tek tıkla WhatsApp sipariş",
      "Tam ekran HD ürün görüntüleyici",
    ],
    metrics: [
      { value: "9", label: "showroom" },
      { value: "16", label: "ay taksit" },
      { value: "25", label: "yıllık marka" },
    ],
    href: "/dilli-mobilya",
    cta: "Canlı siteyi aç",
  },
  {
    id: "forge-house",
    name: "Forge House",
    kicker: "Spor salonu sitesi, yönetim paneli ve mobil uygulama",
    client: "GymOS — spor salonu dijital sistemi",
    sector: "Spor salonu ve fitness — Bursa Nilüfer",
    summary:
      "Salonun tanıtım sitesi, işletmenin yönettiği panel ve üyenin telefonundaki uygulama; üçü birbirine bağlı. Panelden yazılan antrenman programı üyenin telefonuna anında düşüyor, üyenin verdiği bar siparişi resepsiyonun ekranında beliriyor.",
    features: [
      "Canlı salon doluluğu",
      "Grup dersi rezervasyonu ve bekleme listesi",
      "Supplement bar — uygulamadan sipariş",
      "Antrenman programı ve hareket videoları",
      "İşletme paneli: program, ürün, üye, ders",
      "Dijital üye kartı",
    ],
    metrics: [
      { value: "21", label: "uygulama ekranı" },
      { value: "9", label: "panel sayfası" },
      { value: "3", label: "bağlı parça" },
    ],
    href: "/fitness",
    cta: "Siteyi aç",
    secondary: { href: "/fitness/admin", label: "Yönetim panelini aç" },
  },
];

export default function SitelerimizPage() {
  return (
    <>
      {/* Bu ikisi sarmalayıcı değil — sayfaya bir kez mount edilen,
          null döndüren sürücüler. Animasyon `data-anim` ile veriliyor. */}
      <ScrollEngine />
      <Reveal />
      <Header />

      <main id="ana-icerik">
        {/* --- HERO ---------------------------------------------------- */}
        <SectionSurface
          tone="ink"
          image="/img/bg/10-gecis.jpg"
          scrim={0.42}
          priority
        >
          <div className="shell flex min-h-[78svh] flex-col justify-center pt-32 pb-20">
            <p className="t-label mb-7 opacity-60" data-anim="rise">
              Portfolyo
            </p>

            <h1
              className="t-display m-0 max-w-[16ch] text-[clamp(2.4rem,7vw,5.5rem)]"
              data-anim="rise"
              data-anim-delay="0.08"
            >
              Geliştirdiğimiz canlı projeler
            </h1>

            <p
              className="t-lede mt-8 max-w-[52ch] opacity-75"
              data-anim="rise"
              data-anim-delay="0.16"
            >
              İşletmenin vitrinini dijitale taşıyan, şık görünmekle
              kalmayıp doğrudan WhatsApp ve şube üzerinden satış kapatan
              siteler. Hepsi canlı ortamda, gerçek müşteriyle çalışıyor.
            </p>
          </div>
        </SectionSurface>

        {/* --- PROJE ---------------------------------------------------- */}
        <section className="surface-ink section-pad">
          <div className="shell">
            {PROJECTS.map((p) => (
              <article key={p.id} className="border-t border-white/12 pt-12">
                <div
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3"
                  data-anim="rise"
                >
                  <h2 className="t-display m-0 text-[clamp(1.9rem,4.6vw,3.6rem)]">
                    {p.name}
                  </h2>
                  <p className="t-label m-0 opacity-55">{p.sector}</p>
                </div>

                <p
                  className="t-lede mt-4 max-w-[46ch] opacity-80"
                  data-anim="rise"
                  data-anim-delay="0.06"
                >
                  {p.kicker}
                </p>

                {/* Ölçüler — projenin büyüklüğünü tek bakışta veriyor. */}
                <ul
                  className="m-0 mt-12 grid list-none gap-8 p-0 sm:grid-cols-3"
                  data-anim="rise"
                  data-anim-delay="0.1"
                >
                  {p.metrics.map((m) => (
                    <li key={m.label}>
                      <p className="t-display m-0 text-[clamp(2.2rem,5vw,3.4rem)] leading-none">
                        {m.value}
                      </p>
                      <p className="t-label mt-2 opacity-55">{m.label}</p>
                    </li>
                  ))}
                </ul>

                <p
                  className="t-body mt-12 max-w-[58ch] opacity-70"
                  data-anim="rise"
                >
                  {p.summary}
                </p>

                <h3 className="t-label mt-14 mb-8 opacity-55">
                  Sitede neler var
                </h3>
                <ul className="m-0 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {p.features.map((f, i) => (
                    <li
                      key={f}
                      data-anim="rise"
                      data-anim-delay={((i % 3) * 0.07).toFixed(2)}
                    >
                      <span
                        aria-hidden="true"
                        className="mb-4 block h-[3px] w-9 rounded-full bg-amber"
                      />
                      <p className="t-body m-0 opacity-80">{f}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-14 flex flex-wrap gap-4" data-anim="rise">
                  <Link href={p.href} className="btn-solid">
                    {p.cta}
                  </Link>
                  {"secondary" in p && p.secondary && (
                    <Link href={p.secondary.href} className="btn-outline">
                      {p.secondary.label}
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- KAPANIŞ -------------------------------------------------- */}
        <SectionSurface tone="cream" image="/img/doku/31-krem-kagit.jpg" scrim={0.1}>
          <div className="shell section-pad">
            <h2
              className="t-display m-0 max-w-[20ch] text-[clamp(1.9rem,4.6vw,3.4rem)]"
              data-anim="rise"
            >
              Sizin işletmeniz için de böyle bir site yapalım
            </h2>

            <p
              className="t-lede mt-6 max-w-[50ch] opacity-75"
              data-anim="rise"
              data-anim-delay="0.08"
            >
              Ürünlerinizi, fiyatlarınızı ve şube bilgilerinizi doğrudan
              müşteriye ulaştıran, satış kapatan tasarımlar hazırlıyoruz.
            </p>

            <div
              className="mt-10 flex flex-wrap gap-4"
              data-anim="rise"
              data-anim-delay="0.14"
            >
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid"
              >
                WhatsApp'tan yazın
              </a>
              <Link href="/#iletisim" className="btn-outline">
                İletişim
              </Link>
            </div>
          </div>
        </SectionSurface>
      </main>

      <Footer />
    </>
  );
}
