"use client";

import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "./admin-sidebar";

export function AdminHeader() {
  const [open, setOpen] = useState(false);
  return <><header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[var(--border)] bg-white px-4 sm:px-6"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Buka navigasi admin"><Menu size={19} /></Button><label className="relative hidden sm:block"><span className="sr-only">Cari di dashboard</span><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" /><input className="control search-control w-72" placeholder="Cari materi atau program" /></label></div><div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-semibold">Admin Ruang Sinergi</p><p className="text-xs text-[var(--muted-foreground)]">Pengelola konten</p></div><span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--secondary)] text-sm font-bold text-[var(--primary)]">AR</span></div></header><div data-state={open ? "open" : "closed"} aria-hidden={!open} className="motion-overlay fixed inset-0 z-50 bg-black/30 lg:hidden" onClick={() => setOpen(false)}><div className="motion-panel-right ml-auto h-full w-[min(86vw,300px)] border-l border-[var(--border)] bg-white" onClick={(event) => event.stopPropagation()}><div className="absolute right-3 top-3 z-10"><Button size="icon" variant="secondary" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} aria-label="Tutup navigasi admin"><X size={18} /></Button></div><AdminSidebar onNavigate={() => setOpen(false)} /></div></div></>;
}
