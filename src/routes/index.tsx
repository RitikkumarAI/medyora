import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { Onboarding } from "@/modules/auth/pages/Onboarding";
import { PatientHome } from "@/modules/patient/home/pages/PatientHome";
import { LiquidGlassBottomNav, type NavItem } from "@/shared/components/LiquidGlassBottomNav";

const DesktopLandingPage = lazy(() =>
  import("@/shared/components/DesktopLandingPage").then((m) => ({
    default: m.DesktopLandingPage,
  })),
);
import { Home, Search, Video, MessageSquare, User } from "lucide-react";
import { useAuth } from "@/shared/auth/useAuth";

const PATIENT_NAV: NavItem[] = [
  { label: "Home", icon: Home, to: "/patient" },
  { label: "Search", icon: Search, to: "/patient/search" },
  { label: "Consult", icon: Video, to: "/patient/consult" },
  { label: "Health Feed", icon: MessageSquare, to: "/patient/feed" },
  { label: "Profile", icon: User, to: "/patient/profile" },
];

function IndexPage() {
  const { isDoctor, isPatient } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDoctor) {
      navigate({ to: "/doctor" });
    }
  }, [isDoctor, navigate]);

  return (
    <>
      <div className="hidden lg:block">
        <Suspense fallback={null}>
          <DesktopLandingPage />
        </Suspense>
      </div>
      <div className="block lg:hidden w-full">
        {isPatient ? (
          <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans pb-24 w-full">
            <PatientHome />
            <LiquidGlassBottomNav items={PATIENT_NAV} />
          </div>
        ) : (
          <Onboarding />
        )}
      </div>
    </>
  );
}

export const Route = createFileRoute("/")({
  component: IndexPage,
});
