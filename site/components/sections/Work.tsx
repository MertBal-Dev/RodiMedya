import Image from "next/image";
import { WORK } from "@/lib/content";

/**
 * İÇERİK ÜRETİMİ
 *
 * ⚠️ DÜRÜSTLÜK KURALI (BRIEF §7.1) — değiştirme:
 * Bunlar Rodi Medya'nın KENDİ kanalları için ürettiği içerikler.
 * "Müşteri projesi" / "vaka çalışması" / "portfolyo" DEĞİL — gerçek müşteri
 * işi henüz yok. Başlık ve lede bunu açıkça söylüyor. Uydurma müşteri adı,
 * sahte metrik veya hayali sonuç eklenmeyecek.
 *
 * Görseller Instagram kareleri (1:1). aspect-square + object-cover ile
 * kutuya tam oturuyorlar — kırpma sorunu yok, taşma yok.
 *
 * Sunucu bileşeni: hiçbir etkileşim yok, JS gönderilmiyor.
 */

export default function Work() {
  return (
    <div className="shell section-pad">
      <div className="mb-12 max-w-[54ch] sm:mb-16">
        <p className="t-label mb-5 opacity-70">{WORK.label}</p>
        <h2 className="t-display t-section m-0 mb-6">{WORK.title}</h2>
        <p className="t-lede m-0 opacity-75">{WORK.lede}</p>
      </div>

      <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {WORK.items.map((item, i) => (
          <li
            key={item.src}
            className="group relative aspect-square overflow-hidden"
            data-anim="clip"
            data-anim-delay={((i % 3) * 0.07).toFixed(2)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
