"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function XpPop({ amount, show = true }: { amount: number; show?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <AnimatePresence>
      {show && <motion.span initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} className="xp-pop">+{amount} XP</motion.span>}
    </AnimatePresence>
  );
}
