let cached: boolean | undefined;

/** True if this browser can create a WebGL context. The result is cached after the first check. */
export function hasWebGL(): boolean {
  if (cached !== undefined) return cached;
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    cached = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    cached = false;
  }
  return cached;
}

/** Test helper: clears the cached result. */
export function resetWebGLCache() {
  cached = undefined;
}
