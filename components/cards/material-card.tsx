import Link from "next/link";
import ClockCircle from "@solar-icons/react/ssr/time/ClockCircle";
import SpeedometerMiddle from "@solar-icons/react/ssr/parts/SpeedometerMiddle";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getDepartment } from "@/data/mock-data";
import type { Material } from "@/types";

export function MaterialCard({ material, compact = false }: { material: Material; compact?: boolean }) {
  const department = getDepartment(material.department)!;

  if (compact) {
    return (
      <Link href={"/materi/" + material.slug} aria-label={"Buka materi " + material.title} className="block h-full">
        <Card className="game-material-card flex h-full min-h-36 flex-col p-4">
          <div className="flex items-center justify-between gap-3">
            <Badge className="h-6 px-2.5 py-0 text-xs" style={{ backgroundColor: department.soft, color: department.color }}>{department.shortName}</Badge>
            <span className="text-meta text-[var(--muted-foreground)]">{material.type}</span>
          </div>
          <h3 className="text-card-title mt-3">{material.title}</h3>
          <p className="text-meta mt-auto pt-3 text-[var(--muted-foreground)]">{material.duration} menit · {material.difficulty}</p>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={"/materi/" + material.slug} aria-label={"Buka materi " + material.title} className="block h-full">
      <Card className="game-material-card group flex h-full min-h-60 min-w-0 flex-col rounded-[18px] p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge className="h-6 w-fit px-2.5 py-0 text-xs" style={{ backgroundColor: department.soft, color: department.color }}>{department.shortName}</Badge>
          <span className="text-meta text-[var(--muted-foreground)]">{material.type}</span>
        </div>
        <h3 className="text-card-title mt-4">{material.title}</h3>
        <p className="text-body mt-2 line-clamp-2 text-[var(--muted-foreground)]">{material.summary}</p>
        <div className="text-meta mt-auto flex items-center gap-2 pt-5 text-[var(--muted-foreground)]">
          <span className="inline-flex items-center gap-1.5"><ClockCircle size={14} weight="BoldDuotone" />{material.duration} menit</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5"><SpeedometerMiddle size={14} weight="BoldDuotone" />{material.difficulty}</span>
        </div>
      </Card>
    </Link>
  );
}