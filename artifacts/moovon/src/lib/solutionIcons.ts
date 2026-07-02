import {
  Shield,
  Users,
  Briefcase,
  FileText,
  Lock,
  Landmark,
  LineChart,
  GraduationCap,
  Heart,
  Home,
  Building2,
  PiggyBank,
  Umbrella,
  HandCoins,
  BadgeCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const solutionIconMap: Record<string, LucideIcon> = {
  Shield,
  Users,
  Briefcase,
  FileText,
  Lock,
  Landmark,
  LineChart,
  GraduationCap,
  Heart,
  Home,
  Building2,
  PiggyBank,
  Umbrella,
  HandCoins,
  BadgeCheck,
  Wallet,
};

export const solutionIconNames = Object.keys(solutionIconMap);

export function getSolutionIcon(name: string): LucideIcon {
  return solutionIconMap[name] ?? Shield;
}
