import Link from "next/link";
import ClockCircle from "@solar-icons/react/ssr/time/ClockCircle";
import Layers from "@solar-icons/react/ssr/tools/Layers";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import { Button } from "@/components/ui/button";
import { DepartmentCard } from "@/components/cards/department-card";
import { MaterialCard } from "@/components/cards/material-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerList } from "@/components/motion/stagger-list";
import { LearningJourney } from "@/components/illustrations/learning-journey";
import { ProgramRoute } from "@/components/illustrations/program-route";
import { getMaterial, materials, programs, departments } from "@/data/mock-data";

const departmentSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-8",
  "lg:col-span-6",
  "lg:col-span-6",
];

export default function HomePage() {
  const featuredMaterials = materials.filter((item) => item.featured).slice(0, 3);

  return (
    <main className="editorial-site">
      <section className="editorial-hero">
        <div className="container-app editorial-hero-grid">
          <FadeIn className="editorial-hero-copy">
            <h1>Belajar lintas bidang dalam satu ruang.</h1>
            <p className="editorial-hero-description">Temukan materi, aktivitas interaktif, dan program kolaborasi yang menghubungkan keterampilan sekolah dengan dunia nyata.</p>
            <div className="editorial-hero-actions">
              <Link href="/jelajahi"><Button>Jelajahi materi <DirectionArrowRight size={16} /></Button></Link>
              <Link href="/program" className="editorial-text-link">Lihat program <DirectionArrowRight size={15} /></Link>
            </div>
            <div className="editorial-inline-meta" aria-label="Ringkasan Ruang Sinergi">
              <span>6 bidang</span><i aria-hidden="true" /><span>Beragam media</span><i aria-hidden="true" /><span>Program lintas bidang</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="editorial-hero-visual"><LearningJourney /></FadeIn>
        </div>
      </section>

      <section className="editorial-section container-app">
        <div className="editorial-intro-grid">
          <h2 className="text-section-title">Enam bidang, banyak cara untuk berkembang.</h2>
          <p className="text-body max-w-xl text-[var(--muted-foreground)]">Pilih titik awal yang paling dekat dengan minatmu. Setiap bidang punya karakter, media, dan pengalaman belajar yang berbeda.</p>
        </div>
        <StaggerList className="editorial-department-grid">
          {departments.map((department, index) => <DepartmentCard key={department.slug} department={department} className={departmentSpans[index]} />)}
        </StaggerList>
      </section>

      <section className="editorial-surface-section">
        <div className="container-app editorial-section">
          <div className="editorial-intro-grid">
            <h2 className="text-section-title">Mulai dari hal yang relevan hari ini.</h2>
            <p className="text-body max-w-lg text-[var(--muted-foreground)]">Satu materi utama untuk dipelajari lebih dalam, ditemani pilihan singkat dari bidang lain.</p>
          </div>
          <div className="editorial-featured-materials">
            {featuredMaterials.map((material) => <MaterialCard key={material.slug} material={material} />)}
          </div>
        </div>
      </section>

      <section className="editorial-section container-app">
        <div className="editorial-program-heading">
          <h2 className="text-section-title max-w-xl">Satu tujuan, dirangkai dari beberapa bidang.</h2>
          <p className="text-body max-w-lg text-[var(--muted-foreground)]">Ikuti alur belajar yang menghubungkan pengetahuan teknis, komunikasi, kreativitas, dan kebiasaan kerja.</p>
        </div>
        <div className="editorial-program-list">
          {programs.map((program, index) => {
            const programMaterials = program.materialSlugs.map(getMaterial).filter(Boolean);
            const duration = programMaterials.reduce((total, material) => total + (material?.duration ?? 0), 0);
            return (
              <Link href={`/program/${program.slug}`} key={program.slug} className="editorial-program-row group">
                <span className="editorial-program-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0"><h3 className="text-card-title">{program.title}</h3><p className="text-body mt-2 max-w-xl text-[var(--muted-foreground)]">{program.description}</p></div>
                <ProgramRoute departments={program.departments} />
                <div className="text-meta flex flex-wrap gap-4 text-[var(--muted-foreground)]"><span className="inline-flex items-center gap-1.5"><Layers size={14} weight="BoldDuotone" />{programMaterials.length} tahap</span><span className="inline-flex items-center gap-1.5"><ClockCircle size={14} weight="BoldDuotone" />{duration} menit</span></div>
                <DirectionArrowRight size={17} className="text-[var(--primary)] transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="editorial-about-section">
        <div className="container-app editorial-about-grid">
          <h2 className="text-section-title max-w-lg">Belajar tidak harus berhenti di batas satu bidang.</h2>
          <div><p className="text-body max-w-2xl text-[var(--muted-foreground)]">Portal ini menyatukan materi dari enam bidang di SMK Negeri 1 Semarang agar siswa dapat melihat hubungan antara pengetahuan, praktik, dan tantangan nyata. Kamu bisa memulai dari bidangmu sendiri lalu memperluas cara pandang melalui program kolaborasi.</p><div className="editorial-inline-meta mt-6"><span>Materi terkurasi guru</span><i aria-hidden="true" /><span>Siap diakses dari ponsel</span></div></div>
        </div>
      </section>

      <section className="container-app py-14 lg:py-16">
        <div className="editorial-final-cta">
          <div><h2 className="text-section-title">Mulai dari satu materi kecil.</h2><p className="text-body mt-2 text-[var(--muted-foreground)]">Pilih bidangmu, temukan topik, lalu lanjutkan sesuai ritmemu.</p></div>
          <Link href="/jelajahi"><Button>Jelajahi materi <DirectionArrowRight size={16} /></Button></Link>
        </div>
      </section>
    </main>
  );
}
