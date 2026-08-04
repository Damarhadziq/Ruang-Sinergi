"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { MaterialCard } from "@/components/cards/material-card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { departments, materials } from "@/data/mock-data";

const departmentOptions = [{ value: "semua", label: "Semua program studi" }, ...departments.map((item) => ({ value: item.slug, label: item.shortName }))];
const mediaOptions = ["semua", "Artikel", "Video", "Aktivitas", "Simulasi", "Kuis"].map((value) => ({ value, label: value === "semua" ? "Semua jenis media" : value }));
const difficultyOptions = ["semua", "Dasar", "Menengah", "Lanjutan"].map((value) => ({ value, label: value === "semua" ? "Semua tingkat" : value }));
const durationOptions = [{ value: "semua", label: "Semua durasi" }, { value: "singkat", label: "Maksimal 20 menit" }, { value: "panjang", label: "Lebih dari 20 menit" }];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("semua");
  const [type, setType] = useState("semua");
  const [difficulty, setDifficulty] = useState("semua");
  const [duration, setDuration] = useState("semua");
  const [sort, setSort] = useState("terbaru");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSearch(new URLSearchParams(window.location.search).get("q") ?? "");
  }, []);

  const filtered = useMemo(() => materials.filter((item) => (!search || `${item.title} ${item.summary}`.toLowerCase().includes(search.toLowerCase())) && (department === "semua" || item.department === department) && (type === "semua" || item.type === type) && (difficulty === "semua" || item.difficulty === difficulty) && (duration === "semua" || (duration === "singkat" ? item.duration <= 20 : item.duration > 20))).sort((a, b) => sort === "populer" ? b.popularity - a.popularity : b.date.localeCompare(a.date)), [search, department, type, difficulty, duration, sort]);
  const reset = () => { setSearch(""); setDepartment("semua"); setType("semua"); setDifficulty("semua"); setDuration("semua"); };
  const filters = <div className="grid gap-5"><Filter label="Program studi"><Select label="Pilih program studi" value={department} onValueChange={setDepartment} options={departmentOptions} /></Filter><Filter label="Jenis media"><Select label="Pilih jenis media" value={type} onValueChange={setType} options={mediaOptions} /></Filter><Filter label="Tingkat kesulitan"><Select label="Pilih tingkat kesulitan" value={difficulty} onValueChange={setDifficulty} options={difficultyOptions} /></Filter><Filter label="Durasi"><Select label="Pilih durasi" value={duration} onValueChange={setDuration} options={durationOptions} /></Filter></div>;

  return <main className="container-app py-12 sm:py-16"><div className="max-w-2xl"><p className="eyebrow">Perpustakaan belajar</p><h1 className="mt-2 font-heading text-4xl font-bold sm:text-[40px]">Jelajahi materi</h1><p className="mt-4 leading-7 text-[var(--muted-foreground)]">Cari topik, pilih program studi, lalu temukan format belajar yang paling sesuai.</p></div><div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]"><aside className="hidden lg:block"><div className="sticky top-24"><div className="mb-5 flex items-center justify-between"><h2 className="font-heading text-lg font-bold">Filter</h2><button onClick={reset} className="text-sm font-semibold text-[var(--primary)]">Atur ulang</button></div>{filters}</div></aside><section className="min-w-0"><div className="flex flex-col gap-3 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Cari materi</span><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari materi atau topik" className="control pl-11" /></label><Button variant="outline" className="lg:hidden" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={17} />Filter</Button><Select label="Urutkan materi" value={sort} onValueChange={setSort} options={[{ value: "terbaru", label: "Terbaru" }, { value: "populer", label: "Terpopuler" }]} className="sm:w-44" /></div><p className="my-6 text-sm text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)]">{filtered.length}</strong> materi ditemukan</p>{filtered.length > 0 ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((material) => <MaterialCard key={material.slug} material={material} />)}</div> : <div className="grid min-h-80 place-items-center border-y border-[var(--border)] text-center"><div><Search size={24} className="mx-auto text-[var(--muted-foreground)]" /><h2 className="mt-4 font-heading text-xl font-bold">Materi belum ditemukan</h2><p className="mt-2 text-sm text-[var(--muted-foreground)]">Coba kata kunci atau kombinasi filter yang berbeda.</p><Button onClick={reset} variant="outline" className="mt-5">Hapus semua filter</Button></div></div>}</section></div>
    {filtersOpen && <div className="fixed inset-0 z-[60] bg-black/25 lg:hidden" onClick={() => setFiltersOpen(false)}><div className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[20px] border-t border-[var(--border)] bg-[var(--surface)] p-5" onClick={(event) => event.stopPropagation()}><div className="mb-6 flex items-center justify-between"><h2 className="font-heading text-xl font-bold">Filter materi</h2><Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)} aria-label="Tutup filter"><X size={18} /></Button></div>{filters}<Button className="mt-7 w-full" onClick={() => setFiltersOpen(false)}>Tampilkan {filtered.length} materi</Button></div></div>}
  </main>;
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) { return <div><p className="mb-2 text-sm font-semibold">{label}</p>{children}</div>; }
