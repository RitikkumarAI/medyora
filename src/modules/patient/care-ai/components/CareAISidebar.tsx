import { Link, useLocation } from "@tanstack/react-router";
import {
  Sparkles,
  Search,
  LayoutGrid,
  FlaskConical,
  Pill,
  Shield,
  FileText,
  Users,
  Dumbbell,
  AlertTriangle,
  Compass,
  Settings,
  Crown,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CareAISidebarProps {
  onSelectNav?: (item: string) => void;
}

export function CareAISidebar({ onSelectNav }: CareAISidebarProps) {
  const location = useLocation();

  const NAV_ITEMS = [
    { label: "Find Doctors", icon: Search, to: "/doctors" },
    { label: "Specialties", icon: LayoutGrid, to: "/specialities" },
    { label: "Lab Tests", icon: FlaskConical, to: "/patient/lab-tests" },
    { label: "Medicines", icon: Pill, to: "/patient/medicines" },
    { label: "Health Plans", icon: Shield, to: "/patient/subscriptions" },
    { label: "My Health Records", icon: FileText, to: "/patient/family" },
    { label: "Family Care", icon: Users, to: "/patient/family" },
    { label: "Wellness & Fitness", icon: Dumbbell, to: "#wellness" },
    { label: "Emergency & Hospitals", icon: AlertTriangle, to: "#emergency" },
    { label: "Health Tools", icon: Compass, to: "#tools" },
    { label: "Settings", icon: Settings, to: "/patient/profile" },
  ];

  return (
    <aside className="w-full flex flex-col gap-4 font-sans select-none">
      {/* 1. Care AI Hero Identity Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
            <Sparkles className="h-5 w-5 animate-pulse text-sky-200" />
          </div>
          <div>
            <h2 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              Care AI
              <span className="text-[10px] uppercase font-black bg-white/25 px-1.5 py-0.5 rounded-md text-white tracking-wider">
                Pro
              </span>
            </h2>
            <p className="text-[11px] text-blue-100 font-medium leading-snug">
              Your Personal Health Assistant
            </p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Menu List */}
      <div className="p-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col gap-0.5">
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.to) && item.to !== "#wellness";

          return (
            <Link
              key={idx}
              to={item.to}
              onClick={() => onSelectNav?.(item.label)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all group ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                }`}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* 3. Medyora Premium Promotion Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 text-white border border-blue-800/40 shadow-xl relative overflow-hidden space-y-3">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
            <Crown className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-black text-white tracking-tight">Medyora Premium</span>
        </div>

        <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
          Smarter care for you & your family
        </p>

        <ul className="space-y-1.5 text-[11px] font-medium text-slate-200">
          <li className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="h-2.5 w-2.5" />
            </div>
            <span>AI Report Analysis</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="h-2.5 w-2.5" />
            </div>
            <span>Priority Doctor Booking</span>
          </li>
          <li className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="h-2.5 w-2.5" />
            </div>
            <span>Advanced Health Insights</span>
          </li>
        </ul>

        <Button
          onClick={() => onSelectNav?.("Upgrade Premium")}
          className="w-full h-9 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 mt-1 transition-all"
        >
          <span>Upgrade Now</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </aside>
  );
}
