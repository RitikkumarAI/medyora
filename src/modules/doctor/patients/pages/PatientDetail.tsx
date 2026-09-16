import { useState } from "react";
import { Link, useRouter, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  FileText,
  Activity,
  History,
  Plus,
  Phone,
  MessageSquare,
  HeartPulse,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function PatientDetail() {
  const router = useRouter();
  const { patientId } = useParams({ strict: false });

  // In a real app we'd fetch this. We'll hardcode one.
  const patient = {
    id: patientId || "p1",
    name: "Ritik Kumar",
    age: 24,
    gender: "Male",
    bloodGroup: "O+",
    height: "175 cm",
    weight: "70 kg",
    image: "https://ui-avatars.com/api/?name=Ritik+Kumar&background=eff6ff&color=3b82f6",
  };

  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-6 pb-2 shadow-sm border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.history.back()}
              className="h-10 w-10 shrink-0 bg-slate-50 border border-slate-100 shadow-sm rounded-full"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </Button>
            <h1 className="text-xl font-bold text-slate-900">Patient File</h1>
          </div>
          <div className="flex gap-2">
            <button className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </button>
            <button className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Patient Info Header */}
        <div className="flex items-center gap-4 py-2">
          <img
            src={patient.image}
            alt={patient.name}
            className="h-16 w-16 rounded-full object-cover border-2 border-slate-100"
          />
          <div>
            <h2 className="font-bold text-lg text-slate-900">{patient.name}</h2>
            <p className="text-xs font-medium text-slate-500 mt-1">
              {patient.age} yrs • {patient.gender} • {patient.bloodGroup}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-4 overflow-x-auto scrollbar-hide border-b border-slate-100">
          {[
            { id: "history", label: "History", icon: History },
            { id: "vitals", label: "Vitals", icon: Activity },
            { id: "records", label: "Records", icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 pb-3 px-2 border-b-2 font-bold text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {activeTab === "history" && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm px-2">Past Visits</h3>

            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm relative">
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-slate-100 rounded-r-lg" />

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-blue-600 -ml-5 shadow-[0_0_0_4px_white]" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    12 Aug 2026
                  </p>
                </div>
                <h4 className="font-bold text-slate-900 text-[15px]">Viral Fever & Cough</h4>
                <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                  Patient complained of high fever (102F) and dry cough for 3 days. Prescribed
                  Paracetamol and a cough syrup.
                </p>
                <div className="mt-3 flex gap-2">
                  <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-[10px] font-bold">
                    <FileText className="h-3 w-3" /> Rx_12Aug.pdf
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-slate-300 -ml-5 shadow-[0_0_0_4px_white]" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    05 Jul 2026
                  </p>
                </div>
                <h4 className="font-bold text-slate-900 text-[15px]">Routine Checkup</h4>
                <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                  BP normal (120/80). Prescribed Vitamin D supplements.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "vitals" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-slate-500">Blood Pressure</p>
                <p className="text-xl font-black text-slate-900">120/80</p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                  <Activity className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-slate-500">Sugar (Fasting)</p>
                <p className="text-xl font-black text-slate-900">
                  95 <span className="text-[10px] text-slate-400">mg/dL</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "records" && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <FileText className="h-12 w-12 text-slate-200 mb-4" />
            <p className="text-sm font-bold text-slate-900">No lab reports found</p>
          </div>
        )}
      </main>

      {/* Write Prescription Floating Button */}
      <Button
        asChild
        className="fixed bottom-6 left-1/2 -translate-x-1/2 h-14 rounded-full bg-blue-600 text-white font-bold px-6 shadow-xl shadow-blue-600/30 z-50 hover:bg-blue-700"
      >
        <Link to="/doctor/patients/$patientId/prescribe" params={{ patientId: patient.id }}>
          <Plus className="h-5 w-5 mr-2" /> Write Prescription
        </Link>
      </Button>
    </div>
  );
}
