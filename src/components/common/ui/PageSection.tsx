import type { ComponentProps, ReactNode } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { fadeInUp, lineGrow, sectionReveal } from "@/animations";
import RevealTextOnScroll from "./RevealTextOnScroll";
import { cva, type VariantProps } from "class-variance-authority";

const pageSectionStyles = cva(["px-4 py-16 md:px-6 md:py-24 scroll-mt-16"], {
  variants: {
    narrow: {
      true: "max-w-240 mx-auto",
      false: "max-w-full",
    },
  },
  defaultVariants: {
    narrow: false,
  },
});

type PageSectionProps = ComponentProps<typeof motion.section> &
  VariantProps<typeof pageSectionStyles> & {
    id: string;
    headerTitle: string;
    headerSubtitle: string;
    children: ReactNode;
  };

export default function PageSection({
  narrow,
  id,
  headerTitle,
  headerSubtitle,
  className,
  children,
  ...props
}: PageSectionProps) {
  return (
    <motion.section
      id={id}
      className={clsx(pageSectionStyles({ narrow }), className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "0px 0px -100px 0px" }}
      variants={sectionReveal}
      {...props}
    >
      <PageSectionHeader
        headerTitle={headerTitle}
        headerSubtitle={headerSubtitle}
      />
      {children}
    </motion.section>
  );
}

function PageSectionHeader({
  headerTitle,
  headerSubtitle,
}: {
  headerTitle: string;
  headerSubtitle?: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 mb-12 text-center"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "0px 0px -100px 0px" }}
    >
      {headerSubtitle && (
        <span
          className={clsx(
            "inline-flex items-center gap-2",
            "font-mono text-sm text-slate-400",
            "bg-white/3 backdrop-blur-md",
            "border border-white/6 rounded-full",
            "py-1 px-4",
          )}
        >
          <span className="text-cyan-400">{">"}</span>
          <RevealTextOnScroll text={headerSubtitle} />
        </span>
      )}
      <h2 className="gradient-text text-4xl font-bold tracking-tight my-3">
        {headerTitle}
      </h2>
      <motion.div
        className="h-0.5 w-20 rounded-full mt-1 bg-linear-to-r from-cyan-500 to-purple-500"
        variants={lineGrow}
        initial="hidden"
        whileInView="visible"
      />
    </motion.div>
  );
}
