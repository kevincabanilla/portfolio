import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks";

export default function RevealTextOnScroll({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.4"],
  });

  const words = text.split(" ");

  if (reducedMotion) {
    return <span>{text}</span>;
  }

  return (
    <span ref={containerRef} className="inline-flex flex-wrap">
      {words.map((word, i) => (
        <DisplayWord
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </span>
  );
}

const DisplayWord = ({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const start = index / total;
  const end = Math.min(start + 1.5 / total, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span
      className="gradient-text inline-block mr-1"
      style={{
        opacity,
      }}
    >
      {word}
    </motion.span>
  );
};
