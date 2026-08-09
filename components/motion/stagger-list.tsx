"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function StaggerList({ children, className, itemClassName }: { children: ReactNode; className?: string; itemClassName?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.065 } } }}
    >
      {Children.toArray(children).map((child, index) => (
        <motion.div
          key={index}
          className={cn("h-full", itemClassName)}
          variants={{ hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
