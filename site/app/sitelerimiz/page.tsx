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
    "Rodi Medya tarafından geliştirilen dijital showroomlar, interaktif web platformları ve satış odaklı web siteleri.",
  alternates: { canonical: "/sitelerimiz" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: `${SITE.url}/sitelerimiz`,
    title: "Geliştirdiğimiz Siteler & Canlı Projeler — Rodi Medya",
    description: "Rodi Medya canlı web projeleri ve dijital showroom koleksiyonu.",
  },
};

const PROJECTS = [
  {
    id: "dilli-mobilya",
    title: "Dilli Mobilya — Dijital Showroom & Düğün Paketi Platformu",
    client: "Dilli Mobilya Ltd. Şti.",
    sector: "Mobilya, Çeyiz & Perakende (Bursa)",
    summary:
      "Bursa'nın 25 yıllık güvenilir markası için tasarlanan; müşterinin kendi salonunu ve çeyiz paketini görsel olarak oluşturup 16 ay elden taksit tutarını anında hesaplayabildiği lüks dijital showroom.",
    badges: [
      "16 Ay Elden Taksit Motoru",
      "Fotoğraflı Düğün Paketi Tasarlayıcı",
      "9 Şube Google Harita Navigasyonu",
      "1 Tıkla WhatsApp Sipariş",
      "Tam Ekran HD Lightbox",
    ],
    liveUrl: "/dilli-mobilya",
    ctaLabel: "Canlı Demoyu İncele",
    accentColor: "#c98836",
    metric: "16 Ay Elden Taksit • 9 Showroom",
  },
  {
    id: "corentia",
    title: "Corentia — Otonom WhatsApp Yapay Zekâ Satış Asistanı",
    client: "Rodi Medya Ürünü",
    sector: "Yapay Zekâ, Emlak & Turizm",
    summary:
      "Emlak ofisleri, oteller ve hizmet işletmeleri için WhatsApp üzerinden gelen müşteri taleplerini 7/24 karşılayan, portföy sunup satış randevusu bağlayan otonom yapay zekâ motoru.",
    badges: [
      "7/24 Otonom Satış Asistanı",
      "Doğal Dil Anlama (NLP)",
      "CRM & Takvim Entegrasyonu",
      "Anında Randevu Bağlama",
    ],
    liveUrl: "/corentia",
    ctaLabel: "Ürün Sayfasını İncele",
    accentColor: "#2563eb",
    metric: "%85 Daha Hızlı Dönüşüm",
  },
];

export default function SitelerimizPage() {
  return (
    <ScrollEngine>
      <Header />
      <main id="ana-icerik">
        {/* HERO SECTION */}
        <SectionSurface tone="amber" className="pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink/10 border border-ink/15 text-xs font-bold uppercase tracking-wider text-ink mb-6">
                <span>✦</span>
                <span>RODİ MEDYA PORTFOLYO</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-ink leading-[1.08] mb-6">
                Geliştirdiğimiz <br />
                <span className="text-magenta">Canlı Projeler</span> & Showroomlar
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-ink/80 max-w-2xl font-body leading-relaxed">
                İşletmelerin vitrinini dijitale taşıyan, sadece şık görünmekle kalmayıp doğrudan WhatsApp ve şube üzerinden satış kapatan canlı web projelerimiz.
              </p>
            </Reveal>
          </div>
        </SectionSurface>

        {/* PROJECTS SHOWCASE LIST */}
        <SectionSurface tone="ink" className="py-24 md:py-32">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="flex flex-col gap-16 md:gap-20">
              {PROJECTS.map((project, idx) => (
                <Reveal key={project.id} delay={idx * 0.1}>
                  <div className="rounded-3xl bg-ink-soft/90 border border-white/10 p-8 md:p-12 hover:border-amber/40 transition-all duration-300 shadow-2xl relative overflow-hidden group">
                    <div
                      className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-25"
                      style={{ backgroundColor: project.accentColor }}
                    />

                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        {project.sector}
                      </span>
                      <span className="text-xs text-white/50 font-mono">
                        {project.metric}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
                      {project.title}
                    </h2>

                    <p className="text-white/75 text-base md:text-lg font-body leading-relaxed mb-8 max-w-3xl">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
                      {project.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-xs md:text-sm px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/90 font-medium"
                        >
                          ✓ {badge}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                        className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-amber text-ink font-bold text-sm md:text-base hover:bg-amber-lit transition-colors duration-200 shadow-lg shadow-amber/20 group-hover:scale-105 transform"
                      >
                        <span>{project.ctaLabel}</span>
                        <span className="text-lg">→</span>
                      </a>
                      <span className="text-xs text-white/40">
                        Canlı ortamda test edilebilir
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </SectionSurface>

        {/* BOTTOM CTA */}
        <SectionSurface tone="cream" className="py-20 md:py-28 text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink mb-6">
                Sizin İşletmeniz İçin de <br />
                <span className="text-magenta">Böyle Bir Web Sitesi</span> Yapalım mı?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base md:text-lg text-ink/75 font-body mb-8">
                İşletmenizin ürünlerini, fiyatlarını ve şube bilgilerini doğrudan müşteriye ulaştıran satış odaklı tasarımlar hazırlıyoruz.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink text-amber font-display font-bold text-base hover:bg-ink-warm transition-all duration-200 shadow-xl shadow-ink/20"
              >
                <span>WhatsApp ile Proje Başlatın</span>
                <span>💬</span>
              </a>
            </Reveal>
          </div>
        </SectionSurface>
      </main>
      <Footer />
    </ScrollEngine>
  );
}
