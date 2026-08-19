"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * DERİNLİK KATMANI — arka plan parallax'ı
 *
 * Arka plan görselleri içerikten daha yavaş hareket eder. Bu, düz bir sayfayı
 * katmanlı bir mekâna çevirir ve "hareket eden ışık" imzasını destekler:
 * yüzey uzakta durur, içerik önünden geçer.
 *
 * depth 0 = en uzak (en yavaş). Ölçek 1.18 veriliyor çünkü katman scroll
 * boyunca ±%9 kayıyor — ölçeklenmezse kenarlarda boşluk açılır.
 *
 * SADECE transform animate edilir (GPU). Mobilde (pointer: coarse) ve
 * prefers-reduced-motion'da tamamen kapalı.
 */

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  /** 0 = en uzak/en yavaş, 1 = içerikle aynı hız */
  speed?: number;
  className?: string;
};

export default function ParallaxLayer({
  children,
  speed = 0.18,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const shift = 9 * speed * 10; // yüzde cinsinden toplam kayma

        const tween = gsap.fromTo(
          el,
          { yPercent: -shift / 2 },
          {
            yPercent: shift / 2,
            ease: "none",
            scrollTrigger: {
              /* ⚠️ TETİK BÖLÜMÜN KENDİSİ OLMALI, ebeveyn div DEĞİL.
                 Ebeveyn artık `sticky top-0 h-[100svh]` sarmalayıcının
                 içinde; ScrollTrigger onun doğal belge konumunu ölçtüğü
                 için start→end aralığı ~2 ekranda bitiyordu. Uzun
                 bölümlerde (Hizmetler 2700px, İşler 1823px) parallax ilk
                 üçte birde tamamlanıp donuyor, arka plan "nefes almayı
                 bırakıyordu". */
              trigger: el.closest("section") ?? el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(el, { yPercent: 0 });
        };
      },
    );

    return () => mm.revert();
  }, [speed]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      /* 1.18 → 1.06: %18 büyütme 2560px'lik plakada gözle görülür keskinlik
         kaybıydı. Kayma ±%9 olduğu için 1.06 kenar boşluğunu kapatmaya
         yetiyor. */
      className={`absolute inset-0 scale-[1.06] will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
