import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
export function AdminEmptyState({ title, description, action }: { title: string; description: string; action?: string }) { return <div className="grid min-h-64 place-items-center border-y border-[var(--border)] text-center"><div><FileQuestion size={24} className="mx-auto text-[var(--muted-foreground)]" /><h2 className="mt-4 font-heading text-xl font-bold">{title}</h2><p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">{description}</p>{action && <Button className="mt-5">{action}</Button>}</div></div>; }

