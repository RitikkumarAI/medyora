import { useState } from "react";
import { useSearch } from "@tanstack/react-router";
import {
  Sparkles,
  Bot,
  Activity,
  ImageIcon,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Search,
  Droplets,
  Footprints,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  getDailyCopilotBriefing,
  getFamilyHealthProfiles,
  getPreventiveCarePlan,
  getHealthTimelineData,
  TOP_HOSPITALS_DATABASE,
  searchMedicalKnowledgeBase,
  type MedicalSearchResult,
} from "../services/care-ai-engine";
import { SpecialtyAIClinic } from "../components/SpecialtyAIClinic";
import { type SpecialtyCategoryId } from "../services/specialty-xai-engine";

// New Modular Reference Components
import { CareAISidebar } from "../components/CareAISidebar";
import { CareAIHero } from "../components/CareAIHero";
import { OrganSystemSelector } from "../components/OrganSystemSelector";
import { HealthOverviewCard, type HealthVitalsData } from "../components/HealthOverviewCard";
import { BodyExplorer } from "../components/BodyExplorer";
import {
  RecentReportsCard,
  type RecentReportItem,
  DEFAULT_RECENT_REPORTS,
} from "../components/RecentReportsCard";
import { CareAIChatWorkspace } from "../components/CareAIChatWorkspace";
import { OrganSystemDeepDiveModal } from "../components/OrganSystemDeepDiveModal";
import { ReportAnalysisModal } from "../components/ReportAnalysisModal";
import { AddVitalsModal } from "../components/AddVitalsModal";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";
import { toast } from "sonner";

