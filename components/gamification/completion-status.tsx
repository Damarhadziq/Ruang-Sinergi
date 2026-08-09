import { CheckCircle2, Circle } from "lucide-react";
import type { ReactNode } from "react";

export function CompletionStatus({ complete, children }: { complete: boolean; children: ReactNode }) {
  return <span className={complete ? "completion-status is-complete" : "completion-status"}>{complete ? <CheckCircle2 size={15} /> : <Circle size={15} />}{children}</span>;
}
