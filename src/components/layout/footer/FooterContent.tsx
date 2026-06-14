import { motion } from "motion/react";
import type { SiteConfig, SocialProfile } from "@/models";
import { staggerItem } from "@/animations";
import { Helper } from "@/utils";
import HeroExternalLinks from "@/components/contents/hero/HeroExternalLinks";

export default function FooterContent({
  fullName,
  socialProfiles,
  site,
}: {
  fullName: string;
  socialProfiles: SocialProfile[];
  site: SiteConfig;
}) {
  const techStacks = site.techStacks || [];

  return (
    <>
      {/* Logo */}
      <motion.span
        className="text-glow-primary text-primary font-mono text-2xl font-bold"
        variants={staggerItem}
      >
        {Helper.getInitials(fullName)}
      </motion.span>

      {/* Social links */}
      <motion.div className="flex items-center gap-3" variants={staggerItem}>
        <HeroExternalLinks socialProfiles={socialProfiles} />
      </motion.div>

      {/* Built with tech strip */}
      {techStacks.length > 0 && (
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 font-mono"
          variants={staggerItem}
        >
          <span className="w-full md:w-auto text-center text-[11px] text-primary/40">
            Built with
          </span>
          {techStacks.map((tech) => (
            <span
              key={tech}
              className="text-[10px] text-secondary py-0.5 px-2 bg-white/3 border border-white/4 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      )}

      {/* Copyright + keyboard hint */}
      <motion.div
        className="flex flex-col items-center gap-2"
        variants={staggerItem}
      >
        <span className="text-primary/80 text-sm text-center">
          &copy; {new Date().getFullYear()} {fullName}
        </span>
        <span className="font-mono text-primary/40 text-[10px] text-center">
          Press 0-6 to navigate sections &middot; j/k to scroll
        </span>
      </motion.div>
    </>
  );
}
