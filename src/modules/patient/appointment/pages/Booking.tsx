import { useState } from "react";
import { Link, useRouter, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS } from "@/shared/data/mock";

const DATES = [
  { day: "MON", date: "12", full: "2025-05-12" },
  { day: "TUE", date: "13", full: "2025-05-13" },
  { day: "WED", date: "14", full: "2025-05-14" },
  { day: "THU", date: "15", full: "2025-05-15" },
  { day: "FRI", date: "16", full: "2025-05-16" },
  { day: "SAT", date: "17", full: "2025-05-17" },
  { day: "SUN", date: "18", full: "2025-05-18" },
];

const SLOTS = {
  morning: ["09:00 AM", "10:00 AM", "11:00 AM", "11:30 AM"],
  afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "02:00 PM"],
  evening: ["05:00 PM", "05:30 PM", "06:00 PM"],
};

export function Booking() {
  const { doctorId } = useParams({ strict: false });
  const router = useRouter();
  const doctor = (DOCTORS.find(d => d.id === doctorId) || DOCTORS[0])!;

  const [selectedDate, setSelectedDate] = useState("2025-05-14");
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F8FAFC] px-4 pt-6 pb-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="h-10 w-10 shrink-0 bg-white shadow-sm border border-slate-100 rounded-full">
          <ArrowLeft className="h-5 w-5 text-slate-700" />
        </Button>
        <h1 className="text-xl font-bold text-slate-900">Select Date & Time</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
        
        {/* Month Year Selector */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-bold text-slate-900">May 2025</h2>
            <Calendar className="h-5 w-5 text-slate-400" />
          </div>
          
          <div className="flex justify-between overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {DATES.map((d) => (
              <button
                key={d.full}
                onClick={() => setSelectedDate(d.full)}
                className={`flex flex-col items-center justify-center w-[60px] h-[76px] rounded-[20px] shrink-0 transition-all ${
                  selectedDate === d.full 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105" 
                    : "bg-white text-slate-700 border border-slate-100 shadow-sm"
                }`}
              >
                <span className={`text-[10px] font-bold ${selectedDate === d.full ? "text-blue-100" : "text-slate-400"}`}>{d.day}</span>
                <span className="text-[17px] font-bold mt-1">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold mb-3 text-slate-900">Morning</h3>
            <div className="grid grid-cols-3 gap-3">
              {SLOTS.morning.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2.5 px-2 text-[13px] font-bold rounded-2xl transition-all border-2 ${
                    selectedSlot === slot 
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-white border-slate-100 text-slate-600 hover:border-blue-200 shadow-sm"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold mb-3 text-slate-900">Afternoon</h3>
            <div className="grid grid-cols-3 gap-3">
              {SLOTS.afternoon.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2.5 px-2 text-[13px] font-bold rounded-2xl transition-all border-2 ${
                    selectedSlot === slot 
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-white border-slate-100 text-slate-600 hover:border-blue-200 shadow-sm"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3 text-slate-900">Evening</h3>
            <div className="grid grid-cols-3 gap-3">
              {SLOTS.evening.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2.5 px-2 text-[13px] font-bold rounded-2xl transition-all border-2 ${
                    selectedSlot === slot 
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-white border-slate-100 text-slate-600 hover:border-blue-200 shadow-sm"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 pb-safe">
        <Button asChild className="w-full h-14 rounded-2xl text-[15px] font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25">
          <Link 
            to="/payment/$doctorId" 
            params={{ doctorId: doctor.id }}
            search={{ date: selectedDate, time: selectedSlot }}
          >
            Confirm Booking
          </Link>
        </Button>
      </div>
    </div>
  );
}
