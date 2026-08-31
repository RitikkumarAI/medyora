import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Users, CalendarDays, IndianRupee, Star, Bell, Clock, 
  ArrowUpRight, Edit3, PieChart, Settings, LogOut, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS } from "@/shared/data/mock";
import { useAuth } from "@/shared/auth/useAuth";

export function DoctorDashboard() {
  const { user } = useAuth();
  const fallbackDoctor = DOCTORS[0]!; 
  const doctorName = user?.name || fallbackDoctor.fullName;
  const doctorImage = user?.avatar || fallbackDoctor.image;

  const appointments = [
    { time: "10:00 AM", name: "Rahul Sharma", token: "#01", status: "Completed", color: "bg-slate-100 text-slate-600" },
    { time: "10:30 AM", name: "Priya Patel", token: "#02", status: "In Progress", color: "bg-blue-100 text-blue-700 border border-blue-200" },
    { time: "11:00 AM", name: "Amit Joshi", token: "#03", status: "Waiting", color: "bg-amber-100 text-amber-700" },
    { time: "11:30 AM", name: "Neha Singh", token: "#04", status: "Waiting", color: "bg-amber-100 text-amber-700" },
  ];

  const gridItems = [
    { icon: CalendarDays, label: "Calendar", link: "/doctor/calendar", color: "bg-blue-100 text-blue-600" },
    { icon: Users, label: "Patients", link: "/doctor/patients", color: "bg-emerald-100 text-emerald-600" },
    { icon: Edit3, label: "Prescribe", link: "/doctor/prescriptions", color: "bg-purple-100 text-purple-600" },
    { icon: PieChart, label: "Analytics", link: "/doctor/analytics", color: "bg-amber-100 text-amber-600" },
    { icon: Star, label: "Reviews", link: "/doctor/reviews", color: "bg-rose-100 text-rose-600" },
    { icon: Settings, label: "Settings", link: "/doctor/settings", color: "bg-slate-100 text-slate-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <header className="bg-blue-600 px-6 pt-12 pb-16 rounded-b-[40px] text-white shadow-md relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-white/20 p-1">
              <img 
                src={doctorImage} 
                alt={doctorName} 
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-blue-100 text-xs font-medium uppercase tracking-wider">Welcome back,</p>
              <h1 className="text-xl font-bold">{doctorName}</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 px-5 -mt-8 relative z-20 space-y-6">
        
        {/* Core Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <IndianRupee className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                +12% <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
            <p className="text-xs font-bold text-slate-500">Today's Revenue</p>
            <p className="text-2xl font-black text-slate-900 mt-1">₹14.4k</p>
          </div>
          
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs font-bold text-slate-500">Today's Patients</p>
            <p className="text-2xl font-black text-slate-900 mt-1">18 <span className="text-sm text-slate-400 font-medium">/ 24</span></p>
          </div>
        </div>

        {/* Live Queue Control Card */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white shadow-xl shadow-blue-600/20">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="h-32 w-32" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-blue-100 uppercase tracking-widest">Live Queue</p>
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-medium text-blue-100">Current Token</p>
                <p className="text-5xl font-black mt-1">#12</p>
                <p className="text-xs font-medium text-blue-200 mt-2">4 Patients Waiting in Lobby</p>
              </div>
              <Button className="rounded-2xl h-12 px-6 font-bold bg-white text-blue-700 hover:bg-slate-50 shadow-sm">
                Call Next
              </Button>
            </div>
          </div>
        </div>

        {/* Ecosystem Grid Navigation */}
        <section>
          <h2 className="text-sm font-bold text-slate-900 mb-4 px-1">Manage Clinic</h2>
          <div className="grid grid-cols-3 gap-3">
            {gridItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.link}
                className="bg-white p-4 rounded-[24px] flex flex-col items-center justify-center text-center gap-3 border border-slate-100 shadow-sm hover:border-blue-200 transition-colors"
              >
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-[11px] font-bold text-slate-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Today's Schedule Feed */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-bold text-slate-900">Today's Schedule</h3>
            <Link to="/doctor/calendar" className="text-xs font-bold text-blue-600 flex items-center">See All <ChevronRight className="h-4 w-4" /></Link>
          </div>
          
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            {appointments.map((appt, i) => (
              <div key={i} className={`flex items-center p-4 transition-colors hover:bg-slate-50 ${i !== appointments.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="w-16 flex flex-col items-center justify-center shrink-0 border-r border-slate-100 pr-3 py-1">
                  <Clock className="h-4 w-4 text-slate-400 mb-1" />
                  <p className="text-[10px] font-bold text-slate-600 text-center leading-tight">{appt.time.split(" ")[0]}<br/>{appt.time.split(" ")[1]}</p>
                </div>
                <div className="flex-1 min-w-0 py-1 pl-4">
                  <p className="font-bold text-sm text-slate-900 truncate">{appt.name}</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-0.5">Token {appt.token}</p>
                </div>
                <div className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold ${appt.color}`}>
                  {appt.status}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Logout */}
        <Button 
          onClick={() => {
            logout();
            window.location.href = "/auth/login?role=doctor";
          }}
          variant="outline" 
          className="w-full h-14 rounded-2xl border-slate-200 text-red-500 font-bold bg-white hover:bg-red-50 hover:border-red-100 mt-4"
        >
          <LogOut className="h-5 w-5 mr-2" /> Log Out
        </Button>
      </main>

    </div>
  );
}
