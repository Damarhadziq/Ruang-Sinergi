import Link from "next/link";

const socialLinks = [
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.youtube.com/", label: "YouTube" },
  { href: "https://www.tiktok.com/", label: "TikTok" },
];

export function Footer() {
  return (
    <footer className="game-footer mt-16 border-t border-[#ececec] bg-white">
      <div className="container-app grid gap-4 py-6 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:text-left">
        <Link href="/" className="font-heading text-base font-semibold leading-[1.3] tracking-[-0.01em] text-[var(--foreground)]">Ruang Sinergi</Link>
        <nav aria-label="Media sosial" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium leading-[1.45] tracking-[0.01em] text-[var(--muted-foreground)]">
          {socialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-[var(--primary)]">{link.label}</a>)}
        </nav>
        <p className="text-meta text-[var(--muted-foreground)] sm:text-right">© 2026 SMK Negeri 1 Semarang</p>
      </div>
    </footer>
  );
}
