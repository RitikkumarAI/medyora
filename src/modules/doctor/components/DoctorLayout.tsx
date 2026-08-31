import { Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { 
  LayoutDashboard, Calendar, Users, Settings, Activity, 
  FileText, Star, TrendingUp, Stethoscope, ChevronRight, 
  ShieldCheck, LogOut, Search, Lock, ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/shared/components/Logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/shared/theme/ThemeToggle";
import { platform } from "@/shared/native/platform";
import { useAuth } from "@/shared/auth/useAuth";
import { toast } from "sonner";

const DOCTOR_SIDEBAR_NAV = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/doctor" },
  { label: "Live Queue", icon: Activity, to: "/doctor/queue" },
  { label: "Patients", icon: Users, to: "/doctor/patients" },
  { label: "Calendar", icon: Calendar, to: "/doctor/calendar" },
  { label: "Prescriptions", icon: FileText, to: "/doctor/prescriptions" },
  { label: "Reviews", icon: Star, to: "/doctor/reviews" },
  { label: "Analytics & Earnings", icon: TrendingUp, to: "/doctor/analytics" },
  { label: "Settings", icon: Settings, to: "/doctor/settings" },
];

export function DoctorLayout() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const navigate = useNavigate();
  const { user, isDoctor, logout, loginAsDoctor } = useAuth();

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const handleDoctorLogout = () => {
    logout();
    toast.success("Doctor session logged out safely");
    navigate({ to: "/auth/login", search: { role: "doctor" } });
  };

  // If user is not logged in as doctor, display secure clinical barrier
  if (!isDoctor) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 transition-colors">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Doctor Verification Required</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Doctor & Clinic Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              This area is restricted to verified medical specialists and clinic staff for patient queue telemetry and prescription authoring.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={() => {
                loginAsDoctor({
                  name: "Dr. Rajesh Sharma",
                  medicalRegNo: "MCI-74892",
                  speciality: "Senior Cardiologist",
                });
                toast.success("Authenticated as Dr. Rajesh Sharma");
              }}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20"
            >
              Sign In as Dr. Rajesh Sharma (1-Click)
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
            >
              <Link to="/auth/login" search={{ role: "doctor" }}>
                Enter Medical Reg. No. & PIN
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="w-full text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <Link to="/">
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Back to Patient Website
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* ================= DESKTOP DOCTOR SHELL (>= md) ================= */}
      <div className="hidden md:flex min-h-screen">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 p-5 flex flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto" role="navigation" aria-label="Doctor Practice Navigation">
          <div className="space-y-4">
            <div className="px-2 flex items-center justify-between">
              <Logo />
              <div className="flex items-center gap-2">
                <ThemeToggle variant="ghost" size="icon" />
                <span className="text-[10px] font-black uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-md">
                  Doctor
                </span>
              </div>
            </div>

            {/* Quick Search Shortcut */}
            <button
              onClick={handleOpenCommandPalette}
              className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800/80 text-xs font-semibold text-slate-500 dark:text-slate-400 border border-slate-200/70 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Clinical Search
              </span>
              <kbd className="text-[10px] bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                {platform.isMacOS ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* Authenticated Doctor Profile Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80"}
                alt={user?.name || "Doctor"}
                className="h-10 w-10 rounded-xl object-cover border border-blue-200 dark:border-blue-700"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user?.name || "Dr. Rajesh Sharma"}</p>
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                </div>
                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold truncate">
                  {user?.speciality || "Senior Cardiologist"}
                </p>
                <p className="text-[9px] text-slate-400 font-mono truncate">
                  Reg: {user?.medicalRegNo || "MCI-74892"}
                </p>
              </div>
            </div>

            {/* Clinical Navigation links */}
            <nav className="space-y-1">
              {DOCTOR_SIDEBAR_NAV.map((item) => {
                const isActive = currentPath === item.to || (item.to !== "/doctor" && currentPath.startsWith(item.to));
                return (
                  <Link
                    key={item.to + item.label}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all",
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-white" : "text-slate-400 dark:text-slate-500")} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Doctor Logout & Safe Exit */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <Button
              onClick={handleDoctorLogout}
              variant="outline"
              size="sm"
              className="w-full h-9 text-xs font-bold rounded-xl border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out Doctor Console</span>
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main id="main-content" tabIndex={-1} className="flex-1 min-w-0 overflow-x-hidden p-6 lg:p-8 focus:outline-none">
          <Outlet />
        </main>
      </div>

      {/* ================= MOBILE DOCTOR SHELL (< md) ================= */}
      <div className="flex md:hidden flex-col min-h-screen">
        <header className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-[10px] font-black uppercase bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-md">
              Doctor
            </span>
          </div>
          <Button
            onClick={handleDoctorLogout}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-[10px] font-bold text-rose-600"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            Exit
          </Button>
        </header>

        <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto pb-24 focus:outline-none">
          <Outlet />
        </main>

        {/* Bottom Navigation for Doctor Mobile App */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-100 dark:border-slate-800 p-2 pb-safe z-50 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]" role="navigation" aria-label="Doctor Mobile Navigation">
          <div className="flex items-center justify-around">
            <Link to="/doctor" className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${currentPath === '/doctor' ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 scale-105' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
              <LayoutDashboard className={`h-6 w-6 ${currentPath === '/doctor' ? 'fill-blue-100 dark:fill-blue-900' : ''}`} />
              <span className="text-[10px] font-bold">Dashboard</span>
            </Link>
            
            <Link to="/doctor/calendar" className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${currentPath.includes('/doctor/calendar') ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 scale-105' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
              <Calendar className={`h-6 w-6 ${currentPath.includes('/doctor/calendar') ? 'fill-blue-100 dark:fill-blue-900' : ''}`} />
              <span className="text-[10px] font-bold">Schedule</span>
            </Link>

            <Link to="/doctor/patients" className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${currentPath.includes('/doctor/patients') ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 scale-105' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
              <Users className={`h-6 w-6 ${currentPath.includes('/doctor/patients') ? 'fill-blue-100 dark:fill-blue-900' : ''}`} />
              <span className="text-[10px] font-bold">Patients</span>
            </Link>

            <Link to="/doctor/settings" className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${currentPath.includes('/doctor/settings') ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/50 scale-105' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
              <Settings className={`h-6 w-6 ${currentPath.includes('/doctor/settings') ? 'fill-blue-100 dark:fill-blue-900' : ''}`} />
              <span className="text-[10px] font-bold">Menu</span>
            </Link>
          </div>
        </nav>
      </div>

    </div>
  );
}
