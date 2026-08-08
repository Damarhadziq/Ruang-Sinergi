"use client";

import { useEffect, useState } from "react";
import Gallery from "@solar-icons/react/icons/video/Gallery";
import CloseCircle from "@solar-icons/react/icons/ui/CloseCircle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { departments, gallery } from "@/data/mock-data";
import type { GalleryItem } from "@/types";

export default function GalleryPage() {
  const [department, setDepartment] = useState("semua");
  const [type, setType] = useState("semua");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const items = gallery.filter((item) => (department === "semua" || item.department === department) && (type === "semua" || item.type === type));

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  return (
    <main>
      <section className="game-soft-section">
        <div className="container-app py-12 sm:py-16">

          <h1 className="text-page-title page-title-play">Galeri siswa</h1>
        </div>
      </section>

      <section className="container-app py-10 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="game-chip"><Gallery size={16} weight="BoldDuotone" />{items.length} karya ditemukan</span>
          <div className="grid gap-3 sm:grid-cols-2">
            <Select label="Filter bidang" value={department} onValueChange={setDepartment} options={[{ value: "semua", label: "Semua bidang" }, ...departments.map((item) => ({ value: item.slug, label: item.shortName }))]} />
            <Select label="Filter jenis karya" value={type} onValueChange={setType} options={[{ value: "semua", label: "Semua jenis karya" }, ...["Karya digital", "Pertunjukan", "Proyek", "Dokumentasi"].map((value) => ({ value, label: value }))]} />
          </div>
        </div>

        <div className="mt-9 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <button key={item.id} onClick={() => setSelected(item)} className="game-gallery-card group text-left">
              <img loading="lazy" decoding="async" src={item.image} alt={item.title} className="aspect-[4/3] w-full border border-[var(--border)] object-cover" />
              <div className="pt-4"><Badge>{item.type}</Badge><h2 className="text-card-title mt-3">{item.title}</h2><p className="text-meta mt-1 text-[var(--muted-foreground)]">{item.student} · {item.year}</p></div>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-[#12233a]/55 p-4 backdrop-blur-sm" role="presentation" onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="gallery-title" className="game-info-card relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white" onClick={(event) => event.stopPropagation()}>
            <Button variant="secondary" size="icon" className="absolute right-4 top-4 z-10" onClick={() => setSelected(null)} aria-label="Tutup detail karya"><CloseCircle size={18} weight="BoldDuotone" /></Button>
            <img loading="lazy" decoding="async" src={selected.image} alt={selected.title} className="aspect-[16/9] w-full object-cover" />
            <div className="p-6 sm:p-8"><Badge>{selected.type}</Badge><h2 id="gallery-title" className="text-section-title mt-3">{selected.title}</h2><p className="text-meta mt-2 text-[var(--muted-foreground)]">{selected.student} · {selected.year}</p><p className="text-body mt-5 max-w-prose text-[var(--muted-foreground)]">{selected.description}</p></div>
          </div>
        </div>
      )}
    </main>
  );
}