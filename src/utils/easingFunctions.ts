export const EASE_OUT_EXPO = (t: number) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
export const EASE_OUT_CIRC = (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2));
export const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3);
export const EASE_OUT_QUAD = (t: number) => 1 - (1 - t) * (1 - t);
export const EASE_OUT_QUINT = (t: number) => 1 - Math.pow(1 - t, 5);
