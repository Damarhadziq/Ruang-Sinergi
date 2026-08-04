import { Skeleton } from "@/components/ui/skeleton";
export default function PublicLoading() { return <main className="container-app py-12" aria-label="Memuat halaman"><Skeleton className="h-5 w-36" /><Skeleton className="mt-4 h-10 w-full max-w-xl" /><Skeleton className="mt-3 h-5 w-full max-w-md" /><div className="mt-10 grid gap-5 md:grid-cols-3">{[1, 2, 3].map((item) => <div key={item}><Skeleton className="aspect-[16/10] w-full" /><Skeleton className="mt-4 h-5 w-3/4" /><Skeleton className="mt-3 h-4 w-full" /></div>)}</div></main>; }

