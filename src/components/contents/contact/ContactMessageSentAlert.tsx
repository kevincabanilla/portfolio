import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";
import { AppCard } from "@/components/common/containers";

export default function ContactMessageSentAlert({
  senderName,
  onReset,
}: {
  senderName: string;
  onReset: () => void;
}) {
  const [stage, setStage] = useState<"typing" | "sent">("typing");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3_000));
      if (cancelled) return;

      setStage("sent");

      await new Promise((resolve) => setTimeout(resolve, 12_000));

      onReset();
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [onReset]);

  return (
    <AppCard
      rounded
      className="py-12 px-8 flex flex-col items-center justify-center min-h-70 h-full text-center"
    >
      <AnimatePresence mode="wait">
        {stage === "typing" ? (
          <motion.div
            key="typing"
            className="flex gap-2 p-6 rounded-2xl bg-primary/6 border border-primary/15"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={`dot-${dot}`}
                className="bg-cyan w-2 h-2 rounded-[50%]"
                // animate={{ y: [0, -8, 0] }} // typing
                animate={{ scale: [1, 1.5, 1] }} // pulsing
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  delay: dot * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="sent"
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              <CheckCircle size={48} className="text-cyan" />
            </motion.div>
            <h4 className="text-primary text-xl font-bold">Message sent!</h4>
            {senderName && (
              <p className="text-muted text-sm">
                Thanks, {senderName}! I'll get back to you soon.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </AppCard>
  );
}
