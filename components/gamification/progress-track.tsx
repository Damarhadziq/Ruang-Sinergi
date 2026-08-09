import { AnimatedProgress } from "@/components/motion/animated-progress";

export function ProgressTrack({ value, milestones = 0, label }: { value: number; milestones?: number; label?: string }) {
  return (
    <div className="progress-track">
      <AnimatedProgress value={value} label={label} />
      {milestones > 1 && <div className="progress-milestones" aria-hidden="true">{Array.from({ length: milestones }).map((_, index) => <span key={index} className={value >= (index / (milestones - 1)) * 100 ? "is-complete" : ""} />)}</div>}
    </div>
  );
}
