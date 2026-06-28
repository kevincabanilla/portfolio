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
      <motion.div
        className="absolute w-100 h-100 rounded-full bg-[radial-gradient(circle,rgb(var(--rgb-primary)/.15),transparent_70%)] blur-[50px]"
        animate={{
          opacity: [0.5, 1],
          scale: [1, 1.1],
          filter: ["blur(40px)", "blur(60px)"],
        }}
        transition={{
          duration: 1.85,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative text-5xl font-bold text-glow-primary"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: [0.9, 1],
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: {
            duration: 1.85,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
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
