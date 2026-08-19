"""
LOGO HAZIRLAMA

Kullanici HD logoyu (1236x1236 PNG, amber zeminli kare) verdi. Sitede
kullanilabilmesi icin uc sey gerekiyor:

  1. GERCEK MARKA RENKLERINI olcmek — palet su ana kadar 150px'lik JPG'den
     goz karariyla tahmin edilmisti. HD dosyadan kesin degerleri aliyoruz.
  2. Fazla amber bosluğu kirpmak — logo karenin ortasinda kucuk duruyor,
     oldugu gibi kullanilinca header'da minicik kaliyor.
  3. Amber zemini SEFFAF yapmak — boylece logo amber, ink ve krem
     yuzeylerin hepsinde yapistirmis gibi durmadan calisiyor.

Ciktilar:
  public/img/logo/roket-medya.png       seffaf, kirpilmis (asil kullanim)
  public/img/logo/roket-medya-tile.png  amber zeminli kare (favicon/OG icin)
"""

from PIL import Image
from collections import Counter
import os

SRC = r"c:\Users\ZEYNEPVEDURU\Desktop\Rodi Medya\Görseller\ChatGPT Image 19 Ağu 2026 12_23_08.png"
OUT_DIR = r"c:\Users\ZEYNEPVEDURU\Desktop\Rodi Medya\site\public\img\logo"

img = Image.open(SRC).convert("RGBA")
w, h = img.size
print(f"Kaynak: {w}x{h}")

px = img.load()

# --- 1. Baskin renkleri olc ---------------------------------------------
counts = Counter()
for y in range(0, h, 3):
    for x in range(0, w, 3):
        r, g, b, a = px[x, y]
        if a > 200:
            # 8'lik kovalara yuvarla ki JPEG/PNG gurultusu dagitmasin
            counts[(r // 8 * 8, g // 8 * 8, b // 8 * 8)] += 1

print("\n--- En baskin 6 renk ---")
for (r, g, b), n in counts.most_common(6):
    pct = 100 * n / sum(counts.values())
    print(f"  #{r:02X}{g:02X}{b:02X}   %{pct:.1f}")

# Zemin = kose pikseli (kesin amber)
bg = px[4, 4][:3]
print(f"\nZemin (kose pikseli): #{bg[0]:02X}{bg[1]:02X}{bg[2]:02X}")

# --- 2. Zemini seffaf yap ------------------------------------------------
# Tolerans: JPEG/PNG sikistirma ve hafif gradyan icin pay birakiyoruz.
TOL = 26


def is_bg(p):
    return (
        abs(p[0] - bg[0]) <= TOL
        and abs(p[1] - bg[1]) <= TOL
        and abs(p[2] - bg[2]) <= TOL
    )


cut = img.copy()
cpx = cut.load()
for y in range(h):
    for x in range(w):
        p = cpx[x, y]
        if is_bg(p):
            cpx[x, y] = (p[0], p[1], p[2], 0)

# --- 3. Icerik sinirlarina kirp ------------------------------------------
bbox = cut.getbbox()
print(f"Icerik sinirlari: {bbox}")
cut = cut.crop(bbox)
print(f"Kirpilmis: {cut.size[0]}x{cut.size[1]}")

os.makedirs(OUT_DIR, exist_ok=True)
cut.save(os.path.join(OUT_DIR, "roket-medya.png"), optimize=True)

# Amber zeminli kare surum (favicon / OG)
tile = img.crop(bbox)
pad = 60
tiled = Image.new("RGBA", (tile.width + pad * 2, tile.height + pad * 2), bg + (255,))
tiled.paste(tile, (pad, pad))
tiled.save(os.path.join(OUT_DIR, "roket-medya-tile.png"), optimize=True)

# --- 4. KOYU VARYANT ------------------------------------------------------
# Header yuzeyle birlikte renk degistiriyor. Krem yuzeyde beyaz "ROKET" ve
# bulutlar GORUNMEZ olurdu. Bu surumde beyaz olan her sey ink'e cevriliyor;
# magenta "MEDYA" oldugu gibi kaliyor (krem uzerinde kontrasti yeterli).
INK = (11, 11, 12)
dark = cut.copy()
dpx = dark.load()
for y in range(dark.height):
    for x in range(dark.width):
        r, g, b, a = dpx[x, y]
        if a > 0 and r > 190 and g > 190 and b > 190:
            dpx[x, y] = (INK[0], INK[1], INK[2], a)
dark.save(os.path.join(OUT_DIR, "roket-medya-ink.png"), optimize=True)

print("\nYazildi:")
for f in ("roket-medya.png", "roket-medya-ink.png", "roket-medya-tile.png"):
    p = os.path.join(OUT_DIR, f)
    print(f"  {f}  ({os.path.getsize(p) // 1024} KB)")
