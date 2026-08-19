import { CONTACT } from "@/lib/content";
import { SITE } from "@/lib/site";

/**
 * İLETİŞİM
 *
 * ⚠️ FORM YOK — bilinçli karar (BRIEF §13). Kullanıcı: "ne formu olacak onu
 * da bilmiyorum, şimdilik form olmasın." Sahte bir form koymak (gönder deyip
 * hiçbir yere düşmemek) ziyaretçiyi aldatmak olurdu.
 *
 * Yerine doğrudan aksiyon: WhatsApp birincil, telefon ikincil.
 * WhatsApp birincil çünkü hedef kitle (esnaf, emlakçı, otel) günlük iletişimi
 * WhatsApp'tan yürütüyor ve kendi ürünümüz Corentia de WhatsApp tabanlı —
 * tutarlı.
 *
 * `promises` maddeleri doğrulanabilir konumlandırma. Uydurma rozet, sahte
 * müşteri sayısı veya ödül YOK — henüz hiçbiri gerçek değil.
 */

export default function Contact() {
  return (
    <div className="shell section-pad" id="iletisim">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-20">
        <div>
          <p className="t-label mb-5 opacity-70">{CONTACT.label}</p>

          <h2 className="t-display t-section m-0 mb-7">
            {CONTACT.title}
            <span aria-hidden="true">?</span>
          </h2>

          <p className="t-lede m-0 mb-10">{CONTACT.lede}</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-ink px-7 py-5 text-cream no-underline transition-transform duration-300 hover:-translate-y-0.5 sm:px-9"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.44-.72-2.92-1.15-4.75-4.19-4.9-4.39-.14-.19-1.15-1.53-1.15-2.92 0-1.38.73-2.06 1-2.35.24-.29.53-.34.72-.34.19 0 .38 0 .55.01.17.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.09 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
              </svg>
              <span className="t-label">WhatsApp'tan yazın</span>
            </a>

            <a
              href={`tel:${SITE.phoneE164}`}
              className="t-label inline-flex items-center justify-center border-2 border-ink px-7 py-5 no-underline transition-colors duration-300 hover:bg-ink hover:text-cream sm:px-9"
            >
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>

        <ul className="m-0 list-none p-0">
          {CONTACT.promises.map((p, i) => (
            <li
              key={p}
              className="flex items-baseline gap-4 border-t py-5"
              style={{ borderColor: "var(--rule)" }}
              data-anim="rise"
              data-anim-delay={(i * 0.07).toFixed(2)}
            >
              <span className="t-label shrink-0 opacity-45" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="t-body m-0">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
