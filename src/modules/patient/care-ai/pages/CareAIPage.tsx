import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Sparkles, Bot, Activity, ImageIcon, FileText, Pill, 
  Flame, AlertTriangle, ArrowRight, ShieldCheck, Zap, 
  CheckCircle2, Clock, MapPin, HeartPulse, Search, 
  Apple, Dumbbell, Calendar, Users, Shield, Phone, 
  ChevronRight, Compass, Layers, Heart, Droplets, Footprints, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getDailyCopilotBriefing, 
  getFamilyHealthProfiles, 
  getPreventiveCarePlan, 
  getHealthTimelineData, 
  TOP_HOSPITALS_DATABASE,
  searchMedicalKnowledgeBase,
  type MedicalSearchResult
} from "../services/care-ai-engine";

export function CareAIPage() {
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
      })
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
        {/* Soft Ambient Light Glows (Easy on the eyes) */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-6 relative z-10 text-center sm:text-left">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-850/90 border border-slate-750 text-blue-300 text-xs font-extrabold backdrop-blur-md shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
              Medyora Care AI — India's Smartest Medical Intelligence Engine
            </div>

            <span className="text-xs font-bold text-slate-300 bg-slate-800/80 px-3.5 py-1 rounded-full border border-slate-700">
              ⚡ 20+ Integrated AI Clinical Modules
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
              Your Personal 24/7 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-200 to-blue-400">
                AI Doctor & Health Copilot
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-medium leading-relaxed">
              Multimodal clinical triage, radiology vision, laboratory OCR, personalized diet & fitness coaching, disease risk radars, and instant top doctor recommendations.
            </p>
          </div>

          {/* Quick Action Buttons (High Contrast & Legible) */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-2">
            <Button
              onClick={() => launchAICopilotWithMode("chat")}
              className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-white animate-pulse" /> Start 24/7 AI Chat
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
              onClick={() => launchAICopilotWithMode("lab_analyzer")}
              className="h-12 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold text-xs sm:text-sm backdrop-blur-md flex items-center gap-2 shadow-sm"
            >
              <FileText className="h-4 w-4 text-amber-400" /> Lab Report OCR
            </Button>
            <Button
              onClick={() => launchAICopilotWithMode("emergency_sos")}
              className="h-12 px-5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4 text-white" /> Emergency SOS (112/108)
            </Button>
          </div>

          {/* ChatGPT-style Medical Search Bar */}
          <form onSubmit={handleMedicalSearch} className="pt-3 max-w-3xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Ask any medical question, disease, medicine (e.g. Paracetamol side effects, Diabetes diet)..."
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

      {/* ================= 2. LIVE AI COPILOT DASHBOARD BRIEFING ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full -mt-10 relative z-20 space-y-6">
        
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
            <h3 className="text-lg font-black text-slate-900 dark:text-white">{searchResult.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {searchResult.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {searchResult.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            {searchResult.suggestedSpecialist && (
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500">Recommended Specialist: <strong className="text-blue-600 dark:text-blue-400">{searchResult.suggestedSpecialist}</strong></span>
                <Button
                  onClick={() => launchAICopilotWithMode("chat", `I want to consult a ${searchResult.suggestedSpecialist}`)}
                  size="sm"
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Consult Specialist <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </motion.div>
        )}

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
            {/* Metric 1: Water */}
            <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-800/60 space-y-1">
              <div className="flex items-center justify-between text-sky-600 dark:text-sky-400">
                <Droplets className="h-4 w-4" />
                <span className="text-[10px] font-bold">Hydration</span>
              </div>
              <p className="text-base font-black text-slate-900 dark:text-white">{briefing.waterIntakeCurrent} / {briefing.waterIntakeTarget} L</p>
              <div className="h-1.5 w-full bg-sky-200 dark:bg-sky-900 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: `${(briefing.waterIntakeCurrent / briefing.waterIntakeTarget) * 100}%` }} />
              </div>
            </div>

            {/* Metric 2: Steps */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 space-y-1">
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <Footprints className="h-4 w-4" />
                <span className="text-[10px] font-bold">Steps</span>
              </div>
              <p className="text-base font-black text-slate-900 dark:text-white">{briefing.stepCountCurrent.toLocaleString()} / {briefing.stepCountTarget.toLocaleString()}</p>
              <div className="h-1.5 w-full bg-emerald-200 dark:bg-emerald-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(briefing.stepCountCurrent / briefing.stepCountTarget) * 100}%` }} />
              </div>
            </div>

            {/* Metric 3: Sleep */}
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 space-y-1">
              <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
                <Moon className="h-4 w-4" />
                <span className="text-[10px] font-bold">Sleep</span>
              </div>
              <p className="text-base font-black text-slate-900 dark:text-white">{briefing.sleepHours} hrs</p>
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Restorative</p>
            </div>

            {/* Metric 4: Scheduled Appointment */}
            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60 space-y-1">
              <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
                <Calendar className="h-4 w-4" />
                <span className="text-[10px] font-bold">Today</span>
              </div>
              <p className="text-xs font-black text-slate-900 dark:text-white truncate">{briefing.todaysAppointments[0]?.doctorName}</p>
              <p className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">{briefing.todaysAppointments[0]?.time}</p>
            </div>
          </div>

          {/* AI Insight Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              <strong className="text-slate-900 dark:text-white">AI Daily Insight:</strong> {briefing.dailyHealthInsight}
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. ALL 20 AI HEALTHCARE MODULES GRID ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full pt-10 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            Explore All <span className="text-blue-600 dark:text-blue-400">AI Healthcare Modules</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Clinical reasoning engines built with advanced medical AI to guide your entire healthcare journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Module 1: AI Symptom Triage */}
          <div
            onClick={() => launchAICopilotWithMode("symptom_checker")}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="h-11 w-11 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                1. AI Symptom Triage & Diagnosis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Multi-turn questions (age, temperature, pain scale) computing condition probabilities with diagnostic tests and doctor matching.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 pt-3">
              Check Symptoms <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Module 2: AI Report Analyzer */}
          <div
            onClick={() => launchAICopilotWithMode("lab_analyzer")}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="h-11 w-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                2. Lab Report OCR & Pathology
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Upload CBC, Lipid, Thyroid, HbA1c, or LFT. Parameter-by-parameter analysis with abnormal tags, root causes, and diet recommendations.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-3">
              Scan Pathology Report <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Module 3: AI X-Ray & MRI Analyzer */}
          <div
            onClick={() => launchAICopilotWithMode("image_analyzer")}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="h-11 w-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <ImageIcon className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                3. X-Ray, MRI & CT Vision AI
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Detects lung infections, pneumonia, fractures, brain MRI ventricular symmetry, and skin rashes with plain language explanations.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 pt-3">
              Upload Radiology Scan <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Module 4: AI Prescription Reader */}
          <div
            onClick={() => launchAICopilotWithMode("prescription_reader")}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="h-11 w-11 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Pill className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                4. Prescription Reader & Reminders
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Extracts Morning/Afternoon/Night dosage schedules, drug interactions, and orders medicines with 20% discount.
              </p>
            </div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 pt-3">
              Digitize Prescription <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Module 5: AI Diet Planner */}
          <div
            onClick={() => launchAICopilotWithMode("chat", "Generate a personalized diet plan for weight loss and diabetes")}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="h-11 w-11 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Apple className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                5. AI Nutrition & Diet Planner
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Personalized Indian diet plans for PCOS, Diabetes, Veg, Jain & Vegan with breakfast, lunch, dinner, macros & shopping lists.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 pt-3">
              Generate Diet Plan <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Module 6: AI Fitness Coach */}
          <div
            onClick={() => launchAICopilotWithMode("chat", "Create an AI workout and yoga routine for my fitness level")}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-cyan-400 dark:hover:border-cyan-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="h-11 w-11 rounded-2xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Dumbbell className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                6. AI Fitness Coach & Yoga
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Guided morning Pranayama, home workout intervals, walking cadence targets, and joint rehabilitation routines.
              </p>
            </div>
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 pt-3">
              Build Workout Routine <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Module 7: Smart Health Score & Disease Risk Radar */}
          <div
            onClick={() => launchAICopilotWithMode("health_score")}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-orange-400 dark:hover:border-orange-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="h-11 w-11 rounded-2xl bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
                7. Health Score (0-100) & Risk Radar
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Predictive risk modeling for Cardiovascular stress, Diabetes risk, Fatty Liver, and Vitamin deficiencies.
              </p>
            </div>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1 pt-3">
              Calculate Score <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Module 8: AI Hospital Finder & 24/7 Emergency */}
          <div
            onClick={() => launchAICopilotWithMode("emergency_sos")}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-rose-400 dark:hover:border-rose-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="h-11 w-11 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                8. Emergency SOS & Hospital Finder
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Automatic red-flag detection (chest pain, stroke, breathing distress), 112/108 calling, and nearest 24/7 ER trauma centers.
              </p>
            </div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 pt-3">
              Emergency SOS <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Module 9: AI Preventive Care Engine */}
          <div
            onClick={() => launchAICopilotWithMode("chat", "Show my recommended preventive care screenings and vaccines")}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="h-11 w-11 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                9. AI Preventive Health Screening
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Age-tailored recommendations for annual checkups, cancer screenings, cardiac tests, dental assessments, and vaccines.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 pt-3">
              View Screenings <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

        </div>
      </section>

      {/* ================= 4. FAMILY HEALTH PROFILES ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full pt-12 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              AI Family Health Manager
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Manage medical records, chronic conditions, and appointments for your loved ones.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-xl font-bold text-xs">
            <Link to="/patient/family">+ Add Member</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {family.map((mem) => (
            <div
              key={mem.id}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-sm">
                    {mem.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{mem.fullName}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{mem.relation} • {mem.age} yrs • {mem.bloodGroup}</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                  {mem.healthScore}/100
                </span>
              </div>

              <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                <p><strong>Conditions:</strong> {mem.chronicConditions.join(", ")}</p>
                <p><strong>Active Meds:</strong> {mem.activeMedicationsCount} daily tablets</p>
                {mem.upcomingVaccineOrTest && (
                  <p className="text-blue-600 dark:text-blue-400 font-bold">Upcoming: {mem.upcomingVaccineOrTest}</p>
                )}
              </div>

              <Button
                onClick={() => launchAICopilotWithMode("chat", `Review health management and medications for ${mem.fullName} (${mem.relation})`)}
                variant="outline"
                size="sm"
                className="w-full h-8 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                AI Health Review
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. CHRONOLOGICAL HEALTH TIMELINE ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full pt-12 space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            AI Automated Health Timeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Chronologically organized log of blood tests, consultations, prescriptions, and health milestones.
          </p>
        </div>

        <div className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-900 space-y-6">
          {timeline.slice(0, 4).map((evt) => (
            <div key={evt.id} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950" />
              
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{evt.date}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                    {evt.category.replace("_", " ")}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{evt.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{evt.subtitle}</p>
                {evt.doctorOrLabName && (
                  <p className="text-[11px] text-slate-400 font-medium">Provider: {evt.doctorOrLabName}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 6. MEDICAL SAFETY & COMPLIANCE FOOTER ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full pt-12">
        <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 space-y-1.5">
          <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-blue-600" /> Enterprise-Grade Clinical AI Safety & Compliance (HIPAA & DISHA Aligned)
          </p>
          <p className="text-[11px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
            ⚠️ <strong>Medical Disclaimer:</strong> Medyora Care AI provides preliminary triage, educational insights, and specialist recommendations. It is not a substitute for clinical judgment or a confirmed medical diagnosis. In case of acute chest pain, breathing difficulty, or severe trauma, immediately dial <strong>112</strong> or <strong>108</strong>.
          </p>
        </div>
      </section>

    </div>
  );
}
