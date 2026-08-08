import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva("ui-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border text-sm font-medium leading-[1.25] tracking-normal transition-[transform,background-color,border-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2476f3]/20 disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "ui-button-primary border-[#0d59d7] text-white",
      secondary: "ui-button-secondary border-[#bdd3ee] text-[#24558c]",
      outline: "ui-button-outline border-[#d3dfed] bg-white text-[#294563]",
      ghost: "ui-button-ghost border-transparent text-[#4c6681]",
      destructive: "ui-button-destructive border-[#a83c32] text-white",
    },
    size: { default: "h-11 px-4", sm: "h-9 px-3", lg: "h-11 px-5", icon: "h-10 w-10" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export function Button({ className, variant, size, ...props }: ButtonProps) { return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />; }

