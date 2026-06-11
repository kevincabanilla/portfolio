import React, { type JSX } from "react";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const navButtonStyles = cva(
  [
    "group flex items-center gap-1 relative",
    "px-3 py-1",
    "text-xs font-medium",
    "border-0 cursor-pointer",
    "transition-all duration-200 ease-in-out",
    "rounded-[10px]",
  ],
  {
    variants: {
      active: {
        false:
          "text-primary bg-transparent hover:text-secondary hover:bg-white/5",
        true: "text-secondary bg-secondary/10 backdrop-blur-[8px]",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

type NavButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof navButtonStyles> & {
    children: React.ReactNode;
  };

export default function NavButton({
  active,
  children,
  className,
  ...props
}: NavButtonProps): JSX.Element {
  return (
    <button {...props} className={clsx(navButtonStyles({ active }), className)}>
      {/* Active dot */}
      {active && (
        <span
          className={clsx(
            "w-1.25 h-1.25",
            "rounded-full",
            "bg-secondary",
            "shrink-0",
            "transition-shadow",
            "duration-150",
          )}
        />
      )}
      {children}
    </button>
  );
}
