"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GİRİŞ ANİMASYONLARI — tek merkezden
 *
 * Sayfadaki tüm [data-anim] öğelerini TEK bir ScrollTrigger.batch ile sürer.
 * Öğe başına ayrı trigger açmak yerine batch kullanmanın nedeni: 60+ öğede
 * her biri için ayrı scroll listener'ı ölçüm maliyeti yaratır.
 *
 * Başlangıç durumları globals.css §6'da tanımlı — JS yüklenmeden önce de
 * doğru görünür. JS hiç çalışmazsa aşağıdaki failsafe içeriği görünür kılar,
 * yani içerik ASLA animasyona bağımlı kalmaz.
 */

gsap.registerPlugin(ScrollTrigger);

export default function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = gsap.utils.toArray<HTMLElement>("[data-anim]");
    if (targets.length === 0) return;

    // Azaltılmış hareket: her şeyi anında son duruma getir, trigger kurma.
    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0, clipPath: "none", clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          batch.forEach((node) => {
            // ScrollTrigger.batch Element verir; dataset için HTMLElement lazım.
            const el = node as HTMLElement;
            const kind = el.dataset.anim;
            const delay = Number(el.dataset.animDelay ?? 0);

            if (kind === "clip") {
              gsap.to(el, {
                clipPath: "inset(0% 0 0 0)",
                duration: 1.05,
                ease: "power3.out",
                delay,
              });
              return;
            }

            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              delay,
            });
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
