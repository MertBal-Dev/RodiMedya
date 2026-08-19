# RODİ MEDYA — WEBSITE BUILD BRIEF
> **Yeni session'da ilk komut:** "BRIEF.md'yi oku ve başla."
> Bu dosya kendi kendine yeterlidir. Tüm marka analizi, stack kararı, tasarım yönü
> ve sonraki adımlar burada. Hiçbir önceki konuşmaya ihtiyaç yok.

---

## 0. RESTART SONRASI YAPILACAK İLK 4 ŞEY (sırayla)

1. **Skilleri yükle** (bu session'da artık erişilebilir olacaklar):
   `anthropic-frontend-design` · `ui-ux-pro-max` · `bencium-ux-designer` ·
   `vercel-web-design-guidelines` · `vercel-react-best-practices` · `accesslint-audit`
2. **`GORSEL-PROMPTLARI.md` üret** — §9'daki 6 prompt'u ~36'lık tam listeye genişlet
   (arka planlar · 6 hizmet kartı · süreç · eğlenceli konsept kartlar · doku/overlay · OG görseli).
   Ortak "stil çıpası" paragrafı olsun ki 36 görsel tek sistem gibi dursun.
   **Kullanıcı bunları üretmeye hemen başlayabilsin diye bu İLK sırada** — o üretirken sen inşa edersin.
3. **Bu brief'in 5–9. bölümlerini** skillerin rehberliğiyle gözden geçir, gerekiyorsa keskinleştir.
4. **`RODIMEDYA-BUILD-PROMPT.txt` üret** — `PROMPT.txt` formatında (PART A/B/C/D),
   ama içerik Rodi Medya sitesini anlatacak. Sonra o promptla siteyi inşa et.

> **Görsel yokken de başlanabilir:** placeholder olarak düz renk (`--ink` / `--amber`)
> bloklar kullan, `next/image` yolları baştan doğru yaz, görseller gelince sadece dosyalar düşer.
> Layout görsellere bağlı kalmasın.

---

## 1. GÖREV

Rodi Medya (dijital medya ajansı) için **2026 Awwwards kalitesinde** bir web sitesi.

- `Görseller/` klasöründeki marka materyalinden çıkarılan tema **korunacak** (renk, tipografi ruhu, roket motifi)
- Scroll-driven sinematik animasyonlar, yüksek tasarım kalitesi
- `corentia.com.tr` ürünü, Rodi Medya'nın **alt markası** olarak konumlandırılacak (Meta → Instagram ilişkisi)
- Arka planlarda AI üretimi görseller kullanılacak (prompt'lar §9'da)
- Hedef: ziyaretçi animasyonlara/tipografiye/tasarıma bakıp "bu ajans iyi" desin

**`PROMPT.txt` sadece FORMAT örneğidir** (havacılık temalı bir portfolyoyu anlatır, 2851 satır).
Ondan **yapı ve titizlik** alınacak, **içerik ve konsept alınmayacak**.

### PROMPT.txt'den çalınacaklar (kanıtlanmış iyi pratikler)
- **PART B — Bug listesi:** `Sebep → Fix → Verify` formatında, gerçekten yaşanmış hatalar
- **Birebir sayısal değerler** — "0.30", "scale 4", "z-index: 0". Yorum payı bırakma
- **NEDEN açıklamaları** — modelin "iyileştireyim" deyip bozmasını engeller
- **Çalıştırılabilir doğrulama adımları** — `document.elementsFromPoint(...)` gibi
- **Anti-doğaçlama dili** — "Do not invent features, do not redesign, do not improve values"

### PROMPT.txt'de OLMAYAN, bizim eklememiz gerekenler
- SEO + Türkçe i18n (İ/ı/ğ/ş/ö/ç → `latin-ext` subset zorunlu)
- Gerçek çalışan iletişim formu + lead akışı (örnekteki form kasten sahte)
- Dönüşüm mimarisi (CTA hunisi)
- WCAG 2.1 AA geçişi
- Performans bütçesi
- Corentia alt-marka mimarisi

---

## 2. MARKA KİMLİĞİ (12 görselden analiz edildi)

### 2.1 Kimlik
- **Ana marka:** RODİ MEDYA · domain **`rodimedya.com`** ✅ (onaylandı)
- **İçeriklerde geçen alternatif:** "ROKET MEDYA" / "ROKET DİJİTAL MEDYA"
- **ANA SLOGAN:** **"DEĞİŞİK FİKİRLERİMİZ VAR"** ← kartvizit + postlarda tekrar eden imza
- **İkincil:** "HAREKETE GEÇİN!" · "SOSYAL MEDYA UÇUYOR" · "Denemekten korkmayın!"
- **Telefon:** +90 544 601 24 18
- **Hashtag:** #DİJİTALPAZARLAMA #SOSYALMEDYA #İLETİŞİM

**KİŞİ/EKİP BÖLÜMÜ: v1'de YOK.** ✅ (karar verildi)
Kartvizitteki "Şenol Çengel" sitede geçmeyecek. İleride bir ekip bölümü eklenirse
**ikisi birden** olmalı: Mert Bal (AI Engineer · Founder, Corentia) + Şenol Çengel
(Digital Media Specialist). Tek kişiyi öne çıkarma.

### 2.2 Logo varyantları (3 farklı — sitede birleştirilecek)
| # | Logo | Tanım |
|---|------|-------|
| A | Roket + MEDYA | Amber zemin · beyaz **el yazısı brush** "Roket" · magenta kalın "MEDYA" · beyaz roket ikonu |
| B | Roket Dijital Medya | Ampul+dişli ikon · 3 satır · R-D-M harfleri amber vurgulu |
| C | **RODİ MEDYA** | Altın **"V" chevron** + "RODİ MEDYA" + "DEĞİŞİK FİKİRLERİMİZ VAR" |

**KARAR:** Sitede **C (RODİ MEDYA + V chevron)** ana logo. Roket motifi literal ikon olarak değil,
**hareket metaforu** olarak yaşayacak (scroll'u takip eden çizilen vektör iz, ivme, yükseliş).

### 2.3 RENK PALETİ (görsellerden örneklendi)
```css
--ink          #0B0B0C   /* ana zemin — near-black */
--ink-soft     #141416   /* kart/panel yüzeyi */
--amber        #F2B01E   /* ANA MARKA RENGİ — kartvizit + tüm postlar */
--amber-lit    #FFC12E   /* hover / parlama */
--amber-deep   #C98F14   /* basılı / gölge */
--magenta      #B23A8E   /* logo "MEDYA" — ikincil aksan, AZ kullan */
--coral        #E23B2E   /* enerji aksanı — uyarı, vurgu */
--cream        #F5F2EC   /* açık yüzey (kağıt tonu) */
--white        #FFFFFF
--corentia     #2563EB   /* alt marka mavisi — SADECE Corentia bölümünde */
```
**Dominant kombinasyon:** Amber + near-black + white. Magenta/coral çok sınırlı aksan.

### 2.4 TİPOGRAFİ
**Gözlemlenen:** Ağır geometrik sans UPPERCASE başlıklar (Montserrat/Poppins ExtraBold ailesi),
geometrik sans gövde, el yazısı brush aksan, geniş letter-spacing'li mikro-etiketler (0.16–0.24em).

**KARAR:**
- **Display:** `Archivo` variable (wght 100–900 + wdth 62–125). Black+Expanded ekseni,
  markanın geniş-kalın posterlerini birebir verir ama Montserrat'tan daha editoryal karakterli.
  `latin-ext` ✓
- **Gövde/UI:** `Inter` variable — Türkçe render kalitesi en iyi, nötr, kişiliği Archivo taşır. `latin-ext` ✓
- **El yazısı "Roket":** webfont OLARAK YÜKLENMEYECEK — sadece **SVG logo asset'i** olarak kalır
  (logo sadakati korunur, font ağırlığı eklenmez)
- **Mikro-etiket deseni** korunacak: UPPERCASE · `letter-spacing: 0.2em` · küçük punto · düşük opaklık

> **ZORUNLU:** Tüm fontlar `subsets: ["latin", "latin-ext"]` ile yüklenecek.
> Türkçe İ/ı/ğ/ü/ş/ö/ç aksi halde bozulur. Bu load-bearing.

### 2.5 GÖRSEL DİL (postlardan çıkarılan desenler — sitede yaşayacak)
- **Eğik/açılı bloklar** — sarı paralelkenar şeritler, skew'li siyah etiket bantları
- **Highlighter blok** — metnin arkasında dolu renk dikdörtgen ("DİJİTAL" siyah blokta)
- **Chalk/tebeşir estetiği** — karatahtaya roket çizimi (el yapımı, organik his)
- **Devasa rakam tipografisi** — "59" gibi, istatistik anlatımı
- **Sosyal medya UI öğeleri** — kalp/beğeni baloncukları, LIVE badge, 10K badge, telefon çerçevesi
- **Yüksek kontrastlı obje fotoğrafı** — sarı zeminde el/nesne, dramatik gölge
- **B&W fotoğraf + sarı blok overlay**
- **Dokular** — nokta grid, ince çizgi daireler, kağıt/grain

---

## 3. CORENTIA (Alt Ürün)

**Ne:** AI destekli WhatsApp iş asistanı + CRM (Türkiye pazarı)
**Slogan:** "Otonom Satış Gücü" · "7/24 WhatsApp'tan Gelen Müşterilerinizi Kaçırmayan Akıllı Asistanınız"
**Değer önerisi:** "Mesaj yükünü %90 azaltan profesyonel dijital asistan"
**Benzersiz iddia:** **"Türkiye'de İlk"** — tek tıkla düzeltmeyle öğrenen bot (learning center audit log)

**Sektörler:** Emlak · Günlük kiralık (villa/daire) · Yurt & apart · Otel & pansiyon

**Özellikler:** 7/24 AI yanıt (ihtiyaç bazlı anlama, keyword değil) · harita zekâsıyla konum bazlı
portföy eşleştirme · düşük güven skorlu soru → kullanıcı onayı → bot öğrenir · müşteri profiline
göre (öğrenci/aile/turist) bağlamsal sunum · itiraz karşılama · takvim senkronu + otomatik randevu
(çifte rezervasyon engeli) · CRM segmentasyon · proaktif mesaj (check-in, anket, ödeme hatırlatma) ·
40+ dil

**Fiyatlar (aylık):** Emlak 4.500₺ (6 modül) · Günlük Kiralık 5.500₺ (9) ·
Yurt & Apart 7.500₺ (9) · Otel & Pansiyon 8.000₺ (9)
Yıllık: ~%31–33 indirim + **ücretsiz profesyonel web sitesi** + lokal SEO

**Mevcut sitesi (referans, TAKLİT EDİLMEYECEK):** mavi-beyaz, temiz sans, minimal kart tabanlı

### ⚠️ 3.1 CORENTIA KAPSAMI — KÜÇÜLTÜLDÜ (kullanıcı kararı)
✅ "Bunu sitede göstermeyi istemiyorum, sadece kısa bahsedilebilir. Ekran görüntüsüne
gerek yok. **Site Rodi Medya'yı tanıtacak, Corentia'yı değil.**"

**Bu ne demek:**
- ❌ `/corentia` sayfası YOK
- ❌ Dashboard / ürün ekran görüntüsü YOK
- ❌ Fiyat tablosu YOK (yukarıdaki fiyatlar sadece bağlam bilgisi, sitede görünmeyecek)
- ❌ Özellik listesi YOK
- ✅ **TEK kompakt bölüm** — 1 ekran, en fazla 2
- ✅ Amaç: Rodi Medya'nın *kredibilitesi* ("biz sadece pazarlama yapmıyoruz, AI ürünü de
  geliştiriyoruz") — Corentia'yı satmak değil
- ✅ Dış link → `corentia.com.tr` (yeni sekme)
- ✅ Mavi (`--corentia #2563EB`) kısa bir **aksan anı** olarak kalır; tam bölüm boyu
  renk kayması artık AŞIRI — kısa ve keskin tutulacak

**Bölümde geçecek mesaj (yaklaşık):** "Kendi yapay zekâ ürünümüzü geliştiriyoruz.
Corentia, WhatsApp üzerinden çalışan otonom satış asistanı." + link. Bu kadar.

---

## 4. RODİ MEDYA HİZMETLERİ
1. **Sosyal Medya Yönetimi** — içerik üretimi, topluluk yönetimi, paylaşım saati optimizasyonu
2. **Web Sitesi Tasarım & Geliştirme** — "prestij ve güvenilirlik artar, ciro artar"
3. **E-ticaret Çözümleri** — "e-ticaret geleneksel ticaretten çok daha karlı"
4. **Dijital Pazarlama & Reklam** — rakip analizi, bütçe yönetimi, satış odaklılık
5. **Marka Bilinirliği & İçerik Üretimi** — grafik tasarım, kampanya içerikleri
6. **AI & Otomasyon → Corentia** — WhatsApp AI asistan, CRM

---

## 5. STACK KARARI (npm'den doğrulanmış — Ağustos 2026)

```jsonc
{
  "next":        "16.3.1",   // App Router, Turbopack, RSC
  "react":       "19.2.8",
  "typescript":  "7.0.2",    // Go tabanlı derleyici, Next 16.3 ile hızlı type-check
  "gsap":        "3.15.0",   // ANİMASYON ÇEKİRDEĞİ
  "lenis":       "1.3.26",   // smooth scroll
  "motion":      "13.1.0",   // DAR KAPSAM — bkz. kural
  "tailwindcss": "4.3.3"     // v4, CSS-first config
}
```

### 5.1 Neden GSAP (Framer Motion değil)
**Nisan 2025'te Webflow, GSAP'ı tüm premium eklentileriyle ücretsizleştirdi** (ticari kullanım dahil).
Bu, "Framer Motion daha erişilebilir" argümanını ortadan kaldırdı. Artık bedava olan ve
Framer Motion'da **karşılığı olmayan** eklentiler:

| Plugin | Ne yapar | Bizde nerede |
|---|---|---|
| **ScrollTrigger** | pin / scrub / snap | Tüm scroll sahneleri |
| **SplitText** | karakter-kelime-satır bölme | Başlık açılımları (imza hareket) |
| **DrawSVG** | SVG path çizdirme | V chevron + roket izi |
| **MorphSVG** | şekil dönüştürme | Logo geçişleri |
| **MotionPath** | eğri üzerinde hareket | Roket yörüngesi |
| **Flip** | layout geçişi | Bölümler arası öğe taşıma |

ScrollTrigger'ın pin/scrub kalitesine hiçbir React animasyon kütüphanesi yaklaşmıyor.
Ayrıca imperative çalıştığı için **scroll yolunda React reconciliation olmaz** — performans farkı büyük.

### 5.2 Motion'ın DAR rolü
Motion 13 **sadece** şunlar için:
- `AnimatePresence` → sayfa/route geçişleri, modal & menü giriş-çıkışı
- Component mount/unmount animasyonları
- Hover/tap jest mikro-etkileşimleri (magnetic button vb.)

> **DEMİR KURAL:** Scroll = GSAP. Component yaşam döngüsü = Motion.
> **Aynı property'yi iki kütüphane birden ASLA animate etmez.** Bu kural bozulursa
> jitter ve öngörülemez davranış çıkar — build promptunda BUG olarak yazılacak.

### 5.3 Neden Next.js (Vite değil)
- **SEO şart** — ajans sitesi Google'da "dijital ajans" aramalarında çıkmalı → SSR/SSG
- **`/corentia` alt sayfası** + gelecekte blog → App Router routing
- **Türkçe metadata, OG görselleri, schema.org** → Next metadata API
- **Görsel optimizasyonu** — AI arka planlar ağır olacak, `next/image` AVIF/WebP + boyutlandırma şart
- Vite tek sayfalık SPA için iyi olurdu; bizim durumumuz o değil

### 5.4 WebGL kararı
**En fazla 1 WebGL context.** (Örnek PROMPT.txt'de 3 tane var — OGL + three + cobe — bu bir ajans
sitesi için gereksiz ağırlık ve mobilde risk.)
Tercih: WebGL'i tamamen atla, "wow" etkisini **CSS/SVG/Canvas2D + GSAP** ile yakala.
Eğer bir yerde WebGL kullanılacaksa: sadece proje görsellerinde hover distortion, `IntersectionObserver`
ile lazy mount, `prefers-reduced-motion`'da hiç mount etme.

---

## 6. TASARIM YÖNÜ — KONSEPT: **"İVME"** · AMBER-BASKIN

> ⚠️ **BU BÖLÜM REVİZE EDİLDİ.** İlk versiyonu near-black baskın önermişti — bu hem
> AI tasarımının en bilinen kalıbıydı hem de markayı ters çeviriyordu. Gerekçe §6.0'da.

### 6.0 Neden amber-baskın (karar gerekçesi — DEĞİŞTİRME)
`anthropic-frontend-design` skill'i, AI üretimi tasarımların üç kalıba sıkıştığını söylüyor;
bunlardan biri **"near-black zemin + tek parlak aksan"**. İlk konseptimiz tam olarak buydu
(#0B0B0C + tek amber aksan) — yani "özgün" sandığımız şey aslında varsayılandı.

Dahası markaya aykırıydı. 12 marka görselinin **10'unda baskın yüzey amber**; siyah orada
zemin değil **mürekkep**. Kartvizit amber. Logo amber. "DEĞİŞİK FİKİRLERİMİZ VAR" amber.
"59 milyon" amber. Sadece karatahta postu koyu. Kullanıcı "temayı koruyarak" dedi —
koyu-baskın site temayı korumaz, ters çevirir.

Ayrıca amber-baskın **web'de gerçekten nadir**. Koyu ajans sitesi her yerde; kendinden emin,
tam kanama altın sarısı bir site değil. Cesareti tek yerde harcama ilkesine de uyuyor.

✅ Kullanıcı onayladı.

### 6.1 Yüzey sistemi (üç kademe, bu sırayla)
| Rol | Renk | Kullanım |
|---|---|---|
| **BİRİNCİL — İmpact** | `--amber #F2B01E` | Hero, İstatistik, İletişim. Tam kanama. Metin **daima** `--ink` |
| **İKİNCİL — Okuma** | `--cream #F5F2EC` | Manifesto, Süreç. Uzun metin burada yaşar (amber'da göz yorulur) |
| **ÜÇÜNCÜL — Noktalama** | `--ink #0B0B0C` | Corentia + İçerik Üretimi. **Kısa ve dramatik.** Toplam scroll'un %25'ini geçme |

**Ritim:** `amber → krem → amber → ink → krem → amber`
Koyu yüzey artık *varsayılan* değil, **nadir ve bu yüzden etkili** bir noktalama işareti.

### 6.2 Tipografi-öncelikli
Görsel değil **tipografi taşır**. Devasa Archivo Black Expanded başlıklar, `line-height: 0.85–0.9`,
negatif letter-spacing. Amber üzerinde ağır siyah tipografi — markanın posterlerinin birebir dili.

### 6.3 Doku — kritik
Amber'ın "ucuz/indirim sarısı" gibi durmaması **tamamen dokuya bağlı.** Düz `#F2B01E` dolgu
ekranda ham ve dijital görünür. Amber **pigment gibi** okunmalı:
- Tüm amber yüzeylerde hafif **kağıt/kanvas dokusu** + grain (`opacity: 0.04–0.06`)
- Yandan gelen **sert ışık ve derin gölge** hissi (görsellerde fotografik olarak)
- Tek düz renk değil, çok hafif ton kayması (baskı mürekkebi düzensizliği)

> Bu load-bearing. Dokusuz amber = amatör. Dokulu amber = premium baskı hissi.

### 6.4 Kompozisyon dili (postlardan)
**Eğik bloklar** (skew'li amber/siyah şeritler) · **highlighter vurgu** (kelime arkasında dolu blok) ·
**devasa rakam tipografisi** · **yüksek kontrastlı obje fotoğrafı + dramatik gölge** ·
**B&W fotoğraf + amber blok overlay**

### 6.6 ⭐ İMZA ÖĞESİ — "HAREKET EDEN IŞIK" (load-bearing)
Skill ilkesi: *"Cesareti tek yerde harca. İmza öğesi akılda kalan tek şey olsun,
etrafındaki her şey sakin ve disiplinli kalsın."*

**Gözlem:** 12 marka görselinin tamamında **tek bir sert yan ışık ve uzun dramatik gölge** var.
Kartvizit, pizza postu, bilek güreşi, tablet postu — hepsi aynı fotoğrafik dil.

**Fikir:** Sayfaya gerçek bir ışık kaynağı koy. Pozisyonu **scroll'a bağlı**:
```
:root { --light-x: <scroll'a bağlı>; --light-y: <scroll'a bağlı>; }
```
Aşağı indikçe ışık yolculuk eder — sabah yan ışığı → tepe → alçak akşam → karanlık.
Yüzey ritmi (amber → krem → ink) bu ışık yolculuğuyla **aynı anda** olur, yani renk değişimi
keyfi değil *fiziksel* hissedilir. Tüm büyük öğeler gölgesini bu iki değişkenden türetir.

**Neden güçlü:** Sayfa tek bir fotoğraflanmış yüzey gibi okunur. Bu marka materyalinin
kendi dili — uydurma bir efekt değil, gözlemden çıkmış. "İVME" temasına da bağlı:
sen hareket ettiğin için ışık hareket ediyor.

**Performans kuralı (ZORUNLU):**
- Gölge `box-shadow` ile **değil**, `transform: translate()` uygulanmış pseudo-element ile
  yapılır. `box-shadow`/`filter` her frame repaint tetikler; `transform` compositor'da kalır.
- Dinamik gölge alan öğe sayısı **maksimum ~15** (hero tipografi, hizmet kartları, birkaç obje).
  Her şeye uygulama.
- `prefers-reduced-motion: reduce` → ışık sabitlenir (tek konumda durur), gölgeler kalır.

### 6.7 TİPOGRAFİ — KESİNLEŞTİ
| Rol | Font | Ayar |
|---|---|---|
| **Display** | `Archivo` variable | `wght 800–900` + `wdth 110–125` (Expanded Black). Hero UPPERCASE |
| **Gövde/UI** | `Instrument Sans` variable | Inter'den daha az jenerik, Türkçe render'ı temiz |
| **Mikro-etiket** | Archivo, küçük punto | UPPERCASE · `letter-spacing: 0.2em` |

`Inter` bilinçli olarak **elendi** — herkesin varsayılanı, sayfayı templated gösterir.
Her iki font da `subsets: ["latin","latin-ext"]` ile yüklenecek (Türkçe için ZORUNLU).

### 6.5 ⚠️ Numaralandırma kuralı (skill uyarısı)
"Structure is information" — numaralandırma sadece içerik **gerçekten bir sıraysa** kullanılır.
- ❌ **Hizmetler 01–06: NUMARALANDIRMA YOK.** 6 hizmet paralel bir liste, sıra taşımıyor.
  Numaralamak dekorasyon olur — jenerik AI tasarımının imzası.
- ✅ **Süreç bölümü: numaralandırma VAR.** Orası gerçek bir sıra (önce şu, sonra bu).

---

## 7. SİTE MİMARİSİ

### Route'lar
```
/            → TEK SAYFA, uzun scroll anlatısı
```
✅ **`/corentia` alt sayfası İPTAL** — kullanıcı kararı: "site Rodi Medya'yı tanıtacak,
Corentia'yı değil". Corentia tek bir kompakt bölüme indi, dış link `corentia.com.tr`'ye gider.
(Blog / hizmet detay sayfaları v2 — kapsam dışı.)

### Ana sayfa bölüm sırası (değiştirilemez)
| # | Bölüm | Amaç |
|---|---|---|
| 00 | **Preloader** | V chevron kendini çizer (DrawSVG) + sayaç 0→100 |
| 01 | **Hero** | "DEĞİŞİK FİKİRLERİMİZ VAR" — SplitText karakter açılımı, amber ışık sızması |
| 02 | **Manifesto** (pinned) | Scroll'la kelime kelime kurulan cümle |
| 03 | **Hizmetler** (pinned yatay) | 6 hizmet, numaralı editoryal satırlar, yatay scroll |
| 04 | **İstatistik** | Devasa sayılar (count-up) — "59 milyon" enerjisi |
| 05 | **İçerik Üretimi** | Gerçek Instagram postları — grid, clip-path reveal (⚠️ §7.1) |
| 06 | **Corentia** | KOMPAKT. Mavi aksan anı + dış link. Ekran görüntüsü YOK |
| 07 | **Süreç** | Nasıl çalışırız — 3–4 adım |
| 08 | **İletişim** | Amber sel zemin. **FORM YOK** — WhatsApp / telefon / e-posta CTA |
| 09 | **Footer** | Logo, iletişim, sosyal, telif |

### 7.1 ⚠️ "İçerik Üretimi" bölümü — DÜRÜSTLÜK KURALI
✅ Kullanıcı bildirdi: **gerçek müşteri işi yok**, yeni başlıyorlar.

Bu yüzden bu bölüm **ASLA** "müşteri projesi", "vaka çalışması", "case study" veya
"portfolyo" diye etiketlenmeyecek. Uydurma müşteri ismi, sahte metrik, hayali sonuç yazılmayacak.

**Doğru çerçeve:** `Görseller/` klasöründeki 12 Instagram postu Rodi Medya'nın **kendi**
ürettiği içeriklerdir — bu gerçek bir iş çıktısıdır. Bölüm başlığı:
**"İçerik Üretimi"** veya **"Tasarım Dilimiz"**. Alt metin: "Kendi kanallarımız için
ürettiğimiz içeriklerden bir seçki." Bu hem doğru hem etkileyici.

İleride gerçek müşteri işi geldiğinde bölüm "Çalışmalar"a dönüşebilir.

---

## 8. ANİMASYON KOREOGRAFİSİ — İMZA ANLAR

Bunlar sitenin "Awwwards" hissini taşıyan momentler. Build promptunda her biri
**birebir sayısal değerlerle** spec edilecek.

1. **Preloader** — V chevron `DrawSVG` ile 0→100% çizilir, eşzamanlı sayaç. Bitince
   chevron header'daki logo pozisyonuna `Flip` ile uçar. (Sayfa yüklenmesini bekletir, max 4sn.)
2. **Hero başlık** — `SplitText` karakter bazlı, `stagger: 0.02`, alttan yukarı + blur→net.
   Arkada amber radial ışık `scale` ile nefes alır.
3. **Manifesto pin** — 3 viewport pin, scroll ilerledikçe cümlenin kelimeleri
   düşük opaklıktan tam beyaza geçer (okuma ritmi hissi).
4. **Hizmetler yatay** — dikey scroll → yatay hareket dönüşümü (`ScrollTrigger` + `x`).
   Her kart girerken index numarası büyür.
5. **Corentia renk geçişi** — pinned bölümde `--accent` CSS değişkeni amber→mavi
   interpolasyonu. Zemin, metin, çizgiler hepsi birlikte kayar. **Sitenin imza anı.**
6. **Sayı sayacı** — `ScrollTrigger` tetikli, `snap: 1`, tabular-nums.
7. **Görsel reveal** — `clip-path: inset()` ile alttan açılım, `power3.out`.
8. **Magnetic cursor** — özel imleç, butonlara yaklaşınca çekim. (Touch cihazda kapalı.)
9. **Marquee şerit** — hizmet/hashtag ticker, sonsuz döngü, scroll yönüne tepki verir.
10. **Sayfa geçişi** — `/` ↔ `/corentia` arası Motion `AnimatePresence` ile amber perde.

**Zorunlu:** Her animasyon `prefers-reduced-motion: reduce` altında ya kapalı ya da
opacity-only fallback'e düşer. Hiçbir içerik animasyona bağlı olarak erişilemez kalmaz.

---

## 9. AI GÖRSEL PROMPTLARI (arka planlar için)

> Hepsi 16:9 veya 21:9, `next/image` ile AVIF'e çevrilecek. Marka paletine sadık kalmalı.

**A. Hero arka planı**
```
Abstract atmospheric background, deep near-black void (#0B0B0C) with a single warm amber
(#F2B01E) light source bleeding from lower center, volumetric haze, subtle upward motion
streaks suggesting acceleration, fine film grain, no objects, no text, cinematic,
high contrast, moody, 21:9 ultrawide, photographic depth of field
```

**B. Manifesto bölümü dokusu**
```
Extreme macro of black textured paper with faint gold foil particles catching light,
near-monochrome, deep shadows, amber specks scattered sparsely, tactile matte surface,
studio lighting from hard left angle, editorial print aesthetic, 16:9
```

**C. Hizmetler yatay şerit zemini**
```
Abstract geometric composition, sharp diagonal amber (#F2B01E) parallelogram bands
crossing a near-black field, hard-edged, flat vector-like but with subtle paper grain,
Swiss poster design influence, generous negative space, no text, 21:9
```

**D. Corentia bölümü (mavi kayma)**
```
Abstract digital communication visualization, deep navy to electric blue (#2563EB) gradient
field, floating translucent message-bubble geometry, soft glowing connection lines forming
a network, clean, calm, technological, subtle grain, no text, no logos, 16:9
```

**E. İletişim bölümü (amber sel)**
```
Full-frame warm amber (#F2B01E) surface with dramatic raking side light, subtle canvas
texture, deep soft shadow falling from upper right, minimal, tactile, no objects, no text,
photographic, 16:9
```

**F. Roket iz dokusu (opsiyonel overlay)**
```
Long-exposure light trail arcing upward through darkness, warm amber-gold streak, motion
blur, black background, minimal, abstract, single continuous curve, cinematic, 16:9
```

---

## 10. PERFORMANS & ERİŞİLEBİLİRLİK BÜTÇESİ (build promptunda hedef olarak yazılacak)

| Metrik | Hedef |
|---|---|
| LCP | < 2.0s (4G) |
| CLS | < 0.05 |
| INP | < 200ms |
| JS bundle (ilk yük) | < 250KB gzip |
| Lighthouse Performance | ≥ 90 mobil |
| Lighthouse Accessibility | ≥ 95 |
| WCAG | 2.1 AA |

**Erişilebilirlik zorunlulukları:**
- Tüm metin/zemin kontrast oranı ≥ 4.5:1 (amber üzerine beyaz metin **BAŞARISIZ** — amber üzerinde
  daima `--ink` kullan. Bu load-bearing, AccessLint ile doğrulanacak.)
- Klavye ile tam gezinilebilir, görünür `:focus-visible` halkası
- Tüm animasyonlar `prefers-reduced-motion` altında güvenli
- Form alanlarında gerçek `<label>`, hata mesajları `aria-live`
- Semantik başlık hiyerarşisi (h1 → h2 → h3, atlama yok)
- `lang="tr"` + doğru Türkçe `hreflang`

**SEO zorunlulukları:**
- Her route'ta Next `metadata` (title, description, OG, Twitter)
- `schema.org` → `Organization` + `LocalBusiness` + Corentia için `SoftwareApplication`
- `sitemap.ts` + `robots.ts`
- Türkçe anahtar kelimeler: "dijital medya ajansı", "sosyal medya yönetimi", "web tasarım"

---

## 11. KURULU SKİLLER (372 klasör — restart sonrası aktif)

**Bu proje için kritik:**
- `anthropic-frontend-design` — distinctive/production-grade UI
- `ui-ux-pro-max` — 50 stil, 97 palet, 9 stack
- `bencium-ux-designer` — kapsamlı UX, erişilebilirlik, responsive, motion spec
- `vercel-web-design-guidelines` — 100+ arayüz kuralı
- `vercel-react-best-practices` — React/Next.js performans (57 kural)
- `vercel-composition-patterns` — component mimarisi
- `accesslint-audit` / `-scan` / `-inspect` / `-fix` / `-diff` — WCAG 2.1 + kontrast
- `superpowers-*` (14) — brainstorming, planlama, verification
- +345 skill (alirezarezvani koleksiyonu)

---

## 12. DOSYA KONUMLARI

```
c:\Users\ZEYNEPVEDURU\Desktop\Rodi Medya\
├── BRIEF.md                    ← BU DOSYA (tek gerçek kaynak)
├── PROMPT.txt                  ← SADECE FORMAT örneği (2851 satır, başka bir siteyi anlatır)
├── Görseller\                  ← 12 marka görseli
│   ├── WhatsApp Image ...00.56.27.jpeg  → kartvizit ÖN (logo + iletişim)
│   ├── WhatsApp Image ...00.56.49.jpeg  → kartvizit ARKA (Instagram, hashtag)
│   ├── 277364007_...jpg                 → LOGO (Roket + MEDYA, amber zemin)
│   ├── 616292809_...jpg                 → post: web sitesi tanıtımı (tablet + e-ticaret)
│   ├── 620865212_...jpg                 → post: karatahta roket "SOSYAL MEDYA UÇUYOR"
│   ├── 625996206_...jpg                 → post: RODİ MEDYA logo + telefon mockup
│   ├── 639748947_...jpg                 → post: "Hesabın gerçekten güvende mi?"
│   ├── 640418378_...jpg                 → post: "Satışa odaklan" (b&w bilek güreşi)
│   ├── 641319562_...jpg                 → post: "Hemen Farkı Fark Edin"
│   ├── 641764096_...jpg                 → post: "59 milyon" istatistik
│   ├── 642194903_...jpg                 → post: "DEĞİŞİK FİKİRLERİMİZ VAR" (pizza)
│   └── 642540066_...jpg                 → post: "Nasıl daha fazla takipçi" (cursor)
└── .claude\settings.json       ← bypassPermissions (tüm izinler açık)
```

**Global ayar:** `C:\Users\ZEYNEPVEDURU\.claude\settings.json`
→ `skillListingBudgetFraction: 0.15` · `skillListingMaxDescChars: 3000` · `model: opus` · `effortLevel: xhigh`

---

## 13. KARARLAR — HEPSİ NETLEŞTİ ✅

| # | Soru | Karar |
|---|---|---|
| 1 | **Form backend'i** | ❌ **v1'de form YOK.** Kullanıcı: "ne formu olacak onu da bilmiyorum, şimdilik form olmasın." İletişim bölümü doğrudan aksiyon: **WhatsApp · telefon · e-posta · sosyal**. Form kararı en sona bırakıldı. |
| 2 | **Domain** | ✅ `rodimedya.com` doğrulandı |
| 3 | **Gerçek müşteri işi** | ❌ Yok, yeni başlıyorlar. → "İçerik Üretimi" bölümü kendi Instagram içerikleriyle kurulacak. Sahte vaka çalışması **yasak** (bkz. §7.1) |
| 4 | **Corentia ekran görüntüsü** | ❌ İstenmiyor. Corentia tek kompakt bölüme indi (bkz. §3.1) |
| 5 | **AI görselleri** | ✅ **Kullanıcı üretecek** — tek seferde 30–40 görsel üretebiliyor. §9'da 6 temel prompt hazır. **Yeni session'ın İLK işi:** bunları 36 promptluk tam listeye genişletip `GORSEL-PROMPTLARI.md` olarak yazmak (dosya henüz YOK). |
| 6 | **Kişi/ekip bölümü** | ❌ v1'de yok (bkz. §2.1) |

### Kalan tek belirsizlik
**İletişim bölümü CTA hiyerarşisi** — WhatsApp mı birincil olsun, telefon mu?
(Corentia bir WhatsApp ürünü olduğu için WhatsApp birincil olması tutarlı olur —
build sırasında teyit edilecek, blocking değil.)
