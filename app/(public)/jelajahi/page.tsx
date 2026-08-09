"use client";

import { useEffect, useMemo, useState } from "react";
import Magnifier from "@solar-icons/react/icons/search/Magnifier";
import { MaterialCard } from "@/components/cards/material-card";
import { EmptyMaterial } from "@/components/illustrations/empty-material";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerList } from "@/components/motion/stagger-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Select } from "@/components/ui/select";
import { departments, materials } from "@/data/mock-data";

const departmentOptions = [{ value: "semua", label: "Semua bidang" }, ...departments.map((item) => ({ value: item.slug, label: item.shortName }))];
const sortOptions = [{ value: "terbaru", label: "Terbaru" }, { value: "populer", label: "Terpopuler" }, { value: "tersingkat", label: "Durasi tersingkat" }];
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
    if (selectedDepartment && departmentOptions.some((option) => option.value === selectedDepartment)) setDepartment(selectedDepartment);
  }, []);

  useEffect(() => setPage(1), [search, department, sort]);

  const filtered = useMemo(() => materials
    .filter((item) => {
      const searchMatches = !search || `${item.title} ${item.summary}`.toLowerCase().includes(search.toLowerCase());
      const departmentMatches = department === "semua" || item.department === department;
      return searchMatches && departmentMatches;
    })
    .sort((a, b) => sort === "populer" ? b.popularity - a.popularity : sort === "tersingkat" ? a.duration - b.duration : b.date.localeCompare(a.date)), [search, department, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / MATERIALS_PER_PAGE));
  const visibleMaterials = filtered.slice((page - 1) * MATERIALS_PER_PAGE, page * MATERIALS_PER_PAGE);
  const hasActiveFilter = Boolean(search) || department !== "semua";

  const reset = () => {
    setSearch("");
    setDepartment("semua");
  };

  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-12 md:px-6 lg:px-8 lg:pt-16">
        <FadeIn className="max-w-xl pb-9 lg:pb-10">
          <h1 className="text-page-title">Jelajahi materi</h1>
          <p className="text-body mt-3 text-[var(--muted-foreground)]">Temukan materi dari berbagai bidang sesuai topik yang kamu butuhkan.</p>
        </FadeIn>

        <section aria-label="Daftar materi">
          <div className="explore-editorial-toolbar">
            <label className="relative min-w-0">
              <span className="sr-only">Cari materi atau topik</span>
              <Magnifier size={16} weight="BoldDuotone" className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <Input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari materi atau topik" className="pl-9" />
            </label>
            <Select label="Pilih bidang" value={department} onValueChange={setDepartment} options={departmentOptions} />
            <Select label="Urutkan materi" value={sort} onValueChange={setSort} options={sortOptions} />
          </div>

          <div className="mb-5 mt-6 flex min-h-9 flex-wrap items-center justify-between gap-3">
            <p className="text-meta text-[var(--muted-foreground)]"><span className="font-medium text-[var(--foreground)]">{filtered.length}</span> materi ditemukan</p>
            {hasActiveFilter && <button type="button" onClick={reset} className="text-meta text-[var(--primary)] hover:underline">Atur ulang</button>}
          </div>

          {filtered.length > 0 ? (
            <>
              <StaggerList className="explore-editorial-results">
                {visibleMaterials.map((material) => <MaterialCard key={material.slug} material={material} />)}
              </StaggerList>
              <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          ) : (
            <div className="grid min-h-72 place-items-center px-5 text-center">
              <div className="max-w-sm"><EmptyMaterial /><h2 className="text-card-title mt-5">Materi belum ditemukan</h2><p className="text-small mt-2 text-[var(--muted-foreground)]">Coba kata kunci atau bidang yang berbeda.</p><Button type="button" variant="outline" size="sm" onClick={reset} className="mt-5">Atur ulang pencarian</Button></div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
