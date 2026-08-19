import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Site haritası. Next 16 bunu /sitemap.xml olarak statik üretiyor.
 *
 * İki sayfa var: ana sayfa ve Corentia ürün sayfası. Ana sayfa daha
 * öncelikli çünkü ajansın kendisini tanıtan sayfa o.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/corentia`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
