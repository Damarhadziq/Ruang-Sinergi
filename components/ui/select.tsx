"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string };

export function Select({ value, onValueChange, options, label, className }: { value: string; onValueChange: (value: string) => void; options: SelectOption[]; label: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    const close = (event: MouseEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, []);

  return <div ref={root} className={cn("relative", className)}><button type="button" aria-label={label} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)} className="control flex h-9 items-center justify-between gap-2 rounded-lg px-3 text-left text-xs"><span className="truncate">{current.label}</span><ChevronDown size={14} className={cn("shrink-0 text-[var(--muted-foreground)] transition-transform duration-200", open && "rotate-180")} /></button><div role="listbox" aria-label={label} aria-hidden={!open} data-state={open ? "open" : "closed"} className="motion-popover scrollbar-subtle absolute z-50 mt-1.5 max-h-56 w-full min-w-44 overflow-y-auto rounded-lg border border-[var(--border)] bg-white p-1">{options.map((option) => <button key={option.value} type="button" role="option" tabIndex={open ? 0 : -1} aria-selected={option.value === value} onClick={() => { onValueChange(option.value); setOpen(false); }} className={cn("flex min-h-8 w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs leading-4 transition-colors hover:bg-[#f5f7f5]", option.value === value && "font-semibold text-[#245744]")}><span>{option.label}</span>{option.value === value && <Check size={14} />}</button>)}</div></div>;
}
