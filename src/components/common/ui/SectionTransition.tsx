import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/hooks";
import clsx from "clsx";

const VARIANTS_MAP = {
  GradientSweep,
  GlowPulse,
  GeometricScatter,
  Beam,
};

export type TransitionVariant = keyof typeof VARIANTS_MAP;

export default function SectionTransition({
  variant,
}: {
  variant?: TransitionVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  if (reducedMotion) return <div className="section-divider" />;

  const VariantRenderer = VARIANTS_MAP[variant ?? "GradientSweep"];

  return (
    <div
      className="relative h-20 flex items-center overflow-hidden pointer-events-none"
      ref={ref}
      aria-hidden="true"
    >
      <div className="relative w-full">
        <VariantRenderer progress={scrollYProgress} />
      </div>
    </div>
  );
}

interface ProgressProps {
  progress: MotionValue<number>;
}

/**
 * GradientSweep
 */
function GradientSweep({ progress }: ProgressProps) {
  const width = useTransform(progress, [0, 0.5, 1], ["0%", "100%", "100%"]);
  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <motion.div
      className="h-px my-0 mx-auto bg-linear-to-r from-cyan-500 via-purple-500 to-cyan-500"
      style={{
        width,
        opacity,
      }}
    />
  );
}

/**
 * GlowPulse
 */
function GlowPulse({ progress }: ProgressProps) {
  const opacity = useTransform(progress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.8, 1, 0.8]);
  return (
    <>
      <div className="section-divider" />
      <motion.div
        className={clsx(
          "absolute top-1/2 left-1/2 h-20 w-20",
          "-translate-x-1/2 -translate-y-1/2 rounded-full blur-[20px]",
          "bg-[radial-gradient(circle,rgb(var(--rgb-primary)/0.15),transparent_70%)]",
        )}
        style={{
          opacity,
          scale,
        }}
      />
    </>
  );
}

/**
 * GeometricScatter
 */
function GeometricScatter({ progress }: ProgressProps) {
  const GEOMETRIC_DOT_INDICES = [0, 1, 2, 3, 4];

  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const spread = useTransform(progress, [0, 0.5, 1], [0, 1, 0]);

  const GeometricDot = ({
    index,
    spread,
  }: {
    index: number;
    spread: MotionValue<number>;
  }) => {
    const x = useTransform(spread, (v: number) => (index - 2) * 60 * v);
    const opacity = useTransform(spread, (v: number) => 0.3 + v * 0.7);
    return (
      <motion.div
        className={clsx(
          "w-1 h-1 rounded-full",
          index % 2 === 0 ? "bg-cyan" : "bg-purple",
        )}
        style={{
          x,
          opacity,
        }}
      />
    );
  };

  return (
    <>
      <div className="h-px bg-[linear-gradient(90deg,transparent_5%,rgba(168,85,247,0.2)_50%,transparent_95%)]" />

      <motion.div
        className="absolute inset-0 flex items-center justify-center gap-2"
        style={{
          opacity,
        }}
      >
        {GEOMETRIC_DOT_INDICES.map((i) => (
          <GeometricDot key={i} index={i} spread={spread} />
        ))}
      </motion.div>
    </>
  );
}

/**
 * Beam
 */
function Beam({ progress }: ProgressProps) {
  const x = useTransform(progress, [0, 1], ["-100%", "200%"]);
  const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="relative overflow-hidden h-px">
      <div className="h-full bg-[linear-gradient(90deg,transparent_5%,rgba(255,255,255,0.04)_50%,transparent_95%)]" />
      <motion.div
        className={clsx(
          "absolute -top-0.5 w-20 h-1.25 rounded",
          "bg-linear-to-r from-transparent via-cyan to-transparent",
          "backdrop-blur-xs",
        )}
        style={{
          x,
          opacity,
        }}
      />
    </div>
  );
}
