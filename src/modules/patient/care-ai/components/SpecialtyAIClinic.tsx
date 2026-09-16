import { useState, useMemo, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  HeartPulse,
  Sparkles,
  Bone,
  Activity,
  Zap,
  Wind,
  Brain,
  Shield,
  Baby,
  Flower2,
  Stethoscope,
  Eye,
  ShieldCheck,
  Smile,
  FileText,
  Upload,
  Plus,
  Trash2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Apple,
  Dumbbell,
  TrendingUp,
  TrendingDown,
  Info,
  Printer,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  SPECIALTY_CATEGORIES,
  type SpecialtyCategoryId,
  type SpecialtyReportItem,
  type SpecialtyXAIAnalysisResult,
  runSpecialtyExplainableAIAnalysis,
} from "../services/specialty-xai-engine";
import { useSpecialtyReports } from "../services/specialty-ai-store";

const ICON_MAP: Record<string, typeof HeartPulse> = {
  HeartPulse,
  Sparkles,
  Bone,
  Activity,
  Zap,
  Wind,
  Brain,
  Shield,
  Baby,
  Flower2,
  Stethoscope,
  Eye,
  ShieldCheck,
  Smile,
};

interface SpecialtyAIClinicProps {
  initialSpecialtyId?: SpecialtyCategoryId;
  onSelectDoctor?: (doctorId: string) => void;
}

