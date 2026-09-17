import { MessageSquare, Upload, Stethoscope, Sparkles, Plus } from "lucide-react";

interface CareAIHeroProps {
  onActionClick: (action: "chat" | "upload" | "symptoms" | "recommendations") => void;
}

export function CareAIHero({ onActionClick }: CareAIHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#03091e] via-[#07132b] to-[#0a1e3f] text-white p-6 sm:p-7 lg:p-8 border border-blue-900/40 shadow-2xl font-sans">
      {/* Background Decorative Neural Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Text & 4 Structured Action Buttons */}
        <div className="space-y-4 max-w-xl text-center lg:text-left">
          {/* Greeting Tag */}
          <div className="text-xs sm:text-sm font-bold text-slate-300 flex items-center justify-center lg:justify-start gap-1.5">
            <span>Good Morning, Ritik</span>
            <span>👋</span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Your 24×7 AI Doctor
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Get instant answers, analyze your reports, understand your symptoms, and receive
              personalized health guidance — powered by advanced AI.
            </p>
          </div>

          {/* 4 Action Cards Matching Exact Reference UI */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {/* Button 1: Chat with AI */}
            <button
              onClick={() => onActionClick("chat")}
              className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-102 active:scale-98 text-left group"
            >
              <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-black truncate">Chat with AI</div>
                <div className="text-[9px] text-blue-100 font-medium truncate">Instant answers</div>
              </div>
            </button>

            {/* Button 2: Upload Report */}
            <button
              onClick={() => onActionClick("upload")}
              className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-slate-750/80 shadow-sm transition-all hover:scale-102 active:scale-98 text-left group"
            >
              <div className="h-8 w-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Upload className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-black truncate">Upload Report</div>
                <div className="text-[9px] text-slate-400 font-medium truncate">AI analysis</div>
              </div>
            </button>

            {/* Button 3: Symptom Check */}
            <button
              onClick={() => onActionClick("symptoms")}
              className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-slate-750/80 shadow-sm transition-all hover:scale-102 active:scale-98 text-left group"
            >
              <div className="h-8 w-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Stethoscope className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-black truncate">Symptom Check</div>
                <div className="text-[9px] text-slate-400 font-medium truncate">Find possible causes</div>
              </div>
            </button>

            {/* Button 4: Get Recommendations */}
            <button
              onClick={() => onActionClick("recommendations")}
              className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-850 text-slate-200 border border-slate-750/80 shadow-sm transition-all hover:scale-102 active:scale-98 text-left group"
            >
              <div className="h-8 w-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-amber-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-black truncate">Get Recommendations</div>
                <div className="text-[9px] text-slate-400 font-medium truncate">Diet, lifestyle, doctors</div>
              </div>
            </button>
          </div>
        </div>

        {/* Right Robot Mascot & Speech Bubble Visual */}
        <div className="relative shrink-0 flex items-center justify-center pt-3 sm:pt-0">
          {/* Speech Bubble above robot */}
          <div className="absolute -top-3 sm:-top-5 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-left-12 z-20 px-3.5 py-1.5 rounded-2xl bg-white text-slate-900 font-extrabold text-[11px] shadow-2xl border border-slate-100 whitespace-nowrap flex items-center gap-1.5">
            <span>Ask me anything about your health!</span>
            {/* Tail */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100" />
          </div>

          {/* Script calligraphy text behind/beside the robot */}
          <div className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 pointer-events-none z-10 hidden sm:block">
            <span
              className="text-cyan-200/40 text-lg sm:text-xl font-normal tracking-wide select-none"
              style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive, sans-serif" }}
            >
              # Healthier You, Always
            </span>
          </div>

          {/* Small 3D AI Doctor Robot Mascot Illustration */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-cyan-400/40 bg-gradient-to-b from-blue-900/50 to-slate-950 shadow-2xl shadow-cyan-500/20 group">
            <img
              src="/ai_doctor_robot.jpg"
              alt="Medyora AI Robot Doctor"
              className="w-full h-full object-cover object-[50%_20%] transform transition-transform duration-500 group-hover:scale-105"
            />
            {/* Glowing Cross Badge */}
            <div className="absolute bottom-2 right-2 h-7 w-7 rounded-full bg-blue-600/90 border-2 border-white text-white flex items-center justify-center shadow-lg backdrop-blur-xs">
              <Plus className="h-4 w-4 stroke-[3]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
