import type { MotionVariant } from "./types";

export const navVariants: MotionVariant = {
  hidden: {
    y: -80,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const mobileNavVariants: MotionVariant = {
  hidden: {
    y: +80,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.7,
      ease: "easeOut",
    },
  },
};
