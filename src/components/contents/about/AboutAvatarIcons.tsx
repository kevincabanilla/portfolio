import { motion } from "motion/react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Cloud,
  Terminal,
  Braces,
  Database,
  GitBranch,
} from "lucide-react";

const orbitItems: {
  Icon: LucideIcon;
  iconClass: string;
}[] = [
  { Icon: Cloud, iconClass: "text-cyan bg-cyan/5 border-cyan/10" },
  { Icon: Terminal, iconClass: "text-green bg-green/5 border-green/10" },
  { Icon: Braces, iconClass: "text-purple bg-purple/5 border-purple/10" },
  { Icon: Database, iconClass: "text-amber bg-amber/5 border-amber/10" },
  { Icon: GitBranch, iconClass: "text-pink bg-pink/5 border-pink/10" },
  { Icon: Code2, iconClass: "text-indigo bg-indigo/5 border-indigo/10" },
];

const floatVariant = (delay: number) => ({
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay,
    },
  },
});

export default function AboutAvatarIcons({
  avatarSize,
  orbitRadius,
}: {
  avatarSize: number;
  orbitRadius: number;
}) {
  const baseDistance = 360 / orbitItems.length;
  const iconSize = 16;
  const avatarCenter = avatarSize / 2;

  return orbitItems.map(({ Icon, iconClass }, idx) => {
    const angle = baseDistance * idx;
    const delay = idx * 0.5;
    const rad = (angle * Math.PI) / 180;
    const x = avatarCenter + orbitRadius * Math.cos(rad) - 18;
    const y = avatarCenter + orbitRadius * Math.sin(rad) - 18;

    return (
      <motion.div
        key={angle}
        className={clsx(
          "absolute flex items-center justify-center w-9 h-9 backdrop-blur-sm border rounded-[10px]",
          iconClass,
        )}
        style={{
          left: x,
          top: y,
        }}
        initial={{ opacity: 0, scale: 0 }}
        variants={floatVariant(delay)}
        animate="animate"
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          delay: delay * 0.6,
        }}
      >
        <Icon size={iconSize} />
      </motion.div>
    );
  });
}
