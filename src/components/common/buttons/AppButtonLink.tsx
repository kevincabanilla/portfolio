import type { ComponentProps } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { appButtonStyles, type AppButtonProps } from "./appButtonStyles";

type ButtonProps = AppButtonProps & ComponentProps<typeof motion.a>;

export default function AppButtonLink({
  className,
  variant,
  size,
  rounded,
  children,
  whileHover,
  whileTap,
  ...props
}: ButtonProps) {
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
