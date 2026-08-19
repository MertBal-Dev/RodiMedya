/**
 * BAĞLANTI DENETİMİ
 *
 * Her sayfadaki her <a> etiketini toplar ve şunları doğrular:
 *   - iç bağlantılar (/... ve /#...) gerçekten var mı, hedef çapa mevcut mu
 *   - dış bağlantılarda target="_blank" varsa rel="noopener" da var mı
 *   - boş / "#" / eksik href var mı
 *   - erişilebilir adı olmayan bağlantı var mı (ekran okuyucu için)
 *
 * Kullanım: node scripts/links.mjs [taban-url]
 */

import { chromium } from "playwright";

const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const PAGES = ["/", "/corentia"];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1536, height: 864 } });

let problems = 0;

for (const path of PAGES) {
  const page = await ctx.newPage();
  const res = await page.goto(BASE + path, { waitUntil: "networkidle" });

  console.log(`\n${"=".repeat(70)}`);
  console.log(`${path}   HTTP ${res?.status()}`);
  console.log("=".repeat(70));

  if (res?.status() !== 200) {
    console.log("  SAYFA ACILMADI");
    problems += 1;
    await page.close();
    continue;
  }

  const links = await page.evaluate(() =>
    [...document.querySelectorAll("a")].map((a) => ({
      href: a.getAttribute("href") ?? "",
      text: (a.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 42),
      target: a.getAttribute("target") ?? "",
      rel: a.getAttribute("rel") ?? "",
      label: a.getAttribute("aria-label") ?? "",
      // Ekran okuyucunun duyacagi ad
      accName:
        (a.getAttribute("aria-label") || a.textContent || "")
          .replace(/\s+/g, " ")
          .trim(),
    })),
  );

  // Sayfadaki tum id'ler — capa hedefleri icin
  const ids = await page.evaluate(() =>
    [...document.querySelectorAll("[id]")].map((e) => e.id),
  );

  const seen = new Set();

  for (const l of links) {
    const key = l.href + "|" + l.text;
    if (seen.has(key)) continue;
    seen.add(key);

    const issues = [];

    if (!l.href || l.href === "#") issues.push("BOS HREF");
    if (!l.accName) issues.push("ERISILEBILIR AD YOK");

    if (l.target === "_blank" && !l.rel.includes("noopener")) {
      issues.push("target=_blank ama rel=noopener YOK");
    }

    // Ic capa hedefi var mi?
    if (l.href.startsWith("#") || l.href.startsWith("/#")) {
      const id = l.href.slice(l.href.indexOf("#") + 1);
      const onThisPage = ids.includes(id);
      const homeAnchor = l.href.startsWith("/#");
      if (!onThisPage && !homeAnchor) {
        issues.push(`capa "#${id}" BU SAYFADA YOK`);
      }
      if (!onThisPage && homeAnchor && path === "/") {
        issues.push(`capa "#${id}" ana sayfada YOK`);
      }
    }

    // Ic sayfa gercekten aciliyor mu?
    if (/^\/(?!\/)/.test(l.href) && !l.href.startsWith("/#")) {
      const target = l.href.split("#")[0];
      const r = await ctx.request.get(BASE + target).catch(() => null);
      if (!r || r.status() >= 400) {
        issues.push(`ic sayfa ${target} -> ${r ? r.status() : "ULASILAMADI"}`);
      }
    }

    const flag = issues.length ? "  ✗ " + issues.join(" | ") : "";
    if (issues.length) problems += issues.length;
    console.log(`  ${l.href.padEnd(34)} ${l.text.padEnd(34)}${flag}`);
  }

  await page.close();
}

await browser.close();
console.log(`\n${"=".repeat(70)}`);
console.log(problems === 0 ? "SONUC: TUM BAGLANTILAR SAGLAM" : `SONUC: ${problems} sorun`);
process.exit(problems === 0 ? 0 : 1);
