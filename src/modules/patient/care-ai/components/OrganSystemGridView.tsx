import { ChevronRight, ShieldCheck, Heart, Wind, Brain, Bone, Flame, Eye, Activity, Sparkles, Stethoscope } from "lucide-react";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";

interface OrganSystemGridViewProps {
  onSelectSystem: (id: string) => void;
  onOpenDeepDive: (id: string) => void;
}

export function OrganSystemGridView({
  onSelectSystem,
  onOpenDeepDive,
}: OrganSystemGridViewProps) {
  return (
    <section className="w-full pt-8 pb-10 space-y-4 font-sans select-none">
      {/* Section Header Matching Reference Image */}
      <div className="space-y-1">
        <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
          Organ System Views (Use Same UI Style for All)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          When user clicks on any organ/system, show the same layout with that organ highlighted in
          the human body, consistent style, colors and design.
        </p>
      </div>

      {/* Grid of 15 Organ System Cards (5 columns on large desktop, 3 on tablet, 1 on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
        {ORGAN_SYSTEMS.slice(0, 15).map((sys: OrganSystemItem, idx: number) => {
          return (
            <div key={sys.id} className="space-y-1.5">
              {/* Numbered Header Label (e.g., 1. Heart / Circulatory) */}
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
                {idx + 1}. {sys.name.split("/")[0]?.trim() || sys.shortName}
              </div>

              {/* Card Body */}
              <div
                onClick={() => {
                  onSelectSystem(sys.id);
                  onOpenDeepDive(sys.id);
                }}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#05112a] via-[#07193c] to-[#040e22] border border-blue-900/50 hover:border-cyan-400/60 p-3 text-white shadow-lg hover:shadow-cyan-500/15 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-[210px]"
              >
                {/* Top System Name */}
                <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-blue-900/40">
                  <span className="text-[11px] font-black text-white truncate group-hover:text-cyan-300 transition-colors">
                    {sys.systemName}
                  </span>
                  <ChevronRight className="h-3 w-3 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Card Middle: Left List of Capabilities + Right Glowing Anatomical Scan */}
                <div className="grid grid-cols-12 gap-1 py-1.5 items-center flex-1">
                  {/* Left List of Capabilities (6 cols) */}
                  <div className="col-span-6 flex flex-col gap-1 text-[9px] text-slate-300 font-medium">
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Overview</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Conditions</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Symptoms</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Tests & Reports</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Treatments</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Lifestyle Tips</span>
                    </div>
                  </div>

                  {/* Right: Holographic Body scan with Glowing Organ (6 cols) */}
                  <div className="col-span-6 relative h-24 rounded-xl overflow-hidden bg-slate-950/80 border border-blue-900/40 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                    {/* Holographic Body Model or Organ Image */}
                    <img
                      src={sys.illustration || "/holographic_body.jpg"}
                      alt={sys.systemName}
                      className="w-full h-full object-contain p-1 transform transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_4px_12px_rgba(34,211,238,0.35)]"
                    />

                    {/* Glowing highlight indicator */}
                    <div className="absolute inset-0 bg-radial-at-c from-cyan-500/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Bottom Bar: Mini Metrics & Status Pill */}
                <div className="pt-1.5 border-t border-blue-900/40 flex items-center justify-between text-[9px] font-semibold text-slate-300">
                  <div className="truncate max-w-[120px] text-slate-400">
                    {sys.quickStats[0] ? `${sys.quickStats[0].label} ${sys.quickStats[0].value}` : "Status"}
                  </div>
                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[8px] font-black uppercase">
                    Normal
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
