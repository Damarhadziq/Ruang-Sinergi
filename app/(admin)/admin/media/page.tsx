import { FileImage, FileText, Video } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
export default function MediaPage() { return <><AdminPageHeader title="Media" description="Kelola gambar, video, dan dokumen pendukung materi." action={<Button>Tambah media</Button>} /><div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center"><div className="mx-auto flex w-fit gap-3 text-[var(--primary)]"><FileImage /><Video /><FileText /></div><h2 className="mt-4 font-heading text-xl font-bold">Belum ada media yang dipilih</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted-foreground)]">Gunakan pustaka media saat menyusun materi. Fitur unggah akan dihubungkan pada tahap backend.</p></div></>; }

