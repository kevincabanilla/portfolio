import type { ComponentProps, ReactNode } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const appButtonStyles = cva(
  [
    "text-cyan",
    "font-semibold",
    "rounded-xl",
    "backdrop-blur-md",
    "transition-all duration-300 ease-out",
    "hover:-translate-y-px",
    "hover:text-secondary",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[#06202d]",
          "border border-cyan/30",
          "ease-in-out",
          "backdrop-blur-md",
          "transition-[background,border-color,box-shadow,color,transform]",
          "shadow-[0_4px_20px_rgb(var(--rgb-primary)/0.15),inset_0_1px_0_rgb(var(--rgb-primary)/0.1)]",
          "hover:bg-[#063241]",
          "hover:border-secondary/70",
          "hover:shadow-[0_6px_30px_rgb(var(--rgb-secondary)/0.25),0_0_0_1px_rgb(var(--rgb-secondary)/0.15),inset_0_1px_0_rgb(var(--rgb-secondary)/0.15)]",
        ],

        outline: [
          "bg-transparent",
          "border border-cyan/60",
          "hover:bg-cyan/8",
          "hover:border-secondary",
          "hover:shadow-[0_0_25px_rgb(var(--rgb-secondary)/0.1)]",
        ],

        ghost: ["bg-transparent", "hover:bg-cyan/8"],
      },

      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-8 py-3",
        lg: "px-10 py-4 text-lg",
      },

      disabled: {
        true: "cursor-not-allowed",
        false: "cursor-pointer",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "sm",
      disabled: false,
    },
  },
);

type BaseProps = VariantProps<typeof appButtonStyles> & {
  children: ReactNode;
};

export type AppButtonProps = BaseProps & ComponentProps<typeof motion.button>;

export function AppButton({
  className,
  variant,
  size,
  children,
  whileHover,
  whileTap,
  disabled,
  ...props
}: AppButtonProps) {
  const styles = clsx(appButtonStyles({ variant, size, disabled }), className);

  return (
    <motion.button
      className={styles}
      disabled={disabled}
      whileHover={whileHover ?? { scale: 1.04 }}
      whileTap={whileTap ?? { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export type AppLinkProps = BaseProps & ComponentProps<typeof motion.a>;

export function AppButtonLink({
  className,
  variant,
  size,
  children,
  whileHover,
  whileTap,
  ...props
}: AppLinkProps) {
  const styles = clsx(appButtonStyles({ variant, size }), className);

  return (
    <motion.a
      className={styles}
      whileHover={whileHover ?? { scale: 1.04 }}
      whileTap={whileTap ?? { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
