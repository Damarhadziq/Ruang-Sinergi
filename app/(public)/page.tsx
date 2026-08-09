import Link from "next/link";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import { Button } from "@/components/ui/button";
import { DepartmentCard } from "@/components/cards/department-card";
import { MaterialCard } from "@/components/cards/material-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerList } from "@/components/motion/stagger-list";
import { LearningJourney } from "@/components/illustrations/learning-journey";
import { materials, departments } from "@/data/mock-data";

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
            <p className="editorial-hero-description">Temukan materi dan aktivitas interaktif dari berbagai bidang untuk mengembangkan keterampilanmu.</p>
            <div className="editorial-hero-actions">
              <Link href="/jelajahi"><Button>Jelajahi materi <DirectionArrowRight size={16} /></Button></Link>
              <Link href="/tentang" className="editorial-text-link">Tentang Ruang Sinergi <DirectionArrowRight size={15} /></Link>
            </div>
            <div className="editorial-inline-meta" aria-label="Ringkasan Ruang Sinergi">
              <span>6 bidang</span><i aria-hidden="true" /><span>Beragam media</span><i aria-hidden="true" /><span>Latihan interaktif</span>
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

      <section className="editorial-about-section">
        <div className="container-app editorial-about-grid">
          <h2 className="text-section-title max-w-lg">Belajar tidak harus berhenti di batas satu bidang.</h2>
          <div><p className="text-body max-w-2xl text-[var(--muted-foreground)]">Portal ini menyatukan materi dari enam bidang di SMK Negeri 1 Semarang agar siswa dapat menemukan pengetahuan, praktik, dan latihan yang relevan dalam satu tempat.</p><div className="editorial-inline-meta mt-6"><span>Materi terkurasi guru</span><i aria-hidden="true" /><span>Siap diakses dari ponsel</span></div></div>
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
