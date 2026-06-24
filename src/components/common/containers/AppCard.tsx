import type { ComponentProps } from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const appCardStyles = cva(
  [
    "border border-white/6",
    "bg-navy/50",
    "hover:border-cyan/20",
    "hover:bg-navy-light/60",
  ],
  {
    variants: {
      type: {
        glass: [
          "backdrop-blur-[20px]",
          "shadow-[0_4px_30px_rgb(0_0_0/0.2),inset_0_1px_0_rgb(255_255_255/0.04)]",
          "hover:shadow-[0_0_30px_color-mix(in_oklab,var(--color-cyan)_7%,transparent),0_8px_40px_rgb(0_0_0/0.3),inset_0_1px_0_rgb(255_255_255/0.06)]",
        ],
      },
      rounded: {
        true: "rounded-2xl",
        false: "",
      },
    },
    defaultVariants: {
      type: "glass",
      rounded: false,
    },
  },
);

type AppCardProps = ComponentProps<typeof motion.div> &
  VariantProps<typeof appCardStyles>;

export default function AppCard({
  type,
  rounded,
  className,
  children,
  ...props
}: AppCardProps) {
  return (
    <motion.div
      className={clsx(
        appCardStyles({ type: type ?? "glass", rounded }),
        className,
      )}
      whileHover={{ y: -2 }}
      transition={{
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
