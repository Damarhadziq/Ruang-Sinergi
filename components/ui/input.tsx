import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-[13px] text-[var(--foreground)] outline-none transition-colors placeholder:text-[13px] placeholder:text-[#999c95] focus-visible:border-[var(--focus-border)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
