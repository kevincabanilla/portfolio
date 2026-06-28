import type { Transition } from "motion/react";
import type { MotionVariant } from "./types";
import { EASE_OUT_CUBIC } from "@/utils";

const transition: Transition = {
  duration: 0.7,
  ease: EASE_OUT_CUBIC,
};

export const navVariants: MotionVariant = {
  hidden: {
    y: -80,
    opacity: 0,
    transition,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ...transition,
      //delay: 0.5,
    },
  },
};

export const mobileNavVariants: MotionVariant = {
  hidden: {
    y: +80,
    opacity: 0,
    transition,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ...transition,
      //delay: 0.5,
    },
  },
};
