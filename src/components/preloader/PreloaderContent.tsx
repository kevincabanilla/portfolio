import { motion } from "motion/react";
import { LogoInitials } from "../common/ui";

export default function PreloaderContent({
  displayProgress,
}: {
  displayProgress: number;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-201 flex flex-col items-center justify-center gap-6 pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ambient glow */}
      <div className="absolute w-100 h-100 rounded-full bg-[radial-gradient(circle,rgb(var(--rgb-primary)/.1),transparent_70%)] blur-[50px]" />

      {/* Logo */}
      <motion.div
        className="relative text-5xl font-bold text-glow-primary"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <LogoInitials />
      </motion.div>

      {/* Progress bar */}
      <div className="relative w-45 h-1 rounded-sm overflow-hidden bg-white/4">
        <motion.div
          className="h-full bg-linear-to-r from-cyan to-purple"
          initial={{ width: "0%" }}
          animate={{ width: `${displayProgress}%` }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </div>

      {/* Percentage */}
      <motion.span
        className="font-mono text-sm text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
      >
        {displayProgress}%
      </motion.span>
    </motion.div>
  );
}
