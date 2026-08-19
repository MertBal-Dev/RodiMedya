import type Lenis from "lenis";

/**
 * Lenis örneğine tek erişim noktası.
 *
 * NEDEN: Mobil menü açıldığında arka planın kaymasını durdurmak gerekiyor.
 * `document.body.style.overflow = "hidden"` bunu YAPMAZ — Lenis kendi
 * transform'uyla kaydırmaya devam eder ve iOS'ta panelin arkası kayar.
 * Doğrusu `lenis.stop()`.
 *
 * Context yerine modül değişkeni: ScrollEngine sayfada tek kez mount ediliyor
 * ve bu değere ihtiyaç duyan tek bileşen Header. Provider ağacı kurmak
 * gereksiz olurdu.
 */

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null): void {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Menü/modal açıkken sayfayı dondur. Lenis yoksa (reduced motion) sessizce geç. */
export function lockScroll(): void {
  instance?.stop();
}

export function unlockScroll(): void {
  instance?.start();
}
