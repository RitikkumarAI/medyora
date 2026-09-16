import { useState } from "react";
import {
  X,
  HeartPulse,
  Activity,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";
import { Link } from "@tanstack/react-router";

interface OrganSystemDeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSystemId: string;
  onSelectSystem: (id: string) => void;
}

type TabKey =
  | "overview"
  | "conditions"
  | "symptoms"
  | "risks"
  | "tests"
  | "treatments"
  | "lifestyle";

export function OrganSystemDeepDiveModal({
  isOpen,
  onClose,
  activeSystemId,
  onSelectSystem,
}: OrganSystemDeepDiveModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  if (!isOpen) return null;

  const currentSystem =
    ORGAN_SYSTEMS.find((s) => s.id === activeSystemId) || ORGAN_SYSTEMS[0]!;

  const TABS: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "conditions", label: "Common Conditions" },
    { key: "symptoms", label: "Symptoms" },
    { key: "risks", label: "Risk Factors" },
    { key: "tests", label: "Tests & Reports" },
    { key: "treatments", label: "Treatment Options" },
    { key: "lifestyle", label: "Lifestyle Tips" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-5xl rounded-3xl bg-slate-950 text-white border border-blue-900/60 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blue-500/20 text-cyan-400 border border-blue-500/30 flex items-center justify-center">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  {currentSystem.systemName}
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  Holographic 3D Scan
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{currentSystem.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-9 w-9 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* System Switcher Carousel Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none px-6 py-2.5 bg-slate-900/40 border-b border-slate-800/50 shrink-0">
          {ORGAN_SYSTEMS.map((sys) => (
            <button
              key={sys.id}
              onClick={() => onSelectSystem(sys.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                sys.id === currentSystem.id
                  ? "bg-blue-600 text-white shadow-md font-extrabold"
                  : "bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              {sys.shortName}
            </button>
          ))}
        </div>

        {/* Modal Main Content (2 Columns: Left 3D Visual & Stats, Right Tabs & Details) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 scrollbar-thin">
          {/* Left Column: 3D Holographic Model + Quick Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* 3D Visual Box */}
            <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden bg-gradient-to-b from-[#061226] via-[#071733] to-[#040a17] border border-blue-900/50 shadow-inner p-4 flex items-center justify-center group">
              <img
                src={currentSystem.illustration}
                alt={currentSystem.name}
                className="max-h-full max-w-full object-contain transform transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_15px_30px_rgba(37,99,235,0.4)]"
              />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-cyan-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
                Active Scan Mode
              </div>

              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-[10px] font-bold backdrop-blur-md">
                {currentSystem.hindiName}
              </div>
            </div>

            {/* Quick Stats Block */}
            <div className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Live Quick Stats
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {currentSystem.quickStats.map((st, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center"
                  >
                    <span className="text-[10px] text-slate-400 font-bold block truncate">
                      {st.label}
                    </span>
                    <p className="text-sm font-black text-cyan-300 mt-0.5">
                      {st.value} {st.unit && <span className="text-[10px] text-slate-400">{st.unit}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Consult Specialist Action Card */}
            <div className="p-4 rounded-3xl bg-blue-950/40 border border-blue-800/50 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-black text-cyan-400">Verified Doctors</span>
                <h5 className="text-xs font-black text-white">
                  Consult {currentSystem.doctorSpecialistName}
                </h5>
              </div>

              <Link
                to="/doctors"
                search={{ q: currentSystem.doctorSpecialistName }}
                onClick={onClose}
              >
                <Button size="sm" className="h-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md">
                  <span>Book Now</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Tab Navigation & Rich Content (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tabs List */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? "bg-blue-600 text-white shadow-md font-extrabold"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 min-h-[300px]">
              {activeTab === "overview" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-cyan-300">Anatomical Overview</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {currentSystem.overview}
                  </p>
                  <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200 space-y-1">
                    <span className="font-black text-cyan-300">Clinical Focus:</span>
                    <p className="text-slate-300 text-xs">
                      Preventive monitoring through regular biomarkers and early detection protects
                      against irreversible systemic degeneration.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "conditions" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-cyan-300">Common Clinical Conditions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentSystem.commonConditions.map((cond, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 font-medium"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{cond}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "symptoms" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-rose-300">Recognized Warning Symptoms</h3>
                  <div className="space-y-2">
                    {currentSystem.symptoms.map((sym, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-950/20 border border-rose-900/30 text-xs text-rose-200 font-medium"
                      >
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{sym}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "risks" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-amber-300">Key Risk Factors</h3>
                  <div className="space-y-2">
                    {currentSystem.riskFactors.map((rf, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200 font-medium"
                      >
                        <span className="text-amber-400">⚠️</span>
                        <span>{rf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "tests" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-cyan-300">Recommended Diagnostic Tests</h3>
                  <div className="space-y-2">
                    {currentSystem.testsAndReports.map((test, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 font-medium"
                      >
                        <Activity className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{test}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "treatments" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-emerald-300">Standard Medical Treatments</h3>
                  <div className="space-y-2">
                    {currentSystem.treatmentOptions.map((tx, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-xs text-emerald-200 font-medium"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{tx}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "lifestyle" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-cyan-300">Lifestyle & Preventive Protocols</h3>
                  <div className="space-y-2">
                    {currentSystem.lifestyleTips.map((tip, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 font-medium"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
