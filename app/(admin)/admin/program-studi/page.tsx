import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { departments } from "@/data/mock-data";
export default function ProgramsStudyPage() { return <AdminResourcePage title="Program studi" description="Atur identitas, warna aksen, dan kontributor setiap program studi." singular="program studi" items={departments.map((item) => ({ title: item.name, description: item.description, meta: `${item.stats.materials} materi · ${item.stats.contributors} kontributor` }))} />; }

