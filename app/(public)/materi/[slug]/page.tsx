import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailBackLink } from "@/components/ui/detail-back-link";
import BookBookmark from "@solar-icons/react/ssr/school/BookBookmark";
import ClockCircle from "@solar-icons/react/ssr/time/ClockCircle";
import SpeedometerMiddle from "@solar-icons/react/ssr/parts/SpeedometerMiddle";
import UserRounded from "@solar-icons/react/ssr/users/UserRounded";
import { MaterialActions } from "@/components/material-actions";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { MaterialCard } from "@/components/cards/material-card";
import { getDepartment, getMaterial, materials } from "@/data/mock-data";

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) notFound();

  const department = getDepartment(material.department)!;
  const related = materials.filter((item) => item.department === material.department && item.slug !== slug).slice(0, 2);

  return (
    <main>
      <section className="game-soft-section">
        <div className="mx-auto w-full max-w-[1040px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <DetailBackLink href="/jelajahi" label="Kembali ke jelajahi materi" />
          <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
            <div>
              <h1 className="text-page-title page-title-play max-w-3xl">{material.title}</h1>
              <div className="text-small mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-[var(--muted-foreground)]">
                <span className="flex items-center gap-2"><UserRounded size={17} weight="BoldDuotone" />{material.author}</span>
                <span className="flex items-center gap-2"><ClockCircle size={17} weight="BoldDuotone" />{material.duration} menit</span>
                <span className="flex items-center gap-2"><SpeedometerMiddle size={17} weight="BoldDuotone" />{material.difficulty}</span>
              </div>
              <div className="mt-6"><MaterialActions slug={slug} /></div>
            </div>
            <img loading="eager" fetchPriority="high" decoding="async" src={material.image} alt={`Pratinjau ${material.title}`} className="game-visual aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1040px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <article>
          <div className="mb-10 rounded-2xl border border-[var(--border)] bg-[#f7faff] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-[var(--primary)]"><BookBookmark size={22} weight="BoldDuotone" /><h2 className="text-card-title">Tujuan pembelajaran</h2></div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">{material.objectives.map((objective) => <li key={objective} className="text-small flex gap-3 text-[var(--muted-foreground)]"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />{objective}</li>)}</ul>
          </div>
          <BlockRenderer blocks={material.blocks} />
        </article>
      </section>

      {related.length > 0 && (
        <section className="game-soft-section">
          <div className="mx-auto w-full max-w-[1040px] px-4 section-space sm:px-6 lg:px-8">
            <h2 className="section-title">Materi terkait</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">{related.map((item) => <MaterialCard key={item.slug} material={item} compact />)}</div>
          </div>
        </section>
      )}
    </main>
  );
}