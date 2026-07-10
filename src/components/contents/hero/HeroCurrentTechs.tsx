import clsx from "clsx";
import { ICON_MAP } from "@/utils";

interface CurrentTechsProp {
  currentTechs: string[];
}

export default function HeroCurrentTechs({ currentTechs }: CurrentTechsProp) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-2",
        "rounded-xl bg-white/5 backdrop-blur-md",
        "border border-white/10 text-xs text-gray-400",
      )}
    >
      <span className="text-sm">🚀</span>

      <span>Currently building with</span>

      {currentTechs.map((tech) => {
        const IconComponent = ICON_MAP[tech];
        return (
          <div
            key={tech}
            className={clsx(
              "flex items-center gap-1",
              "font-mono font-semibold text-[11px]",
              "text-cyan-500 px-2 py-0.5 rounded-md",
              "bg-cyan-500/10 border border-cyan-500/20",
            )}
          >
            <IconComponent size={11} />
            <span>{tech}</span>
          </div>
        );
      })}
    </div>
  );
}
