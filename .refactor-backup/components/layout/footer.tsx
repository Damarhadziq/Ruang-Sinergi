import Link from "next/link";
import { BookOpen } from "lucide-react";
export function Footer() { return <footer className="mt-24 border-t border-[#e6e6e0] bg-[#f7f7f4]">
  <div className="container-app grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
    <div><div className="mb-3 flex items-center gap-2 font-heading font-bold"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#315c4c] text-white"><BookOpen size={16} /></span> Ruang Sinergi</div><p className="max-w-sm text-sm leading-6 text-[#6b6c66]">Portal belajar lintas keahlian untuk siswa SMK Negeri 1 Semarang. Belajar, berkarya, dan bertumbuh bersama.</p></div>
    <div><p className="mb-3 text-sm font-semibold">Jelajahi</p><div className="grid gap-2 text-sm text-[#6b6c66]"><Link href="/jelajahi">Semua materi</Link><Link href="/galeri">Galeri karya</Link><Link href="/editor">Ruang guru</Link></div></div>
    <div><p className="mb-3 text-sm font-semibold">Sekolah</p><p className="text-sm leading-6 text-[#6b6c66]">SMK Negeri 1 Semarang<br />Jawa Tengah, Indonesia</p></div>
  </div><div className="border-t border-[#e6e6e0] py-5 text-center text-xs text-[#858680]">© 2026 Ruang Sinergi · Belajar tanpa sekat keahlian.</div>
  </footer>; }

