import type { ComponentProps } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { appButtonStyles, type AppButtonProps } from "./appButtonStyles";

type ButtonProps = AppButtonProps & ComponentProps<typeof motion.button>;

export default function AppButton({
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
}: ButtonProps) {
  const styles = clsx(
    appButtonStyles({ variant, size, rounded, disabled }),
    className,
  );

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
