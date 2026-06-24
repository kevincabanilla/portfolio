import { motion } from "motion/react";
import { staggerContainer, staggerItem } from "@/animations";
import { NavItemEnum } from "@/models";
import { Data } from "@/utils";
import { PageSection } from "../common/ui";
import SkillsArea from "../contents/skills/SkillsArea";
import SkillsHeader from "../contents/skills/SkillsHeader";

export default function Skills() {
  const skills = Data.getSkillsData();

  return (
    <PageSection
      id={NavItemEnum.Skills}
      headerTitle="Skills & Technologies"
      headerSubtitle="What I work with"
    >
      <div className="max-w-6xl my-0 mx-auto">
        <motion.div
          className="flex flex-col gap-12"
          variants={staggerContainer}
        >
          <SkillsHeader>Tech Stack</SkillsHeader>

          {Object.entries(skills.development).map(([key, value]) => (
            <motion.div key={key} variants={staggerItem}>
              <SkillsArea {...value} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col gap-12 mt-12"
          variants={staggerContainer}
        >
          <SkillsHeader>Other Skills</SkillsHeader>

          {Object.entries(skills.others).map(([key, value]) => (
            <motion.div key={key} variants={staggerItem}>
              <SkillsArea {...value} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageSection>
  );
}
