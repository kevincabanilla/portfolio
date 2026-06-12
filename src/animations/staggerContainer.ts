import { TRANSITIONS } from "@/constants/animations";
import type { Variants } from "motion/react";

// ===== Container / Stagger =====
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: TRANSITIONS.quick },
};
