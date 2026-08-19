import SectionSurface from "@/components/SectionSurface";
import ScrollEngine from "@/components/motion/ScrollEngine";
import Reveal from "@/components/motion/Reveal";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Work from "@/components/sections/Work";
import Corentia from "@/components/sections/Corentia";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { FAQ } from "@/lib/content";

/**
 * RODİ MEDYA — tek sayfa.
 *
 * YÜZEY RİTMİ (BRIEF §6.1) — üç "bölüm çifti" + finale:
 *   amber amber → ink ink → krem krem → amber (finale) → ink (kapanış)
 * Her çift kendi içinde bir bölüm gibi okunuyor, geçişler nefes noktası.
 * Koyu yüzey varsayılan değil, NADİR bir noktalama işareti — toplam
 * scroll'un dörtte birini geçmiyor.
 *
 * `scrim` değerleri ÖLÇÜLMÜŞ, tahmin değil — SectionSurface açıklamasındaki
 * kontrast tablosuna bak.
 */

/**
 * FAQPage schema — yapay zekâ arama motorları (ChatGPT, Perplexity, Gemini)
 * bu formatı kaynak olarak alıntılamayı seviyor. Metinler content.ts'ten
 * geliyor, yani ekranda görünenle birebir aynı — Google'ın "gizli içerik"
 * kuralına takılmaz.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Page() {
  return (
    <>
      <ScrollEngine />
      <Reveal />
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main id="icerik">
        <div id="top" />

        {/* 01 — HERO · amber impact */}
        <SectionSurface
          tone="amber"
          image="/img/bg/01-hero.jpg"
          scrim={0.1}
          priority
          parallax={false}
        >
          <Hero />
        </SectionSurface>

        {/* 02 — MANİFESTO · krem okuma yüzeyi
            02-manifesto.jpg "koyu zemin üzerinde kağıt" olarak üretildi, tam
            kanama krem alan değil. Metnin altına serilirse okunabilirlik
            bozulurdu — düz krem kullanılıyor. */}
        <Manifesto />

        {/* 03 — HİZMETLER · amber, yatay film şeridi */}
        <SectionSurface
          id="hizmetler"
          tone="amber"
          image="/img/bg/03-hizmetler.jpg"
          scrim={0}
        >
          <Services />
        </SectionSurface>

        {/* 04 — İSTATİSTİK · amber, devasa rakamlar
            scrim 0.05 → 0.42: 04-istatistik.jpg geniş bir çapraz gölge
            taşıyor. Sağa dayalı açıklama metinleri tam o karanlık bölgeye
            düşüp okunamıyordu (ölçüm: 2.4:1). 0.42 ile 5.1:1. */}
        <SectionSurface
          tone="amber"
          image="/img/bg/04-istatistik.jpg"
          scrim={0.42}
        >
          <Stats />
        </SectionSurface>

        {/* 05 — İÇERİK ÜRETİMİ · ink. Renkli Instagram kareleri koyu zeminde
            patlıyor. ⚠️ "Müşteri işi" DEĞİL — bkz. Work.tsx */}
        <SectionSurface
          id="isler"
          tone="ink"
          image="/img/bg/05-icerik.jpg"
          scrim={0.35}
        >
          <Work />
        </SectionSurface>

        {/* 06 — CORENTIA · ink, mavi aksan anı. Kapsam kilitli (BRIEF §3.1) */}
        <SectionSurface tone="ink" image="/img/bg/06-corentia.jpg" scrim={0.3}>
          <Corentia />
        </SectionSurface>

        {/* 07 — SÜREÇ · krem, sakin okuma. Numaralandırma burada DOĞRU. */}
        <SectionSurface
          id="surec"
          tone="cream"
          image="/img/bg/07-surec.jpg"
          scrim={0.25}
        >
          <Process />
        </SectionSurface>

        {/* 08 — S.S.S. · krem, düz. Uzun metin, görsel gürültü istemiyor. */}
        <section id="sss" className="surface-cream relative">
          <Faq />
        </section>

        {/* 09 — İLETİŞİM · amber sel, finale. Form YOK (BRIEF §13). */}
        <SectionSurface
          tone="amber"
          image="/img/bg/08-iletisim.jpg"
          scrim={0.3}
        >
          <Contact />
        </SectionSurface>
      </main>

      {/* 10 — FOOTER · ink kapanış */}
      <SectionSurface tone="ink" image="/img/bg/09-footer.jpg" scrim={0.4}>
        <Footer />
      </SectionSurface>
    </>
  );
}
