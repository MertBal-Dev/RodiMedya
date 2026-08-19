import Image from "next/image";
import Link from "next/link";
import { CORENTIA_TEASER } from "@/lib/content";
import { hasAsset } from "@/lib/assets";

/**
 * CORENTIA — ana sayfadaki KISA ÖZET.
 *
 * Ayrıntılı anlatım kendi sayfasında: /corentia
 * Burada tek iş var: "biz sadece pazarlama yapmıyoruz, kendi yazılım
 * ürünümüzü de geliştiriyoruz" demek ve o sayfaya göndermek.
 *
 * ⚠️ KAPSAM KİLİTLİ (BRIEF §3.1) — burada genişletme:
 *   ❌ Ekran görüntüsü   ❌ Fiyat   ❌ Özellik listesi
 *   ✅ Tek ekran, tek link
 *
 * Dış link (corentia.com.tr) DEĞİL iç link (/corentia) veriliyor:
 * ziyaretçiyi siteden çıkarmak yerine kendi ürün sayfamıza alıyoruz.
 */

const LOGO = "/img/logo/corentia.png";

export default function Corentia() {
  return (
    <div className="shell section-pad">
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
        <div className="max-w-[44ch]">
          <p className="t-label mb-5 opacity-60">{CORENTIA_TEASER.label}</p>

          <h2 className="t-display t-section m-0 mb-7 whitespace-pre-line">
            {CORENTIA_TEASER.title}
          </h2>

          <p className="t-lede m-0 mb-9 opacity-80">{CORENTIA_TEASER.body}</p>

          <Link href="/corentia" className="corentia-cta">
            {/* Sohbet balonu — Corentia bir WhatsApp ürünü */}
            <svg width="17" height="17" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <g
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 9.5A3.5 3.5 0 0 1 8.5 6h15A3.5 3.5 0 0 1 27 9.5v9a3.5 3.5 0 0 1-3.5 3.5H13l-5.2 4.2A.5.5 0 0 1 7 25.8V22h-1.5" />
              </g>
            </svg>
            {CORENTIA_TEASER.cta}
            <svg width="15" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
              <path
                d="M1.5 7h12M9 1.5 14 7l-5 5.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {hasAsset(LOGO) && (
          <div className="lg:pb-2">
            <Image
              src={LOGO}
              alt="Corentia"
              width={168}
              height={168}
              sizes="144px"
              className="h-auto w-[6rem] opacity-90 sm:w-[9rem]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
