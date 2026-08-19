import type { ElementType, ReactNode } from "react";

/**
 * İMZA GÖLGE — metin katmanı
 *
 * Marka fotoğraflarındaki gölgeler SERT kenarlı (blur yok). Bunu birebir vermek
 * için metin iki kez basılır: arkada dolu renkli bir kopya, ışığa göre kaymış.
 *
 * NEDEN text-shadow DEĞİL:
 *   text-shadow her frame'de repaint tetikler. Ayrı katman + transform ise
 *   compositor'da kalır. Işık scroll ile sürekli hareket ettiği için bu fark
 *   60fps ile takılma arasındaki fark.
 *
 * Gölge katmanı aria-hidden — ekran okuyucu metni iki kez okumaz.
 */

type CastTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Daha kısa gölge (küçük tipografi için) */
  compact?: boolean;
};

export default function CastText({
  as: Tag = "span",
  children,
  className = "",
  compact = false,
}: CastTextProps) {
  return (
    <Tag className={`cast-text ${className}`}>
      <span
        className={`cast-text__shadow ${compact ? "cast-sm" : ""}`}
        aria-hidden="true"
      >
        {children}
      </span>
      <span className="relative">{children}</span>
    </Tag>
  );
}
