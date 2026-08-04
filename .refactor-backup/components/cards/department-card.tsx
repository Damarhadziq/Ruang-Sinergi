import Link from "next/link";
import { ArrowRight, CarFront, CircuitBoard, Code2, Dumbbell, HeartHandshake, Sparkles } from "lucide-react";
import type { Department } from "@/types";

const icons = { Code2, HeartHandshake, Dumbbell, Sparkles, CircuitBoard, CarFront };
export function DepartmentCard({ department }: { department: Department }) {
  const Icon = icons[department.icon as keyof typeof icons];
  return <Link href={`/prodi/${department.slug}`} className="group rounded-2xl border border-[#e5e5df] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(30,38,32,.07)]">
    <div className="mb-6 flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: department.soft, color: department.color }}><Icon size={21} /></span><ArrowRight size={18} className="text-[#b1b2ac] transition group-hover:translate-x-1" /></div>
    <h3 className="font-heading font-bold tracking-[-0.02em]">{department.shortName}</h3><p className="mt-2 text-sm leading-6 text-[#6d6e68]">{department.description}</p><p className="mt-4 text-xs font-semibold" style={{ color: department.color }}>{department.stats.materials} materi</p>
  </Link>;
}
