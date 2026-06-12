import { type JSX, useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Data, Helper } from "@/utils";
import { NavItemEnum } from "@/models";
import { staggerContainer, staggerItem } from "@/animations/staggerContainer";
import TerminalBadge from "@/components/common/ui/TerminalBadge";
import HeroExternalLinks from "./HeroExternalLinks";
import {
  AppButton,
  AppButtonLink,
} from "@/components/common/buttons";

export default function HeroContent(): JSX.Element {
  const [roleIndex, setRoleIndex] = useState(0);

  const { fullName, title, roles, resumeUrl } = useMemo(
    () => Data.getPersonalData(),
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles]);

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center text-center px-4 py-32 gap-7 max-w-5xl mx-auto"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Terminal badge */}
      <motion.div variants={staggerItem}>
        <TerminalBadge text={title}>
          <span>//</span>
        </TerminalBadge>
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
        variants={staggerItem}
      >
        <span className="text-[#eeeef5]">Hi, I&apos;m </span>
        <span className="gradient-text-vivid">{fullName}</span>
      </motion.h1>

      {/* Animated role cycling */}
      <motion.div
        className="h-9 md:h-11 flex items-center justify-center"
        variants={staggerItem}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={roleIndex}
            className="font-mono text-base md:text-xl text-purple"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {roles[roleIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-4 mt-4"
        variants={staggerItem}
      >
        <AppButton onClick={() => Helper.scrollToId(NavItemEnum.Projects)}>
          View Projects
        </AppButton>
        <AppButtonLink variant="outline" href={resumeUrl} download>
          Download Resume
        </AppButtonLink>
      </motion.div>

      {/* Status widget + Social icons */}
      <HeroExternalLinks />
    </motion.div>
  );
}
