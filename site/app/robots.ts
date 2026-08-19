import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * robots.txt — her şey taranabilir.
 *
 * Gizlenecek bir alan yok: site tek sayfa + bir ürün sayfası, ikisi de
 * halka açık. Yapay zekâ arama motorları da (ChatGPT, Perplexity) buradan
 * geçiyor; S.S.S. bölümündeki FAQPage schema'nın alıntılanabilmesi için
 * engel koymuyoruz.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
