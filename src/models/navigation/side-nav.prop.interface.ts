import type { NavItem } from "./nav-item.prop.interface";

export interface SideNavProps {
  open: boolean;
  navItems: NavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
  onClose: () => void;
}
