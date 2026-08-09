import { AnimatedProgress } from "@/components/motion/animated-progress";

export function Progress({ value, color = "var(--primary)" }: { value: number; color?: string }) { return <AnimatedProgress value={value} color={color} />; }
