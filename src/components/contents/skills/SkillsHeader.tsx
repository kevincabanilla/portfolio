import type { PropsWithChildren } from "react";
import { motion } from "motion/react";
import { staggerItem } from "@/animations";

export default function SkillsHeader({ children }: PropsWithChildren) {
  return (
    <motion.div variants={staggerItem}>
      <div className="h-px bg-linear-to-r from-transparent via-cyan/60 to-transparent" />
      <h3 className="text-2xl font-semibold text-primary text-center mt-6">
        {children}
      </h3>
    </motion.div>
  );
}
