import type { ComponentProps } from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const liveIndicatorStyles = cva(["rounded-full"], {
  variants: {
    color: {
      green: "bg-green-500",
      secondary: "bg-secondary",
    },
    size: {
      default: "w-1.5 h-1.5 md:w-2 md:h-2",
      small: "w-1.5 h-1.5",
    },
  },
  defaultVariants: {
    color: "green",
    size: "default",
  },
});

type LiveIndicatorProps = ComponentProps<typeof motion.span> &
  VariantProps<typeof liveIndicatorStyles> & {
    active?: boolean;
  };

export default function LiveIndicator({
  className,
  color,
  size,
  active,
  ...props
}: LiveIndicatorProps) {
  return (
    <motion.span
      {...props}
      className={clsx(liveIndicatorStyles({ color, size }), className)}
      animate={
        active
          ? {
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.15, 1],
            }
          : undefined
      }
      transition={
        active
          ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
    />
  );
}
