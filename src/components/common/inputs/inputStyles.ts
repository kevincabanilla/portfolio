import { cva, type VariantProps } from "class-variance-authority";

export type AppInputLabelVariant = VariantProps<typeof appInputLabelStyles>;
export type AppInputFieldVariant = VariantProps<typeof appInputFieldStyles>;

export const appInputLabelStyles = cva(
  ["block text-xs text-gray font-semibold uppercase tracking-wider mb-2"],
  {
    variants: {
      //
    },
    defaultVariants: {
      //
    },
  },
);

export const appInputFieldStyles = cva(
  [
    "w-full",
    "bg-navy/50",
    "backdrop-blur-md",
    "border border-white/6",
    "rounded-xl",
    "px-4.5 py-3.5",
    "text-primary text-sm",
    "outline-none",
    "transition-[background,border-color,box-shadow] duration-300 ease-in-out",
    "placeholder:text-muted",
    "focus:bg-navy/70",
    "focus:border-[rgb(var(--rgb-primary)/0.35)]",
    "focus:shadow-[0_0_0_3px_rgb(var(--rgb-primary)/0.08),0_0_25px_rgb(var(--rgb-primary)/0.06)]",
  ],
  {
    variants: {
      //
    },
    defaultVariants: {
      //
    },
  },
);
