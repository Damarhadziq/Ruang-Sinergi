import { Skeleton } from "@/components/ui/skeleton";

export default function PublicLoading() {
  return (
    <main className="container-app py-8 sm:py-10" role="status" aria-live="polite">
      <span className="sr-only">Memuat halaman</span>
      <Skeleton className="h-[430px] w-full rounded-[28px] sm:h-[500px]" />
      <Skeleton className="mt-14 h-8 w-72 max-w-full" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-64 w-full rounded-[20px]" />)}</div>
    </main>
  );
}