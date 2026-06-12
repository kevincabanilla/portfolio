// ===== Animation Tokens =====
// Shared across Framer Motion variants and CSS transitions.
export const EASING = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  cinematic: [0.16, 1, 0.3, 1] as const,
  brisk: [0.25, 0.1, 0.25, 1] as const,
} as const;

export const DURATION = {
  quick: 0.25, // hover, tooltip
  default: 0.4, // card reveals, transitions
  slow: 0.7, // section / hero entrance
  ambient: 20, // decorative background loops
} as const;

export const SPRING = {
  gentle: { type: "spring" as const, stiffness: 80, damping: 16 },
  default: { type: "spring" as const, stiffness: 100, damping: 15 },
} as const;

export const TRANSITIONS = {
  default: { duration: DURATION.default, ease: "easeOut" as const },
  spring: SPRING.default,
  quick: { duration: DURATION.quick, ease: "easeInOut" as const },
};
