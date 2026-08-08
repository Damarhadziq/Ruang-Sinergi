"use client";
import { useEffect, useState } from "react";
export function ReflectionBlock({ id, prompt }: { id: string; prompt: string }) {
  const [value, setValue] = useState("");
  useEffect(() => { setValue(localStorage.getItem(`reflection-${id}`) ?? ""); }, [id]);
  return <div className="block-surface bg-[#fbf6f2]"><p className="text-meta mb-2 text-[#986745]">Ruang refleksi pribadi</p><h3 className="block-title">{prompt}</h3><textarea value={value} onChange={(e) => { setValue(e.target.value); localStorage.setItem(`reflection-${id}`, e.target.value); }} rows={5} placeholder="Tuliskan jawabanmu di sini…" className="text-control mt-4 w-full resize-none rounded-xl border border-[var(--border)] bg-white p-4 outline-none focus-visible:border-[var(--focus-border)]" /><p className="text-meta mt-2 text-[#8a7c72]">Tersimpan hanya di perangkat ini. Tidak digunakan untuk diagnosis.</p></div>;
}

