import type { Variants } from "motion/react";
import { EASING } from "@/constants/animations";

// ===== Enhanced Section Reveal (with scale) =====
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASING.smooth },
  },
};
