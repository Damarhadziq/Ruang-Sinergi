"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/jelajahi", label: "Jelajahi" },
  { href: "/program/persiapan-dunia-kerja", label: "Program" },
  { href: "/galeri", label: "Galeri" },
  { href: "/editor", label: "Ruang Guru" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="sticky top-0 z-50 border-b border-[#e9e9e3] bg-white/90 backdrop-blur-xl">
    <div className="container-app flex h-16 items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5 font-heading text-[17px] font-bold tracking-[-0.02em] text-[#242622]">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#315c4c] text-white"><BookOpen size={17} /></span>
        Ruang Sinergi
      </Link>
      <nav className="hidden items-center gap-1 md:flex">
        {links.map((link) => <Link key={link.href} href={link.href} className={cn("rounded-lg px-3 py-2 text-sm font-medium text-[#64655f] hover:bg-[#f4f4f0] hover:text-[#20221f]", pathname.startsWith(link.href) && "bg-[#f0f3f0] text-[#315c4c]")}>{link.label}</Link>)}
      </nav>
      <div className="hidden items-center gap-2 md:flex">
        <Link href="/jelajahi" aria-label="Cari materi"><Button variant="ghost" size="icon"><Search size={18} /></Button></Link>
        <Link href="/jelajahi"><Button size="sm">Mulai belajar</Button></Link>
      </div>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Buka menu">{open ? <X size={20} /> : <Menu size={20} />}</Button>
    </div>
    {open && <nav className="container-app grid gap-1 border-t py-3 md:hidden">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-[#f4f4f0]">{link.label}</Link>)}</nav>}
  </header>;
}

