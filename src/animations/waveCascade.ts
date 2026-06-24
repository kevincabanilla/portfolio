import { EASING } from "@/constants/animations";
import type { Variants } from "motion/react";

// ===== Wave Cascade (for skill tags) =====
export const waveCascadeContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

export const waveCascadeItem: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.85, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: EASING.brisk },
  },
};
