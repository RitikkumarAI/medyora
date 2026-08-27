import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { 
  Shield, LayoutDashboard, Users, FileText, Settings, 
  CreditCard, Calendar, Stethoscope, Ticket, Bell, Activity, Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/shared/components/Logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/shared/theme/ThemeToggle";
import { platform } from "@/shared/native/platform";

const ADMIN_SIDEBAR_NAV = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Doctors", icon: Stethoscope, to: "/admin/doctors" },
  { label: "Patients", icon: Users, to: "/admin/patients" },
  { label: "Appointments", icon: Calendar, to: "/admin/appointments" },
  { label: "Payments & Txns", icon: CreditCard, to: "/admin/payments" },
  { label: "Users & Staff", icon: Users, to: "/admin/users" },
  { label: "CMS & Banners", icon: FileText, to: "/admin/cms" },
  { label: "System Settings", icon: Settings, to: "/admin/settings" },
];

export function AdminLayout() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors">
      
      {/* ================= DESKTOP ADMIN SHELL (>= md) ================= */}
      <div className="hidden md:flex min-h-screen">
        
        {/* Left Sidebar (Screen 14) */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto" role="navigation" aria-label="Admin Portal Navigation">
          <div className="space-y-4">
            <div className="px-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                  M
                </div>
                <span className="font-black text-base text-white tracking-tight">Medyora</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ThemeToggle variant="ghost" size="icon" />
                <span className="text-[10px] font-black uppercase bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-md">
                  Admin
                </span>
              </div>
            </div>

            {/* Quick Search trigger */}
            <button
              onClick={handleOpenCommandPalette}
              className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-800/80 text-xs font-semibold text-slate-400 border border-slate-700/60 hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-indigo-400" />
                Command Menu
              </span>
              <kbd className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded border border-slate-600">
                {platform.isMacOS ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* Admin profile badge */}
            <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                AD
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">Super Admin</p>
                <p className="text-[10px] text-slate-400 truncate">System Controller</p>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              {ADMIN_SIDEBAR_NAV.map((item) => {
                const isActive = currentPath === item.to || (item.to !== "/admin" && currentPath.startsWith(item.to));
                return (
                  <Link
                    key={item.to + item.label}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all",
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-slate-400")} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick links to Patient App & Doctor App */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="grid grid-cols-2 gap-1.5">
              <Button asChild variant="outline" size="sm" className="h-8 text-[10px] font-bold rounded-xl bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700">
                <Link to="/patient">Patient App</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="h-8 text-[10px] font-bold rounded-xl bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700">
                <Link to="/doctor">Doctor App</Link>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 overflow-x-hidden p-6 lg:p-8 bg-slate-950 focus:outline-none">
          <Outlet />
        </main>
      </div>

      {/* ================= MOBILE ADMIN SHELL (< md) ================= */}
      <div className="flex md:hidden flex-col min-h-screen">
        <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto pb-24 focus:outline-none">
          <Outlet />
        </main>

        {/* Bottom Navigation for Admin Mobile App */}
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-2 pb-safe z-50 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)]" role="navigation" aria-label="Admin Mobile Navigation">
          <div className="flex items-center justify-around">
            <Link to="/admin" className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${currentPath === '/admin' ? 'text-indigo-400 bg-indigo-950/80 scale-105' : 'text-slate-400 hover:text-slate-200'}`}>
              <LayoutDashboard className={`h-6 w-6 ${currentPath === '/admin' ? 'fill-indigo-900' : ''}`} />
              <span className="text-[10px] font-bold">Dashboard</span>
            </Link>
            
            <Link to="/admin/users" className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${currentPath.includes('/admin/users') ? 'text-indigo-400 bg-indigo-950/80 scale-105' : 'text-slate-400 hover:text-slate-200'}`}>
              <Users className={`h-6 w-6 ${currentPath.includes('/admin/users') ? 'fill-indigo-900' : ''}`} />
              <span className="text-[10px] font-bold">Users</span>
            </Link>

            <Link to="/admin/cms" className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${currentPath.includes('/admin/cms') ? 'text-indigo-400 bg-indigo-950/80 scale-105' : 'text-slate-400 hover:text-slate-200'}`}>
              <FileText className={`h-6 w-6 ${currentPath.includes('/admin/cms') ? 'fill-indigo-900' : ''}`} />
              <span className="text-[10px] font-bold">CMS</span>
            </Link>

            <Link to="/admin/settings" className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${currentPath.includes('/admin/settings') ? 'text-indigo-400 bg-indigo-950/80 scale-105' : 'text-slate-400 hover:text-slate-200'}`}>
              <Settings className={`h-6 w-6 ${currentPath.includes('/admin/settings') ? 'fill-indigo-900' : ''}`} />
              <span className="text-[10px] font-bold">Menu</span>
            </Link>
          </div>
        </nav>
      </div>

    </div>
  );
}
