import Link from "next/link";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import Book2 from "@solar-icons/react/ssr/school/Book2";
import Gamepad from "@solar-icons/react/ssr/devices/Gamepad";
import { Button } from "@/components/ui/button";
import { DepartmentCard } from "@/components/cards/department-card";
import { MaterialCard } from "@/components/cards/material-card";
import { departments, materials, programs } from "@/data/mock-data";

export default function HomePage() {
  const featuredMaterials = materials.filter((item) => item.featured).slice(0, 3);

  return (
    <main className="learning-dashboard">
      <div className="container-app py-8 sm:py-10">
        <section className="dashboard-hero dashboard-hero-compact dashboard-hero--image-bg">
          <div className="dashboard-hero-copy">
            <h1 className="text-page-title max-w-[460px] text-white">Taklukkan satu misi kecil setiap hari.</h1>
            <p className="text-body-lg mt-4 max-w-prose text-white/85">
              Pilih materi sesuai jurusanmu, selesaikan aktivitasnya, lalu uji pemahaman lewat latihan interaktif.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/latihan">
                <Button variant="secondary" className="hero-white-button w-full sm:w-auto">
                  <Gamepad size={17} weight="BoldDuotone" />Mulai latihan
                </Button>
              </Link>
              <Link href="/jelajahi">
                <Button variant="outline" className="hero-white-button w-full sm:w-auto">
                  <Book2 size={17} weight="BoldDuotone" />Cari materi
                </Button>
              </Link>
            </div>
          </div>

          <div className="dashboard-hero-progress">
            <div className="text-meta flex items-center justify-between text-white"><span>Progres tantangan</span><span>2 dari 3</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full w-2/3 rounded-full bg-[#9bcbff]" /></div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <h2 className="dashboard-title">Pilih arena jurusanmu</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => <DepartmentCard key={department.slug} department={department} />)}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <h2 className="dashboard-title">Misi pilihan untukmu</h2>
            <Link href="/jelajahi" className="dashboard-link">Lihat semua <DirectionArrowRight size={15} /></Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMaterials.map((material) => <MaterialCard key={material.slug} material={material} />)}
          </div>
        </section>

        <section className="dashboard-section pb-8">
          <div className="dashboard-section-heading"><h2 className="dashboard-title">Tantangan bersama</h2></div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {programs.map((program, index) => (
              <Link href={"/program/" + program.slug} key={program.slug} className="dashboard-quest">
                <span className="quest-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="text-label line-clamp-1">{program.title}</p>
                  <p className="text-meta mt-1 text-[var(--muted-foreground)]">{program.departments.length} bidang · tantangan kolaborasi</p>
                </div>
                <DirectionArrowRight size={16} className="shrink-0 text-[var(--primary)]" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}