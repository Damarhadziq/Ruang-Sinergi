"use client";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <main className="grid min-h-screen place-items-center p-4"><div className="max-w-md text-center"><AlertCircle size={28} className="mx-auto text-[var(--destructive)]" /><h1 className="mt-4 font-heading text-2xl font-bold">Halaman gagal dimuat</h1><p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Terjadi kendala saat menampilkan halaman ini. Coba muat ulang kontennya.</p><Button className="mt-5" onClick={reset}>Coba lagi</Button></div></main>; }

