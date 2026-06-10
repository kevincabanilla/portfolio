import type { NavItem } from "./nav-item.prop.interface";

export interface NavBarProps {
  scrolledDown: boolean;
  isMobile: boolean;
  navItems: NavItem[];
  activeSection: string;
  sideNavOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleMenu: () => void;
}
