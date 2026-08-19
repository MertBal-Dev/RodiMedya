import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Görsel var mı kontrolü — sunucu tarafında, render sırasında.
 *
 * NEDEN: Görseller kullanıcı tarafından üretiliyor ve parça parça geliyor
 * (bkz. GORSEL-PROMPTLARI.md). Olmayan bir yolu <Image> ile render etmek
 * 404 ve bozuk layout üretir.
 *
 * Bu yardımcıyla bölümler "görsel varsa göster, yoksa tasarlanmış boşluğu
 * koru" davranışına sahip olur. Kullanıcı dosyayı public/img/... altına
 * attığında hiçbir kod değişikliği olmadan görsel devreye girer.
 *
 * Not: dev'de her render'da, prod'da build sırasında değerlendirilir.
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

export function hasAsset(publicPath: string): boolean {
  if (!publicPath.startsWith("/")) return false;
  // path traversal koruması — sadece public/ altında kalmalı
  const resolved = path.resolve(PUBLIC_DIR, "." + publicPath);
  if (!resolved.startsWith(PUBLIC_DIR)) return false;
  return existsSync(resolved);
}
