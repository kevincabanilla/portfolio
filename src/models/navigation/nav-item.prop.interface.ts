export const NavItemEnum = {
  Hero: "hero",
  About: "about",
  Experience: "experience",
  Skills: "skills",
  Projects: "projects",
  Education: "education",
  Contact: "contact",
} as const;

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}
