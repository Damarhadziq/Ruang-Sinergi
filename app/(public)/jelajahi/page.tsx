"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { MaterialCard } from "@/components/cards/material-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
    const params = new URLSearchParams(window.location.search);
    setSearch(params.get("q") ?? "");
    const selectedDepartment = params.get("department");
    if (selectedDepartment && departmentOptions.some((option) => option.value === selectedDepartment)) {
      setDepartment(selectedDepartment);
    }
  }, []);

  const filtered = useMemo(() => materials.filter((item) => (!search || `${item.title} ${item.summary}`.toLowerCase().includes(search.toLowerCase())) && (department === "semua" || item.department === department) && (type === "semua" || item.type === type) && (difficulty === "semua" || item.difficulty === difficulty) && (duration === "semua" || (duration === "singkat" ? item.duration <= 20 : item.duration > 20))).sort((a, b) => sort === "populer" ? b.popularity - a.popularity : b.date.localeCompare(a.date)), [search, department, type, difficulty, duration, sort]);
  const reset = () => { setSearch(""); setDepartment("semua"); setType("semua"); setDifficulty("semua"); setDuration("semua"); };

  const filters = (
    <div className="grid gap-5">
      <Filter label="Program studi"><Select label="Pilih program studi" value={department} onValueChange={setDepartment} options={departmentOptions} className="w-full" /></Filter>
      <Filter label="Jenis media"><Select label="Pilih jenis media" value={type} onValueChange={setType} options={mediaOptions} className="w-full" /></Filter>
      <Filter label="Tingkat kesulitan"><Select label="Pilih tingkat kesulitan" value={difficulty} onValueChange={setDifficulty} options={difficultyOptions} className="w-full" /></Filter>
      <Filter label="Durasi"><Select label="Pilih durasi" value={duration} onValueChange={setDuration} options={durationOptions} className="w-full" /></Filter>
    </div>
  );

  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 md:px-6 lg:px-8 lg:pt-10">
        <header className="pb-12 lg:pb-14">
          <h1 className="font-heading text-[32px] font-bold leading-[1.15] tracking-[-0.025em] sm:text-4xl lg:text-[40px]">Jelajahi materi</h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block" aria-label="Filter materi">
            <div className="sticky top-[100px]">
              <div className="mb-5 flex h-8 items-center justify-between">
                <h2 className="font-heading text-[19px] font-bold">Filter</h2>
                <button type="button" className="h-7 rounded-lg px-1.5 text-xs font-medium text-[var(--primary)] transition-colors hover:bg-[var(--muted)]" onClick={reset}>Atur ulang</button>
              </div>
              {filters}
            </div>
          </aside>

          <section className="min-w-0" aria-label="Daftar materi">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <label className="relative w-full max-w-full md:max-w-md lg:max-w-xl">
                <span className="sr-only">Cari materi atau topik</span>
                <Search size={16} className="size-4 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <Input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari materi atau topik" className="pl-9" />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-auto">
                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button type="button" variant="outline" className="h-10 w-full shrink-0 px-3 sm:w-auto lg:hidden"><SlidersHorizontal size={16} className="size-4" />Filter</Button>
                  </SheetTrigger>
                  <SheetContent aria-describedby="filter-description">
                    <div className="flex items-start justify-between gap-4">
                      <SheetHeader>
                        <SheetTitle>Filter materi</SheetTitle>
                        <SheetDescription id="filter-description">Persempit hasil berdasarkan program studi dan format belajar.</SheetDescription>
                      </SheetHeader>
                      <SheetClose asChild><Button type="button" variant="ghost" size="sm" className="h-8 shrink-0 px-2"><X size={15} />Tutup</Button></SheetClose>
                    </div>
                    <Separator className="my-6" />
                    {filters}
                    <div className="mt-7 grid gap-2">
                      <Button type="button" className="h-10" onClick={() => setFiltersOpen(false)}>Tampilkan {filtered.length} materi</Button>
                      <Button type="button" variant="ghost" className="h-10" onClick={reset}>Atur ulang filter</Button>
                    </div>
                  </SheetContent>
                </Sheet>

                <Select label="Urutkan materi" value={sort} onValueChange={setSort} options={[{ value: "terbaru", label: "Terbaru" }, { value: "populer", label: "Terpopuler" }]} className="w-full md:w-40 shrink-0" />
              </div>
            </div>

            <p className="mb-4 mt-5 text-sm text-[var(--muted-foreground)]"><span className="font-medium text-[var(--foreground)]">{filtered.length}</span> materi ditemukan</p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filtered.map((material) => <MaterialCard key={material.slug} material={material} />)}
              </div>
            ) : (
              <div className="grid min-h-72 place-items-center rounded-xl border border-[var(--border)] px-5 text-center">
                <div className="max-w-sm">
                  <Search size={24} className="mx-auto text-[var(--muted-foreground)]" />
                  <h2 className="mt-4 font-heading text-xl font-bold">Materi belum ditemukan</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Coba kata kunci atau kombinasi filter yang berbeda.</p>
                  <Button type="button" onClick={reset} variant="outline" size="sm" className="mt-5">Hapus semua filter</Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-2 text-sm font-medium text-[var(--foreground)]">{label}</p>{children}</div>;
}