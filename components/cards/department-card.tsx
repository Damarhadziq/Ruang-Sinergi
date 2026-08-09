import Link from "next/link";
import type { CSSProperties } from "react";
import { DepartmentIcon } from "@/components/department-icon";
import { cn } from "@/lib/utils";
import type { Department } from "@/types";

export function DepartmentCard({ department, className }: { department: Department; className?: string }) {
  return (
    <Link
      href={`/jelajahi?department=${department.slug}`}
      className={cn("editorial-department group", className)}
      style={{ "--department-color": department.color, "--department-soft": department.soft } as CSSProperties}
      aria-label={`Jelajahi materi ${department.shortName}`}
    >
      <div className="relative flex items-start justify-between gap-4">
        <DepartmentIcon slug={department.slug} className="h-11 w-11" />
        <span className="text-meta text-[var(--muted-foreground)]">{department.stats.materials} materi</span>
      </div>
      <div className="relative mt-5">
        <h3 className="text-card-title">{department.shortName}</h3>
        <p className="text-body mt-2 max-w-sm text-[var(--muted-foreground)]">{department.description}</p>
      </div>
    </Link>
  );
}
