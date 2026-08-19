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

Natro panelinde **DNS Yönetimi**:

| Tip | Ad | Değer | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 3600 |
| CNAME | `www` | `cname.vercel-dns-0.com` | 3600 |

Varsa eski `A @` ve `CNAME www` kayıtlarını **sil** (WordPress hosting'e
bakıyorlar), yenilerini ekle.

> ⚠️ **Kesin değerleri Vercel panelinden al.** Yukarıdakiler genel değerlerdir;
> Vercel projeye özel değer gösterebiliyor ve CNAME adresi geçmişte değişti
> (`cname.vercel-dns.com` → `cname.vercel-dns-0.com`). Vercel'de
> **Project → Settings → Domains → Add** dediğinde ekranda tam olarak hangi
> kaydı gireceğini yazıyor — onu esas al.

**Ayrıca:** Natro'daki **"Park Sayfası"nı kapat.** Açık kalırsa alan adı
Vercel yerine park sayfasına gidebilir.

**E-posta etkilenmez:** iletişim adresi Gmail (`roketdijitalmedya@gmail.com`),
alan adına bağlı bir posta kutusu yok — yani MX kaydı riski taşımıyoruz.

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
