# RODİ MEDYA — AI GÖRSEL PROMPTLARI (36 adet)

> **Yön:** AMBER-BASKIN (bkz. `BRIEF.md` §6). Koyu yüzey nadir bir noktalama işareti,
> varsayılan değil. Amber **pigment gibi** okunmalı — dokusuz düz sarı amatör durur.

---

## ⚙️ KULLANIM

**Çözünürlük:** Arka planlar en az **2560px** uzun kenar. Kartlar en az **1600px**.
`next/image` zaten küçültüp AVIF'e çevirecek — büyük üret, endişelenme.

**Format:** JPG veya PNG fark etmez (şeffaflık gerekmiyor, sadece #29–31 doku dosyaları hariç).

**Dosya adları:** Her promptun başındaki yolu **birebir** kullan. Kod bu yollara göre yazılacak,
isim değişirse görsel görünmez.

**Kaç tane?** 36'sını da üretmen şart değil. Öncelik sırası:
1. **Zorunlu (10):** `01, 02, 03, 04, 05, 06, 08, 09, 30, 31`
2. **Yüksek değer (6):** `11–16` (hizmet kartları)
3. **Geri kalan:** zaman kalırsa

---

## 🎯 STİL ÇIPASI — HER PROMPTUN SONUNA EKLE

Bu paragraf 36 görselin tek bir sistem gibi durmasını sağlar. **Kopyala, her promptun sonuna yapıştır:**

```
STYLE: hard raking side light from the left creating long dramatic shadows, subtle paper
and canvas grain texture, print-ink quality with slight tonal unevenness rather than flat
digital fill, editorial poster sensibility, generous negative space, high contrast,
photographic realism where objects appear. Color discipline: warm golden amber #F2B01E
dominant, near-black #0B0B0C, off-white cream #F5F2EC. NO text, NO letters, NO numbers,
NO logos, NO watermarks, NO signatures, NO UI mockups, NO people's faces.
```

**Negatif prompt (destekleyen araçlarda):**
```
text, letters, words, numbers, logo, watermark, signature, blurry, low quality, oversaturated,
neon, purple, green, teal, flat vector gradient, stock photo cliché, faces, smiling people,
3d render look, plastic, HDR
```

> ⚠️ **Metin YASAK.** Tüm yazılar HTML olarak gelecek — SEO, erişilebilirlik ve responsive
> için şart. Görselde yazı olursa mobilde bozulur ve Google okuyamaz.

---

# A. ARKA PLANLAR / YÜZEYLER (10 adet)

### 01 — Hero zemini `public/img/bg/01-hero.jpg` · 21:9
```
Full-frame saturated warm golden amber surface, like thick printing ink on heavy paper stock.
Dramatic hard light raking across from the upper left, casting one long soft-edged shadow
diagonally across the lower right third. Subtle canvas weave visible in the surface. Very
slight tonal variation across the field, like uneven ink absorption. Completely empty, no
objects. Minimal, confident, tactile, premium print aesthetic.
```

### 02 — Manifesto zemini `public/img/bg/02-manifesto.jpg` · 16:9
```
Extreme macro of off-white cream colored heavy cotton paper, visible fiber texture and
deckled surface irregularity, soft directional light from hard left revealing the paper grain
and subtle surface bumps, very shallow depth of field, near-monochrome warm white, a few
barely-visible golden amber fibers scattered in the pulp. Calm, quiet, tactile, editorial.
```

### 03 — Hizmetler zemini `public/img/bg/03-hizmetler.jpg` · 21:9
```
Abstract geometric composition on a warm golden amber field. Three sharp-edged diagonal
parallelogram bands in a slightly deeper amber tone crossing the frame from lower left to
upper right, hard edges, no blur, flat but with visible paper grain over everything. Swiss
poster design influence, generous empty space, no objects, no text.
```

### 04 — İstatistik zemini `public/img/bg/04-istatistik.jpg` · 16:9
```
Warm golden amber surface with a very faint regular dot grid pattern in a slightly darker
amber, evenly spaced, subtle enough to read as texture rather than pattern. One soft
directional light gradient from top left. Paper grain over the whole field. Empty, calm,
architectural, no objects.
```

### 05 — İçerik Üretimi zemini `public/img/bg/05-icerik.jpg` · 16:9
```
Deep near-black matte surface, like charcoal paper or blackboard slate, visible fine tooth
texture, sparse warm golden amber dust particles catching a low raking light from the left,
deep shadows, very dark overall with one subtle pool of warm light in the lower left corner.
Moody, tactile, empty, no objects.
```

### 06 — Corentia zemini `public/img/bg/06-corentia.jpg` · 16:9
> 🔄 **Logo görüldükten sonra revize edildi.** İlk versiyon parlak elektrik mavisi baskın
> bir alandı; bu siteden okunan "mavi-beyaz palet" tarifine dayanıyordu. Gerçek logo
> **koyu lacivert baskın + mavi gradyan aksan** — zemin de o mantığı izlemeli.
```
Deep dark navy field, almost black with a cool blue undertone, occupying most of the frame.
A single soft blue gradient glow rising from the lower left, transitioning from a deeper
indigo into a brighter azure at its core, like light through frosted glass. Two or three very
faint translucent rounded shapes suggesting overlapping interlocking forms, low opacity, out
of focus. Calm, technological, restrained, fine grain, generous empty dark space. Blue is the
only chroma present — no warm tones anywhere.
```

### 07 — Süreç zemini `public/img/bg/07-surec.jpg` · 16:9
```
Off-white cream paper surface with three very faint thin golden amber horizontal rule lines
spaced far apart, like a technical drawing sheet or ledger paper, soft even light, subtle
paper fiber texture, extremely minimal, generous white space, no objects, no text.
```

### 08 — İletişim zemini `public/img/bg/08-iletisim.jpg` · 16:9
```
Full-frame deep saturated golden amber, more intense and warmer than the hero. Very dramatic
hard side light from the right creating a strong luminance falloff toward the left edge, one
large soft shadow shape entering from the upper right corner. Heavy canvas texture. Rich,
warm, inviting, completely empty.
```

### 09 — Footer zemini `public/img/bg/09-footer.jpg` · 21:9
```
Very dark near-black textured surface, matte and light-absorbing, fine paper tooth visible
under a weak grazing light from the lower left, almost entirely dark with a very subtle warm
amber undertone in the deepest area, quiet, closing, empty, no objects.
```

### 10 — Geçiş şeridi `public/img/bg/10-gecis.jpg` · 21:9
```
Horizontal transition field, warm golden amber occupying the upper two thirds meeting
off-white cream in the lower third along a torn deckled paper edge, the tear irregular and
organic, hard light from the left casting a thin shadow along the tear line, visible paper
fiber at the boundary, tactile collage aesthetic, no objects, no text.
```

---

# B. HİZMET KARTLARI (6 adet) · hepsi **4:5 dikey**

> **Ortak formül** (markanın imza kompozisyonu — pizza postundaki dil):
> Amber zeminde tek nesne veya el, sert yandan ışık, dramatik uzun gölge.

### 11 — Sosyal Medya Yönetimi `public/img/hizmet/11-sosyal-medya.jpg`
```
A single hand emerging from the right edge holding up a smartphone at a slight angle, seen
from the side, against a flat saturated golden amber background. The phone screen is
completely blank and dark, no interface. Hard studio light from the left casting a long sharp
shadow of the hand and phone across the amber field to the right. High contrast, bold,
playful, commercial photography.
```

### 12 — Web Tasarım & Geliştirme `public/img/hizmet/12-web-tasarim.jpg`
```
An open laptop seen from a low three-quarter angle, screen completely blank matte dark, sitting
on a flat saturated golden amber surface that continues into the background seamlessly. Hard
directional light from the upper left casting a long dramatic shadow to the right. Minimal,
clean, no cables, no accessories, no interface. Commercial product photography.
```

### 13 — E-ticaret `public/img/hizmet/13-eticaret.jpg`
```
Three plain unbranded paper shopping bags in cream, near-black and white, standing grouped
slightly apart on a flat saturated golden amber surface, seen at eye level. Hard side light
from the left casting three long parallel shadows across the amber. Crisp, graphic, no logos,
no text on the bags. Commercial still life photography.
```

### 14 — Dijital Pazarlama & Reklam `public/img/hizmet/14-pazarlama.jpg`
```
A single dart embedded dead center in a plain matte near-black circular target board, the
board mounted flat against a saturated golden amber background, seen straight on but lit hard
from the left so the dart casts a long dramatic shadow across the board and onto the amber.
Simple, bold, no numbers on the board, no text. Commercial photography.
```

### 15 — Marka & İçerik Üretimi `public/img/hizmet/15-marka-icerik.jpg`
```
A hand emerging from the bottom edge holding a wide paint roller, freshly rolling a thick
band of near-black paint across a saturated golden amber wall, the paint edge wet and slightly
uneven with visible roller texture. Hard light from the left, strong shadow under the roller.
Tactile, physical, bold, commercial photography.
```

### 16 — AI & Otomasyon `public/img/hizmet/16-ai-otomasyon.jpg`
```
A small matte near-black cube floating and casting a long shadow on a saturated golden amber
surface, with thin glowing electric blue lines emerging from its edges and extending outward
like a simple network diagram drawn in light. Hard light from the left. Restrained, one blue
accent only, clean, slightly futuristic but tactile not digital. Commercial photography.
```

---

# C. SÜREÇ ADIMLARI (4 adet) · hepsi **1:1 kare**

> Krem zeminde, daha sakin ve teknik bir dil. Hizmet kartlarından daha yumuşak ışık.

### 17 — Adım 1: Anlama / Keşif `public/img/surec/17-adim-1.jpg`
```
A magnifying glass lying flat on off-white cream paper, seen from directly above, soft even
overhead light with a gentle shadow, the lens catching a small warm golden amber reflection.
Minimal, clean, no text on the paper, generous empty space around the object.
```

### 18 — Adım 2: Strateji / Plan `public/img/surec/18-adim-2.jpg`
```
Three blank index cards arranged in a slightly overlapping row on off-white cream paper, seen
from directly above, one card tinted warm golden amber, soft even light with subtle shadows
between the cards. Completely blank, no writing, minimal, generous negative space.
```

### 19 — Adım 3: Üretim `public/img/surec/19-adim-3.jpg`
```
A single black fine-tip pen lying diagonally on off-white cream paper next to a small torn
piece of golden amber paper, seen from directly above, soft even light, gentle shadows,
extremely minimal, blank paper with no writing, generous empty space.
```

### 20 — Adım 4: Ölçme / Büyütme `public/img/surec/20-adim-4.jpg`
```
A simple arrow shape cut from golden amber paper, pointing up and to the right, lying on
off-white cream paper, seen from directly above, slight lift at one edge casting a small
shadow, soft even light, paper craft aesthetic, minimal, no text, generous negative space.
```

---

# D. KONSEPT / EĞLENCELİ KARTLAR (8 adet) · **1:1** veya **4:5**

> Markanın oyuncu enerjisi (pizza postu, karatahta roketleri). "İVME" temasına bağlı —
> hepsi yükseliş, hız, hareket anlatıyor. Grid'lerde ve boşluklarda kullanılacak.

### 21 — Kağıt uçak `public/img/kart/21-kagit-ucak.jpg` · 1:1
```
A simple white folded paper airplane frozen mid-flight, angled upward toward the upper right,
against a flat saturated golden amber background. Hard light from the left casting a long
sharp shadow of the plane on the amber behind it. Crisp, playful, sense of upward motion.
```

### 22 — Hareket halinde ayakkabı `public/img/kart/22-adim.jpg` · 4:5
```
A single plain white sneaker captured mid-stride, tilted forward with the heel lifted, against
a flat saturated golden amber background, hard light from the left, long dramatic shadow
stretching behind it suggesting forward momentum. No branding on the shoe. Energetic,
commercial photography.
```

### 23 — Yükselen balon `public/img/kart/23-balon.jpg` · 4:5
```
A single matte near-black helium balloon with a thin string hanging down, floating in the
upper third of a flat saturated golden amber field, hard light from the left, small round
shadow cast far below it on the amber. Simple, graphic, sense of rising, generous empty space
below the balloon.
```

### 24 — Kronometre `public/img/kart/24-kronometre.jpg` · 1:1
```
A classic round chrome stopwatch frozen in mid-air just above a flat saturated golden amber
surface, slightly tilted, hard light from the left, a small sharp shadow directly beneath it
indicating it is airborne. The dial face is blank with no numbers or markings. Crisp,
energetic, commercial photography.
```

### 25 — Buruşuk kağıt `public/img/kart/25-burusuk-kagit.jpg` · 1:1
```
A single crumpled ball of off-white cream paper resting on a flat saturated golden amber
surface, seen close up at a low angle, hard light from the left revealing every crease and
fold, long dramatic shadow to the right. Tactile, honest, imperfect, commercial still life.
```

### 26 — Yukarı fırlayan konfeti `public/img/kart/26-konfeti.jpg` · 4:5
```
A scattering of small near-black and off-white cream paper confetti pieces frozen in mid-air,
moving upward and outward from the lower center, against a flat saturated golden amber
background, hard light from the left, motion energy, some pieces sharp and some slightly
motion blurred. Celebratory, kinetic, no text.
```

### 27 — Kahve `public/img/kart/27-kahve.jpg` · 1:1
```
A plain white ceramic cup of black coffee seen from directly above on a flat saturated golden
amber surface, thin wisp of steam rising, hard light from the left casting a crisp elliptical
shadow. Simple, warm, everyday, no branding, no saucer pattern, generous empty space.
```

### 28 — Ampul `public/img/kart/28-ampul.jpg` · 1:1
```
A single clear glass incandescent light bulb lying on its side on a flat saturated golden
amber surface, unlit, the glass catching hard light from the left and casting a bright caustic
reflection plus a long shadow onto the amber. Crisp, tactile, no wires, no socket, commercial
still life photography.
```

---

# E. DOKU & OVERLAY (5 adet)

> Bunlar **tekrar eden (tileable)** dokular — sitede CSS ile üst üste bindirilecek.
> **Kare (1:1) ve mümkünse seamless/tileable üret.**

### 29 — Grain overlay `public/img/doku/29-grain.png` · 1:1 · **tileable**
```
Seamless tileable fine film grain and noise texture, monochrome grey on white, very subtle,
evenly distributed, high frequency, no visible pattern or repetition seams, flat lighting,
scanned analog film grain aesthetic.
```

### 30 — Amber kağıt dokusu `public/img/doku/30-amber-kagit.jpg` · 1:1 · **tileable**
```
Seamless tileable close-up texture of warm golden amber colored heavy cardstock paper, visible
fiber and tooth, very subtle tonal unevenness like uneven ink absorption, flat even lighting
with no directional shadow, no objects, edge-to-edge texture only.
```

### 31 — Krem kağıt dokusu `public/img/doku/31-krem-kagit.jpg` · 1:1 · **tileable**
```
Seamless tileable close-up texture of off-white cream cotton paper, visible fiber and subtle
surface irregularity, flat even lighting with no directional shadow, near-white, no objects,
edge-to-edge texture only.
```

### 32 — Işık sızması `public/img/doku/32-isik-sizmasi.jpg` · 16:9
```
Abstract warm golden light leak, soft diffuse glow bleeding in from the left edge against
black, analog film light leak aesthetic, no lens flare rings, no objects, smooth falloff,
grainy, for overlay blending.
```

### 33 — Roket izi `public/img/doku/33-roket-izi.jpg` · 21:9
```
A single continuous long-exposure light trail curving upward from the lower left toward the
upper right against pure black, warm golden amber streak, smooth motion blur, gradually
thinning as it rises, minimal, abstract, no rocket visible, no sparks, for overlay blending.
```

---

# F. SOSYAL & ÖZEL (3 adet)

### 34 — OG / paylaşım plakası `public/img/og/34-og-plaka.jpg` · **1.91:1 (1200×630)**
```
Full-frame saturated warm golden amber surface with hard raking light from the left and a
single long diagonal shadow crossing the lower right. Heavy canvas texture, slight tonal
unevenness. Completely empty with generous clear space in the center-left where text will be
composited later. Premium print aesthetic.
```
> ℹ️ Üzerine yazı **kodla** eklenecek (`next/og`) — görselde yazı olmayacak.

### 35 — Hero mobil dikey `public/img/bg/35-hero-mobil.jpg` · **9:16**
```
Full-frame saturated warm golden amber surface in vertical portrait orientation, dramatic hard
light raking from the upper left, one long soft-edged shadow falling diagonally across the
lower third, heavy canvas weave texture, slight tonal variation, completely empty, no objects.
Same lighting mood as the wide hero plate.
```

### 36 — İvme formu (imza görseli) `public/img/bg/36-ivme.jpg` · 16:9
```
A single bold abstract sculptural form suggesting upward acceleration, made of thick matte
near-black material with clean hard edges, like a folded paper chevron or a wing shape angled
steeply upward, standing on a flat saturated golden amber surface. Hard light from the left
casting a long dramatic shadow. Sculptural, confident, minimal, one object only, generous
empty space, commercial photography.
```

---

## ✅ ÖZET TABLO

| # | Dosya | Oran | Öncelik |
|---|---|---|---|
| 01 | `bg/01-hero.jpg` | 21:9 | 🔴 Zorunlu |
| 02 | `bg/02-manifesto.jpg` | 16:9 | 🔴 Zorunlu |
| 03 | `bg/03-hizmetler.jpg` | 21:9 | 🔴 Zorunlu |
| 04 | `bg/04-istatistik.jpg` | 16:9 | 🔴 Zorunlu |
| 05 | `bg/05-icerik.jpg` | 16:9 | 🔴 Zorunlu |
| 06 | `bg/06-corentia.jpg` | 16:9 | 🔴 Zorunlu |
| 07 | `bg/07-surec.jpg` | 16:9 | 🟡 |
| 08 | `bg/08-iletisim.jpg` | 16:9 | 🔴 Zorunlu |
| 09 | `bg/09-footer.jpg` | 21:9 | 🔴 Zorunlu |
| 10 | `bg/10-gecis.jpg` | 21:9 | 🟡 |
| 11–16 | `hizmet/*.jpg` | 4:5 | 🟠 Yüksek değer |
| 17–20 | `surec/*.jpg` | 1:1 | 🟡 |
| 21–28 | `kart/*.jpg` | 1:1 / 4:5 | 🟢 Opsiyonel |
| 29 | `doku/29-grain.png` | 1:1 tileable | 🟡 |
| 30 | `doku/30-amber-kagit.jpg` | 1:1 tileable | 🔴 Zorunlu |
| 31 | `doku/31-krem-kagit.jpg` | 1:1 tileable | 🔴 Zorunlu |
| 32–33 | `doku/*.jpg` | 16:9 / 21:9 | 🟢 Opsiyonel |
| 34 | `og/34-og-plaka.jpg` | 1200×630 | 🟡 |
| 35 | `bg/35-hero-mobil.jpg` | 9:16 | 🟡 |
| 36 | `bg/36-ivme.jpg` | 16:9 | 🟠 Yüksek değer |

**Klasör yapısını ben oluşturacağım** — sen sadece görselleri üret, doğru isimle
`public/img/...` altına at. Görsel gelmeden de siteyi kurmaya başlıyorum; düz renk
placeholder kullanacağım, dosyalar düştükçe yerine oturacak.
