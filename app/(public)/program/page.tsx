import Link from "next/link";
import ClockCircle from "@solar-icons/react/ssr/time/ClockCircle";
import Layers from "@solar-icons/react/ssr/tools/Layers";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import { ProgramRoute } from "@/components/illustrations/program-route";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerList } from "@/components/motion/stagger-list";
import { getDepartment, getMaterial, programs } from "@/data/mock-data";

export default function ProgramsPage() {
  return (
    <main className="bg-white">
      <div className="container-app pb-20 pt-12 lg:pt-16">
        <FadeIn className="program-page-intro">
          <h1 className="text-page-title">Program kolaborasi</h1>
          <p className="text-body max-w-xl text-[var(--muted-foreground)]">Ikuti rangkaian materi dari beberapa bidang untuk memahami satu tantangan melalui sudut pandang yang lebih utuh.</p>
        </FadeIn>

        <section className="mt-12 lg:mt-16" aria-label="Daftar program kolaborasi">
          <StaggerList className="program-page-list">
            {programs.map((program, index) => {
              const items = program.materialSlugs.map(getMaterial).filter(Boolean);
              const totalDuration = items.reduce((total, item) => total + (item?.duration ?? 0), 0);
              const fieldNames = program.departments.map((slug) => getDepartment(slug)?.shortName).filter(Boolean);
              return (
                <Link key={program.slug} href={`/program/${program.slug}`} className="program-page-row group">
                  <span className="editorial-program-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="min-w-0"><h2 className="font-heading text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em]">{program.title}</h2><p className="text-body mt-3 max-w-2xl text-[var(--muted-foreground)]">{program.description}</p></div>
                  <div className="program-page-route"><ProgramRoute departments={program.departments} /><p className="text-meta mt-3 text-[var(--muted-foreground)]">{fieldNames.join(" → ")}</p></div>
                  <div className="text-meta flex flex-wrap gap-4 text-[var(--muted-foreground)]"><span className="inline-flex items-center gap-1.5"><Layers size={14} weight="BoldDuotone" />{items.length} tahap</span><span className="inline-flex items-center gap-1.5"><ClockCircle size={14} weight="BoldDuotone" />{totalDuration} menit</span></div>
                  <DirectionArrowRight size={18} className="text-[var(--primary)] transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </StaggerList>
        </section>
      </div>
    </main>
  );
}
