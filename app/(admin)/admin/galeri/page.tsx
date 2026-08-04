import { AdminResourcePage } from "@/components/admin/admin-resource-page";
import { gallery } from "@/data/mock-data";
export default function AdminGalleryPage() { return <AdminResourcePage title="Galeri" description="Kelola karya siswa yang tampil di web utama." singular="karya" items={gallery.map((item) => ({ title: item.title, description: item.student, meta: `${item.type} · ${item.year}` }))} />; }

