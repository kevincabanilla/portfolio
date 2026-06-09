import { useSyncExternalStore } from "react";
import { MEDIA_QUERIES } from "@/constants/theme";

const getMql = (query: string) =>
  typeof window !== "undefined" && typeof window.matchMedia !== "undefined"
    ? window.matchMedia(query)
    : null;

const subscribe = (query: string) => (callback: () => void) => {
  const mql = getMql(query);
  if (!mql) return () => {};

  const handler = () => callback();

  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
};

const getSnapshot = (query: string) => () => {
  const mql = getMql(query);
  return mql ? mql.matches : false;
};

export default function useMediaQuery(
  query: string = MEDIA_QUERIES.mobile,
): boolean {
  return useSyncExternalStore(
    subscribe(query),
    getSnapshot(query),
    () => false, // SSR fallback
  );
}
