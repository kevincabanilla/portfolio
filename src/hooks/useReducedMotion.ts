import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

const getServerSnapshot = (): boolean => false;

const subscribe = (callback: () => void): (() => void) => {
  if (globalThis.window == null) return () => undefined;
  const mql = globalThis.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => {
    mql.removeEventListener("change", callback);
  };
};

const getSnapshot = (): boolean => {
  if (globalThis.window == null) return false;
  return globalThis.matchMedia(query).matches;
};

export const useReducedMotion = (): boolean => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
