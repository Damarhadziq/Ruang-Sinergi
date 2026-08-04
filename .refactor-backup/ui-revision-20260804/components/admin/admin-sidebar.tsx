"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, GraduationCap, Images, LayoutDashboard, Library, LogOut, Settings, Users, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/materi", label: "Materi", icon: BookOpen },
  { href: "/admin/program-studi", label: "Program studi", icon: GraduationCap },
  { href: "/admin/program", label: "Program kolaborasi", icon: Users },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
  { href: "/admin/media", label: "Media", icon: FolderOpen },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: Settings },
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) { const pathname = usePathname(); return <div className="flex h-full flex-col bg-[var(--surface)]"><div className="flex h-[68px] items-center gap-2.5 border-b border-[var(--border)] px-5 font-heading font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--primary)] text-white"><Library size={18} /></span>Ruang Sinergi</div><nav className="flex-1 space-y-1 p-3" aria-label="Navigasi admin">{adminNav.map(({ href, label, icon: Icon }) => { const active = href === "/admin" ? pathname === href : pathname.startsWith(href); return <Link href={href} key={href} onClick={onNavigate} className={cn("flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]", active && "bg-[var(--secondary)] text-[var(--primary)]")}><Icon size={19} />{label}</Link>; })}</nav><div className="border-t border-[var(--border)] p-3"><Link href="/" className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)]"><LogOut size={19} />Kembali ke web utama</Link></div></div>; }

