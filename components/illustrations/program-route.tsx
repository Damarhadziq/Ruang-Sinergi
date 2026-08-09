import { DepartmentIcon } from "@/components/department-icon";

export function ProgramRoute({ departments }: { departments: string[] }) {
  return (
    <div className="program-route" aria-label={`Alur bidang: ${departments.join(", ")}`}>
      <span className="program-route-line"><i /></span>
      {departments.slice(0, 3).map((slug) => <span className="program-route-node" key={slug}><DepartmentIcon slug={slug} className="h-11 w-11" /></span>)}
    </div>
  );
}
