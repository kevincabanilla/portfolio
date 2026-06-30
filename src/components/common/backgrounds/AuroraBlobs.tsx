import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import clsx from "clsx";

const BLOBS = [
  {
    className: "bg-cyan/4 w-75 h-55",
    x: [15, 55, 80, 30, 15],
    y: [20, 60, 25, 75, 20],
    duration: 22,
  },
  {
    className: "bg-green/3 w-65 h-75",
    x: [75, 30, 60, 85, 75],
    y: [70, 30, 80, 40, 70],
    duration: 18,
  },
  {
    className: "bg-red/5 w-70 h-60",
    x: [50, 80, 20, 65, 50],
    y: [15, 55, 70, 35, 15],
    duration: 25,
  },
  {
    className: "bg-amber/4 w-60 h-70",
    x: [25, 70, 45, 10, 25],
    y: [80, 20, 50, 40, 80],
    duration: 20,
  },
] as const;

export const AuroraBlobs = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden pointer-events-none"
    >
      {BLOBS.map((blob) => (
        <motion.div
          key={blob.className}
          className={clsx(
            "absolute rounded-full blur-[80px] translate-x-1/2 -translate-y-1/",
            blob.className,
          )}
          animate={
            reducedMotion
              ? { left: `${blob.x[0]}%`, top: `${blob.y[0]}%` }
              : {
                  left: blob.x.map((v) => `${v}%`),
                  top: blob.y.map((v) => `${v}%`),
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
};
