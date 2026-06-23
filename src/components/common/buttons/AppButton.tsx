import type { ComponentProps } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const appButtonStyles = cva(
  [
    "text-cyan",
    "font-semibold",
    "backdrop-blur-md",
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[#06202d]",
          "border border-cyan/30",
          "ease-in-out",
          "transition-[background,border-color,box-shadow,color,transform]",
          "shadow-[0_4px_20px_rgb(var(--rgb-primary)/0.15),inset_0_1px_0_rgb(var(--rgb-primary)/0.1)]",
        ],
        outline: "bg-transparent border border-cyan/60",
        tonal: "bg-cyan/5",
        ghost: "bg-transparent",
        plain: "",
      },

      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-8 py-3",
        lg: "px-10 py-4 text-lg",
      },

      rounded: {
        true: "rounded-xl",
        false: "",
      },

      disabled: {
        true: "opacity-60 cursor-not-allowed",
        false: "opacity-100 cursor-pointer",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "sm",
    },

    compoundVariants: [
      {
        disabled: false,
        className: ["hover:-translate-y-px", "hover:text-secondary"],
      },
      {
        variant: "default",
        disabled: false,
        className: [
          "hover:bg-[#063241]",
          "hover:border-secondary/70",
          "hover:shadow-[0_6px_30px_rgb(var(--rgb-secondary)/0.25),0_0_0_1px_rgb(var(--rgb-secondary)/0.15),inset_0_1px_0_rgb(var(--rgb-secondary)/0.15)]",
        ],
      },
      {
        variant: "outline",
        disabled: false,
        className: [
          "hover:border-secondary",
          "hover:shadow-[0_0_25px_rgb(var(--rgb-secondary)/0.1)]",
        ],
      },
      {
        variant: ["outline", "tonal", "ghost"],
        disabled: false,
        className: ["hover:bg-cyan/8"],
      },
    ],
  },
);

type BaseProps = VariantProps<typeof appButtonStyles> & {
  isLoading?: boolean;
  loadingMessage?: string;
};

export type AppButtonProps = BaseProps & ComponentProps<typeof motion.button>;

export function AppButton({
  isLoading,
  loadingMessage,
  className,
  variant,
  size,
  rounded,
  children,
  whileHover,
  whileTap,
  disabled,
  ...props
}: AppButtonProps) {
  const styles = clsx(
    appButtonStyles({ variant, size, rounded, disabled }),
    className,
  );

  console.log("button disabled", disabled);

  return (
    <motion.button
      className={styles}
      disabled={disabled}
      whileHover={disabled ? undefined : (whileHover ?? { scale: 1.04 })}
      whileTap={disabled ? undefined : (whileTap ?? { scale: 0.98 })}
      {...props}
    >
      {isLoading ? (
        <>
          <motion.div
            role="status"
            aria-label={loadingMessage}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 0.7,
            }}
          />
          {loadingMessage && <span>{loadingMessage}</span>}
        </>
      ) : (
        <>{children}</>
      )}
    </motion.button>
  );
}

export type AppLinkProps = BaseProps & ComponentProps<typeof motion.a>;

export function AppButtonLink({
  className,
  variant,
  size,
  rounded,
  children,
  whileHover,
  whileTap,
  ...props
}: AppLinkProps) {
  const styles = clsx(appButtonStyles({ variant, size, rounded }), className);

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
