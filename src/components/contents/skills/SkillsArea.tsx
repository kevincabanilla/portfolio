import { motion } from "motion/react";
import { fadeInUp, waveCascadeContainer, waveCascadeItem } from "@/animations";
import type { SkillArea } from "@/models";
import { ReactIcons } from "@/constants";
import { AppCard } from "@/components/common/containers";
import clsx from "clsx";

const viewport = { margin: "0px 0px -100px 0px" };

export default function SkillsArea({ label, items }: SkillArea) {
  return (
    <>
      <motion.div
        className="flex items-center gap-3 text-xl font-semibold mb-3"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={viewport}
      >
        <div className="h-6 w-1 rounded-full bg-linear-to-b from-cyan via-purple to-pink/30" />
        <h3 className="text-white text-sm md:text-lg">{label}</h3>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-2 justify-center md:justify-start"
        variants={waveCascadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {items.map((skill) => {
          const Icon = ReactIcons.ICON_MAP[skill.icon];
          return (
            <motion.div key={skill.text} variants={waveCascadeItem}>
              <AppCard
                className={clsx(
                  "group rounded-md h-25 w-25",
                  "grid grid-rows-2 ",
                  "text-center text-xs",
                  "py-1.5 px-3 md:py-2.5 md:px-4",
                )}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <div className="row-span-2 flex flex-col items-center justify-center p-4">
                  {!skill.svg ? (
                    Icon && (
                      <Icon
                        size={32}
                        className="text-gray/60 group-hover:text-secondary"
                      />
                    )
                  ) : (
                    <img
                      loading="lazy"
                      className={clsx(
                        "w-full h-full object-contain",
                        "md:grayscale md:group-hover:grayscale-0",
                        "md:contrast-[1.2] md:group-hover:contrast-100",
                        "md:brightness-[1.5] md:group-hover:brightness-100",
                        "md:opacity-60 md:group-hover:opacity-100",
                        "transition duration-300 ease-[ease]",
                      )}
                      src={skill.svg}
                      alt={skill.text}
                    />
                  )}
                </div>

                <div className="text-center truncate text-primary group-hover:text-secondary">
                  <span>{skill.text}</span>
                </div>
              </AppCard>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
