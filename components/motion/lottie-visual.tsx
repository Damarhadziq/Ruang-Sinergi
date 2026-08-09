"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "@/lib/utils";

export function LottieVisual({ src, className, label }: { src: string; className?: string; label: string }) {
  return (
    <DotLottieReact
      src={src}
      loop
      autoplay
      layout={{ fit: "contain", align: [0.5, 0.5] }}
      renderConfig={{ autoResize: true, devicePixelRatio: 2, quality: 100 }}
      className={cn("lottie-visual", className)}
      role="img"
      aria-label={label}
    />
  );
}
