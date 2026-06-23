import { cva, type VariantProps } from "class-variance-authority";

export type AppButtonProps = VariantProps<typeof appButtonStyles> & {
  isLoading?: boolean;
  loadingMessage?: string;
};

export const appButtonStyles = cva(
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
      rounded: false,
      disabled: false,
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
