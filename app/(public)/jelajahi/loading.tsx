import { Skeleton } from "@/components/ui/skeleton";

export default function ExploreLoading() {
  return (
    <main className="bg-white" role="status" aria-live="polite">
      <span className="sr-only">Memuat daftar materi</span>
      <div className="container-app pb-20 pt-12 sm:pt-14">
        <Skeleton className="h-11 w-72 max-w-full" />
        <div className="mt-12 grid gap-3 md:grid-cols-[minmax(0,1fr)_275px_200px]">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="mb-5 mt-8 h-4 w-32" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="rounded-[20px] border border-[#ececec] p-6"><div className="flex items-center justify-between"><Skeleton className="h-7 w-28 rounded-full" /><Skeleton className="h-4 w-16" /></div><Skeleton className="mt-6 h-6 w-4/5" /><Skeleton className="mt-4 h-4 w-full" /><Skeleton className="mt-2 h-4 w-3/4" /><Skeleton className="mt-14 h-4 w-2/3" /></div>)}</div>
      </div>
    </main>
  );
}