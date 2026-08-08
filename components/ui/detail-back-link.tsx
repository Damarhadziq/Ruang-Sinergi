import Link from "next/link";
import { DirectionArrowLeft } from "@/components/ui/direction-icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DetailBackLink({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={cn("practice-soft-btn inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#cbdcf1] bg-white px-0 text-[#456481] transition", className)}
    >
      <DirectionArrowLeft size={18} />
    </Link>
  );
}