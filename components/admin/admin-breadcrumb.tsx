import Link from "next/link";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
export function AdminBreadcrumb({ items }: { items: { label: string; href?: string }[] }) { return <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1 text-sm text-[var(--muted-foreground)]">{items.map((item, index) => <span key={item.label} className="flex items-center gap-1">{index > 0 && <DirectionArrowRight size={14} />}{item.href ? <Link href={item.href} className="hover:text-[var(--foreground)]">{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>; }

