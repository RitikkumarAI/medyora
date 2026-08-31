import { Outlet, useLocation } from "@tanstack/react-router";
import { 
  Home, Search, Video, MessageSquare, User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { LiquidGlassBottomNav, type NavItem } from "@/shared/components/LiquidGlassBottomNav";

const PATIENT_NAV: NavItem[] = [
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
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans pb-24 lg:pb-0 w-full">
        <main id="main-content" tabIndex={-1} className="w-full focus:outline-none">
          <Outlet />
        </main>

        {/* Mobile Floating Liquid Glass Bottom Navigation */}
        <LiquidGlassBottomNav items={PATIENT_NAV} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans w-full">
      
      {/* Universal Top Site Header */}
      <SiteHeader />

      {/* Main Full-Width Content Container without any cramping sidebars */}
      <main 
        id="main-content" 
        tabIndex={-1} 
        className={cn(
          "flex-1 w-full min-w-0 focus:outline-none",
          isRootTab ? "pb-28 lg:pb-12" : "pb-12"
        )}
      >
        <Outlet />
      </main>

      {/* Mobile Floating Liquid Glass Bottom Navigation */}
      {isRootTab && (
        <LiquidGlassBottomNav items={PATIENT_NAV} />
      )}

      {/* Global Site Footer */}
      <SiteFooter />

    </div>
  );
}
