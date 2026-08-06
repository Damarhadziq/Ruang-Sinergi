import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, BookOpenCheck, CheckCircle2, Clock3, Gauge, Layers3, PlayCircle, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1120px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <Badge className="bg-[var(--secondary)] text-[var(--primary)]">Program kolaborasi</Badge>
              <h1 className="mt-5 max-w-3xl font-heading text-[38px] font-bold leading-[1.15] sm:text-[44px]">{program.title}</h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--muted-foreground)]">{program.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {program.departments.map((departmentSlug) => {
                  const department = getDepartment(departmentSlug)!;
                  return <Link key={departmentSlug} href={"/prodi/" + departmentSlug} className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[#fcfcfc]">{department.shortName}</Link>;
                })}
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                <HeroStat icon={Layers3} value={String(items.length)} label="Tahap" />
                <HeroStat icon={Clock3} value={String(totalDuration)} label="Menit" />
                <HeroStat icon={Users} value={String(program.departments.length)} label="Bidang" />
              </div>
            </div>

            <div>
              <img src={program.image} alt={program.title} className="aspect-[16/10] w-full rounded-xl border border-[var(--border)] object-cover" />
              <Card className="mt-3 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">Progres belajarmu</span>
                  <span className="font-heading text-lg font-bold text-[var(--primary)]">{program.progress}%</span>
                </div>
                <Progress value={program.progress} className="mt-3" />
                {firstMaterial && <Link href={"/materi/" + firstMaterial.slug} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]">Lanjutkan program <ArrowRight size={15} /></Link>}
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Alur belajar</p>
            <h2 className="section-title mt-2">Materi dalam program</h2>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">Selesaikan tahap sesuai urutan yang disarankan.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((material, index) => material && (
            <Link href={"/materi/" + material.slug} key={material.slug} className="group">
              <Card className="flex h-full flex-col overflow-hidden transition-colors hover:bg-[#fcfcfc]">
                <img src={material.image} alt="" className="aspect-[16/9] w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="bg-[var(--secondary)] text-[var(--primary)]">Tahap {index + 1}</Badge>
                    {index < program.progress / 33 ? <CheckCircle2 size={18} className="text-[var(--primary)]" /> : <ArrowUpRight size={18} className="text-[var(--muted-foreground)]" />}
                  </div>
                  <p className="mt-4 text-xs font-medium text-[var(--muted-foreground)]">{material.type} · {getDepartment(material.department)?.shortName}</p>
                  <h3 className="mt-2 font-heading text-xl font-bold leading-[1.3]">{material.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--muted-foreground)]">{material.summary}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-5 text-xs text-[var(--muted-foreground)]">
                    <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{material.duration} menit</span>
                    <span className="inline-flex items-center gap-1.5"><Gauge size={14} />{material.difficulty}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <InfoCard icon={BookOpenCheck} title="Belajar terarah" text="Setiap tahap memiliki tujuan, aktivitas, dan evaluasi singkat yang saling terhubung." />
          <InfoCard icon={PlayCircle} title="Praktik kontekstual" text="Materi menghubungkan komunikasi, teknologi, dan keterampilan praktik di lingkungan kerja." />
          <InfoCard icon={CheckCircle2} title="Progres tersimpan" text="Lanjutkan program dari tahap terakhir tanpa kehilangan alur belajar yang sudah ditempuh." />
        </div>
      </section>
    </main>
  );
}

function HeroStat({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-3">
      <Icon size={16} className="text-[var(--primary)]" />
      <p className="mt-3 font-heading text-xl font-bold">{value}</p>
      <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">{label}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <Card className="p-5">
      <Icon size={20} className="text-[var(--primary)]" />
      <h3 className="mt-4 font-heading text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{text}</p>
    </Card>
  );
}