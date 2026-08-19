/**
 * Site metinleri — tek gerçek kaynak.
 *
 * Ses tonu: markanın kendi Instagram dili. Kısa, net, biraz oyuncu, iddialı ama
 * abartmayan. Kurumsal-boş cümle yok ("çözüm ortağınız", "360 derece" vb. YASAK).
 *
 * ⚠️ DÜRÜSTLÜK KURALI (BRIEF §7.1): Gerçek müşteri işi yok. Hiçbir yerde
 * uydurma müşteri adı, sahte metrik veya hayali sonuç geçmez.
 */

/* ========================================================================
   HERO
   ===================================================================== */

export const HERO = {
  label: "Dijital Medya Ajansı",
  /** SplitText karakter animasyonu bu üç satır üzerinde çalışır. */
  lines: ["Değişik", "fikirlerimiz", "var"],
  lede:
    "Sosyal medyadan web sitesine, reklamdan yapay zekâya — markanızı " +
    "dijitalde görünür kılıyoruz.",
  cta: "Konuşalım",
} as const;

/* ========================================================================
   MANİFESTO — scroll'la kelime kelime aydınlanır
   ===================================================================== */

export const MANIFESTO = {
  label: "Neden biz",
  /** Kelime kelime bölünüp opaklığı scroll'a bağlanacak. */
  text:
    "Aynı şablonlar, aynı sözler, aynı görseller. Herkes birbirinin kopyası. " +
    "Biz sıkıcı olanı reddediyoruz. Markanızın söyleyecek bir şeyi var — " +
    "işimiz onu duyulur hale getirmek.",
  footnote: "Kısacası: değişik fikirlerimiz var. Ve işe yarıyorlar.",
} as const;

/* ========================================================================
   HİZMETLER
   ⚠️ Numaralandırma YOK (BRIEF §6.5) — bu paralel bir liste, sıra değil.
   ===================================================================== */

export type Service = {
  slug: string;
  title: string;
  summary: string;
  items: string[];
  image: string;
};

export const SERVICES: Service[] = [
  {
    slug: "sosyal-medya",
    title: "Sosyal Medya Yönetimi",
    summary:
      "Hesabınızı düzenli, tutarlı ve gerçekten izlenen bir yayın akışına çeviriyoruz.",
    items: ["İçerik planı", "Tasarım ve metin", "Topluluk yönetimi", "Paylaşım zamanlaması"],
    image: "/img/hizmet/11-sosyal-medya.jpg",
  },
  {
    slug: "web-tasarim",
    title: "Web Tasarım & Geliştirme",
    summary:
      "Hızlı açılan, mobilde çalışan, Google'ın bulduğu siteler. Şablon değil, size özel.",
    items: ["Kurumsal site", "Landing page", "Teknik SEO", "Hız optimizasyonu"],
    image: "/img/hizmet/12-web-tasarim.jpg",
  },
  {
    slug: "eticaret",
    title: "E-ticaret",
    summary:
      "Ürünlerinizi vitrine koymak yetmiyor — satan bir mağaza kuruyoruz.",
    items: ["Mağaza kurulumu", "Ürün görselleri", "Ödeme ve kargo", "Dönüşüm iyileştirme"],
    image: "/img/hizmet/13-eticaret.jpg",
  },
  {
    slug: "reklam",
    title: "Dijital Pazarlama & Reklam",
    summary:
      "Bütçeyi harcamak kolay. Biz nereye, neden ve ne kadar harcadığımızı gösteriyoruz.",
    items: ["Meta ve Google reklamları", "Rakip analizi", "Hedef kitle", "Raporlama"],
    image: "/img/hizmet/14-pazarlama.jpg",
  },
  {
    slug: "marka-icerik",
    title: "Marka & İçerik Üretimi",
    summary:
      "Logo, renk, ses tonu, görsel dil — markanızı tanınır kılan her şey.",
    items: ["Marka kimliği", "Grafik tasarım", "Fotoğraf ve video", "Kampanya içerikleri"],
    image: "/img/hizmet/15-marka-icerik.jpg",
  },
  {
    slug: "yapay-zeka",
    title: "Yapay Zekâ & Otomasyon",
    summary:
      "Tekrar eden işleri yazılıma devrediyoruz. Kendi ürünümüzü de böyle geliştirdik.",
    items: ["WhatsApp asistanı", "Müşteri takibi", "Otomatik yanıtlar", "Randevu akışı"],
    image: "/img/hizmet/16-ai-otomasyon.jpg",
  },
];

