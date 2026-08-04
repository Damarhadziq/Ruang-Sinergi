import { cn } from "@/lib/utils";
export function Skeleton({ className }: { className?: string }) { return <div aria-hidden="true" className={cn("animate-pulse rounded-xl bg-[#e7e8e2]", className)} />; }

