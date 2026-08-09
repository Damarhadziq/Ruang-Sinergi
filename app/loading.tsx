import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white" role="status" aria-label="Memuat halaman">
      <span className="sr-only">Memuat halaman</span>
      <div className="h-[68px] border-b border-[#ececec]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-32 rounded-md" />
          <div className="hidden items-center gap-8 md:flex">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-4 w-16 rounded" />)}</div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Skeleton className="h-10 w-64 max-w-[75vw] rounded-lg" />
        <Skeleton className="mt-4 h-5 w-[32rem] max-w-full rounded" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => <div key={index} className="min-h-60 rounded-[18px] border border-[#ececec] p-5"><Skeleton className="h-6 w-28 rounded-full" /><Skeleton className="mt-7 h-6 w-4/5 rounded" /><Skeleton className="mt-4 h-4 w-full rounded" /><Skeleton className="mt-2 h-4 w-3/4 rounded" /><Skeleton className="mt-14 h-4 w-36 rounded" /></div>)}
        </div>
      </div>
    </main>
  );
}
