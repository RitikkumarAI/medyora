import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Pill,
  Heart,
  Users,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PatientDashboard() {
  const router = useRouter();

  // Local state for dark mode simulation (in a real app, this would be context/zustand)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Note: For actual Tailwind dark mode, we'd toggle the class on the <html> element
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const gridItems = [
    {
      icon: Calendar,
      label: "Appointments",
      count: "3",
      link: "/patient/appointments",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      icon: FileText,
      label: "Records",
      count: "12",
      link: "/patient/appointments",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      icon: Pill,
      label: "Prescriptions",
      count: "5",
      link: "/patient/prescriptions",
      color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    },
    {
      icon: Heart,
      label: "Favorites",
      count: "8",
      link: "/patient/favorites",
      color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    },
    {
      icon: Users,
      label: "Family",
      count: "4",
      link: "/patient/family",
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
    {
      icon: Bell,
      label: "Notifications",
      count: "2",
      link: "/patient/notifications",
      color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    },
  ];

  const listItems = [
    {
      icon: CreditCard,
      label: "Payment History",
      link: "/patient/payment/history",
      destructive: false,
    },
    { icon: Settings, label: "Settings", link: "/patient/profile", destructive: false },
    { icon: HelpCircle, label: "Help Center", link: "/patient/help", destructive: false },
    { icon: LogOut, label: "Log Out", link: "/", destructive: true },
  ];

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors ${isDarkMode ? "bg-slate-950" : "bg-[#F8FAFC]"}`}
    >
      {/* Header Profile Section */}
      <div className="bg-white dark:bg-slate-900 pb-6 rounded-b-[40px] shadow-sm border-b border-slate-100 dark:border-slate-800 transition-colors">
        <header className="px-4 pt-6 pb-2 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.history.back()}
            className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </Button>
        </header>

        <div className="px-6 flex items-center gap-5 mt-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=70"
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800 shadow-sm"
            />
            <div className="absolute bottom-1 right-1 h-4 w-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">Rahul Kumar</h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              +91 98765 43210
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                Premium
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-5 py-8 space-y-8 pb-32">
        {/* Grid Navigation */}
        <section>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Dashboard</h2>
          <div className="grid grid-cols-3 gap-4">
            {gridItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="bg-white dark:bg-slate-900 p-4 rounded-[24px] flex flex-col items-center justify-center text-center gap-3 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-800 transition-colors relative"
              >
                {item.count && (
                  <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white dark:border-slate-900">
                    {item.count}
                  </span>
                )}
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${item.color}`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* List Navigation */}
        <section>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Preferences</h2>
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            {listItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center justify-between p-4 px-5 transition-colors ${index !== listItems.length - 1 ? "border-b border-slate-100 dark:border-slate-800" : ""} ${item.destructive ? "hover:bg-red-50 dark:hover:bg-red-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-2xl flex items-center justify-center ${item.destructive ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-sm font-bold ${item.destructive ? "text-red-600 dark:text-red-400" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    {item.label}
                  </span>
                </div>
                {!item.destructive && (
                  <ChevronRight className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                )}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
