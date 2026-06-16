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
  {
    Icon: Braces,
    iconClass: "text-purple-400 bg-purple-400/5 border-purple-400/10",
  },
  {
    Icon: Code2,
    iconClass: "text-emerald-500 bg-emerald-500/5 border-emerald-500/10",
  },
  {
    Icon: Database,
    iconClass: "text-amber-300 bg-amber-300/5 border-amber-300/10",
  },
  {
    Icon: GitBranch,
    iconClass: "text-pink-500 bg-pink-500/5 border-pink-500/10",
  },
  // {
  //   Icon: Container,
  //   iconClass: "text-blue-500 bg-blue-500/5 border-blue-500/10",
  // },
  {
    Icon: Terminal,
    iconClass: "text-lime-400 bg-lime-400/5 border-lime-400/10",
  },
  { Icon: Cloud, iconClass: "text-cyan-500 bg-cyan-500/5 border-cyan-500/10" },
  // { Icon: Bot, iconClass: "text-rose-600 bg-rose-600/5 border-rose-600/10" },
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
    const direction = 90;
    const angle = baseDistance * idx - direction;
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
          delay: delay * 0.4,
        }}
      >
        <Icon size={iconSize} />
      </motion.div>
    );
  });
}
