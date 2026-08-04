"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { getDepartment, materials } from "@/data/mock-data";

export function AdminDataTable() {
  return <><div className="hidden overflow-hidden rounded-2xl border border-[var(--border)] bg-white md:block"><table className="w-full border-collapse text-left text-sm"><thead className="bg-[var(--muted)]"><tr>{["Materi", "Program studi", "Jenis", "Status", "Diperbarui", "Aksi"].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr></thead><tbody>{materials.slice(0, 6).map((material, index) => <tr key={material.slug} className="border-t border-[var(--border)] transition-colors hover:bg-[#fafcfb]"><td className="px-4 py-4"><p className="font-semibold">{material.title}</p><p className="mt-1 max-w-xs truncate text-xs text-[var(--muted-foreground)]">{material.summary}</p></td><td className="px-4 py-4">{getDepartment(material.department)?.shortName}</td><td className="px-4 py-4">{material.type}</td><td className="px-4 py-4"><StatusBadge status={index === 1 ? "Draft" : index === 4 ? "Dijadwalkan" : "Terbit"} /></td><td className="px-4 py-4 text-[var(--muted-foreground)]">{material.date}</td><td className="px-4 py-4"><RowActions slug={material.slug} /></td></tr>)}</tbody></table></div><div className="grid gap-3 md:hidden">{materials.slice(0, 6).map((material, index) => <div key={material.slug} className="rounded-2xl border border-[var(--border)] bg-white p-4"><div className="flex items-start justify-between gap-3"><div><StatusBadge status={index === 1 ? "Draft" : "Terbit"} /><h3 className="mt-3 font-heading font-bold">{material.title}</h3><p className="mt-1 text-sm text-[var(--muted-foreground)]">{getDepartment(material.department)?.shortName} · {material.type}</p></div><RowActions slug={material.slug} /></div></div>)}</div></>;
}

function RowActions({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", escape); };
  }, []);

  return <div ref={root} className="relative"><Button variant="ghost" size="icon" aria-label="Buka menu aksi" title="Menu aksi" aria-expanded={open} onClick={() => setOpen(!open)}><MoreHorizontal size={17} /></Button><div data-state={open ? "open" : "closed"} aria-hidden={!open} className="motion-popover absolute right-0 z-20 mt-1 w-40 rounded-xl border border-[var(--border)] bg-white p-1.5"><Link tabIndex={open ? 0 : -1} href={`/materi/${slug}`} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[var(--muted)]"><Pencil size={15} />Lihat materi</Link><button tabIndex={open ? 0 : -1} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--destructive)] transition-colors hover:bg-[#f7eae8]"><Trash2 size={15} />Hapus materi</button></div></div>;
}
