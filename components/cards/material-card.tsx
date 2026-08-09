import Link from "next/link";
import type { CSSProperties } from "react";
import ClockCircle from "@solar-icons/react/ssr/time/ClockCircle";
import SpeedometerMiddle from "@solar-icons/react/ssr/parts/SpeedometerMiddle";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import { getDepartment } from "@/data/mock-data";
import type { Material } from "@/types";

/** One reusable card composition for home, explore, and related materials. */
export function MaterialCard({ material }: { material: Material; compact?: boolean; featured?: boolean }) {
  const department = getDepartment(material.department)!;
  const customProperties = {
    "--material-color": department.color,
    "--material-soft": department.soft,
  } as CSSProperties;

  return (
    <Link href={`/materi/${material.slug}`} aria-label={`Buka materi ${material.title}`} className="block h-full min-w-0">
      <Card className="editorial-material-card group relative flex h-full min-h-[250px] min-w-0 flex-col overflow-hidden rounded-[16px] p-5 sm:p-6" style={customProperties}>
        <div className="flex items-center justify-between gap-3">
          <Badge
            className="shiny-chip h-6 w-fit border border-[#ececec] px-2.5 py-0 text-xs"
            style={{ backgroundColor: department.soft, color: department.color }}
          >
            {department.shortName}
          </Badge>
          <span className="text-meta text-[var(--muted-foreground)]">{material.type}</span>
        </div>

        <div className="mt-5">
          <h3 className="text-card-title line-clamp-2">{material.title}</h3>
          <p className="text-body mt-2 line-clamp-2 text-[var(--muted-foreground)]">{material.summary}</p>
        </div>

        <div className="text-meta mt-auto flex items-center gap-2 pt-6 text-[var(--muted-foreground)]">
          <span className="inline-flex items-center gap-1.5"><ClockCircle size={14} weight="BoldDuotone" />{material.duration} menit</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5"><SpeedometerMiddle size={14} weight="BoldDuotone" />{material.difficulty}</span>
          <DirectionArrowRight size={15} className="ml-auto text-[var(--primary)] transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </Card>
    </Link>
  );
}
