"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExploreError({ reset }: { reset: () => void }) {
  return <main className="grid min-h-[60vh] place-items-center bg-white px-4"><div className="max-w-md text-center"><AlertCircle size={28} className="mx-auto text-[var(--destructive)]" /><h1 className="mt-4 font-heading text-2xl font-bold">Materi belum dapat dimuat</h1><p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Terjadi kendala saat menyiapkan daftar materi. Silakan coba kembali.</p><Button type="button" onClick={reset} className="mt-5">Coba lagi</Button></div></main>;
}