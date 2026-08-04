import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315c4c]/35 disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-[#315c4c] text-white hover:bg-[#274b3f]",
      secondary: "bg-[#edf3f0] text-[#27483c] hover:bg-[#e1ebe6]",
      outline: "border border-[#deded8] bg-white text-[#292a27] hover:bg-[#f7f7f4]",
      ghost: "text-[#52534f] hover:bg-[#f3f3ef] hover:text-[#20211f]",
    },
    size: { default: "h-10 px-4", sm: "h-8 px-3 text-xs", lg: "h-12 px-5 text-base", icon: "h-10 w-10" },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

