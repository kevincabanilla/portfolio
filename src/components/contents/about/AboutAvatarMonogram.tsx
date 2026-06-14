import { motion } from "motion/react";
import clsx from "clsx";

export default function AboutAvatarMonogram({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "absolute inset-8.5",
        "flex flex-col items-center justify-center gap-1",
        "rounded-full backdrop-blur-md",
        "bg-[radial-gradient(circle_at_30%_30%,rgb(var(--rgb-avatar-inner)/0.9),rgb(var(--rgb-avatar-outer)/0.85))]",
      )}
    >
      <motion.span
        className="text-5xl font-bold font-mono gradient-text leading-none"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        {children}
      </motion.span>

      <motion.span
        className="text-xs font-mono text-green tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        {"> dev_"}
      </motion.span>
    </div>
  );
}
