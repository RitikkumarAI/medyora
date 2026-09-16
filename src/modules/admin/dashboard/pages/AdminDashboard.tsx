import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Users,
  UserCog,
  CalendarDays,
  IndianRupee,
  Bell,
  CheckCircle,
  XCircle,
  FileText,
  Settings,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS } from "@/shared/data/mock";
import { StatCardSkeleton, ListItemSkeleton } from "@/components/shared/SkeletonLoader";

export function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const gridItems = [
    { icon: UserCog, label: "Doctors", link: "/admin/doctors", color: "bg-blue-100 text-blue-600" },
    {
      icon: Users,
      label: "Patients",
      link: "/admin/patients",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: CalendarDays,
      label: "Appointments",
      link: "/admin/appointments",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: IndianRupee,
      label: "Payments",
      link: "/admin/payments",
      color: "bg-amber-100 text-amber-600",
    },
    { icon: FileText, label: "CMS", link: "/admin/cms", color: "bg-rose-100 text-rose-600" },
    {
      icon: Settings,
      label: "Settings",
      link: "/admin/settings",
      color: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <header className="bg-indigo-600 px-6 pt-12 pb-16 rounded-b-[40px] text-white shadow-md relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-indigo-100 text-xs font-medium uppercase tracking-wider">
              Super Admin
            </p>
            <h1 className="text-xl font-bold">Platform Overview</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 px-5 -mt-8 relative z-20 space-y-6">
        {/* Top Level Platform Stats */}
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <IndianRupee className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-500">Platform Revenue</p>
                <p className="text-2xl font-black text-slate-900 mt-1">₹2.4L</p>
              </div>

              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-500">Total Users</p>
                <p className="text-2xl font-black text-slate-900 mt-1">24.5k</p>
              </div>
            </>
          )}
        </div>

        {/* Admin Ecosystem Grid Navigation */}
        <section>
          <h2 className="text-sm font-bold text-slate-900 mb-4 px-1">Manage Platform</h2>
          <div className="grid grid-cols-3 gap-3">
            {gridItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="bg-white p-4 rounded-[24px] flex flex-col items-center justify-center text-center gap-3 border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors"
              >
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${item.color}`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Doctor Approvals List */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-bold text-slate-900">Pending KYC Approvals</h3>
            <Link
              to="/admin/doctors"
              className="text-xs font-bold text-indigo-600 flex items-center"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              <>
                <ListItemSkeleton />
                <ListItemSkeleton />
              </>
            ) : (
              DOCTORS.slice(0, 2).map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex flex-col gap-4"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="h-14 w-14 rounded-full object-cover border border-slate-100"
                    />
                    <div>
                      <h4 className="font-bold text-[15px] text-slate-900">{doc.fullName}</h4>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">{doc.speciality}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 h-12 rounded-2xl border-red-100 bg-red-50 text-red-600 hover:bg-red-100 font-bold"
                    >
                      <XCircle className="h-4 w-4 mr-2" /> Reject
                    </Button>
                    <Button className="flex-1 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/20">
                      <CheckCircle className="h-4 w-4 mr-2" /> Approve
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
