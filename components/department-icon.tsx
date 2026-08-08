import { cn } from "@/lib/utils";

const departmentIcons: Record<string, string> = {
  informatika: "/icons/fields/informatika.svg",
  "bimbingan-konseling": "/icons/fields/bimbingan-konseling.svg",
  keolahragaan: "/icons/fields/keolahragaan.svg",
  "seni-tari": "/icons/fields/seni-tari.svg",
  "teknik-elektro": "/icons/fields/teknik-elektro.svg",
  "teknik-otomotif": "/icons/fields/teknik-otomotif.svg",
};

export function DepartmentIcon({ slug, className }: { slug: string; className?: string }) {
  const src = departmentIcons[slug];
  if (!src) return null;

  return <img loading="lazy" decoding="async" src={src} alt="" aria-hidden="true" className={cn("h-11 w-11 shrink-0", className)} />;
}
