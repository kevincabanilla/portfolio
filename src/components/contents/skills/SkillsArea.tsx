import { motion } from "motion/react";
import { fadeInUp, waveCascadeContainer } from "@/animations";
import type { SkillArea } from "@/models";
import { SkillsItem } from "./SkillsItem";

const viewport = { margin: "0px 0px -100px 0px" };

export default function SkillsArea({ label, items }: SkillArea) {
  return (
    <>
      <motion.div
        className="flex items-center justify-center md:justify-start gap-3 text-xl font-semibold mb-3"
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
          return <SkillsItem key={skill.text} {...skill} />;
        })}
      </motion.div>
    </>
  );
}
