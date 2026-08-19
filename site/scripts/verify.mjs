/**
 * GÖRSEL + YAPISAL DOĞRULAMA HARNESS'İ
 *
 * Kullanım:  node scripts/verify.mjs [url]
 *
 * Ne yapar:
 *   1. Dört gerçek ekran boyutunda tam sayfa ekran görüntüsü alır
 *      — 1536x864 kullanıcının GERÇEK ekranı (1920x1080 @ %125 zoom)
 *   2. Yatay taşma var mı ölçer (mobil tasarımın 1 numaralı hatası)
 *      ve taşmaya sebep olan ELEMANI adıyla raporlar
 *   3. Konsol hatalarını ve başarısız ağ isteklerini toplar
 *   4. Yüklenemeyen görselleri listeler
 *
 * Çıktı: shots/ klasörü + terminalde rapor.
 */

import { chromium } from "playwright";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const URL = process.argv[2] ?? "http://localhost:3000/";
const OUT = path.join(process.cwd(), "shots");

const VIEWPORTS = [
  // Kullanıcının gerçek ekranı: 1920x1080 fiziksel, %125 zoom → 1536x864 CSS px
  { name: "masaustu-1536x864-GERCEK", width: 1536, height: 864 },
  { name: "genis-1920x1080", width: 1920, height: 1080 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "mobil-390x844", width: 390, height: 844 },
];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let totalProblems = 0;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    locale: "tr-TR",
  });
  const page = await ctx.newPage();

  const consoleErrors = [];
  const failedRequests = [];

  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("requestfailed", (r) => {
    failedRequests.push(`${r.url()} — ${r.failure()?.errorText ?? "?"}`);
  });
  page.on("response", (r) => {
    if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`);
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });
  // Fontların ve giriş animasyonlarının oturması için
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1800);

  // --- Yatay taşma ölçümü ------------------------------------------------
  const overflow = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const scrollW = document.documentElement.scrollWidth;
    const culprits = [];

    if (scrollW > docW + 1) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > docW + 1 || r.left < -1) {
          const cls =
            typeof el.className === "string"
              ? el.className.slice(0, 60)
              : "";
          culprits.push({
            tag: el.tagName.toLowerCase(),
            cls,
            left: Math.round(r.left),
            right: Math.round(r.right),
          });
        }
      }
    }
    return { docW, scrollW, overflowBy: scrollW - docW, culprits: culprits.slice(0, 8) };
  });

  // --- Yüklenemeyen görseller -------------------------------------------
  const brokenImages = await page.evaluate(() =>
    [...document.querySelectorAll("img")]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src),
  );

  // --- Ekran görüntüleri -------------------------------------------------
  await page.screenshot({ path: path.join(OUT, `${vp.name}-ustust.png`) });
  await page.screenshot({
    path: path.join(OUT, `${vp.name}-tamsayfa.png`),
    fullPage: true,
  });

  // --- Rapor -------------------------------------------------------------
  const problems = [];
  if (overflow.overflowBy > 1)
    problems.push(`YATAY TASMA: ${overflow.overflowBy}px`);
  if (brokenImages.length) problems.push(`BOZUK GORSEL: ${brokenImages.length}`);
  if (consoleErrors.length) problems.push(`KONSOL HATASI: ${consoleErrors.length}`);
  if (failedRequests.length) problems.push(`AG HATASI: ${failedRequests.length}`);

  totalProblems += problems.length;

  console.log(`\n${"=".repeat(64)}`);
  console.log(`${vp.name}  (${vp.width}x${vp.height})`);
  console.log("=".repeat(64));
  console.log(problems.length ? "  " + problems.join("  |  ") : "  temiz");

  if (overflow.culprits.length) {
    console.log("  Tasmaya sebep olan elemanlar:");
    for (const c of overflow.culprits) {
      console.log(`    <${c.tag}> .${c.cls}  [${c.left} → ${c.right}]`);
    }
  }
  for (const e of consoleErrors.slice(0, 5)) console.log(`    konsol: ${e.slice(0, 140)}`);
  for (const f of failedRequests.slice(0, 5)) console.log(`    ag: ${f.slice(0, 140)}`);
  for (const b of brokenImages.slice(0, 5)) console.log(`    gorsel: ${b.slice(0, 140)}`);

  await ctx.close();
}

await browser.close();

console.log(`\n${"=".repeat(64)}`);
console.log(totalProblems === 0 ? "SONUC: TEMIZ" : `SONUC: ${totalProblems} sorun grubu`);
console.log(`Ekran goruntuleri: ${OUT}`);
