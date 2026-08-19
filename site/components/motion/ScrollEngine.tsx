"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/**
 * SCROLL MOTORU + İMZA IŞIK SİSTEMİ
 *
 * Tek sorumluluk noktası. Sayfada YALNIZCA BİR tane mount edilir.
 *
 * 1. Lenis smooth scroll'u kurar ve GSAP ticker'ına bağlar.
 * 2. İmza öğesini sürer: sayfa boyunca yolculuk eden ışık kaynağı.
 *    --cast-x / --cast-y CSS değişkenlerini yazar; tüm gölgeler bunlardan
 *    TRANSFORM ile türer (globals.css §4). box-shadow kullanılmaz — o her
 *    frame repaint tetikler, transform compositor'da kalır.
 *
 * ⚠️ DEMİR KURAL (BRIEF §5.2): Scroll = GSAP. Component yaşam döngüsü = Motion.
 *    Aynı property'yi iki kütüphane birden animate etmez.
 */

gsap.registerPlugin(ScrollTrigger);

/**
 * Işığın yolculuğu — BİRİMSİZ yön değerleri.
 *   x: -1 (sağdan ışık, gölge sola) → +1 (soldan ışık, gölge sağa)
 *   y:  0 (tepe ışık, gölge kısa)   → +1 (alçak ışık, gölge uzun)
 *
 * Marka fotoğraflarının dili: sert yan ışık, uzun gölge.
 *   t=0    sabah — sol üstten sert, gölge sağ-alta uzun
 *   t=0.30 tepe  — gölge kısalır
 *   t=0.62 ikindi— ışık sağa geçer, gölge sola dönüp uzar
 *   t=1    akşam — çok alçak, uzun gölge
 *
 * Bu değerler yüzey ritmiyle (amber→krem→ink) aynı anda ilerler, böylece
 * renk değişimi keyfi değil FİZİKSEL hissedilir.
 *
 * ⚠️ Birimsiz olmalarının nedeni: CSS tarafında kart gölgesi px, metin
 *    gölgesi em ile çarpılıyor. Sabit px yazsaydık gölge devasa tipografide
 *    hayalet, küçük metinde kocaman görünürdü.
 */
/* ⚠️ IŞIK KARŞI TARAFA GEÇMİYOR — ALÇALIYOR.
   Önceki eğri t=0.62'de x'i -0.7'ye, t=1'de -1'e götürüyordu: ışık sağa
   geçiyor, CSS gölgeleri sola dönüyordu. Ama altlarındaki fotoğrafların
   (05-icerik, 07-surec, 09-footer) hepsinde pişmiş ışık kaynağı SOLDA.
   Sayfanın alt yarısında her gölge, üzerinde durduğu fotoğrafla ters
   yöne düşüyordu. Artık güneş yan geçmiyor, sadece alçalıyor: "akşam =
   uzun gölge" fikri duruyor, çelişki gidiyor. */
const LIGHT_PATH = [
  { t: 0, x: 0.85, y: 0.95 },
  { t: 0.3, x: 0.38, y: 0.5 },
  { t: 0.62, x: 0.35, y: 0.85 },
  { t: 1, x: 0.15, y: 1.0 },
] as const;

function sampleLight(t: number): { x: number; y: number } {
  const p = gsap.utils.clamp(0, 1, t);
  for (let i = 0; i < LIGHT_PATH.length - 1; i++) {
    const a = LIGHT_PATH[i];
    const b = LIGHT_PATH[i + 1];
    if (p <= b.t) {
      const local = (p - a.t) / (b.t - a.t);
      // yumuşak geçiş — ışık ani sıçramaz
      const e = gsap.parseEase("power1.inOut")(local);
      return { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e };
    }
  }
  const last = LIGHT_PATH[LIGHT_PATH.length - 1];
  return { x: last.x, y: last.y };
}

export default function ScrollEngine() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Birimsiz yazılır — CSS tarafında px (kart) veya em (metin) ile çarpılır.
    const setCastX = gsap.quickSetter(root, "--cast-nx") as (v: number) => void;
    const setCastY = gsap.quickSetter(root, "--cast-ny") as (v: number) => void;
    const setLightT = gsap.quickSetter(root, "--light-t") as (v: number) => void;

    /* --- Azaltılmış hareket: ışık sabit, Lenis yok, ScrollTrigger yok --- */
    if (reduced) {
      const fixed = sampleLight(0.12);
      setCastX(fixed.x);
      setCastY(fixed.y);
      setLightT(0.12);
      return;
    }

    /* --- Yeniden yüklemede daima en baştan başla ------------------------
       Tarayıcı önceki scroll konumunu geri yükler; pinlenmiş bölümler
       yarı yolda açılır. Sıfırlama Lenis üzerinden gitmeli — düz
       window.scrollTo bir sonraki tick'te Lenis tarafından ezilir. */
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.05,
      // hafif, doğal yavaşlama — abartılı "kaygan" his istemiyoruz
      easing: (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
    });

    lenis.scrollTo(0, { immediate: true, force: true });
    const resetRaf = requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true, force: true });
    });

    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Header'ın mobil menü açıkken sayfayı dondurabilmesi için (lib/lenis.ts).
    setLenis(lenis);

    /* --- İmza: ışığın yolculuğu ------------------------------------- */
    const lightTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const { x, y } = sampleLight(self.progress);
        setCastX(x);
        setCastY(y);
        setLightT(self.progress);
      },
    });

    // İlk frame'i hemen doğru konuma getir (scroll beklemeden)
    const start = sampleLight(0);
    setCastX(start.x);
    setCastY(start.y);
    setLightT(0);

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(resetRaf);
      lightTrigger.kill();
      gsap.ticker.remove(raf);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
