import type { JSX } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { navVariants } from "@/animations/navVariants";
import { NavItemEnum, type NavBarProps, type NavItem } from "@/models";
import { NavButton } from "@/components/common/buttons";

export default function NavBar({
  scrolledDown,
  isMobile,
  navItems,
  activeSection,
  sideNavOpen,
  onNavigate,
  onToggleMenu,
}: NavBarProps): JSX.Element {
  return (
    <motion.nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 transition-[background-color, box-shadow, backdrop-filter] duration-300 ease-out",
        scrolledDown
          ? "bg-bg-secondary/60 backdrop-blur-xl shadow-nav-elevated"
          : "bg-bg-secondary/20 backdrop-blur-md shadow-none",
      )}
      variants={navVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-center justify-between h-full px-6 max-w-7xl mx-auto">
        <button
          onClick={() => onNavigate(NavItemEnum.Hero)}
          aria-label="Scroll to top"
          className="text-[20px] font-bold tracking-wider font-mono cursor-pointer bg-transparent border-0 text-primary text-glow-primary"
        >
          {"<KC />"}
        </button>

        {/* Nav links */}
        {!isMobile && (
          <DesktopNav
            navItems={navItems}
            activeSection={activeSection}
            onNavigate={onNavigate}
          />
        )}

        {/* Hamburger menu for mobiles */}
        {isMobile && (
          <button
            onClick={onToggleMenu}
            aria-label={sideNavOpen ? "Close menu" : "Open menu"}
            className={clsx(
              "flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px]",
              "border-none bg-transparent",
              "text-primary",
              "transition-colors duration-200",
              "hover:text-secondary",
            )}
          >
            {sideNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>
    </motion.nav>
  );
}

interface DesktopNavProps {
  navItems: NavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

const DesktopNav = ({
  navItems,
  activeSection,
  onNavigate,
}: DesktopNavProps): JSX.Element => {
  return (
    <div className="flex items-center gap-1">
      {navItems.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <NavButton
            key={section.id}
            active={isActive}
            onClick={() => onNavigate(section.id)}
            aria-label={`Navigate to ${section.label}`}
          >
            {section.label}
          </NavButton>
        );
      })}
    </div>
  );
};
