import { Check } from "lucide-react";

export function Milestone({ state, label }: { state: "completed" | "current" | "next"; label: string }) {
  return <span className={`milestone milestone-${state}`}>{state === "completed" ? <Check size={14} /> : <i />}{label}</span>;
}
