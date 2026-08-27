import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Search, Filter, Phone, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PATIENTS = [
  { id: "p1", name: "Ritik Kumar", age: 24, gender: "Male", lastVisit: "12 Aug 2026", type: "Returning", image: "https://ui-avatars.com/api/?name=Ritik+Kumar&background=eff6ff&color=3b82f6" },
  { id: "p2", name: "Anjali Singh", age: 28, gender: "Female", lastVisit: "20 Aug 2026", type: "New", image: "https://ui-avatars.com/api/?name=Anjali+Singh&background=fdf4ff&color=c026d3" },
  { id: "p3", name: "Rahul Sharma", age: 35, gender: "Male", lastVisit: "05 Jul 2026", type: "Returning", image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=fffbeb&color=b45309" },
  { id: "p4", name: "Neha Patel", age: 29, gender: "Female", lastVisit: "Today", type: "New", image: "https://ui-avatars.com/api/?name=Neha+Patel&background=f0fdf4&color=15803d" },
];

export function DoctorPatients() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = PATIENTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-6 pb-4 shadow-sm border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="h-10 w-10 shrink-0 bg-slate-50 border border-slate-100 shadow-sm rounded-full">
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </Button>
            <h1 className="text-xl font-bold text-slate-900">My Patients</h1>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search patients..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 rounded-2xl bg-slate-50 border-slate-100 shadow-sm h-12 text-sm focus-visible:ring-blue-600"
            />
          </div>
          <Button variant="outline" className="h-12 w-12 shrink-0 rounded-2xl bg-white border-slate-200 shadow-sm text-slate-700">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-24">
        {filtered.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img src={p.image} alt={p.name} className="h-14 w-14 rounded-full object-cover border border-slate-100" />
                <div>
                  <h3 className="font-bold text-slate-900 text-[15px]">{p.name}</h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{p.age} yrs • {p.gender}</p>
                </div>
              </div>
              <div className={`text-[10px] font-bold px-2 py-1 rounded-lg ${p.type === 'New' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {p.type}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <p className="text-[11px] font-semibold text-slate-500">
                Last Visit: <span className="text-slate-900">{p.lastVisit}</span>
              </p>
              <div className="flex gap-2">
                <button className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4" />
                </button>
                <Button asChild size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-slate-100 text-slate-400">
                  <Link to="/doctor/patients/$patientId" params={{ patientId: p.id }}>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
