import Link from "next/link";
import { AudioLines, BookOpen, Clock3, FileText, Gauge, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getDepartment } from "@/data/mock-data";
import type { Material } from "@/types";

function MediaIcon({ type }: { type: Material["type"] }) {
  if (type === "Video") return <PlayCircle size={14} aria-hidden="true" />;
  if (type === "Audio") return <AudioLines size={14} aria-hidden="true" />;
  if (["Artikel", "Dokumen", "Infografis"].includes(type)) return <FileText size={14} aria-hidden="true" />;
  return <BookOpen size={14} aria-hidden="true" />;
}

export function MaterialCard({ material, compact = false }: { material: Material; compact?: boolean }) {
  const department = getDepartment(material.department)!;

  if (compact) {
    return (
      <Link href={`/materi/${material.slug}`} aria-label={`Buka materi ${material.title}`}>
        <Card className="flex gap-4 p-4 transition-colors hover:bg-[#fcfdfc]">
          <img src={material.image} alt="" className="h-24 w-28 shrink-0 rounded-lg object-cover" />
          <div className="min-w-0 flex-1">
            <Badge className="h-6 px-2.5 py-0 text-xs" style={{ backgroundColor: department.soft, color: department.color }}>{department.shortName}</Badge>
            <h3 className="mt-3 line-clamp-2 font-heading text-lg font-bold leading-[1.3]">{material.title}</h3>
            <p className="mt-2 text-[13px] text-[var(--muted-foreground)]">{material.duration} menit · {material.difficulty}</p>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/materi/${material.slug}`} aria-label={`Buka materi ${material.title}`}>
      <Card className="flex h-full min-w-0 flex-col overflow-hidden transition-colors hover:bg-[#fcfdfc]">
        <img src={material.image} alt={`Pratinjau materi ${material.title}`} className="aspect-[16/9] w-full object-cover" />
        <div className="flex flex-1 flex-col p-5">
          <Badge className="h-6 w-fit px-2.5 py-0 text-xs" style={{ backgroundColor: department.soft, color: department.color }}>{department.shortName}</Badge>
          <h3 className="mt-3 line-clamp-2 font-heading text-lg font-bold leading-[1.3] tracking-[-0.015em]">{material.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted-foreground)]">{material.summary}</p>
          <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-4 text-[13px] text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-1.5"><MediaIcon type={material.type} />{material.type}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 size={14} aria-hidden="true" />{material.duration} menit</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5"><Gauge size={14} aria-hidden="true" />{material.difficulty}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}