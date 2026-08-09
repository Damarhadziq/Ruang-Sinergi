"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function MotionCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={cn("h-full", className)} whileHover={reduceMotion ? undefined : { y: -2 }} transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
