import { type ComponentProps } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  type LucideIcon,
  CheckCircle,
  X,
  Info,
  TriangleAlert,
  OctagonX,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const toastStyles = cva(
  [
    "fixed z-300",
    "flex items-center gap-3",
    "py-3 px-5 bg-navy/70 backdrop-blur-lg",
    "border rounded-xl min-w-60 max-w-90",
  ],
  {
    variants: {
      type: {
        info: [
          "text-blue-300 bg-blue-300/8 border-blue-300/15",
          "shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_20px_color-mix(in_oklab,var(--color-blue-300)_10%,transparent)]",
        ],
        success: [
          "text-green-500 bg-green-500/8 border-green-500/15",
          "shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_20px_color-mix(in_oklab,var(--color-green-500)_5%,transparent)]",
        ],
        warning: [
          "text-amber-400 bg-amber-400/8 border-amber-400/15",
          "shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_20px_color-mix(in_oklab,var(--color-amber-400)_5%,transparent)]",
        ],
        error: [
          "text-rose-500 bg-rose-500/8 border-rose-500/15",
          "shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_20px_color-mix(in_oklab,var(--color-rose-500)_50%,transparent)]",
        ],
      },
      horizontal: {
        start: "left-8",
        center: "left-1/2 -translate-x-1/2",
        end: "right-8",
      },
      vertical: {
        start: "top-8",
        center: "top-1/2 -translate-y-1/2",
        end: "bottom-8",
      },
    },
    defaultVariants: {
      type: "info",
      horizontal: "center",
      vertical: "center",
    },
  },
);

const iconMap: Record<
  NonNullable<VariantProps<typeof toastStyles>["type"]>,
  LucideIcon
> = {
  info: Info,
  success: CheckCircle,
  warning: TriangleAlert,
  error: OctagonX,
};

type ToastProps = ComponentProps<typeof motion.div> &
  VariantProps<typeof toastStyles> & {
    visible: boolean;
    children?: React.ReactNode;
    onClose?: () => void;
  };

export default function Toast({
  className,
  type,
  horizontal,
  vertical,
  visible,
  children,
  onClose,
}: ToastProps) {
  const Icon = iconMap[type || "info"];

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live={type === "error" ? "assertive" : "polite"}
          initial={{ opacity: 0, y: 40, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, x: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={clsx(
            toastStyles({
              type,
              horizontal,
              vertical,
            }),
            className,
          )}
        >
          {<Icon size={20} className="shrink-0" />}
          <span className="text-sm font-medium flex-1">{children}</span>

          {onClose && (
            <button
              aria-label="Dismiss"
              className={clsx(
                "flex items-center justify-center shrink-0",
                "w-6.5 h-6.5 rouded-md border-none",
                "bg-transparent cursor-pointer",
                "transition-colors duration-200",
                "hover:text-white",
              )}
              onClick={onClose}
            >
              <X size={18} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
