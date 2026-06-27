import type { JSX } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { navVariants } from "@/animations";
import { NavItemEnum, type NavBarProps, type NavItem } from "@/models";
import { NavButton, NavLink } from "@/components/common/buttons";
import { LogoInitials } from "@/components/common/ui";

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
        "fixed top-0 inset-x-0 z-50 h-16 border-b border-white/5 transition-[background-color, box-shadow, backdrop-filter] duration-300 ease-out",
        scrolledDown
          ? "bg-bg-secondary/60 backdrop-blur-xl shadow-nav-elevated"
          : "bg-bg-secondary/20 backdrop-blur-md shadow-none",
      )}
      variants={navVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-center justify-between h-full px-6 max-w-7xl mx-auto">
        <NavLink
          aria-label="Scroll to top"
          className={clsx(
            "text-lg cursor-pointer",
            "bg-transparent border-0",
            activeSection == NavItemEnum.Hero
              ? "text-glow-primary"
              : "hover:text-glow-primary",
          )}
          hashId={NavItemEnum.Hero}
          onNavigate={onNavigate}
        >
          <LogoInitials />
        </NavLink>

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
    <div className="flex items-center gap-1 h-full">
      {navItems.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <NavLink
            key={section.id}
            className="h-full"
            hashId={section.id}
            onNavigate={onNavigate}
          >
            <NavButton
              active={isActive}
              aria-label={`Navigate to ${section.label}`}
            >
              {section.label}
            </NavButton>
          </NavLink>
        );
      })}
    </div>
  );
};
