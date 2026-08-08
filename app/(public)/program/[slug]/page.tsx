import Link from "next/link";
import { notFound } from "next/navigation";
import type { ElementType } from "react";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import { DetailBackLink } from "@/components/ui/detail-back-link";
import BookBookmark from "@solar-icons/react/ssr/school/BookBookmark";
import CheckCircle from "@solar-icons/react/ssr/ui/CheckCircle";
import ClockCircle from "@solar-icons/react/ssr/time/ClockCircle";
import SpeedometerMiddle from "@solar-icons/react/ssr/parts/SpeedometerMiddle";
import Layers from "@solar-icons/react/ssr/tools/Layers";
import PlayCircle from "@solar-icons/react/ssr/video/PlayCircle";
import CupStar from "@solar-icons/react/ssr/ui/CupStar";
import UsersGroupRounded from "@solar-icons/react/ssr/users/UsersGroupRounded";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getDepartment, getMaterial, getProgram, programs } from "@/data/mock-data";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const items = program.materialSlugs.map(getMaterial).filter(Boolean);
  const totalDuration = items.reduce((total, item) => total + (item?.duration ?? 0), 0);
  const firstMaterial = items[0];

  return (
    <main>
      <section className="program-hero">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_410px] lg:px-8">
          <div className="self-center">
            <DetailBackLink href="/" label="Kembali ke beranda" className="mb-8" />
            <h1 className="text-page-title max-w-3xl">{program.title}</h1>
            <p className="text-body-lg mt-5 max-w-prose text-[var(--muted-foreground)]">{program.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{program.departments.map((departmentSlug) => { const department = getDepartment(departmentSlug)!; return <Link key={departmentSlug} href={"/prodi/" + departmentSlug} className="game-chip">{department.shortName}</Link>; })}</div>
            <div className="mt-7 flex flex-wrap gap-2"><span className="game-chip"><Layers size={15} weight="BoldDuotone" />{items.length} tahap</span><span className="game-chip"><ClockCircle size={15} weight="BoldDuotone" />{totalDuration} menit</span><span className="game-chip"><UsersGroupRounded size={15} weight="BoldDuotone" />{program.departments.length} bidang</span></div>
          </div>
          <div className="relative"><img loading="eager" fetchPriority="high" decoding="async" src={program.image} alt={program.title} className="game-visual aspect-[4/3] w-full object-cover" /><span className="text-badge game-floating absolute -bottom-3 left-5 inline-flex items-center gap-2 px-3 py-2 text-[#246fd8]"><CupStar size={16} weight="BoldDuotone" />{program.progress}% terselesaikan</span></div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1180px] gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="min-w-0">
          <h2 className="dashboard-title">Selesaikan quest satu per satu</h2>
          <ol className="mission-path mt-8">
            {items.map((material, index) => material && (
              <li key={material.slug} className="mission-step">
                <div className="mission-marker">{index < program.progress / 33 ? <CheckCircle size={19} weight="BoldDuotone" /> : index + 1}</div>
                <Link href={"/materi/" + material.slug} className="mission-step-card group">
                  <img loading="lazy" decoding="async" src={material.image} alt="" className="h-36 w-full object-cover sm:h-full sm:w-48" />
                  <div className="min-w-0 p-5 pr-12">
                    <div className="flex flex-wrap items-center gap-2"><Badge className="bg-[var(--secondary)] text-[var(--primary)]">Tahap {index + 1}</Badge><span className="text-meta text-[var(--muted-foreground)]">{getDepartment(material.department)?.shortName}</span></div>
                    <h3 className="text-card-title mt-3">{material.title}</h3>
                    <p className="text-body mt-2 line-clamp-2 text-[var(--muted-foreground)]">{material.summary}</p>
                    <div className="text-meta mt-4 flex flex-wrap gap-3 text-[var(--muted-foreground)]"><span className="inline-flex items-center gap-1.5"><ClockCircle size={15} weight="BoldDuotone" />{material.duration} menit</span><span className="inline-flex items-center gap-1.5"><SpeedometerMiddle size={14} weight="BoldDuotone" />{material.difficulty}</span></div>
                  </div>
                  <DirectionArrowRight size={18} className="absolute bottom-5 right-5 text-[var(--primary)] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="program-progress-panel">
            <h2 className="text-subtitle text-[#315eaf]">Progres quest</h2>
            <div className="mt-3 flex items-end justify-between"><p className="font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.025em] text-[#315eaf]">{program.progress}%</p><CupStar size={25} weight="BoldDuotone" className="text-[#765fd2]" /></div>
            <div className="mt-4"><Progress value={program.progress} /></div>
            <p className="text-small mt-4 text-[var(--muted-foreground)]">Lanjutkan dari tahap terakhir dan kumpulkan progresmu.</p>
            {firstMaterial && <Link href={"/materi/" + firstMaterial.slug} className="flex justify-end"><Button className="mt-5 w-fit">Lanjutkan quest <DirectionArrowRight size={16} /></Button></Link>}
          </div>

          <div className="mt-7 grid gap-5">
            <ProgramBenefit icon={BookBookmark} title="Belajar terarah" text="Setiap tahap saling terhubung." />
            <ProgramBenefit icon={PlayCircle} title="Praktik kontekstual" text="Dekat dengan situasi nyata." />
            <ProgramBenefit icon={CheckCircle} title="Progres tersimpan" text="Lanjutkan tanpa kehilangan alur." />
          </div>
        </aside>
      </section>
    </main>
  );
}

function ProgramBenefit({ icon: Icon, title, text }: { icon: ElementType; title: string; text: string }) {
  return <div className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf3ff] text-[var(--primary)]"><Icon size={19} weight="BoldDuotone" /></span><div><h3 className="text-label">{title}</h3><p className="text-meta mt-1 text-[var(--muted-foreground)]">{text}</p></div></div>;
}