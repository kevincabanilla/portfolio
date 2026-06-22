import { EASING } from "@/constants/animations";
import type { Variants } from "motion/react";

export const rotateInUp: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: 12, transformPerspective: 800 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: EASING.smooth },
  },
};
