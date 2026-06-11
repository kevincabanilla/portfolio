import React, { type ComponentProps, type JSX } from "react";
import { motion, type Variants } from "motion/react";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const sideNavButtonStyles = cva(
  [
    "text-left px-4 py-3 rounded-[10px]",
    "text-sm font-medium cursor-pointer border-0",
    "transition-all duration-600",
  ],
  {
    variants: {
      active: {
        true: "text-secondary bg-cyan-500/10",
        false: "text-primary hover:text-secondary",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

const sideNavButtonMotion: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04, // i is from custom={index}
      duration: 0.1,
      ease: "easeOut",
    },
  }),
};

type SideNavButtonProps = ComponentProps<typeof motion.button> &
  VariantProps<typeof sideNavButtonStyles> & {
    children: React.ReactNode;
    index: number;
  };

export default function SideNavButton({
  active,
  children,
  className,
  index,
  ...props
}: SideNavButtonProps): JSX.Element {
  return (
    <motion.button
      variants={sideNavButtonMotion}
      initial="hidden"
      animate="visible"
      custom={index}
      {...props}
      className={clsx(sideNavButtonStyles({ active }), className)}
    >
      {children}
    </motion.button>
  );
}
