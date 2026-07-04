import { CircuitBoard, Fan, Gamepad2, Monitor, Network, type LucideIcon } from "lucide-react";
import type { CategorySlug } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<CategorySlug, LucideIcon> = {
  "monitor-extenders": Monitor,
  "networking-cards": Network,
  "addon-cards": CircuitBoard,
  "gaming-accessories": Gamepad2,
  "compute-accessories": Fan,
};

export function ProductImagePlaceholder({
  category,
  className,
  iconClassName = "w-10 h-10",
}: {
  category: CategorySlug;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = CATEGORY_ICONS[category];
  return (
    <div className={cn("flex items-center justify-center rounded-2xl bg-[#F5F5F5]", className)}>
      <Icon className={cn("text-[#1A1A1A]/60", iconClassName)} strokeWidth={1.5} />
    </div>
  );
}
