import Link from "next/link";
import { notFound } from "next/navigation";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import { DetailBackLink } from "@/components/ui/detail-back-link";
import Book2 from "@solar-icons/react/ssr/school/Book2";
import PlayCircle from "@solar-icons/react/ssr/video/PlayCircle";
import FileText from "@solar-icons/react/ssr/files/FileText";
import Checklist from "@solar-icons/react/ssr/list/Checklist";
import UsersGroupRounded from "@solar-icons/react/ssr/users/UsersGroupRounded";
import { MaterialCard } from "@/components/cards/material-card";
import { gallery, getDepartment, materials, programs } from "@/data/mock-data";

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return <div className="game-chip min-w-28"><span className="text-[var(--primary)]">{icon}</span><span><strong className="text-label block text-[var(--foreground)]">{value}</strong><span className="text-meta">{label}</span></span></div>;
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const department = getDepartment(slug);
  if (!department) notFound();

  const items = materials.filter((item) => item.department === slug);
  const works = gallery.filter((item) => item.department === slug);
  const collabs = programs.filter((item) => item.departments.includes(slug));

  return <main>
    <section className="game-soft-section">
      <div className="container-app py-14 sm:py-16">
        <DetailBackLink href="/" label="Kembali ke beranda" className="mb-8" />
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <h1 className="text-page-title page-title-play max-w-3xl" style={{ color: department.color }}>{department.name}</h1>
          <div className="flex gap-3"><Stat icon={<Book2 size={19} weight="BoldDuotone" />} value={department.stats.materials} label="Materi" /><Stat icon={<UsersGroupRounded size={19} weight="BoldDuotone" />} value={department.stats.contributors} label="Kontributor" /></div>
        </div>
      </div>
    </section>

    <section className="container-app section-space">
      <div className="mb-8 flex items-end justify-between"><h2 className="section-title">Materi terbaru</h2><Link href="/jelajahi" className="text-label hidden items-center gap-2 sm:flex" style={{ color: department.color }}>Lihat semua <DirectionArrowRight size={17} /></Link></div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{(items.length ? items : materials).slice(0, 3).map((material) => <MaterialCard key={material.slug} material={material} />)}</div>
    </section>

    <section className="game-soft-section">
      <div className="container-app grid gap-12 py-16 lg:grid-cols-2">
        <div><h2 className="section-title">Pilih media sesuai kebutuhanmu.</h2><div className="mt-8 grid grid-cols-2 gap-x-6">{[{ icon: FileText, label: "Materi ringkas" }, { icon: PlayCircle, label: "Video praktik" }, { icon: Checklist, label: "Aktivitas mandiri" }, { icon: Book2, label: "Kuis pemahaman" }].map(({ icon: Icon, label }) => <div key={label} className="text-label flex items-center gap-3 py-3"><Icon size={20} weight="BoldDuotone" style={{ color: department.color }} />{label}</div>)}</div></div>
        <div><h2 className="section-title">Belajar bersama guru bidang.</h2><div className="mt-8 grid gap-4">{Array.from(new Set(items.map((item) => item.author))).concat(["Tim Kurikulum SMKN 1 Semarang"]).slice(0, 3).map((name) => <div key={name} className="flex items-center gap-4"><span className="text-label grid h-10 w-10 place-items-center rounded-xl text-white" style={{ backgroundColor: department.color }}>{name.split(" ").slice(-1)[0][0]}</span><div><p className="text-label">{name}</p><p className="text-small text-[var(--muted-foreground)]">Guru dan kontributor materi</p></div></div>)}</div></div>
      </div>
    </section>

    {works.length > 0 && <section className="container-app section-space"><h2 className="section-title">Karya dari siswa</h2><div className="mt-8 grid gap-5 sm:grid-cols-2">{works.map((work) => <Link href="/galeri" key={work.id}><img loading="lazy" decoding="async" src={work.image} alt={work.title} className="aspect-[16/8] w-full rounded-2xl border border-[var(--border)] object-cover" /><h3 className="text-card-title mt-3">{work.title}</h3><p className="text-small mt-1 text-[var(--muted-foreground)]">{work.student}</p></Link>)}</div></section>}

    {collabs.length > 0 && <section className="container-app pb-10"><div className="py-8"><h2 className="text-section-title">Program kolaborasi terkait</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{collabs.map((program) => <Link href={`/program/${program.slug}`} key={program.slug} className="text-label quest-row flex items-center justify-between rounded-2xl p-4">{program.title}<DirectionArrowRight size={18} /></Link>)}</div></div></section>}
  </main>;
}