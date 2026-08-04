import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function NotFoundPage() { return <main className="grid min-h-screen place-items-center p-4"><div className="max-w-md text-center"><Compass size={28} className="mx-auto text-[var(--primary)]" /><h1 className="mt-4 font-heading text-3xl font-bold">Halaman tidak ditemukan</h1><p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">Alamat yang kamu buka tidak tersedia atau sudah dipindahkan.</p><Link href="/"><Button className="mt-5">Kembali ke beranda</Button></Link></div></main>; }
