"use client";

import { useEffect, useState } from "react";
import { AnimatedProgress } from "./animated-progress";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance <= 0 ? 100 : (window.scrollY / distance) * 100);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div className="reading-progress-nav"><AnimatedProgress value={progress} className="h-[3px] rounded-none bg-transparent" label="Progres membaca" /></div>;
}
