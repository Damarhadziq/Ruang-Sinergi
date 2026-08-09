"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function FadeIn({ children, className, delay = 0, amount = 0.16 }: { children: ReactNode; className?: string; delay?: number; amount?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
