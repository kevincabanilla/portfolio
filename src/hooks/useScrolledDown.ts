import { useEffect, useState } from "react";

export default function useScrolledDown(threshold: number = 10): boolean {
  const [scrolledDown, setScrolledDown] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolledDown(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolledDown;
}
