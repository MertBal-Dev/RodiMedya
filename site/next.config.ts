import type { NextConfig } from "next";

/**
 * ÇOK BÖLGELİ (multi-zone) KURULUM
 *
 * `rodimedya.com/fitness` ve `rodimedya.com/fitness/admin` adresleri
 * ayrı bir Next.js uygulamasından (fitness-web) servis ediliyor.
 * Tek repoda birleştirmiyoruz: iki uygulamanın bağımlılıkları,
 * tema dosyaları ve derleme ayarları çakışıyor.
 *
 * Nasıl çalışıyor:
 *   1. fitness-web kendi başına Vercel'e deploy edilir
 *      (adres ne olursa olsun, kullanıcı görmeyecek)
 *   2. O uygulamanın next.config'inde `basePath: "/fitness"` olmalı —
 *      yoksa CSS/JS yolları kök dizini işaret eder ve sayfa
 *      biçimsiz açılır
 *   3. Buradaki rewrite, gelen `/fitness/*` isteğini oraya taşır
 *
 * Vercel'de tanımlanacak ortam değişkeni:
 *   FITNESS_ZONE_URL = https://<fitness-web-deploy-adresi>
 *
 * Değişken tanımlı değilse rewrite kurulmuyor; `/fitness` 404 verir
 * ama site geri kalanıyla normal çalışır. Sessizce bozuk bir sayfa
 * yayınlamaktansa yok olması iyidir.
 */
const FITNESS_ZONE = process.env.FITNESS_ZONE_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    const rules = [
      /**
       * `public/` altındaki statik siteler için dizin-index çözümü.
       *
       * Next.js, `public/dilli-mobilya/index.html` dosyasını yalnızca
       * tam yolla servis ediyor; `/dilli-mobilya` isteği 404 dönüyor.
       * Portfolyo sayfasındaki bağlantı kısa yolu kullandığı için bu
       * satır olmadan link kırık.
       */
      { source: "/dilli-mobilya", destination: "/dilli-mobilya/index.html" },
    ];

    if (!FITNESS_ZONE) return rules;

    return [
      ...rules,
      { source: "/fitness", destination: `${FITNESS_ZONE}/fitness` },
      {
        source: "/fitness/:path*",
        destination: `${FITNESS_ZONE}/fitness/:path*`,
      },
      // Next.js'in kendi varlıkları (JS parçaları, görsel optimizasyonu)
      // basePath altında sunuluyor; bu satır olmadan sayfa açılır ama
      // stilsiz ve etkileşimsiz kalır.
      {
        source: "/fitness/_next/:path*",
        destination: `${FITNESS_ZONE}/fitness/_next/:path*`,
      },
    ];
  },
};

export default nextConfig;
