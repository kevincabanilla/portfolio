import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 10;

export default function useScrolledDown(
  threshold: number = SCROLL_THRESHOLD_PX,
): boolean {
  const [scrolledDown, setScrolledDown] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeVisible = window.scrollY > SCROLL_THRESHOLD_PX;
          setScrolledDown((prev) =>
            prev !== shouldBeVisible ? shouldBeVisible : prev,
          );
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolledDown;
}
