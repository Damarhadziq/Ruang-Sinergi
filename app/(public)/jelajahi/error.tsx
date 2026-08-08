"use client";

import DangerCircle from "@solar-icons/react/icons/ui/DangerCircle";
import { Button } from "@/components/ui/button";

export default function ExploreError({ reset }: { reset: () => void }) {
  return <main className="grid min-h-[60vh] place-items-center bg-white px-4"><div className="max-w-md text-center"><DangerCircle size={30} weight="BoldDuotone" className="mx-auto text-[var(--destructive)]" /><h1 className="text-section-title mt-4">Materi belum dapat dimuat</h1><p className="text-small mt-2 text-[var(--muted-foreground)]">Terjadi kendala saat menyiapkan daftar materi. Silakan coba kembali.</p><Button type="button" onClick={reset} className="mt-5">Coba lagi</Button></div></main>;
}