import { useEffect, useState } from "react";

export const useScrolledDown = (threshold = 10): boolean => {
  const [scrolledDown, setScrolledDown] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeVisible = window.scrollY > threshold;
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
};
