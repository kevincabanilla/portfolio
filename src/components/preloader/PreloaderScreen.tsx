import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PreloaderContent from "./PreloaderContent";

const DURATION_MS = 400;

export default function PreloaderScreen({ isLoaded }: { isLoaded: boolean }) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const start = performance.now();
    let animationFrame = 0;

    const step = (current: DOMHighResTimeStamp) => {
      const t = Math.min(1, (current - start) / DURATION_MS);

      let currentProgress: number;

      if (t < 0.4) {
        currentProgress = (t / 0.4) * 70;
      } else if (t < 0.7) {
        currentProgress = 70 + ((t - 0.4) / 0.3) * 20;
      } else {
        // Last 30% of the animation only moves 10% of the progress bar.
        currentProgress = 90 + ((t - 0.7) / 0.3) * 10;
      }

      setProgress(currentProgress);

      if (t < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const displayProgress = Math.min(Math.max(Math.round(progress), 1), 100);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <>
          {/* Top half */}
          <motion.div
            className="fixed top-0 inset-x-0 h-1/2 z-200 bg-bg-accent/95 backdrop-blur-2xl"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05,
            }}
          />

          {/* Center content (sits on top of both halves) */}
          <PreloaderContent displayProgress={displayProgress} />

          {/* Bottom half */}
          <motion.div
            className="fixed bottom-0 inset-x-0 h-1/2 z-200 bg-bg-accent/95 backdrop-blur-2xl"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.05,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
