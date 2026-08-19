"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/content";

/**
 * İSTATİSTİK — "defter" kompozisyonu.
 *
 * ⚠️ ETİKET VE BAŞLIK BİLİNÇLİ OLARAK YOK.
 * Sitedeki en büyük hata her bölümün aynı şablonu tekrarlamasıydı:
 * küçük etiket → devasa sola dayalı başlık → içerik, sekiz kez üst üste.
 * Burada RAKAMLARIN KENDİSİ başlık. Üç tam kanama satır, açıklama sağa
 * dayalı, aralarında ince çizgi — bir defter/cetvel gibi.
 *
 * ⚠️ 3 SÜTUNLU GRID'DEN VAZGEÇİLDİ: "55,8 mn" ve "9,5 saat" komşu sütuna
 * taşıp üst üste biniyordu ("55,69,5" gibi okunamaz bir çakışma). Satır
 * düzeninde her rakamın tüm genişlik hakkı var.
 *
 * ⚠️ Bu rakamlar PAZAR verisi, Rodi Medya'nın performans iddiası DEĞİL.
 * Kaynak ekranda yazıyor (Gemius Türkiye). Sahte başarı metriği yok
 * (BRIEF §7.1) — gerçek müşteri işi henüz yok.
 *
 * Işık sistemi burada işini yapıyor: rakamlar .cast-text taşıyor, yani
 * sayfanın tek ışık kaynağından gelen gölgeyi en görünür şekilde burada
 * gösteriyorlar.
 */

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = root.querySelectorAll<HTMLElement>("[data-count]");

    // Azaltılmış hareket: son değeri anında yaz, sayma animasyonu yok.
    if (reduced) {
      nodes.forEach((n) => {
        n.textContent = formatTr(Number(n.dataset.count));
      });
      return;
    }

    const ctx = gsap.context(() => {
      nodes.forEach((node) => {
        const target = Number(node.dataset.count);
        const state = { v: 0 };

        gsap.to(state, {
          v: target,
          duration: 1.9,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
          onUpdate: () => {
            node.textContent = formatTr(state.v, target);
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="section-pad">
      <dl className="m-0">
        {STATS.items.map((item, i) => (
          <div
            key={item.caption}
            className="border-t"
            style={{ borderColor: "var(--rule)" }}
            data-anim="rise"
            data-anim-delay={(i * 0.08).toFixed(2)}
          >
            {/* justify-between DEĞİL: rakamla açıklama arasında 700px'lik
                bir boşluk açılıyor ve ikisi ilişkisiz iki nesne gibi
                duruyordu. Grid ile açıklama rakamın hemen ardına oturuyor. */}
            <div className="shell flex flex-col gap-2 py-6 md:grid md:grid-cols-[auto_minmax(0,26rem)] md:items-end md:gap-x-12 md:py-8">
              {/* Rakam — shell'in sol kenarından hafifçe taşıyor.
                  Taşma "bu sayı kutuya sığmıyor" hissi veriyor. */}
              <dd className="m-0 md:-ml-[2.5vw]">
                <span className="t-numeral cast-text inline-flex items-baseline gap-3">
                  <span className="cast-text__shadow" aria-hidden="true">
                    {formatTr(item.value)}
                  </span>
                  <span className="relative" data-count={item.value}>
                    0
                  </span>
                  <span className="t-numeral-unit relative">{item.suffix}</span>
                </span>
              </dd>

              <dt className="t-body m-0 max-w-[34ch] opacity-70 md:pb-3">
                {item.caption}
              </dt>
            </div>
          </div>
        ))}
      </dl>

      <div
        className="border-t"
        style={{ borderColor: "var(--rule)" }}
      >
        <p className="shell t-label pt-5 opacity-50">{STATS.source}</p>
      </div>
    </div>
  );
}

/**
 * Türkçe sayı biçimi: ondalık ayırıcı virgül.
 * `target` verilirse hedefin ondalık hanesini korur (55,8 sayarken hep tek
 * hane, 59 hiç hane yok) — böylece sayarken genişlik zıplamıyor.
 */
function formatTr(value: number, target?: number): string {
  const decimals = Number.isInteger(target ?? value) ? 0 : 1;
  return value.toLocaleString("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
