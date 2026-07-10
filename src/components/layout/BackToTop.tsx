import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";
import clsx from "clsx";
import { NavItemEnum } from "@/models";
import { useScrolledDown, useScrollTo } from "@/hooks";

export default function BackToTop() {
  const isVisible = useScrolledDown(720);
  const scrollTo = useScrollTo();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          aria-label="Back to top"
          className={clsx(
            "flex items-center justify-center fixed z-50",
            "text-primary cursor-pointer",
            "bottom-17 md:bottom-8",
            "right-5 md:right-8",
            "w-10 md:w-11",
            "h-10 md:h-11",
            "border border-white/8 rounded-full",
            "bg-navy/50 backdrop-blur-[20px]",
            "shadow-lg transition-shadow duration-300",
            "hover:border-primary/40",
            "hover:shadow-[0_0_25px_rgba(var(--rgb-primary)/0.15),0_4px_20px_rgba(0,0,0,0.3)]",
          )}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{
            y: -2,
          }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            scrollTo(NavItemEnum.Hero);
          }}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
