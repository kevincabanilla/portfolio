import type { SocialProfile } from "@/models";
import { ICON_MAP } from "@/utils";
import { motion } from "motion/react";
import clsx from "clsx";

export default function HeroExternalLinks({
  socialProfiles,
}: {
  socialProfiles: SocialProfile[];
}) {
  const content = socialProfiles.map((profile) => {
    const IconComponent = ICON_MAP[profile.icon];

    return (
      <motion.a
        key={profile.id}
        href={profile.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${profile.name} profile`}
        className={clsx(
          "w-10 h-10", // 40px
          "rounded-xl",
          "border border-white/5",
          "bg-white/5",
          "backdrop-blur-md",
          "flex items-center justify-center",
          "text-gray",
        )}
        whileHover={{
          scale: 1.15,
          y: -3,
          color: "rgb(var(--rgb-secondary))",
          borderColor: "rgba(var(--rgb-primary), 0.3)",
          background: "rgba(var(--rgb-primary), 0.08)",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <IconComponent size={18} />
      </motion.a>
    );
  });

  return content;
}
