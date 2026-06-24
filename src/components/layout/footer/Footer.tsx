import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Data } from "@/utils";
import FooterContent from "./FooterContent";
import { staggerContainer } from "@/animations";
import { Toast } from "@/components/common/ui";

const KONAMI_CODE: string[] = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function Footer() {
  const { fullName, socialProfiles, site } = Data.getPersonalData();

  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const konamiIdx = useRef(0);

  useEffect(() => {
    let resetTimer: number;
    const handleKey = (e: KeyboardEvent) => {
      if (showEasterEgg) return;

      clearTimeout(resetTimer);

      const key = e?.key?.toLowerCase();

      if (key !== KONAMI_CODE[konamiIdx.current].toLowerCase()) {
        konamiIdx.current = 0;
        return;
      }

      konamiIdx.current += 1;

      if (konamiIdx.current === KONAMI_CODE.length) {
        setShowEasterEgg(true);
        konamiIdx.current = 0;
      } else {
        resetTimer = setTimeout(() => {
          konamiIdx.current = 0;
        }, 1000);
      }
    };

    globalThis.addEventListener("keydown", handleKey);
    return () => globalThis.removeEventListener("keydown", handleKey);
  }, [showEasterEgg]);

  return (
    <footer className="relative border border-t border-white/4">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan/30 to-transparent" />

      <motion.div
        className="max-w-7xl flex flex-col items-center gap-5 py-10 px-6 my-0 mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
      >
        <FooterContent
          fullName={fullName}
          socialProfiles={socialProfiles}
          site={site}
        />

        {/* Easter egg */}
        <Toast
          visible={showEasterEgg}
          type="success"
          vertical="end"
          onClose={() => setShowEasterEgg(false)}
        >
          <span className="font-mono text-xs text-primary text-center">
            Congratulations - You found the secret! Thank you for exploring.
          </span>
        </Toast>
        {/* {showEasterEgg && (
          <motion.div
            className="py-2 px-4 font-mono text-xs text-primary text-center border border-primary/30 rounded-xl bg-linear-to-br from-primary/15 to-secondary/20"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            Congratulations - You found the secret! Thank you for exploring.
          </motion.div>
        )} */}
      </motion.div>
    </footer>
  );
}
