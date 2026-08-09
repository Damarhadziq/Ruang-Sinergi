"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import CardNav from "@/components/CardNav";
import { departments } from "@/data/mock-data";

export function SiteHeader() {
  const pathname = usePathname();

  const items = useMemo(() => [
    {
      label: "Mulai di sini",
      bgColor: "#edf5ff",
      textColor: "#17345f",
      links: [
        { label: "Beranda", href: "/", ariaLabel: "Buka beranda" },
        { label: "Jelajahi materi", href: "/jelajahi", ariaLabel: "Jelajahi semua materi" },
        { label: "Latihan interaktif", href: "/latihan", ariaLabel: "Buka latihan interaktif" },
      ],
    },
    {
      label: "Pilih bidang",
      bgColor: "#f7faff",
      textColor: "#17345f",
      compact: true,
      links: departments.map((department) => ({
        label: department.name,
        href: `/jelajahi?department=${department.slug}`,
        ariaLabel: `Lihat materi bidang ${department.name}`,
      })),
    },
    {
      label: "Program",
      bgColor: "#eaf3ff",
      textColor: "#17345f",
      links: [
        { label: "Program kolaborasi", href: "/program", ariaLabel: "Lihat program kolaborasi" },
        { label: "Persiapan dunia kerja", href: "/program/persiapan-dunia-kerja", ariaLabel: "Lihat program persiapan dunia kerja" },
      ],
    },
  ], []);

  return (
    <header className="site-card-header">
      <CardNav
        key={pathname}
        items={items}
        brand="Ruang Sinergi"
        buttonLabel="Mulai sekarang"
        buttonHref="/latihan"
        ease="power3.out"
        baseColor="#ffffff"
        menuColor="#17345f"
      />
    </header>
  );
}
