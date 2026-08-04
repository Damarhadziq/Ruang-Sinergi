import { Skeleton } from "@/components/ui/skeleton";
export default function AdminLoading() { return <div aria-label="Memuat dashboard"><Skeleton className="h-9 w-52" /><Skeleton className="mt-3 h-4 w-80" /><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[1, 2, 3, 4].map((item) => <Skeleton key={item} className="h-32" />)}</div><Skeleton className="mt-8 h-72 w-full" /></div>; }

