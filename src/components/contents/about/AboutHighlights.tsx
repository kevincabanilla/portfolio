import { motion } from "motion/react";
import type { IconType } from "react-icons";
import clsx from "clsx";
import { staggerItem } from "@/animations";
import { ICON_MAP } from "@/utils";
import type { HighlightItem } from "@/models";

export default function AboutHighlights({ items }: { items: HighlightItem[] }) {
  // Maps the color defined in personal.json/about/highlights
  const iconColors = {
    cyan: "bg-cyan/8 border border-cyan/20 text-cyan",
    amber: "bg-amber/8 border border-amber/20 text-amber",
    green: "bg-green/8 border border-green/20 text-green",
  } as const;

  type HighlightColor = keyof typeof iconColors;

  const HIGHLIGHT_ICONS: {
    Icon: IconType;
    color: HighlightColor;
  }[] = items.map((x) => ({
    Icon: ICON_MAP[x.icon] as IconType,
    color: x.color as HighlightColor,
  }));

  return items.map((item, idx) => {
    const { Icon, color } = HIGHLIGHT_ICONS[idx];
    return (
      <motion.div
        key={item.text}
        variants={staggerItem}
        className={clsx(
          "flex items-start gap-2.5 md:gap-3.5",
          "p-3 md:p-3.5",
          "rounded-xl",
          "bg-white/5",
          "backdrop-blur-md",
          "border border-white/10",
        )}
      >
        <div
          className={clsx(
            "w-8 h-8 rounded-[10px]",
            "flex items-center justify-center shrink-0",
            "mt-px",
            iconColors[color],
          )}
        >
          <Icon size={16} />
        </div>
        <p
          className={clsx(
            "text-slate-300",
            "leading-[1.7] m-0",
            "text-[13px] md:text-[14px]",
          )}
        >
          {item.text}
        </p>
      </motion.div>
    );
  });
}
