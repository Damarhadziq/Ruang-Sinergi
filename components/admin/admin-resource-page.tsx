import { Plus } from "lucide-react";
import { AdminPageHeader } from "./admin-page-header";
import { Button } from "@/components/ui/button";
export function AdminResourcePage({ title, description, singular, items }: { title: string; description: string; singular: string; items: { title: string; meta: string; description?: string }[] }) { return <><AdminPageHeader title={title} description={description} action={<Button><Plus size={16} />Tambah {singular}</Button>} /><div className="grid gap-2">{items.map((item) => <div key={item.title} className="grid gap-3 rounded-xl px-4 py-4 transition-colors hover:bg-[#fcfcfc] sm:grid-cols-[1fr_auto] sm:items-center"><div><h2 className="font-heading text-lg font-bold">{item.title}</h2><p className="mt-1 text-sm text-[var(--muted-foreground)]">{item.description ?? item.meta}</p></div><p className="text-sm text-[var(--muted-foreground)]">{item.meta}</p></div>)}</div></>; }

