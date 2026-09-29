import { useState } from "react";
import {
  X,
  Camera,
  Activity,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  RefreshCw,
  Eye,
  ShieldCheck,
  Stethoscope,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SurgicalWoundVisionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WoundAssessment {
  patientProcedure: string;
  postOpDay: number;
  grade: "Grade 0: Normal Healing" | "Grade I: Mild Erythema" | "Grade IV: Active Bacterial SSI";
  healingScorePercent: number;
  erythemaWidthMm: number;
  purulenceExudate: "None" | "Serous Clear" | "Purulent Yellow Pus";
  dehiscenceStatus: "Closed & Intact" | "Partial Edge Separation (<2mm)" | "Open Dehiscence";
  sepsisWarning: boolean;
  surgeonAdvisory: string;
}

const WOUND_CASES: Record<string, WoundAssessment> = {
  clean_healing: {
    patientProcedure: "Laparoscopic Cholecystectomy (Gallbladder Removal)",
    postOpDay: 6,
    grade: "Grade 0: Normal Healing",
    healingScorePercent: 96,
    erythemaWidthMm: 1.2,
    purulenceExudate: "None",
    dehiscenceStatus: "Closed & Intact",
    sepsisWarning: false,
    surgeonAdvisory: "Incision is healing cleanly with active collagen synthesis. Sutures/steri-strips intact. Keep dressing clean and dry.",
  },
  severe_infection: {
    patientProcedure: "Emergency Open Appendectomy",
    postOpDay: 8,
    grade: "Grade IV: Active Bacterial SSI",
    healingScorePercent: 32,
    erythemaWidthMm: 24.5,
    purulenceExudate: "Purulent Yellow Pus",
    dehiscenceStatus: "Partial Edge Separation (<2mm)",
    sepsisWarning: true,
    surgeonAdvisory: "URGENT CLINICAL HAZARD: Surgical site infection with active suppuration and 24mm erythema spreading into subcutaneous tissue. Immediate bacterial wound swab and IV antibiotic therapy required. Contact operating surgeon.",
  },
};

export function SurgicalWoundVisionModal({ isOpen, onClose }: SurgicalWoundVisionModalProps) {
  const [selectedCase, setSelectedCase] = useState<"clean_healing" | "severe_infection">("severe_infection");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const current = WOUND_CASES[selectedCase]!;

  const handleRunAnalysis = (c: "clean_healing" | "severe_infection") => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setSelectedCase(c);
      setIsAnalyzing(false);
      if (c === "severe_infection") {
        toast.error("SURGICAL INFECTION DETECTED: Yellow pus & severe erythema!");
      } else {
        toast.success("Wound Assessment: Normal healthy surgical healing.");
      }
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100 flex flex-col font-sans">
        {/* HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Post-Op Surgical Wound Vision AI
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  SSI Prevention
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Southampton Wound Assessment for early detection of surgical site infections and sepsis.
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg h-9 w-9"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* UPLOAD & PRESET TOGGLES */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-slate-300">
                Upload Smartphone Photo of Surgical Stitches / Wound:
              </span>
              <p className="text-[11px] text-slate-400">
                AI segments margins to detect erythema, edema, purulent exudate, and stitch dehiscence.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleRunAnalysis("severe_infection")}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                {isAnalyzing ? <RefreshCw className="w-3 h-3 animate-spin mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                Test Infected Wound (Pus / Day 8)
              </Button>

              <Button
                onClick={() => handleRunAnalysis("clean_healing")}
                size="sm"
                variant="outline"
                className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs"
              >
                Test Healthy Healing (Day 6)
              </Button>
            </div>
          </div>

          {/* ASSESSMENT RESULTS HUD */}
          <div className="space-y-4">
            {/* OVERALL BANNER */}
            <div
              className={`p-5 rounded-2xl border-2 shadow-xl ${
                current.sepsisWarning
                  ? "bg-red-950/60 border-red-500 text-red-100 ring-2 ring-red-500/40 animate-pulse"
                  : "bg-emerald-950/40 border-emerald-500 text-emerald-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      current.sepsisWarning ? "bg-red-600 text-white" : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {current.sepsisWarning ? <AlertOctagon className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
                  </div>

                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      {current.grade}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {current.patientProcedure} &bull; Post-Op Day {current.postOpDay}
                    </h3>
                    <p className="text-xs opacity-90">
                      {current.sepsisWarning
                        ? "CRITICAL: High risk of deep tissue surgical infection"
                        : "Normal surgical tissue repair progression"}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Healing Score</span>
                  <span
                    className={`text-3xl font-black ${
                      current.healingScorePercent > 80 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {current.healingScorePercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* CLINICAL METRICS MATRIX */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Erythema Spread</span>
                <span
                  className={`text-sm font-bold mt-1 block ${
                    current.erythemaWidthMm > 10 ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {current.erythemaWidthMm} mm
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Purulent Exudate</span>
                <span
                  className={`text-xs font-bold mt-1 block ${
                    current.purulenceExudate.includes("Pus") ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {current.purulenceExudate}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Wound Margins</span>
                <span
                  className={`text-xs font-bold mt-1 block ${
                    current.dehiscenceStatus.includes("Separation") ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  {current.dehiscenceStatus}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Sepsis Alert</span>
                <span
                  className={`text-xs font-bold mt-1 block ${
                    current.sepsisWarning ? "text-red-400 animate-pulse font-black" : "text-emerald-400"
                  }`}
                >
                  {current.sepsisWarning ? "TRIGGERED ⚠️" : "Safe"}
                </span>
              </div>
            </div>

            {/* SURGEON ADVISORY */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5">
              <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4" /> Operating Surgeon Clinical Directive:
              </span>
              <p className="text-slate-300 leading-relaxed">{current.surgeonAdvisory}</p>

              {current.sepsisWarning && (
                <div className="pt-2 flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => toast.success("Connecting with Dr. Singhal's emergency surgical team...")}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1" /> Call On-Duty Surgical Registrar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Standardized with Southampton Wound Assessment &amp; CDC SSI Surveillance Criteria</span>
          <Button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs">
            Close Scanner
          </Button>
        </div>
      </div>
    </div>
  );
}
