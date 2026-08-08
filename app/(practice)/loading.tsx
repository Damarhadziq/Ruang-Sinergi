import { Skeleton } from "@/components/ui/skeleton";

export default function PracticeLoading() {
  return (
    <main className="min-h-screen bg-white" role="status" aria-live="polite">
      <span className="sr-only">Memuat halaman latihan</span>
      <div className="border-b border-[#ececec]">
        <div className="container-app flex h-[68px] items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <div className="hidden gap-7 sm:flex">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-4 w-16" />)}</div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-12">
          <div><Skeleton className="h-10 w-80 max-w-full" /><Skeleton className="mt-4 h-5 w-full max-w-xl" /><Skeleton className="mt-3 h-5 w-3/4 max-w-md" /><div className="mt-7 flex gap-3"><Skeleton className="h-8 w-24 rounded-full" /><Skeleton className="h-8 w-28 rounded-full" /></div></div>
          <Skeleton className="h-72 w-full rounded-[14px]" />
        </div>
        <Skeleton className="mt-12 h-8 w-72 max-w-full" />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-60 w-full rounded-[20px]" />)}</div>
      </div>
    </main>
  );
}