/* ========================================================================
   İSTATİSTİK
   ⚠️ Bunlar PAZAR verisi — Rodi Medya'nın performans iddiası DEĞİL.
   Kaynak markanın kendi Instagram postundan (Gemius Türkiye).
   Sahte başarı metriği asla eklenmeyecek.
   ===================================================================== */

export const STATS = {
  label: "Neden dijital",
  title: "Rakamlar zaten söylüyor",
  source: "Kaynak: Gemius Türkiye",
  items: [
    {
      value: 59,
      suffix: " mn",
      caption: "Türkiye'de internet kullanıcısı",
    },
    {
      value: 55.8,
      suffix: " mn",
      caption: "E-ticaret kullanan kişi",
    },
    {
      value: 9.5,
      suffix: " saat",
      caption: "Ayda e-ticaret sitelerinde geçen ortalama süre",
    },
  ],
} as const;

/* ========================================================================
   İÇERİK ÜRETİMİ
   ⚠️ BRIEF §7.1 — bunlar Rodi Medya'nın KENDİ ürettiği içerikler.
   "Müşteri projesi" / "vaka çalışması" olarak ETİKETLENMEYECEK.
   ===================================================================== */

export const WORK = {
  label: "Tasarım dilimiz",
  title: "Ürettiğimiz işler",
  lede:
    "Kendi kanallarımız için hazırladığımız içeriklerden bir seçki. " +
    "Aynı özeni markanız için de gösteriyoruz.",
  items: [
    { src: "/img/icerik/08-degisik-fikirler.jpg", alt: "Sarı zeminde el ile tutulan pizza dilimi ve 'Değişik fikirlerimiz var' başlığı" },
    { src: "/img/icerik/02-sosyal-medya-ucuyor.jpg", alt: "Karatahtaya tebeşirle çizilmiş yükselen roketler ve 'Sosyal medya uçuyor' başlığı" },
    { src: "/img/icerik/07-eticaret-istatistik.jpg", alt: "Sarı zeminde büyük punto ile Türkiye e-ticaret kullanım istatistikleri" },
    { src: "/img/icerik/05-satisa-odaklan.jpg", alt: "Siyah beyaz bilek güreşi fotoğrafı üzerinde sarı blokta 'Satışa odaklanın' başlığı" },
    { src: "/img/icerik/09-daha-fazla-takipci.jpg", alt: "Açık gri zeminde sarı paralelkenar ve imleç grafiğiyle takipçi artırma başlığı" },
    { src: "/img/icerik/01-web-sitesi.jpg", alt: "Tablet ekranından çıkan alışveriş sepeti ve poşetlerle web sitesi tanıtım görseli" },
    { src: "/img/icerik/04-hesap-guvenligi.jpg", alt: "Hesap güvenliği için iki faktörlü doğrulama anlatan bilgilendirme görseli" },
    { src: "/img/icerik/06-farki-fark-edin.jpg", alt: "Masaüstünde not kağıdı üzerinde el yazısı ile 'Hemen farkı fark edin' başlığı" },
    { src: "/img/icerik/03-paylasim-saati.jpg", alt: "Telefon çerçevesi ve etkileşim ikonlarıyla paylaşım saati optimizasyonu görseli" },
  ],
} as const;

/* ========================================================================
   SÜREÇ — ✅ burada numaralandırma DOĞRU, gerçek bir sıra
   ===================================================================== */

export const PROCESS = {
  label: "Nasıl çalışıyoruz",
  title: "Dört adım, sürpriz yok",
  steps: [
    {
      title: "Dinliyoruz",
      body: "İşinizi, müşterinizi ve bütçenizi anlıyoruz. Önce sorular, sonra teklif.",
      image: "/img/surec/17-adim-1.jpg",
    },
    {
      title: "Planlıyoruz",
      body: "Ne yapacağımızı, ne zaman ve neden yapacağımızı yazılı olarak veriyoruz.",
      image: "/img/surec/18-adim-2.jpg",
    },
    {
      title: "Üretiyoruz",
      body: "Tasarım, metin, kod — hepsi bizde. Onayınız olmadan hiçbir şey yayına girmiyor.",
      image: "/img/surec/19-adim-3.jpg",
    },
    {
      title: "Ölçüyoruz",
      body: "Neyin işe yaradığını rakamlarla gösteriyoruz. İşe yaramayanı değiştiriyoruz.",
      image: "/img/surec/20-adim-4.jpg",
    },
  ],
} as const;

