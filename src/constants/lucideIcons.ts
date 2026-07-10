import {
  CircleUserRound,
  Code2,
  Home,
  Mail,
  type LucideIcon,
} from "lucide-react";

export type LucideIconType = keyof typeof LUCIDE_ICON;

export const LUCIDE_ICON: Record<string, LucideIcon> = {
  Home,
  CircleUserRound,
  Code2,
  Mail,
};
