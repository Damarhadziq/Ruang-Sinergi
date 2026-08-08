import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { programs } from "@/data/mock-data";
export default function ProgramsPage() { return <AdminResourcePage title="Program kolaborasi" description="Susun jalur belajar yang menggabungkan beberapa bidang." singular="program" items={programs.map((item) => ({ title: item.title, description: item.description, meta: `${item.departments.length} bidang · ${item.materialSlugs.length} materi` }))} />; }

