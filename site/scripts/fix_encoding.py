"""
MOJIBAKE ONARIMI

Ne oldu: PowerShell'de `Get-Content -Raw` dosyayi sistemin ANSI kod
sayfasiyla (cp1254) okudu, `Set-Content -Encoding utf8` ise sonucu UTF-8
olarak geri yazdi. Yani UTF-8 baytlari cp1254 sanildi ve tekrar UTF-8'e
kodlandi -> cift kodlama (mojibake).

  "OZET"  ->  UTF-8: C3 96  ->  cp1254 okumasi: "Ã–"  ->  UTF-8 yazimi: C3 83 C2 96

Geri alma: dosyayi UTF-8 oku, cp1254'e KODLA (mojibake'i ham bayta cevirir),
sonra UTF-8 olarak COZ.

Guvenlik: sadece gercekten bozulmus dosyalar yazilir. Tersine cevirme
basarisiz olursa dosyaya dokunulmaz.
"""

import os
import sys

ROOT = r"c:\Users\ZEYNEPVEDURU\Desktop\Rodi Medya\site"
TARGETS = [
    r"components\sections\Corentia.tsx",
    r"components\sections\Faq.tsx",
    r"components\sections\Footer.tsx",
    r"components\sections\Hero.tsx",
    r"app\page.tsx",
]

# Mojibake imzasi: bu diziler saglam Turkce metinde ASLA bulunmaz.
MARKERS = ("Ã–", "Ã‡", "ÅŸ", "Ä±", "Ä°", "Ã¼", "Ã§", "â€”", "âš", "âœ…", "âŒ", "Ã¶")

fixed, skipped = [], []

for rel in TARGETS:
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        skipped.append((rel, "dosya yok"))
        continue

    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    if not any(m in text for m in MARKERS):
        skipped.append((rel, "bozulmamis"))
        continue

    # Hangi kod sayfasinin kullanildigi belirsiz (sistem cp1254 ama bazi
    # karakterler cp1252'den geliyor). Sirayla dene, ilk tutan kazanir.
    repaired = None
    for enc in ("cp1254", "cp1252", "latin-1"):
        try:
            candidate = text.encode(enc).decode("utf-8")
        except (UnicodeEncodeError, UnicodeDecodeError):
            continue
        repaired = candidate
        break

    if repaired is None:
        skipped.append((rel, "hicbir kod sayfasi tutmadi"))
        continue

    if any(m in repaired for m in MARKERS):
        skipped.append((rel, "hala bozuk gorunuyor - dokunulmadi"))
        continue

    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(repaired)
    fixed.append(rel)

print("ONARILDI:")
for f in fixed:
    print(f"  {f}")
print("ATLANDI:")
for f, why in skipped:
    print(f"  {f}  ({why})")

sys.exit(0 if fixed or not skipped else 0)
