import * as React from "react";
import { cn } from "@/lib/utils";
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn("shiny-chip inline-flex items-center rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-medium leading-[1.25] tracking-[0.01em] text-[var(--muted-foreground)]", className)} {...props} />; }

