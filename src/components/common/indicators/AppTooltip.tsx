import {
  cloneElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  useId,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

/* -----------------------------
   Tooltip container styles
------------------------------ */
const COMMON_CLASS = "z-50 absolute bg-purple";

const tooltipVariants = cva(
  [
    "rounded-md",
    "px-3 py-1.5",
    "text-xs text-white",
    "shadow-lg whitespace-nowrap",
    "pointer-events-none",
  ],
  {
    variants: {
      placement: {
        top: "bottom-full left-1/2 mb-3 -translate-x-1/2",
        bottom: "top-full left-1/2 mt-3 -translate-x-1/2",
        left: "right-full top-1/2 mr-3 -translate-y-1/2",
        right: "left-full top-1/2 ml-3 -translate-y-1/2",
      },
    },
    defaultVariants: {
      placement: "top",
    },
  },
);

/* -----------------------------
   Arrow styles
------------------------------ */
const arrowVariants = cva("h-2 w-2 rotate-45", {
  variants: {
    placement: {
      top: "top-full left-1/2 -translate-x-1/2 -translate-y-1",
      bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1",
      left: "left-full top-1/2 -translate-x-1 -translate-y-1/2",
      right: "right-full top-1/2 translate-x-1 -translate-y-1/2",
    },
  },
  defaultVariants: {
    placement: "top",
  },
});

const OFFSET_INITIAL = 20;
const OFFSET_FINAL = 0;

const INITIAL_VARIANT = {
  scale: 0.6,
  opacity: 0,
} as const;

const ANIMATE_VARIANT = {
  scale: 1,
  opacity: 1,
} as const;

/* -----------------------------
   Motion variants
------------------------------ */
const motionVariants = {
  top: {
    initial: { ...INITIAL_VARIANT, y: OFFSET_INITIAL },
    animate: { ...ANIMATE_VARIANT, y: OFFSET_FINAL },
    exit: { ...INITIAL_VARIANT, y: OFFSET_INITIAL },
  },
  bottom: {
    initial: { ...INITIAL_VARIANT, y: -OFFSET_INITIAL },
    animate: { ...ANIMATE_VARIANT, y: OFFSET_FINAL },
    exit: { ...INITIAL_VARIANT, y: -OFFSET_INITIAL },
  },
  left: {
    initial: { ...INITIAL_VARIANT, x: OFFSET_INITIAL },
    animate: { ...ANIMATE_VARIANT, x: OFFSET_FINAL },
    exit: { ...INITIAL_VARIANT, x: OFFSET_INITIAL },
  },
  right: {
    initial: { ...INITIAL_VARIANT, x: -OFFSET_INITIAL },
    animate: { ...ANIMATE_VARIANT, x: OFFSET_FINAL },
    exit: { ...INITIAL_VARIANT, x: -OFFSET_INITIAL },
  },
} as const;

type AppTooltipProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tooltipVariants> & {
    content: ReactNode;
    delay?: number;
    children: ReactElement<HTMLAttributes<HTMLElement>>;
  };

/* -----------------------------
   Tooltip component
------------------------------ */
export const AppToolTip = ({
  children,
  content,
  placement,
  className,
  delay = 0.5,
}: AppTooltipProps) => {
  placement = placement ?? "top";
  const [open, setOpen] = useState(false);
  const id = useId();

  const motionState = motionVariants[placement];

  return (
    <div className="relative inline-flex">
      {cloneElement(children, {
        "aria-describedby": open ? id : undefined,
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onFocus: () => setOpen(true),
        onBlur: () => setOpen(false),
      })}

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            role="tooltip"
            className={clsx(
              tooltipVariants({ placement }),
              className,
              COMMON_CLASS,
            )}
            initial={motionState.initial}
            animate={{
              ...motionState.animate,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 15,
                delay: delay,
              },
            }}
            exit={{
              ...motionState.exit,
              transition: {
                duration: 0.1,
                ease: "easeIn",
                delay: 0,
              },
            }}
          >
            {content}

            <span
              className={clsx(arrowVariants({ placement }), COMMON_CLASS)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
