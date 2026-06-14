import type { ReactNode } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { fadeInUp, lineGrow, sectionReveal } from "@/animations";
import RevealTextOnScroll from "../ui/RevealTextOnScroll";

export default function PageSection({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="px-4 py-16 md:px-6 md:py-24 scroll-mt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "0px 0px -100px 0px" }}
      variants={sectionReveal}
    >
      <PageSectionHeader title={title} subtitle={subtitle} />
      {children}
    </motion.section>
  );
}

function PageSectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 mb-12 text-center"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "0px 0px -100px 0px" }}
    >
      {subtitle && (
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
          <RevealTextOnScroll text={subtitle} />
        </span>
      )}
      <h2 className="gradient-text text-4xl font-bold tracking-tight my-3">
        {title}
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
