/**
 * Site sabitleri — tek gerçek kaynak.
 *
 * ✅ Tüm iletişim bilgileri doğrulandı:
 *   telefon  → kartvizit
 *   e-posta  → rodimedya.com alan adı sahiplik kaydı (Natro)
 *   instagram→ kullanıcı bildirdi
 *
 * `PENDING` mekanizması duruyor: ileride doğrulanmamış bir alan eklenirse
 * `isConfirmed` ile sarmalanır ve arayüz onu HİÇ render etmez. Yanlış
 * iletişim bilgisi göstermektense hiç göstermemek doğru.
 */

export const PENDING = "__PENDING__" as const;

/** Doğrulanmamış alanları gizlemek için. */
export function isConfirmed(value: string): boolean {
  return value !== PENDING && value.length > 0;
}

export const SITE = {
  name: "Rodi Medya",
  url: "https://rodimedya.com",
  slogan: "Değişik fikirlerimiz var",
  description:
    "Rodi Medya — sosyal medya yönetimi, web tasarım, e-ticaret ve dijital pazarlama. " +
    "Markanızı dijitalde görünür kılıyoruz.",

  /* --- İletişim (kartvizit + alan adı kaydından doğrulandı) --- */
  phoneDisplay: "+90 544 601 24 18",
  phoneE164: "+905446012418",
  whatsapp: "https://wa.me/905446012418",
  /* Alan adı sahiplik kaydından doğrulandı (rodimedya.com / Natro) */
  email: "roketdijitalmedya@gmail.com",

  /* Kullanıcı tarafından doğrulandı */
  instagram: "https://instagram.com/roketdigitalmedya",
  instagramHandle: "@roketdigitalmedya",
} as const;

/** Corentia — Rodi Medya'nın kendi yapay zekâ ürünü. */
export const CORENTIA = {
  name: "Corentia",
  url: "https://corentia.com.tr",
  tagline: "Otonom satış gücü",
  summary:
    "WhatsApp üzerinden çalışan, müşteri sorularını 7/24 yanıtlayan ve randevuya " +
    "dönüştüren yapay zekâ asistanı.",
} as const;
