import { FAQ } from "@/lib/content";

/**
 * SIKÇA SORULANLAR — "dizin" kompozisyonu.
 *
 * ⚠️ YAPIŞKAN SÜTUN VE BÖLÜM BAŞLIĞI KALDIRILDI.
 * Önceki sürümde solda `lg:sticky` bir başlık rayı vardı; sayfa kaydıkça
 * ray sabit kalıp soruların ÜZERİNE biniyor ve metni okunmaz hale
 * getiriyordu. Ayrıca "küçük etiket → devasa başlık" şablonunun sekizinci
 * tekrarıydı.
 *
 * Yerine: solda 01–06 dizin sütunu, sağda sorular. Numaralandırma burada
 * DOĞRU (BRIEF §6.5) — bu gerçekten sıralı bir dizin, dekorasyon değil.
 *
 * Sorular sayfadaki TEK cümle-düzeni (küçük harf) display tipografisi.
 * Diğer her başlık BÜYÜK HARF; bu fark bölümü komşularından ayırıyor.
 *
 * Native <details name="sss"> kullanılıyor — JS yok. Klavye erişimi, ekran
 * okuyucu desteği ve "aynı anda tek açık" davranışı tarayıcıdan geliyor.
 */

export default function Faq() {
  return (
    <div className="shell section-pad">
      <ul className="m-0 list-none p-0">
        {FAQ.items.map((item, i) => (
          <li
            key={item.q}
            className="border-b"
            style={{ borderColor: "var(--rule)" }}
          >
            <details name="sss" className="group faq-item">
              <summary className="faq-summary">
                <span className="t-label faq-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="faq-question">{item.q}</h3>

                <span className="faq-toggle" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1.5v13M1.5 8h13"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="origin-center transition-transform duration-[240ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-open:rotate-45"
                    />
                  </svg>
                </span>
              </summary>

              <p className="faq-answer">{item.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
