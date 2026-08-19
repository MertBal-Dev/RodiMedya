"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { SITE } from "@/lib/site";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import Logo from "@/components/Logo";

/**
 * ÜST BAR
 *
 * KONSEP: Bar sayfanın üstünde yüzen bir UI parçası değil — üzerinden geçtiği
 * YÜZEYE ve sayfanın tek ışık kaynağına ait bir plaka. Amber/krem/ink ritmiyle
 * birlikte renk değiştiriyor. Bunu yapmayan bir bar sticker gibi duruyordu.
 *
 * ⚠️ ÖNCEKİ SÜRÜMÜN HATALARI (tekrarlama):
 *  1. useEffect bağımlılığı [open] idi → menü her açılıp kapandığında
 *     ScrollTrigger yıkılıp yeniden kuruluyordu. Artık [] ve `open` bir ref'ten
 *     okunuyor.
 *  2. Hız eşiği yoktu → trackpad titremesinde bar yanıp sönüyordu.
 *     Artık |velocity| > 260 ve scrollY > 160 şartı var.
 *  3. yPercent kullanılıyordu → bar yüksekliği değişince mesafe kayıyordu.
 *     Artık px cinsinden --nav-h.
 *  4. Büyüyen alt çizgi hover'ı → web'in en klişe hover'ı. Yerine markanın
 *     KENDİ poster aygıtı: highlighter blok (.nav-link, globals.css).
 *  5. Aktif bölüm göstergesi yoktu.
 *  6. "İletişim" etiketi WhatsApp açıyordu — etiket hedefi hakkında yalan
 *     söylüyordu. Artık "WhatsApp'tan yazın".
 *  7. body{overflow:hidden} Lenis'i durdurmuyordu → panel arkası kayıyordu.
 *     Artık lenis.stop().
 *  8. Gizli bar klavye odağını örtebiliyordu → focusin ile geri geliyor.
 */

gsap.registerPlugin(ScrollTrigger);

/**
 * ⚠️ YOLLAR `/#...` OLMALI, salt `#...` DEĞİL.
 * Salt çapa kullanıldığında /corentia sayfasındayken bu id'ler o sayfada
 * bulunmadığı için bağlantılar hiçbir şey yapmıyordu. `/#hizmetler` önce
 * ana sayfaya gidip sonra ilgili bölüme kaydırıyor.
 */
const NAV = [
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#isler", label: "İşler" },
  { href: "/#surec", label: "Süreç" },
  { href: "/#sss", label: "S.S.S." },
];

type Surface = "amber" | "cream" | "ink";

