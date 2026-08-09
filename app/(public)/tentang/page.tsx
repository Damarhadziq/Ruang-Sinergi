import BookBookmark from "@solar-icons/react/ssr/school/BookBookmark";
import Layers from "@solar-icons/react/ssr/tools/Layers";
import PlayCircle from "@solar-icons/react/ssr/video/PlayCircle";
import CheckCircle from "@solar-icons/react/ssr/ui/CheckCircle";
import { DepartmentIcon } from "@/components/department-icon";
import { departments } from "@/data/mock-data";
import TeamDriftWall from "@/components/team-drift-wall";

const reasons = [
  { icon: BookBookmark, title: "Materi dalam satu tempat", text: "Siswa dapat menemukan materi dari berbagai bidang melalui struktur yang konsisten." },
  { icon: Layers, title: "Belajar lintas bidang", text: "Program kolaborasi menghubungkan beberapa sudut pandang dalam satu topik." },
  { icon: PlayCircle, title: "Berbagai format media", text: "Materi tersedia dalam bentuk artikel, video, simulasi, dan aktivitas interaktif." },
  { icon: CheckCircle, title: "Aktivitas untuk menguji pemahaman", text: "Latihan singkat membantu siswa mengecek pemahaman setelah belajar." },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <h1 className="text-page-title">Ruang belajar lintas bidang untuk siswa SMK.</h1>
          <p className="text-body-lg mt-5 max-w-prose text-[var(--muted-foreground)]">Ruang Sinergi mengintegrasikan materi, media interaktif, aktivitas, dan program kolaborasi dari enam bidang dalam satu pengalaman belajar yang konsisten.</p>
        </div>
      </section>

      <section className="game-soft-section">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-20">
          <h2 className="text-section-title">Mengapa Ruang Sinergi?</h2>
          <div className="mt-8 grid gap-7 md:grid-cols-2">{reasons.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eaf3ff] text-[var(--primary)]"><Icon size={21} weight="BoldDuotone" /></span><div><h3 className="text-card-title">{title}</h3><p className="text-body mt-2 max-w-prose text-[var(--muted-foreground)]">{text}</p></div></div>)}</div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-20">
        <h2 className="text-section-title">Bidang yang terlibat</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{departments.map((department) => <div key={department.slug} className="flex items-center gap-4 rounded-2xl border border-[var(--border)] p-4"><DepartmentIcon slug={department.slug} className="h-11 w-11" /><div><h3 className="text-card-title">{department.shortName}</h3><p className="text-meta mt-1 text-[var(--muted-foreground)]">{department.stats.materials} materi tersedia</p></div></div>)}</div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-section-title">Dokumentasi tim Lantip</h2>
            <p className="text-body mt-3 max-w-prose text-[var(--muted-foreground)]">Kumpulan momen, proses, dan referensi visual yang menemani pengembangan Ruang Sinergi.</p>
          </div>
        </div>
        <div className="mt-8 w-full"><TeamDriftWall /></div>
      </section>
    </main>
  );
}
