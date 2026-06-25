import clsx from "clsx";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={clsx(
        "fixed inset-x-0 top-0 h-0.75 z-100",
        "bg-linear-to-r from-cyan-500 via-pink-500 to-purple-500",
        "origin-left",
      )}
      style={{
        scaleX,
      }}
    />
  );
}