/* ========================================================================
   SIKÇA SORULANLAR
   Yapı ilhamı: taismo.de (kullanıcı referansı). Metin tamamen bize özgü.
   Rakiplerin metriklerini/rozetlerini KOPYALAMADIK — bizde yok.
   Buradaki her cevap doğrulanabilir ve dürüst.

   SEO/AEO notu: FAQPage schema ekleniyor (app/page.tsx). Yapay zekâ arama
   motorları bu formatı kaynak olarak alıntılamayı seviyor.
   ===================================================================== */

export const FAQ = {
  label: "Sıkça sorulanlar",
  title: "Merak ettikleriniz",
  items: [
    {
      q: "Yeni bir ajanssınız. Neden sizi seçeyim?",
      a:
        "Haklı bir soru. Uzun bir müşteri listemiz yok — bunu saklamıyoruz. " +
        "Karşılığında aldığınız şey şu: işinizi ajansın en kıdemsiz kişisine " +
        "devretmiyoruz, telefonu açan kişi işi yapan kişi oluyor ve küçük " +
        "olduğumuz için hızlı hareket ediyoruz. Büyük ajansta sıranızı " +
        "beklersiniz; bizde beklemezsiniz.",
    },
    {
      q: "Ne kadar sürede sonuç alırım?",
      a:
        "Yaptığımız işe göre değişir. Sosyal medyada düzenli yayına geçtikten " +
        "sonra ilk hareketi genelde 4–6 haftada görürsünüz. Web sitesi ve SEO " +
        "tarafında Google'ın siteyi yeniden değerlendirmesi 3 ayı bulabilir. " +
        "Reklamda ise ilk gün veri gelmeye başlar. Size gerçekçi olmayan bir " +
        "tarih vermeyiz.",
    },
    {
      q: "Uzun süreli sözleşme imzalamak zorunda mıyım?",
      a:
        "Hayır. Aylık çalışıyoruz, istediğiniz ay bırakabilirsiniz. " +
        "Sizi sözleşmeyle değil işin sonucuyla tutmayı tercih ediyoruz.",
    },
    {
      q: "Fiyatlarınız ne kadar?",
      a:
        "Hazır paketimiz yok. Sosyal medya yönetimi, tek sayfalık site ve " +
        "e-ticaret kurulumu çok farklı işler — hepsine tek fiyat vermek " +
        "dürüst olmaz. Ne istediğinizi konuşalım, net bir teklif çıkaralım.",
    },
    {
      q: "Kimlerle çalışıyorsunuz?",
      a:
        "Küçük ve orta ölçekli işletmeler: yerel hizmet veren firmalar, " +
        "mağazalar, restoranlar, emlak ofisleri, oteller. Dijitalde yeni " +
        "başlayan ya da mevcut düzeninden memnun olmayan markalar.",
    },
    {
      q: "Sadece tek bir hizmet alabilir miyim?",
      a:
        "Tabii. Sadece web sitesi de yaptırabilirsiniz, sadece sosyal medya " +
        "yönetimi de alabilirsiniz. Hepsini birden almanız için baskı yapmayız.",
    },
  ],
} as const;

/* ========================================================================
   CORENTIA — ana sayfadaki KISA özet (bkz. CORENTIA_PAGE, ayrıntılı sayfa)
   ===================================================================== */

export const CORENTIA_TEASER = {
  label: "Kendi ürünümüz",
  title: "Yazılımı da\nbiz yazıyoruz",
  body:
    "Corentia, WhatsApp üzerinden çalışan otonom satış asistanımız. " +
    "Gelen mesajları 7/24 karşılıyor, randevu açıyor, müşteriyi kaçırmıyor.",
  cta: "Corentia'yı incele",
} as const;

