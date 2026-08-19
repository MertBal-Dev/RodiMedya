import Logo from "@/components/Logo";
import { SITE, CORENTIA, isConfirmed } from "@/lib/site";

/**
 * FOOTER — ritmin sonu.
 *
 * Burası ışık yolculuğunun bittiği yer (--light-t = 1): en alçak ışık,
 * sitenin en uzun gölgesi. Taşan kelime markası bu gölgeyi taşıyor, yani
 * "yükseliş" temasının indiği nokta görsel olarak da kapanıyor.
 *
 * ⚠️ Instagram ve e-posta `PENDING` (lib/site.ts) — hiçbir marka
 * materyalinde doğrulanamadı. Uydurma hesap adı yazmaktansa satır hiç
 * render edilmiyor. Kullanıcı lib/site.ts'e değeri girince otomatik görünür.
 *
 * Kişi/ekip bilgisi YOK (BRIEF §2.1).
 * İletişim formu YOK (BRIEF §13) — doğrudan aksiyon: WhatsApp birincil.
 */

const NAV = [
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#isler", label: "İşler" },
  { href: "/#surec", label: "Süreç" },
  { href: "/#sss", label: "S.S.S." },
  { href: "/#iletisim", label: "İletişim" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <div className="shell pt-16 pb-8 sm:pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Marka */}
          <div className="lg:col-span-4">
            <Logo width={188} />
            <p className="t-sub mt-7 max-w-[13ch] opacity-90">{SITE.slogan}</p>
          </div>

          {/* Gezinme */}
          <nav className="lg:col-span-3" aria-label="Alt menü">
            <h2 className="t-label mb-6 opacity-55">Sayfa</h2>
            <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-2 p-0 sm:grid-cols-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="footer-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Direkt hat */}
          <div className="lg:col-span-3">
            <h2 className="t-label mb-6 opacity-55">Direkt hat</h2>

            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-plate"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.44-.72-2.92-1.15-4.75-4.19-4.9-4.39-.14-.19-1.15-1.53-1.15-2.92 0-1.38.73-2.06 1-2.35.24-.29.53-.34.72-.34.19 0 .38 0 .55.01.17.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.09 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
              </svg>
              <span className="t-label">WhatsApp&apos;tan yazın</span>
              <span className="sr-only">(yeni sekmede açılır)</span>
            </a>

            <a
              href={`tel:${SITE.phoneE164}`}
              className="t-display mt-5 block text-[1.35rem] tabular-nums no-underline opacity-90 transition-opacity hover:opacity-100 sm:text-[1.5rem]"
              style={{ fontVariationSettings: '"wdth" 108' }}
            >
              {SITE.phoneDisplay}
            </a>

            {/* ⚠️ `inline-block` + `mt-*` KULLANMA: iki bağlantı yan yana
                akıp "Instagramroketdijitalmedya@gmail.com" gibi tek kelime
                hâline geliyordu. Liste öğeleri blok seviyesinde. */}
            <ul className="m-0 mt-5 flex list-none flex-col gap-1.5 p-0">
              {isConfirmed(SITE.instagram) && (
                <li>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {SITE.instagramHandle}
                    <span className="sr-only"> — Instagram (yeni sekmede açılır)</span>
                  </a>
                </li>
              )}

              {isConfirmed(SITE.email) && (
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="footer-link break-all"
                  >
                    {SITE.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Corentia */}
          <div
            className="lg:col-span-2 lg:border-l lg:pl-5"
            style={{ borderColor: "var(--rule)" }}
          >
            <h2 className="t-label mb-6 opacity-55">Ürünümüz</h2>

            <a href="/corentia" className="corentia-cta text-[1.05rem]">
              {CORENTIA.name}
              <svg width="14" height="13" viewBox="0 0 16 14" fill="none" aria-hidden="true">
                <path
                  d="M1.5 7h12M9 1.5 14 7l-5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <p className="t-body mt-4 text-[0.85rem] opacity-65">
              {CORENTIA.summary}
            </p>
          </div>
        </div>

        {/* Yasal satır */}
        <hr className="rule mt-16 mb-6" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label m-0 opacity-45">
            © {year} {SITE.name}
          </p>
          <p className="t-label m-0 opacity-45">rodimedya.com</p>
        </div>
      </div>

      {/*
        KAPANIŞ KELİME MARKASI — sayfanın imzası.

        ⚠️ KIRPMA KALDIRILDI. Önceki sürüm harflerin alt ~%45'ini sayfa
        kenarında kesiyordu ("bleed" efekti). Kasıtlıydı ama iki kez
        "yarısı görünmüyor / bozuk" olarak okundu — yani efekt olarak
        değil, hata olarak algılanıyor. Tasarım niyeti izleyiciye
        ulaşmıyorsa niyet değil, hatadır. Artık tam görünüyor.

        ⚠️ BOYUT HESABI — değiştirmeden önce oku:
        `.shell` 88rem'de (1408px) sabitleniyor, iç genişlik ~1264px. Ama
        `vw` viewport'la büyümeye devam ediyor; 15.2vw ile 1920px ekranda
        yazı 1440px'e çıkıp kaptan taşıyordu. "Roket Medya" Archivo
        wdth 122'de ~6.1em geniş → 1264px için font-size ≤ 207px.
        9.5rem (152px) güvenli üst sınır.
      */}
      <div
        aria-hidden="true"
        className="shell overflow-hidden pb-6 sm:pb-8"
        style={{ fontSize: "clamp(1.9rem, 9.5vw, 9.5rem)" }}
      >
        {/*
          ⚠️ OKUNABİLİR OLMAMALI. Önceki sürümde "Medya" magenta %42
          opaklıktaydı ve net okunuyordu; tasarım öğesi değil, sayfanın
          altında unutulmuş bir metin gibi duruyordu. Amaç bir filigran
          dokusu — göz onu bir yüzey olarak görmeli, okunacak bir satır
          olarak değil. Her iki parça da %8'e indirildi ve magenta
          bırakıldı: renk kontrastı okunabilirliği geri getiriyordu.
        */}
        <span className="block whitespace-nowrap leading-[1.05]">
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "0.92em",
              color: "color-mix(in srgb, var(--color-cream) 8%, transparent)",
            }}
          >
            Roket
          </span>{" "}
          <span
            className="t-display"
            style={{
              fontSize: "1em",
              fontWeight: 900,
              fontVariationSettings: '"wdth" 122',
              color: "color-mix(in srgb, var(--color-cream) 8%, transparent)",
            }}
          >
            Medya
          </span>
        </span>
      </div>
    </footer>
  );
}
