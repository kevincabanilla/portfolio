import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMediaQuery, useReducedMotion } from "@/hooks";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const shapeRenedererStyles = cva([], {
  variants: {
    type: {
      triangle:
        "w-0 h-0 border-x-7 border-x-transparent border-b-14 border-b-cyan/12 rotate-15",
      triangle2:
        "w-0 h-0 border-x-9 border-x-transparent border-b-18 border-b-purple/12 -rotate-30",
      circle: "w-2.5 h-2.5 rounded-full bg-cyan/15",
      circle2: "w-2 h-2 rounded-full bg-pink/12",
      ring: "w-5 h-5 rounded-full bg-transparent border-[1.5px] border-purple/15",
      ring2:
        "w-4 h-4 rounded-full bg-transparent border-[1.5px] border-cyan/10",
      diamond: "w-2.5 h-2.5 bg-green/20 rotate-45",
      diamond2: "w-3 h-3 bg-amber/15 rotate-45",
    },
  },
  defaultVariants: {
    type: "triangle",
  },
});

export type ShapeType = VariantProps<typeof shapeRenedererStyles>["type"];

export interface ParallaxElementShape {
  id: string;
  type: ShapeType;
  className: string;
  speed: number;
}

const ParallaxElement = ({
  shapeElement,
  scrollYProgress,
}: {
  shapeElement: ParallaxElementShape;
  scrollYProgress: MotionValue<number>;
}) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, shapeElement.speed]);

  return (
    <motion.div
      className={clsx("absolute", shapeElement.className)}
      style={{ y }}
    >
      <div
        className={clsx(shapeRenedererStyles({ type: shapeElement.type }))}
      />
    </motion.div>
  );
};

export const ParallaxElements = () => {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery();
  const { scrollYProgress } = useScroll();

  if (reducedMotion || isMobile) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {PARALLAX_ELEMENTS.map((el) => (
        <ParallaxElement
          key={el.id}
          shapeElement={el}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

const PARALLAX_ELEMENTS: ParallaxElementShape[] = [
  // Triangles
  {
    id: "tri-tl",
    type: "triangle",
    className: "top-[20%] left-[8%]",
    speed: -180,
  },
  {
    id: "tri-br",
    type: "triangle2",
    className: "top-[65%] right-[6%]",
    speed: -250,
  },
  // Circles
  {
    id: "cir-tr",
    type: "circle",
    className: "top-[28%] right-[12%]",
    speed: -120,
  },
  {
    id: "cir-bl",
    type: "circle2",
    className: "top-[78%] left-[15%]",
    speed: -300,
  },
  // Rings
  {
    id: "ring-ml",
    type: "ring",
    className: "top-[45%] left-[5%]",
    speed: -200,
  },
  {
    id: "ring-br",
    type: "ring2",
    className: "top-[88%] right-[10%]",
    speed: -350,
  },
  // Hexagons (diamond approximation)
  {
    id: "dia-mr",
    type: "diamond",
    className: "top-[35%] right-[4%]",
    speed: -160,
  },
  {
    id: "dia-ml",
    type: "diamond2",
    className: "top-[55%] left-[10%]",
    speed: -280,
  },
];
