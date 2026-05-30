import {
  Car,
  Home,
  Heart,
  Building2,
  Wheat,
  FileSignature,
  HardHat,
  Shield,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Car,
  Home,
  Heart,
  Building2,
  Wheat,
  FileSignature,
  HardHat,
  Shield,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name] ?? Shield;
  return <Cmp className={className} aria-hidden />;
}
