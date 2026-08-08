import { HugeiconsIcon } from "@hugeicons/react";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import ArrowLeft01Icon from "@hugeicons/core-free-icons/ArrowLeft01Icon";
import ArrowDown01Icon from "@hugeicons/core-free-icons/ArrowDown01Icon";
import ArrowUp01Icon from "@hugeicons/core-free-icons/ArrowUp01Icon";
import ArrowUpRight01Icon from "@hugeicons/core-free-icons/ArrowUpRight01Icon";

type DirectionIconProps = { size?: number; className?: string; strokeWidth?: number };

const defaults = { size: 16, strokeWidth: 1.8 };

export function DirectionArrowRight({ size = defaults.size, strokeWidth = defaults.strokeWidth, className }: DirectionIconProps) {
  return <HugeiconsIcon icon={ArrowRight01Icon} size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}

export function DirectionArrowLeft({ size = defaults.size, strokeWidth = defaults.strokeWidth, className }: DirectionIconProps) {
  return <HugeiconsIcon icon={ArrowLeft01Icon} size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}

export function DirectionArrowDown({ size = defaults.size, strokeWidth = defaults.strokeWidth, className }: DirectionIconProps) {
  return <HugeiconsIcon icon={ArrowDown01Icon} size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}

export function DirectionArrowUp({ size = defaults.size, strokeWidth = defaults.strokeWidth, className }: DirectionIconProps) {
  return <HugeiconsIcon icon={ArrowUp01Icon} size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}

export function DirectionArrowUpRight({ size = defaults.size, strokeWidth = defaults.strokeWidth, className }: DirectionIconProps) {
  return <HugeiconsIcon icon={ArrowUpRight01Icon} size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}