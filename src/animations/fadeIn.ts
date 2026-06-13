import type { Variants } from "motion/react";
import type { Direction } from "./types";
import { TRANSITIONS } from "@/constants/animations";

const OFFSET = 60;
const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: OFFSET },
  down: { y: -OFFSET },
  left: { x: -OFFSET },
  right: { x: OFFSET },
  none: {},
};

/** Parameterized fade variant. Use `createFade("up")` instead of stamping new variants. */
export const createFade = (direction: Direction = "up"): Variants => ({
  hidden: { opacity: 0, ...directionOffset[direction] },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: TRANSITIONS.default,
  },
});

// Pre-built fades for common cases (backwards-compat with existing usages).
export const fadeInUp: Variants = createFade("up");
export const fadeInLeft: Variants = createFade("left");
export const fadeInRight: Variants = createFade("right");
export const fadeIn: Variants = createFade("none");
