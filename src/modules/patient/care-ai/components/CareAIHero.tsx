import { Sparkles, MessageSquare, Upload, Activity, LineChart, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CareAIHeroProps {
  onActionClick: (action: "chat" | "upload" | "symptoms" | "insights" | "voice") => void;
}

export function CareAIHero({ onActionClick }: CareAIHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#07132b] to-[#0a1e3f] text-white p-6 sm:p-8 lg:p-10 border border-blue-900/40 shadow-2xl">
      {/* Background Decorative Neural & ECG Glow Lines */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle ECG Wave SVG Line in Background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full stroke-cyan-400 fill-none"
          strokeWidth="2"
        >
          <path d="M0,60 L200,60 L230,20 L250,100 L270,10 L290,90 L310,60 L600,60 L630,20 L650,100 L670,10 L690,90 L710,60 L1200,60" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Text & Actions */}
        <div className="space-y-5 max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-black backdrop-blur-md shadow-inner">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>Medyora Care AI</span>
          </div>

          <div className="space-y-2.5">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Your 24×7 AI Health Companion
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
              Understand your symptoms, analyze reports, track your health, and get personalized
              guidance — all in one place.
            </p>
          </div>

          {/* Action Chips */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
            <Button
              onClick={() => onActionClick("chat")}
              size="sm"
              className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Chat</span>
            </Button>

            <Button
              onClick={() => onActionClick("upload")}
              size="sm"
              variant="outline"
              className="h-10 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-xs backdrop-blur-md flex items-center gap-2 shadow-xs transition-all hover:scale-105 active:scale-95"
            >
              <Upload className="h-3.5 w-3.5 text-cyan-400" />
              <span>Upload Report</span>
            </Button>

            <Button
              onClick={() => onActionClick("symptoms")}
              size="sm"
              variant="outline"
              className="h-10 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-xs backdrop-blur-md flex items-center gap-2 shadow-xs transition-all hover:scale-105 active:scale-95"
            >
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>Symptom Check</span>
            </Button>

            <Button
              onClick={() => onActionClick("insights")}
              size="sm"
              variant="outline"
              className="h-10 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-xs backdrop-blur-md flex items-center gap-2 shadow-xs transition-all hover:scale-105 active:scale-95"
            >
              <LineChart className="h-3.5 w-3.5 text-indigo-400" />
              <span>Health Insights</span>
            </Button>

            <Button
              onClick={() => onActionClick("voice")}
              size="sm"
              variant="outline"
              className="h-10 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-xs backdrop-blur-md flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 active:scale-95"
            >
              <Mic className="h-3.5 w-3.5 text-rose-400" />
              <span>Voice</span>
            </Button>
          </div>
        </div>

        {/* Right Robot Mascot & Quote Badge */}
        <div className="relative shrink-0 flex items-center justify-center">
          {/* Speech Bubble above robot */}
          <div className="absolute -top-4 right-12 z-20 px-3.5 py-1.5 rounded-2xl bg-white text-slate-900 font-extrabold text-[11px] shadow-xl border border-slate-100 flex items-center gap-1.5 animate-bounce-slow">
            <span className="text-blue-600">💬</span>
            <span>Ask me anything about your health!</span>
            {/* Bubble Tail */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100" />
          </div>

          {/* 3D AI Doctor Robot Mascot Illustration */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-3xl overflow-hidden border border-cyan-400/20 bg-gradient-to-b from-blue-900/30 to-slate-950/80 shadow-2xl group">
            <img
              src="/ai_doctor_robot.jpg"
              alt="Medyora AI Health Assistant Doctor Robot"
              className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-3xl pointer-events-none" />
          </div>

          {/* Medyora AI Quote on right side */}
          <div className="hidden xl:flex flex-col justify-center pl-6 max-w-[190px] text-right space-y-1">
            <p className="text-xs font-bold text-cyan-200 italic leading-snug">
              “Better Understanding A Healthier You”
            </p>
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
              — Medyora AI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
