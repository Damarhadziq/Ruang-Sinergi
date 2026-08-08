import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { departments } from "@/data/mock-data";
export default function ProgramsStudyPage() { return <AdminResourcePage title="Bidang" description="Atur identitas, warna aksen, dan kontributor setiap bidang." singular="bidang" items={departments.map((item) => ({ title: item.name, description: item.description, meta: `${item.stats.materials} materi · ${item.stats.contributors} kontributor` }))} />; }

