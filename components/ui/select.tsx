"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { useState } from "react";
import { Check } from "lucide-react";
import { DirectionArrowDown, DirectionArrowUp } from "@/components/ui/direction-icon";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string };

export function Select({ value, onValueChange, options, label, className }: { value: string; onValueChange: (value: string) => void; options: SelectOption[]; label: string; className?: string }) {
  const current = options.find((option) => option.value === value) ?? options[0];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} onOpenChange={setIsOpen}>
      <SelectPrimitive.Trigger aria-label={label} aria-expanded={isOpen} className={cn("ui-control select-trigger-control group flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-white px-3 text-left text-sm leading-[1.3] tracking-normal text-[var(--foreground)] outline-none transition-colors focus-visible:border-[var(--focus-border)] focus-visible:outline-none data-[state=open]:border-[var(--focus-border)]", className)}>
        <SelectPrimitive.Value>{current.label}</SelectPrimitive.Value>
        <SelectPrimitive.Icon asChild>
          <span className="select-chevron inline-flex size-4 shrink-0 items-center justify-center text-[var(--muted-foreground)]">
            <DirectionArrowDown size={16} className="size-4" />
          </span>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content position="popper" sideOffset={6} collisionPadding={12} className="select-content scrollbar-subtle z-[90] max-h-60 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[var(--border)] bg-white text-sm">
          <SelectPrimitive.ScrollUpButton aria-label="Gulir opsi ke atas" title="Gulir opsi ke atas" className="flex h-7 items-center justify-center text-[var(--muted-foreground)]"><DirectionArrowUp size={16} className="size-4" /></SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="max-h-44 w-full p-1">
            {options.map((option) => (
              <SelectPrimitive.Item key={option.value} value={option.value} className="select-item-control relative flex min-h-8 cursor-default select-none items-center rounded-lg py-1.5 pl-2.5 pr-8 text-sm leading-[1.4] tracking-normal text-[var(--muted-foreground)] outline-none transition-colors data-[highlighted]:bg-[#f3f6f4] data-[highlighted]:text-[var(--foreground)] data-[state=checked]:font-medium data-[state=checked]:text-[var(--primary)]">
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2.5 inline-flex items-center"><Check size={16} className="size-4" /></SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton aria-label="Gulir opsi ke bawah" title="Gulir opsi ke bawah" className="flex h-7 items-center justify-center text-[var(--muted-foreground)]"><DirectionArrowDown size={16} className="size-4" /></SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}