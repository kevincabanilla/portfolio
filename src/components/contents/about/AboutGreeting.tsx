import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function AboutGreeting({ text }: { text: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  return (
    <motion.span
      ref={ref}
      className="inline-block text-white font-bold mb-4 leading-tight text-xl md:text-[28px]"
      aria-label={text}
    >
      {[
        ...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(
          text,
        ),
      ].map(({ segment: char }, i) => {
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
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: i * 0.025,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
