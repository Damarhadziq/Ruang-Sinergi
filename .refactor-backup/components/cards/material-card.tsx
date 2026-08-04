import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getDepartment } from "@/data/mock-data";
import type { Material } from "@/types";

export function MaterialCard({ material, compact = false }: { material: Material; compact?: boolean }) {
  const dept = getDepartment(material.department)!;
  return <Link href={`/materi/${material.slug}`} className="group block h-full">
    <Card className="h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[#cfd6d1] hover:shadow-[0_16px_40px_rgba(32,40,34,.08)]">
      {!compact && <div className="relative aspect-[16/10] overflow-hidden bg-[#eef0eb]"><img src={material.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /><div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent" /></div>}
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-2"><Badge style={{ background: dept.soft, color: dept.color }}>{dept.shortName}</Badge><ArrowUpRight size={17} className="text-[#a1a29c] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#315c4c]" /></div>
        <h3 className="font-heading text-lg font-bold leading-snug tracking-[-0.025em] text-[#242622]">{material.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6c6d67]">{material.summary}</p>
        <div className="mt-4 flex items-center gap-3 text-xs font-medium text-[#777872]"><span>{material.type}</span><span>·</span><span className="flex items-center gap-1"><Clock size={13} /> {material.duration} menit</span><span>·</span><span>{material.difficulty}</span></div>
      </div>
    </Card>
  </Link>;
}

