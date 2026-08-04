import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-[var(--background)]"><aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[var(--border)] lg:block"><AdminSidebar /></aside><div className="lg:pl-64"><AdminHeader /><main className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-8">{children}</main></div></div>; }
