export function AdminPageHeader({ title, action }: { title: string; description?: string; action?: React.ReactNode }) { return <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><h1 className="font-heading text-3xl font-bold">{title}</h1>{action}</div>; }

