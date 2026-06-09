import type { NavSection } from "./nav-section.interface";

export interface NavBarProps {
  scrolledDown: boolean;
  isMobile: boolean;
  sections: NavSection[];
  activeSection: string;
  sectionProgress: number;
  mobileMenuOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleMenu: () => void;
}
