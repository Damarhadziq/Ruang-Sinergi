import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
export function StatusBadge({ status }: { status: "Terbit" | "Draft" | "Dijadwalkan" }) { const styles = status === "Terbit" ? "bg-[#e6f2eb] text-[var(--success)]" : status === "Draft" ? "bg-[var(--muted)] text-[var(--muted-foreground)]" : "bg-[#f8efd9] text-[var(--warning)]"; return <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", styles)}><Circle size={7} fill="currentColor" />{status}</span>; }
