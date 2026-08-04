"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/jelajahi", label: "Jelajahi" },
  { href: "/#program-studi", label: "Program studi" },
  { href: "/program/persiapan-dunia-kerja", label: "Program kolaborasi" },
  { href: "/galeri", label: "Galeri" },
  { href: "/tentang", label: "Tentang" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false); const pathname = usePathname();
  return <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
    <div className="container-app flex h-[68px] items-center justify-between gap-5">
      <Link href="/" className="flex shrink-0 items-center gap-2.5 font-heading text-[17px] font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--primary)] text-white"><BookOpen size={18} /></span>Ruang Sinergi</Link>
      <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Navigasi utama">{links.map((link) => <Link key={link.href} href={link.href} className={cn("rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]", link.href !== "/" && pathname.startsWith(link.href.split("#")[0]) && "bg-[var(--muted)] text-[var(--primary)]", link.href === "/" && pathname === "/" && "text-[var(--primary)]")}>{link.label}</Link>)}</nav>
      <div className="hidden items-center gap-2 md:flex"><Link href="/jelajahi" aria-label="Cari materi"><Button variant="ghost" size="icon" title="Cari materi"><Search size={18} /></Button></Link><Link href="/admin"><Button variant="outline" size="sm"><LayoutDashboard size={16} />Masuk admin</Button></Link></div>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Tutup menu" : "Buka menu"}>{open ? <X size={20} /> : <Menu size={20} />}</Button>
    </div>
    {open && <div className="fixed inset-0 top-[69px] z-50 bg-black/20 md:hidden" onClick={() => setOpen(false)}><nav className="ml-auto h-full w-[min(86vw,360px)] border-l border-[var(--border)] bg-[var(--surface)] p-4" aria-label="Navigasi seluler" onClick={(event) => event.stopPropagation()}>{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-medium hover:bg-[var(--muted)]">{link.label}</Link>)}<div className="mt-4 border-t border-[var(--border)] pt-4"><Link href="/admin" onClick={() => setOpen(false)}><Button variant="outline" className="w-full"><LayoutDashboard size={16} />Masuk admin</Button></Link></div></nav></div>}
  </header>;
}

