"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MANIFESTO } from "@/lib/content";

/**
 * MANİFESTO — "fısıltı" kompozisyonu.
 *
 * ⚠️ ETİKET VE BAŞLIK YOK, BİLİNÇLİ.
 * Sitenin en büyük hatası her bölümün aynı şablonu tekrarlamasıydı
 * (küçük etiket → devasa sola dayalı başlık → gövde). Burada paragrafın
 * KENDİSİ bölüm. Hero 141px'te bağırıyor; burası 40px'te ve sakin —
 * kontrast bu.
 *
 * Sayfadaki TEK ortalanmış, TEK dar ölçülü, TEK küçük-harf dizilmiş bölüm.
 * Bu üç "tek" onu komşularından ayırıyor.
 *
 * Cümle scroll ile kelime kelime aydınlanıyor: gözünüz nereye bakıyorsa
 * orası aydınlık. Pin YOK — pinlemek 864px ekranda 2592px'lik ölü alan
 * yaratıyor ve duraklama gibi okunuyor.
 *
 * Dipnot tam kanama eğik bant üzerinde (.skew-band) — markanın kendi
 * poster aygıtı, sitede ilk kez burada gerçekten kullanılıyor.
 */

gsap.registerPlugin(ScrollTrigger);

/** Vurgulanacak kelime — highlighter blok (.mark) buraya biniyor. */
const HIGHLIGHT = "sıkıcı";

export default function Manifesto() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = root.querySelectorAll<HTMLElement>("[data-word]");

    if (reduced) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.16 });
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "bottom 62%",
          scrub: 0.5,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="surface-cream section-pad overflow-hidden">
      <div className="shell">
        <p className="manifesto-text mx-auto">
          {MANIFESTO.text.split(" ").map((word, i) => {
            // Noktalama işaretini vurgunun dışında bırak ki blok
            // kelimeyi sarsın, noktayı değil.
            const bare = word.replace(/[.,]/g, "");
            const isMark = bare === HIGHLIGHT;

            return (
              <span key={`${word}-${i}`} data-word className="inline-block">
                {isMark ? (
                  <>
                    <span className="mark">{bare}</span>
                    {word.slice(bare.length)}
                  </>
                ) : (
                  word
                )}{" "}
              </span>
            );
          })}
        </p>
      </div>

      {/* Tam kanama eğik bant — iki viewport kenarına da değiyor */}
      <div className="skew-band mt-16 bg-amber py-5 sm:mt-24">
        <p className="shell t-label m-0 text-center text-ink">
          {MANIFESTO.footnote}
        </p>
      </div>
    </section>
  );
}
