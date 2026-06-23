import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import type { Ripple } from "@/hooks";

type RippleLayerProps = {
  ripples: Ripple[];
  className?: string;
};

export default function RippleLayer({ ripples, className }: RippleLayerProps) {
  return (
    <AnimatePresence>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className={clsx(
            "absolute rounded-full bg-white/40 pointer-events-none",
            className,
          )}
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </AnimatePresence>
  );
}
