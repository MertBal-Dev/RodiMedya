"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { HERO } from "@/lib/content";
import { SITE } from "@/lib/site";

/**
 * HERO İÇERİĞİ — sayfanın tezi.
 *
 * Bölüm sarmalayıcısı (<SectionSurface>) sunucu bileşenidir ve arka plan
 * görselini + ölçülmüş kontrast örtüsünü sağlar. Burası yalnızca içerik ve
 * animasyon — bu ayrım sayesinde görsel/scrim mantığı istemciye taşınmıyor.
 *
 * ⚠️ TASARIM KARARLARI — değiştirmeden önce oku:
 *
 * 1. overflow:hidden maskesi KULLANILMIYOR. line-height 0.88 ile Türkçe alt
 *    uzantılar (ğ, ş, ç) kesilirdi. Yerine opacity + yPercent.
 *
 * 2. Başlangıç gizleme CSS'te `@media (scripting: enabled)` ile. JS
 *    çalışmazsa metin görünür kalır — içerik asla animasyona bağımlı olmaz.
 *
 * 3. Metin amber üzerinde DAİMA --ink. Beyaz 1.91:1 verir, ölçüldü.
 *
 * 4. Sahte metin gölgesi KALDIRILDI. Arka plan görselinin kendisi sert yan
 *    ışığı ve uzun gölgeyi zaten taşıyor; tipografiye ikinci bir gölge
 *    eklemek WordArt hissi veriyordu.
 */

gsap.registerPlugin(SplitText);

/**
 * Merdiven girintileri. Satırlar sola dayalı bir blok değil, sağa doğru
 * yükselen basamaklar — "İVME" konsepti kompozisyonun kendisinde.
 * Değerler vw cinsinden ki tipografiyle birlikte ölçeklensin.
 */
const HERO_STAIR = ["0", "4.5vw", "9vw"] as const;

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
    const fades = root.querySelectorAll<HTMLElement>("[data-hero-fade]");

    if (reduced) {
      gsap.set([...lines, ...fades], { opacity: 1, y: 0 });
      return;
    }

    let splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      splits = Array.from(lines).map(
        (el) => new SplitText(el, { type: "chars", charsClass: "hero-char" }),
      );
      const chars = splits.flatMap((s) => s.chars);

      gsap.set(lines, { opacity: 1 });
      gsap.set(chars, { yPercent: 105, opacity: 0 });

      gsap
        .timeline({ delay: 0.12 })
        .to(chars, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.02,
        })
        .to(
          fades,
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.09 },
          "-=0.5",
        );
    }, root);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-between"
    >
      {/* pt: 864px ekranda nav (64px) + pt-32 (128px) = 192px ölü alan
          oluyordu. Basık ekranda üst boşluk kısaltılıyor. */}
      <div className="shell flex flex-1 flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32">
        {/* Yırtık bant — kartvizitteki beyaz şeridin karşılığı. Kartta da
            tam olarak bu satır ("DIGITAL MEDIA SPECIALIST") bantta duruyor. */}
        <p className="mb-6 sm:mb-8" data-hero-fade>
          <span className="tape">
            <span>{HERO.label}</span>
          </span>
        </p>

        {/* MERDİVEN: satırlar sola dayalı bir yığın değil, sağa doğru
            yükselen basamak. Son satır highlighter blokta (markanın kendi
            poster aygıtı) ve cümlenin vurgusunu taşıyor. */}
        <h1 className="t-display t-hero m-0">
          {HERO.lines.map((line, i) => (
            <span key={line} className="block" style={{ marginLeft: HERO_STAIR[i] }}>
              <span
                className={
                  i === HERO.lines.length - 1 ? "mark inline-block" : "inline-block"
                }
                data-hero-line
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 sm:mt-12 md:flex-row md:items-end md:justify-between md:gap-12">
          <p className="t-lede m-0" data-hero-fade>
            {HERO.lede}
          </p>

          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid group"
            data-hero-fade
          >
            <span className="t-label">{HERO.cta}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 9h12M10 4l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/*
        ⚠️ ALT ŞERİT KONTRAST ÖRTÜSÜ — dekorasyon değil, erişilebilirlik.
        01-hero.jpg'nin alt üçte biri dramatik bir gölge taşıyor (ort.
        ~#7A4A0C). Ink metin orada 2.9:1 veriyordu — AA'nın 4.5:1 eşiğinin
        çok altında. Bölüm geneli scrim'ini yükseltmek görselin dramatik
        ışığını öldürürdü; onun yerine yalnızca metnin oturduğu şeride
        yerel bir amber geçişi konuyor. Ölçülen sonuç: 5.4:1.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, var(--color-amber) 0%, color-mix(in srgb, var(--color-amber) 78%, transparent) 45%, transparent 100%)",
        }}
      />

      <div className="shell relative pb-6 sm:pb-8">
        <hr className="rule mb-4 sm:mb-5" />
        {/*
          Kaydırma göstergesi markanın KENDİ sözü: karatahta roket postunun
          altyazısı "lütfen emniyet kemerinizi takınız". Jenerik bir
          "Kaydırın" yerine markanın sesi. Ekran okuyucuya literal karşılığı
          veriliyor ki espri erişilebilirliği bozmasın.

          Sağdaki slogan tekrarı KALDIRILDI — hemen üstündeki <h1> zaten
          sloganın kendisi.
        */}
        <p className="t-label m-0 flex items-center gap-2.5 opacity-70">
          <span aria-hidden="true">Emniyet kemerinizi takın</span>
          <span className="sr-only">Aşağı kaydırın</span>
          {/* Roket — kartvizitin doodle dili, tek çizgi ağırlığı, yuvarlak uç */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="-rotate-[8deg]"
          >
            <g
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 3c3.6 3.2 5.4 7.3 5.4 11.6 0 3-1.9 5.9-5.4 8.4-3.5-2.5-5.4-5.4-5.4-8.4C10.6 10.3 12.4 6.2 16 3Z" />
              <circle cx="16" cy="12.4" r="2.2" />
              <path d="M10.6 16.5 7.4 20v3.6l3.4-1.8M21.4 16.5l3.2 3.5v3.6l-3.4-1.8" />
              <path d="M14 26.4 16 29l2-2.6" />
            </g>
          </svg>
        </p>
      </div>
    </div>
  );
}
