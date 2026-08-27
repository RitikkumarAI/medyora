import { Outlet, Link, useLocation } from "@tanstack/react-router";
import { 
  Home, Search, Video, MessageSquare, User, Calendar, 
  Stethoscope, Activity, FileText, FolderPlus, CreditCard, 
  HelpCircle, FlaskConical, Pill, Crown, Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { SiteFooter } from "@/shared/components/SiteFooter";

const PATIENT_NAV = [
  { label: "Home", icon: Home, to: "/patient" },
  { label: "Search", icon: Search, to: "/patient/search" },
  { label: "Consult", icon: Video, to: "/patient/consult" },
  { label: "Health Feed", icon: MessageSquare, to: "/patient/feed" },
  { label: "Profile", icon: User, to: "/patient/profile" },
];

const ROOT_TABS = [
  "/patient",
  "/patient/",
  "/patient/care-ai",
  "/patient/search",
  "/patient/consult",
  "/patient/feed",
  "/patient/profile",
  "/patient/appointments",
  "/patient/favorites",
  "/patient/lab-tests",
  "/patient/medicines",
  "/patient/subscriptions",
  "/patient/surgeries",
];

export function PatientLayout() {
  const location = useLocation();
  const isRootTab = ROOT_TABS.includes(location.pathname);
  const isLandingPath = location.pathname === "/patient" || location.pathname === "/patient/";

  // If this is the main landing/discovery page, let DesktopLandingPage manage its full custom layout
  if (isLandingPath) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
        <main id="main-content" tabIndex={-1} className="w-full focus:outline-none">
          <Outlet />
        </main>

        {/* Mobile Fixed Bottom Navigation */}
        <nav 
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.04)]" 
          role="navigation" 
          aria-label="Mobile Bottom Navigation"
        >
          <div className="flex h-16 items-center justify-around px-2">
            {PATIENT_NAV.map((item) => {
              const isActive =
                location.pathname === item.to ||
                (item.to !== "/patient" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-all",
                      isActive && "fill-blue-600/20 dark:fill-blue-400/20 stroke-[2.5px]"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-semibold transition-all",
                      isActive ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
      
      {/* Universal Top Site Header */}
      <SiteHeader />

      {/* Main Full-Width Content Container without any cramping sidebars */}
      <main 
        id="main-content" 
        tabIndex={-1} 
        className={cn(
          "flex-1 w-full min-w-0 focus:outline-none",
          isRootTab ? "pb-20 lg:pb-12" : "pb-12"
        )}
      >
        <Outlet />
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      {isRootTab && (
        <nav 
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.04)]" 
          role="navigation" 
          aria-label="Mobile Bottom Navigation"
        >
          <div className="flex h-16 items-center justify-around px-2">
            {PATIENT_NAV.map((item) => {
              const isActive =
                location.pathname === item.to ||
                (item.to !== "/patient" && location.pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-all",
                      isActive && "fill-blue-600/20 dark:fill-blue-400/20 stroke-[2.5px]"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span
                    className={cn(
                      "text-[10px] font-semibold transition-all",
                      isActive ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Global Site Footer */}
      <SiteFooter />

    </div>
  );
}