export default function Header() {
  const barRef = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);
  const [surface, setSurface] = useState<Surface>("amber");
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  openRef.current = open;

  /* ------------------------------------------------------------------
     Scroll davranışı + yüzey inversiyonu + aktif bölüm.
     TEK effect, boş bağımlılık — menü durumu ref'ten okunuyor.
     ------------------------------------------------------------------ */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      /* --- gizle / göster ------------------------------------------- */
      let hidden = false;
      const navH = () =>
        parseFloat(getComputedStyle(bar).getPropertyValue("height")) || 76;

      const move = gsap.quickTo(bar, "y", { duration: 0.42, ease: "power3.inOut" });

      const show = () => {
        if (!hidden) return;
        hidden = false;
        gsap.to(bar, { y: 0, duration: 0.3, ease: "power3.out", overwrite: true });
      };
      const hide = () => {
        if (hidden) return;
        hidden = true;
        move(-(navH() + 8));
      };

      // Şeffaf → dolu yüzey geçişi. Eşik hero'nun ilk ekranından çıkınca.
      ScrollTrigger.create({
        start: 120,
        end: "max",
        onToggle: (self) => setScrolled(self.isActive),
      });

      if (!reduced) {
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            // Menü açıkken bar daima görünür.
            if (openRef.current) return show();

            const v = self.getVelocity();
            // Eşik: trackpad titremesi bar'ı yanıp söndürmesin.
            if (Math.abs(v) < 260) return;
            if (window.scrollY < 160) return show();

            if (v > 0) hide();
            else show();
          },
        });

        // Gizli bar klavye odağındaki elemanı ASLA örtmemeli (WCAG 2.4.11).
        bar.addEventListener("focusin", show);
      }

      /* --- yüzey inversiyonu ---------------------------------------- */
      const sections = document.querySelectorAll<HTMLElement>(
        "[class*='surface-amber'], [class*='surface-cream'], [class*='surface-ink']",
      );

      sections.forEach((section) => {
        const tone: Surface = section.className.includes("surface-ink")
          ? "ink"
          : section.className.includes("surface-cream")
            ? "cream"
            : "amber";

        ScrollTrigger.create({
          trigger: section,
          start: "top top+=32",
          end: "bottom top+=32",
          onToggle: (self) => {
            if (self.isActive) setSurface(tone);
          },
        });
      });

      /* --- aktif bölüm -----------------------------------------------
         `item.href` artık "/#hizmetler" biçiminde; querySelector'a
         verilmeden önce "/" kısmı atılmalı yoksa geçersiz seçici olur. */
      NAV.forEach((item) => {
        const hash = item.href.slice(item.href.indexOf("#"));
        const el = document.querySelector<HTMLElement>(hash);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(item.href);
          },
        });
      });
    }, bar);

    return () => {
      ctx.revert();
    };
  }, []);

  /* ------------------------------------------------------------------
     Menü açıkken: sayfayı dondur, Esc ile kapat, odağı panelde tut.
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (!open) {
      unlockScroll();
      return;
    }

    lockScroll();

    const panel = panelRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (e.key !== "Tab" || !panel) return;

      // Basit odak tuzağı — panel açıkken sekme dışarı kaçmasın.
      const focusables = panel.querySelectorAll<HTMLElement>("a[href], button");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open]);

  return (
    <header
      ref={barRef}
      data-surface={surface}
      className="nav-bar fixed inset-x-0 top-0 z-50 will-change-transform"
    >
      <div className="shell grid h-full grid-cols-[auto_1fr_auto] items-center gap-x-12">
        {/* Krem yüzeyde koyu varyant — beyaz "ROKET" aksi halde kaybolur.
            href="/" — "#top" kullanıldığında /corentia sayfasında o çapa
            bulunmadığı için logo tıklanabilir ama işlevsiz kalıyordu. */}
        <a
          href="/"
          className="block no-underline"
          aria-label={`${SITE.name} — ana sayfa`}
        >
          <Logo onLight={surface === "cream"} width={152} priority />
        </a>

        <span aria-hidden="true" />

        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-10 md:flex" aria-label="Ana menü">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? "location" : undefined}
                className="nav-link"
              >
                <span className="nav-link__text">{item.label}</span>
              </a>
            ))}
          </nav>

          <span
            aria-hidden="true"
            className="hidden h-5 w-px md:block"
            style={{ background: "var(--rule)" }}
          />

          {/* Etiket hedefi doğru söylüyor: buton WhatsApp açıyor. */}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta hidden md:inline-flex"
          >
            <span className="t-label">WhatsApp&apos;tan yazın</span>
            <span className="sr-only">(yeni sekmede açılır)</span>
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobil-menu"
            className="nav-burger md:hidden"
          >
            <span className="sr-only">{open ? "Menüyü kapat" : "Menüyü aç"}</span>
            <span className="nav-burger__box" data-open={open}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobil-menu"
            ref={panelRef}
            key="panel"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="surface-ink absolute inset-x-0 top-full md:hidden"
            style={{ overscrollBehavior: "contain" }}
          >
            <motion.div
              className="shell flex flex-col py-8"
              initial="hidden"
              animate="shown"
              exit="gone"
              variants={{
                shown: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
                gone: { transition: { duration: 0.12 } },
              }}
            >
              {NAV.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    shown: { opacity: 1, y: 0 },
                    gone: { opacity: 0 },
                  }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  className="t-display border-b py-5 text-[1.9rem] no-underline"
                  style={{ borderColor: "var(--rule)" }}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  shown: { opacity: 1, y: 0 },
                  gone: { opacity: 0 },
                }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="t-label mt-7 bg-amber px-6 py-5 text-center text-ink no-underline"
              >
                WhatsApp&apos;tan yazın
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
