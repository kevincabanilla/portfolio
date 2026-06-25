import type { ComponentProps } from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { staggerItem } from "@/animations";
import type { ContactOption } from "@/models";
import { AppCard } from "@/components/common/containers";
import clsx from "clsx";
import { ICON_MAP } from "@/utils";

const contactCardStyles = cva(
  [
    "py-4 px-3.5 md:py-4.5 md:px-5",
    "flex items-center gap-3",
    "no-underline cursor-pointer",
    "border-l-[3px] ",
  ],
  {
    variants: {
      variant: {
        default: "border-primary",
        email: "border-green",
        linkedin: "border-cyan",
        instagram: "border-rose-400",
        mobile: "border-amber",
        github: "border-white",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

const contactIconStyles = cva(
  ["w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"],
  {
    variants: {
      variant: {
        default: "bg-primary/8 border-primary/15",
        email: "bg-green/8 border-green/15",
        linkedin: "bg-cyan/8 border-cyan/15",
        instagram: "bg-rose-400/8 border-rose-400/15",
        mobile: "bg-amber/8 border-amber/15",
        github: "bg-white/8 border-white/15",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

const contactColorStyles = cva([], {
  variants: {
    variant: {
      default: "text-primary",
      email: "text-green",
      linkedin: "text-cyan",
      instagram: "text-rose-400",
      mobile: "text-amber",
      github: "text-white",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

type ContactCardVariantProps = VariantProps<typeof contactCardStyles>;

type ContactCardProps = ComponentProps<typeof motion.a> &
  ContactCardVariantProps & {
    option: ContactOption;
  };

export type ContactCardVariant = NonNullable<
  ContactCardVariantProps["variant"]
>;

export default function ContactCard({ option, className }: ContactCardProps) {
  const variant = option.id as ContactCardVariant;
  const ContactIcon = ICON_MAP[option.icon];

  return (
    <AppCard className="rounded-r-2xl" variants={staggerItem}>
      <motion.a
        target="_blank"
        rel="noopener noreferrer"
        href={option.link}
        aria-label={`${option.title}: ${option.value}`}
        className={clsx(contactCardStyles({ variant }), className)}
      >
        {/* Icon */}
        <div className={contactIconStyles({ variant })}>
          <ContactIcon className={contactColorStyles({ variant })} size={20} />
        </div>

        {/* Contents */}
        <div className="grow flex flex-col min-w-0">
          <p className="text-muted text-xs uppercase font-semibold tracking-[0.06em]">
            {option.title}
          </p>
          <p className="text-white text-xs md:text-sm font-medium mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
            {option.value}
          </p>
        </div>

        {/* Actions */}
        <div
          className={clsx(
            "flex items-center shrink-0 gap-1 text-xs font-medium whitespace-nowrap",
            contactColorStyles({ variant }),
          )}
        >
          {option.message}
          <ArrowUpRight size={14} />
        </div>
      </motion.a>
    </AppCard>
  );
}
