import { useCallback } from "react";
import { useLenis } from "lenis/react";

export const useScrollTo = () => {
  const lenis = useLenis();

  const scrollTo = useCallback(
    (
      target: string | HTMLElement,
      options?: Parameters<NonNullable<typeof lenis>["scrollTo"]>[1],
    ) => {
      if (typeof target == "string" && !target.startsWith("#")) {
        target = `#${target}`;
      }
      lenis?.scrollTo(target, options);
    },
    [lenis],
  );

  return scrollTo;
};
