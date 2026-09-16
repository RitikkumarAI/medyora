import { useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import {
  Sparkles,
  Bot,
  Activity,
  ImageIcon,
  FileText,
  Pill,
  Flame,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  MapPin,
  HeartPulse,
  Search,
  Apple,
  Dumbbell,
  Calendar,
  Users,
  Shield,
  Phone,
  ChevronRight,
  Compass,
  Layers,
  Heart,
  Droplets,
  Footprints,
  Moon,
  Stethoscope,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
import { ClinicalAIChatbot } from "../components/ClinicalAIChatbot";
import { type SpecialtyCategoryId } from "../services/specialty-xai-engine";

export function CareAIPage() {
  const search = useSearch({ strict: false }) as Record<string, string | undefined>;
  const initialSpecialty = (search?.["specialty"] as SpecialtyCategoryId) || "cardiology";

  const [activeNavTab, setActiveNavTab] = useState<
    "chatbot" | "specialty_xai" | "daily_copilot" | "preventive_family" | "emergency"
  >("chatbot");

  const briefing = getDailyCopilotBriefing("Ritik");
  const family = getFamilyHealthProfiles();
  const preventive = getPreventiveCarePlan(28, "Male");
  const timeline = getHealthTimelineData();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<MedicalSearchResult | null>(null);

  const launchAICopilotWithMode = (mode: string, query?: string) => {
    window.dispatchEvent(
      new CustomEvent("open-care-ai", {
        detail: { mode, query },
      }),
    );
  };

  const handleMedicalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const res = searchMedicalKnowledgeBase(searchQuery);
    setSearchResult(res);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 font-sans transition-colors">
      {/* ================= 1. HERO BANNER WITH QUICK LAUNCH CHIPS ================= */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-b border-slate-800/80">
        <div className="absolute top-0 right-1/4 w-[450px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-6 relative z-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-850/90 border border-slate-750 text-blue-300 text-xs font-extrabold backdrop-blur-md shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
              Medyora Care AI — Multi-Specialty Explainable AI (XAI) Intelligence
            </div>

            <span className="text-xs font-bold text-slate-300 bg-slate-800/80 px-3.5 py-1 rounded-full border border-slate-700">
              ⚡ 14 Specialty Clinics & 20+ Integrated AI Modules
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Explainable AI (XAI) <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-200 to-blue-400">
                Multi-Specialty Medical Clinic
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed">
              Upload single or historical medical reports across Cardiology, Dermatology,
              Orthopedics, Endocrinology, and all 14 doctor categories. Receive transparent clinical
              reasoning ("Kyun ho raha hai"), deficiency audits, dietary prescriptions, and
              avoidances.
            </p>
          </div>

          {/* Quick Action Navigation Chips */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2">
            <Button
              onClick={() => setActiveNavTab("chatbot")}
              className={`h-12 px-6 rounded-2xl font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all ${
                activeNavTab === "chatbot"
                  ? "bg-blue-600 text-white shadow-blue-600/40 ring-2 ring-blue-400"
                  : "bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700"
              }`}
            >
              <Bot className="h-4 w-4 text-white animate-pulse" />
              Clinical AI Chatbot (Interactive)
            </Button>
            <Button
              onClick={() => setActiveNavTab("specialty_xai")}
              className={`h-12 px-5 rounded-2xl font-bold text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-all ${
                activeNavTab === "specialty_xai"
                  ? "bg-blue-600 text-white shadow-blue-600/40 ring-2 ring-blue-400"
                  : "bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700"
              }`}
            >
              <Stethoscope className="h-4 w-4 text-blue-400" />
              14 Specialty Clinics
            </Button>
            <Button
              onClick={() => launchAICopilotWithMode("symptom_checker")}
              className="h-12 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold text-xs sm:text-sm backdrop-blur-md flex items-center gap-2 shadow-sm"
            >
              <Activity className="h-4 w-4 text-emerald-400" /> Symptom Triage
            </Button>
            <Button
              onClick={() => launchAICopilotWithMode("image_analyzer")}
              className="h-12 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold text-xs sm:text-sm backdrop-blur-md flex items-center gap-2 shadow-sm"
            >
              <ImageIcon className="h-4 w-4 text-indigo-400" /> X-Ray & MRI Vision
            </Button>
            <Button
              onClick={() => launchAICopilotWithMode("emergency_sos")}
              className="h-12 px-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4 text-white" /> Emergency SOS (112/108)
            </Button>
          </div>

          {/* Medical Search Bar */}
          <form onSubmit={handleMedicalSearch} className="pt-3 max-w-3xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Ask any medical question, disease, medicine (e.g. Cholesterol diet, Diabetes symptoms, Dengue precautions)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-32 rounded-2xl bg-slate-900/90 border border-slate-700 text-white font-bold text-xs sm:text-sm shadow-2xl outline-none placeholder:text-slate-400 placeholder:font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2.5 h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
              >
                AI Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= 2. TAB NAVIGATION BAR ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full -mt-7 relative z-30">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-x-auto scrollbar-none no-scrollbar">
          <button
            onClick={() => setActiveNavTab("chatbot")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 ${
              activeNavTab === "chatbot"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Bot className="h-4 w-4" />
            <span>Clinical AI Doctor Chatbot</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-md font-extrabold uppercase">
              ChatGPT Flow
            </span>
          </button>

          <button
            onClick={() => setActiveNavTab("specialty_xai")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 ${
              activeNavTab === "specialty_xai"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Stethoscope className="h-4 w-4" />
            <span>Specialty AI Clinic (14)</span>
          </button>

          <button
            onClick={() => setActiveNavTab("daily_copilot")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 ${
              activeNavTab === "daily_copilot"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>Daily Vitals & Copilot</span>
          </button>

          <button
            onClick={() => setActiveNavTab("preventive_family")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 ${
              activeNavTab === "preventive_family"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Preventive & Family Care</span>
          </button>

          <button
            onClick={() => setActiveNavTab("emergency")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 ${
              activeNavTab === "emergency"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            <span>Emergency & Hospitals (112)</span>
          </button>
        </div>
      </div>

      {/* ================= 3. ACTIVE TAB MAIN CONTENT ================= */}
      <main
        className={`mx-auto px-3 sm:px-6 w-full mt-6 space-y-8 transition-all ${
          activeNavTab === "chatbot" ? "max-w-[1600px]" : "max-w-5xl"
        }`}
      >
        {/* Search Result Banner if query submitted */}
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 shadow-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                AI Medical Search Result
              </span>
              <button
                onClick={() => setSearchResult(null)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
              >
                ✕ Close
              </button>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {searchResult.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {searchResult.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {searchResult.keyPoints.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            {searchResult.suggestedSpecialist && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500">
                  Recommended Specialist:{" "}
                  <strong className="text-blue-600 dark:text-blue-400">
                    {searchResult.suggestedSpecialist}
                  </strong>
                </span>
                <Button
                  onClick={() =>
                    launchAICopilotWithMode(
                      "chat",
                      `I want to consult a ${searchResult.suggestedSpecialist}`,
                    )
                  }
                  size="sm"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Consult Specialist <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 0: CLINICAL AI CHATBOT (CHATGPT INTERACTIVE CLINIC) */}
        {activeNavTab === "chatbot" && (
          <div className="w-full">
            <ClinicalAIChatbot initialSpecialty={initialSpecialty} />
          </div>
        )}

        {/* TAB 1: SPECIALTY AI CLINIC (XAI) */}
        {activeNavTab === "specialty_xai" && (
          <SpecialtyAIClinic initialSpecialtyId={initialSpecialty} />
        )}

        {/* TAB 2: DAILY VITALS & COPILOT */}
        {activeNavTab === "daily_copilot" && (
          <div className="space-y-8">
            {/* Daily Health Briefing Card */}
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
                  <div className="h-1.5 w-full bg-sky-200 dark:bg-sky-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full"
                      style={{
                        width: `${(briefing.waterIntakeCurrent / briefing.waterIntakeTarget) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 space-y-1">
                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                    <Footprints className="h-4 w-4" />
                    <span className="text-[10px] font-bold">Steps</span>
                  </div>
                  <p className="text-base font-black text-slate-900 dark:text-white">
                    {briefing.stepCountCurrent.toLocaleString()} /{" "}
                    {briefing.stepCountTarget.toLocaleString()}
                  </p>
                  <div className="h-1.5 w-full bg-emerald-200 dark:bg-emerald-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${(briefing.stepCountCurrent / briefing.stepCountTarget) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 space-y-1">
                  <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
                    <Moon className="h-4 w-4" />
                    <span className="text-[10px] font-bold">Sleep</span>
                  </div>
                  <p className="text-base font-black text-slate-900 dark:text-white">
                    {briefing.sleepHours} hrs
                  </p>
                  <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                    Restorative
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60 space-y-1">
                  <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-[10px] font-bold">Appointment</span>
                  </div>
                  <p className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">
                    {briefing.todaysAppointments[0]?.doctorName || "Dr. Arvind Mehta"}
                  </p>
                  <p className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                    {briefing.todaysAppointments[0]?.time || "5:00 PM"}
                  </p>
                </div>
              </div>
            </div>

            {/* Health Timeline */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Chronological Health Timeline
              </h3>
              <div className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-900 space-y-4">
                {timeline.slice(0, 4).map((evt) => (
                  <div key={evt.id} className="relative">
                    <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950" />
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{evt.date}</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                          {evt.category.replace("_", " ")}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {evt.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{evt.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PREVENTIVE & FAMILY CARE */}
        {activeNavTab === "preventive_family" && (
          <div className="space-y-8">
            {/* Preventive Screening Plan */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-black uppercase text-teal-600 dark:text-teal-400">
                    Age 28 • Male Preventive Protocol
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Clinical Preventive Health Matrix
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {preventive.map((sc, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-750 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 dark:text-white">{sc.title}</span>
                      <span className="text-[10px] font-bold text-teal-600">{sc.frequency}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {sc.whyItMatters}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Health Profiles */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Family Health Profiles & Immunization
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {family.map((mem) => (
                  <div
                    key={mem.id}
                    className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 dark:text-white">
                        {mem.fullName}
                      </span>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                        {mem.relation}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Age: {mem.age} • Blood Group: {mem.bloodGroup}
                    </p>
                    <div className="pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          launchAICopilotWithMode(
                            "chat",
                            `Review medications and health for ${mem.fullName} (${mem.relation})`,
                          )
                        }
                        className="w-full text-xs font-bold rounded-xl"
                      >
                        AI Family Health Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 24/7 EMERGENCY & HOSPITALS */}
        {activeNavTab === "emergency" && (
          <div className="space-y-6">
            {/* Emergency Hotline Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-xl space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 animate-pulse" />
                <h3 className="text-xl font-black">National Emergency Medical Hotlines</h3>
              </div>
              <p className="text-xs sm:text-sm text-rose-100 max-w-2xl font-medium">
                In acute emergencies (unconscious patient, severe chest pain radiating to left arm,
                acute stroke paralysis, profuse bleeding), call emergency services immediately.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:112"
                  className="px-5 py-2.5 rounded-xl bg-white text-rose-700 font-black text-sm flex items-center gap-2 shadow-md hover:bg-rose-50 transition-colors"
                >
                  <Phone className="h-4 w-4" /> Dial 112 (National Emergency)
                </a>
                <a
                  href="tel:108"
                  className="px-5 py-2.5 rounded-xl bg-rose-900/90 text-white font-black text-sm flex items-center gap-2 border border-rose-400/30 hover:bg-rose-900 transition-colors"
                >
                  <Phone className="h-4 w-4" /> Dial 108 (Disaster & Ambulance)
                </a>
              </div>
            </div>

            {/* Top Hospitals Database */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-rose-600" />
                Verified 24/7 Emergency Trauma Hospitals Near You
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TOP_HOSPITALS_DATABASE.map((hosp) => (
                  <div
                    key={hosp.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-black text-sm text-slate-900 dark:text-white">
                          {hosp.name}
                        </h4>
                        <p className="text-slate-500 font-medium">
                          {hosp.area}, {hosp.city} • {hosp.distanceKm} km away
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black text-[10px]">
                        ★ {hosp.rating}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      {hosp.mapAddress}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hosp.specialtiesAvailable.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[10px] font-bold text-rose-600">
                        ICU Beds: {hosp.icuBedsAvailable} Available
                      </span>
                      <a
                        href={`tel:${hosp.phoneNumber}`}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Phone className="h-3 w-3" /> Call ER
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. MEDICAL SAFETY & COMPLIANCE FOOTER ================= */}
        <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 space-y-1.5">
          <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-600" /> Enterprise-Grade Clinical AI Safety &
            Compliance (HIPAA & DISHA Aligned)
          </p>
          <p className="text-[11px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
            ⚠️ <strong>Medical Disclaimer:</strong> Medyora Care AI provides preliminary triage,
            educational insights, and specialist recommendations. It is not a substitute for
            clinical judgment or a confirmed medical diagnosis. In case of acute chest pain,
            breathing difficulty, or severe trauma, immediately dial <strong>112</strong> or{" "}
            <strong>108</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}
