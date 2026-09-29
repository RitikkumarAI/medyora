import { useState } from "react";
import {
  X,
  FileText,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  UploadCloud,
  Pill,
  RefreshCw,
  Search,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PrescriptionDDIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExtractedMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  indication: string;
}

interface DrugConflict {
  drugA: string;
  drugB: string;
  severity: "MAJOR" | "MODERATE" | "MINOR";
  clinicalRisk: string;
  biochemicalMechanism: string;
  recommendation: string;
}

interface PrescriptionAuditCase {
  doctorName: string;
  hospital: string;
  date: string;
  medicines: ExtractedMedicine[];
  conflicts: DrugConflict[];
  overallRiskLevel: "CRITICAL" | "SAFE" | "MODERATE";
}

const DEMO_CASES: Record<string, PrescriptionAuditCase> = {
  cardiac_danger: {
    doctorName: "Dr. R. K. Singhal, MD (Cardiology)",
    hospital: "Apollo Heart Institute",
    date: "28 Sept 2026",
    overallRiskLevel: "CRITICAL",
    medicines: [
      { name: "Warfarin Sodium", dosage: "5 mg", frequency: "1-0-0", duration: "30 Days", indication: "Anticoagulant (Atrial Fibrillation)" },
      { name: "Aspirin (Disprin EC)", dosage: "75 mg", frequency: "0-1-0", duration: "30 Days", indication: "Antiplatelet" },
      { name: "Atorvastatin", dosage: "40 mg", frequency: "0-0-1", duration: "30 Days", indication: "Lipid Lowering" },
      { name: "Clarithromycin", dosage: "500 mg", frequency: "1-0-1", duration: "7 Days", indication: "Upper Respiratory Infection" },
    ],
    conflicts: [
      {
        drugA: "Warfarin",
        drugB: "Aspirin",
        severity: "MAJOR",
        clinicalRisk: "Severe Gastrointestinal Hemorrhage & Intracranial Bleed Risk (4.2x increase)",
        biochemicalMechanism: "Simultaneous inhibition of platelet aggregation (Aspirin) alongside Vitamin-K epoxide reductase blockade (Warfarin) exponentially impairs hemostasis.",
        recommendation: "Hold Aspirin unless specifically indicated for prosthetic mechanical valve. Consult cardiologist for single-agent DOAC (Apixaban).",
      },
      {
        drugA: "Atorvastatin",
        drugB: "Clarithromycin",
        severity: "MAJOR",
        clinicalRisk: "Acute Rhabdomyolysis & Renal Tubule Breakdown",
        biochemicalMechanism: "Clarithromycin is a potent CYP3A4 cytochrome inhibitor, increasing systemic Atorvastatin exposure by up to 350%, precipitating severe muscle necrosis.",
        recommendation: "Temporarily pause Atorvastatin during the 7-day macrolide antibiotic course or substitute antibiotic with Azithromycin.",
      },
    ],
  },
  safe_case: {
    doctorName: "Dr. Ananya Sen, MD (Internal Medicine)",
    hospital: "Fortis Hospital Bannerghatta",
    date: "26 Sept 2026",
    overallRiskLevel: "SAFE",
    medicines: [
      { name: "Augmentin (Amoxicillin/Clavulanate)", dosage: "625 mg", frequency: "1-0-1", duration: "5 Days", indication: "Bacterial Sinusitis" },
      { name: "Paracetamol", dosage: "650 mg", frequency: "SOS (Max 3/day)", duration: "3 Days", indication: "Pyrexia / Body Ache" },
      { name: "Pantoprazole", dosage: "40 mg", frequency: "1-0-0 (Empty Stomach)", duration: "5 Days", indication: "Proton Pump Inhibitor (Gastric Protection)" },
    ],
    conflicts: [],
  },
};

