import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "ui-control flex h-10 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-sm leading-[1.3] tracking-normal text-[var(--foreground)] outline-none transition-colors placeholder:text-sm placeholder:text-[#8d96a3] focus-visible:border-[var(--focus-border)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
