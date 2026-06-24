import type { PropsWithChildren } from "react";

export default function SkillsHeader({ children }: PropsWithChildren) {
  return (
    <>
      <div className="h-px bg-linear-to-r from-transparent via-cyan/60 to-transparent" />
      <h3 className="text-xl font-semibold text-white text-center">
        {children}
      </h3>
    </>
  );
}
