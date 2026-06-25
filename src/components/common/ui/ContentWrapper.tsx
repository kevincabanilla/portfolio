import { useEffect, type ReactNode } from "react";

/**
 * This is used to detect when all children inside has finished loading.
 */
export default function ContentWrapper({
  children,
  onLoaded,
}: {
  children: ReactNode;
  onLoaded: () => void;
}) {
  useEffect(() => {
    onLoaded?.();
  }, [onLoaded, children]);

  return children;
}
