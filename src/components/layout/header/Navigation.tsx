import { useState, useEffect, useCallback, useRef, type JSX } from "react";
import { Helper } from "@/utils";
import { useMediaQuery, useScrolledDown } from "@/hooks";
import NavBar from "./navigation/NavBar";
import SideNav from "./navigation/SideNav";
import { NavItemEnum, type NavItem } from "@/models";

const NAV_ITEMS: NavItem[] = [
  { id: NavItemEnum.About, label: "About" },
  { id: NavItemEnum.Experience, label: "Experience" },
  { id: NavItemEnum.Skills, label: "Skills" },
  { id: NavItemEnum.Projects, label: "Projects" },
  { id: NavItemEnum.Education, label: "Education" },
  { id: NavItemEnum.Contact, label: "Contact" },
];

export default function Navigation(): JSX.Element {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [activeSection, setActiveSection] = useState(`${NavItemEnum.Hero}`);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const activeSectionRef = useRef(`${NavItemEnum.Hero}`);
  const scrolledDown = useScrolledDown(50);

  // IntersectionObserver-based scroll-spy (replaces per-scroll DOM queries)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries.filter((e) => e.isIntersecting)) {
          const id = entry.target.id;
          activeSectionRef.current = id;
          setActiveSection(id);
        }
      },
      {
        threshold: [0, 0.5, 1],
        rootMargin: "-30% 0px -60% 0px",
      },
    );

    for (const navItemId of [NavItemEnum.Hero, ...NAV_ITEMS.map((s) => s.id)]) {
      const el = document.getElementById(navItemId);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    Helper.scrollToId(id);
    setSideNavOpen(false);
  }, []);

  return (
    <>
      <NavBar
        navItems={NAV_ITEMS}
        isMobile={isMobile}
        activeSection={activeSection}
        sideNavOpen={sideNavOpen}
        scrolledDown={scrolledDown}
        onNavigate={scrollToSection}
        onToggleMenu={() => setSideNavOpen(!sideNavOpen)}
      />

      {/* Overlay menu for mobile devices */}
      <SideNav
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        open={sideNavOpen}
        onNavigate={scrollToSection}
        onClose={() => setSideNavOpen(false)}
      />
    </>
  );
}
