import { motion } from "motion/react";

export default function Nothing() {
  const text = "NOTHING";
  return (
    <motion.div
      className="h-screen w-screen flex items-center justify-center font-mono font-medium text-5xl md:text-9xl text-purple"
      aria-label={text}
    >
      {[...text].map((char, i) => {
        if (char === " ") {
          return (
            <span key={`${char}-${i}`} className="inline-block">
              &nbsp;
            </span>
          );
        }
        return (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 12,
              delay: i * 0.2,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
