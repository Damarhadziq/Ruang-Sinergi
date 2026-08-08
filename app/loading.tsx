import { Skeleton } from "@/components/ui/skeleton";

export default function AppLoading() {
  return (
    <main className="min-h-screen bg-white" role="status" aria-live="polite">
      <span className="sr-only">Memuat halaman</span>
      <div className="border-b border-[#ececec]">
        <div className="container-app flex h-[68px] items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <div className="hidden gap-7 sm:flex">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-4 w-16" />)}</div>
        </div>
      </div>
      <div className="container-app py-10 sm:py-12">
        <Skeleton className="h-10 w-64 max-w-full" />
        <Skeleton className="mt-8 h-64 w-full rounded-2xl" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-56 w-full rounded-2xl" />)}</div>
      </div>
    </main>
  );
}