export function CareAIPage() {
  const search = useSearch({ strict: false }) as Record<string, string | undefined>;
  const initialSpecialty = (search?.["specialty"] as SpecialtyCategoryId) || "cardiology";

  // Map initial specialty query param to organ ID
  const mapSpecialtyToOrgan = (spec: string): string => {
    const found = ORGAN_SYSTEMS.find((s) => s.specialtyId === spec);
    return found ? found.id : "heart";
  };

  const [selectedOrganId, setSelectedOrganId] = useState<string>(
    mapSpecialtyToOrgan(initialSpecialty)
  );

  const selectedOrgan =
    ORGAN_SYSTEMS.find((s) => s.id === selectedOrganId) || ORGAN_SYSTEMS[0]!;

  // Active Nav View: Default to the flagship 3-Column AI Health Command Center
  const [activeNavTab, setActiveNavTab] = useState<
    "ai_command_center" | "specialty_clinic" | "daily_copilot" | "preventive_family" | "emergency"
  >("ai_command_center");

  // Vitals State
  const [vitals, setVitals] = useState<HealthVitalsData>({
    heartRate: 72,
    bpSystolic: 120,
    bpDiastolic: 80,
    spo2: 98,
    temperature: 36.6,
    lastUpdated: "Just now",
  });

  // Recent Reports State
  const [reports, setReports] = useState<RecentReportItem[]>(DEFAULT_RECENT_REPORTS);

  // Modals state
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedReportTitle, setSelectedReportTitle] = useState<string | undefined>(undefined);
  const [isAddVitalsOpen, setIsAddVitalsOpen] = useState(false);

  // Search & Briefing states
  const briefing = getDailyCopilotBriefing("Ritik");
  const family = getFamilyHealthProfiles();
  const preventive = getPreventiveCarePlan(28, "Male");
  const timeline = getHealthTimelineData();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<MedicalSearchResult | null>(null);

  const handleMedicalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const res = searchMedicalKnowledgeBase(searchQuery);
    setSearchResult(res);
  };

  const handleHeroAction = (action: "chat" | "upload" | "symptoms" | "insights" | "voice") => {
    if (action === "upload") {
      setSelectedReportTitle(undefined);
      setIsReportModalOpen(true);
    } else if (action === "insights") {
      setIsDeepDiveOpen(true);
    } else if (action === "voice") {
      toast.info("Voice Assistant activated! Speak into the microphone in the chat box.");
    } else if (action === "symptoms") {
      setSelectedOrganId("heart");
      toast.info("Symptom triage ready. Type or tap prompts in the chat.");
    } else {
      toast.info("AI Health Companion ready. Ask anything about your health!");
    }
  };

  const handleSelectActionCard = (
    actionType: "upload" | "symptoms" | "vitals" | "recommendations"
  ) => {
    if (actionType === "upload") {
      setSelectedReportTitle(undefined);
      setIsReportModalOpen(true);
    } else if (actionType === "vitals") {
      setIsAddVitalsOpen(true);
    } else if (actionType === "recommendations") {
      setIsDeepDiveOpen(true);
    } else {
      toast.info(`Reviewing ${selectedOrgan.shortName} symptoms...`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 font-sans transition-colors">
      {/* ================= 1. SUB-HEADER BAR WITH VIEW SWITCHER ================= */}
      <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-3 sticky top-20 z-30 backdrop-blur-md shadow-xs">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>Medyora Care AI</span>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                Live 24×7 Intelligence
              </span>
            </h2>
          </div>

          {/* Quick View Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveNavTab("ai_command_center")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeNavTab === "ai_command_center"
                  ? "bg-blue-600 text-white shadow-md font-extrabold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Bot className="h-3.5 w-3.5" />
              <span>AI Companion Hub</span>
            </button>

            <button
              onClick={() => setActiveNavTab("specialty_clinic")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeNavTab === "specialty_clinic"
                  ? "bg-blue-600 text-white shadow-md font-extrabold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Stethoscope className="h-3.5 w-3.5" />
              <span>14 Specialty Clinics (XAI)</span>
            </button>

            <button
              onClick={() => setActiveNavTab("daily_copilot")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeNavTab === "daily_copilot"
                  ? "bg-blue-600 text-white shadow-md font-extrabold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>Daily Vitals</span>
            </button>

            <button
              onClick={() => setActiveNavTab("preventive_family")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeNavTab === "preventive_family"
                  ? "bg-blue-600 text-white shadow-md font-extrabold"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Family Care</span>
            </button>

            <button
              onClick={() => setActiveNavTab("emergency")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeNavTab === "emergency"
                  ? "bg-rose-600 text-white shadow-md font-extrabold"
                  : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100"
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>SOS (112)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN 3-COLUMN WORKSPACE (MATCHING REFERENCE IMAGES 1, 2, 3) ================= */}
      {activeNavTab === "ai_command_center" && (
        <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-5">
          <div className="grid grid-cols-12 gap-5 items-start">
            {/* COLUMN 1: LEFT NAVIGATION SIDEBAR (Desktop 2 cols) */}
            <div className="hidden xl:block col-span-2 sticky top-36">
              <CareAISidebar
                onSelectNav={(item) => {
                  if (item === "Emergency & Hospitals") {
                    setActiveNavTab("emergency");
                  } else if (item === "Upgrade Premium") {
                    toast.success("Medyora Premium features unlocked!");
                  }
                }}
              />
            </div>

            {/* COLUMN 2: CENTER WORKSPACE (Hero + Organ Selector + Chat Workspace) (7 cols) */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-7 space-y-4">
              {/* Care AI Hero Banner */}
              <CareAIHero onActionClick={handleHeroAction} />

              {/* Horizontal Organ System Selector Bar */}
              <div className="pt-1">
                <OrganSystemSelector
                  selectedOrganId={selectedOrganId}
                  onSelectOrgan={(id) => {
                    setSelectedOrganId(id);
                    toast.info(`Switched context to ${id.toUpperCase()} Health`);
                  }}
                />
              </div>

              {/* Central AI Consultation Workspace */}
              <CareAIChatWorkspace
                selectedOrgan={selectedOrgan}
                onOpenUpload={() => {
                  setSelectedReportTitle(undefined);
                  setIsReportModalOpen(true);
                }}
                onOpenAddVitals={() => setIsAddVitalsOpen(true)}
                onOpenDeepDive={() => setIsDeepDiveOpen(true)}
                onSelectActionCard={handleSelectActionCard}
              />
            </div>

            {/* COLUMN 3: RIGHT INFORMATION PANEL (Vitals + Body Explorer + Recent Reports) (3 cols) */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-4 sticky top-36">
              {/* Your Health Overview (2x2 Vitals Grid) */}
              <HealthOverviewCard
                vitals={vitals}
                onSyncDevices={() => setIsAddVitalsOpen(true)}
              />

              {/* Body Explorer (3D Holographic Human Anatomy) */}
              <BodyExplorer
                selectedOrganId={selectedOrganId}
                onSelectOrgan={(id) => {
                  setSelectedOrganId(id);
                  toast.info(`Highlighting ${id.toUpperCase()} on anatomical scan`);
                }}
                onOpenDeepDive={() => setIsDeepDiveOpen(true)}
              />

              {/* Recent Reports List */}
              <RecentReportsCard
                reports={reports}
                onSelectReport={(rep) => {
                  setSelectedReportTitle(rep.name);
                  setIsReportModalOpen(true);
                }}
                onUploadNew={() => {
                  setSelectedReportTitle(undefined);
                  setIsReportModalOpen(true);
                }}
                onViewAll={() => {
                  setSelectedReportTitle(undefined);
                  setIsReportModalOpen(true);
                }}
              />
            </div>
          </div>
        </main>
      )}

      {/* ================= 3. SPECIALTY CLINIC (14 SPECIALTIES GRID) ================= */}
      {activeNavTab === "specialty_clinic" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 w-full mt-6 space-y-6">
          <SpecialtyAIClinic initialSpecialtyId={initialSpecialty} />
        </main>
      )}

      {/* ================= 4. DAILY VITALS & COPILOT TAB ================= */}
      {activeNavTab === "daily_copilot" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 w-full mt-6 space-y-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {briefing.greeting}, {briefing.userName} • {briefing.todayDate}
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  AI Health Copilot Dashboard
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  <Flame className="h-4 w-4 text-emerald-600" />
                  <span>Health Score: {briefing.healthScore}/100</span>
                </div>
              </div>
            </div>

            {/* Key Metrics 4-Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60 space-y-1">
                <div className="flex items-center justify-between text-sky-600 dark:text-sky-400">
                  <Droplets className="h-4 w-4" />
                  <span className="text-[10px] font-bold">Hydration</span>
                </div>
                <p className="text-base font-black text-slate-900 dark:text-white">
                  {briefing.waterIntakeCurrent} / {briefing.waterIntakeTarget} L
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 space-y-1">
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <Footprints className="h-4 w-4" />
                  <span className="text-[10px] font-bold">Steps</span>
                </div>
                <p className="text-base font-black text-slate-900 dark:text-white">
                  {briefing.stepCountCurrent.toLocaleString()} / {briefing.stepCountTarget.toLocaleString()}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 space-y-1">
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
                  <Activity className="h-4 w-4" />
                  <span className="text-[10px] font-bold">Sleep Quality</span>
                </div>
                <p className="text-base font-black text-slate-900 dark:text-white">
                  {briefing.sleepHours} hrs
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-800/60 space-y-1">
                <div className="flex items-center justify-between text-rose-600 dark:text-rose-400">
                  <Activity className="h-4 w-4" />
                  <span className="text-[10px] font-bold">Avg Heart Rate</span>
                </div>
                <p className="text-base font-black text-slate-900 dark:text-white">
                  {vitals.heartRate} bpm
                </p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ================= 5. PREVENTIVE & FAMILY CARE TAB ================= */}
      {activeNavTab === "preventive_family" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 w-full mt-6 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Family Health Trees & Preventive Lifelines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {family.map((mem) => (
                <div
                  key={mem.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-750 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{mem.fullName}</h4>
                    <span className="text-[10px] font-bold text-slate-500">{mem.relation}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Age: {mem.age} • Blood: {mem.bloodGroup}
                  </p>
                  <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                    Active Condition: {mem.chronicConditions.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ================= 6. EMERGENCY SOS TAB ================= */}
      {activeNavTab === "emergency" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 w-full mt-6 space-y-6">
          <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 shadow-xl space-y-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-rose-900 dark:text-rose-200">
                  National Emergency SOS & Critical Hospitals
                </h3>
                <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
                  Instant dialer for ambulance, police, and nearest verified trauma centers
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <a
                  href="tel:112"
                  className="h-10 px-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4 text-white" />
                  <span>Call 112 (National SOS)</span>
                </a>
                <a
                  href="tel:108"
                  className="h-10 px-4 rounded-2xl bg-slate-900 text-white font-black text-xs shadow-md flex items-center gap-2"
                >
                  <span>108 Ambulance</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {TOP_HOSPITALS_DATABASE.slice(0, 3).map((hosp) => (
                <div
                  key={hosp.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1"
                >
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">{hosp.name}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">{hosp.mapAddress}</p>
                  <div className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
                    Emergency: {hosp.emergencyDepartmentContact || hosp.phoneNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ================= 7. INTERACTIVE MODALS ================= */}

      {/* Organ System Deep-Dive Viewer (Images 2 & 3) */}
      <OrganSystemDeepDiveModal
        isOpen={isDeepDiveOpen}
        onClose={() => setIsDeepDiveOpen(false)}
        activeSystemId={selectedOrganId}
        onSelectSystem={(id) => setSelectedOrganId(id)}
      />

      {/* Structured Medical Report Analyzer Modal */}
      <ReportAnalysisModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        initialReportTitle={selectedReportTitle}
      />

      {/* Sync Devices / Add Vitals Modal */}
      <AddVitalsModal
        isOpen={isAddVitalsOpen}
        onClose={() => setIsAddVitalsOpen(false)}
        currentVitals={vitals}
        onSaveVitals={(updated) => setVitals(updated)}
      />
    </div>
  );
}
