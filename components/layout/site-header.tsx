"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/jelajahi", label: "Materi" },
  { href: "/program/persiapan-dunia-kerja", label: "Program" },
  { href: "/tentang", label: "Tentang" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/jelajahi") return pathname === "/jelajahi" || pathname.startsWith("/materi/");
    if (href.startsWith("/program/")) return pathname.startsWith("/program/");
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur">
      <div className="container-app flex h-[68px] items-center justify-between gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-heading text-[17px] font-bold">
          <img src="/logo-sinergi.svg" alt="" className="h-10 w-10 object-contain" />
          Ruang Sinergi
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Navigasi utama">
          {links.map((link) => {
            const active = isActive(link.href);
            return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={cn("px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]", active && "text-[var(--primary)]")}>{link.label}</Link>;
          })}
        </nav>

        <form action="/jelajahi" className="relative hidden md:block" role="search">
          <label htmlFor="header-search" className="sr-only">Cari materi</label>
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input id="header-search" name="q" type="search" className="control search-control h-10 w-56 text-sm xl:w-64" placeholder="Cari materi" />
        </form>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Tutup menu" : "Buka menu"}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <div data-state={open ? "open" : "closed"} aria-hidden={!open} className="motion-overlay fixed inset-0 top-[69px] z-50 bg-black/20 md:hidden" onClick={() => setOpen(false)}>
        <nav className="motion-panel-right ml-auto h-full w-[min(86vw,360px)] border-l border-[var(--border)] bg-white p-4" aria-label="Navigasi seluler" onClick={(event) => event.stopPropagation()}>
          <form action="/jelajahi" className="relative mb-4" role="search">
            <label htmlFor="mobile-search" className="sr-only">Cari materi</label>
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input id="mobile-search" name="q" type="search" tabIndex={open ? 0 : -1} className="control search-control h-10 w-full text-sm" placeholder="Cari materi" />
          </form>
          {links.map((link) => {
            const active = isActive(link.href);
            return <Link key={link.href} href={link.href} tabIndex={open ? 0 : -1} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={cn("block px-3 py-3 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]", active && "text-[var(--primary)]")}>{link.label}</Link>;
          })}
        </nav>
      </div>
    </header>
  );
}
