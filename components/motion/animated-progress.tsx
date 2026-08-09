"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function AnimatedProgress({ value, color = "var(--primary)", className, label }: { value: number; color?: string; className?: string; label?: string }) {
  const reduceMotion = useReducedMotion();
  const normalized = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-[var(--muted)]", className)} role="progressbar" aria-valuenow={normalized} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? `Progres ${normalized}%`}>
      <motion.div className="h-full rounded-full" initial={reduceMotion ? false : { width: 0 }} animate={{ width: `${normalized}%` }} transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }} style={{ background: color }} />
    </div>
  );
}
