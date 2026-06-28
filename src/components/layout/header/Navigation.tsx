import { useState, useEffect, useCallback, type JSX } from "react";
import { useMediaQuery, useScrolledDown, useScrollTo } from "@/hooks";
import NavBar from "./navigation/NavBar";
import SideNav from "./navigation/SideNav";
import { NavItemEnum, type NavItem } from "@/models";
import MobileNav from "./navigation/MobileNav";

export default function Navigation({
  navItems,
}: {
  navItems: NavItem[];
}): JSX.Element {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [activeSection, setActiveSection] = useState(`${NavItemEnum.Hero}`);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const scrolledDown = useScrolledDown(50);
  const scrollTo = useScrollTo();

  // IntersectionObserver-based scroll-spy (replaces per-scroll DOM queries)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries.filter((e) => e.isIntersecting)) {
          const id = entry.target.id;
          setActiveSection(id);
          const sectionHash = `#${id}`;
          if (window.location.hash != sectionHash) {
            window.history.replaceState(
              null,
              "",
              id == NavItemEnum.Hero ? window.location.pathname : sectionHash,
            );
          }
        }
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: "-30% 0px -60% 0px",
      },
    );

    for (const navItemId of [NavItemEnum.Hero, ...navItems.map((s) => s.id)]) {
      const el = document.getElementById(navItemId);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [navItems]);

  const scrollToSection = useCallback(
    (id: string) => {
      scrollTo(id);
      setSideNavOpen(false);
    },
    [scrollTo],
  );

  return (
    <>
      <NavBar
        navItems={navItems}
        isMobile={isMobile}
        activeSection={activeSection}
        sideNavOpen={sideNavOpen}
        scrolledDown={scrolledDown}
        onNavigate={scrollToSection}
        onToggleMenu={() => setSideNavOpen(!sideNavOpen)}
      />

      {/* Overlay menu for mobile devices */}
      <SideNav
        navItems={navItems}
        activeSection={activeSection}
        open={sideNavOpen}
        onNavigate={scrollToSection}
        onClose={() => setSideNavOpen(false)}
      />

      {isMobile && (
        <MobileNav
          navItems={navItems}
          activeSection={activeSection}
          scrolledDown={scrolledDown}
          onNavigate={scrollToSection}
        />
      )}
    </>
  );
}
