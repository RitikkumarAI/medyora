import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    dayName: DAYS[(d.getDay() + 6) % 7],
    dateNum: d.getDate(),
    isToday: i === 0,
    fullDate: d
  };
});

const APPOINTMENTS = [
  { time: "09:00 AM", name: "Ritik Kumar", type: "First Visit", color: "bg-blue-100 text-blue-700" },
  { time: "09:30 AM", name: "Anjali Singh", type: "Follow up", color: "bg-purple-100 text-purple-700" },
  { time: "10:00 AM", name: "Rahul Sharma", type: "Consultation", color: "bg-amber-100 text-amber-700" },
  { time: "11:30 AM", name: "Neha Patel", type: "First Visit", color: "bg-blue-100 text-blue-700" },
];

export function DoctorCalendar() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-6 pb-4 shadow-sm border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="h-10 w-10 shrink-0 bg-slate-50 border border-slate-100 shadow-sm rounded-full">
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </Button>
            <h1 className="text-xl font-bold text-slate-900">Schedule</h1>
          </div>
          <Button size="icon" className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm">
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Month Selector */}
        <div className="flex items-center justify-between px-2 mb-4">
          <h2 className="text-sm font-bold text-slate-900">August 2026</h2>
          <div className="flex gap-2">
            <button className="h-7 w-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-7 w-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide">
          {DATES.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDate(i)}
              className={`flex flex-col items-center justify-center min-w-[60px] h-[80px] rounded-[24px] border transition-all ${
                selectedDate === i 
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30" 
                  : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 shadow-sm"
              }`}
            >
              <span className={`text-[11px] font-bold ${selectedDate === i ? "text-blue-100" : "text-slate-400"}`}>{d.dayName}</span>
              <span className={`text-lg font-black mt-1 ${selectedDate === i ? "text-white" : "text-slate-900"}`}>{d.dateNum}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 py-6 space-y-4 pb-24">
        
        {APPOINTMENTS.map((appt, i) => (
          <div key={i} className="flex gap-4 group">
            {/* Timeline */}
            <div className="flex flex-col items-center pt-2">
              <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">{appt.time.split(" ")[0]}</span>
              <span className="text-[9px] font-bold text-slate-400">{appt.time.split(" ")[1]}</span>
              <div className="w-px h-full bg-slate-200 mt-2" />
            </div>

            {/* Card */}
            <div className="flex-1 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-l-3xl" />
              <div className="pl-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-900">{appt.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${appt.color}`}>
                    {appt.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 30 min</span>
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Token #0{i+1}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
      </main>
    </div>
  );
}
