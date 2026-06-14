import { motion } from "motion/react";
import clsx from "clsx";
import AboutAvatarMonogram from "./AboutAvatarMonogram";
import AboutAvatarIcons from "./AboutAvatarIcons";

const avatarSize = 320;
const orbitRadius = 130;

const GlowRing = () => {
  return (
    <motion.div
      className={clsx(
        "absolute inset-2.5 rounded-full opacity-15 blur-[20px]",
        "bg-[conic-gradient(from_0deg,var(--color-cyan),var(--color-purple),var(--color-green),var(--color-cyan))]",
      )}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const GradientBorder = () => {
  return (
    <motion.div
      className={clsx(
        "absolute inset-7.5 rounded-full p-0.5",
        "bg-[conic-gradient(from_0deg,var(--color-cyan),transparent_40%,var(--color-purple),transparent_80%,var(--color-cyan))]",
      )}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="w-full h-full rounded-full backdrop-blur-sm bg-gray-950/80" />
    </motion.div>
  );
};

const DashedOrbitRing = () => {
  return (
    <div
      className="absolute inset-0"
      style={{
        width: avatarSize,
        height: avatarSize,
      }}
    >
      <svg className="w-full h-full">
        <circle
          cx="50%"
          cy="50%"
          r={orbitRadius}
          fill="none"
          className="stroke-white/6"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
};

export default function AboutAvatar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative my-0 mx-auto"
      style={{
        width: avatarSize,
        height: avatarSize,
      }}
    >
      {/* Outer glow ring */}
      <GlowRing />

      {/* Rotating gradient border */}
      <GradientBorder />

      {/* Inner circle with monogram */}
      <AboutAvatarMonogram>{children}</AboutAvatarMonogram>

      {/* Dashed orbit ring */}
      <DashedOrbitRing />

      {/* Orbiting icons */}
      <AboutAvatarIcons avatarSize={avatarSize} orbitRadius={orbitRadius} />
    </div>
  );
}
