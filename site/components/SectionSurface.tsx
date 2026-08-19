import Image from "next/image";
import type { ReactNode } from "react";
import { hasAsset } from "@/lib/assets";
import ParallaxLayer from "@/components/motion/ParallaxLayer";

/**
 * BÖLÜM YÜZEYİ — arka plan görseli + ÖLÇÜLMÜŞ kontrast örtüsü + derinlik
 *
 * ⚠️ Bu bileşen bir erişilebilirlik kontrolüdür, dekorasyon değil.
 *
 * SORUN: Arka plan görselleri "sert yan ışık + dramatik gölge" promptuyla
 * üretildi; güzel ama KOYU çıktılar. Ölçüm (metin --ink #0B0B0C):
 *
 *   01-hero        ort. #A36412 → 4.11:1  ✗   (AA gövde metni için 4.5 gerekli)
 *   04-istatistik  ort. #966E33 → 4.29:1  ✗
 *   08-iletisim    ort. #825A1F → 3.21:1  ✗
 *   14-pazarlama   ort. #8B5D12 → 3.44:1  ✗
 *   03-hizmetler   ort. #CF8610 → 6.62:1  ✓
 *
 * ÇÖZÜM: Görselin üzerine kendi tonunda ölçülmüş bir örtü. `scrim` değerleri
 * tahmin DEĞİL — 4.5:1 eşiğini geçen minimum değerler:
 *
 *   hero %10 · istatistik %5 · hizmetler %0 · pazarlama %25 · iletişim %30
 *
 * Örtü minimumda: görselin dokusu ve dramatik ışığı korunur, sadece metnin
 * oturduğu taban yeterince aydınlanır.
 *
 * ⚠️ Beyaz metin amber üzerinde 1.91:1 verir (ölçüldü). Amber yüzeyde metin
 *    DAİMA --ink olacak. Pazarlık konusu değil.
 */

type Tone = "amber" | "cream" | "ink";

const TONE_BG: Record<Tone, string> = {
  amber: "var(--color-amber)",
  cream: "var(--color-cream)",
  ink: "var(--color-ink)",
};

type Props = {
  tone: Tone;
  /** public/ altındaki yol. Dosya yoksa görsel atlanır, düz renk kalır. */
  image?: string;
  /** 0–1. Ölçülmüş değer — yukarıdaki tabloya bak, tahmin etme. */
  scrim?: number;
  /** Sadece ilk ekrandaki görsel için true (LCP). */
  priority?: boolean;
  /** Arka planı derinlik katmanına al (içerikten yavaş kayar). */
  parallax?: boolean;
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function SectionSurface({
  tone,
  image,
  scrim = 0,
  priority = false,
  parallax = true,
  id,
  className = "",
  children,
}: Props) {
  // Görsel henüz üretilmediyse 404 üretmek yerine düz rengi koru.
  const showImage = Boolean(image) && hasAsset(image!);

  /*
    Negatif z-index: elemanın kendi background-color'ının ÜSTÜNE, ama
    içeriğin ALTINA boyanır (CSS boyama sırası). Görsel yüklenemezse
    altındaki düz renk görünür — sessiz fallback.
  */
  const picture = showImage ? (
    <Image
      src={image!}
      alt=""
      aria-hidden="true"
      fill
      priority={priority}
      sizes="100vw"
      quality={75}
      className="object-cover"
    />
  ) : null;

  return (
    <section
      id={id}
      className={`surface-${tone} relative isolate overflow-hidden ${className}`}
    >
      {showImage && (
        <>
          {/*
            ⚠️ Arka plan katmanı YAPIŞKAN ve TEK EKRAN yüksekliğinde.

            NEDEN: Pinlenmiş bölümler belge akışında çok uzun oluyor
            (Hizmetler yatay şerit = 2700px, İşler = 1823px). `absolute
            inset-0` kullanıldığında 2560x1097'lik 21:9 görsel object-cover
            ile 1536x2700 kutuyu doldurmak için ~6300px genişliğe
            esnetiliyordu — 2.5 kat büyütme, gözle görülür bulanıklık.

            sticky + h-[100svh] ile görsel daima ekran boyutunda kalıyor:
            hem keskin, hem de uzun bölümlerde arka plan sabit dururken
            içerik üzerinden akıyor.
          */}
          {/* ⚠️ BURADA `overflow-hidden` OLMAMALI.
              Bir `overflow: hidden` atası, `position: sticky` çocuk için
              kaydırma kabı hâline geliyor; kap kendisi kaymadığı için
              sticky hiç devreye girmiyordu. Sonuç: 100svh'lik görsel,
              bölümün üst 864px'ini kaplayıp altını boş bırakıyordu
              (İstatistik bölümü 1009px → 145px çıplak düz renk).
              Kırpma zaten <section> üzerindeki overflow-hidden ile
              yapılıyor, ikinci kez gerekmiyor. */}
          <div className="absolute inset-0 -z-20">
            <div className="sticky top-0 h-[100svh] w-full">
              {/* ⚠️ `relative` ŞART: <Image fill> parent'ının konumlandırılmış
                  olmasını istiyor ve Next.js yalnızca absolute/fixed/relative
                  kabul ediyor — `sticky` CSS'te konumlandırılmış sayılsa da
                  runtime uyarısı veriyor ve görsel boyutsuz kalıyor. */}
              <div className="relative h-full w-full">
                {parallax ? (
                  <ParallaxLayer speed={0.18}>{picture}</ParallaxLayer>
                ) : (
                  picture
                )}
              </div>
            </div>
          </div>
          {scrim > 0 && (
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div
                aria-hidden="true"
                className="sticky top-0 h-[100svh] w-full"
                style={{ backgroundColor: TONE_BG[tone], opacity: scrim }}
              />
            </div>
          )}
        </>
      )}
      {children}
    </section>
  );
}
