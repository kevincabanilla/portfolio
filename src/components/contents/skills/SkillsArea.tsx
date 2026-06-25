import { motion } from "motion/react";
import { fadeInUp, waveCascadeContainer, waveCascadeItem } from "@/animations";
import type { SkillArea } from "@/models";
import { reactIconMap } from "@/constants/reactIcons";
import { AppCard } from "@/components/common/containers";

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
        <h3 className="text-white">{label}</h3>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-2"
        variants={waveCascadeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {items.map((skill) => {
          const Icon = reactIconMap[skill.icon];
          return (
            <motion.div key={skill.text} variants={waveCascadeItem}>
              <AppCard className="flex items-center justify-center py-2.5 px-4 rounded-md text-primary hover:text-secondary">
                {Icon && <Icon size={24} className="mr-2.5" />}
                <span>{skill.text}</span>
              </AppCard>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