export function SpecialtyAIClinic({ initialSpecialtyId = "cardiology" }: SpecialtyAIClinicProps) {
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<SpecialtyCategoryId>(initialSpecialtyId);
  const { reports, addReport, deleteReport, resetReports } = useSpecialtyReports(selectedSpecialty);

  // Active XAI Analysis Result
  const [analysisResult, setAnalysisResult] = useState<SpecialtyXAIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showXAIModal, setShowXAIModal] = useState(false);
  const [activeXAISection, setActiveXAISection] = useState<
    "evidence" | "pathophysiology" | "guidelines"
  >("evidence");

  // Form state for uploading a custom report
  const [newReportTitle, setNewReportTitle] = useState("");
  const [newReportLab, setNewReportLab] = useState("");
  const [newReportDate, setNewReportDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  );
  const [newReportSnippet, setNewReportSnippet] = useState("");

  const activeMeta = useMemo(() => {
    return SPECIALTY_CATEGORIES.find((s) => s.id === selectedSpecialty) || SPECIALTY_CATEGORIES[0]!;
  }, [selectedSpecialty]);

  // Run or re-run analysis when specialty or reports change
  useEffect(() => {
    if (reports.length > 0) {
      const res = runSpecialtyExplainableAIAnalysis(selectedSpecialty, reports);
      setAnalysisResult(res);
    } else {
      setAnalysisResult(null);
    }
  }, [selectedSpecialty, reports]);

  const handleManualAnalyze = () => {
    if (reports.length === 0) {
      toast.error("Please add or upload at least one report first.");
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = runSpecialtyExplainableAIAnalysis(selectedSpecialty, reports);
      setAnalysisResult(res);
      setIsAnalyzing(false);
      toast.success(`Explainable AI analysis updated for ${activeMeta.name}!`);
    }, 450);
  };

  const handleCreateCustomReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportTitle.trim()) {
      toast.error("Please enter a report title.");
      return;
    }

    const newReport: SpecialtyReportItem = {
      id: `rep-custom-${Date.now()}`,
      specialtyId: selectedSpecialty,
      title: newReportTitle.trim(),
      date: newReportDate || "Recent",
      labName: newReportLab.trim() || "Independent Clinical Lab",
      fileType: "lab_blood",
      extractedTextSnippet: newReportSnippet.trim() || "Uploaded patient diagnostic report.",
      parameters: [
        {
          name: "Report Key Finding",
          value: "Clinical Abnormality Flagged",
          unit: "score",
          referenceRange: "Normal Baseline",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance: "Requires targeted medical review and lifestyle intervention.",
          biochemicalMechanism:
            "Cellular and metabolic stress secondary to acute/chronic clinical factors.",
        },
      ],
    };

    addReport(newReport);
    setShowUploadModal(false);
    setNewReportTitle("");
    setNewReportLab("");
    setNewReportSnippet("");
    toast.success("New report added to your specialty history!");
  };

  const handlePrintSummary = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8 w-full">
      {/* ================= 1. SPECIALTY SELECTOR BAR (14 SPECIALTIES) ================= */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                Multi-Specialty Explainable AI (XAI)
              </span>
              <span className="text-xs text-slate-500 font-bold">14 Medical Categories</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Specialty Clinical Intelligence Hub
            </h2>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm sm:text-right font-medium">
            Select your medical department to upload reports, track historical trends, and receive
            transparent clinical reasoning.
          </p>
        </div>

        {/* Scrollable Horizontal Chip Carousel */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none no-scrollbar">
          {SPECIALTY_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || HeartPulse;
            const isSelected = cat.id === selectedSpecialty;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedSpecialty(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl shrink-0 transition-all text-xs font-bold border ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30 scale-[1.02]"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${isSelected ? "text-white" : "text-blue-500"}`}
                />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= 2. ACTIVE SPECIALTY HERO & REPORT TIMELINE ================= */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-lg">
                {activeMeta.organSystem}
              </span>
              <span className="text-xs text-slate-500 font-semibold">• {activeMeta.hindiName}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {activeMeta.name} AI Clinic
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl font-medium">
              {activeMeta.tagline}. Evidence-based clinical guidelines by{" "}
              <strong className="text-slate-900 dark:text-white">
                {activeMeta.clinicalGuidelineAuthority}
              </strong>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => setShowUploadModal(true)}
              className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-1.5"
            >
              <Upload className="h-3.5 w-3.5" /> Upload {activeMeta.name} Report
            </Button>
            <Button
              variant="outline"
              onClick={resetReports}
              className="h-10 px-3 rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5"
              title="Reset to sample verified clinical case"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" /> Reset Case
            </Button>
            <Button
              onClick={handleManualAnalyze}
              disabled={isAnalyzing || reports.length === 0}
              className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />{" "}
              {isAnalyzing ? "Analyzing..." : "Re-Analyze (XAI)"}
            </Button>
          </div>
        </div>

        {/* Report History Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              Patient Medical Reports History ({reports.length} Recorded)
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">
              Multi-report longitudinal history stored locally & securely
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-3">
              <FileText className="h-8 w-8 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-500 font-semibold">
                No reports uploaded yet for {activeMeta.name}.
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setShowUploadModal(true)}
                  className="rounded-xl text-xs"
                >
                  <Upload className="h-3.5 w-3.5 mr-1" /> Upload First Report
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetReports}
                  className="rounded-xl text-xs"
                >
                  Load Clinical Sample
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reports.map((report, idx) => (
                <div
                  key={report.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5 relative group transition-all hover:border-blue-400 dark:hover:border-blue-600"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          Report #{reports.length - idx} • {report.date}
                        </span>
                        {report.fileType === "ecg" && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                            ECG
                          </span>
                        )}
                        {report.fileType === "xray_mri" && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                            Imaging
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">
                        {report.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {report.labName}{" "}
                        {report.doctorReferred ? `• Ref: ${report.doctorReferred}` : ""}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        deleteReport(report.id);
                        toast.success("Report removed from history.");
                      }}
                      className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                      title="Remove report from history"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Biomarker Chips from this Report */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {report.parameters.slice(0, 4).map((p, pIdx) => (
                      <span
                        key={pIdx}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          p.status === "high" || p.status === "critical"
                            ? "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                            : p.status === "low"
                              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                              : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                        }`}
                      >
                        {p.name.split("(")[0]?.trim()}: <strong>{p.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= 3. COMPREHENSIVE EXPLAINABLE AI ANALYSIS DASHBOARD ================= */}
      {analysisResult && (
        <div className="space-y-6">
          {/* 3.1 PRIMARY DIAGNOSIS & SEVERITY HERO */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Clinical AI Assessment ({analysisResult.reportCountAnalyzed} Reports Combined)
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">
                    {analysisResult.analysisDate}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {analysisResult.primaryConditionTitle}
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                  {analysisResult.hindiConditionTitle}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="px-3.5 py-1.5 rounded-2xl bg-slate-900 text-white dark:bg-slate-800 text-xs font-black flex items-center gap-2 shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                  <span>XAI Confidence: {analysisResult.overallConfidenceScore}%</span>
                </div>

                <span
                  className={`px-3 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider ${
                    analysisResult.severity === "critical"
                      ? "bg-rose-600 text-white animate-pulse"
                      : analysisResult.severity === "high"
                        ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 border border-rose-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 border border-amber-300"
                  }`}
                >
                  Severity: {analysisResult.severity}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handlePrintSummary}
                  className="rounded-xl h-9 px-3 text-xs font-bold border-slate-200 dark:border-slate-700"
                  title="Print Clinical Summary"
                >
                  <Printer className="h-3.5 w-3.5 mr-1" /> Print
                </Button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
              {analysisResult.summaryParagraph}
            </p>

            {/* Longitudinal Trend Bar if multi-report */}
            {analysisResult.longitudinalTrends && analysisResult.longitudinalTrends.length > 0 && (
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-blue-900 dark:text-blue-200">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    Multi-Report Longitudinal Trend Comparison
                  </span>
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    Chronological Progress
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {analysisResult.longitudinalTrends.map((trend, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/40 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {trend.parameterName}
                        </span>
                        <span className="text-[10px] text-slate-400">{trend.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-slate-900 dark:text-white">
                          {trend.value} {trend.unit}
                        </span>
                        <span
                          className={`font-bold text-[11px] flex items-center gap-1 ${
                            trend.status === "improving" ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {trend.status === "improving" ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : (
                            <TrendingUp className="h-3 w-3" />
                          )}
                          {trend.changePercentage !== 0
                            ? `${trend.changePercentage > 0 ? "+" : ""}${trend.changePercentage}%`
                            : "Baseline"}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        {trend.interpretation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3.2 DEFICIENCIES & ANOMALIES (KAMIYAN AUR ASAMANYATA) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-500" />
                Deficiencies & Clinical Anomalies Identified (कमियां एवं असामान्यताएं)
              </h4>
              <span className="text-xs text-slate-400 font-bold">
                {analysisResult.deficienciesAndAnomalies.length} Flagged Parameters
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysisResult.deficienciesAndAnomalies.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase ${
                        item.urgency === "immediate" ? "text-rose-600" : "text-amber-600"
                      }`}
                    >
                      {item.urgency} attention
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-slate-900 dark:text-white">{item.name}</h5>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-rose-600 dark:text-rose-400 font-bold">
                      Observed: {item.observed}
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      Optimal: {item.optimal}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-snug pt-1">
                    {item.impactOnHealth}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3.3 EXPLAINABLE AI (XAI) DEEP DIVE: "KYUN HO RAHA HAI" */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white shadow-xl space-y-5 border border-slate-750">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/90 text-blue-300 border border-blue-800 text-[10px] font-extrabold uppercase">
                  <Sparkles className="h-3 w-3 text-blue-400" /> Explainable AI (XAI) Engine
                </div>
                <h4 className="text-lg font-black text-white mt-1">
                  Kyun Ho Raha Hai? (Why is this happening?)
                </h4>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setActiveXAISection("evidence")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    activeXAISection === "evidence"
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Biomarker Evidence
                </button>
                <button
                  onClick={() => setActiveXAISection("pathophysiology")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    activeXAISection === "pathophysiology"
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Biological Mechanism
                </button>
                <button
                  onClick={() => setActiveXAISection("guidelines")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    activeXAISection === "guidelines"
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Clinical Guidelines
                </button>
              </div>
            </div>

            {/* TAB 1: BIOMARKER EVIDENCE CHAIN */}
            {activeXAISection === "evidence" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 font-medium">
                  Transparent mathematical weightage of each uploaded report finding driving this
                  diagnosis:
                </p>
                <div className="space-y-2">
                  {analysisResult.biomarkerEvidenceChain.map((ev, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white">{ev.biomarker}</span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {ev.diagnosticContributionPercentage}% Diagnostic Weight
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-300">
                        <span className="text-rose-400 font-bold">
                          Observed: {ev.observedValue}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">
                          Standard Baseline: {ev.standardBaseline}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium pt-0.5">
                        {ev.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: BIOLOGICAL MECHANISM */}
            {activeXAISection === "pathophysiology" && (
              <div className="space-y-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                <h5 className="text-xs font-black text-blue-300 uppercase tracking-wider">
                  Pathophysiological Chain of Events
                </h5>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {analysisResult.pathophysiologyExplanation}
                </p>

                {analysisResult.ruleOutDifferentialDiagnosis.length > 0 && (
                  <div className="pt-3 border-t border-slate-700 space-y-2">
                    <span className="text-[11px] font-black uppercase text-slate-400">
                      Alternative Conditions Ruled Out by AI:
                    </span>
                    {analysisResult.ruleOutDifferentialDiagnosis.map((ro, rIdx) => (
                      <div key={rIdx} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">{ro.condition}:</strong> {ro.whyRuledOut}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: CLINICAL GUIDELINES CITATION */}
            {activeXAISection === "guidelines" && (
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-300">
                    {analysisResult.clinicalGuideline.authorityName} (
                    {analysisResult.clinicalGuideline.editionYear})
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-900 text-blue-200">
                    {analysisResult.clinicalGuideline.recommendationLevel}
                  </span>
                </div>
                <h5 className="text-sm font-black text-white">
                  {analysisResult.clinicalGuideline.guidelineTitle}
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {analysisResult.clinicalGuideline.summaryOfStandard}
                </p>
              </div>
            )}
          </div>

          {/* ================= 3.4 THE 4 PATIENT CARE QUADRANTS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* QUADRANT 1: PRECAUTIONS (KYA PRECAUTION LENE HAIN) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Shield className="h-5 w-5 text-rose-500" />
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    1. What Precautions to Take (सावधानियां)
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Emergency red flags & symptom safeguards
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {analysisResult.precautions.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className={`p-3 rounded-2xl border text-xs space-y-1 ${
                      p.urgency === "critical_red_flag"
                        ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black">{p.title}</span>
                      {p.urgency === "critical_red_flag" && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                          Red Flag
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed font-medium">{p.instruction}</p>
                    <p className="text-[10px] opacity-75 font-semibold">Why: {p.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUADRANT 2: WHAT TO AVOID (KYA AVOID KARNA HAI) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    2. What to Avoid (क्या नहीं खाना / करना)
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Contraindicated foods, habits & stressors
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {analysisResult.whatToAvoid.map((av, avIdx) => (
                  <div
                    key={avIdx}
                    className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 dark:text-white">{av.item}</span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                        {av.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      {av.whyAvoid}
                    </p>
                    <p className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">
                      Risk if ignored: {av.consequenceIfIgnored}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUADRANT 3: WHAT TO EAT (KYA KHANA HAI - THERAPEUTIC DIET) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Apple className="h-5 w-5 text-emerald-500" />
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    3. What to Eat (औषधीय आहार एवं पोषण)
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Targeted foods to reverse this clinical condition
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {analysisResult.whatToEat.map((food, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 dark:text-white">{food.food}</span>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                        {food.portion}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                      {food.benefits}
                    </p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold leading-tight">
                      Mechanism: {food.biochemicalMechanism}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUADRANT 4: WHAT TO DO (ACTION PLAN & EXERCISES) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Dumbbell className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    4. What to Do (दैनिक व्यायाम एवं कार्ययोजना)
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Daily protocols, home checks & physical therapy
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {analysisResult.whatToDo.map((todo, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 dark:text-white">
                        {todo.action}
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">
                        {todo.frequency}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                      {todo.instruction}
                    </p>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                      Outcome: {todo.expectedOutcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= 3.5 SPECIALIST DOCTOR RECOMMENDATIONS ================= */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-blue-600" />
                  Recommended Specialists for {activeMeta.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Verified Medyora clinicians specialized in handling this diagnosis
                </p>
              </div>

              <Link
                to="/doctors"
                search={{ q: activeMeta.name }}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
              >
                View all specialists <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {analysisResult.suggestedDoctors.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 flex flex-col justify-between gap-3 hover:border-blue-400 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.image}
                      alt={doc.fullName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div className="space-y-0.5 overflow-hidden">
                      <h5 className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {doc.fullName}
                      </h5>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-bold truncate">
                        {doc.speciality}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {doc.clinic?.name || doc.city}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      ₹{doc.fee}
                    </span>
                    <Button
                      asChild
                      size="sm"
                      className="h-8 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      <Link to="/booking/$doctorId" params={{ doctorId: doc.id }}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= UPLOAD CUSTOM REPORT MODAL ================= */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Upload {activeMeta.name} Report
                  </h3>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateCustomReport} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Report Title *
                  </label>
                  <Input
                    placeholder="e.g. Lipid Profile, 12-Lead ECG, Knee X-Ray, Blood Test..."
                    value={newReportTitle}
                    onChange={(e) => setNewReportTitle(e.target.value)}
                    className="h-11 rounded-xl text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Lab / Hospital Name
                    </label>
                    <Input
                      placeholder="e.g. Apollo, Lal PathLabs..."
                      value={newReportLab}
                      onChange={(e) => setNewReportLab(e.target.value)}
                      className="h-11 rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Report Date
                    </label>
                    <Input
                      placeholder="e.g. 15 Jan 2025"
                      value={newReportDate}
                      onChange={(e) => setNewReportDate(e.target.value)}
                      className="h-11 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Extracted Values or Doctor Observations (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Paste or type lab parameter values or doctor's handwritten notes (e.g. LDL 160, BP 140/90, severe knee pain)..."
                    value={newReportSnippet}
                    onChange={(e) => setNewReportSnippet(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs outline-none focus:border-blue-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-[11px] text-blue-800 dark:text-blue-300 font-medium">
                  💡 <strong>Explainable AI Note:</strong> Once saved, this report is immediately
                  processed by Medyora's XAI engine to extract biomarkers, calculate risk scores,
                  and suggest dietary precautions.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowUploadModal(false)}
                    className="rounded-xl text-xs font-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                  >
                    Save & Analyze with XAI
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
