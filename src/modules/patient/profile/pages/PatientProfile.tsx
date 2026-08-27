import { Link, useRouter } from "@tanstack/react-router";
import { 
  User, Calendar, Video, FlaskConical, Pill, Stethoscope, 
  FileText, Wallet, Crown, ChevronRight, Settings, Shield, 
  HelpCircle, LogOut, Globe, Moon, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/shared/theme/ThemeToggle";
import { toast } from "sonner";

export function PatientProfile() {
  const router = useRouter();

  const historyItems = [
    { label: "In-Person Appointments", icon: Calendar, to: "/patient/appointments", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60" },
    { label: "Video Consultations", icon: Video, to: "/patient/consult", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60" },
    { label: "Test Bookings", icon: FlaskConical, to: "/patient/lab-tests", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60" },
    { label: "Medicine Orders", icon: Pill, to: "/patient/medicines", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/60" },
    { label: "My Doctors", icon: Stethoscope, to: "/doctors", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60" },
    { label: "Medical Records", icon: FileText, to: "/patient/family", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/60" },
    { label: "Payments & HealthCash", icon: Wallet, to: "/patient/payment/history", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/60" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 font-sans transition-colors">
      
      {/* ================= TOP USER HEADER (SCREEN 11) ================= */}
      <header className="px-5 pt-8 pb-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between">
          <Link to="/auth/profile" className="flex items-center gap-3.5 group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="User"
              className="h-14 w-14 rounded-full object-cover border-2 border-blue-600 shadow-xs"
            />
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                Ritik
              </h2>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                View & edit your profile <ChevronRight className="h-3 w-3" />
              </p>
            </div>
          </Link>

          <ThemeToggle variant="ghost" size="icon" />
        </div>

        {/* Active Medyora Care Plan Banner (Screen 11) */}
        <Link
          to="/patient/subscriptions"
          className="mt-4 flex items-center justify-between p-4 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md shadow-blue-950/30 group"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Crown className="h-5 w-5 fill-current" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-white">Care Plan</h4>
              <p className="text-[11px] text-blue-200 font-semibold">
                12 FREE Appointments for a Year
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      <main className="p-4 space-y-5 max-w-lg mx-auto w-full">
        
        {/* ================= MY HISTORY (SCREEN 11) ================= */}
        <section className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
            My History
          </h3>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {historyItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`h-9 w-9 rounded-2xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </section>

        {/* ================= SETTINGS & SUPPORT (SCREEN 12) ================= */}
        <section className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
            Help & Settings
          </h3>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <Link
              to="/auth/language"
              className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-9 w-9 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 flex items-center justify-center shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Language Settings</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              to="/patient/help"
              className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-9 w-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Help Center & Support</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>

            <button
              onClick={() => {
                toast.success("Logged out successfully.");
                router.navigate({ to: "/auth/login" });
              }}
              className="w-full flex items-center justify-between p-3.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-9 w-9 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center shrink-0">
                  <LogOut className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold">Logout</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

      </main>

    </div>
  );
}
