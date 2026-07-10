import { useState } from "react";
import { motion } from "motion/react";
import { ReactIcons } from "@/constants";
import type { SkillItem } from "@/models";
import { waveCascadeItem } from "@/animations";
import { AppCard } from "@/components/common/containers";
import { AppToolTip } from "@/components/common/indicators";
import clsx from "clsx";

export const SkillsItem = ({ text, icon, svg }: SkillItem) => {
  const [isImageValid, setIsImageValid] = useState(true);
  const Icon = ReactIcons.ICON_MAP[icon];
  return (
    <motion.div variants={waveCascadeItem}>
      <AppToolTip content={text}>
        <AppCard
          className={clsx(
            "group rounded-md",
            "md:h-20 md:w-20",
            "flex items-center justify-center gap-3 md:grid md:grid-rows-2 md:gap-0",
            "text-center text-xs",
            "py-1.5 px-3 md:p-2",
          )}
          whileHover={{ scale: 1.1, y: -5 }}
        >
          <div className="row-span-2 flex flex-col items-center justify-center md:p-4">
            {!svg || !isImageValid ? (
              Icon && (
                <Icon
                  className={clsx(
                    "w-5 md:w-8",
                    "h-5 md:h-8",
                    "text-primary md:text-gray/60 group-hover:text-secondary",
                  )}
                />
              )
            ) : (
              <img
                loading="lazy"
                className={clsx(
                  "object-contain",
                  "w-5 md:w-full",
                  "h-5 md:h-full",
                  "md:grayscale md:group-hover:grayscale-0",
                  "md:contrast-[1.2] md:group-hover:contrast-100",
                  "md:brightness-[1.5] md:group-hover:brightness-100",
                  "md:opacity-60 md:group-hover:opacity-100",
                  "transition duration-300 ease-[ease]",
                )}
                src={svg}
                alt={text}
                onError={() => {
                  setIsImageValid(false);
                }}
              />
            )}
          </div>

          <div className="text-center truncate text-primary group-hover:text-secondary cursor-default">
            <span>{text}</span>
          </div>
        </AppCard>
      </AppToolTip>
    </motion.div>
  );
};
