"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SERVICES } from "@/lib/content";

/**
 * HİZMETLER — yatay film şeridi (masaüstü) / dikey liste (mobil)
 *
 * ⚠️ KART TASARIMI YENİLENDİ. Önceki hali koyu bir dikdörtgenin üzerine
 * fotoğraf + kare etiket kutularıydı; müşteri "Paint çıktısı" dedi ve
 * haklıydı. Yeni kart kartvizitin kendi malzemesi: KREM KAĞIT üzerinde
 * içeriden yerleştirilmiş fotoğraf — kartvizitteki beyaz bant ve beyaz
 * bulutların karşılığı.
 *
 * Etiketler de değişti: 4 etiket × 6 kart = 24 adet BÜYÜK HARF, 0.2em
 * aralıklı, kalın kare kutu vardı — görsel gürültünün yarısı oradan
 * geliyordu. Artık cümle düzeninde, hafif, hap biçiminde.
 *
 * ⚠️ NUMARALANDIRMA YOK. 6 hizmet paralel bir liste, sıra taşımıyor.
 * Numaralandırma sadece Süreç bölümünde var, çünkü orası gerçek bir sıra.
 *
 * ⚠️ KARTLARDA ODAKLANABİLİR ÖĞE YOK (link/buton). Bilinçli: yatay
 * dönüştürülmüş pinli bir kapsayıcıda klavye odağı ekran dışındaki karta
 * atlayınca tarayıcı doğru kaydıramaz.
 *
 * MOBİL: 900px altında pin/yatay tamamen devre dışı — dikey akış.
 */

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { x: 0 });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      {/* Başlık bloğu — 864px ekranda pt-28/pb-14 (280px) + kart 62vh
          (536px) + nav (64px) = 880px > 864. Basık ekranda kısaltılıyor. */}
      <div className="shell pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-14">
        <p className="t-label mb-5 opacity-70">Ne yapıyoruz</p>
        <h2 className="t-display t-section m-0 max-w-[16ch]">Hizmetler</h2>
      </div>

      <div
        ref={trackRef}
        className="
          flex flex-col gap-6 px-5 pb-20
          sm:px-8
          lg:w-max lg:flex-row lg:gap-8 lg:px-[max(2rem,calc((100vw-88rem)/2+4.5rem))] lg:pb-24
        "
      >
        {SERVICES.map((s) => (
          <article key={s.slug} className="svc">
            <div className="svc__photo">
              <Image
                src={s.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 900px) 100vw, 27rem"
                className="object-cover"
              />
            </div>

            <div className="svc__body">
              <h3 className="svc__title">{s.title}</h3>
              <p className="svc__summary">{s.summary}</p>

              <ul className="m-0 mt-1 flex list-none flex-wrap gap-x-2 gap-y-2 p-0">
                {s.items.map((item) => (
                  <li key={item} className="svc__chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
