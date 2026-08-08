"use client";

import { Button } from "@/components/ui/button";
import { DirectionArrowLeft, DirectionArrowRight } from "@/components/ui/direction-icon";
import { cn } from "@/lib/utils";

export function PaginationControls({
  page,
  totalPages,
  onPageChange,
  className,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Navigasi halaman" className={cn("mt-8 flex items-center justify-center gap-2", className)}>
      <button
        type="button"
        className="grid h-9 w-8 place-items-center text-[var(--primary)] transition-colors hover:text-[#1558bb] disabled:text-[#b7c3d0]"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Halaman sebelumnya"
      >
        <DirectionArrowLeft size={17} />
      </button>
      {pages.map((item) => (
        <Button
          key={item}
          type="button"
          variant={item === page ? "default" : "outline"}
          size="sm"
          className="h-9 min-w-9 px-2"
          onClick={() => onPageChange(item)}
          aria-current={item === page ? "page" : undefined}
        >
          {item}
        </Button>
      ))}
      <button
        type="button"
        className="grid h-9 w-8 place-items-center text-[var(--primary)] transition-colors hover:text-[#1558bb] disabled:text-[#b7c3d0]"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Halaman berikutnya"
      >
        <DirectionArrowRight size={17} />
      </button>
    </nav>
  );
}