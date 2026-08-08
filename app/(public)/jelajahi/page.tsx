"use client";

import { useEffect, useMemo, useState } from "react";
import Magnifier from "@solar-icons/react/icons/search/Magnifier";
import { MaterialCard } from "@/components/cards/material-card";
import { Input } from "@/components/ui/input";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Select } from "@/components/ui/select";
import { departments, materials } from "@/data/mock-data";

const departmentOptions = [{ value: "semua", label: "Semua bidang" }, ...departments.map((item) => ({ value: item.slug, label: item.shortName }))];
const sortOptions = [{ value: "terbaru", label: "Terbaru" }, { value: "populer", label: "Terpopuler" }];
const MATERIALS_PER_PAGE = 6;

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("semua");
  const [sort, setSort] = useState("terbaru");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearch(params.get("q") ?? "");
    const selectedDepartment = params.get("department");
    if (selectedDepartment && departmentOptions.some((option) => option.value === selectedDepartment)) {
      setDepartment(selectedDepartment);
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, department, sort]);

  const filtered = useMemo(
    () => materials
      .filter((item) => (!search || (item.title + " " + item.summary).toLowerCase().includes(search.toLowerCase())) && (department === "semua" || item.department === department))
      .sort((a, b) => sort === "populer" ? b.popularity - a.popularity : b.date.localeCompare(a.date)),
    [search, department, sort],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / MATERIALS_PER_PAGE));
  const visibleMaterials = filtered.slice((page - 1) * MATERIALS_PER_PAGE, page * MATERIALS_PER_PAGE);

  const reset = () => {
    setSearch("");
    setDepartment("semua");
  };

  const hasActiveFilter = Boolean(search) || department !== "semua";

  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 md:px-6 lg:px-8">
        <header className="pb-10 lg:pb-12">
          <h1 className="text-page-title page-title-play">Jelajahi materi</h1>
        </header>

        <section aria-label="Daftar materi">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_160px]">
            <label className="relative min-w-0">
              <span className="sr-only">Cari materi atau topik</span>
              <Magnifier size={16} weight="BoldDuotone" className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <Input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari materi atau topik" className="pl-9" />
            </label>
            <Select label="Pilih bidang" value={department} onValueChange={setDepartment} options={departmentOptions} />
            <Select label="Urutkan materi" value={sort} onValueChange={setSort} options={sortOptions} />
          </div>

          <div className="mb-5 mt-6 flex min-h-7 items-center justify-between gap-4">
            <p className="text-meta text-[var(--muted-foreground)]"><span className="font-medium text-[var(--foreground)]">{filtered.length}</span> materi ditemukan</p>
            {hasActiveFilter && <button type="button" onClick={reset} className="text-meta text-[var(--primary)] hover:underline">Atur ulang</button>}
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleMaterials.map((material) => <MaterialCard key={material.slug} material={material} />)}
              </div>
              <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          ) : (
            <div className="game-info-card grid min-h-64 place-items-center rounded-2xl border px-5 text-center">
              <div className="max-w-sm">
                <Magnifier size={24} weight="BoldDuotone" className="mx-auto text-[var(--muted-foreground)]" />
                <h2 className="text-card-title mt-4">Materi belum ditemukan</h2>
                <p className="text-small mt-2 text-[var(--muted-foreground)]">Coba kata kunci atau bidang yang berbeda.</p>
                <button type="button" onClick={reset} className="text-meta mt-5 text-[var(--primary)] hover:underline">Atur ulang pencarian</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}