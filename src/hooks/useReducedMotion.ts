import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

const getServerSnapshot = (): boolean => false;

const subscribe = (callback: () => void): (() => void) => {
  const mql = globalThis.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => {
    mql.removeEventListener("change", callback);
  };
};

const getSnapshot = (): boolean => {
  return globalThis.matchMedia(query).matches;
};

export const useReducedMotion = (): boolean => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
