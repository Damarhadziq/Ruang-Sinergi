"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { departments } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/latihan", label: "Latihan" },
  { href: "/program/persiapan-dunia-kerja", label: "Program" },
  { href: "/tentang", label: "Tentang" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [mobileMaterialsOpen, setMobileMaterialsOpen] = useState(false);
  const pathname = usePathname();
  const materialActive = pathname === "/jelajahi" || pathname.startsWith("/materi/") || pathname.startsWith("/prodi/");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/program/")) return pathname.startsWith("/program/");
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navClass = (active: boolean) => cn(
    "py-2 text-[15px] font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]",
    active && "font-semibold text-[#245744]",
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-white">
      <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-8 px-4 md:px-6 lg:px-8">
        <Link href="/" className="shrink-0 font-heading text-[18px] font-bold tracking-[-0.02em]">Ruang Sinergi</Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi utama">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={navClass(pathname === "/")}>Beranda</Link>

          <div
            className="relative"
            onMouseEnter={() => setMaterialsOpen(true)}
            onMouseLeave={() => setMaterialsOpen(false)}
            onFocus={() => setMaterialsOpen(true)}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setMaterialsOpen(false); }}
          >
            <div className="flex items-center">
              <Link href="/jelajahi" aria-current={materialActive ? "page" : undefined} className={cn(navClass(materialActive), "pr-1.5")}>Materi</Link>
              <button type="button" aria-label="Tampilkan bidang materi" title="Tampilkan bidang materi" aria-expanded={materialsOpen} onClick={() => setMaterialsOpen(!materialsOpen)} className={cn("rounded-md p-1 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]", materialActive && "text-[#245744]")}>
                <ChevronDown size={15} className={cn("transition-transform duration-200", materialsOpen && "rotate-180")} />
              </button>
            </div>
            <div data-state={materialsOpen ? "open" : "closed"} aria-hidden={!materialsOpen} className="motion-popover absolute right-0 top-full z-50 w-64 rounded-xl border border-[var(--border)] bg-white p-1.5">
              {departments.map((department) => <a tabIndex={materialsOpen ? 0 : -1} key={department.slug} href={`/jelajahi?department=${department.slug}`} className="block rounded-lg px-3 py-2 text-xs leading-4 text-[var(--muted-foreground)] transition-colors hover:bg-[#f5f7f5] hover:text-[var(--foreground)]">{department.name}</a>)}
            </div>
          </div>

          {links.slice(1).map((link) => {
            const active = isActive(link.href);
            return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={navClass(active)}>{link.label}</Link>;
          })}
        </nav>


        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Tutup menu" : "Buka menu"} title={open ? "Tutup menu" : "Buka menu"}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <div data-state={open ? "open" : "closed"} aria-hidden={!open} className="motion-overlay fixed inset-0 top-[69px] z-50 bg-black/20 lg:hidden" onClick={() => setOpen(false)}>
        <nav className="motion-panel-right ml-auto h-full w-[min(86vw,360px)] border-l border-[var(--border)] bg-white p-4" aria-label="Navigasi seluler" onClick={(event) => event.stopPropagation()}>

          <Link href="/" tabIndex={open ? 0 : -1} aria-current={pathname === "/" ? "page" : undefined} onClick={() => setOpen(false)} className={cn("block px-3 py-3 text-sm font-medium text-[var(--muted-foreground)]", pathname === "/" && "font-semibold text-[#245744]")}>Beranda</Link>
          <button type="button" tabIndex={open ? 0 : -1} aria-expanded={mobileMaterialsOpen} onClick={() => setMobileMaterialsOpen(!mobileMaterialsOpen)} className={cn("flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-[var(--muted-foreground)]", materialActive && "font-semibold text-[#245744]")}>Materi<ChevronDown size={15} className={cn("transition-transform duration-200", mobileMaterialsOpen && "rotate-180")} /></button>
          <div className={cn("grid transition-[grid-template-rows,opacity] duration-200", mobileMaterialsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}><div className="overflow-hidden pl-3">{departments.map((department) => <a tabIndex={open && mobileMaterialsOpen ? 0 : -1} key={department.slug} href={`/jelajahi?department=${department.slug}`} onClick={() => setOpen(false)} className="block px-3 py-1.5 text-[11px] leading-4 text-[var(--muted-foreground)]">{department.name}</a>)}</div></div>
          {links.slice(1).map((link) => { const active = isActive(link.href); return <Link key={link.href} href={link.href} tabIndex={open ? 0 : -1} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)} className={cn("block px-3 py-3 text-sm font-medium text-[var(--muted-foreground)]", active && "font-semibold text-[#245744]")}>{link.label}</Link>; })}
        </nav>
      </div>
    </header>
  );
}
