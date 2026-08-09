import Link from "next/link";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import { Button } from "@/components/ui/button";
import { DepartmentCard } from "@/components/cards/department-card";
import { MaterialCard } from "@/components/cards/material-card";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerList } from "@/components/motion/stagger-list";
import { LottieVisual } from "@/components/motion/lottie-visual";
import { materials, departments } from "@/data/mock-data";

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
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="editorial-hero-visual">
            <LottieVisual
              src="https://lottie.host/d9f456e3-4a62-42a3-a544-8ccb27dd5e00/zTjTzaUZP0.lottie"
              className="home-lottie-visual"
              label="Ilustrasi siswa belajar bersama"
            />
          </FadeIn>
        </div>
      </section>

      <section className="editorial-section container-app">
        <div className="editorial-intro-grid">
          <h2 className="text-section-title">Enam bidang, banyak cara untuk berkembang.</h2>
          <p className="text-body max-w-xl text-[var(--muted-foreground)]">Pilih titik awal yang paling dekat dengan minatmu. Setiap bidang punya karakter, media, dan pengalaman belajar yang berbeda.</p>
        </div>
        <StaggerList className="editorial-department-grid">
          {departments.map((department) => <DepartmentCard key={department.slug} department={department} />)}
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

    </main>
  );
}