/* ========================================================================
   CORENTIA — ayrı sayfa (/corentia)

   ⚠️ FİYAT BİLGİSİ BİLİNÇLİ OLARAK YOK.
   BRIEF §3.1'de fiyatların sitede gösterilmemesi kararlaştırıldı. O karar
   Corentia ana sayfada tek bölümken alınmıştı; ayrı sayfa açılınca da
   korunuyor çünkü paket fiyatı vermek "önce ihtiyacı konuşalım"
   yaklaşımıyla çelişiyor. Kullanıcı isterse eklenebilir — veriler
   BRIEF §3'te duruyor.
   ===================================================================== */

export const CORENTIA_PAGE = {
  eyebrow: "Rodi Medya ürünü",
  title: "Otonom satış gücü",
  lede:
    "WhatsApp'tan gelen her mesaja saniyeler içinde, doğru bilgiyle yanıt " +
    "veren bir asistan. Uyumaz, unutmaz, müşteriyi bekletmez.",

  /** Doğrulanabilir tek iddia — abartma yok. */
  claim: {
    headline: "Mesaj yükünü %90 azaltıyor",
    body:
      "Sık sorulan soruların neredeyse tamamını asistan karşılıyor. Siz " +
      "yalnızca gerçekten sizi gerektiren konuşmalara giriyorsunuz.",
  },

  sectors: [
    { name: "Emlak ofisleri", note: "Portföy eşleştirme, randevu, itiraz karşılama" },
    { name: "Günlük kiralık", note: "Müsaitlik, fiyat, check-in bilgileri" },
    { name: "Yurt & apart", note: "Oda tipi, kontenjan, veli soruları" },
    { name: "Otel & pansiyon", note: "Rezervasyon, konum, olanaklar" },
  ],

  features: [
    {
      title: "İhtiyacı anlıyor",
      body:
        "Anahtar kelime eşleştirmiyor. \"Üniversiteye yakın, bütçem kısıtlı\" " +
        "cümlesinden ne aradığınızı çıkarıyor.",
    },
    {
      title: "Konumu biliyor",
      body:
        "Harita zekâsıyla mesafeyi hesaplıyor, portföyü müşterinin " +
        "bulunduğu yere göre sıralıyor.",
    },
    {
      title: "Emin değilse soruyor",
      body:
        "Güven skoru düşük sorular size düşüyor. Siz cevaplıyorsunuz, " +
        "asistan öğreniyor ve bir daha sormuyor.",
    },
    {
      title: "Takvimi yönetiyor",
      body:
        "Randevuyu takvime yazıyor, çifte rezervasyonu engelliyor, " +
        "hatırlatmayı kendisi gönderiyor.",
    },
    {
      title: "İtirazı karşılıyor",
      body:
        "\"Pahalı\" veya \"uzak\" denince konuşmayı bitirmiyor — uygun " +
        "alternatifi öneriyor.",
    },
    {
      title: "40+ dil",
      body:
        "Turist müşteri kendi dilinde yazıyor, kendi dilinde yanıt alıyor. " +
        "Sizin bir şey yapmanız gerekmiyor.",
    },
  ],

  /** Ürünün en ayırt edici yanı — sayfanın merkezi. */
  learning: {
    label: "Türkiye'de ilk",
    title: "Düzelttikçe öğrenen asistan",
    body:
      "Asistan yanlış ya da eksik bir cevap verdiğinde tek tıkla " +
      "düzeltiyorsunuz. Düzeltme kayda geçiyor ve aynı soru bir daha " +
      "yanlış yanıtlanmıyor. Her hafta biraz daha sizin gibi konuşuyor.",
  },

  cta: {
    title: "İşinize uyar mı, konuşalım",
    body:
      "Sektörünüze göre nasıl kurulacağını anlatalım. Bağlayıcı bir şey yok.",
  },
} as const;

/* ========================================================================
   İLETİŞİM — ⚠️ FORM YOK (BRIEF §13). Doğrudan aksiyon.
   ===================================================================== */

export const CONTACT = {
  label: "İletişim",
  title: "Bir fikriniz mi var",
  lede:
    "Kısa bir konuşma çoğu şeyi netleştirir. WhatsApp'tan yazın, aynı gün dönelim.",
  /** Dürüst, doğrulanabilir konumlandırma. Uydurma rozet/metrik YOK. */
  promises: [
    "Aylık çalışma, uzun sözleşme yok",
    "İşi yapan kişiyle doğrudan konuşursunuz",
    "Hazır paket değil, işe özel teklif",
  ],
} as const;
