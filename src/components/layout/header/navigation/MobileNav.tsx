import { motion } from "motion/react";
import { NavItemEnum, type NavItem } from "@/models";
import { mobileNavVariants } from "@/animations";
import clsx from "clsx";
import { NavLink } from "@/components/common/buttons";
import { RippleContainer } from "@/components/common/containers";
import { LucideIcons } from "@/constants";

export default function MobileNav({
  navItems: navItemsProp,
  activeSection,
  scrolledDown,
  onNavigate,
}: {
  navItems: NavItem[];
  activeSection: string;
  scrolledDown: boolean;
  onNavigate: (id: string) => void;
}) {
  const navItems = [
    { id: NavItemEnum.Hero, label: "Home", icon: "Home" } as NavItem,
    ...navItemsProp,
  ];

  return (
    <motion.nav
      className={clsx(
        "h-14 fixed bottom-0 inset-x-0 z-50 border-t border-cyan/10 transition-[background-color, box-shadow, backdrop-filter] duration-300 ease-out",
        scrolledDown
          ? "bg-bg-secondary/60 backdrop-blur-xl shadow-nav-elevated"
          : "bg-bg-secondary/20 backdrop-blur-md shadow-none",
      )}
      variants={mobileNavVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-center justify-items-stretch w-full h-full">
        {navItems.map((section) => {
          const Icon = LucideIcons.getIcon(section.icon);
          const isActive = activeSection === section.id;

          return (
            <RippleContainer
              key={`mobile-nav-${section.id}`}
              className="w-full h-full flex items-center justify-center"
            >
              <NavLink
                className={isActive ? "text-secondary" : "text-primary"}
                aria-label={`Navigate to ${section.label}`}
                hashId={section.id}
                onNavigate={onNavigate}
              >
                {Icon && <Icon size={24} />}
              </NavLink>
            </RippleContainer>
          );
        })}
      </div>
    </motion.nav>
  );
}
