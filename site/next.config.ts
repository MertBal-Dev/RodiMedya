import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `public/` altındaki statik siteler için dizin-index çözümü.
   *
   * Next.js `public/<klasör>/index.html` dosyasını yalnızca tam yolla
   * servis eder; `/dilli-mobilya` veya `/fitness/admin` istekleri 404
   * döner. Portfolyodaki bağlantılar kısa yolu kullandığı için bu
   * kurallar olmadan linkler kırık.
   *
   * ⚠️ Dizi olarak döndürülen kurallar `afterFiles` aşamasında çalışır:
   * önce diskteki dosyaya bakılır, bulunamazsa kural uygulanır. Bu
   * yüzden `/fitness/_next/static/x.js` gibi gerçek dosyalar buraya
   * hiç düşmez — aksi halde onlara da `/index.html` eklenirdi.
   */
  async rewrites() {
    return [
      // Dilli Mobilya — düz HTML/CSS/JS
      { source: "/dilli-mobilya", destination: "/dilli-mobilya/index.html" },

      // Forge House / GymOS — statik dışa aktarılmış Next uygulaması.
      // fitness-web `output: "export"` + `basePath: "/fitness"` ile
      // derlenip `public/fitness/` içine kopyalanıyor.
      { source: "/fitness", destination: "/fitness/index.html" },
      { source: "/fitness/:path*", destination: "/fitness/:path*/index.html" },
    ];
  },
};

export default nextConfig;
