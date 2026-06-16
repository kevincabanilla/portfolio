import React, { type JSX } from "react";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { LiveIndicator } from "../indicators";

const navButtonStyles = cva(
  [
    "group flex flex-col items-center justify-center gap-1 relative",
    "px-3 py-1 h-full",
    "text-sm font-medium",
    "border-0 cursor-pointer",
    "transition-all duration-200 ease-in-out",
    "bg-transparent hover:bg-white/5",
  ],
  {
    variants: {
      active: {
        false: "text-primary hover:text-secondary",
        true: "text-secondary",
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
      {children}
      {/* Active dot */}
      {active && (
        <LiveIndicator
          size="small"
          color="secondary"
          className="fixed bottom-2.75"
        />
      )}
    </button>
  );
}
