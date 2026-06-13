import { DURATION } from "@/constants/animations";
import type { Variants } from "motion/react";

// ===== Line / Border =====
export const lineGrow: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DURATION.slow, ease: "easeOut" },
  },
};
