const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Relative luminance of a hex color: 0 = black, 1 = white. Invalid input counts as black. */
export function luminance(hex: string): number {
  const match = HEX.exec(hex.trim());
  if (!match) return 0;
  const raw = match[1];
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(full.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Color to show when hovering a logo: the brand's own color, or the theme text color
 * when the brand color is near-black (it would be invisible on the dark background).
 */
export function brandColor(hex: string): string {
  if (luminance(hex) < 0.05) return "var(--fg)";
  return `#${hex.trim().replace(/^#/, "")}`;
}
