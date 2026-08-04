"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && hash !== "#program-studi";
    if (href === "/#program-studi") return pathname === "/" && hash === "#program-studi";
    if (href.startsWith("/program/")) return pathname.startsWith("/program/");
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="container-app flex h-[68px] items-center justify-between gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-heading text-[17px] font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--primary)] text-white"><BookOpen size={18} /></span>
          Ruang Sinergi
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Navigasi utama">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]",
                  active && "text-[var(--primary)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form action="/jelajahi" className="relative hidden md:block" role="search">
          <label htmlFor="header-search" className="sr-only">Cari materi</label>
          <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input id="header-search" name="q" type="search" className="control h-10 w-52 pl-10 text-sm lg:w-60" placeholder="Cari materi" />
        </form>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Tutup menu" : "Buka menu"}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[69px] z-50 bg-black/20 md:hidden" onClick={() => setOpen(false)}>
          <nav className="ml-auto h-full w-[min(86vw,360px)] border-l border-[var(--border)] bg-[var(--surface)] p-4" aria-label="Navigasi seluler" onClick={(event) => event.stopPropagation()}>
            <form action="/jelajahi" className="relative mb-4" role="search">
              <label htmlFor="mobile-search" className="sr-only">Cari materi</label>
              <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input id="mobile-search" name="q" type="search" className="control h-10 w-full pl-10 text-sm" placeholder="Cari materi" />
            </form>
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-3 py-3 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]",
                    active && "text-[var(--primary)]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
