/** Share of `total` as a percentage (0 to 100, two decimals). Returns 0 for non-positive inputs. */
export function toPercent(value: number, total: number): number {
  if (total <= 0 || value <= 0) return 0;
  return Math.min(100, Math.round((value / total) * 10000) / 100);
}

/** How many times faster `fast` is than `slow`, rounded to one decimal. Returns 0 if `fast` is not positive. */
export function speedup(slow: number, fast: number): number {
  if (fast <= 0) return 0;
  return Math.round((slow / fast) * 10) / 10;
}
