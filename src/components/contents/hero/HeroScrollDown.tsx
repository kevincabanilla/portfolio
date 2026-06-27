import type { JSX } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useScrollTo } from "@/hooks";
import { NavItemEnum } from "@/models";

export default function HeroScrollDown(): JSX.Element {
  const scrollTo = useScrollTo();

  return (
    <motion.button
      onClick={() => scrollTo(NavItemEnum.About)}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted hover:text-secondary transition-colors cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      aria-label="Scroll to About section"
    >
      <motion.span
        className="text-xs font-mono tracking-widest uppercase"
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
      >
        Scroll
      </motion.span>

      {/* <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div> */}

      <motion.div
        animate={{
          y: [0, 0, 12, 12, 0],
          opacity: [0, 1, 1, 0, 0],
        }}
        transition={{
          duration: 2,
          //times: [0, 0.2, 0.3, 0.8, 1],
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
}
