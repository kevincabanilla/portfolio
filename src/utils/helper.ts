export const getInitials = (value: string): string => {
  return value
    .split(" ")
    .map((s) => s.charAt(0))
    .join("")
    .toUpperCase();
};

export const scrollToId = (id: string) => {
  const el = document.querySelector(id.startsWith("#") ? id : `#${id}`);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const getWebGLContext = ():
  | WebGLRenderingContext
  | WebGL2RenderingContext
  | null => {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");

  return (canvas.getContext("webgl2") ??
    canvas.getContext("webgl") ??
    canvas.getContext("experimental-webgl")) as
    | WebGLRenderingContext
    | WebGL2RenderingContext
    | null;
};

export const hasWebGL = (): boolean => !!getWebGLContext();

/**
 * Cryptographically secure random number generator.
 * Returns a float in [0, 1) -- drop-in replacement for Math.random()
 * that satisfies SonarCloud rule S2245.
 */
export const getRandom = (): number => {
  const buf = new Uint32Array(1);
  globalThis.crypto.getRandomValues(buf);
  return buf[0] / 0x1_0000_0000;
};

export const randomizeSign = (value: number): number => {
  const sign = Math.round(Math.random()) === 1 ? 1 : -1;
  return value * sign;
};

// "#06b6d4" -> "6, 182, 212" for use inside rgba().
export const hexToRgb = (hex: string): string => {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(", ");
};
