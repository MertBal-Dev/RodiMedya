/**
 * BÖLÜM BÖLÜM DENETİM
 *
 * verify.mjs tam sayfa çekiyor ama ScrollTrigger tetiklenmediği için
 * ekranın altındaki bölümler opacity:0 kalıyor — yani "boş" görünen bölüm
 * gerçekten boş mu, yoksa sadece reveal mi çalışmamış, ayırt edemiyoruz.
 *
 * Bu betik her bölüme GERÇEKTEN kaydırıyor, animasyonun bitmesini bekliyor,
 * sonra ekran görüntüsü alıyor. Ayrıca opacity:0 kalmış eleman var mı
 * raporluyor — bu, içeriğin animasyona bağımlı kalıp erişilemez olduğu
 * anlamına gelir ve gerçek bir hatadır.
 */

import { chromium } from "playwright";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const URL = process.argv[2] ?? "http://localhost:3000/";
const OUT = path.join(process.cwd(), "shots-sections");

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1536, height: 864 },
  deviceScaleFactor: 1,
  locale: "tr-TR",
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1500);

const count = await page.evaluate(
  () => document.querySelectorAll("main > section, footer, main > div > section").length,
);
console.log(`Bulunan bolum sayisi: ${count}`);

const sections = await page.$$("main > section");
let i = 0;

for (const section of sections) {
  i += 1;
  await section.scrollIntoViewIfNeeded();
  // Lenis + ScrollTrigger + reveal tamamlansın
  await page.waitForTimeout(1600);

  const info = await section.evaluate((el) => {
    const hidden = [];
    for (const n of el.querySelectorAll("*")) {
      const cs = getComputedStyle(n);
      if (parseFloat(cs.opacity) < 0.05 && n.getBoundingClientRect().height > 4) {
        const cls = typeof n.className === "string" ? n.className.slice(0, 48) : "";
        hidden.push(`${n.tagName.toLowerCase()}.${cls}`);
      }
    }
    return {
      id: el.id || "(id yok)",
      cls: el.className.slice(0, 44),
      h: Math.round(el.getBoundingClientRect().height),
      hidden: hidden.slice(0, 5),
      hiddenCount: hidden.length,
    };
  });

  await page.screenshot({
    path: path.join(OUT, `${String(i).padStart(2, "0")}-${info.id.replace(/[^a-z0-9]/gi, "") || "bolum"}.png`),
  });

  const flag = info.hiddenCount > 0 ? `  ⚠ GORUNMEZ: ${info.hiddenCount}` : "";
  console.log(`${String(i).padStart(2, "0")}  ${info.id.padEnd(12)} h=${String(info.h).padStart(5)}  ${info.cls}${flag}`);
  for (const h of info.hidden) console.log(`       ${h}`);
}

await browser.close();
console.log(`\nGoruntuler: ${OUT}`);
