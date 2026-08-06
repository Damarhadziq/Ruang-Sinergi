import { Skeleton } from "@/components/ui/skeleton";

export default function ExploreLoading() {
  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-10 md:px-6 lg:px-8 lg:pt-10">
        <div className="pb-8"><Skeleton className="h-11 w-72 max-w-full" /><Skeleton className="mt-4 h-5 w-[560px] max-w-full" /></div>
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:grid lg:content-start lg:gap-5"><Skeleton className="h-8 w-full" />{Array.from({ length: 4 }).map((_, index) => <div key={index}><Skeleton className="mb-2 h-4 w-24" /><Skeleton className="h-10 w-full" /></div>)}</aside>
          <section><div className="flex flex-col gap-3 md:flex-row md:items-center"><Skeleton className="h-10 w-full max-w-full md:max-w-md lg:max-w-xl" /><Skeleton className="h-10 w-40 shrink-0" /></div><Skeleton className="mb-4 mt-5 h-4 w-32" /><div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="overflow-hidden rounded-xl border border-[var(--border)]"><Skeleton className="aspect-[16/9] w-full rounded-none" /><div className="p-5"><Skeleton className="h-6 w-24 rounded-full" /><Skeleton className="mt-3 h-6 w-4/5" /><Skeleton className="mt-3 h-4 w-full" /><Skeleton className="mt-2 h-4 w-3/4" /><Skeleton className="mt-5 h-4 w-2/3" /></div></div>)}</div></section>
        </div>
      </div>
    </main>
  );
}