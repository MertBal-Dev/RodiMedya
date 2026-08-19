import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, Kaushan_Script } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

/**
 * DISPLAY — Archivo (variable, wght 100–900 + wdth 62–125)
 *
 * ⚠️ Anybody'den DEĞİŞTİRİLDİ. Anybody wdth 150'ye çıkıyordu ve teknik olarak
 * markanın geniş-kalın posterlerine daha yakın görünüyordu, ama ekranda
 * eksantrik harf formları (Ğ, R, S) "edgy olmaya çalışan ücretsiz font" gibi
 * okunuyordu — profesyonel değil. Marka ciddi bir ajans, tuhaf bir label değil.
 *
 * Archivo grotesk geleneğinden gelen temiz, mühendislik ürünü bir aile;
 * Black + Expanded ekseninde poster gücü veriyor ama harf formları kusursuz
 * duruyor. Markanın kendi Montserrat ExtraBold'una da en yakın akraba.
 *
 * `wdth` ekseni açıkça isteniyor — yoksa .t-display'deki
 * font-variation-settings sessizce hiçbir şey yapmaz.
 */
const display = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-display-src",
  display: "swap",
});

/**
 * GÖVDE — Instrument Sans
 *
 * Nötr ama soğuk değil; uzun metinde yorulmuyor ve display'in karakterini
 * bastırmıyor. Inter bilinçli olarak elendi: herkesin varsayılanı, sayfayı
 * şablon gibi gösteriyor.
 *
 * Her iki font da latin-ext taşıyor → Türkçe ğ Ğ ı İ ş Ş ç Ç ö Ö ü Ü sorunsuz.
 */
const body = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-src",
  display: "swap",
});

/**
 * AKSAN — Kaushan Script (fırça el yazısı)
 *
 * NEDEN VAR: Kartvizitin ana marka işareti beyaz FIRÇA EL YAZISI "Roket" +
 * magenta kalın "MEDYA". İlk sürümde bunu "webfont ağırlığı eklemeyelim"
 * diye elemiştim; sonuç markanın oyuncu kimliğini taşımayan, tek ağırlıkta
 * ve ağır bir site oldu. El yazısı markanın kimliğinin parçası, süs değil.
 *
 * Ağırlığını hak etmesi için sadece logoda değil, bölüm aksanlarında ve
 * oyuncu anlarda da kullanılıyor.
 *
 * ⚠️ Türkçe için latin-ext ŞART (ğ Ğ ı İ ş Ş ç Ç ö Ö ü Ü). Bu font
 * varyant değil, tek ağırlık (400) — script fontlar öyle.
 */
const script = Kaushan_Script({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-script-src",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F2B01E",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Dijital Medya Ajansı`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "dijital medya ajansı",
    "sosyal medya yönetimi",
    "web tasarım",
    "e-ticaret",
    "dijital pazarlama",
    "içerik üretimi",
    "Rodi Medya",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Dijital Medya Ajansı`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Dijital Medya Ajansı`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/**
 * schema.org — Organization + LocalBusiness birlikte.
 * Ajans yerel hizmet veriyor, ikisi de doğru sinyal.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  slogan: SITE.slogan,
  telephone: SITE.phoneE164,
  areaServed: { "@type": "Country", name: "Türkiye" },
  knowsLanguage: ["tr"],
  sameAs: [SITE.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${display.variable} ${body.variable} ${script.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // Kendi ürettiğimiz sabit veri — kullanıcı girdisi yok.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip-link" href="#icerik">
          İçeriğe geç
        </a>
        {children}
      </body>
    </html>
  );
}
