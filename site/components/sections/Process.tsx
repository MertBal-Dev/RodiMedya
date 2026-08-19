import type { CSSProperties } from "react";
import { PROCESS } from "@/lib/content";

/**
 * SÜREÇ — "rampa" kompozisyonu.
 *
 * ⚠️ 4 SÜTUNLU GRID'DEN VAZGEÇİLDİ. Grid adımları yan yana koyuyordu,
 * yani sırayı GÖSTERMİYORDU. Burada her adım bir öncekinden daha sağda
 * başlıyor — düşen bir rampa. Sıra kompozisyonun kendisinde okunuyor.
 * "İVME" konsepti yapısal hale geliyor.
 *
 * ✅ Numaralandırma BURADA doğru (BRIEF §6.5): bu gerçek bir sıra.
 * Önce dinliyoruz, sonra planlıyoruz. Hizmetler bölümünde numara YOK,
 * orası paralel bir liste.
 *
 * ⚠️ Adım görselleri KALDIRILDI. Dört adet 9rem'lik küçük fotoğraf
 * gürültüydü; rampa ve devasa numaralar anlatıyı zaten taşıyor.
 * Dört görsel isteği de eksildi.
 *
 * Numaralar başlığın ARKASINDA (z-index -1, düşük opaklık) — dekoratif
 * plaka, okunacak bilgi değil. aria-hidden ile ekran okuyucudan gizli;
 * sıra bilgisi zaten <ol> semantiğinde var.
 */

export default function Process() {
  return (
    <div className="shell section-pad">
      <ol className="process-ramp m-0 list-none p-0">
        {PROCESS.steps.map((step, i) => (
          <li
            key={step.title}
            className="process-step"
            style={{ "--i": i } as CSSProperties}
            data-anim="rise"
            data-anim-delay={(i * 0.08).toFixed(2)}
          >
            <span className="process-numeral" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="process-body">
              <h3 className="process-title">{step.title}</h3>
              <p className="t-body m-0 max-w-[42ch] opacity-72">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
