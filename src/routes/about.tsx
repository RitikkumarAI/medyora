import { createFileRoute, Link } from "@tanstack/react-router";
import { HeartPulse, ShieldCheck, Sparkles, Users, Cpu, Lock, Globe, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { SiteFooter } from "@/shared/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Medyora — Developed and Maintained by Binarize Technologies" },
      {
        name: "description",
        content:
          "Medyora is an enterprise healthcare super-app developed and maintained by Binarize Technologies. Connect with verified doctors, track live queues, and manage digital health records.",
      },
      { property: "og:title", content: "About Medyora — Built by Binarize Technologies" },
      {
        property: "og:description",
        content:
          "Learn how Binarize Technologies engineered Medyora to unify doctor discovery, live queue tracking, and digital healthcare records.",
      },
      { property: "og:type", content: "website" },
      { name: "author", content: "Binarize Technologies" },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { value: "50,000+", label: "Active Patients Served" },
  { value: "2,000+", label: "Verified Specialists" },
  { value: "120+", label: "Cities & Hubs Covered" },
  { value: "99.98%", label: "Platform Uptime SLA" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "100% Credential-Verified Care",
    text: "Every medical practitioner undergo rigorous license and medical council verification before onboarding.",
  },
  {
    icon: HeartPulse,
    title: "Patient-Centric Time Respect",
    text: "Live clinic radar and token prediction eliminate unnecessary waiting room delays.",
  },
  {
    icon: Users,
    title: "Unified Family Health Records",
    text: "One family vault manages profiles, vitals, prescriptions, and lab history with strict role separation.",
  },
  {
    icon: Lock,
    title: "Military-Grade Data Encryption",
    text: "All clinical notes, diagnostic telemetry, and prescriptions are protected with 256-bit AES encryption.",
  },
];

const TECH_PILLARS = [
  {
    icon: Cpu,
    title: "High-Performance Edge Architecture",
    description: "Engineered with sub-50ms query response times, edge-rendered routes, and instant PWA hydration.",
  },
  {
    icon: Globe,
    title: "Real-Time Telemetry & Sync",
    description: "WebSocket queue telemetry delivers live patient token updates with zero latency.",
  },
  {
    icon: Sparkles,
    title: "Care AI Diagnostic Copilot",
    description: "Proprietary medical AI assistant built for instant symptom triage, clinic recommendations, and OTC guidance.",
  },
  {
    icon: Building2,
    title: "Enterprise Clinic Management",
    description: "Full clinic queue software, digital prescription generator, and automated patient notifications.",
  },
];

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-16 sm:py-24 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-xs">
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Developed & Maintained by Binarize Technologies</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
              Transforming Healthcare with <span className="text-blue-600 dark:text-blue-400">Intelligent Technology</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Medyora is an enterprise healthcare super-app developed, engineered, and maintained by <strong>Binarize Technologies</strong>. We built a unified platform where verified doctor discovery, instant appointments, live clinic queue radar, digital prescriptions, and AI triage seamlessly collaborate.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="px-6 py-6 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-1 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
              >
                <p className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">{s.value}</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Binarize Technologies & Product Mission */}
        <section className="px-6 py-16 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                ENGINEERING EXCELLENCE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                Built by Binarize Technologies for the Next Billion Healthcare Users
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
                Binarize Technologies powers digital transformation for critical human workflows. Medyora represents our flagship healthcare technology stack — engineered with edge architecture, instant client-side transitions, offline-first sync, and AI clinical intelligence.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Continuous 24/7 Monitoring
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ISO & HIPAA Aligned Architecture
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Data Selling Guarantee
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Architectural Pillars */}
        <section className="px-6 py-12 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              Technology Stack by Binarize Technologies
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Designed for extreme speed, instant responsiveness, and military-grade clinical security.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TECH_PILLARS.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{p.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What We Stand For */}
        <section className="px-6 py-16 sm:px-10 lg:px-16 w-full max-w-[1536px] mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              What We Stand For
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Guiding principles behind every feature in Medyora.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <v.icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{v.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 text-center">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Verified Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
