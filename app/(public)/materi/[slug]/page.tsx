import Link from "next/link";
import { notFound } from "next/navigation";
import ClockCircle from "@solar-icons/react/ssr/time/ClockCircle";
import SpeedometerMiddle from "@solar-icons/react/ssr/parts/SpeedometerMiddle";
import UserRounded from "@solar-icons/react/ssr/users/UserRounded";
import { DetailBackLink } from "@/components/ui/detail-back-link";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import { Button } from "@/components/ui/button";
import { MaterialActions } from "@/components/material-actions";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { MaterialCard } from "@/components/cards/material-card";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { FadeIn } from "@/components/motion/fade-in";
import { getMaterial, getProgram, materials } from "@/data/mock-data";
import { getPracticeDepartment } from "@/data/practice-library";

const exerciseByMaterial: Record<string, string> = {
  "algoritma-pertamaku": "algoritma-sehari-hari",
  "dasar-keamanan-digital": "keamanan-digital",
  "mengenal-potensi-diri": "mengenal-potensi",
  "komunikasi-di-tempat-kerja": "komunikasi-positif",
  "pemanasan-dinamis": "pemanasan-aman",
  "ragam-gerak-gambyong": "irama-dan-gerak",
  "membaca-rangkaian-dasar": "rangkaian-dasar",
  "inspeksi-mesin-harian": "inspeksi-harian",
};

export default async function MaterialPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ program?: string }> }) {
  const { slug } = await params;
  const { program: requestedProgram } = await searchParams;
  const material = getMaterial(slug);
  if (!material) notFound();

  const related = materials.filter((item) => item.department === material.department && item.slug !== slug).slice(0, 3);
  const practiceDepartment = getPracticeDepartment(material.department);
  const exercise = practiceDepartment?.exercises.find((item) => item.slug === exerciseByMaterial[slug]) ?? practiceDepartment?.exercises[0];
  const programContext = requestedProgram && getProgram(requestedProgram) ? requestedProgram : undefined;
  const activityHref = `/latihan?department=${material.department}${exercise ? `&exercise=${exercise.slug}` : ""}${programContext ? `&program=${programContext}` : ""}`;
  const backHref = programContext ? `/program/${programContext}` : "/jelajahi";

  return (
    <main className="bg-white">
      <ReadingProgress />
      <header className="game-soft-section">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <DetailBackLink href={backHref} label={programContext ? "Kembali ke program" : "Kembali ke jelajahi materi"} />
          <div className="mt-9 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
            <FadeIn>
              <h1 className="text-page-title">{material.title}</h1>
              <p className="text-body-lg mt-4 max-w-2xl text-[var(--muted-foreground)]">{material.summary}</p>
              <div className="text-small mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[var(--muted-foreground)]">
                <span className="flex items-center gap-2"><UserRounded size={17} weight="BoldDuotone" />{material.author}</span>
                <span className="flex items-center gap-2"><ClockCircle size={17} weight="BoldDuotone" />{material.duration} menit</span>
                <span className="flex items-center gap-2"><SpeedometerMiddle size={17} weight="BoldDuotone" />{material.difficulty}</span>
              </div>
              <div className="mt-6"><MaterialActions slug={slug} /></div>
            </FadeIn>
            <FadeIn delay={0.08}><img loading="eager" fetchPriority="high" decoding="async" src={material.image} alt={`Pratinjau ${material.title}`} className="aspect-[4/3] w-full rounded-2xl object-cover" /></FadeIn>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[820px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <article>
          <FadeIn className="material-objectives">
            <h2 className="text-card-title">Setelah mempelajari materi ini</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">{material.objectives.map((objective) => <li key={objective} className="text-small flex gap-3 text-[var(--muted-foreground)]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />{objective}</li>)}</ul>
          </FadeIn>

          <div className="material-reading-flow"><BlockRenderer blocks={material.blocks} /></div>

          <FadeIn className="material-activity-cta">
            <div><h2 className="text-section-title">Uji pemahamanmu dalam beberapa menit.</h2><p className="text-body mt-3 max-w-prose text-[var(--muted-foreground)]">{exercise?.questions.length ?? 3} soal · sekitar {exercise?.duration ?? 5} menit · +{exercise?.xp ?? 100} XP</p></div>
            <Link href={activityHref}><Button>Mulai aktivitas <DirectionArrowRight size={16} /></Button></Link>
          </FadeIn>
        </article>
      </section>

      {related.length > 0 && (
        <section className="editorial-surface-section">
          <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="related-material-heading"><h2 className="text-section-title">Lanjutkan dari bidang yang sama.</h2><p className="text-body max-w-xl text-[var(--muted-foreground)]">Pilih materi berikutnya untuk memperdalam keterampilanmu secara bertahap.</p></div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <MaterialCard key={item.slug} material={item} />)}</div>
          </div>
        </section>
      )}
    </main>
  );
}
