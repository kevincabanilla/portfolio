import { useEffect, useState, type JSX } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { cva, type VariantProps } from "class-variance-authority";

const terminalBadgeStyles = cva(
  [
    "inline-flex items-center gap-2",
    "font-mono text-green-500",
    "bg-green-500/5 backdrop-blur-md",
    "border border-green-500/10 rounded-full",
  ],
  {
    variants: {
      size: {
        sm: "px-3 py-1 text-xs",
        default: "px-4 py-1 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type TerminalBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof terminalBadgeStyles> & {
    children: React.ReactNode;
    text: string;
  };

export default function TerminalBadge({
  text,
  children,
  size,
  className,
  ...props
}: TerminalBadgeProps): JSX.Element {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = (index: number) => {
      setVisibleChars(index);

      if (index < text.length) {
        timeoutId = setTimeout(
          () => type(index + 1),
          30 + Math.random() * 70, // Human-like typing speed
        );
      }
    };

    type(0);

    return () => clearTimeout(timeoutId);
  }, [text]);

  const isTyping = visibleChars < text.length;
  const displayed = text.slice(0, visibleChars).concat(isTyping ? "|" : "");

  return (
    <span className={clsx(terminalBadgeStyles({ size }), className)} {...props}>
      {/* Live indicator */}
      <motion.span
        className="w-2 h-2 rounded-full bg-green-500"
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {children}

      {/* Typed text */}
      <span>{displayed}</span>

      {/* Cursor */}
      {!isTyping && (
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            times: [0, 0.5, 0.5, 1],
            ease: "linear",
          }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}
