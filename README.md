# Rodi Medya

Dijital medya ajansı web sitesi. Türkçe, tek sayfa + Corentia ürün sayfası.

**Canlı alan adı:** rodimedya.com

---

## ⚠️ Vercel kurulumu — ÖNEMLİ

Next.js uygulaması deponun kökünde **değil**, `site/` klasöründe.
Vercel'de projeyi içe aktarırken:

**Settings → General → Root Directory → `site`**

Bu ayar yapılmazsa Vercel kökte `package.json` bulamaz ve derleme başarısız olur.

Geri kalan her şey otomatik algılanır (Framework: Next.js, Build: `next build`).

### Alan adı bağlama (rodimedya.com → Vercel)

Alan adı Natro'da, `ns1.natrohost.com` / `ns2.natrohost.com` DNS sunucularını
kullanıyor; mevcut hosting "WP Profesyonel".

**Önerilen yol: DNS'i Natro'da bırak, sadece iki kayıt değiştir.** Nameserver
değiştirmekten daha düşük riskli ve geri alması kolay.

Natro panelinde **DNS Yönetimi** — bu projenin Vercel panelinden alınan
gerçek değerleri:

| Tip | Ad | Değer | TTL |
|---|---|---|---|
| A | `@` | `216.198.79.1` | 3600 |
| CNAME | `www` | `63b2e3837687f9c3.vercel-dns-017.com` | 3600 |

Varsa eski `A @` ve `CNAME www` kayıtlarını **sil** (WordPress hosting'e
bakıyorlar), yenilerini ekle.

> ⚠️ **Bu değerler PROJEYE ÖZEL.** Vercel'in genel dokümantasyonundaki
> `76.76.21.21` ve `cname.vercel-dns-0.com` bu proje için geçerli değil —
> Vercel her projeye ayrı IP ve ayrı CNAME hostu atıyor. Değerler
> **Project → Settings → Domains** ekranında yazıyor; başka bir yerden
> kopyalama.

> **Sondaki nokta:** Vercel CNAME'i `...vercel-dns-017.com.` diye gösterir.
> Sondaki nokta FQDN işaretidir; Natro paneli genelde kendisi ekler, o yüzden
> **noktasız** gir. Panel hata verirse noktalı halini dene.

Kayıtları girdikten sonra Vercel'de **Refresh**'e bas. "Invalid Configuration"
uyarısı kayıtlar yayılana kadar normaldir.

**Ayrıca:** Natro'daki **"Park Sayfası"nı kapat.** Açık kalırsa alan adı
Vercel yerine park sayfasına gidebilir.

### 🚨 E-POSTA KAYITLARINA DOKUNMA

Alan adında **kurumsal e-posta kurulu** (`kurumsaleposta.com` üzerinden).
Aşağıdaki kayıtlar silinir veya değiştirilirse **e-posta çalışmaz**:

| Kayıt | Görevi |
|---|---|
| `MX` → `mx-01.kurumsaleposta.com` | Gelen postayı taşır |
| `MX` → `mx-02.kurumsaleposta.com` | Yedek posta sunucusu |
| `TXT` → `v=spf1 include:_spfcls.natrohost.com ...` | Giden postanın spam'e düşmemesi |
| `TXT` `ntr._domainkey` → `v=DKIM1; ...` | Posta imzalama |
| `CNAME` `autodiscover` → `mail.kurumsaleposta.com` | Outlook/telefon otomatik kurulumu |
| `SRV` `_autodiscover._tcp` | Aynı iş |
| `CNAME` `ftp` → `rodimedya.com` | Zararsız, kalabilir |

**Sadece şu üç satır değişecek:**
1. `A` `rodimedya.com` `85.159.66.93` → **`216.198.79.1`**
2. `A` `rodimedya.com` `94.73.151.184` → **SİL** (Vercel tek A kaydı ister;
   ikincisi kalırsa trafiğin bir kısmı eski sunucuya gider)
3. `CNAME` `www` `redirect.natrocdn.com` → **`63b2e3837687f9c3.vercel-dns-017.com`**

Yayılma genelde 5–30 dakika, en fazla birkaç saat. Vercel SSL sertifikasını
kayıtları doğruladıktan sonra otomatik üretir.

---

## Yerel geliştirme

```bash
cd site
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # prod derleme
node scripts/verify.mjs   # 4 ekran boyutunda görsel + yapısal kontrol
node scripts/sections.mjs # bölüm bölüm denetim
```

---

## Teknoloji

| Katman | Seçim | Neden |
|---|---|---|
| Framework | Next.js 16.3 (App Router, Turbopack) | SEO şart — ajans Google'da çıkmalı |
| UI | React 19.2 + TypeScript | |
| Stil | Tailwind v4 (CSS-first) + `app/globals.css` | Tasarım sistemi tek dosyada |
| Animasyon | **GSAP 3.15** (ScrollTrigger, SplitText) + **Lenis** | 2025'te tüm eklentiler ücretsizleşti |
| Component animasyonu | Motion 13 | Yalnızca mount/unmount ve jestler |

**Demir kural:** scroll = GSAP, component yaşam döngüsü = Motion.
Aynı property'yi iki kütüphane birden animate etmez.

---

## Yapı

```
site/
├─ app/
│  ├─ page.tsx           ana sayfa (10 bölüm)
│  ├─ corentia/page.tsx  ürün sayfası
│  ├─ globals.css        TASARIM SİSTEMİ — renk, tipografi, yüzey, ışık
│  ├─ sitemap.ts · robots.ts
│  └─ layout.tsx         fontlar, metadata, JSON-LD
├─ components/
│  ├─ sections/          Header, Hero, Manifesto, Services, Stats,
│  │                     Work, Corentia, Process, Faq, Contact, Footer
│  ├─ motion/            ScrollEngine (Lenis + ışık), Reveal, ParallaxLayer
│  ├─ SectionSurface.tsx arka plan + ÖLÇÜLMÜŞ kontrast örtüsü
│  └─ Logo.tsx
├─ lib/                  site.ts (sabitler) · content.ts (tüm metinler)
├─ scripts/              verify.mjs · sections.mjs · logo_prep.py
└─ public/img/           bg/ hizmet/ icerik/ logo/ surec/ doku/
```

Tasarım kararlarının gerekçeleri: **`BRIEF.md`** (kök dizinde).
Görsel üretim promptları: **`GORSEL-PROMPTLARI.md`**.

---

## Değişmeyecek kurallar

1. **Amber üzerine beyaz metin YOK** — 1.91:1, AA'yı geçmez. Amber zeminde
   metin daima `--color-ink`.
2. **Sahte müşteri işi YOK** — gerçek müşteri referansı yok. "İşler" bölümü
   ajansın *kendi* ürettiği içerikleri gösteriyor, vaka çalışması değil.
3. **Uydurma metrik / rozet / ödül YOK.**
4. **Renkler logodan ölçüldü** (`scripts/logo_prep.py`), tahmin değil:
   amber `#F8B000`, magenta `#B02070`.
5. Her animasyonun `prefers-reduced-motion` karşılığı var; hiçbir içerik
   animasyona bağımlı olarak erişilemez kalmıyor.

---

## Bilinen eksikler

- İletişim **formu yok** — bilinçli karar. Doğrudan aksiyon: WhatsApp + telefon.
- Görsel setinin bir kısmı henüz üretilmedi (`GORSEL-PROMPTLARI.md` 17–36).
  Eksik dosyalar `lib/assets.ts` tarafından sessizce atlanıyor; layout bozulmuyor.
