import Image from "next/image";

/**
 * MARKA KİLİDİ — gerçek logo dosyası.
 *
 * ⚠️ ÖNCEKİ İKİ SÜRÜM DE YANLIŞTI, tekrarlama:
 *
 *  1. 150×150 JPG (Instagram profil görseli): içine pişmiş amber kare zemin,
 *     düşük çözünürlük → header'da bulanık, kenarları görünen bir sticker.
 *  2. Elle çizilmiş "V chevron" SVG: kartvizitte böyle bir işaret YOK.
 *     Bir Instagram postundaki şekli yanlış okuyup uydurmuştum.
 *
 * Şimdi kullanıcının verdiği 1254px HD logo işleniyor (scripts/logo_prep.py):
 * amber zemin şeffaflaştırıldı, içerik sınırlarına kırpıldı (1108×512).
 *
 * İKİ VARYANT var çünkü header yüzeyle birlikte renk değiştiriyor:
 *   roket-medya.png      beyaz "ROKET" + magenta "MEDYA" → amber ve ink üzerinde
 *   roket-medya-ink.png  beyaz olan her şey ink'e çevrilmiş → krem üzerinde
 * Krem yüzeyde beyaz varyant kullanılsaydı "ROKET" ve bulutlar kaybolurdu.
 */

type Props = {
  className?: string;
  /** Açık (krem) yüzeyde koyu varyanta geç. */
  onLight?: boolean;
  /** Görsel genişliği (px). Yükseklik oranla hesaplanır (1108:512). */
  width?: number;
  priority?: boolean;
};

const RATIO = 512 / 1108;

export default function Logo({
  className = "",
  onLight = false,
  width = 168,
  priority = false,
}: Props) {
  return (
    <Image
      src={onLight ? "/img/logo/roket-medya-ink.png" : "/img/logo/roket-medya.png"}
      alt="Roket Medya"
      width={1108}
      height={512}
      priority={priority}
      sizes={`${width}px`}
      className={`block h-auto w-auto ${className}`}
      style={{ width, height: Math.round(width * RATIO) }}
    />
  );
}
