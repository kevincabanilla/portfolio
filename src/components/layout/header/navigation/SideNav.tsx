import type { JSX } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavItemEnum, type NavItem, type SideNavProps } from "@/models";
import clsx from "clsx";
import { NavLink, SideNavButton } from "@/components/common/buttons";

export default function SideNav({
  open,
  navItems: navItemsProp,
  activeSection,
  onNavigate,
  onClose,
}: SideNavProps): JSX.Element {
  const navItems = [
    { id: NavItemEnum.Hero, label: "Home" } as NavItem,
    ...navItemsProp,
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Slide-in panel */}
          <motion.div
            className={clsx(
              "absolute inset-y-0 right-0",
              "w-72",
              "bg-midnight-blue/70",
              "border-l border-white/6",
              "backdrop-blur-3xl",
              "shadow-drawer",
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 40,
            }}
          >
            <div className="flex flex-col py-6 px-3 gap-0.5">
              {navItems.map((section, index) => {
                return (
                  <NavLink
                    key={`side-nav-${section.id}`}
                    hashId={section.id}
                    onNavigate={onNavigate}
                  >
                    <SideNavButton
                      index={index}
                      active={activeSection === section.id}
                      aria-label={`Navigate to ${section.label}`}
                    >
                      {section.label}
                    </SideNavButton>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
