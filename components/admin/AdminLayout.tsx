import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";
import { DynamicBackground } from "@/components/dynamic-background";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGate>
      <div className="relative z-0 min-h-screen bg-transparent text-white">
        <DynamicBackground admin />
        <Sidebar />
        <div className="relative lg:pl-[292px]">
          <Topbar />
          <div className="px-4 py-7 md:px-8 md:py-9">{children}</div>
        </div>
      </div>
    </AdminAuthGate>
  );
}
