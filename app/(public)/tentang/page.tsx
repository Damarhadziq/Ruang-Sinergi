import BookBookmark from "@solar-icons/react/ssr/school/BookBookmark";
import PlayCircle from "@solar-icons/react/ssr/video/PlayCircle";
import CheckCircle from "@solar-icons/react/ssr/ui/CheckCircle";
import Letter from "@solar-icons/react/ssr/messages/Letter";
import { DepartmentIcon } from "@/components/department-icon";
import { DirectionArrowUpRight } from "@/components/ui/direction-icon";
import { departments } from "@/data/mock-data";
import TeamDriftWall from "@/components/team-drift-wall";

const reasons = [
  { icon: BookBookmark, title: "Materi dalam satu tempat", text: "Siswa dapat menemukan materi dari berbagai bidang melalui struktur yang konsisten." },
  { icon: PlayCircle, title: "Berbagai format belajar", text: "Materi tersedia dalam bentuk artikel, video, simulasi, dan aktivitas interaktif." },
  { icon: CheckCircle, title: "Latihan untuk menguji pemahaman", text: "Latihan singkat membantu siswa mengecek pemahaman setelah belajar." },
];

const contacts = [
  { title: "Instagram", description: "Ikuti kabar dan kegiatan terbaru Ruang Sinergi.", href: "https://www.instagram.com/", external: true },
  { title: "Email", description: "Sampaikan pertanyaan atau masukan kepada tim.", href: "mailto:ruangsinergi@smkn1semarang.sch.id", external: false },
  { title: "Dokumentasi", description: "Lihat proses dan dokumentasi pengembangan.", href: "#dokumentasi", external: false },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <h1 className="text-page-title">Tentang Ruang Sinergi</h1>
          <p className="text-body-lg mt-5 max-w-prose text-[var(--muted-foreground)]">Ruang belajar digital untuk membantu siswa SMK Negeri 1 Semarang menemukan materi dan latihan dari enam bidang dalam pengalaman yang konsisten.</p>
        </div>
      </section>

      <section className="border-y border-[#ececec] bg-[#f8fbff]">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-16">
          <h2 className="text-section-title">Yang bisa kamu lakukan</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">{reasons.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4"><Icon size={23} weight="BoldDuotone" className="mt-0.5 shrink-0 text-[var(--primary)]" /><div><h3 className="text-card-title">{title}</h3><p className="text-body mt-2 max-w-prose text-[var(--muted-foreground)]">{text}</p></div></div>)}</div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-20">
        <h2 className="text-section-title">Bidang pembelajaran</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{departments.map((department) => <div key={department.slug} className="flex items-center gap-4 rounded-2xl border border-[#ececec] p-4"><DepartmentIcon slug={department.slug} className="h-11 w-11" /><div><h3 className="text-card-title">{department.shortName}</h3><p className="text-meta mt-1 text-[var(--muted-foreground)]">{department.stats.materials} materi tersedia</p></div></div>)}</div>
      </section>

      <section id="kontak" className="border-y border-[#ececec] bg-[#f8fbff] scroll-mt-28">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-16">
          <div className="flex items-center gap-3"><Letter size={25} weight="BoldDuotone" className="text-[var(--primary)]" /><h2 className="text-section-title">Terhubung dengan kami</h2></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {contacts.map((contact) => <a key={contact.title} href={contact.href} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noreferrer" : undefined} className="group flex min-h-36 flex-col justify-between rounded-2xl border border-[#ececec] bg-white p-5 transition-colors hover:border-[#cfdff3]"><div><h3 className="text-card-title">{contact.title}</h3><p className="text-body mt-2 text-[var(--muted-foreground)]">{contact.description}</p></div><DirectionArrowUpRight size={17} className="mt-5 text-[var(--primary)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>)}
          </div>
        </div>
      </section>

      <section id="dokumentasi" className="scroll-mt-28 bg-white py-14 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-section-title">Dokumentasi tim Lantip</h2>
            <p className="text-body mt-3 max-w-prose text-[var(--muted-foreground)]">Kumpulan momen dan proses yang menemani pengembangan Ruang Sinergi.</p>
          </div>
        </div>
        <div className="mt-8 w-full"><TeamDriftWall /></div>
      </section>
    </main>
  );
}
