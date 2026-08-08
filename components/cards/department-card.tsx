import Link from "next/link";
import { DirectionArrowRight } from "@/components/ui/direction-icon";
import { DepartmentIcon } from "@/components/department-icon";
import type { Department } from "@/types";

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <article className="game-card action-button-card flex min-h-60 flex-col rounded-[20px] p-5">
      <div className="flex items-start justify-between gap-4">
        <DepartmentIcon slug={department.slug} className="h-12 w-12" />
        <span className="game-card-progress">{department.stats.materials} materi</span>
      </div>
      <h3 className="text-card-title mt-5">{department.shortName}</h3>
      <p className="text-body mt-2 line-clamp-2 flex-1 text-[var(--muted-foreground)]">{department.description}</p>
      <Link href={`/prodi/${department.slug}`} className="card-skeu-action ml-auto mt-5 w-fit" aria-label={`Lihat materi ${department.shortName}`}>Lihat materi <DirectionArrowRight size={14} /></Link>
    </article>
  );
}