export function PrescriptionDDIModal({ isOpen, onClose }: PrescriptionDDIModalProps) {
  const [selectedCaseKey, setSelectedCaseKey] = useState<string>("cardiac_danger");
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const currentCase = DEMO_CASES[selectedCaseKey]!;

  const handleRunOCR = (key: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedCaseKey(key);
      setIsScanning(false);
      if (DEMO_CASES[key]!.conflicts.length > 0) {
        toast.error("FATAL DRUG-DRUG INTERACTION DETECTED IN PRESCRIPTION!");
      } else {
        toast.success("Prescription Audit Passed: 0 Adverse Drug Interactions.");
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100 flex flex-col font-sans">
        {/* HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Prescription Vision OCR &amp; Fatal Drug-Drug Interaction Shield
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  DDI Prevention
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Prevent medical errors caused by illegible handwriting and lethal drug contraindications.
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
          {/* UPLOAD / DEMO CONTROLS */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-slate-300">
                  Upload Handwritten / Printed Doctor Prescription:
                </span>
                <p className="text-[11px] text-slate-400">
                  AI reads messy handwriting, maps Rx abbreviations (b.i.d., p.o., s.o.s.), and audits contraindications.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleRunOCR("cardiac_danger")}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                >
                  {isScanning ? <RefreshCw className="w-3 h-3 animate-spin mr-1" /> : <FileText className="w-3 h-3 mr-1" />}
                  Test Lethal DDI Case (Warfarin + Aspirin)
                </Button>

                <Button
                  onClick={() => handleRunOCR("safe_case")}
                  size="sm"
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs"
                >
                  Test Clean Case (Augmentin)
                </Button>
              </div>
            </div>
          </div>

          {/* PRESCRIPTION AUDIT REPORT */}
          <div className="space-y-6">
            {/* OVERALL STATUS BANNER */}
            <div
              className={`p-5 rounded-2xl border-2 shadow-xl ${
                currentCase.overallRiskLevel === "CRITICAL"
                  ? "bg-red-950/60 border-red-500 text-red-100 ring-2 ring-red-500/30"
                  : "bg-emerald-950/40 border-emerald-500 text-emerald-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      currentCase.overallRiskLevel === "CRITICAL" ? "bg-red-600 text-white" : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {currentCase.overallRiskLevel === "CRITICAL" ? (
                      <AlertTriangle className="w-7 h-7 animate-bounce" />
                    ) : (
                      <CheckCircle2 className="w-7 h-7" />
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest">
                      {currentCase.overallRiskLevel === "CRITICAL"
                        ? "CRITICAL PHARMACOLOGICAL CONTRAINDICATION DETECTED ⚠️"
                        : "PRESCRIPTION CLINICALLY SAFE & COMPLIANT ✓"}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {currentCase.doctorName} &bull; {currentCase.hospital}
                    </h3>
                    <p className="text-xs opacity-90">Prescription Date: {currentCase.date}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Adverse Interactions</span>
                  <span
                    className={`text-2xl font-black ${
                      currentCase.conflicts.length > 0 ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {currentCase.conflicts.length} Found
                  </span>
                </div>
              </div>
            </div>

            {/* EXTRACTED MEDICINES CARDS */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-cyan-400" /> Vision AI Extracted Medications ({currentCase.medicines.length}):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {currentCase.medicines.map((m, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-sm">{m.name}</strong>
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-mono text-[10px]">
                        {m.dosage}
                      </span>
                    </div>
                    <div className="text-slate-400 flex items-center justify-between text-[11px]">
                      <span>Freq: <strong className="text-slate-200">{m.frequency}</strong></span>
                      <span>Duration: <strong className="text-slate-200">{m.duration}</strong></span>
                    </div>
                    <p className="text-[11px] text-cyan-400 pt-0.5">{m.indication}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CONFLICTS BREAKDOWN */}
            {currentCase.conflicts.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" /> High-Risk Drug Interactions To Intercept:
                </h4>

                <div className="space-y-3">
                  {currentCase.conflicts.map((c, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 text-xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-red-300 text-sm">
                          <span>{c.drugA}</span>
                          <span className="text-red-500 font-black">&harr;</span>
                          <span>{c.drugB}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase">
                          {c.severity} RISK
                        </span>
                      </div>

                      <div className="text-slate-200 font-medium leading-relaxed">
                        <strong className="text-red-400">Clinical Hazard:</strong> {c.clinicalRisk}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/70 border border-red-900/40 text-slate-300 text-[11px] leading-relaxed">
                        <strong className="text-cyan-400">Pharmacological Mechanism:</strong> {c.biochemicalMechanism}
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">AI Clinical Recommendation:</strong> {c.recommendation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Powered by Medyora Clinical Pharmacology Knowledge Graph &amp; OCR Engine</span>
          <Button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs">
            Close Audit
          </Button>
        </div>
      </div>
    </div>
  );
}
